# NeoNoble Ramp - Changelog

## [4.0.0] - 2026-03-12 - Final Execution Phase Validation

### Fixed
- **CRITICAL**: Duplicate key error in `settlements` collection - conflicting unique index on `settlement_id` between `settlement_service.py` and `settlement_engine.py`. Fixed by adding `settlement_id` field to settlement_engine.py documents and making index sparse
- **CRITICAL**: `setInterval` naming conflict in TradingPage.js - React useState setter shadowed `window.setInterval`, breaking auto-refresh of ticker data. Renamed to `setChartInterval`
- Stop-Loss/Take-Profit orders with `pending_trigger` status couldn't be cancelled. Added `pending_trigger` to cancellable statuses
- Card `created_at` datetime serialization issue in card_routes.py response

### Added
- Stop-Loss (SL) and Take-Profit (TP) buttons in trading order form UI
- Trigger price input field for SL/TP orders in frontend
- Cancel button for `pending_trigger` orders in MyOrders component

### Validated (E2E - 100% pass rate, 33/33 tests)
- Card Issuing (NIUM integration)
- Crypto-to-Fiat Settlement Engine
- Trading Engine across all 15 pairs
- Conversion & Settlement Pipeline (Trade -> Convert -> Settle -> Wallet)
- NENO Token Liquidity (NENO-EUR, NENO-USDT)
- Advanced Trading Orders (Stop-Loss, Take-Profit)
- Margin Trading Infrastructure
- WebSocket Infrastructure
- Paper Trading Environment
- Token Compatibility Layer

## [3.0.0] - Phase 3: Trading & Developer Ecosystem
- Exchange Engine with matching engine
- Professional candlestick charts (lightweight-charts)
- Developer API portal
- Exchange connectors (Binance, Kraken, Coinbase)

## [2.0.0] - Phase 2: Platform Infrastructure
- Market Data (CoinGecko)
- Admin Analytics Dashboard
- Crypto Card UI
- Password Reset (Resend)

## [1.0.0] - Phase 1: Core Economic Engine
- Token Creation & Management
- Token Listing Marketplace
- Subscription Plans
- Authentication (JWT)
