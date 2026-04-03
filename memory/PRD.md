# NeoNoble Ramp — PRD

## Original Problem Statement
Enterprise-grade fintech platform for crypto on/off-ramp, NENO token exchange, card issuing, and multi-chain wallet management.

## Architecture
- Backend: FastAPI, MongoDB (Motor), Web3.py, Alchemy BSC RPC
- Frontend: React.js, Tailwind, Wagmi v3/viem, WalletConnect, qrcode.react
- NENO Contract: `0xeF3F5C1892A8d7A3304E4A15959E124402d69974` (BSC Mainnet)
- Hot Wallet: `0x18CE1930820d5e1B87F37a8a2F7Cf59E7BF6da4E`
- RPC: Alchemy (`bnb-mainnet.g.alchemy.com`)

## Implemented Features (100%)
- [x] NENO Exchange: buy/sell/swap/off-ramp/deposit (XHR-based)
- [x] Deposit NENO widget: QR code + hot wallet address + 3-step flow
- [x] Real on-chain NENO balance (Wagmi useReadContract)
- [x] MetaMask transaction signing (sell/swap/off-ramp)
- [x] On-chain deposit verification (verify-deposit endpoint)
- [x] Alchemy BSC RPC (replaced Infura)
- [x] Blockchain listener: POA middleware, clean RPC calls, no log spam
- [x] CORS fix: XMLHttpRequest bypasses Emergent fetch interception
- [x] NIUM Banking (V2 Unified API)
- [x] DCA Bot + Background Scheduler + PDF Reports + SMS
- [x] Margin Trading + Monte Carlo VaR + PEP screening
- [x] Multi-language + Microservices routing

## Pre-Deploy Status
- Backend: All endpoints verified, logs clean (no RPC errors)
- Frontend: All 6 tabs working, error messages displayed correctly
- RPC: Alchemy BSC Mainnet stable
- **Waiting**: User's MetaMask test (1-5 NENO transfer to hot wallet)
- **Waiting**: NIUM templateId from portal

## Backlog
- [ ] NIUM templateId configuration
- [ ] Dynamic NENO pricing from order book
- [ ] Referral system with NENO bonuses
