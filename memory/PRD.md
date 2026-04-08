# NeoNoble Ramp — PRD

## Problema originale
Piattaforma fintech/exchange IPO-ready con execution reale on-chain, DEX swap reali via PancakeSwap V2, cashout continuo, wallet segregati Circle USDC, e fiat payout SEPA/SWIFT.

## Principio Fondamentale
- ZERO simulazione. Solo flussi reali verificabili on-chain.
- Ogni operazione produce TX hash o payout ID come prova.

## Esecuzioni Reali Verificate (BSC Mainnet)
- NENO→USDC: TX `0c348de0f043c9f814a83122422c5aa39cb72721bdba357e025ad658c7b08701` (Block 91398523)
- BNB→USDC: TX `ad51615f566c00eccadf113b441b280404c3a2d905de08cc519a672abb694a0e`
- NENO/WBNB Pool PancakeSwap V2: `0x27f9610fCe91B27aC98D7426Ebbb10110A7CdACd`

## Engine Operativi (25+)
1-14: Core Exchange (Matching, Order Book, Market Making, Risk, Clearing, Settlement, Profit, Arbitrage, Smart Router, LP, Compliance, Capital Markets, Security Guard, Virtual→Real)
15-17: Circle USDC, Wallet Segregation, Auto-Operation Loop
18-20: Cashout Engine, Auto-Conversion, Smart Cashout Router
21-23: Real-Time Sync, EventBus, Instant Withdraw Engine
24: DEX Swap Service (PancakeSwap V2)
25: Live Pipeline (E2E: Swap→Convert→Settle→Withdraw)

## Wallet Segregation
- CLIENT: 0xf44C81dbab89941173d0d49C1CEA876950eDCfd3
- TREASURY: 0x837799C8B457B21ab54Be374092BEEBa6EA47587
- REVENUE: 0xF7ba3C8E9F667E864edcD2F0A4579F1E8274fD44
- Hot Wallet: 0x18CE1930820d5e1B87F37a8a2F7Cf59E7BF6da4E

## EUR Accounts
- IT: IT80V1810301600068254758246 (FNOMITM2) — SEPA
- BE: BE06967614820722 (TRWIBEB1XXX) — SWIFT

## Fiat Rails
- Stripe SEPA: ACTIVE (sk_live)
- Circle API: ACTIVE
- NIUM: blocked (templateId)

## Test Score: 155/155 passati (iter. 33-39)

## Stato
- [x] TUTTO completato e testato
- [ ] KYC provider (Sumsub/Onfido) — prossimo
- [ ] NIUM templateId — bloccato su utente
