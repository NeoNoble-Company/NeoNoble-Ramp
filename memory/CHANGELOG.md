# NeoNoble Ramp - Changelog

## [2026-04-07] Phase 5: Internal Market Maker Activation
- Created `market_maker_service.py`: Treasury-backed counterparty, dynamic bid/ask pricing engine, inventory management, internal matching engine, PnL accounting, stablecoin off-ramp fallback
- Created `market_maker_routes.py`: API endpoints for pricing, treasury, PnL, risk, order book
- Updated `neno_exchange_routes.py`: All buy/sell/swap/offramp/quote/price/market endpoints now use MM bid/ask pricing and update treasury on every trade
- Updated `settlement_ledger.py`: Added `payout_executed_external` state for crypto off-ramp
- Updated `server.py`: Registered market_maker_router, treasury initialization on startup
- Updated `NenoExchange.js`: MM pricing strip (BID/ASK/SPREAD/SKEW/TREASURY), bid/ask in quotes, crypto off-ramp tab with wallet input and USDT/USDC selector, MM result info
- Test: 17/17 passed (iteration_31.json)

## [Previous] Phase 1-4: Core Platform
- Custom Token Creation, Buy/Sell/Swap, Off-ramp
- Settlement Ledger, Execution Engine, WebSockets
- DCA Bot, PDF Compliance, SMS Notifications
- Real on-chain execution, force balance sync
- Deployment fixes (chokidar, requirements.txt)
