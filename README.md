# TennisEdge v3

Professional tennis betting intelligence platform.

**Strict rule:** Maximum 3 high-value underdog picks per day.

## Features

- Real-time odds from The Odds API (currently Wimbledon)
- Advanced EV calculation (only shows profitable +EV picks)
- Hacker / terminal aesthetic
- Fully active bet journal with P/L tracking
- Discipline enforced: exactly 3 bets max

## Tech

- Next.js 16 + TypeScript
- Live odds integration (The Odds API)
- Local journal (localStorage)

## Getting Real Data

1. Get free key from https://the-odds-api.com
2. Add env var `THE_ODDS_API_KEY=yourkey`
3. Redeploy

## Deploy

This is ready to be deployed as a brand new project called **TennisEdge v3**.

## Local

```bash
npm install
npm run dev
```

Login with any email/password (demo).

## Philosophy

Discipline > Volume. Only the best 3 edges are shown every day.

---

Built for serious bettors who want precision.
