# NeoNoble Pitch Deck - API Contracts

## Overview
Backend integration for NeoNoble Ramp & NeoExchange investor pitch deck with bidirectional On-Ramp and Off-Ramp coverage, including export functionality.

## Slide Structure (11 Slides)
1. Company Overview - Bidirectional positioning
2. Product Vision - On-Ramp & Off-Ramp dual flow
3. Target Users & Use-Cases
4. Market & Geography
5. Compliance & Provider-of-Record Model - KYC/KYB/AML split
6. Technical Architecture
7. **Workflow & Value Chain** - NEW: Flow diagrams & boundaries
8. Partnership & Integration Model
9. Revenue & Growth Strategy - Dual-side monetization
10. Roadmap
11. Contact & Partnership Discussion

## API Endpoints

### 1. Get All Slides
```
GET /api/pitch-deck/slides
Response: Array of 11 slide objects with id, title, subtitle, content
```

### 2. Get Single Slide
```
GET /api/pitch-deck/slides/{slide_id}
Response: Single slide object
```

### 3. Get Company Info
```
GET /api/pitch-deck/company-info
Response: { name, tagline, description, platforms, email }
```

### 4. Get Metadata
```
GET /api/pitch-deck/metadata
Response: { name, version, total_slides: 11, last_updated, export_formats }
```

### 5. Export PowerPoint
```
GET /api/pitch-deck/export/pptx
Response: Binary PPTX file (~46KB)
```

### 6. Export PDF
```
GET /api/pitch-deck/export/pdf
Response: Binary PDF file (~17KB)
```

## Key Content Updates for Off-Ramp

### Product Vision (Slide 2)
- `dualFlow.onRamp`: Fiat → Provider-of-Record → Digital Assets
- `dualFlow.offRamp`: Digital Assets → Provider-of-Record → Fiat (EUR IBAN)

### Compliance Model (Slide 5)
- `complianceSplit.onRamp`: KYC, AML, Settlement responsibilities
- `complianceSplit.offRamp`: KYB, AML, Payout responsibilities

### Workflow & Value Chain (Slide 7)
- `workflows.onRamp.steps`: 5-step On-Ramp flow with owner attribution
- `workflows.offRamp.steps`: 5-step Off-Ramp flow with owner attribution
- `boundaries.neonoble`: UX layer responsibilities
- `boundaries.provider`: Regulated responsibilities (custody, compliance, settlement)

### Revenue Strategy (Slide 9)
- `revenueStreams`: On-Ramp Fees, Off-Ramp Fees, B2B Integrations, White-Label

## Contact Information
- NeoNoble Ramp — Crypto on-ramp platform
- NeoExchange — Fintech infrastructure & partner stack
- Email: massimoadmin@neonoble.it
