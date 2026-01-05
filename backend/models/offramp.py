"""NENO Off-Ramp Models - Provider-of-Record Engine"""

from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any
from datetime import datetime
from enum import Enum
import uuid


class TransactionStatus(str, Enum):
    """Off-ramp transaction lifecycle states"""
    QUOTE_CREATED = "quote_created"
    QUOTE_ACCEPTED = "quote_accepted"
    DEPOSIT_PENDING = "deposit_pending"
    DEPOSIT_CONFIRMED = "deposit_confirmed"
    KYC_PENDING = "kyc_pending"
    KYC_VERIFIED = "kyc_verified"
    AML_SCREENING = "aml_screening"
    AML_CLEARED = "aml_cleared"
    SETTLEMENT_PROCESSING = "settlement_processing"
    PAYOUT_INITIATED = "payout_initiated"
    PAYOUT_COMPLETED = "payout_completed"
    COMPLETED = "completed"
    FAILED = "failed"
    EXPIRED = "expired"
    CANCELLED = "cancelled"
    REFUNDED = "refunded"


class PayoutMethod(str, Enum):
    """Supported payout methods"""
    SEPA = "sepa"
    SEPA_INSTANT = "sepa_instant"
    WIRE = "wire"


class KYCStatus(str, Enum):
    """KYC verification status"""
    NOT_REQUIRED = "not_required"
    PENDING = "pending"
    IN_REVIEW = "in_review"
    VERIFIED = "verified"
    REJECTED = "rejected"


class AMLStatus(str, Enum):
    """AML screening status"""
    PENDING = "pending"
    SCREENING = "screening"
    CLEARED = "cleared"
    FLAGGED = "flagged"
    REJECTED = "rejected"


# ==================== Quote Models ====================

class QuoteRequest(BaseModel):
    """Request model for creating an off-ramp quote"""
    neno_amount: float = Field(..., gt=0, description="Amount of NENO tokens to sell")
    payout_currency: str = Field(default="EUR", description="Payout currency (EUR supported)")
    payout_method: PayoutMethod = Field(default=PayoutMethod.SEPA)
    wallet_address: str = Field(..., description="BSC wallet address holding NENO")
    iban: Optional[str] = Field(None, description="IBAN for SEPA payout")
    bic: Optional[str] = Field(None, description="BIC/SWIFT code")
    account_holder: Optional[str] = Field(None, description="Account holder name")
    user_id: Optional[str] = Field(None, description="User identifier")
    reference: Optional[str] = Field(None, description="Client reference")


class Quote(BaseModel):
    """Off-ramp quote model"""
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    quote_id: str = Field(default_factory=lambda: f"QT-{uuid.uuid4().hex[:12].upper()}")
    
    # Token details
    neno_amount: float
    neno_price_eur: float = 10000.0  # Fixed €10,000 per NENO
    
    # Payout details
    gross_amount_eur: float  # neno_amount * neno_price_eur
    fee_amount_eur: float  # PoR fee
    fee_percentage: float = 1.5  # 1.5% PoR fee
    net_payout_eur: float  # gross - fee
    payout_currency: str = "EUR"
    payout_method: PayoutMethod = PayoutMethod.SEPA
    
    # Wallet & Banking
    wallet_address: str
    deposit_address: Optional[str] = None  # BSC address to send NENO
    iban: Optional[str] = None
    bic: Optional[str] = None
    account_holder: Optional[str] = None
    
    # Metadata
    user_id: Optional[str] = None
    reference: Optional[str] = None
    provider: str = "neonoble_por"  # Internal PoR
    
    # Timestamps & Status
    status: TransactionStatus = TransactionStatus.QUOTE_CREATED
    expires_at: datetime
    created_at: datetime = Field(default_factory=datetime.utcnow)
    
    # API source
    source: str = "ui"  # 'ui' or 'api'
    api_key_id: Optional[str] = None


# ==================== Transaction Models ====================

class TransactionCreate(BaseModel):
    """Request to execute an off-ramp from a quote"""
    quote_id: str
    iban: str = Field(..., description="IBAN for SEPA payout")
    bic: Optional[str] = Field(None, description="BIC/SWIFT code")
    account_holder: str = Field(..., description="Account holder name")
    accept_terms: bool = Field(default=True)


class Transaction(BaseModel):
    """Off-ramp transaction model - Full lifecycle"""
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    transaction_id: str = Field(default_factory=lambda: f"TX-{uuid.uuid4().hex[:12].upper()}")
    quote_id: str
    
    # Token details
    neno_amount: float
    neno_price_eur: float = 10000.0
    
    # Financial details
    gross_amount_eur: float
    fee_amount_eur: float
    fee_percentage: float
    net_payout_eur: float
    payout_currency: str = "EUR"
    payout_method: PayoutMethod = PayoutMethod.SEPA
    
    # Wallet & Deposit
    wallet_address: str
    deposit_address: str  # PoR's BSC address for NENO deposit
    deposit_tx_hash: Optional[str] = None
    deposit_confirmed_at: Optional[datetime] = None
    deposit_confirmations: int = 0
    
    # Banking details
    iban: str
    bic: Optional[str] = None
    account_holder: str
    
    # KYC/AML - PoR responsibility
    kyc_status: KYCStatus = KYCStatus.NOT_REQUIRED
    kyc_verified_at: Optional[datetime] = None
    aml_status: AMLStatus = AMLStatus.PENDING
    aml_cleared_at: Optional[datetime] = None
    aml_risk_score: Optional[float] = None
    
    # Settlement & Payout
    settlement_id: Optional[str] = None
    settlement_initiated_at: Optional[datetime] = None
    payout_reference: Optional[str] = None
    payout_initiated_at: Optional[datetime] = None
    payout_completed_at: Optional[datetime] = None
    
    # Status & Lifecycle
    status: TransactionStatus = TransactionStatus.QUOTE_ACCEPTED
    status_history: List[Dict[str, Any]] = Field(default_factory=list)
    failure_reason: Optional[str] = None
    
    # Metadata
    user_id: Optional[str] = None
    reference: Optional[str] = None
    provider: str = "neonoble_por"
    source: str = "ui"
    api_key_id: Optional[str] = None
    
    # Timestamps
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    completed_at: Optional[datetime] = None
    expires_at: Optional[datetime] = None


# ==================== Settlement Models ====================

class Settlement(BaseModel):
    """PoR Settlement record"""
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    settlement_id: str = Field(default_factory=lambda: f"ST-{uuid.uuid4().hex[:12].upper()}")
    transaction_id: str
    
    # Settlement details
    neno_amount: float
    settlement_amount_eur: float
    fee_collected_eur: float
    
    # PoR internal tracking
    liquidity_pool_debit: float
    neno_received: bool = False
    neno_burned: bool = False  # If applicable
    
    # SEPA Payout
    sepa_batch_id: Optional[str] = None
    sepa_reference: Optional[str] = None
    sepa_status: str = "pending"
    sepa_initiated_at: Optional[datetime] = None
    sepa_completed_at: Optional[datetime] = None
    
    # Status
    status: str = "pending"
    created_at: datetime = Field(default_factory=datetime.utcnow)
    completed_at: Optional[datetime] = None


# ==================== Developer API Models ====================

class APIKey(BaseModel):
    """Developer API Key model"""
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    key_id: str = Field(default_factory=lambda: f"pk_{uuid.uuid4().hex[:24]}")
    secret_hash: str  # Hashed secret
    name: str
    user_id: Optional[str] = None
    
    # Permissions
    permissions: List[str] = Field(default_factory=lambda: ["offramp:read", "offramp:write"])
    rate_limit: int = 100  # requests per minute
    
    # Status
    is_active: bool = True
    last_used_at: Optional[datetime] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    expires_at: Optional[datetime] = None


class APIKeyCreate(BaseModel):
    """Request to create API key"""
    name: str = Field(..., min_length=3, max_length=100)
    permissions: List[str] = Field(default_factory=lambda: ["offramp:read", "offramp:write"])


class APIKeyResponse(BaseModel):
    """Response when creating API key (includes secret once)"""
    key_id: str
    secret: str  # Only shown once on creation
    name: str
    permissions: List[str]
    created_at: datetime


# ==================== Response Models ====================

class QuoteResponse(BaseModel):
    """Quote response for API"""
    success: bool = True
    quote: Quote
    deposit_instructions: Dict[str, Any]
    expiry_seconds: int


class TransactionResponse(BaseModel):
    """Transaction response for API"""
    success: bool = True
    transaction: Transaction
    next_steps: List[str]


class TransactionListResponse(BaseModel):
    """List transactions response"""
    success: bool = True
    transactions: List[Transaction]
    total: int
    page: int
    limit: int
