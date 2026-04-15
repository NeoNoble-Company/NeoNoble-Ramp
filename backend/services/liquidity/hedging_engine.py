from __future__ import annotations


class HedgingEngine:
    def __init__(self, connector_manager):
        self.connector_manager = connector_manager
        self.enabled = True

    async def hedge_if_needed(self, symbol: str, exposure_qty: float):
        if not self.enabled:
            return {"status": "disabled"}

        if abs(exposure_qty) < 1e-9:
            return {"status": "no_action"}

        side = "sell" if exposure_qty > 0 else "buy"
        qty = abs(exposure_qty)

        order, error = await self.connector_manager.execute_order(
            symbol=symbol,
            side=side,
            quantity=qty,
            user_id="hedger",
        )

        if error:
            return {"status": "failed", "error": error}

        return {"status": "hedged", "order": order}
