# NeoNoble Ramp — PRD (Product Requirements Document)

## Original Problem Statement
Enterprise-grade fintech platform for crypto on/off-ramp, NENO token exchange, card issuing, and multi-chain wallet management. Built with FastAPI + React + MongoDB.

## Core Requirements
1. Real NIUM banking integration (card issuing, KYC)
2. NENO internal exchange (buy/sell/swap/off-ramp)
3. Multi-chain wallet (BSC, ETH, Polygon)
4. WalletConnect/MetaMask integration
5. Automated DCA Trading Bot
6. PDF Compliance Reports
7. Margin Trading
8. Multi-channel Notifications (SSE, Push, SMS)

## User Personas
- **End User**: Buys/sells NENO, manages crypto portfolio, uses cards
- **Admin**: Monitors transactions, manages users, configures platform

## Architecture
- Backend: FastAPI, MongoDB (Motor), Web3.py, background scheduler
- Frontend: React.js, Tailwind, Wagmi v3/viem, WalletConnect
- NENO Token: BSC Mainnet contract `0xeF3F5C1892A8d7A3304E4A15959E124402d69974`
- Platform Hot Wallet: `0x18CE1930820d5e1B87F37a8a2F7Cf59E7BF6da4E`

## What's Been Implemented (100% complete)
- [x] NENO Exchange (buy/sell/swap/off-ramp) with real error handling
- [x] Real on-chain NENO balance reading via Wagmi useReadContract
- [x] MetaMask/WalletConnect transaction signing for sell/swap/off-ramp
- [x] Platform hot wallet endpoint (derived from mnemonic)
- [x] On-chain deposit verification endpoint (verify-deposit)
- [x] CORS fix: XMLHttpRequest-based HTTP helpers (bypasses Emergent fetch interception)
- [x] NIUM Banking integration (V2 Unified API)
- [x] DCA Trading Bot + Background Scheduler
- [x] PDF Compliance Reports
- [x] SMS Notification dispatch (Twilio-ready)
- [x] Margin Trading
- [x] Monte Carlo VaR analytics
- [x] PEP screening
- [x] Multi-language support (4 languages)
- [x] Microservices-style routing

## Remaining / Backlog
- [ ] NIUM templateId configuration (blocked on user's NIUM portal)
- [ ] Dynamic NENO pricing from order book
- [ ] Referral system with NENO bonuses
- [ ] BSC RPC error cleanup in blockchain_listener.py
- [ ] Microservices architecture refactoring
