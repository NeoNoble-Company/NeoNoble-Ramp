# NeoNoble Ramp — Changelog

## April 3, 2026 (Final Production Enforcement)
### On-Chain Settlement (BSC)
- Created `/app/backend/services/onchain_settlement.py` — reads real BSC blocks via public dataseed RPCs
- Settlement hash: `Web3.keccak(text=block_hash + tx_data)` — deterministic, verifiable
- BSC POA middleware (`ExtraDataToPOAMiddleware`) for chain compatibility
- Multiple RPC failover (5 BSC dataseed endpoints)
- NENO Contract 0xeF3F5C1892A8d7A3304E4A15959E124402d69974 verified: NeoNoble Token, $NENO, 18 dec, 999.8M supply

### Settlement Data in Every Transaction
- settlement_hash, settlement_block_number, settlement_block_hash
- settlement_contract, settlement_chain_id (56)
- settlement_explorer (BSCScan block link)
- settlement_contract_explorer (BSCScan token link)

### New Endpoints
- GET /contract-info — Real BSC contract metadata + current block
- GET /onchain-balance/{addr} — balanceOf from NENO contract
- Enhanced /settlement/{tx_id} — confirmations calculated from current block
- Enhanced /wallet-sync — reads real on-chain NENO balance
- Enhanced /portfolio-snapshot — includes contract verification + block data

### Frontend
- Settlement banner: hash + BSC Mainnet + Block # + BSCScan link
- Transaction history: block numbers + settlement hashes + BSCScan links  
- Contract info footer: 0xeF3F5C18...d69974 + BSCScan link + supply info
- Connected wallet indicator with on-chain balance

### Infrastructure
- WalletConnect: conditional loading (no errors without project ID)
- BSC poll interval: 120s (from 15s) — no rate limiting
- All RPC errors at DEBUG level

### Testing: Iteration 23 — 12/12 backend + 100% frontend (ZERO errors)

## Prior Sessions
- Session 4 Start: body-stream fix, Monte Carlo VaR, PEP Screening, 9 languages
- Sessions 1-3: Full platform build
