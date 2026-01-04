from motor.motor_asyncio import AsyncIOMotorDatabase
from typing import Optional, List
from datetime import datetime, timezone, timedelta
from enum import Enum
import logging
import uuid
import os
import asyncio

from models.transaction import (
    Transaction,
    TransactionCreate,
    TransactionResponse,
    TransactionType,
    TransactionStatus
)
from models.quote import QuoteRequest, QuoteResponse, RampRequest, RampResponse
from services.pricing_service import pricing_service

logger = logging.getLogger(__name__)

# Quote validity duration - configurable via environment variable
QUOTE_VALIDITY_MINUTES = int(os.environ.get('QUOTE_TTL_MINUTES', 5))


class QuoteStatus(str, Enum):
    """Status of a quote in the system."""
    AVAILABLE = "AVAILABLE"      # Quote can be confirmed
    LOCKED = "LOCKED"            # Quote is being processed (confirmation in progress)
    CONFIRMED = "CONFIRMED"      # Quote has been confirmed and transaction created
    EXPIRED = "EXPIRED"          # Quote has expired (TTL exceeded)


class QuoteEntry:
    """Represents a cached quote with its status and metadata."""
    
    def __init__(self, quote: QuoteResponse, expires_at: datetime):
        self.quote = quote
        self.expires_at = expires_at
        self.status = QuoteStatus.AVAILABLE
        self.locked_at: Optional[datetime] = None
        self.confirmed_at: Optional[datetime] = None
        self.transaction_id: Optional[str] = None
        self._lock = asyncio.Lock()
    
    def is_expired(self) -> bool:
        """Check if the quote has expired based on TTL."""
        return datetime.now(timezone.utc) > self.expires_at
    
    def is_available(self) -> bool:
        """Check if the quote is available for confirmation."""
        return self.status == QuoteStatus.AVAILABLE and not self.is_expired()
    
    async def try_lock(self) -> tuple[bool, Optional[str]]:
        """
        Attempt to lock the quote for processing.
        
        Returns:
            Tuple of (success, error_message)
        """
        async with self._lock:
            if self.is_expired():
                self.status = QuoteStatus.EXPIRED
                return False, "Quote has expired"
            
            if self.status == QuoteStatus.LOCKED:
                return False, "Quote is already being processed"
            
            if self.status == QuoteStatus.CONFIRMED:
                return False, "Quote has already been confirmed"
            
            if self.status == QuoteStatus.EXPIRED:
                return False, "Quote has expired"
            
            # Lock the quote
            self.status = QuoteStatus.LOCKED
            self.locked_at = datetime.now(timezone.utc)
            logger.info(f"Quote {self.quote.quote_id} locked for processing")
            return True, None
    
    async def confirm(self, transaction_id: str) -> None:
        """Mark the quote as confirmed with the associated transaction."""
        async with self._lock:
            self.status = QuoteStatus.CONFIRMED
            self.confirmed_at = datetime.now(timezone.utc)
            self.transaction_id = transaction_id
            logger.info(f"Quote {self.quote.quote_id} confirmed with transaction {transaction_id}")
    
    async def unlock(self) -> None:
        """Release the lock (e.g., if processing failed)."""
        async with self._lock:
            if self.status == QuoteStatus.LOCKED:
                self.status = QuoteStatus.AVAILABLE
                self.locked_at = None
                logger.info(f"Quote {self.quote.quote_id} unlocked")


# In-memory quote cache (in production, use Redis with distributed locks)
_quote_cache: dict[str, QuoteEntry] = {}


class RampService:
    def __init__(self, db: AsyncIOMotorDatabase):
        self.db = db
        self.collection = db.transactions
    
    async def create_onramp_quote(self, fiat_amount: float, crypto_currency: str) -> QuoteResponse:
        """Create an onramp quote (Fiat -> Crypto)."""
        quote_data = await pricing_service.calculate_onramp_quote(
            fiat_amount=fiat_amount,
            crypto=crypto_currency
        )
        
        quote_id = f"quote_{uuid.uuid4().hex[:16]}"
        valid_until = datetime.now(timezone.utc) + timedelta(minutes=QUOTE_VALIDITY_MINUTES)
        
        quote = QuoteResponse(
            quote_id=quote_id,
            direction="onramp",
            valid_until=valid_until,
            **quote_data
        )
        
        # Cache the quote with status tracking
        _quote_cache[quote_id] = QuoteEntry(quote=quote, expires_at=valid_until)
        
        logger.info(f"Created onramp quote: {quote_id} - {fiat_amount} EUR -> {quote.crypto_amount} {crypto_currency}")
        return quote
    
    async def create_offramp_quote(self, crypto_amount: float, crypto_currency: str) -> QuoteResponse:
        """Create an offramp quote (Crypto -> Fiat)."""
        quote_data = await pricing_service.calculate_offramp_quote(
            crypto_amount=crypto_amount,
            crypto=crypto_currency
        )
        
        quote_id = f"quote_{uuid.uuid4().hex[:16]}"
        valid_until = datetime.now(timezone.utc) + timedelta(minutes=QUOTE_VALIDITY_MINUTES)
        
        quote = QuoteResponse(
            quote_id=quote_id,
            direction="offramp",
            valid_until=valid_until,
            **quote_data
        )
        
        # Cache the quote with status tracking
        _quote_cache[quote_id] = QuoteEntry(quote=quote, expires_at=valid_until)
        
        logger.info(f"Created offramp quote: {quote_id} - {crypto_amount} {crypto_currency} -> {quote.fiat_amount} EUR")
        return quote
    
    def _get_quote_entry(self, quote_id: str) -> tuple[Optional[QuoteEntry], Optional[str]]:
        """
        Get a quote entry from cache with validation.
        
        Returns:
            Tuple of (QuoteEntry, None) if found, or (None, error_message)
        """
        entry = _quote_cache.get(quote_id)
        if not entry:
            return None, "Quote not found or expired"
        return entry, None
    
    async def execute_onramp(
        self,
        quote_id: str,
        wallet_address: str,
        user_id: Optional[str] = None,
        api_key_id: Optional[str] = None
    ) -> tuple[Optional[RampResponse], Optional[str]]:
        """Execute an onramp transaction with quote locking."""
        
        # Get quote entry
        entry, error = self._get_quote_entry(quote_id)
        if error:
            return None, error
        
        quote = entry.quote
        
        # Validate quote type
        if quote.direction != "onramp":
            return None, "Invalid quote type for onramp"
        
        # Validate wallet address
        if not wallet_address:
            return None, "Wallet address is required for onramp"
        
        # Try to lock the quote (prevents double confirmation)
        lock_success, lock_error = await entry.try_lock()
        if not lock_success:
            logger.warning(f"Failed to lock quote {quote_id}: {lock_error}")
            return None, lock_error
        
        try:
            # Create transaction
            transaction = Transaction(
                user_id=user_id,
                api_key_id=api_key_id,
                type=TransactionType.ONRAMP,
                fiat_currency=quote.fiat_currency,
                fiat_amount=quote.fiat_amount,
                crypto_currency=quote.crypto_currency,
                crypto_amount=quote.crypto_amount,
                exchange_rate=quote.exchange_rate,
                fee_amount=quote.fee_amount,
                fee_currency=quote.fee_currency,
                wallet_address=wallet_address,
                status=TransactionStatus.PROCESSING,
                metadata={"quote_id": quote_id}
            )
            
            # Save to database
            tx_dict = transaction.model_dump()
            for field in ['created_at', 'updated_at', 'completed_at']:
                if tx_dict.get(field):
                    tx_dict[field] = tx_dict[field].isoformat()
            await self.collection.insert_one(tx_dict)
            
            # Mark quote as confirmed
            await entry.confirm(transaction.id)
            
            # In a real system, this would trigger payment processing
            # For now, we'll simulate a successful transaction
            await self._complete_transaction(transaction.id)
            
            logger.info(f"Executed onramp: {transaction.reference} - {quote.total_fiat} EUR -> {quote.crypto_amount} {quote.crypto_currency}")
            
            return RampResponse(
                transaction_id=transaction.id,
                reference=transaction.reference,
                status=TransactionStatus.PROCESSING.value,
                direction="onramp",
                fiat_currency=quote.fiat_currency,
                fiat_amount=quote.fiat_amount,
                crypto_currency=quote.crypto_currency,
                crypto_amount=quote.crypto_amount,
                exchange_rate=quote.exchange_rate,
                fee_amount=quote.fee_amount,
                total_fiat=quote.total_fiat,
                wallet_address=wallet_address,
                bank_account=None,
                created_at=transaction.created_at,
                message="Transaction initiated. Crypto will be sent to your wallet once payment is confirmed."
            ), None
            
        except Exception as e:
            # If anything fails, unlock the quote so it can be retried
            await entry.unlock()
            logger.error(f"Failed to execute onramp for quote {quote_id}: {e}")
            return None, f"Transaction failed: {str(e)}"
    
    async def execute_offramp(
        self,
        quote_id: str,
        bank_account: str,
        user_id: Optional[str] = None,
        api_key_id: Optional[str] = None
    ) -> tuple[Optional[RampResponse], Optional[str]]:
        """Execute an offramp transaction with quote locking."""
        
        # Get quote entry
        entry, error = self._get_quote_entry(quote_id)
        if error:
            return None, error
        
        quote = entry.quote
        
        # Validate quote type
        if quote.direction != "offramp":
            return None, "Invalid quote type for offramp"
        
        # Validate bank account
        if not bank_account:
            return None, "Bank account is required for offramp"
        
        # Try to lock the quote (prevents double confirmation)
        lock_success, lock_error = await entry.try_lock()
        if not lock_success:
            logger.warning(f"Failed to lock quote {quote_id}: {lock_error}")
            return None, lock_error
        
        try:
            # Create transaction
            transaction = Transaction(
                user_id=user_id,
                api_key_id=api_key_id,
                type=TransactionType.OFFRAMP,
                fiat_currency=quote.fiat_currency,
                fiat_amount=quote.fiat_amount,
                crypto_currency=quote.crypto_currency,
                crypto_amount=quote.crypto_amount,
                exchange_rate=quote.exchange_rate,
                fee_amount=quote.fee_amount,
                fee_currency=quote.fee_currency,
                bank_account=bank_account,
                status=TransactionStatus.PROCESSING,
                metadata={"quote_id": quote_id}
            )
            
            # Save to database
            tx_dict = transaction.model_dump()
            for field in ['created_at', 'updated_at', 'completed_at']:
                if tx_dict.get(field):
                    tx_dict[field] = tx_dict[field].isoformat()
            await self.collection.insert_one(tx_dict)
            
            # Mark quote as confirmed
            await entry.confirm(transaction.id)
            
            # Simulate processing
            await self._complete_transaction(transaction.id)
            
            logger.info(f"Executed offramp: {transaction.reference} - {quote.crypto_amount} {quote.crypto_currency} -> {quote.total_fiat} EUR")
            
            return RampResponse(
                transaction_id=transaction.id,
                reference=transaction.reference,
                status=TransactionStatus.PROCESSING.value,
                direction="offramp",
                fiat_currency=quote.fiat_currency,
                fiat_amount=quote.fiat_amount,
                crypto_currency=quote.crypto_currency,
                crypto_amount=quote.crypto_amount,
                exchange_rate=quote.exchange_rate,
                fee_amount=quote.fee_amount,
                total_fiat=quote.total_fiat,
                wallet_address=None,
                bank_account=bank_account,
                created_at=transaction.created_at,
                message="Transaction initiated. Funds will be sent to your bank account once crypto is received."
            ), None
            
        except Exception as e:
            # If anything fails, unlock the quote so it can be retried
            await entry.unlock()
            logger.error(f"Failed to execute offramp for quote {quote_id}: {e}")
            return None, f"Transaction failed: {str(e)}"
    
    async def get_quote_status(self, quote_id: str) -> Optional[dict]:
        """Get the current status of a quote."""
        entry = _quote_cache.get(quote_id)
        if not entry:
            return None
        
        return {
            "quote_id": quote_id,
            "status": entry.status.value,
            "is_expired": entry.is_expired(),
            "is_available": entry.is_available(),
            "locked_at": entry.locked_at.isoformat() if entry.locked_at else None,
            "confirmed_at": entry.confirmed_at.isoformat() if entry.confirmed_at else None,
            "transaction_id": entry.transaction_id,
            "expires_at": entry.expires_at.isoformat()
        }
    
    async def _complete_transaction(self, transaction_id: str):
        """Mark a transaction as completed (simulation)."""
        await self.collection.update_one(
            {"id": transaction_id},
            {
                "$set": {
                    "status": TransactionStatus.COMPLETED.value,
                    "completed_at": datetime.now(timezone.utc).isoformat(),
                    "updated_at": datetime.now(timezone.utc).isoformat()
                }
            }
        )
    
    async def get_user_transactions(
        self,
        user_id: str,
        limit: int = 50
    ) -> List[TransactionResponse]:
        """Get transactions for a user."""
        transactions = []
        cursor = self.collection.find(
            {"user_id": user_id}
        ).sort("created_at", -1).limit(limit)
        
        async for doc in cursor:
            tx = self._doc_to_response(doc)
            transactions.append(tx)
        
        return transactions
    
    def _doc_to_response(self, doc: dict) -> TransactionResponse:
        """Convert MongoDB document to TransactionResponse."""
        for field in ['created_at', 'updated_at', 'completed_at']:
            if doc.get(field) and isinstance(doc[field], str):
                doc[field] = datetime.fromisoformat(doc[field])
        
        return TransactionResponse(
            id=doc['id'],
            type=doc['type'],
            fiat_currency=doc['fiat_currency'],
            fiat_amount=doc['fiat_amount'],
            crypto_currency=doc['crypto_currency'],
            crypto_amount=doc['crypto_amount'],
            exchange_rate=doc['exchange_rate'],
            fee_amount=doc['fee_amount'],
            status=doc['status'],
            reference=doc['reference'],
            created_at=doc['created_at'],
            completed_at=doc.get('completed_at')
        )
