# NeoNoble Ramp - Product Requirements Document

## Original Problem Statement
Enterprise-grade fintech platform (NeoNoble Ramp) with multi-chain crypto wallet, NENO token exchange, real Web3 integration (BSC Mainnet via Alchemy), MetaMask transaction signing, and complete banking/card infrastructure.

## Current Status: FULLY OPERATIONAL
All 4 phases of the Custom Token roadmap are complete. Critical balance sync bug has been fixed and verified.

## Core Features
1. **NENO Exchange** - Buy/Sell/Swap/Off-Ramp with on-chain MetaMask execution
2. **Custom Token Creation** - Create, list, buy, sell, swap custom tokens
3. **Multi-chain Wallet** - BSC Mainnet, real Alchemy RPC, WalletConnect
4. **Real-time Balance Sync** - 5s polling for live balance updates
5. **DCA Trading Bot** - Automated recurring purchases
6. **PDF Compliance Reports** - Exportable compliance docs
7. **Referral System** - NENO bonus rewards
8. **NIUM Banking** - Card issuing (pending templateId)

## Architecture
- Backend: FastAPI + MongoDB (Motor) + Web3.py
- Frontend: React.js + Tailwind + Wagmi/WalletConnect
- API calls: XMLHttpRequest (not fetch) to bypass Emergent interceptor
- Background: Blockchain listener, DCA scheduler, price alerts

## Key API Endpoints
- `POST /api/neno-exchange/sell` - Sell NENO (always debits internal balance)
- `POST /api/neno-exchange/swap` - Swap tokens (always debits from_asset)
- `POST /api/neno-exchange/offramp` - Off-ramp NENO (always debits)
- `POST /api/neno-exchange/create-token` - Create custom token
- `POST /api/neno-exchange/buy-custom-token` - Buy custom tokens
- `POST /api/neno-exchange/sell-custom-token` - Sell custom tokens
- `GET /api/neno-exchange/live-balances` - Real-time balance polling
- `GET /api/neno-exchange/my-tokens` - User's custom tokens
- `POST /api/neno-exchange/verify-deposit` - Verify on-chain deposit

## Key DB Collections
- `custom_tokens`: {id, symbol, name, price_usd, price_eur, total_supply, creator_id}
- `wallets`: {user_id, asset, balance}
- `neno_transactions`: {id, user_id, type, ...}
- `onchain_deposits`: {tx_hash, user_id, amount, ...}

## Bug Fixes Applied
### Balance Sync Bug (2026-04-06)
- **Root cause**: sell/swap/offramp had `if not onchain_tx:` guard around `_debit()`. When tx_hash present, debit skipped but verify-deposit already credited NENO.
- **Fix**: Removed guard - always debit NENO from internal wallet. Net result: verify-deposit +N, sell -N = correct 0 net change.
