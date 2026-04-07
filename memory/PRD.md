# NeoNoble Ramp - PRD (Product Requirements Document)

## Original Problem Statement
Enterprise-grade fintech platform for crypto/fiat bridge. Multi-chain wallet with custom token creation, internal exchange (NENO), real on-chain execution, NIUM banking integration, DCA trading, PDF compliance exports, and Market Maker activation.

## Core Architecture
- **Backend**: FastAPI + MongoDB (Motor) + Web3.py (BSC Mainnet)
- **Frontend**: React + Tailwind + Wagmi/WalletConnect
- **Blockchain**: BSC Mainnet, Alchemy RPC, real on-chain execution
- **Market Maker**: Treasury-backed counterparty, dynamic bid/ask pricing

## Implemented Features

### Phase 1-4 (Complete)
- Custom Token Creation with on-chain deployment
- NENO Buy/Sell/Swap with dynamic pricing
- Multi-chain wallet with deposit/withdrawal
- Off-ramp to card/bank/crypto
- Settlement Ledger with state machine
- Real on-chain execution engine
- WebSocket real-time balance updates
- Force balance sync
- DCA Trading Bot
- PDF Compliance Reports
- SMS Notifications (Twilio-ready)

### Phase 5 - Market Maker (Complete - April 2026)
- **Market Maker Pricing Engine**: Dynamic bid/ask with spread based on inventory skew + volatility
  - Base spread: 50 bps (0.5%)
  - Skew adjustment: +/- based on treasury NENO inventory vs target (500)
  - Volatility adjustment: based on 24h trading volume
  - Total spread: 20-200 bps range
- **Treasury as Real Counterparty**: Single source of truth for platform finances
  - Per-asset tracking: NENO, EUR, USDT, USDC, BNB
  - Available vs locked amounts
  - On-chain sync from hot wallet (BSC)
  - Source tracking: on_chain / provider / internal
- **Internal Matching Engine**: Netting before treasury
  - Order book with pending/filled states
  - Gas savings on matched orders
- **PnL Accounting**: Revenue separated from inventory changes
  - Spread revenue (bid/ask difference)
  - Fee revenue (0.3% platform fee)
  - Legacy fee tracking maintained
- **Off-Ramp Fallback**: USDT/USDC crypto when NIUM not configured
  - Sends stablecoin to user's BSC wallet
  - State: payout_executed_external
- **Risk Dashboard**: risk_level, inventory_ratio, spread monitoring
- **API Endpoints**:
  - GET /api/market-maker/pricing (public)
  - GET /api/market-maker/treasury (auth)
  - GET /api/market-maker/pnl (auth)
  - GET /api/market-maker/risk (auth)
  - GET /api/market-maker/order-book (auth)

## Key DB Collections
- `treasury_inventory`: {asset, amount, locked_amount, available_amount, source, last_synced}
- `mm_pnl_ledger`: {tx_id, direction, spread_revenue_eur, fee_revenue_eur, inventory_change_neno}
- `mm_order_book`: {type, asset, amount, remaining_amount, status, price_eur}
- `settlement_ledger`: {tx_id, state, debit_asset, credit_asset, fee_amount}

## Current State
- Treasury: NENO=397 (on-chain), BNB=0.00484, EUR=0, USDT=0, USDC=0
- Pricing: Bid ~9815, Ask ~9985, Mid 10000, Spread ~170 bps
- Risk: Low (inventory_ratio=0.794)

## Pending / Blocked
- NIUM Integration: Awaiting templateId from user portal
- BSC RPC Error: Non-critical background log noise (P2)

## Backlog
- Microservices architecture split (P1)
- Dynamic NENO pricing from real order book (P2)
- Referral system with NENO bonuses (P2)
