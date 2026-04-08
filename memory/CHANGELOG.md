# NeoNoble Ramp — CHANGELOG

## 2026-04-08 — Autonomous Profit Extraction Engine + Continuous Cashout
- Cashout Engine: loop autonomo ogni 90s, monitoraggio saldi reali, estrazione profitti automatica
- Profit extraction pipeline: CLIENT→TREASURY→REVENUE con 10% buffer nel TREASURY
- Auto-Conversion Engine: valutazione opportunità crypto→USDC (NENO, BNB, ETH, BTC)
- Smart Cashout Router: <5k EUR→SEPA Instant, 5k-100k→SEPA Standard, >100k→SWIFT
- 2 conti EUR configurati: IT (IT80V1810301600068254758246) + BE (BE06967614820722)
- Fail-safe: blocco fondi non reali, zero simulazione, verifica on-chain vs ledger
- Frontend: nuovo tab "Cashout Engine" nell'Admin Dashboard (8 tab totali)
- 9 nuovi endpoint API: /api/cashout/status, /report, /history, /eur-accounts, /conversions/*, /start, /stop
- 24/24 test passati (iteration_37)

## 2026-04-08 — Circle USDC Integration + Wallet Segregation + Auto-Operation Loop
- Circle USDC Programmable Wallets: API key, 3 wallet segregati on-chain verificati
- Wallet Segregation Engine: routing automatico, audit trail, riconciliazione
- Auto-Operation Loop: loop autonomo ogni 120s, fail-safe real mode
- 14 endpoint API Circle + Frontend tab Circle USDC
- 18/18 test passati (iteration_36)

## 2026-04-08 — Virtual→Real Architecture + Strategic Plan 0→IPO
- VirtualRealEngine, Payout Guard, Riconciliazione
- Piano strategico 0→IPO: 5 fasi, capital plan
- 9/9 test passati (iteration_35)

## 2026-04-08 — IPO-Ready Exchange + Institutional Infrastructure
- Matching, Order Book, Risk, Clearing, Profit, Arbitrage, Smart Router, LP, Compliance, Capital Markets
- Real NENO transfer proof: 3 tx hashes BSC Mainnet
- 19/19 test passati (iteration_34)

## 2026-04-07 — Security Hardening + Real Execution
- Security Guard, Real on-chain execution, Stripe SEPA, WebSocket
- 19/19 test passati (iteration_33)
