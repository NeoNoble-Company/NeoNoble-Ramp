# NeoNoble Ramp — PRD

## Problema originale
Piattaforma fintech/exchange IPO-ready con execution reale on-chain, DEX swap reali PancakeSwap V2, hybrid liquidity (user matching + market maker + DEX), cashout continuo, wallet segregati Circle USDC, fiat payout SEPA/SWIFT.

## Principio Fondamentale
- ZERO simulazione. Solo flussi reali verificabili on-chain.
- Ogni operazione produce TX hash o payout ID come prova.
- REAL_MODE = TRUE globalmente.

## Esecuzioni Reali Verificate (BSC Mainnet)
- NENO→USDC: TX `0c348de0f043c9f814a83122422c5aa39cb72721bdba357e025ad658c7b08701`
- BNB→USDC: TX `ad51615f566c00eccadf113b441b280404c3a2d905de08cc519a672abb694a0e`
- NENO/WBNB Pool: `0x27f9610fCe91B27aC98D7426Ebbb10110A7CdACd`

## Engine Operativi (28+)
1-14: Core Exchange (Matching, Order Book, Market Making, Risk, Clearing, Settlement, Profit, Arbitrage, Smart Router, LP, Compliance, Capital Markets, Security Guard, Virtual→Real)
15-17: Circle USDC, Wallet Segregation, Auto-Operation Loop
18-20: Cashout Engine, Auto-Conversion, Smart Cashout Router
21-23: Real-Time Sync, EventBus, Instant Withdraw Engine
24-25: DEX Swap Service (PancakeSwap V2), Live Pipeline
26: Hybrid Liquidity Engine (user matching + market maker + DEX fallback)
27: Dynamic Spread Engine (100-300bps, inventory skew, volume tiers)

## Hybrid Liquidity
- Execution priority: internal_match → market_maker → dex_fallback
- Spread: 100-300bps (base 200, inventory skew, demand adjustment)
- Volume tiers: 0→200bps, 10k→175, 50k→150, 100k→125, 500k→100
- Fee: 0.5% platform, 10% referral rebate

## Wallet Segregation
- CLIENT: 0xf44C81dbab89941173d0d49C1CEA876950eDCfd3
- TREASURY: 0x837799C8B457B21ab54Be374092BEEBa6EA47587
- REVENUE: 0xF7ba3C8E9F667E864edcD2F0A4579F1E8274fD44
- Hot Wallet: 0x18CE1930820d5e1B87F37a8a2F7Cf59E7BF6da4E

## EUR Accounts
- IT: IT80V1810301600068254758246 (FNOMITM2) — SEPA
- BE: BE06967614820722 (TRWIBEB1XXX) — SWIFT

## Fiat Rails: Stripe SEPA ACTIVE, Circle ACTIVE

## Test Score: 180/180 passati (iter. 33-40)

## Bug Fix
- [x] Wallet & Banking "body stream already read" → Fixed con safeFetch/response.clone()

## Stato
- [x] TUTTO completato e testato
- [ ] KYC provider (Sumsub/Onfido)
- [ ] NIUM templateId (bloccato su utente)
