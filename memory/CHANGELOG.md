# NeoNoble Ramp — Changelog

## April 2, 2026 (Session 3)
### P0 — NENO Exchange Complete Verification
- Fixed NENO asset not recognized in swap quotes (`_get_any_price_eur`)
- Verified all 5 Exchange tabs: Compra, Vendi, Swap, Off-Ramp, Crea Token
- All wallet operations correctly reflected in balances
- Testing: 19/19 backend + 100% frontend (iteration 19)

### P2 — Monte Carlo VaR Simulation
- New endpoint: GET /api/analytics/montecarlo/var
- Configurable: simulations (100-10000), horizon (1-90 days), confidence (0.9-0.99)
- Returns: VaR, CVaR, portfolio positions, distribution percentiles, risk assessment

### P2 — PEP Screening & Sanctions List
- POST /api/pep/screen — Screen individuals against OFAC, UN, EU, internal watchlist
- POST /api/pep/watchlist — Add to internal watchlist
- GET /api/pep/history — Screening audit trail
- GET /api/pep/stats — Aggregate screening statistics
- Risk scoring: 0-100 with CLEAR/REVIEW/BLOCKED status

### P2 — Additional Languages
- Added 4 new languages: Portugues (PT), Nihongo (JA), Zhongwen (ZH), Al-Arabiyya (AR)
- Total: 9 languages (IT, EN, DE, FR, ES, PT, JA, ZH, AR)
- Settings page updated with all language selectors

### P2 — Microservices Domain Registry
- Created service_registry.py mapping 9 logical domains
- Domains: Exchange, Wallet, Banking, Compliance, Analytics, Gateway, Notification, Scheduler, Infrastructure
- Maps routes, services, and DB collections per domain

### Testing
- Iteration 19: NENO Exchange (19/19 pass)
- Iteration 20: P2 Features (15/15 pass) + regression check

## April 2, 2026 (Session 2)
- Fixed BSC RPC error in blockchain_listener.py
- Implemented Dynamic NENO Pricing
- Implemented Referral System
- Implemented Advanced KYC/AML Compliance Tiers
- Added Spanish translation (i18n)
- Added Advanced Portfolio Analytics
- Refactored server.py with ServiceContainer
- Fixed Webpack build errors (craco.config.js)
- Fixed 520 Deployment Health Check Crash
- NENO Exchange rewrite: Custom tokens, Swap, Off-Ramp

## Prior Sessions
- Full platform build: Trading Engine, Margin, NENO Exchange, Wallet, Banking, KYC, Notifications, DCA Bot, PDF Reports, NIUM Integration
