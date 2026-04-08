# NeoNoble Ramp — PRD

## Problema originale
Piattaforma fintech/exchange IPO-ready con execution reale on-chain, payout fiat reale, treasury verificabile, architettura Virtual→Real, Circle USDC con wallet segregati, Autonomous Profit Extraction Engine, e Full Real-Time Synchronization con Instant Withdraw.

## Utente principale
- Massimo Fornara (massimo.fornara.2212@gmail.com) — Treasury/Admin

## Principio Fondamentale
- NESSUN accredito senza proof (tx_hash, payout_id, bank confirmation)
- Status "completed" SOLO con proof verificabile
- NESSUNA simulazione, NESSUNA creazione artificiale di fondi
- Withdraw immediato post-settlement, zero batching, zero intervento manuale

## Engine Operativi (25+)
1-14: Core Exchange (Matching, Order Book, Market Making, Risk, Clearing, Settlement, Profit, Arbitrage, Smart Router, LP, Compliance, Capital Markets, Security Guard, Virtual→Real)
15. Circle USDC Service (wallet segregation, on-chain verification)
16. Wallet Segregation Engine (CLIENT/TREASURY/REVENUE routing, audit trail)
17. Auto-Operation Loop (monitoraggio autonomo, fail-safe)
18. Cashout Engine (estrazione profitti automatica, 90s loop)
19. Auto-Conversion Engine (crypto→USDC best execution)
20. Smart Cashout Router (SEPA Instant/Standard/SWIFT)
21. Real-Time Sync Service (aggregazione unificata tutte le fonti bilancio)
22. EventBus (event-driven: trade_executed, fee_collected, settlement_confirmed)
23. Instant Withdraw Engine (zero-delay cashout post-settlement)
24. Execution Engine (BEP-20 real transfer con wallet segregation hook)

## Wallet Segregation
- CLIENT: 0xf44C81dbab89941173d0d49C1CEA876950eDCfd3
- TREASURY: 0x837799C8B457B21ab54Be374092BEEBa6EA47587
- REVENUE: 0xF7ba3C8E9F667E864edcD2F0A4579F1E8274fD44

## EUR Accounts
- IT: IT80V1810301600068254758246 (FNOMITM2) — SEPA Instant/Standard
- BE: BE06967614820722 (TRWIBEB1XXX) — SWIFT

## Hot Wallet (BSC)
- Address: 0x18CE1930820d5e1B87F37a8a2F7Cf59E7BF6da4E
- NENO: ~396.97, BNB: ~0.00483

## Test Score: 127/127 passati (iter. 33-38)

## Stato Completato
- [x] Exchange core (matching, order book, risk, clearing, profit)
- [x] Institutional (LP, capital markets, compliance, IPO structure)
- [x] Virtual→Real separation + Security hardening
- [x] Circle USDC Programmable Wallets (3 wallet segregati)
- [x] Wallet Segregation Engine (routing automatico, audit trail)
- [x] Auto-Operation Loop (monitoraggio autonomo, fail-safe)
- [x] Cashout Engine (estrazione profitti automatica, cashout continuo)
- [x] Auto-Conversion Engine (crypto→USDC)
- [x] Smart Cashout Router (SEPA Instant/Standard/SWIFT)
- [x] Real-Time Sync Service (stato unificato real-time)
- [x] EventBus (event-driven trade→cashout)
- [x] Instant Withdraw Engine (zero-delay post-settlement)
- [x] Admin Dashboard 8 tab con banner REAL MODE

## Pendente
- [ ] KYC provider (Sumsub/Onfido)
- [ ] NIUM templateId
