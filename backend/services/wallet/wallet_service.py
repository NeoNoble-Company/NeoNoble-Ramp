from services.risk.risk_engine import RiskEngine

risk_engine = RiskEngine()

async def send_token_to_wallet(self, token_symbol, to_address, amount, chain="BSC"):

    if not risk_engine.check(amount):
        return None, "RISK_BLOCKED"

    tx_hash = await multichain_service.send_native(chain, to_address, amount)

    return tx_hash, None
