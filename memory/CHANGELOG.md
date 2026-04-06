# Changelog

## 2026-04-06 - CRITICAL BUG FIX: Balance Sync After On-Chain Transactions

### Problem
On-chain transactions (sell, swap, offramp) via MetaMask executed successfully on BSC Mainnet but internal wallet balances in the app did not update. NENO was not debited after sell/swap/offramp operations.

### Root Cause
The `verify-deposit` endpoint credits NENO to internal wallet when on-chain tx is confirmed. But sell/swap/offramp endpoints had an `if not onchain_tx:` guard around `_debit()` calls, which skipped the debit when `tx_hash` was provided.

### Fix
- Removed `if not onchain_tx:` guard in `sell_neno()` (line 360)
- Removed `if not onchain_tx:` guard in `swap_tokens()` (line 440)
- Removed `if not onchain_tx:` guard in `offramp_neno()` (line 804)
- Added 5s balance polling to `NenoExchange.js` for real-time sync
- Added immediate balance update from transaction response in `exec()`
- Fixed `handleCreateToken` to use `price_usd` instead of `price_eur`

### Test Results
- Iteration 28: 14/14 backend tests passed, all frontend UI verified
- Balance correctly debited on sell, swap, and offramp
- Balance persistence confirmed after refetch

## 2026-04-06 - Phase 1-4 Custom Token System (Complete)

### Phase 1: Custom Token Creation
- `POST /api/neno-exchange/create-token`: Symbol max 8 chars, price_usd 2 decimals
- `GET /api/neno-exchange/my-tokens`: User's tokens with balances
- Rewrote `TokenCreation.js` with XHR
- Added "Crea Token Personalizzato" button + "I Miei Token" section to Dashboard

### Phase 2: Buy/Sell Custom Tokens
- `POST /api/neno-exchange/buy-custom-token` and `sell-custom-token`
- Created `CustomTokenTrade.js` with Buy/Sell tabs

### Phase 3: Swap Logic
- Enhanced swap endpoint for custom tokens via NENO bridge
- Swap tab in CustomTokenTrade page

### Phase 4: Real-Time Balance Sync
- `GET /api/neno-exchange/live-balances` polling endpoint
- Dashboard live balances widget

### Test Results
- Iteration 27: 18/18 backend tests passed, all frontend UI verified
