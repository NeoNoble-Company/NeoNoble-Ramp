"""
Multi-Chain Wallet API Routes.

On-chain wallet synchronization for:
- Real-time balance reading across chains
- Multi-chain support (ETH, BSC, Polygon)
- Token discovery and tracking
- Transaction history per chain
"""

from fastapi import APIRouter, HTTPException, Depends, Query
from pydantic import BaseModel, Field
from typing import Optional

from routes.auth import get_current_user
from services.multichain_service import (
    get_all_balances,
    sync_wallet_onchain,
    get_supported_chains,
    get_recent_transactions,
    CHAINS,
)
from database.mongodb import get_database

router = APIRouter(prefix="/multichain", tags=["Multi-Chain Wallet"])


class LinkWalletRequest(BaseModel):
    address: str
    chain: str = Field(default="ethereum")


class SyncRequest(BaseModel):
    chain: str


@router.get("/chains")
async def list_supported_chains():
    """Get all supported blockchain networks."""
    chains = await get_supported_chains()
    return {"chains": chains, "total": len(chains)}


@router.post("/link")
async def link_wallet(request: LinkWalletRequest, current_user: dict = Depends(get_current_user)):
    """Link a wallet address and sync on-chain balances."""
    if request.chain not in CHAINS:
        raise HTTPException(status_code=400, detail=f"Chain non supportata: {request.chain}")

    if not request.address or len(request.address) != 42 or not request.address.startswith("0x"):
        raise HTTPException(status_code=400, detail="Indirizzo wallet non valido")

    db = get_database()
    await db.user_wallets.update_one(
        {"user_id": current_user["user_id"]},
        {
            "$addToSet": {"linked_addresses": {"address": request.address, "chain": request.chain}},
            "$setOnInsert": {"user_id": current_user["user_id"]},
        },
        upsert=True,
    )

    balances = await sync_wallet_onchain(current_user["user_id"], request.address, request.chain)
    return {"message": f"Wallet collegato su {CHAINS[request.chain]['name']}", "balances": balances}


@router.post("/sync")
async def sync_chain(request: SyncRequest, current_user: dict = Depends(get_current_user)):
    """Force sync wallet balances for a specific chain."""
    if request.chain not in CHAINS:
        raise HTTPException(status_code=400, detail=f"Chain non supportata: {request.chain}")

    db = get_database()
    user_wallet = await db.user_wallets.find_one({"user_id": current_user["user_id"]})
    if not user_wallet:
        raise HTTPException(status_code=404, detail="Nessun wallet collegato")

    linked = user_wallet.get("linked_addresses", [])
    chain_addresses = [la for la in linked if la.get("chain") == request.chain]
    if not chain_addresses:
        raise HTTPException(status_code=404, detail=f"Nessun wallet collegato per {request.chain}")

    results = []
    for la in chain_addresses:
        bal = await sync_wallet_onchain(current_user["user_id"], la["address"], request.chain)
        results.append(bal)

    return {"chain": request.chain, "synced_wallets": results}


@router.get("/balances")
async def get_multichain_balances(current_user: dict = Depends(get_current_user)):
    """Get all on-chain balances across all linked chains."""
    db = get_database()
    wallets = await db.onchain_wallets.find(
        {"user_id": current_user["user_id"]}, {"_id": 0}
    ).to_list(20)

    for w in wallets:
        if "last_sync" in w and hasattr(w["last_sync"], "isoformat"):
            w["last_sync"] = w["last_sync"].isoformat()
        if "created_at" in w and hasattr(w["created_at"], "isoformat"):
            w["created_at"] = w["created_at"].isoformat()

    return {"wallets": wallets, "total_chains": len(wallets)}


@router.get("/balances/{chain}")
async def get_chain_balances(chain: str, current_user: dict = Depends(get_current_user)):
    """Get balances for a specific chain."""
    if chain not in CHAINS:
        raise HTTPException(status_code=400, detail=f"Chain non supportata: {chain}")

    db = get_database()
    wallet = await db.onchain_wallets.find_one(
        {"user_id": current_user["user_id"], "chain": chain}, {"_id": 0}
    )
    if not wallet:
        return {"chain": chain, "synced": False, "message": "Nessun wallet sincronizzato per questa chain"}

    if "last_sync" in wallet and hasattr(wallet["last_sync"], "isoformat"):
        wallet["last_sync"] = wallet["last_sync"].isoformat()
    if "created_at" in wallet and hasattr(wallet["created_at"], "isoformat"):
        wallet["created_at"] = wallet["created_at"].isoformat()

    return wallet


@router.get("/transactions/{chain}")
async def get_chain_transactions(
    chain: str,
    limit: int = Query(20, ge=1, le=100),
    current_user: dict = Depends(get_current_user),
):
    """Get on-chain transactions for a chain."""
    db = get_database()
    user_wallet = await db.user_wallets.find_one({"user_id": current_user["user_id"]})
    if not user_wallet:
        return {"transactions": [], "total": 0}

    linked = user_wallet.get("linked_addresses", [])
    chain_addresses = [la["address"] for la in linked if la.get("chain") == chain]
    if not chain_addresses:
        return {"transactions": [], "total": 0}

    txs = await get_recent_transactions(chain, chain_addresses[0], limit)
    return {"transactions": txs, "total": len(txs), "chain": chain}


@router.get("/linked")
async def get_linked_wallets(current_user: dict = Depends(get_current_user)):
    """Get all linked wallet addresses."""
    db = get_database()
    user_wallet = await db.user_wallets.find_one(
        {"user_id": current_user["user_id"]}, {"_id": 0}
    )
    if not user_wallet:
        return {"linked_addresses": [], "total": 0}
    return {"linked_addresses": user_wallet.get("linked_addresses", []), "total": len(user_wallet.get("linked_addresses", []))}
