# NeoNoble Ramp - PRD (Product Requirements Document)

## Original Problem Statement
Enterprise-grade fintech platform for crypto/fiat bridge. Multi-chain wallet with custom token creation, internal exchange (NENO), real on-chain execution, NIUM banking integration, DCA trading, PDF compliance exports, and Internal Market Maker with Treasury as real counterparty.

## Core Architecture
- **Backend**: FastAPI + MongoDB (Motor) + Web3.py (BSC Mainnet)
- **Frontend**: React + Tailwind + Wagmi/WalletConnect
- **Blockchain**: BSC Mainnet, Alchemy RPC, real on-chain execution
- **Market Maker**: Treasury-backed by Massimo's account (TREASURY_USER_ID)

## Treasury Architecture
- **Owner**: massimo.fornara.2212@gmail.com (TREASURY_USER_ID in .env)
- **Source of Truth**: Combined internal wallets + on-chain hot wallet
- **Assets tracked**: EUR, ETH, BTC, NENO (on-chain), BNB (on-chain), USDT, USDC
- **Per-asset**: amount, internal_balance, onchain_balance, locked_amount, available_amount
- **Every trade**: Debits/credits Massimo's real wallet balances

## Implemented Features

### Phase 1-4 (Complete)
- Custom Token Creation, Buy/Sell/Swap, Multi-chain wallet
- Settlement Ledger, Execution Engine, WebSocket updates
- DCA Trading Bot, PDF Compliance, SMS Notifications

### Phase 5 - Market Maker (Complete - April 2026)
- **Market Maker Pricing Engine**: Dynamic bid/ask, spread 20-200 bps
- **Treasury = Massimo's Account**: Real counterparty, combined internal+on-chain
- **Internal Matching Engine**: Netting before treasury
- **PnL Accounting**: Revenue separated from inventory changes
- **Off-Ramp Fallback**: USDT/USDC crypto when NIUM not configured
- **Risk Dashboard**: risk_level, inventory_ratio, spread monitoring
- **API**: /api/market-maker/pricing (public), /treasury, /pnl, /risk, /order-book (auth)

## Key DB Collections
- `wallets`: User balances (Treasury reads from owner's wallets)
- `treasury_inventory`: Synced from owner wallets + on-chain (cached view)
- `mm_pnl_ledger`: PnL entries per trade
- `mm_order_book`: Internal order book for netting
- `settlement_ledger`: State machine for trade settlements

## Current Treasury State
- NENO: 397 (on-chain hot wallet)
- EUR: ~29,640 (Massimo's internal wallet)
- ETH: ~884 (Massimo's internal wallet)
- BTC: ~0.35 (Massimo's internal wallet)
- Total: ~EUR 6.8M

## Pending / Blocked
- NIUM Integration: Awaiting templateId from user portal
- BSC RPC Error: Cleaned up, using logger.debug for non-critical errors

## Backlog
- Microservices architecture split (P1)
- Dynamic NENO pricing from real order book (P2)
- Referral system with NENO bonuses (P2)
- Admin Treasury dashboard with PnL charts (P2)
