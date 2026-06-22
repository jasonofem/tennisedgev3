# How TennisEdge Gets REAL Data (Step-by-step)

## Current Status
Right now your app uses **demo/mock data** (random but realistic picks).

## How to Switch to REAL Live Tennis Odds

We use **The Odds API** (best & simplest for tennis).

### Step 1: Get a Free API Key

1. Go to: https://the-odds-api.com
2. Click **"Get Free API Key"** (no credit card needed)
3. Sign up with email (takes 30 seconds)
4. Copy your API key (it looks like `abc123xyz...`)

Free tier = **500 requests per month** — more than enough for this project.

### Step 2: Add the Key to Your Project

#### Option A: Local testing
Create a file called `.env.local` in the project root:

```env
THE_ODDS_API_KEY=PASTE_YOUR_KEY_HERE
```

Then restart `npm run dev`.

#### Option B: On Vercel (Production)

1. Go to your project on Vercel
2. Click **Settings** → **Environment Variables**
3. Add new variable:
   - **Name**: `THE_ODDS_API_KEY`
   - **Value**: paste your key
4. Select **Production** + **Preview** + **Development**
5. Click **Save**
6. Go to **Deployments** tab → click the **...** on latest deployment → **Redeploy**

### Step 3: Test It

After adding the key:
- Refresh the dashboard
- You will now see **"LIVE DATA"** badge (green)
- Picks will be based on **real bookmaker odds** from The Odds API

---

## Alternative APIs (if you want more options)

| API              | Free Tier          | Best For                     | Link                              |
|------------------|--------------------|------------------------------|-----------------------------------|
| **The Odds API** | 500 req/mo         | Easiest + reliable           | https://the-odds-api.com          |
| **OddsPapi**     | 250 req/mo         | Best tennis coverage         | https://oddspapi.io               |
| **API-Tennis**   | Free tier          | Very detailed player stats   | https://rapidapi.com (Tennis API) |

The Odds API is the easiest to start with.

---

## What the API Actually Gives Us

- Real decimal odds from many bookmakers (Bet365, Pinnacle, etc.)
- Live + upcoming ATP/WTA matches
- We pick the **underdog** (higher odds)
- Then we add our own **value + confidence** scoring on top

Want me to:
- Switch to OddsPapi instead?
- Add more markets (sets, totals, etc)?
- Show you how to add your own prediction model?

Just say the word.