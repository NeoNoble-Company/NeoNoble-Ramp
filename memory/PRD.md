# NeoNoble Ramp — Product Requirements Document

## Problema Originale
Piattaforma fintech enterprise (IPO-Ready) per trading, exchange, wallet e banking con esecuzione reale su blockchain (BSC/PancakeSwap), Circle USDC, Stripe SEPA.

## Utenti
- **Admin**: Gestione treasury, revenue withdrawal, monitoraggio real-time
- **Trader**: Compra/vendi/swap NENO e altri asset
- **Utente Banking**: IBAN virtuale, carte, bonifici SEPA

## Architettura Core
- Backend: FastAPI + MongoDB + Motor (async)
- Frontend: React + Tailwind + Shadcn
- Blockchain: Web3.py (BSC), PancakeSwap V2
- Wallets: Circle USDC (Client/Treasury/Revenue segregation)
- Payments: Stripe SEPA

## Fasi Completate

### Phase 1-4: Foundation → Advanced Features ✅
- Auth JWT + Ruoli (USER/DEVELOPER/ADMIN)
- NENO Exchange (buy/sell/swap/offramp)
- Multichain Wallet + Banking
- Card Management + KYC/AML
- Margin Trading + Order Book
- DCA Trading Bot
- PDF Compliance Reports
- SMS/Push Notifications

### Phase 5: Real Money Activation ✅
- Circle USDC Programmable Wallets
- Wallet Segregation (Client/Treasury/Revenue)
- Autonomous Profit Extraction Engine
- PancakeSwap V2 DEX (real swaps)
- Real-time Sync + EventBus

### Phase 6: Production Hardening ✅ (2026-04-08)
- Idempotency keys su tutte le operazioni finanziarie (buy/sell/swap/offramp)
- Safe transaction logging (upsert vs insert per prevenire E11000)
- Universal xhrFetch wrapper (TradingPage, CardManagement, MarginTrading)
- Revenue Withdrawal endpoint (/api/cashout/revenue-withdraw)
- Admin Dashboard Revenue tab con form prelievo
- Hybrid Liquidity Engine fallback su buy operations
- TTL indexes per idempotency keys

## P0/P1 Issues Risolti
- [x] E11000 Duplicate Key Error → IdempotencyService + safe_log_tx upsert
- [x] response.clone() body stream error → xhrFetchJson wrapper universale
- [x] Treasury insufficient blocks → Hybrid Liquidity Engine fallback
- [x] Admin Access → admin@neonobleramp.com + massimo.fornara.2212@gmail.com ADMIN
- [x] Revenue Withdrawal → /api/cashout/revenue-withdraw (SEPA/SWIFT/Crypto)

## Backlog (P2+)
- [ ] Microservices Architecture (splitting monolite)
- [ ] KYC/AML provider reale (Sumsub/Onfido)
- [ ] Visa/Mastercard BIN sponsor
- [ ] Multi-country scaling
- [ ] Pricing NENO dinamico (order book reale)
- [ ] Referral System con bonus NENO
- [ ] NIUM templateId (bloccato su configurazione utente)
