"""
Cashout API Routes — NeoNoble Ramp.

Endpoints for monitoring and controlling the autonomous cashout engine:
- Cashout status and metrics
- Cashout history
- EUR account management
- Conversion opportunities
- Manual trigger / stop
"""

from fastapi import APIRouter, HTTPException, Depends
from typing import Optional
from pydantic import BaseModel
import logging

from routes.auth import get_current_user
from services.cashout_engine import CashoutEngine, EUR_ACCOUNTS
from services.auto_conversion_engine import AutoConversionEngine

logger = logging.getLogger("cashout_routes")

router = APIRouter(prefix="/cashout", tags=["Cashout Engine"])


# ── ENGINE STATUS ──

@router.get("/status")
async def cashout_status(current_user: dict = Depends(get_current_user)):
    """Full cashout engine status with metrics, accounts, and recent operations."""
    engine = CashoutEngine.get_instance()
    return await engine.get_status()


@router.get("/history")
async def cashout_history(
    limit: int = 100,
    current_user: dict = Depends(get_current_user),
):
    """Cashout operation history."""
    engine = CashoutEngine.get_instance()
    history = await engine.get_cashout_history(limit)
    return {"cashouts": history, "count": len(history)}


# ── ENGINE CONTROL ──

@router.post("/start")
async def start_cashout(current_user: dict = Depends(get_current_user)):
    """Start the autonomous cashout engine (admin only)."""
    if current_user.get("role") != "ADMIN":
        raise HTTPException(status_code=403, detail="Admin only")
    engine = CashoutEngine.get_instance()
    await engine.start()
    return {"status": "started", "message": "Cashout engine avviato"}


@router.post("/stop")
async def stop_cashout(current_user: dict = Depends(get_current_user)):
    """Stop the autonomous cashout engine (admin only)."""
    if current_user.get("role") != "ADMIN":
        raise HTTPException(status_code=403, detail="Admin only")
    engine = CashoutEngine.get_instance()
    await engine.stop()
    return {"status": "stopped", "message": "Cashout engine fermato"}


# ── EUR ACCOUNTS ──

@router.get("/eur-accounts")
async def get_eur_accounts(current_user: dict = Depends(get_current_user)):
    """Get configured EUR payout accounts (SEPA/SWIFT destinations)."""
    return {
        "accounts": EUR_ACCOUNTS,
        "routing_rules": {
            "sepa_instant": "< 5,000 EUR",
            "sepa_standard": "5,000 — 100,000 EUR",
            "swift": "> 100,000 EUR (batch, uses BE account)",
        },
    }


# ── CONVERSION ──

@router.get("/conversions/opportunities")
async def conversion_opportunities(current_user: dict = Depends(get_current_user)):
    """Evaluate current crypto → USDC conversion opportunities."""
    from services.execution_engine import ExecutionEngine
    engine = ExecutionEngine.get_instance()
    hot_wallet = await engine.get_hot_wallet_status()

    converter = AutoConversionEngine.get_instance()
    opps = await converter.evaluate_conversions(hot_wallet)

    return {
        "hot_wallet": hot_wallet,
        "opportunities": opps,
        "count": len(opps),
    }


@router.get("/conversions/history")
async def conversion_history(
    limit: int = 50,
    current_user: dict = Depends(get_current_user),
):
    """Conversion history log."""
    converter = AutoConversionEngine.get_instance()
    history = await converter.get_conversion_history(limit)
    return {"conversions": history, "count": len(history)}


@router.get("/conversions/summary")
async def conversion_summary(current_user: dict = Depends(get_current_user)):
    """Conversion summary by pair."""
    converter = AutoConversionEngine.get_instance()
    return await converter.get_summary()


# ── REVENUE WITHDRAWAL ──

class RevenueWithdrawRequest(BaseModel):
    amount: float
    currency: str = "EUR"  # EUR or crypto asset
    destination_type: str = "sepa"  # sepa, swift, crypto
    destination_iban: Optional[str] = None
    destination_wallet: Optional[str] = None
    beneficiary_name: Optional[str] = None


@router.post("/revenue-withdraw")
async def revenue_withdraw(req: RevenueWithdrawRequest, current_user: dict = Depends(get_current_user)):
    """
    Manual revenue withdrawal — Admin only.
    Withdraws from the REVENUE wallet to configured EUR accounts or crypto wallets.
    Full audit trail.
    """
    if current_user.get("role") != "ADMIN":
        raise HTTPException(status_code=403, detail="Admin only — accesso negato")

    if req.amount <= 0:
        raise HTTPException(status_code=400, detail="Importo deve essere > 0")

    from database.mongodb import get_database
    from datetime import datetime, timezone
    import uuid

    db = get_database()
    withdraw_id = str(uuid.uuid4())
    now = datetime.now(timezone.utc)

    # Validate revenue balance
    engine = CashoutEngine.get_instance()
    status = await engine.get_status()
    revenue_balance_eur = status.get("cumulative", {}).get("extracted_eur", 0)

    # Check USDC revenue wallet balance
    try:
        from services.circle_wallet_service import CircleWalletService, WalletRole
        circle = CircleWalletService.get_instance()
        balances = await circle.get_all_wallet_balances("BSC")
        revenue_usdc = balances.get("wallets", {}).get(WalletRole.REVENUE, {}).get("balance", 0)
    except Exception:
        revenue_usdc = 0

    # Route based on destination type
    payout_result = None
    real_payout_id = None
    real_tx_hash = None

    if req.destination_type in ("sepa", "swift"):
        destination_iban = req.destination_iban
        if not destination_iban:
            # Use default configured accounts
            if req.amount < 100000:
                destination_iban = EUR_ACCOUNTS["IT"]["iban"]
            else:
                destination_iban = EUR_ACCOUNTS["BE"]["iban"]

        beneficiary_name = req.beneficiary_name or EUR_ACCOUNTS["IT"]["beneficiary"]

        try:
            from services.real_payout_service import get_real_payout_service
            payout_svc = get_real_payout_service()
            if payout_svc and payout_svc.is_available():
                payout_result = await payout_svc.create_payout(
                    quote_id=withdraw_id,
                    transaction_id=withdraw_id,
                    amount_eur=req.amount,
                    reference=f"REVENUE-{withdraw_id[:8].upper()}",
                    metadata={
                        "user_id": current_user["user_id"],
                        "type": "revenue_withdrawal",
                        "iban": destination_iban,
                        "beneficiary": beneficiary_name,
                    },
                )
                if payout_result.success:
                    real_payout_id = payout_result.payout_id
        except Exception as e:
            logger.warning(f"[REVENUE-WITHDRAW] Payout error: {e}")

    elif req.destination_type == "crypto":
        if not req.destination_wallet:
            raise HTTPException(status_code=400, detail="destination_wallet richiesto per crypto withdrawal")
        try:
            from services.execution_engine import ExecutionEngine
            exec_engine = ExecutionEngine.get_instance()
            exec_result = await exec_engine.send_asset_real("USDC", req.destination_wallet, req.amount)
            if exec_result.get("success"):
                real_tx_hash = exec_result["tx_hash"]
        except Exception as e:
            logger.warning(f"[REVENUE-WITHDRAW] Crypto send error: {e}")
    else:
        raise HTTPException(status_code=400, detail="destination_type deve essere 'sepa', 'swift' o 'crypto'")

    # Audit log
    withdrawal = {
        "id": withdraw_id,
        "type": "revenue_withdrawal",
        "admin_user_id": current_user["user_id"],
        "admin_email": current_user.get("email", ""),
        "amount": req.amount,
        "currency": req.currency,
        "destination_type": req.destination_type,
        "destination_iban": req.destination_iban,
        "destination_wallet": req.destination_wallet,
        "beneficiary": beneficiary_name,
        "payout_id": real_payout_id,
        "tx_hash": real_tx_hash,
        "status": "completed" if (real_payout_id or real_tx_hash) else "pending",
        "revenue_usdc_balance": revenue_usdc,
        "revenue_balance_eur": revenue_balance_eur,
        "created_at": now.isoformat(),
    }
    await db.revenue_withdrawals.insert_one({**withdrawal, "_id": withdraw_id})

    # Also log in audit_events
    audit_event_id = str(uuid.uuid4())
    await db.audit_events.update_one(
        {"_id": audit_event_id},
        {"$setOnInsert": {
            "event_id": audit_event_id,
            "event": "REVENUE_WITHDRAWAL",
            "admin": current_user.get("email", ""),
            "amount": req.amount,
            "destination": req.destination_type,
            "payout_id": real_payout_id,
            "tx_hash": real_tx_hash,
            "created_at": now,
        }},
        upsert=True,
    )

    return {
        "success": True,
        "withdrawal": withdrawal,
        "message": f"Revenue withdrawal di {req.amount} {req.currency} {'eseguito' if (real_payout_id or real_tx_hash) else 'in attesa'}",
        "payout_id": real_payout_id,
        "tx_hash": real_tx_hash,
        "explorer": f"https://bscscan.com/tx/{real_tx_hash}" if real_tx_hash else None,
    }


@router.get("/revenue-history")
async def revenue_withdrawal_history(
    limit: int = 50,
    current_user: dict = Depends(get_current_user),
):
    """Revenue withdrawal history — Admin only."""
    if current_user.get("role") != "ADMIN":
        raise HTTPException(status_code=403, detail="Admin only")
    from database.mongodb import get_database
    db = get_database()
    withdrawals = await db.revenue_withdrawals.find({}, {"_id": 0}).sort("created_at", -1).limit(limit).to_list(limit)
    return {"withdrawals": withdrawals, "count": len(withdrawals)}

@router.get("/report")
async def comprehensive_report(current_user: dict = Depends(get_current_user)):
    """
    Full cashout report: engine status + wallet balances + conversions + EUR accounts.
    Single endpoint for complete visibility.
    """
    from services.circle_wallet_service import CircleWalletService, WalletRole
    from services.execution_engine import ExecutionEngine

    cashout = CashoutEngine.get_instance()
    circle = CircleWalletService.get_instance()
    exec_engine = ExecutionEngine.get_instance()
    converter = AutoConversionEngine.get_instance()

    # Parallel data collection
    status = await cashout.get_status()
    usdc_balances = await circle.get_all_wallet_balances("BSC")
    hot_wallet = await exec_engine.get_hot_wallet_status()
    opportunities = await converter.evaluate_conversions(hot_wallet)
    conv_summary = await converter.get_summary()

    return {
        "engine": {
            "running": status["running"],
            "cycles": status["cycle_count"],
            "interval": status["interval_seconds"],
        },
        "extracted": status["cumulative"],
        "usdc_wallets": {
            role: usdc_balances["wallets"].get(role, {}).get("balance", 0)
            for role in [WalletRole.CLIENT, WalletRole.TREASURY, WalletRole.REVENUE]
        },
        "usdc_total": usdc_balances.get("total_usdc", 0),
        "hot_wallet": {
            "bnb": hot_wallet.get("bnb_balance", 0),
            "neno": hot_wallet.get("neno_balance", 0),
            "available": hot_wallet.get("available", False),
        },
        "conversion_opportunities": len(opportunities),
        "conversions": conv_summary,
        "eur_accounts": EUR_ACCOUNTS,
        "by_type": status.get("by_type", {}),
        "recent_cashouts": status.get("recent_cashouts", [])[:5],
        "timestamp": __import__("datetime").datetime.now(
            __import__("datetime").timezone.utc
        ).isoformat(),
    }
