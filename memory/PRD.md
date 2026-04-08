# NeoNoble Ramp — PRD

## Problema originale
Piattaforma fintech/exchange IPO-ready con execution reale on-chain, payout fiat reale, treasury verificabile, architettura Virtual→Real, integrazione Circle USDC con wallet segregati, e Autonomous Profit Extraction Engine con cashout continuo.

## Utente principale
- Massimo Fornara (massimo.fornara.2212@gmail.com) — Treasury/Admin

## Principio Fondamentale
virtual demand → trading reale → fee/spread reali → treasury reale → payout reale → cash flow reale
- NESSUN accredito senza proof (tx_hash, payout_id, bank confirmation)
- Status "completed" SOLO con proof verificabile
- NESSUNA simulazione, NESSUNA creazione artificiale di fondi

## Engine Operativi (25+)
1. Matching Engine (market+limit, partial fills, price-time priority)
2. Order Book (multi-level bid/ask)
3. Market Making (spread = base + volatility + inventory skew)
4. Risk Engine (slippage 2%, treasury on-chain check, exposure limits, retry 3x)
5. Clearing & Settlement (state machine: trade→execution→confirmation→ledger→payout)
6. Profit Engine (fee tracking, spread revenue, PnL)
7. Arbitrage Engine (cross-venue detection)
8. Smart Router (best execution: internal/CEX/DEX)
9. LP Tier-1 (register, quote, hedge, rebalance)
10. Compliance (KYC/AML, CTR 10K, EDD 15K, safeguarding)
11. Capital Markets (IPO structure, IFRS, investor deck)
12. Security Guard (caps 50k/200k/50NENO, rate limit 10/min, reentrancy)
13. Virtual→Real Engine (classificazione, payout guard, riconciliazione)
14. Execution Engine (BEP-20 real transfer: NENO, BNB, ETH, BTC, USDT, USDC)
15. Circle USDC Service (wallet segregation, on-chain verification, Circle API)
16. Wallet Segregation Engine (CLIENT/TREASURY/REVENUE routing, audit trail)
17. Auto-Operation Loop (autonomous monitoring, real execution, fail-safe)
18. Cashout Engine (autonomous profit extraction, continuous cashout every 90s)
19. Auto-Conversion Engine (crypto→USDC best execution, slippage control)
20. Smart Cashout Router (SEPA Instant/Standard/SWIFT based on amount)

## Banking Rails & EUR Accounts
- SEPA: ACTIVE (Stripe sk_live)
- Circle USDC: ACTIVE (on-chain verification, segregated wallets)
- EUR Account IT: IT80V1810301600068254758246 (BIC: FNOMITM2)
- EUR Account BE: BE06967614820722 (BIC: TRWIBEB1XXX)
- SEPA Routing: <5k→Instant, 5k-100k→Standard, >100k→SWIFT(BE)

## Circle USDC Wallet Segregation
- CLIENT: 0xf44C81dbab89941173d0d49C1CEA876950eDCfd3 (depositi)
- TREASURY: 0x837799C8B457B21ab54Be374092BEEBa6EA47587 (fondi operativi)
- REVENUE: 0xF7ba3C8E9F667E864edcD2F0A4579F1E8274fD44 (fee e profitti)

## Hot Wallet (BSC Mainnet)
- Address: 0x18CE1930820d5e1B87F37a8a2F7Cf59E7BF6da4E
- NENO: 396.9888, BNB: 0.00483015

## Test Score: 99/99 passati (iter. 33+34+35+36+37)

## Stato
- [x] Exchange core completo (matching, order book, risk, clearing, profit)
- [x] Institutional (LP, capital markets, compliance, IPO structure)
- [x] Virtual→Real separation
- [x] Security hardening (caps, rate limit, reentrancy)
- [x] Circle USDC Programmable Wallets (3 wallet segregati)
- [x] Wallet Segregation Engine (routing automatico, audit trail)
- [x] Auto-Operation Loop (monitoraggio autonomo, fail-safe)
- [x] Cashout Engine (estrazione profitti automatica, cashout continuo)
- [x] Auto-Conversion Engine (crypto→USDC valutazione)
- [x] Smart Cashout Router (SEPA Instant/Standard/SWIFT)
- [x] EUR accounts configurati (IT + BE)
- [x] Admin Dashboard 8 tab
- [ ] KYC provider (Sumsub/Onfido)
- [ ] NIUM templateId
