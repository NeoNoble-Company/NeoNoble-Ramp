# NeoNoble Ramp - Product Requirements Document

## Vision
NeoNoble Ramp is a global, enterprise-grade fintech infrastructure platform - a token-native financial platform comparable to Stripe, Coinbase, or MoonPay.

## Core Architecture
- **Backend:** FastAPI + MongoDB (Motor async client)
- **Frontend:** React + Craco + Tailwind CSS + lightweight-charts v4
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
- [x] Transaction timeline and audit service

### Phase 1 - Core Economic Engine (Complete)
- [x] Token Creation Infrastructure (€100 fee, multi-chain)
- [x] Token Listing Marketplace (Standard €500, Premium €2K, Featured €5K)
- [x] Subscription System (6 plans: Free → Enterprise €999.99)
- [x] Admin Dashboard (real-time stats, full management)

### Phase 2 - Platform Infrastructure (Complete)
- [x] Market Data Integration (CoinGecko 32 cryptos, cache + fallback)
- [x] Admin Analytics & Traffic Monitoring (page views, engagement, sessions)
- [x] Crypto-Enabled Card Infrastructure (virtual/physical, crypto-to-fiat)

### Phase 3 - Trading & Developer Ecosystem (Complete - March 2026)
- [x] **Exchange Engine + Order Book** - 15 trading pairs (including NENO-EUR, NENO-USDT). Matching engine with market/limit orders. Bid/ask levels, market depth. Trade history with real execution.
- [x] **TradingView Integration** - Professional candlestick charts (lightweight-charts v4). 6 timeframes (1m, 5m, 15m, 1H, 4H, 1D). Volume overlay. Italian localization.
- [x] **Developer API Ecosystem** - 7 public REST API endpoints. Rate limiting per tier (100/1K/10K req/hour). API key management. Full documentation page.
- [x] **Card Issuer Partners** - Documentation with 6 partners: Marqeta, Stripe Issuing, Wallester, Highnote, Weavr, NIUM.

### Key API Endpoints
**Trading Engine:**
- GET /api/trading/pairs (15 pairs)
- GET /api/trading/pairs/{id}/ticker
- GET /api/trading/pairs/{id}/orderbook
- GET /api/trading/pairs/{id}/candles
- POST /api/trading/orders (market/limit)
- GET /api/trading/orders/my
- POST /api/trading/orders/cancel
- GET /api/trading/trades/{id}

**Public Developer API:**
- GET /api/public/v1/docs
- GET /api/public/v1/market/coins
- GET /api/public/v1/market/ticker/{id}
- GET /api/public/v1/market/orderbook/{id}
- GET /api/public/v1/market/candles/{id}
- GET /api/public/v1/market/trades/{id}
- GET /api/public/v1/pairs
- GET /api/public/v1/tokens

## Trading Pairs
BTC-EUR, ETH-EUR, SOL-EUR, BNB-EUR, XRP-EUR, ADA-EUR, DOGE-EUR, DOT-EUR, LINK-EUR, AVAX-EUR, NENO-EUR, NENO-USDT, BTC-USDT, ETH-USDT, ETH-BTC

## Roadmap

### P1 - Real Card Issuer Integration
- Partner with Marqeta/Stripe Issuing
- KYC/AML compliance
- Real card issuance

### P2 - Microservices Architecture
- Decompose monolith into services

### P3 - Real-time Notifications
- WebSocket + email alerts

### P4 - Advanced Exchange Features
- Stop-loss / Take-profit orders
- Margin trading
- Multi-chain DEX aggregation

## Test Reports
- iteration_3: Core Economic Engine (17/17)
- iteration_4: Platform Infrastructure (24/24)
- iteration_5: Trading & Developer (23/23)

## Test Credentials
- Admin: admin@neonobleramp.com / Admin1234!
- User: testchart@example.com / Test1234!

## Card Issuing Partners (Ready for Integration)
1. **Marqeta** - https://www.marqeta.com (Programmable card issuing, JIT Funding)
2. **Stripe Issuing** - https://stripe.com/issuing (Quick setup, Stripe ecosystem)
3. **Wallester** - https://wallester.com (EU Regulated, White-label)
4. **Highnote** - https://www.highnote.com (Enterprise-grade, Global BIN)
5. **Weavr (Railsbank)** - https://www.weavr.io (BaaS, No license required)
6. **NIUM** - https://www.nium.com (Global coverage, Multi-payment)
