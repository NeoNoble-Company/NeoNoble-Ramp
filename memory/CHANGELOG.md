# NeoNoble Ramp — Changelog

## 2026-04-02 (Session — Phase 6 Complete)

### Margin Trading PRO (P0) - DONE
- Professional candlestick charts, 4 chart types, 10 indicators
- Margin account, LONG/SHORT, leverage 2-20x, SL/TP

### Unified Wallet (P0) - DONE
- Internal + on-chain balances synced in "Unificato" tab

### Multi-chain Token Discovery (P0) - DONE
- Auto-discover ERC-20/BEP-20 tokens

### KYC/AML Compliance (P1) - DONE
- 4-tier KYC (0→3), admin review, AML monitoring
- AI-powered document verification via GPT-4o OCR
- Auto-approval for verified documents

### Dynamic NENO Pricing (P2) - DONE
- Order book pressure-based, max ±5% deviation from €10,000 base

### Real NIUM IBAN/SEPA Banking - DONE
- NIUM API integration for real IBAN creation
- SEPA withdrawal processing
- Webhook support for deposits
- Automatic fallback to simulated mode

### Advanced Orders - DONE
- Limit orders (GTC, IOC, FOK)
- Stop orders and Stop-Limit orders
- Trailing Stop orders (amount or percentage)
- Order management (cancel, history)
- Fund reservation on order placement

### 2FA TOTP Authentication - DONE
- TOTP setup with QR code generation
- Verification flow with backup codes (8 codes)
- Enable/disable with code validation
- Status endpoint

### Push Notifications - DONE
- In-app notification system
- SSE real-time delivery
- Read/unread tracking, mark all read
- Notification types: trade, margin, kyc, security, system

### Portfolio Analytics - DONE
- PnL curve chart (lightweight-charts)
- Portfolio allocation pie chart (SVG)
- Summary cards: Total Value, Realized PnL, Unrealized PnL, Win Rate
- Open margin positions table
- Recent trades list

### Settings Page - DONE
- Security tab: 2FA TOTP setup/disable with QR code
- Language tab: IT, EN, DE, FR selection
- Notifications tab: Toggle preferences per category

### Dashboard Updates - DONE
- Notification bell with unread badge
- Settings gear icon
- Portfolio Analytics link
- All navigation cards complete

### Testing
- iteration_10: Margin + Unified (19/19, 100%)
- iteration_11: KYC + Dynamic Pricing (15/15, 100%)
- iteration_12: All new features (21/21, 100%)
