# TENNIS EDGE v3 - Vercel + GitHub Deployment Guide (Windows)

This guide is for Windows users using Command Prompt.

Target folder: `C:\Users\Deredz\Desktop\Deredz\tennisedgev3`

---

## STEP 1: Create the Project Folder on Your PC

Open **Command Prompt** (cmd) as normal user.

Run these commands one by one:

```cmd
cd C:\Users\Deredz\Desktop\Deredz
mkdir tennisedgev3
cd tennisedgev3
```

---

## STEP 2: Initialize a Next.js Project

```cmd
npx create-next-app@latest . --yes
```

This will create the basic Next.js files.

---

## STEP 3: Replace the Project Files

You now need to replace the files with the TennisEdge v3 code.

### Option A (Recommended): Copy files manually (easiest)

I will give you the content of each important file below.

Create/replace these files:

1. Delete the default `app/page.tsx`, `app/layout.tsx`, etc. and paste the new ones.

---

## STEP 4: Install Dependencies (if needed)

```cmd
npm install
```

---

## STEP 5: Create .env.local file

Create a file called `.env.local` in the root folder with this content:

```
THE_ODDS_API_KEY=d19c09ed2af504917dc8cca7ccfc7774
```

---

## STEP 6: Push to GitHub (from Command Prompt)

### 6.1 Initialize Git

```cmd
git init
```

### 6.2 Add files and commit

```cmd
git add .
git commit -m "Initial commit - TennisEdge v3"
```

### 6.3 Create a new repository on GitHub (do this in browser)

1. Go to https://github.com
2. Click the **+** icon (top right) → **New repository**
3. Name it: `tennisedgev3`
4. **DO NOT** check "Add a README file"
5. Click **Create repository**

### 6.4 Connect and Push (replace YOUR_USERNAME)

```cmd
git remote add origin https://github.com/YOUR_USERNAME/tennisedgev3.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

---

## STEP 7: Deploy to Vercel

### 7.1 Go to Vercel

1. Go to https://vercel.com
2. Sign in with GitHub (recommended)

### 7.2 Import Project

1. Click **Add New Project**
2. Click **Import Git Repository**
3. Find `tennisedgev3` and click **Import**

### 7.3 Add Environment Variable

Before clicking Deploy:

- Click **Environment Variables**
- Add this:
  - **Name**: `THE_ODDS_API_KEY`
  - **Value**: `d19c09ed2af504917dc8cca7ccfc7774`
- Click **Add**
- Make sure it's selected for **Production**, **Preview**, and **Development**

### 7.4 Deploy

Click **Deploy**

Wait 1-2 minutes.

---

## STEP 8: After Deployment

- Click the link Vercel gives you
- Test:
  1. Go to `/login`
  2. Login with any email + password
  3. You should see **LIVE DATA** and 3 real picks

---

## Full List of Files You Need to Replace

Here are the files you must create/replace:

- `app/page.tsx`
- `app/layout.tsx`
- `app/globals.css`
- `app/login/page.tsx`
- `app/dashboard/page.tsx`
- `app/api/picks/route.ts`
- `package.json` (optional - update name)
- `.env.local` (create this)
- `vercel.json` (create this)

I will provide the full content for each file in the next messages if you ask.

---

## Quick Commands Summary (after you have the files)

```cmd
cd C:\Users\Deredz\Desktop\Deredz\tennisedgev3

git add .
git commit -m "TennisEdge v3 ready"
git push
```

Then redeploy on Vercel if needed.

---

You are ready to launch as **TennisEdge v3**.

Would you like me to give you the **full content** of all the important files right now so you can copy-paste them into your folder?
