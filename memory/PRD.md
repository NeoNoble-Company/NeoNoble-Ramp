# NeoNoble Ramp - Product Requirements Document

## Overview
NeoNoble Ramp is a global, enterprise-grade fintech infrastructure platform comparable to Stripe or Coinbase. Built with FastAPI/MongoDB backend and React/lightweight-charts frontend.

## Core Requirements
- Crypto on/off-ramp platform with HMAC-secured API access
- BSC blockchain integration with real-time monitoring
- Professional trading engine with order book matching
- Card issuing infrastructure (NIUM integration) - virtual & physical with shipping
- Multi-asset wallet with conversion pipeline
- Multi-chain wallet sync (ETH/BSC/Polygon)
- Banking Rails (IBAN/SEPA)
- Developer API ecosystem

## Architecture
- **Backend**: FastAPI + MongoDB (Motor) + WebSockets
- **Frontend**: React + lightweight-charts + TailwindCSS + Shadcn UI
- **3rd Party**: NIUM (Cards), CoinGecko (Market Data), Stripe, Resend (Email), Exchange Connectors

## Completed Features

### Phase 1: Core Economic Engine
- Token Creation & Management
- Token Listing Marketplace
- Subscription Plans
- Auth system (JWT)

### Phase 2: Platform Infrastructure
- Market Data Integration (CoinGecko)
- Admin Analytics Dashboard
- Crypto-Enabled Card UI
- Password Reset (Resend email)

### Phase 3: Trading & Developer Ecosystem
- Exchange Engine (matching engine, order book)
- Professional candlestick charts (lightweight-charts)
- Developer API documentation portal + API Key management
- Exchange connectors (Binance, Kraken, Coinbase)

### Phase 4: Final Execution Phase (Validated March 2026)
1. Card Issuing (NIUM) - Virtual + Physical with shipping & tracking
2. Settlement Engine - Crypto↔Fiat↔Crypto conversions (0.3% fee)
3. Trading Engine - 15 pairs, Market/Limit/SL/TP orders
4. Conversion & Settlement Pipeline (Trade→Convert→Settle→Wallet)
5. NENO Token Liquidity (NENO-EUR, NENO-USDT)
6. Token Compatibility - All tokens compatible with all services
7. Advanced Trading Orders (Stop-Loss, Take-Profit)
8. Margin Trading Preparation
9. WebSocket Infrastructure
10. Paper Trading Environment

### Phase 5: Financial Infrastructure Activation (Validated March 2026)
1. **Multi-Chain Wallet Sync** - Ethereum, BSC, Polygon on-chain balance reading
2. **Banking Rails (IBAN/SEPA)** - Virtual IBAN assignment, SEPA deposits/withdrawals
3. **Enhanced Card Issuing** - Physical cards with shipping address, tracking, delivery estimates
4. **Crypto-to-Fiat Payment Pipeline** - Complete crypto→conversion→fiat→card pipeline
5. **Wallet & Banking UI** - Full frontend page with 3 tabs (Wallet, On-Chain, Banking)

## Key API Endpoints

### Multi-Chain
- `GET /api/multichain/chains` - 3 supported chains
- `POST /api/multichain/link` - Link wallet address
- `GET /api/multichain/balances` - On-chain balances
- `POST /api/multichain/sync` - Force sync

### Banking Rails
- `POST /api/banking/iban/assign` - Virtual IBAN
- `GET /api/banking/iban` - User IBANs
- `POST /api/banking/sepa/deposit` - SEPA deposit
- `POST /api/banking/sepa/withdraw` - SEPA withdrawal
- `GET /api/banking/transactions` - History
- `GET /api/banking/admin/overview` - Admin stats

### Cards (Enhanced)
- `POST /api/cards/create` - Virtual/Physical with shipping
- `GET /api/cards/{id}/shipping` - Tracking status
- `POST /api/cards/{id}/top-up` - Crypto top-up
- `POST /api/wallet/fund-card` - Crypto→Fiat→Card

### Trading
- `POST /api/trading/orders` - Market/Limit/SL/TP
- Paper Trading, Margin prep, WebSocket

### Wallet
- `GET /api/wallet/balances` - Multi-asset
- `POST /api/wallet/convert` - Any direction

## Test Credentials
- Admin: admin@neonobleramp.com / Admin1234!
- Admin: mfornara93@gmail.com / NeoAdmin@Mf93!
- Admin: massimo.fornara.2212@gmail.com / NeoAdmin@Max22!
- User: testchart@example.com / Test1234!

## MOCKED/Simulated Components
- **IBAN generation**: Simulated NE prefix (production: banking partner API)
- **SEPA deposits**: User-triggered (production: banking webhooks)
- **NIUM Card Issuing**: Test API key (production: NIUM production key required)
- **Settlement rates**: Fixed internal rates (production: live market rates)

## Upcoming Tasks (P1)
- Microservices Architecture Refactoring
- Full Margin Trading Implementation
- Production NIUM key activation
- Real banking partner integration for IBAN/SEPA
- Exchange order routing to real liquidity

## Future Backlog (P2)
- Real On/Off-Ramp (Transak production activation)
- KYC/AML compliance layer
- Advanced analytics and reporting
