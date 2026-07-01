# Spark — CIBC AI Adoption Prototype

Clickable HTML prototype for an MSc capstone. Demonstrates an employee-centric AI adoption system: Landing, Pledge, Workflows, Explore, Trust Center, and My Profile.

**This is not a real product.** All AI outputs, confidence indicators, chatbot answers, and Director rulings are mocked.

## Run locally

No build step. Serve the folder with any static file server, then open in a browser:

```bash
cd "Spark - CIBC"
python3 -m http.server 8765
```

Open [http://localhost:8765/login.html](http://localhost:8765/login.html)

**Classic Landing (pre–UI v2):** [index-classic.html](http://localhost:8765/index-classic.html)

## Demo login

| Email | Role |
|---|---|
| `sarah.chen@cibc.com` | Employee (Reconciliation Analyst) |
| `david.kim@cibc.com` | Manager (Operational Team Manager) |

Password field is decorative — any non-empty value works.

## Demo path (≈6 min)

1. **Login** as Sarah → **Landing** → **Pledge** (enterprise + department)
2. **Workflows** → run a task → verify output → **Submit as a case**
3. **Explore** → Peer Cases → case detail (upvote, comment)
4. **Trust Center** → chatbot or Boundaries
5. **Profile** (avatar) → progression, wins, calendar → **Log out**

Log in as David to see manager-only pledge edit and manager-badged comments.

## Project docs

| File | Purpose |
|---|---|
| `SPEC.md` | Engineering spec, file structure, progress tracker |
| `DESIGN_LOGIC.md` | Product rationale and demo script |
| `DESIGN_SYSTEM.md` | Colors, typography, components |
| `.cursorrules` | Rules for AI-assisted development |

## Tech stack

HTML5 · Tailwind CSS (CDN) · Vanilla JavaScript · `localStorage` (`spark_runtime`) · Inter (Google Fonts)

## Data

- Seeded mock data: `js/data.js` (`SPARK_DATA`)
- Runtime overrides (cases, comments, pledges, etc.): `localStorage` key `spark_runtime`
- Always read merged data via `getMergedData()` in `js/storage.js`

To reset demo state, clear site data for localhost in browser DevTools → Application → Local Storage.
