# NeoNoble Pitch Deck - API Contracts

## Overview
Backend integration for NeoNoble Ramp & NeoExchange investor pitch deck with bidirectional On-Ramp and Off-Ramp coverage, including NENO Token fixed-value operating model.

## NENO Token Configuration
- **Token**: NeoNoble Token (NENO)
- **Chain**: BSC (Binance Smart Chain)
- **Fixed Value**: €10,000 per unit
- **Model**: Platform-defined fixed value (not market-driven)
- **On-Ramp**: Fiat → NENO purchase at €10,000/unit
- **Off-Ramp**: NENO → Fiat redemption at €10,000/unit

## Slide Structure (11 Slides)
1. Company Overview - Includes NENO mention
2. Product Vision - NENO Token model card + dual flow
3. Target Users & Use-Cases - NENO use cases
4. Market & Geography
5. Compliance & Provider-of-Record Model - NENO compliance boundaries
6. Technical Architecture - Pricing & Value Layer for NENO
7. Workflow & Value Chain - NENO flow diagrams + boundaries
8. Partnership & Integration Model
9. Revenue & Growth Strategy - NENO adoption as growth driver
10. Roadmap - NENO integration milestones
11. Contact & Partnership Discussion

## Value & Risk Boundary Clarifications

### NeoNoble (Platform Layer)
- UX presentation and user journey
- **NENO price anchoring (€10,000 fixed value)**
- Token value abstraction layer
- Routing logic and provider selection
- API orchestration and webhooks

### Provider-of-Record (Regulated Layer)
- Fiat custody and banking relationships
- **NENO/Crypto custody and wallet management (BSC)**
- KYC/KYB identity verification
- AML transaction monitoring
- Settlement and payout execution
- Regulatory compliance and reporting

## API Endpoints

### Get Slides
```
GET /api/pitch-deck/slides
Response: Array of 11 slide objects including NENO content
```

### Export PowerPoint
```
GET /api/pitch-deck/export/pptx
Response: Binary PPTX file (~47KB)
```

### Export PDF
```
GET /api/pitch-deck/export/pdf
Response: Binary PDF file (~18KB)
```

## Contact Information
- NeoNoble Ramp — Crypto on-ramp platform
- NeoExchange — Fintech infrastructure & partner stack
- Email: massimoadmin@neonoble.it
