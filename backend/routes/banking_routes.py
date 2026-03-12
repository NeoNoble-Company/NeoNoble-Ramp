"""
Banking Rails API Routes.

IBAN Infrastructure for NeoNoble Ramp:
- Virtual IBAN assignment per user
- SEPA deposit tracking
- Withdrawal to external bank accounts
- Banking transaction history
"""

from fastapi import APIRouter, HTTPException, Depends, Query
from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime, timezone
import uuid

from database.mongodb import get_database
from routes.auth import get_current_user

router = APIRouter(prefix="/banking", tags=["Banking Rails"])


class IBANRequest(BaseModel):
    currency: str = Field(default="EUR")
    beneficiary_name: Optional[str] = None


class SEPAWithdrawRequest(BaseModel):
    amount: float = Field(gt=0)
    destination_iban: str
    beneficiary_name: str
    reference: Optional[str] = None


class SEPADepositNotify(BaseModel):
    amount: float = Field(gt=0)
    sender_iban: str
    sender_name: str
    reference: Optional[str] = None


# IBAN generation (production: via banking partner API like NIUM/Modulr)
def _generate_virtual_iban(user_id: str) -> str:
    """Generate a virtual IBAN. In production, this calls the banking partner API."""
    suffix = user_id.replace("-", "")[:12].upper()
    check = str(hash(suffix) % 100).zfill(2)
    return f"NE{check}NEONOBLE{suffix}"


@router.post("/iban/assign")
async def assign_virtual_iban(request: IBANRequest, current_user: dict = Depends(get_current_user)):
    """Assign a virtual IBAN to the user for receiving SEPA deposits."""
    db = get_database()
    user_id = current_user["user_id"]

    existing = await db.virtual_ibans.find_one({"user_id": user_id, "currency": request.currency})
    if existing:
        existing.pop("_id", None)
        if "created_at" in existing and hasattr(existing["created_at"], "isoformat"):
            existing["created_at"] = existing["created_at"].isoformat()
        return {"message": "IBAN gia' assegnato", "iban": existing}

    user = await db.users.find_one({"id": user_id}, {"_id": 0, "email": 1})
    iban_record = {
        "id": str(uuid.uuid4()),
        "user_id": user_id,
        "iban": _generate_virtual_iban(user_id),
        "bic": "NEONOBLEXXX",
        "bank_name": "NeoNoble Digital Banking",
        "beneficiary_name": request.beneficiary_name or user.get("email", "").split("@")[0].title(),
        "currency": request.currency,
        "status": "active",
        "deposits_enabled": True,
        "withdrawals_enabled": True,
        "total_deposited": 0.0,
        "total_withdrawn": 0.0,
        "created_at": datetime.now(timezone.utc),
    }

    await db.virtual_ibans.insert_one({**iban_record, "_id": iban_record["id"]})
    iban_record["created_at"] = iban_record["created_at"].isoformat()
    return {"message": "IBAN virtuale assegnato", "iban": iban_record}


@router.get("/iban")
async def get_my_ibans(current_user: dict = Depends(get_current_user)):
    """Get all virtual IBANs for current user."""
    db = get_database()
    ibans = await db.virtual_ibans.find(
        {"user_id": current_user["user_id"]}, {"_id": 0}
    ).to_list(10)
    for ib in ibans:
        if "created_at" in ib and hasattr(ib["created_at"], "isoformat"):
            ib["created_at"] = ib["created_at"].isoformat()
    return {"ibans": ibans, "total": len(ibans)}


@router.post("/sepa/withdraw")
async def sepa_withdrawal(request: SEPAWithdrawRequest, current_user: dict = Depends(get_current_user)):
    """Initiate a SEPA withdrawal to an external bank account."""
    db = get_database()
    user_id = current_user["user_id"]

    wallet = await db.wallets.find_one({"user_id": user_id, "asset": "EUR"})
    balance = wallet.get("balance", 0) if wallet else 0
    if balance < request.amount:
        raise HTTPException(status_code=400, detail=f"Saldo EUR insufficiente: {balance:.2f}")

    fee = round(request.amount * 0.001, 2)
    if fee < 0.50:
        fee = 0.50
    net_amount = round(request.amount - fee, 2)

    tx = {
        "id": str(uuid.uuid4()),
        "user_id": user_id,
        "type": "sepa_withdrawal",
        "amount": request.amount,
        "fee": fee,
        "net_amount": net_amount,
        "currency": "EUR",
        "destination_iban": request.destination_iban,
        "beneficiary_name": request.beneficiary_name,
        "reference": request.reference or f"NEONOBLE-{uuid.uuid4().hex[:8].upper()}",
        "status": "processing",
        "estimated_arrival": "1-2 giorni lavorativi",
        "created_at": datetime.now(timezone.utc),
    }

    await db.wallets.update_one({"user_id": user_id, "asset": "EUR"}, {"$inc": {"balance": -request.amount}})
    await db.banking_transactions.insert_one({**tx, "_id": tx["id"]})

    await db.virtual_ibans.update_one(
        {"user_id": user_id, "currency": "EUR"},
        {"$inc": {"total_withdrawn": request.amount}},
    )

    tx["created_at"] = tx["created_at"].isoformat()
    return {"message": f"Bonifico SEPA di EUR {net_amount:.2f} in elaborazione", "transaction": tx}


@router.post("/sepa/deposit")
async def sepa_deposit(request: SEPADepositNotify, current_user: dict = Depends(get_current_user)):
    """Record a SEPA deposit (simulated — in production triggered by banking webhook)."""
    db = get_database()
    user_id = current_user["user_id"]

    tx = {
        "id": str(uuid.uuid4()),
        "user_id": user_id,
        "type": "sepa_deposit",
        "amount": request.amount,
        "fee": 0.0,
        "net_amount": request.amount,
        "currency": "EUR",
        "sender_iban": request.sender_iban,
        "sender_name": request.sender_name,
        "reference": request.reference or f"DEP-{uuid.uuid4().hex[:8].upper()}",
        "status": "completed",
        "created_at": datetime.now(timezone.utc),
    }

    await db.wallets.update_one(
        {"user_id": user_id, "asset": "EUR"},
        {"$inc": {"balance": request.amount}, "$setOnInsert": {"user_id": user_id, "asset": "EUR"}},
        upsert=True,
    )
    await db.banking_transactions.insert_one({**tx, "_id": tx["id"]})

    await db.virtual_ibans.update_one(
        {"user_id": user_id, "currency": "EUR"},
        {"$inc": {"total_deposited": request.amount}},
    )

    tx["created_at"] = tx["created_at"].isoformat()
    return {"message": f"Deposito SEPA di EUR {request.amount:.2f} accreditato", "transaction": tx}


@router.get("/transactions")
async def get_banking_transactions(
    limit: int = Query(50, ge=1, le=200),
    current_user: dict = Depends(get_current_user),
):
    """Get banking transaction history."""
    db = get_database()
    txs = await db.banking_transactions.find(
        {"user_id": current_user["user_id"]}, {"_id": 0}
    ).sort("created_at", -1).limit(limit).to_list(limit)
    for t in txs:
        if "created_at" in t and hasattr(t["created_at"], "isoformat"):
            t["created_at"] = t["created_at"].isoformat()
    return {"transactions": txs, "total": len(txs)}


@router.get("/admin/overview")
async def admin_banking_overview(current_user: dict = Depends(get_current_user)):
    """Admin overview of banking infrastructure."""
    if current_user.get("role") != "ADMIN":
        raise HTTPException(status_code=403, detail="Admin access required")
    db = get_database()
    total_ibans = await db.virtual_ibans.count_documents({})
    active_ibans = await db.virtual_ibans.count_documents({"status": "active"})
    total_deposits = await db.banking_transactions.count_documents({"type": "sepa_deposit"})
    total_withdrawals = await db.banking_transactions.count_documents({"type": "sepa_withdrawal"})

    pipeline = [
        {"$group": {"_id": "$type", "total": {"$sum": "$amount"}, "count": {"$sum": 1}}}
    ]
    stats = await db.banking_transactions.aggregate(pipeline).to_list(10)
    by_type = {s["_id"]: {"total_eur": s["total"], "count": s["count"]} for s in stats}

    return {
        "ibans": {"total": total_ibans, "active": active_ibans},
        "transactions": {"deposits": total_deposits, "withdrawals": total_withdrawals},
        "volume": by_type,
    }
