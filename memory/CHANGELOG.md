# NeoNoble Ramp - Changelog

## [2026-04-07] Aggressive Audit Logging + Mass Trading Test
- Added aggressive audit logger to Sell/Swap/Off-Ramp endpoints
- Each operation logs: timestamp, user balances PRE/POST, treasury balances PRE/POST, on-chain state PRE/POST, deltas, consistency check
- Persisted to `audit_aggressive_log` MongoDB collection
- Mass test: 28 operations executed (10 SELL + 10 SWAP + 5 OFFRAMP card + 3 OFFRAMP crypto)
- Results: 20/20 real trades PASSED (100%), 8 expected failures (no card, no USDT on-chain)
- Consistency: 0 issues across all 20 trades
- Treasury deltas verified: NENO +0.0448, EUR -261.60, ETH -0.011, BTC -0.001
- PnL from 20 trades: EUR 7.26 total revenue (EUR 6.09 spread + EUR 1.16 fees)

## [2026-04-07] Phase 5b: Treasury = Account Massimo
- TREASURY_USER_ID configured to massimo.fornara.2212@gmail.com
- Treasury reads combined internal wallets + on-chain hot wallet
- Every MM trade debits/credits Massimo's real wallet balances
- Test: 16/16 backend + frontend 100% (iteration_32.json)

## [2026-04-07] Phase 5a: Market Maker Pricing Engine
- Dynamic bid/ask, spread, matching, PnL
- Test: 17/17 (iteration_31.json)

## [Previous] Phase 1-4: Core Platform
- Custom Token Creation, Buy/Sell/Swap, Off-ramp
- Settlement Ledger, Execution Engine, WebSockets
- DCA Bot, PDF Compliance, SMS Notifications
