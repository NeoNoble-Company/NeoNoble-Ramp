# NeoNoble Ramp — CHANGELOG

## 2026-04-08 — Circle USDC Integration + Wallet Segregation + Auto-Operation Loop
- Circle USDC Programmable Wallets: API key configurata, servizio inizializzato con Circle production API
- 3 Wallet Segregati: CLIENT (0xf44C...Cfd3), TREASURY (0x8377...7587), REVENUE (0x8786...17F3) — on-chain verificati via BSC RPC
- Wallet Segregation Engine: routing automatico depositi→CLIENT, execution→TREASURY, fee→REVENUE con audit trail completo
- Auto-Operation Loop: loop autonomo continuo (ogni 120s), monitoraggio fondi, detection depositi, fail-safe real mode
- Fail-Safe: blocco operazioni senza copertura, zero simulazione, zero creazione artificiale fondi
- Reconciliation: on-chain vs ledger con detection discrepanze
- Frontend: nuovo tab "Circle USDC" nell'Admin Dashboard con wallet balances, auto-op status, segregation summary, fail-safe panel
- 14 nuovi endpoint API: /api/circle/wallets/balances, /diagnostic, /segregation/*, /auto-op/*, /fail-safe/report
- 18/18 test passati (iteration_36)

## 2026-04-08 — Virtual→Real Architecture + Strategic Plan 0→IPO
- VirtualRealEngine: classificazione tx (real/virtual/pending), real treasury (on-chain RPC), virtual metrics
- Payout Guard: blocca automaticamente payout se fondi reali insufficienti nel hot wallet
- Riconciliazione: real treasury vs virtual demand con conversion rate
- API Strategic: /api/strategic/real-treasury, /virtual-metrics, /reconciliation, /payout-guard/{asset}, /ipo-roadmap
- Piano strategico completo 0→IPO: 5 fasi (Foundation→Traction→Growth→Scale→IPO), capital plan EUR 18.6M-61.8M, partner matrix 8 categorie
- Admin Dashboard: nuovo tab "Real vs Virtual" con treasury on-chain verificato e warning metriche virtuali
- Documento STRATEGIC_PLAN_0_TO_IPO.md completo
- 9/9 test passati (iteration_35)

## 2026-04-08 — IPO-Ready Exchange + Institutional Infrastructure
- Matching Engine, Order Book, Risk Engine, Clearing Engine, Profit Engine
- Arbitrage Engine, Smart Router, LP Tier-1, Compliance Engine, Capital Markets
- Admin Command Center: 5 tab (Overview, Treasury, IPO, Rails, Executions)
- Real NENO transfer proof: 3 tx hashes su BSC Mainnet
- 19/19 test passati (iteration_34)

## 2026-04-07 — Security Hardening + Real Execution + WebSocket
- Security Guard (caps, rate limit, reentrancy, key masking)
- Real on-chain execution (NENO, BNB, ETH/WETH, BTC/BTCB via BEP-20)
- Stripe SEPA payout reale, WebSocket balance sync
- 19/19 test passati (iteration_33)

## 2026-04-06 — Market Maker + Treasury + Audit
## 2026-04-05 — Phase 5 Completion (DCA, PDF, SMS)
