# NeoNoble Ramp - Changelog

## [2026-04-07] Phase 5b: Treasury = Account Massimo
- Configured TREASURY_USER_ID pointing to massimo.fornara.2212@gmail.com
- Treasury now reads combined internal wallets + on-chain hot wallet balances
- Every MM trade debits/credits Massimo's real wallet balances
- Treasury shows per-asset breakdown: internal_balance + onchain_balance
- NENO=397 (on-chain), EUR=29640 (internal), ETH=884 (internal), BTC=0.35 (internal)
- PnL tracking with treasury_owner attribution
- Off-ramp crypto fallback correctly handles insufficient stablecoin balances
- BSC RPC error cleanup (non-critical logs moved to debug level)
- Refactored exchange_utils.py for shared constants
- Test: 16/16 backend + frontend 100% (iteration_32.json)

## [2026-04-07] Phase 5a: Market Maker Pricing Engine
- Created market_maker_service.py: Dynamic bid/ask, spread, matching, PnL
- Created market_maker_routes.py: API endpoints for treasury/pricing/pnl/risk
- Updated all exchange endpoints with MM bid/ask pricing
- Added crypto off-ramp fallback (USDT/USDC)
- Frontend MM pricing strip with bid/ask/spread/skew/treasury
- Test: 17/17 (iteration_31.json)

## [Previous] Phase 1-4: Core Platform
- Custom Token Creation, Buy/Sell/Swap, Off-ramp
- Settlement Ledger, Execution Engine, WebSockets
- DCA Bot, PDF Compliance, SMS Notifications
