# Wildlight

A LUT studio and real-time browser photo editor for photographers. Hand-graded LUTs, cinematic color, and a quiet editor that never queues.

**Live:** [wildlight.danmarzari.com](https://wildlight.danmarzari.com)

## Stack

- Next.js 15 (App Router, standalone output)
- React 19
- Tailwind CSS 3 + custom motion
- Framer Motion for animation
- SQLite (better-sqlite3) — preset/user data
- PM2 + Caddy on Oracle Cloud (port 3011)

## Local development

```bash
npm install
npm run dev          # http://localhost:3000
npm run build && npm start
```

## Deploy

Push to `main` triggers `.github/workflows/deploy.yml`:
1. Build standalone bundle
2. Rsync to `/var/www/apps/wildlight/` on Oracle Cloud
3. PM2 restart

GitHub Actions secrets required: `DEPLOY_SSH_KEY`, `DEPLOY_HOST`, `DEPLOY_USER`.

## Layout

```
src/
  app/
    page.tsx            # Landing
    library/page.tsx    # Full LUT catalog
    studio/page.tsx     # Browser editor
  components/           # Hero, LutGrid, Studio, etc.
  lib/
    luts.ts             # LUT definitions (CSS filter chains)
    sample-images.ts    # Reference scenes
```
