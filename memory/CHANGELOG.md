# Changelog

## 2026-04-03 — CORS Fix + Real Web3 Integration
- **Fixed**: "Errore di rete" / "body stream already read" on 400 responses
  - Root cause: Emergent's `emergent-main.js` wraps `window.fetch` and consumes response body for analytics
  - Fix: Replaced all `fetch()` calls in NenoExchange.js with `XMLHttpRequest`-based helpers (xhrGet, xhrPost, xhrFetch)
- **Added**: Real on-chain NENO balance reading via Wagmi `useReadContract` (BSC contract)
- **Added**: MetaMask/WalletConnect transaction signing flow for Sell/Swap/Off-Ramp
- **Added**: `GET /api/neno-exchange/platform-wallet` endpoint (hot wallet from mnemonic)
- **Added**: `POST /api/neno-exchange/verify-deposit` endpoint (on-chain tx verification)
- **Modified**: Sell/Swap/Offramp endpoints accept optional `tx_hash` for on-chain execution mode
- **Files**: NenoExchange.js, Web3Context.js, nenoContract.js, neno_exchange_routes.py
- **Testing**: iteration_24.json — 100% pass (backend + frontend)

## Previous Sessions
- Phase 5 completion: DCA Bot, PDF Reports, SMS Notifications
- NIUM V2 Unified API integration
- Deployment build fixes (chokidar, weasyprint)
- Margin Trading, Monte Carlo VaR, PEP screening
- Multi-language support, Microservices routing
