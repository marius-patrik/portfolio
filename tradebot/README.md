# TradeBot 📈

CFD trading bot for **IG Markets** with React dashboard and TradingView charts.

## Quick Start

```bash
npm install
npm run dev          # Client + Server
npm run dev:client   # http://localhost:3000
npm run dev:server   # http://localhost:3001
```

## Project Structure

```
TradeBot/
├── src/
│   ├── client/           # React frontend
│   └── server/           # Express backend
│       └── services/ig.ts  # IG API client
├── .env                  # API configuration
└── package.json
```

## Environment Variables

```env
PORT=3001
JWT_SECRET=your-secret
IG_DEMO_URL=https://demo-api.ig.com/gateway/deal
IG_LIVE_URL=https://api.ig.com/gateway/deal
IG_ENV=demo
```

## IG Markets Setup

1. Create account at [ig.com](https://www.ig.com)
2. Go to **My IG → Settings → API**
3. Generate API key
4. Enter credentials in Settings page

## Tech Stack

- **Frontend**: React 19, Rsbuild, Tailwind v4, TradingView Charts
- **Backend**: Express, Kysely, JWT
- **Broker**: IG Markets CFD (indices, commodities)
