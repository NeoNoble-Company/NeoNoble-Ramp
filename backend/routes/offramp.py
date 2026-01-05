"""Off-Ramp API Routes - Provider-of-Record Engine Endpoints"""

from fastapi import APIRouter, HTTPException, Depends, Header, Request
from typing import Optional, List
from datetime import datetime
import logging

from models.offramp import (
    QuoteRequest, QuoteResponse,
    TransactionCreate, TransactionResponse, TransactionListResponse,
    Transaction, Quote, TransactionStatus,
    APIKeyCreate, APIKeyResponse
)
from services.por_engine import PoREngine

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/offramp", tags=["Off-Ramp"])

# Dependency to get PoR engine instance
_por_engine: Optional[PoREngine] = None

def get_por_engine() -> PoREngine:
    if _por_engine is None:
        raise HTTPException(status_code=500, detail="PoR Engine not initialized")
    return _por_engine

def set_por_engine(engine: PoREngine):
    global _por_engine
    _por_engine = engine


# ==================== Public UI Endpoints ====================

@router.post("/quote", response_model=QuoteResponse)
async def create_quote(
    request: QuoteRequest,
    por: PoREngine = Depends(get_por_engine)
):
    """
    Create an off-ramp quote for NENO tokens
    
    - NENO fixed at €10,000 per unit
    - 1.5% PoR processing fee
    - Quote valid for 15 minutes
    - Returns deposit address for NENO
    """
    try:
        return await por.create_quote(request, source="ui")
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        logger.error(f"Quote creation failed: {e}")
        raise HTTPException(status_code=500, detail="Failed to create quote")


@router.get("/quote/{quote_id}", response_model=Quote)
async def get_quote(
    quote_id: str,
    por: PoREngine = Depends(get_por_engine)
):
    """Get quote details by ID"""
    quote = await por.get_quote(quote_id)
    if not quote:
        raise HTTPException(status_code=404, detail="Quote not found")
    return quote


@router.post("/execute", response_model=TransactionResponse)
async def execute_offramp(
    request: TransactionCreate,
    por: PoREngine = Depends(get_por_engine)
):
    """
    Execute an off-ramp transaction from an accepted quote
    
    This initiates the full PoR lifecycle:
    1. Validate quote & banking details
    2. Create transaction record
    3. Automatic deposit monitoring
    4. KYC/AML processing (PoR responsibility)
    5. Settlement & SEPA payout execution
    """
    try:
        return await por.execute_offramp(request, source="ui")
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        logger.error(f"Off-ramp execution failed: {e}")
        raise HTTPException(status_code=500, detail="Failed to execute off-ramp")


@router.get("/transaction/{transaction_id}", response_model=Transaction)
async def get_transaction(
    transaction_id: str,
    por: PoREngine = Depends(get_por_engine)
):
    """Get transaction details and current status"""
    transaction = await por.get_transaction(transaction_id)
    if not transaction:
        raise HTTPException(status_code=404, detail="Transaction not found")
    return transaction


@router.get("/transactions", response_model=TransactionListResponse)
async def list_transactions(
    user_id: Optional[str] = None,
    status: Optional[str] = None,
    limit: int = 20,
    page: int = 1,
    por: PoREngine = Depends(get_por_engine)
):
    """List off-ramp transactions with optional filtering"""
    try:
        status_enum = TransactionStatus(status) if status else None
    except ValueError:
        status_enum = None
    
    skip = (page - 1) * limit
    transactions, total = await por.list_transactions(
        user_id=user_id,
        status=status_enum,
        limit=limit,
        skip=skip
    )
    
    return TransactionListResponse(
        transactions=transactions,
        total=total,
        page=page,
        limit=limit
    )


@router.get("/status")
async def get_por_status(por: PoREngine = Depends(get_por_engine)):
    """
    Get PoR Engine status and statistics
    
    Returns:
    - Provider status
    - NENO pricing
    - Fee information
    - Transaction statistics
    """
    return await por.get_statistics()


@router.get("/config")
async def get_por_config():
    """Get PoR configuration for UI display"""
    return {
        "provider": "NeoNoble PoR Engine",
        "version": "1.0.0",
        "neno": {
            "symbol": "NENO",
            "chain": "BSC (Binance Smart Chain)",
            "price_eur": 10000.0,
            "price_model": "fixed",
            "min_amount": 0.01,
            "max_amount": 100.0
        },
        "fees": {
            "percentage": 1.5,
            "description": "PoR processing fee"
        },
        "payout": {
            "methods": ["SEPA", "SEPA_INSTANT"],
            "currencies": ["EUR"],
            "typical_time": "1-2 business days"
        },
        "quote_validity_minutes": 15,
        "required_confirmations": 15,
        "kyc_aml": {
            "handled_by": "Provider-of-Record",
            "kyc_required": True,
            "aml_screening": True
        },
        "status": "operational"
    }


# ==================== Developer API Endpoints ====================

developer_router = APIRouter(prefix="/v1/offramp", tags=["Developer API - Off-Ramp"])


async def validate_api_auth(
    x_api_key: str = Header(..., alias="X-API-Key"),
    x_api_secret: str = Header(..., alias="X-API-Secret"),
    por: PoREngine = Depends(get_por_engine)
):
    """Validate developer API key authentication"""
    api_key = await por.validate_api_key(x_api_key, x_api_secret)
    if not api_key:
        raise HTTPException(
            status_code=401,
            detail="Invalid API credentials",
            headers={"WWW-Authenticate": "API-Key"}
        )
    return api_key


@developer_router.post("/quote", response_model=QuoteResponse)
async def dev_create_quote(
    request: QuoteRequest,
    api_key = Depends(validate_api_auth),
    por: PoREngine = Depends(get_por_engine)
):
    """
    [Developer API] Create an off-ramp quote
    
    Requires: X-API-Key and X-API-Secret headers
    """
    try:
        return await por.create_quote(request, source="api", api_key_id=api_key.key_id)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@developer_router.get("/quote/{quote_id}", response_model=Quote)
async def dev_get_quote(
    quote_id: str,
    api_key = Depends(validate_api_auth),
    por: PoREngine = Depends(get_por_engine)
):
    """[Developer API] Get quote details"""
    quote = await por.get_quote(quote_id)
    if not quote:
        raise HTTPException(status_code=404, detail="Quote not found")
    return quote


@developer_router.post("/execute", response_model=TransactionResponse)
async def dev_execute_offramp(
    request: TransactionCreate,
    api_key = Depends(validate_api_auth),
    por: PoREngine = Depends(get_por_engine)
):
    """
    [Developer API] Execute off-ramp transaction
    
    Requires: X-API-Key and X-API-Secret headers
    """
    try:
        return await por.execute_offramp(request, source="api", api_key_id=api_key.key_id)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@developer_router.get("/transaction/{transaction_id}", response_model=Transaction)
async def dev_get_transaction(
    transaction_id: str,
    api_key = Depends(validate_api_auth),
    por: PoREngine = Depends(get_por_engine)
):
    """[Developer API] Get transaction details"""
    transaction = await por.get_transaction(transaction_id)
    if not transaction:
        raise HTTPException(status_code=404, detail="Transaction not found")
    return transaction


@developer_router.get("/transactions", response_model=TransactionListResponse)
async def dev_list_transactions(
    status: Optional[str] = None,
    limit: int = 20,
    page: int = 1,
    api_key = Depends(validate_api_auth),
    por: PoREngine = Depends(get_por_engine)
):
    """[Developer API] List transactions for this API key"""
    try:
        status_enum = TransactionStatus(status) if status else None
    except ValueError:
        status_enum = None
    
    skip = (page - 1) * limit
    transactions, total = await por.list_transactions(
        api_key_id=api_key.key_id,
        status=status_enum,
        limit=limit,
        skip=skip
    )
    
    return TransactionListResponse(
        transactions=transactions,
        total=total,
        page=page,
        limit=limit
    )


# ==================== API Key Management ====================

api_key_router = APIRouter(prefix="/developer", tags=["Developer Portal"])


@api_key_router.post("/api-keys", response_model=APIKeyResponse)
async def create_api_key(
    request: APIKeyCreate,
    por: PoREngine = Depends(get_por_engine)
):
    """
    Create a new developer API key
    
    Returns the secret ONCE - store it securely!
    """
    try:
        return await por.create_api_key(request)
    except Exception as e:
        logger.error(f"API key creation failed: {e}")
        raise HTTPException(status_code=500, detail="Failed to create API key")


@api_key_router.get("/api-keys")
async def list_api_keys(
    por: PoREngine = Depends(get_por_engine)
):
    """List all API keys (secrets are not returned)"""
    cursor = por.api_keys_collection.find({}, {"secret_hash": 0})
    keys = await cursor.to_list(100)
    return {"api_keys": keys}
