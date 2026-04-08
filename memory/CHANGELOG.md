# NeoNoble Ramp — CHANGELOG

## 2026-04-08 — Real-Time Sync + Instant Withdraw + EventBus
- RealtimeSyncService: stato unificato real-time da on-chain + Circle + ledger + exchange
- EventBus: event-driven architecture — emette trade_executed, fee_collected, settlement_confirmed su sell/swap/withdraw
- InstantWithdrawEngine: cashout zero-delay post-settlement, routing EUR automatico (IT/BE)
- Endpoint /api/sync/state: stato completo piattaforma con real_mode=true, USDC verified, hot wallet, metriche platform
- Endpoint /api/sync/reconciliation: verifica on-chain vs ledger in tempo reale
- Endpoint /api/sync/instant-withdraw/status: stato engine + routing EUR + storico
- Admin Dashboard: banner "REAL MODE" nell'Overview con tutti gli engine ACTIVE
- Integrato EventBus in neno_exchange_routes.py (sell_neno, swap, withdraw_real)
- 28/28 test passati (iteration_38)

## 2026-04-08 — Autonomous Profit Extraction Engine + Continuous Cashout
- Cashout Engine (loop 90s), Auto-Conversion (crypto→USDC), Smart EUR Router (SEPA/SWIFT)
- 2 conti EUR configurati: IT + BE | 24/24 test passati (iteration_37)

## 2026-04-08 — Circle USDC + Wallet Segregation + Auto-Operation Loop
- 3 wallet segregati on-chain verificati | 18/18 test passati (iteration_36)

## 2026-04-08 — Virtual→Real + Strategic Plan 0→IPO
- 9/9 test passati (iteration_35)

## 2026-04-08 — IPO-Ready Exchange + Institutional
- Real NENO transfer proof: 3 tx hashes BSC | 19/19 test passati (iteration_34)

## 2026-04-07 — Security Hardening + Real Execution
- 19/19 test passati (iteration_33)
