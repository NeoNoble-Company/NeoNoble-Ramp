# Changelog

## 2026-04-03 — RPC Cleanup + Pre-Deploy Optimizations
- **Fixed**: blockchain_listener.py — Added POA middleware (`ExtraDataToPOAMiddleware`), removed hex block number format (causa degli errori `-32602`), connection retry con health check, ridotto verbosità log
- **Configured**: Alchemy BSC RPC sostituisce Infura (stabile, block 90M+)
- **Verified**: Tutti gli endpoint funzionanti con Alchemy, log puliti (zero errori RPC)
- **Endpoints verificati**: health, platform-wallet, contract-info, onchain-balance, quote, sell, swap, buy, verify-deposit

## 2026-04-03 — Alchemy RPC + Deposit NENO Widget
- **Configured**: Alchemy BSC RPC (`bnb-mainnet.g.alchemy.com`)
- **Added**: "Deposita" tab con QR code, indirizzo copiabile, istruzioni, warning
- **Testing**: iteration_25.json — 100% pass

## 2026-04-03 — CORS Fix + Real Web3 Integration
- **Fixed**: "Errore di rete" (Emergent fetch interception → XHR)
- **Added**: On-chain NENO balance, MetaMask signing, platform-wallet, verify-deposit
- **Testing**: iteration_24.json — 100% pass

## Previous Sessions
- Phase 5: DCA Bot, PDF Reports, SMS Notifications
- NIUM V2 Unified API, deployment build fixes
- Margin Trading, Monte Carlo VaR, PEP screening, multi-language
