# NeoNoble Ramp - Product Requirements Document

## Overview
NeoNoble Ramp is a global, enterprise-grade fintech infrastructure platform comparable to Stripe or Coinbase. Built with FastAPI/MongoDB backend and React/lightweight-charts frontend.

## Core Requirements
- Crypto on/off-ramp platform with HMAC-secured API access
- BSC blockchain integration with real-time monitoring
- Professional trading engine with order book matching
- Card issuing infrastructure (NIUM integration)
- Multi-asset wallet with conversion pipeline
- Developer API ecosystem

## User Personas
- **End Users**: Crypto traders, card holders, token creators
- **Developers**: API consumers building on the platform
- **Admins**: Platform operators monitoring analytics and trades

## Architecture
- **Backend**: FastAPI + MongoDB (Motor) + WebSockets
- **Frontend**: React + lightweight-charts + TailwindCSS + Shadcn UI
- **3rd Party**: NIUM (Cards), CoinGecko (Market Data), Stripe (Payouts), Resend (Email), Binance/Kraken/Coinbase (Exchange Connectors)

## Completed Features

### Phase 1: Core Economic Engine
- Token Creation & Management
- Token Listing Marketplace
- Subscription Plans (Basic, Pro, Enterprise, Institutional)
- Auth system (JWT-based)

### Phase 2: Platform Infrastructure
- Market Data Integration (CoinGecko)
- Admin Analytics Dashboard
- Crypto-Enabled Card UI
- Password Reset (Resend email)

### Phase 3: Trading & Developer Ecosystem
- Exchange Engine (matching engine, order book)
- Professional candlestick charts (lightweight-charts)
- Developer API documentation portal
- Exchange connectors (Binance, Kraken, Coinbase)

### Phase 4: Final Execution Phase (VALIDATED - March 2026)
All 10 features tested and operational (100% pass rate):

1. **Card Issuing (NIUM)** - Virtual card creation, top-up, freeze/unfreeze, funding from crypto
2. **Settlement Engine** - Crypto-to-Fiat, Crypto-to-Crypto, Fiat-to-Crypto conversions (0.3% fee)
3. **Trading Engine (Full)** - 15 trading pairs, market/limit order execution and matching
4. **Conversion & Settlement Pipeline** - Trade -> Convert -> Settle -> Wallet Credit (E2E)
5. **NENO Token Liquidity** - NENO-EUR and NENO-USDT pairs fully operational
6. **Token Compatibility** - All tokens compatible with trading, conversion, card funding
7. **Advanced Trading Orders** - Stop-Loss and Take-Profit (pending_trigger status)
8. **Margin Trading Preparation** - Account creation, leverage settings, position tracking
9. **WebSocket Infrastructure** - Real-time ticker streaming, multi-symbol subscriptions
10. **Paper Trading** - Simulated trades, portfolio tracking, reset functionality

## Key API Endpoints

### Trading
- `GET /api/trading/pairs` - 15 trading pairs
- `POST /api/trading/orders` - Place market/limit/SL/TP orders
- `GET /api/trading/pairs/{pair}/orderbook` - Order book
- `GET /api/trading/pairs/{pair}/candles` - OHLCV data
- `POST /api/trading/paper/trade` - Paper trading
- `POST /api/trading/margin/account` - Margin accounts

### Wallet & Settlement
- `GET /api/wallet/balances` - Multi-asset balances
- `POST /api/wallet/convert` - Asset conversion (any direction)
- `POST /api/wallet/fund-card` - Crypto->Fiat->Card pipeline
- `GET /api/wallet/conversion-rates` - 14 supported assets

### Cards
- `POST /api/cards/create` - Virtual/physical cards (max 3)
- `POST /api/cards/{id}/top-up` - Crypto top-up
- `POST /api/cards/{id}/freeze` - Freeze/unfreeze

### WebSocket
- `WS /api/ws/ticker/{symbol}` - Live ticker
- `WS /api/ws/multi` - Multi-symbol subscriptions

## Test Credentials
- Admin: admin@neonobleramp.com / Admin1234!
- User: testchart@example.com / Test1234!

## Upcoming Tasks (P1)
- Microservices Architecture Refactoring
- Full Margin Trading Implementation

## Future Backlog (P2)
- Developer API Ecosystem expansion
- Enhanced real-time notification system
- Load testing script update
