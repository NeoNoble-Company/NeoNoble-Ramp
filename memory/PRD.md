# NeoNoble Ramp — Product Requirements Document

## Original Problem Statement
Build "NeoNoble Ramp", a global enterprise-grade fintech infrastructure platform with full financial infrastructure including real banking rails, card issuing, crypto exchange, margin trading, KYC/AML compliance, and multi-chain wallet management.

## User Personas
- **Retail Traders**: Trade crypto with leveraged margin, professional charting tools, advanced order types
- **NENO Holders**: Buy/sell/off-ramp NENO token through internal exchange with dynamic pricing
- **Platform Admins**: Manage KYC applications, monitor AML alerts, oversee platform operations
- **API Developers**: Integrate via developer portal with HMAC-secured API keys

## Core Architecture
- Backend: FastAPI + MongoDB (Motor) + Python 3.11
- Frontend: React.js + Tailwind CSS + Shadcn UI + lightweight-charts
- Blockchain: Web3 RPCs (Ethereum, BSC, Polygon)
- Banking: NIUM API (live production key) for IBAN/SEPA
- KYC: NIUM verification + AI OCR via GPT-4o (Emergent LLM key)
- Auth: JWT + TOTP 2FA (pyotp)
- Notifications: SSE (Server-Sent Events) + MongoDB persistence
- Card Issuing: NIUM API (live production key)

## Completed Features

### Phase 1-4
- User Auth, Trading Engine, Settlement, Blockchain Monitoring

### Phase 5
- Multi-chain Wallet Sync (ETH, BSC, Polygon)
- Virtual IBAN / SEPA Banking Rails (NIUM real + simulated fallback)
- Physical Card Issuing & Tracking (NIUM live)
- Internal NENO Exchange (dynamic pricing)

### Phase 6 (Current Session)
- Full Margin Trading PRO with candlestick charts + 10 indicators
- Unified Wallet (internal + on-chain)
- Multi-chain Token Discovery
- KYC/AML Compliance (4-tier + AI verification)
- Dynamic NENO Pricing (order book pressure)
- Advanced Orders (Limit, Stop, Trailing Stop)
- 2FA TOTP Authentication
- Push Notifications (SSE)
- Portfolio Analytics (PnL chart, allocation pie)
- Settings page (Security, Language, Notifications)
- Multi-language support (IT, EN, DE, FR)
- Real NIUM IBAN/SEPA integration with fallback
- AI-powered KYC document verification (GPT-4o OCR)

## Key Collections
users, wallets, orders, trades, trading_engine_pairs, margin_accounts, margin_positions, neno_transactions, cards, user_wallets, onchain_wallets, virtual_ibans, banking_transactions, kyc_profiles, kyc_tx_log, aml_alerts, advanced_orders, totp_secrets, notifications
