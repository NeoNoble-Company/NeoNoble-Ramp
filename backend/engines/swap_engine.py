from typing import Optional
from decimal import Decimal
import logging
from web3 import Web3
from pydantic import BaseModel

logger = logging.getLogger(__name__)

class SwapRequest(BaseModel):
    user_id: str
    from_token: str
    to_token: str
    amount_in: Decimal
    chain: str = "bsc"
    slippage: float = 0.8
    user_wallet_address: str   # ← Aggiunto: indirizzo del wallet dell'utente


class SwapResult(BaseModel):
    success: bool
    tx_hash: Optional[str] = None
    amount_out: Optional[Decimal] = None
    error: Optional[str] = None


class SwapEngine:
    def __init__(self):
        # Configurazione BSC Mainnet (puoi renderla dinamica in futuro)
        self.rpc_url = "https://bsc-dataseed.binance.org/"
        self.w3 = Web3(Web3.HTTPProvider(self.rpc_url))
        
        # Hot wallet della piattaforma (DA NON METTERE IN CHIARO IN PRODUZIONE!)
        # Usa variabili d'ambiente o secret manager
        self.hot_wallet_address = "0xYOUR_HOT_WALLET_ADDRESS_HERE"
        self.hot_wallet_private_key = "0xYOUR_PRIVATE_KEY_HERE"   # ← MOLTO RISCHIOSO!

        # Contract address di esempio per BTCB (da modificare secondo il token di output)
        self.btcb_address = "0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c"

    async def execute_swap(self, request: SwapRequest) -> SwapResult:
        """
        Esegue lo swap on-chain e trasferisce i token ricevuti all'utente.
        """
        try:
            # 1. Calcolo simulato dell'output (da sostituire con logica reale di DEX router)
            amount_out = request.amount_in * Decimal("0.95")   # Esempio: 5% slippage

            # 2. Trasferimento dei token all'utente
            token_contract = self.w3.eth.contract(
                address=self.btcb_address, 
                abi=[{
                    "constant": False,
                    "inputs": [{"name": "_to", "type": "address"}, {"name": "_value", "type": "uint256"}],
                    "name": "transfer",
                    "outputs": [{"name": "", "type": "bool"}],
                    "type": "function"
                }]
            )

            # Build transaction
            nonce = self.w3.eth.get_transaction_count(self.hot_wallet_address)
            gas_price = self.w3.eth.gas_price

            tx = token_contract.functions.transfer(
                request.user_wallet_address,
                int(amount_out * Decimal(10**18))   # Converti in wei
            ).build_transaction({
                'from': self.hot_wallet_address,
                'gas': 250000,
                'gasPrice': gas_price,
                'nonce': nonce,
            })

            # Firma e invia
            signed_tx = self.w3.eth.account.sign_transaction(tx, self.hot_wallet_private_key)
            tx_hash = self.w3.eth.send_raw_transaction(signed_tx.raw_transaction)

            # Attendi conferma
            receipt = self.w3.eth.wait_for_transaction_receipt(tx_hash)

            if receipt.status == 1:
                logger.info(f"Swap completato e token trasferiti. Tx: {tx_hash.hex()}")
                return SwapResult(
                    success=True,
                    tx_hash=tx_hash.hex(),
                    amount_out=amount_out,
                    error=None
                )
            else:
                raise Exception("Transfer transaction failed on chain")

        except Exception as e:
            logger.error(f"Errore durante execute_swap: {str(e)}")
            return SwapResult(
                success=False,
                tx_hash=None,
                amount_out=None,
                error=str(e)
            )
