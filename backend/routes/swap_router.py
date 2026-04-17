from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from decimal import Decimal
from typing import Optional

from backend.engines.swap_engine import SwapEngine, SwapRequest

router = APIRouter(prefix="/api/swap", tags=["Swap"])

swap_engine = SwapEngine()

class SwapRequestAPI(BaseModel):
    from_token: str
    to_token: str
    amount_in: Decimal
    chain: str = "bsc"
    slippage: float = 0.8

class SwapResponse(BaseModel):
    success: bool
    tx_hash: Optional[str] = None
    amount_out_min: Optional[Decimal] = None
    error: Optional[str] = None


@router.post("/", response_model=SwapResponse)
async def perform_swap(request: SwapRequestAPI):
    """Esegue uno swap on-chain reale"""
    try:
        swap_req = SwapRequest(
            user_id="current_user",   # da sostituire con auth reale
            from_token=request.from_token,
            to_token=request.to_token,
            amount_in=request.amount_in,
            chain=request.chain,
            slippage=request.slippage
        )

        result = await swap_engine.execute_swap(swap_req)

        if not result.success:
            raise HTTPException(status_code=400, detail=result.error or "Swap failed")

        return SwapResponse(
            success=True,
            tx_hash=result.tx_hash,
            amount_out_min=result.amount_out_min,
            error=None
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal error: {str(e)}")
