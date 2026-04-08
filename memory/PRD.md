# NeoNoble Ramp — PRD

## Problema originale
Piattaforma fintech enterprise per acquisto/vendita/swap di criptovalute con bridge token $NENO. Include wallet multichain, Market Maker interno, esecuzione reale on-chain, e compliance EMI/CASP IPO-ready.

## Utente principale
- Massimo Fornara (massimo.fornara.2212@gmail.com) — owner Treasury/Admin

## Architettura IPO-Ready
- **Holding**: NeoNoble Holding AG (Svizzera) — quotabile
- **Subsidiaries**: NeoNoble Ramp EU S.r.l (EMI), NeoNoble Tech GmbH (IP), NeoNoble Markets Ltd (Institutional)
- **Compliance**: EMI (PSD2), CASP (MiCA), IFRS, AMLD6, Travel Rule

## Engine Implementati
1. **Matching Engine** — Market + Limit orders, price-time priority, partial fills
2. **Order Book** — Multi-level bid/ask con profondita reale
3. **Market Making Engine** — Spread = base + volatility + inventory skew
4. **Risk Engine** — Treasury check on-chain, slippage guard 2%, exposure limits, retry 3x
5. **Clearing & Settlement** — trade → execution → tx → confirmation → ledger → payout
6. **Profit Engine** — Trading fees + spread revenue + arbitrage PnL
7. **Arbitrage Engine** — Cross-venue price discrepancy detection
8. **Smart Router** — Best execution routing (internal/CEX/DEX)
9. **Liquidity Provider Tier-1** — Institutional LP connectivity, hedge, rebalance
10. **Compliance Engine** — KYC/AML, CTR 10K, EDD 15K, safeguarding
11. **Capital Markets Engine** — IPO structure, IFRS financials, investor deck
12. **Security Guard** — Caps (50k/tx, 200k/day, 50 NENO/tx), rate limit 10/min, reentrancy

## Banking Rails
- SEPA: ACTIVE (Stripe)
- SEPA Instant: framework_ready
- SWIFT: framework_ready
- Visa/Mastercard: framework_ready (BIN sponsor required)
- TARGET2: requires_banking_license
- Circle USDC: planned

## Proof Esecuzione Reale (BSC Mainnet)
1. WITHDRAW: tx 2145babd... | 0.01 NENO | Block 91242951
2. SELL: tx 0801f433... | 0.001 NENO | Block 91242960
3. SWAP: tx 5635da90... | ETH→NENO | Block 91242970

## ETH/BTC Status
- ETH = Binance-Peg WETH (0x2170...F8) — reale BEP-20 su BSC, backed 1:1 Binance
- BTC = Binance-Peg BTCB (0x7130...9c) — reale BEP-20 su BSC, backed 1:1 Binance
- Hot wallet attualmente 0 WETH/BTCB — richiede deposito per trasferimenti

## Status
- [x] Exchange core (matching, order book, risk, clearing, profit)
- [x] Institutional (LP tier-1, capital markets, compliance, IPO structure)
- [x] Security hardening (caps, rate limit, reentrancy, key masking)
- [x] Real on-chain execution (NENO proven, BNB supported)
- [x] Stripe SEPA payout reale
- [x] Admin Dashboard con 5 tab (Overview, Treasury, IPO, Rails, Executions)
- [x] WebSocket balance sync
- [ ] Circle USDC integration (planned)
- [ ] NIUM fiat rail (blocked on templateId)
- [ ] WETH/BTCB deposito nel hot wallet
