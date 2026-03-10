# NeoNoble Ramp - Product Requirements Document

## Vision
NeoNoble Ramp is a global, enterprise-grade fintech infrastructure platform - a token-native financial platform comparable to Stripe, Coinbase, or MoonPay.

## Core Architecture
- **Backend:** FastAPI + MongoDB (Motor async client)
- **Frontend:** React + Craco + Tailwind CSS
- **Auth:** JWT-based with roles: USER, DEVELOPER, ADMIN
- **Web3:** Web3Modal + Wagmi + viem for wallet connectivity
- **Market Data:** CoinGecko API with cache + fallback

## Implemented Features

### Phase 0 - Foundation (Complete)
- [x] User authentication (register, login, JWT)
- [x] Role-based access control (USER, DEVELOPER, ADMIN)
- [x] Password reset via email (Resend integration)
- [x] Dashboard with live crypto prices
- [x] Transak On/Off-Ramp integration
- [x] Multi-wallet connectivity (Web3Modal)
- [x] Candlestick charts (lightweight-charts v4)
- [x] Transaction timeline and audit service

### Phase 1 - Core Economic Engine (Complete - March 2026)
- [x] Token Creation Infrastructure (€100 fee, multi-chain: ETH/BSC/Polygon/Arbitrum/Base)
- [x] Token Listing Marketplace (Standard €500, Premium €2K, Featured €5K)
- [x] Subscription System (6 plans: Free → Enterprise €999.99)
- [x] Admin Dashboard (real-time stats, token/listing/user/subscription management)
- [x] Deployment Fix (webpack fallbacks for Web3Modal peer deps)

### Phase 2 - Platform Infrastructure (Complete - March 2026)
- [x] **Market Data Integration** - CoinGecko API for 32 cryptocurrencies with price, market cap, volume, 24h/7d % change, sparkline charts. Cache + fallback for rate limits.
- [x] **Admin Analytics & Traffic Monitoring** - Page view tracking, user engagement metrics, session analysis, top pages, daily traffic charts. Admin dashboard section.
- [x] **Crypto-Enabled Card Infrastructure** - Virtual (€0) and physical (€9.99) cards. Visa/Mastercard. Crypto-to-fiat conversion for top-ups. Freeze/unfreeze, cancel. Transaction history.
- [x] **Multi-Chain Token Enhancement** - Chain selection (Ethereum, BSC, Polygon, Arbitrum, Base) in token creation flow.

### Phase 2 Key APIs
- GET /api/market-data/coins - 32 crypto market data
- GET /api/market-data/trending - Trending coins
- POST /api/analytics/track - Page view tracking (no auth)
- GET /api/analytics/admin/overview - Admin analytics
- GET /api/analytics/admin/engagement - Engagement metrics
- POST /api/cards/create - Create virtual/physical card
- GET /api/cards/my-cards - List user cards
- POST /api/cards/{id}/top-up - Crypto-to-fiat top-up
- POST /api/cards/{id}/freeze - Freeze/unfreeze
- GET /api/cards/{id}/transactions - Transaction history
- GET /api/cards/admin/overview - Admin card stats

## Roadmap

### P1 - Exchange Engine + Order Book
- Matching engine for buy/sell orders
- Order book with bid/ask levels
- Trade execution and settlement
- Market depth visualization

### P2 - TradingView Integration
- Professional charting interface
- Multiple timeframes and indicators
- Integration with platform trading pairs

### P3 - Developer API Ecosystem
- Public REST APIs for third-party developers
- API key management
- Rate limiting and usage tracking

### P4 - Microservices Architecture
- Decompose monolith into services
- Auth, Wallet, Trading, Market Data, Token, Subscription services

### P5 - Real Card Issuer Integration
- Partner with Visa/Mastercard issuer
- KYC/AML compliance
- Real card issuance and payment processing

## Test Reports
- /app/test_reports/iteration_3.json - Core Economic Engine (17/17 passed)
- /app/test_reports/iteration_4.json - Platform Infrastructure (24/24 passed)

## Test Credentials
- Admin: admin@neonobleramp.com / Admin1234!
- User: testchart@example.com / Test1234!

## Fee Structure
- Token Creation: €100
- Standard Listing: €500
- Premium Listing: €2,000
- Featured Listing: €5,000
- Trading Pair: €50
- Virtual Card: €0 (free)
- Physical Card: €9.99 issuance + €1.99/month
