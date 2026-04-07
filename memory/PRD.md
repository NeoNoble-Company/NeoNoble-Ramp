# NeoNoble Ramp - Product Requirements Document

## Status: PRODUCTION-GRADE INFRASTRUCTURE — FULLY OPERATIONAL

### Real On-Chain Execution Verified
- tx_hash: `0x329adc7ab981dfd5b182f6a4769ef06b902044df1ad046e48e65ac6672d48f23`
- 1 NENO sent from hot wallet to user wallet on BSC Mainnet
- Hot wallet: 397 NENO + 0.00484 BNB remaining

### Architecture
- Backend: FastAPI + MongoDB + Web3.py + Alchemy BSC RPC
- Frontend: React.js + Tailwind + Wagmi/WalletConnect
- Settlement: 5-state machine (on_chain_executed → internal_credited → payout_pending → payout_sent → payout_settled)
- Background: Blockchain listener (3s), payout processor (30s), reconciliation (15s), DCA bot (60s)

### Infrastructure Layer
1. **Execution Engine**: Real on-chain tx signing with hot wallet private key
2. **Settlement Ledger**: Double-entry with full state_history audit trail
3. **Payout Queue**: IBAN/SEPA/Card with retry logic (3x), auto-execute with NIUM
4. **Treasury**: PnL tracking, fee collection (60 EUR collected), risk assessment
5. **Liquidity Engine**: Internal netting, JIT routing, PancakeSwap V2 multi-hop
6. **Multi-Rail Settlement**: Crypto + Stablecoin + SEPA + Card
7. **WebSocket**: Balance stream at /api/ws/balances/{token}
8. **API-as-a-Service**: /api/infra/* endpoints for multi-tenant

### Key Endpoints
- `POST /api/infra/execute/send-onchain` - Real on-chain transfer
- `GET /api/infra/hot-wallet` - On-chain balances
- `GET /api/infra/settlement/rails` - 4-rail status
- `GET /api/infra/treasury/pnl` - P&L + risk
- `GET /api/infra/health` - System health
- `GET /api/infra/routing/quote` - DEX routing
- `GET /api/infra/netting-stats` - Internalization rate
- All NENO exchange endpoints with state tracking

### Test Results
- Iteration 30: 21/21 passed (100%)
- Real on-chain execution confirmed
- Treasury fees: 60 EUR collected
