# NeoNoble Pitch Deck - API Contracts

## Overview
Backend integration for NeoNoble Ramp & NeoExchange investor pitch deck with export functionality.

## API Endpoints

### 1. Get All Slides
```
GET /api/pitch-deck/slides
Response: Array of slide objects with id, title, subtitle, content
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
Response: { name, version, total_slides, last_updated, export_formats }
```

### 5. Export PowerPoint
```
GET /api/pitch-deck/export/pptx
Response: Binary PPTX file (Content-Type: application/vnd.openxmlformats-officedocument.presentationml.presentation)
```

### 6. Export PDF
```
GET /api/pitch-deck/export/pdf
Response: Binary PDF file (Content-Type: application/pdf)
```

## Data Models

### Slide Structure
```javascript
{
  id: number,
  title: string,
  subtitle: string,
  content: {
    // Varies by slide type - see mockData.js for full structure
  }
}
```

### Company Info
```javascript
{
  name: "NeoNoble Ramp & NeoExchange",
  tagline: "Fiat-to-Crypto Routing Platform",
  platforms: [
    { name: "NeoNoble Ramp", description: "Crypto-onramp platform", website: "https://crypto-onramp-2.emergent.host" },
    { name: "NeoExchange", description: "Exchange & fintech infrastructure", website: "https://neoexchange.io" }
  ],
  email: "massimoadmin@neonoble.it"
}
```

## Frontend Integration

### API Service (`/frontend/src/services/api.js`)
- `getSlides()` - Fetch slides from backend
- `getCompanyInfo()` - Fetch company details
- `exportPPTX()` - Download PowerPoint file
- `exportPDF()` - Download PDF file

### Data Flow
1. Frontend loads with mock data initially
2. On mount, fetches live data from backend
3. Falls back to mock data if backend unavailable
4. Export buttons trigger file downloads via API

## Export Formats

### PowerPoint (.pptx)
- 10 slides matching web presentation
- NeoNoble brand colors (teal theme)
- 13.333" x 7.5" slide dimensions
- Professional fintech styling

### PDF (.pdf)
- Landscape letter format
- Structured content with headers
- Bullet points preserved
- Matching teal color scheme
