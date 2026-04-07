# NeoNoble Ramp - PRD

## Original Problem Statement
Enterprise-grade fintech platform: crypto/fiat bridge, internal exchange (NENO), Market Maker with Treasury as real counterparty.

## Architecture
- **Backend**: FastAPI + MongoDB + Web3.py (BSC Mainnet)
- **Frontend**: React + Tailwind + Wagmi
- **Market Maker**: Treasury = Massimo's account (TREASURY_USER_ID)
- **Audit**: Aggressive logging on every Sell/Swap/Off-Ramp with on-chain verification

## Treasury (Real)
- **Owner**: massimo.fornara.2212@gmail.com
- **Source**: Combined internal wallets + on-chain hot wallet
- **Assets**: EUR ~29,378 | ETH ~884 | BTC ~0.35 | NENO 397 (on-chain) | BNB 0.005

## Implemented
- Phase 1-4: Tokens, Exchange, Wallet, Ledger, WebSockets
- Phase 5: Market Maker (bid/ask, treasury counterparty, matching, PnL)
- Aggressive Audit Logger: PRE/POST snapshots, on-chain verification, consistency checks
- Mass testing: 20/20 trades passed, 0 consistency issues, EUR 7.26 PnL generated

## Key API Endpoints
- GET /api/market-maker/pricing (public)
- GET /api/market-maker/treasury, /pnl, /risk, /order-book (auth)
- POST /api/neno-exchange/buy, /sell, /swap, /offramp (auth, audited)

## Pending
- NIUM Integration (awaiting templateId)

## Backlog
- Admin Treasury Dashboard with PnL charts (P1)
- Microservices split (P2)
- Dynamic NENO pricing from real order book (P2)
