# NeoNoble Ramp — PRD

## Problema originale
Piattaforma fintech/exchange IPO-ready con execution reale on-chain, payout fiat reale, treasury verificabile, e architettura Virtual→Real che separa nettamente i fondi reali dai valori virtuali/simulati.

## Utente principale
- Massimo Fornara (massimo.fornara.2212@gmail.com) — Treasury/Admin

## Principio Fondamentale
virtual demand → trading reale → fee/spread reali → treasury reale → payout reale → cash flow reale
- NESSUN accredito senza proof (tx_hash, payout_id, bank confirmation)
- Status "completed" SOLO con proof verificabile

## Engine Operativi (22+)
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

## Banking Rails
- SEPA: ACTIVE (Stripe sk_live)
- SEPA Instant/SWIFT/TARGET2: framework_ready
- Visa/Mastercard: framework_ready (BIN sponsor required)

## Proof Reali BSC Mainnet
- TX1: 2145babd... (0.01 NENO withdraw)
- TX2: 0801f433... (0.001 NENO sell)
- TX3: 5635da90... (ETH→NENO swap)
- Hot wallet delta: -0.011 NENO, -0.000006 BNB gas

## Test Score: 57/57 passati (iter. 33+34+35)

## Stato
- [x] Exchange core completo (matching, order book, risk, clearing, profit)
- [x] Institutional (LP, capital markets, compliance, IPO structure)
- [x] Virtual→Real separation (real treasury on-chain, payout guard, reconciliation)
- [x] Security hardening (caps, rate limit, reentrancy)
- [x] Admin Dashboard 6 tab (Overview, Real vs Virtual, Treasury, IPO, Rails, Executions)
- [x] Piano strategico 0→IPO (5 fasi, capital plan, partner matrix)
- [ ] Circle USDC
- [ ] KYC provider (Sumsub/Onfido)
- [ ] NIUM templateId
- [ ] WETH/BTCB deposito nel hot wallet
