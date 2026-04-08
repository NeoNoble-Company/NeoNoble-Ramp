# NeoNoble Ramp — CHANGELOG

## 2026-04-08 — IPO-Ready Exchange + Institutional Infrastructure
- Matching Engine: market/limit orders, price-time priority, partial fills
- Order Book Engine: multi-level bid/ask
- Risk Engine: treasury sufficiency (on-chain check), slippage guard 2%, exposure limits, retry 3x
- Clearing Engine: full trade lifecycle state machine
- Profit Engine: fee tracking, spread revenue, PnL computation
- Arbitrage Engine: cross-venue price discrepancy detection
- Smart Router: best execution routing (internal/CEX/DEX)
- LP Tier-1: institutional LP registration, quote, hedge, rebalance
- Compliance Engine: KYC/AML (CTR 10K, EDD 15K), safeguarding, regulatory reporting (EMI/CASP)
- Capital Markets Engine: IPO structure (NeoNoble Holding AG), IFRS financials, investor deck
- Banking Rails: SEPA (active), SWIFT (framework), Visa/MC (framework), TARGET2 (framework)
- Admin Command Center: 5-tab dashboard (Overview, Treasury, IPO Structure, Banking Rails, Execution Logs)
- API routes: /api/exchange-orders/* + /api/institutional/*
- Real NENO transfer proof: 3 tx hashes on BSC Mainnet (Block ~91242951-91242970)
- 19/19 backend tests passed (iteration_34)

## 2026-04-07 — Security Hardening + Real Execution + WebSocket
- Security Guard (caps, rate limit, reentrancy, key masking)
- Real on-chain execution (NENO, BNB, ETH/WETH, BTC/BTCB via BEP-20)
- Stripe SEPA payout reale
- WebSocket balance sync
- Status enforcement (solo completed con proof)
- 19/19 tests passed (iteration_33)

## 2026-04-06 — Market Maker + Treasury + Audit
- Market Maker con Bid/Ask/Spread dinamici
- Treasury = Account Massimo
- Audit logging aggressivo PRE/POST

## 2026-04-05 — Phase 5 Completion
- DCA Trading Bot, PDF Compliance, SMS Notifications
- Deployment fixes (chokidar, requirements.txt)
