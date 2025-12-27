# NeoNoble Ramp

A production-ready crypto on/off-ramp platform for NENO tokens on Binance Smart Chain (BSC).

## 🚀 Features

- **Business API Keys System**: Secure HMAC-authenticated partner APIs for developers
- **Dev Portal**: Self-service API key management and documentation
- **User-Facing Ramp UI**: Simple interface for buying and selling NENO
- **Fixed Pricing**: 1 NENO = €10,000 with 1% transaction fee
- **Dual Authentication**: HMAC for business APIs, JWT for user sessions
- **Complete API Suite**: Both business and UI endpoints
- **Production-Ready**: Docker support, PostgreSQL database, comprehensive logging

## 📋 Prerequisites

- Node.js 18+ and Yarn
- PostgreSQL 15+
- Docker (optional, for database)

## 🏗️ Project Structure

```
/app
├── app/
│   ├── api/                    # API routes
│   │   ├── dev/               # Developer portal APIs
│   │   │   ├── register/      # Dev registration
│   │   │   ├── login/         # Dev authentication
│   │   │   └── api-keys/      # API key management
│   │   ├── admin/             # Admin APIs
│   │   │   └── api-clients/   # Admin API client management
│   │   ├── ramp-api-*/        # Business APIs (HMAC-protected)
│   │   └── ui-ramp-*/         # UI APIs (JWT-protected)
│   ├── dev/                   # Developer portal pages
│   │   ├── login/
│   │   ├── dashboard/
│   │   ├── api-keys/
│   │   └── docs/
│   ├── ramp/                  # User ramp pages
│   │   ├── neno-buy/
│   │   └── neno-sell/
│   └── auth/                  # User authentication
├── lib/
│   ├── prisma.js              # Prisma client
│   ├── middleware/            # Auth middlewares
│   ├── services/              # Business logic
│   └── utils/                 # Utilities (HMAC, JWT, API keys)
├── prisma/
│   └── schema.prisma          # Database schema
├── config/
│   └── tokens.js              # Token configuration (NENO)
├── scripts/
│   └── initDatabase.js        # Database initialization
├── docker-compose.yml          # PostgreSQL container
├── Dockerfile                  # Production build
└── README.md
```

## 🛠️ Installation & Setup

### 1. Clone and Install Dependencies

```bash
cd /app
yarn install
```

### 2. Start PostgreSQL Database

**Option A: Using Docker (Recommended)**

```bash
docker compose up -d
```

**Option B: Local PostgreSQL**

Install PostgreSQL 15+ and create a database:

```bash
createdb neonoble_ramp
```

### 3. Configure Environment Variables

Copy the example environment file:

```bash
cp .env.example .env
```

Edit `.env` and configure:

```env
# Database
DATABASE_URL="postgresql://neonoble:neonoble123@localhost:5432/neonoble_ramp?schema=public"

# JWT Secret (generate with: openssl rand -hex 32)
JWT_SECRET="your-super-secret-jwt-key-here-change-in-production"

# Application
NODE_ENV="development"
PORT=3000

# Base URL
NEXT_PUBLIC_BASE_URL="http://localhost:3000"

# For production:
# NEXT_PUBLIC_BASE_URL="https://neonoble.it"
```

### 4. Initialize Database

Generate Prisma client:

```bash
npx prisma generate
```

Run migrations:

```bash
npx prisma migrate dev --name init
```

Initialize platform_internal API client:

```bash
node scripts/initDatabase.js
```

This will:
- Create necessary database tables
- Generate `platform_internal` API client (for UI endpoints)
- Update `.env` with platform credentials

### 5. Start Development Server

```bash
yarn dev
```

The application will be available at:
- Dev Portal: http://localhost:3000/dev/login
- User Ramp: http://localhost:3000/ramp
- User Auth: http://localhost:3000/auth

## 🔑 NENO Token Configuration

The fixed pricing model for NENO is configured in `config/tokens.js`:

```javascript
{
  symbol: 'NENO',
  defaultChain: 'BSC',
  decimals: 18,
  fixedPriceEur: 10000,  // 1 NENO = €10,000
}
```

**Transaction Fee**: 1% of the fiat amount

## 🔐 Authentication

### Developer Portal (HMAC Authentication)

Business API endpoints require HMAC-SHA256 authentication:

**Required Headers:**
- `X-API-KEY`: Your API key
- `X-TIMESTAMP`: Current Unix timestamp in milliseconds
- `X-SIGNATURE`: HMAC-SHA256(apiSecret, timestamp + bodyJSON)
- `Content-Type`: application/json

**Signature Calculation (JavaScript):**

```javascript
const timestamp = Date.now().toString();
const bodyJson = JSON.stringify(requestBody);
const message = timestamp + bodyJson;
const signature = CryptoJS.HmacSHA256(message, apiSecret).toString();
```

### User Portal (JWT Authentication)

User endpoints use JWT tokens stored in cookies or Authorization header.

## 📡 API Endpoints

### Business APIs (HMAC-protected)

Base URL: `https://neonoble.it` (production) or `http://localhost:3000` (development)

#### POST /api/ramp-api-onramp-quote
Get a quote for buying tokens with fiat.

```json
// Request
{
  "fromFiat": "EUR",
  "toToken": "NENO",
  "chain": "BSC",
  "amountFiat": 10000
}

// Response (1 NENO = €10,000)
{
  "amountFiat": 10000,
  "estimatedTokens": 1,
  "rate": 10000,
  "feeBase": 100,
  "token": "NENO",
  "chain": "BSC"
}
```

#### POST /api/ramp-api-onramp
Create an onramp session (buy tokens).

```json
// Request
{
  "fromFiat": "EUR",
  "toToken": "NENO",
  "chain": "BSC",
  "amountFiat": 10000,
  "userWallet": "0x1234..."
}

// Response
{
  "sessionId": "NRAMP_1234567890_abc123",
  "status": "PENDING",
  "checkoutUrl": "https://neonoble.it/ramp/checkout/NRAMP_...",
  "details": { ... }
}
```

#### POST /api/ramp-api-offramp-quote
Get a quote for selling tokens for fiat.

```json
// Request
{
  "token": "NENO",
  "chain": "BSC",
  "tokens": 1
}

// Response
{
  "tokens": 1,
  "amountFiat": 10000,
  "rate": 10000,
  "feeBase": 100
}
```

#### POST /api/ramp-api-offramp
Create an offramp session (sell tokens).

```json
// Request
{
  "token": "NENO",
  "chain": "BSC",
  "tokens": 1,
  "userWallet": "0x1234...",
  "payoutDestination": "DE89370400440532013000"
}

// Response
{
  "sessionId": "NRAMP_1234567890_xyz789",
  "status": "PENDING",
  "checkoutUrl": "https://neonoble.it/ramp/checkout/NRAMP_...",
  "details": { ... }
}
```

### User UI APIs (JWT-protected)

- POST `/api/ui-ramp-onramp-quote` - Get onramp quote for logged-in users
- POST `/api/ui-ramp-onramp` - Create onramp session for logged-in users
- POST `/api/ui-ramp-offramp-quote` - Get offramp quote for logged-in users
- POST `/api/ui-ramp-offramp` - Create offramp session for logged-in users

These endpoints use the internal `platform_internal` API client automatically.

### Developer Portal APIs

- POST `/api/dev/register` - Register a developer account
- POST `/api/dev/login` - Login to dev portal
- GET `/api/dev/api-keys` - List API keys
- POST `/api/dev/api-keys` - Create new API key

### Admin APIs

- GET `/api/admin/api-clients` - List all API clients (paginated)
- POST `/api/admin/api-clients` - Create API client for a user

## 🧪 Testing with Postman

### Step 1: Create Environment Variables

In Postman, create these variables:
- `API_KEY`: Your API key from Dev Portal
- `API_SECRET`: Your API secret
- `BASE_URL`: `https://neonoble.it` or `http://localhost:3000`

### Step 2: Pre-request Script

Add this to your request's Pre-request Script tab:

```javascript
const timestamp = Date.now().toString();
pm.environment.set("TIMESTAMP", timestamp);

const bodyJson = pm.request.body.raw || "{}";
const message = timestamp + bodyJson;
const signature = CryptoJS.HmacSHA256(
  message,
  pm.environment.get("API_SECRET")
).toString();

pm.environment.set("SIGNATURE", signature);
```

### Step 3: Headers

Add these headers:
- `Content-Type`: `application/json`
- `X-API-KEY`: `{{API_KEY}}`
- `X-TIMESTAMP`: `{{TIMESTAMP}}`
- `X-SIGNATURE`: `{{SIGNATURE}}`

### Example Request

**URL**: `POST {{BASE_URL}}/api/ramp-api-onramp-quote`

**Body**:
```json
{
  "fromFiat": "EUR",
  "toToken": "NENO",
  "chain": "BSC",
  "amountFiat": 10000
}
```

**Expected Response** (1 NENO = €10,000):
```json
{
  "amountFiat": 10000,
  "estimatedTokens": 1,
  "rate": 10000,
  "feeBase": 100,
  "token": "NENO",
  "chain": "BSC"
}
```

## 🐳 Docker Deployment

### Build Docker Image

```bash
docker build -t neonoble-ramp .
```

### Run with Docker Compose

Create a production `docker-compose.prod.yml`:

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_USER: neonoble
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
      POSTGRES_DB: neonoble_ramp
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - neonoble-net

  app:
    image: neonoble-ramp
    depends_on:
      - postgres
    environment:
      DATABASE_URL: postgresql://neonoble:${POSTGRES_PASSWORD}@postgres:5432/neonoble_ramp
      JWT_SECRET: ${JWT_SECRET}
      NEXT_PUBLIC_BASE_URL: https://neonoble.it
    ports:
      - "3000:3000"
    networks:
      - neonoble-net

volumes:
  postgres_data:

networks:
  neonoble-net:
```

Run:

```bash
docker-compose -f docker-compose.prod.yml up -d
```

## 🚀 Production Deployment

### 1. Environment Configuration

For production at `https://neonoble.it`:

```env
DATABASE_URL="postgresql://user:pass@host:5432/neonoble_ramp"
JWT_SECRET="generated-with-openssl-rand-hex-32"
NODE_ENV="production"
NEXT_PUBLIC_BASE_URL="https://neonoble.it"
```

### 2. Build for Production

```bash
yarn build
```

### 3. Start Production Server

```bash
yarn start
```

### 4. Database Migrations

Run migrations in production:

```bash
npx prisma migrate deploy
```

### 5. Initialize Platform Client

```bash
node scripts/initDatabase.js
```

### 6. DNS Configuration

Point your domain to the server:
- A record: `neonoble.it` → Server IP
- Configure SSL/TLS certificate (Let's Encrypt recommended)
- Use reverse proxy (nginx/Caddy) for SSL termination

### Recommended nginx Configuration

```nginx
server {
    listen 80;
    server_name neonoble.it;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name neonoble.it;

    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## 📊 Database Schema

### User
- id, email, passwordHash, role (USER/ADMIN)

### ApiClient
- id, ownerId, name, apiKey, apiSecret, status, rateLimitDay, totalCalls, totalFeeBase

### ApiCallLog
- id, apiClientId, endpoint, method, statusCode, createdAt

### RampSession
- id, apiClientId, type (ONRAMP/OFFRAMP), tokenSymbol, chain, amountFiat, tokens, feeBase, status, checkoutUrl, userWallet, payoutDestination

## 🔧 Prisma Commands

```bash
# Generate Prisma client
npx prisma generate

# Create migration
npx prisma migrate dev --name migration_name

# Deploy migrations (production)
npx prisma migrate deploy

# Open Prisma Studio (database GUI)
npx prisma studio

# Reset database (WARNING: deletes all data)
npx prisma migrate reset
```

## 📝 Payment Flow (MOCKED for MVP)

Currently, payment processing is MOCKED for MVP purposes:

1. User creates onramp/offramp session
2. Session is stored in database with status PENDING
3. Success page is shown immediately
4. In production, you would:
   - Redirect to payment provider (Stripe, PayPal, etc.)
   - Handle webhooks for payment confirmation
   - Update session status to COMPLETED or FAILED
   - Trigger blockchain transactions for token transfer

## 🎯 Next Steps for Production

1. **Payment Integration**: Integrate Stripe/PayPal for actual payments
2. **Blockchain Integration**: Connect to BSC for token transfers
3. **KYC/AML**: Add identity verification
4. **Rate Limiting**: Implement API rate limiting
5. **Monitoring**: Add logging and monitoring (Sentry, DataDog)
6. **Testing**: Add comprehensive test suite
7. **Security Audit**: Conduct security review

## 📞 Support

For questions or issues:
- Dev Portal Documentation: http://localhost:3000/dev/docs
- Email: support@neonoble.it

## 📄 License

Proprietary - All rights reserved

---

**NeoNoble Ramp v1.0.0** - Production-ready crypto on/off-ramp platform
