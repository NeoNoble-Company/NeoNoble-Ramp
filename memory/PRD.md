# NeoNoble Ramp — Product Requirements Document

## Original Problem Statement
Build "NeoNoble Ramp", a global enterprise-grade fintech infrastructure platform featuring:
- Custom internal NENO Exchange (bypassing 3rd party providers like Transak) with fixed €10,000 NENO price
- Full Margin Trading with advanced orders
- Multi-chain Token Discovery and Unified Wallet (ETH, BSC, Polygon)
- IBAN/SEPA Banking Rails
- Real Card Issuing via NIUM (production key)
- AI KYC Verification
- Real-time Portfolio Tracker via WebSockets
- Multi-channel Notifications (email, in-app, browser push, SMS)
- Background Scheduler (cron jobs for price alerts, DCA bot)
- PDF Compliance Reports
- DCA (Dollar-Cost Averaging) Trading Bot
- Data Export (CSV/PDF)
- Admin Audit Logging

## User Personas
- **Individual Crypto Trader**: Buys/sells crypto including $NENO, uses margin trading, DCA bot
- **Enterprise User**: Needs IBAN/SEPA banking, physical cards, KYC compliance
- **Admin**: Manages users, audit logs, NIUM configuration, platform settings

## Core Requirements
1. No dependency on 3rd party ramp providers (Transak, MoonPay) — use internal NENO Exchange
2. NENO fixed at €10,000 per token
3. Internal/external wallet balances must mirror exactly (Unified Wallet)
4. All integrations must be production-ready with real API keys (NIUM, Resend)
5. Background scheduler runs cron jobs for price alerts, DCA execution, NIUM auth refresh

## Architecture
- Backend: FastAPI + MongoDB (Motor) — monolith with service separation
- Frontend: React.js with Tailwind CSS
- Real-time: WebSockets for portfolio prices, SSE for notifications
- Blockchain: Web3.py for BSC/ETH/Polygon on-chain sync
- PDF: ReportLab for compliance reports
- Background: asyncio scheduler for cron jobs

## Completed Features (as of April 2, 2026)
- [x] Trading Engine with order book
- [x] Margin Trading (up to 20x leverage) with advanced orders
- [x] NENO Custom Exchange (12 assets, direct fiat-to-card/bank off-ramps)
- [x] Multi-Chain Wallet Sync (ETH, BSC, Polygon)
- [x] Banking Rails (Virtual IBAN, SEPA deposits/withdrawals — simulated)
- [x] Physical Card shipping + NIUM live key integration
- [x] AI KYC Verification (GPT Image OCR via Emergent LLM Key)
- [x] Real-time Portfolio Tracker (WebSocket)
- [x] Multi-channel Notifications (email, in-app, browser push, SMS-ready)
- [x] Background Scheduler (price alerts, NIUM auth refresh, rate limiter, DCA bot)
- [x] DCA Trading Bot (create, pause, resume, cancel, auto-execute)
- [x] PDF Compliance Reports (portfolio, KYC, trades, margin, DCA)
- [x] Data Export (CSV for trades, portfolio, margin positions)
- [x] Admin Audit Logging
- [x] NIUM Multi-Strategy Auth Discovery (6 auth types × 3 URLs)
- [x] NIUM Multi-Version API Retry (v2→v3→v4→v1)
- [x] NIUM Diagnostic & Template Management endpoints
- [x] Rate Limiter Middleware
- [x] i18n structure (Italian UI)

## Pending / External Blockers
- NIUM templateId: Must be configured in NIUM Admin portal (external dependency)
- Twilio SMS: Keys not yet provided (SMS dispatch is ready, silent skip without keys)

## Future / Backlog (P2)
- Microservices Architecture Refactoring
- Dynamic NENO pricing (order book based)
- Advanced KYC/AML compliance tiers
- Multi-language i18n (beyond Italian)
