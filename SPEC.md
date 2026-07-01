# Spark — Project Spec

> **Purpose of this document:** The single entry point for anyone (human or AI) opening this project for the first time. It tells you what the project is, what documents to read, what the tech decisions are, where everything lives, and what's been built so far.
>
> **If you are Cursor and a new chat is starting:** Read this file first, then `.cursorrules`, then jump to the document referenced in the task at hand. Do NOT re-read everything every turn — use the index in Section 2.

---

## 1. What This Project Is (60 seconds)

**Spark** is a clickable HTML prototype for an MSc capstone delivered to CIBC. It demonstrates an employee-centric AI adoption system with 6 surfaces: Landing, Pledge, Workflows, Explore, Trust Center, My Profile — plus a Login page.

- **Not a real product.** All AI outputs, Confidence Indicators, chatbot answers, and Director rulings are mocked.
- **Not a SPA.** It's a static multi-page site you can click through like a real website.
- **Two demo personas:** Sarah (employee) and David (manager). Login decides which journey loads.
- **Goal:** Be demo-ready as a clickable prototype. Walk a viewer from login → through both journeys → back out, with every key cross-surface connection working.

---

## 2. Document Index (Read in this order when you need to)

| File | What it contains | When to read it |
|---|---|---|
| **`SPEC.md`** (this file) | Engineering decisions, file structure, mock-data convention, progress tracker | **Always first.** Especially at the start of a new chat. |
| **`.cursorrules`** | Behaviour rules for Cursor: what to do, what NOT to do, coding conventions | Second. Defines how to work in this repo. |
| **`DESIGN_LOGIC.md`** | *Why* the product is designed this way. User journeys. Demo script. Per-module specs. | When implementing any module — read the relevant Section 4.x for that module. |
| **`DESIGN_SYSTEM.md`** | *What it looks like.* Colors, typography, spacing, components. | When styling any page or building any component. |

**Conflict resolution order (highest authority wins):**
1. `DESIGN_LOGIC.md` (product truth)
2. `DESIGN_SYSTEM.md` (visual truth)
3. `SPEC.md` (engineering truth)
4. `.cursorrules` (work rules)

If `DESIGN_SYSTEM` and `DESIGN_LOGIC` ever disagree, **Logic wins** — visuals serve the logic.

---

## 3. Tech Stack (Locked)

- **HTML5** — one file per page.
- **Tailwind CSS via CDN** — `<script src="https://cdn.tailwindcss.com"></script>` in every page's `<head>`. No build step, no PostCSS, no Tailwind config file beyond an inline `tailwind.config = {...}` block for custom colors.
- **Vanilla JavaScript** — no React, Vue, Alpine, jQuery, or any framework.
- **localStorage** — for all session-persistent demo data (Peer Cases submitted, pledges edited, comments, upvotes, current user, POD joins).
- **Google Fonts CDN** — Inter font family.

**Do NOT introduce:**
- npm, package.json, node_modules, Vite, Webpack, or any build tooling.
- Any external JS library beyond Tailwind CDN.
- Any backend, API call, or fetch to an external service.
- Routing libraries — multi-page navigation is plain `<a href="page.html">`.

---

## 4. File Structure

```
spark-prototype/
├── README.md                    Project intro for humans opening the folder
├── SPEC.md                      This file
├── DESIGN_LOGIC.md              Product design doc
├── DESIGN_SYSTEM.md             Visual design doc
├── .cursorrules                 Cursor behaviour rules
│
├── index.html                   Landing (/) — UI v2 sphere layout
├── index-classic.html           Landing v1 archive (rollback)
├── index-v2.html                Redirect → index.html
├── login.html                   /login
├── pledge.html                  /pledge
├── pledge-edit.html             /pledge/edit  (manager only)
├── workflows.html               /workflows  (hub: pick role + task)
├── workflow-detail.html         /workflows/[id]  (use ?id=xxx query param)
├── workflow-submit.html         /workflows/[id]/submit  (Submit as a case form)
├── explore.html                 /explore  (hub: 4 sub-module cards)
├── peer-cases.html              /explore/peer-cases  (list + Prompts toggle)
├── case-detail.html             /explore/cases/[id]  (use ?id=xxx)
├── ideas-lab.html               /explore/ideas
├── skill-lab.html               /explore/skill        (static placeholder, no real interaction)
├── learning-partners.html       /explore/pods         (static placeholder, no real interaction)
├── trust-center.html            /trust-center
├── profile.html                 /profile
│
├── css/
│   ├── tokens.css               CSS variables + shared chrome
│   ├── landing-v2.css           Landing sphere layout
│   └── ui-v2.css                Module page v2 polish
│
├── js/
│   ├── data.js                  All seeded mock data (single source of truth)
│   ├── auth.js                  Login, logout, getCurrentUser()
│   ├── storage.js               localStorage wrapper (read/write/merge with seeded data)
│   └── components.js            renderNav(), renderFooter(), and other shared partials
│
└── assets/
    └── logo.svg                 Spark logo (sparkle icon + wordmark)
```

**Naming conventions:**
- HTML files: `kebab-case.html`
- JS files: `kebab-case.js`
- CSS variables: `--kebab-case`
- JS functions: `camelCase`
- JS constants holding seeded data: `UPPER_SNAKE_CASE` (e.g., `SPARK_DATA`)

**Pages that take a query param** (`workflow-detail.html`, `case-detail.html`):
- Read `?id=xxx` from `window.location.search`.
- Look up the item in `SPARK_DATA` (or merged data with localStorage).
- Render. If `id` is missing or invalid, show a polite empty state and a link back to the hub.

---

## 5. Data Model & Storage Convention

### 5.1 Two layers of data

**Layer 1 — Seeded data (`js/data.js`):**
Static, hand-authored, never changes at runtime. This is the "Pre-demo state" from Design Logic Section 6.0.

**Layer 2 — Runtime data (localStorage, key `spark_runtime`):**
Anything the user creates or modifies during a demo session. Persists across page navigations and page reloads.

### 5.2 What goes where

| Data | Seeded (`data.js`) | Runtime (`localStorage`) |
|---|---|---|
| Users (Sarah, David) | ✅ | — |
| Enterprise pledge | ✅ | — |
| Department pledges (initial) | ✅ | ✅ (manager edits overwrite) |
| Workflows (definitions) | ✅ | — |
| Peer Cases (5 pre-seeded) | ✅ | ✅ (new submissions appended) |
| Comments on Peer Cases | ✅ (1 pre-seeded) | ✅ (new comments appended) |
| Upvotes | ✅ (initial counts) | ✅ (deltas merged) |
| Ideas Lab (3 pre-seeded) | ✅ | — (Ideas Lab is "click in to look" only) |
| PODs | ✅ | — |
| Director rulings | ✅ | — |
| FAQ, Boundaries | ✅ | — |
| Current logged-in user | — | ✅ (`spark_runtime.currentUser`) |
| **Skill Lab activity** | — | **NEVER stored** (by design — see Logic 4.4.5) |

### 5.3 Seeded data shape (in `data.js`)

```js
const SPARK_DATA = {
  users: {
    'sarah.chen@cibc.com': {
      name: 'Sarah Chen',
      role: 'employee',
      title: 'Reconciliation Analyst',
      department: 'Operational',
      avatarInitials: 'SC',
      progressionStage: 'daily-user',   // 'beginner' | 'daily-user' | 'ai-expert' | 'ai-champion'
      wins: { timeSavedMinutes: 260, tasksCompleted: 12, promptsContributed: 3, ideasPosted: 0, dayStreak: 5 }
    },
    'david.kim@cibc.com': {
      name: 'David Kim',
      role: 'manager',
      title: 'Operational Team Manager',
      department: 'Operational',
      avatarInitials: 'DK',
      progressionStage: 'ai-champion',
      wins: { /* ... */ }
    }
  },
  pledges: {
    enterprise: {
      text: '...',
      lastUpdated: '2026-05-01'
    },
    departments: {
      Operational: {
        manager: 'David Kim',
        managerTitle: 'Operational Team Manager',
        text: '...',
        encouragedTasks: ['Discrepancy explanation', 'Email summarization'],
        checkFirstTasks: ['Approval drafting on >$100k items'],
        lastUpdated: '2026-06-15'
      },
      Risk: null,         // triggers "not yet published" empty state
      Finance: null,
      Technology: null
    }
  },
  workflows: [
    { id: 'discrepancy-explanation', family: 'reconciliation', name: 'Discrepancy Explanation',
      mockConfidence: 'medium', /* prompt, sample input, mock output, checklist items */ },
    { id: 'audit-summary',           family: 'reconciliation', name: 'Audit Pattern Summary',
      mockConfidence: 'high',   /* ... */ },
    { id: 'approval-email',          family: 'email-approval', name: 'Approval Email Draft',
      mockConfidence: 'low',    /* ... */ }
    // 2-3 more as needed
  ],
  peerCases: [ /* 5 cases */ ],
  ideas:     [ /* 3 ideas */ ],
  pods:      [ /* 1 active POD */ ],
  rulings:   [ /* 2 director rulings */ ],
  faq:       [ /* ~5 items */ ],
  boundaries:[ /* task allow/disallow rows */ ],
  events:    [ /* calendar items for profile */ ]
};
```

### 5.4 Runtime data shape (localStorage `spark_runtime`)

```js
{
  currentUser: 'sarah.chen@cibc.com' | 'david.kim@cibc.com' | null,
  pledgeOverrides: {
    Operational: { text: '...', encouragedTasks: [...], checkFirstTasks: [...], lastUpdated: '...' }
  },
  newPeerCases: [ /* cases created during demo */ ],
  newComments: { [caseId]: [ /* comments */ ] },
  upvoteDeltas: { [caseId]: +1, [ideaId]: +1 },
  upvotedCases: [ /* case ids the current user has upvoted */ ],
  joinedPods: ['pod-id-1']
}
```

### 5.5 Reading data — always go through the merger

`storage.js` exposes a single function `getMergedData()` that returns seeded data with runtime overrides applied. **All pages must read data through this function, never directly from `SPARK_DATA`.** This guarantees that a case Sarah submits in one page is visible everywhere else.

---

## 6. Authentication & Routing

### 6.1 Login flow

- `login.html` shows a realistic CIBC-styled login form: email + password fields, login button.
- Two valid emails: `sarah.chen@cibc.com` and `david.kim@cibc.com`. **Password field is decorative** — any non-empty value passes (this is a prototype).
- Invalid email → inline error: "Email not recognized. Try `sarah.chen@cibc.com` or `david.kim@cibc.com`."
- On success: write `currentUser` to localStorage, redirect to `index.html`.
- Below the login button, a small helper line: *"For demo: try `sarah.chen@cibc.com` or `david.kim@cibc.com` (any password)."*

### 6.2 Auth guard

Every page except `login.html` must check at the top of its inline `<script>`:
```js
const user = getCurrentUser();
if (!user) { window.location.href = 'login.html'; }
```

### 6.3 Logout

- Logout button lives **only** on `profile.html` (Design Logic decision).
- On click: clear `currentUser` from localStorage → redirect to `login.html`.
- **Do NOT** add logout to the top nav or anywhere else.

### 6.4 Role-conditional UI

The only places role matters (per Design Logic 3.5.3):

1. **Landing Pledge card CTA**: employee sees "View your team's pledge"; manager sees "View or edit your team's pledge".
2. **Pledge page**: manager sees "Edit this pledge" button on their own department only.
3. **Peer Cases comments**: manager comments render with a Manager badge.

Everything else is identical for both roles.

---

## 7. Mock Behaviour Conventions

These small touches make the prototype feel real. **Don't skip them.**

- **"Run with AI" button**: on click, show a 1-second loading spinner, then reveal the mock output. Don't render instantly — it kills the illusion.
- **Confidence Indicator mapping**:
  - `discrepancy-explanation` → 🟡 Medium (per Demo Journey 6.4)
  - `audit-summary` → 🟢 High
  - `approval-email` → 🔴 Low
- **Low-confidence guard**: on a Low workflow, the "Mark as verified" button stays disabled until the user has modified the output text (compare initial vs current `<textarea>` value).
- **Verification checklist length**: High = 2 items, Medium = 4 items, Low = 5+ items including a mandatory edit step (Logic 4.3.3).
- **Submission confirmation**: after "Submit as a case," show a confirmation screen with two CTAs (`View my case` / `Return to Workflows`). Don't auto-redirect.
- **Chatbot**: hardcode answers to the 4 demo questions listed in Logic 4.5.3.1. Any other input → fallback answer with an "Ask the Director instead" button.
- **Skill Lab & Learning Partners**: these are **look-only** pages. Show the hub view with cards, but no exercise or POD detail is interactive. Cards can have a hover state but clicking does nothing (or shows a polite "Coming soon in v2" toast — your call, keep it consistent).

---

## 8. The Eleven Sanctioned Cross-Surface Links

Per Design Logic 3.6, these are the **only** sanctioned navigations between surfaces. Every `<a href>` in the project must trace back to one of these (plus the obvious in-page links within a single surface).

1. Landing → Pledge (Pledge card)
2. Landing → Workflows / Explore / Trust Center (three module cards)
3. Landing → Trust Center (bottom hint bar)
4. Top nav → Home / Trust Center / Explore / Workflows (every non-landing page)
5. Top nav avatar → My Profile
6. Pledge → Pledge Edit (manager only, own department only)
7. Workflow boundary recap → Trust Center Boundaries
8. Workflow completion → Explore Peer Cases submission
9. Peer Case detail → Workflow detail (prompt pre-loaded via `?prompt=...` query)
10. Prompts view → Workflow detail (prompt pre-loaded)
11. Trust Center chatbot → Director contact form

**In-page secondary link (implemented, documented in Known Issues):** Pledge page footer pointer → Trust Center (`DESIGN_LOGIC` §4.2.3). Not counted in the canonical eleven above.

Plus: My Profile calendar entries (display-only — no real link).
Plus: Login → Landing (after auth).
Plus: Profile → Login (logout).

---

## 9. Development Order (Build Plan)

Build in this order. Each phase is shippable on its own.

### Phase 1 — Skeleton (priority 1, do first)
Goal: every page exists, every navigation link works, nothing breaks.
- [x] All 14 HTML files created with: top nav (or login chrome), page title, one paragraph placeholder, links to next page. *(15 files incl. `login.html`.)*
- [x] `css/tokens.css` with color/font/spacing variables.
- [x] `js/data.js` with skeleton structure (objects/arrays may be empty). *(Seeded with 2 users, pledges, 3 workflows, 5 peer cases, ideas/pods/rulings/faq/boundaries/events.)*
- [x] `js/auth.js`, `js/storage.js`, `js/components.js` with minimum viable functions.
- [x] Login → Landing → click every nav link → confirm no 404s.

### Phase 2 — Content & Styling
Per-page, in this priority order (matches demo importance):
- [x] Login page
- [x] Landing
- [x] Pledge (+ Pledge Edit)
- [x] Workflows hub + Workflow detail (with all 3 confidence states)
- [x] Workflow Submit
- [x] Explore hub
- [x] Peer Cases list + Case Detail
- [x] Trust Center
- [x] My Profile
- [x] Ideas Lab (static)
- [x] Skill Lab (static)
- [x] Learning Partners (static)

### Phase 3 — Interactivity
- [x] localStorage merger working end-to-end (submit case → see it in Peer Cases list)
- [x] Comment submission (employee + manager-badged)
- [x] Upvote increments and persists
- [x] Pledge edit saves and reflects on Pledge page
- [x] Confidence-conditional checklist length & low-conf edit guard
- [x] Chatbot mock responses
- [x] All eleven cross-surface links wired with correct query params

### Phase 4 — Polish
- [x] Loading spinner on "Run with AI"
- [x] Hover states on all clickable cards
- [x] Empty states (per Demo Journey 6.x state specs)
- [x] Toast / confirmation banners
- [x] Manager badge styling
- [x] Final pass on copy, spacing, alignment

---

## 10. Progress Tracker (Update as you go)

> **Cursor: when you complete an item, update this section by checking the box. When a new chat opens, this is the first thing to scan to know where the project is.**

> **Status (2026-07-01):** **全部内容与功能已完成，当前进入 UI Polish 阶段。** All surfaces are built, wired, and demo-verified. Active work is visual refinement only (UI v2 rollout, per-page polish, consistency pass). Do not change feature logic, data schemas, or cross-surface links without owner approval.

### Module completion *(content + functionality)*

- [x] Login
- [x] Landing (`index.html` — UI v2 sphere layout; classic archived at `index-classic.html`)
- [x] Pledge
- [x] Pledge Edit
- [x] Workflows hub
- [x] Workflow detail *(all 3 confidence states)*
- [x] Workflow submit
- [x] Explore hub
- [x] Peer Cases *(Cases + Prompts views)*
- [x] Case Detail
- [x] Trust Center
- [x] My Profile
- [x] Ideas Lab *(static)*
- [x] Skill Lab *(static)*
- [x] Learning Partners *(static)*

### Setup
- [x] Folder created, all 4 docs in place
- [x] `.cursorrules` in place

### Phase 1 — Skeleton
- [x] `index.html` (Landing)
- [x] `login.html`
- [x] `pledge.html`
- [x] `pledge-edit.html`
- [x] `workflows.html`
- [x] `workflow-detail.html`
- [x] `workflow-submit.html`
- [x] `explore.html`
- [x] `peer-cases.html`
- [x] `case-detail.html`
- [x] `ideas-lab.html`
- [x] `skill-lab.html`
- [x] `learning-partners.html`
- [x] `trust-center.html`
- [x] `profile.html`
- [x] `css/tokens.css`
- [x] `js/data.js` (skeleton)
- [x] `js/auth.js`
- [x] `js/storage.js`
- [x] `js/components.js`
- [x] Click-through smoke test passes (every nav link from every page works)

### Phase 2 — Content & Styling
- [x] Login page styled & functional
- [x] Landing styled
- [x] Pledge view styled
- [x] Pledge edit styled
- [x] Workflows hub styled
- [x] Workflow detail (all 3 confidence states) styled
- [x] Workflow submit styled
- [x] Explore hub styled
- [x] Peer Cases (Cases + Prompts views) styled
- [x] Case detail styled
- [x] Trust Center (two columns) styled
- [x] My Profile styled
- [x] Ideas Lab static page
- [x] Skill Lab static page
- [x] Learning Partners static page

### Phase 3 — Interactivity
- [x] localStorage merger end-to-end *(Workflow submit → Peer Cases list → Case detail; upvote + comment persistence.)*
- [x] Case submission flow *(Submit as a case → `newPeerCases`; Explore list/detail rendering is Phase 2 next.)*
- [x] Comment submission (with manager badge)
- [x] Upvote
- [x] Pledge edit save *(Edit + New modes write `pledgeOverrides`; cross-user persistence verified Sarah sees David's saves.)*
- [x] Confidence-conditional checklist *(checklist length per workflow seed; rendered on detail page.)*
- [x] Low-confidence edit guard *(approval-email: Mark as verified disabled until output edited.)*
- [x] Chatbot mock
- [x] All 11 cross-surface links wired

### Phase 4 — Functional polish *(complete)*
- [x] Run-with-AI loading spinner *(1s on workflow-detail before output reveal.)*
- [x] Hover states
- [x] Empty states
- [x] Toasts / banners
- [x] Manager badge
- [x] Final copy & alignment pass *(functional polish — not UI v2 visual pass)*

### Phase 5 — UI Polish *(in progress)*

Visual refinement only. See **UI Redesign Sandbox Setup** and **Handoff Notes for Next Session** below.

- [x] Landing v2 layout promoted to `index.html`
- [x] `css/landing-v2.css` + `css/ui-v2.css` created; `--landing-*` tokens in `tokens.css`
- [x] Nav / Footer glass chrome updated in `components.js` + `tokens.css`
- [x] Core module pages wired with `body.ui-v2` (Workflows, Explore, Trust Center, Pledge)
- [ ] Remaining pages brought to ui-v2 visual language (see sandbox section)
- [ ] Per-page layout refinement (sphere sizing, typography rhythm, card density)
- [ ] Full-site visual consistency pass + mobile stacking review

### Known Issues / Open Questions
*(Cursor: add notes here whenever you encounter something ambiguous or skipped.)*

- **File count:** Section 4 lists 15 HTML files; Section 9 calls it "14". Resolved by building all 15 (the 14 nav pages + `login.html`). No conflict in practice.
- **`assets/logo.svg`:** Created — red four-point spark; used in nav (`renderSparkLogo`), Landing brand bar, and login card.
- **Phase 1 chrome approach:** shared nav/footer are injected by `mountChrome(activeKey)` into `<div id="nav">` / `<div id="footer">`. Skeleton pages use minimal inline styles + Tailwind CDN; real styling comes in Phase 2.
- **`getMergedData()` cross-page visibility verified** structurally (merger applies overrides, appends cases/comments, upvote deltas, joined PODs). End-to-end persistence flows are Phase 3.
- **CONFLICT RESOLVED (Login fields):** SPEC §6.1 says "email + password fields"; DESIGN_SYSTEM §5.12 shows email-only. Per user decision (2026-06-29), **SPEC wins — keep both email + password fields** on `login.html`.
- **CONFLICT RESOLVED (Login error copy):** SPEC §6.1 vs DESIGN_SYSTEM §5.12 differ. Per user decision, **use SPEC copy**: "Email not recognized. Try sarah.chen@cibc.com or david.kim@cibc.com."
- **DEVIATION (Landing avatar):** DESIGN_LOGIC §4.1.3 says Landing has "No My Profile entry." Per project-owner decision (2026-06-29), Landing **keeps a profile avatar in the top-right only** (no nav links). Brand wordmark sits top-left.
- **UI v2 redesign (2026-07):** Landing uses sphere layout (`css/landing-v2.css`); module pages use `body.ui-v2` + `css/ui-v2.css`. Classic Landing archived at `index-classic.html`. Git branch `ui-redesign`. Hero v1 red gradient preserved only in `index-classic.html` (DESIGN_SYSTEM §5.4 v1).
- **DOC INCONSISTENCY (Pledge → Trust Center footer pointer):** DESIGN_LOGIC §4.2.3 and §6.2 explicitly specify a footer pointer from Pledge to Trust Center, but it is NOT in the canonical "11 sanctioned cross-surface links" (§3.6 / SPEC §8). Implemented per DESIGN_LOGIC (highest authority) and owner request. The §3.6 list should be updated to 12 links, or note this as an in-page secondary link.
- **DATA ALIGNMENT (Pledge tasks):** Seeded Operational `encouragedTasks` previously used `'Discrepancy explanation'`, which is not in the Boundaries vocabulary. Changed to `'Drafting internal reconciliation notes'` so the pledge-edit multi-select (sourced from `SPARK_DATA.boundaries[].task`, per §4.2.3) pre-selects correctly.
- **Pledge edit details:** Multi-selects rendered as toggle pills (owner decision). Editor saves to `spark_runtime.pledgeOverrides.Operational` (SPEC §5.4 key — NOT `pledges.departments`), then redirects to `pledge.html?updated=1` to trigger the success banner (auto-dismiss 4s, click to dismiss). Cross-user persistence verified: David's edit is visible to Sarah on next login.
- **INTENTIONAL ADJUSTMENT to DESIGN_LOGIC §4.2.3 (department pledge fullness):** §4.2.3 states only Operational holds a real pledge in MVP. Per owner request (2026-06-29), for demo fullness we added seeded **Risk** (Maya Patel, conservative/oversight tone) and **Finance** (James Liu, accuracy/compliance tone) pledges in `data.js`. **Technology is deliberately kept `null`** to preserve a live demo of the "manager has not published a pledge yet" empty state. All task values are drawn from the shared `boundaries` vocabulary (§4.2.3). No changes to `pledge.html` logic — data-only. No new user accounts (still Sarah + David).
- **WORKFLOWS RUN STATE:** In-flight audit data passes detail → submit via `sessionStorage` key `spark_workflow_run` (not `spark_runtime`). Submit writes to `spark_runtime.newPeerCases[]` only. `pledgeOverrides` untouched.
- **EXPLORE RUNTIME:** `appendComment()`, `upvoteCase()`, `hasUpvotedCase()` in `storage.js`; `upvotedCases[]` prevents double upvote per user. Seeded peer cases enriched with audit-trail fields for case detail display.
- **TRUST CENTER DATA:** `directorEndorsement`, `documentResources`, `chatbotDemo` (4 demo Qs), extended `boundaries[]` (family, humanReview, notes, workflowId). Runtime: `directorQuestions[]` via `submitDirectorQuestion()`.
- **WORKFLOWS DATA:** Each workflow in `data.js` now includes `boundaryRecap`, `confidenceNote` (medium/low), `promptSource`, `usedByCount`, `estTimeSavedMinutes`.
- **Pledge "Write a new pledge" + dual-mode editor (owner request 2026-06-30):**
  - `pledge.html`: when a manager views their OWN department's existing pledge, two actions now render — **"Edit this pledge"** (filled red → `pledge-edit.html`) and **"Write a new pledge"** (outline secondary → `pledge-edit.html?mode=new`). Employees and other-department views show neither (DESIGN_LOGIC §4.2.5 preserved).
  - `pledge-edit.html` supports two modes via `?mode` query param. **Edit mode** (default): pre-fills current pledge, title "Edit your team's pledge", no AI area, Save enabled immediately (existing behavior unchanged). **New mode** (`?mode=new`): empty form, title "Write a new pledge", warning "This will replace your current pledge.", plus an **AI assist area** above the statement: starter tone chips (📝 Encouraging · 🛡️ Cautious · ⚖️ Balanced · ✨ Start blank) that drop in mock Operational drafts, and a **"✨ Generate with AI"** button (+ free-text "describe your team" input) that shows a ~1s spinner then fills a **hardcoded** mock pledge (lightly keyword-tuned: cautious / efficient / default), with Regenerate + Use this. **All AI output is mocked — no API.**
  - **Save guard (DESIGN_LOGIC §4.2.5 "deliberate authorial act"):** in New mode, Save stays **disabled** until the manager makes a real manual keystroke in the statement textarea. Programmatic fills (chips, Generate, Regenerate) do NOT enable Save (they don't fire `input`). Hint shown while disabled: "Make at least one edit to the AI suggestion to save." Edit mode is unaffected.
  - Both modes Save → write to `spark_runtime.pledgeOverrides[dept]` (replace) → redirect `pledge.html?updated=1` (green banner). localStorage schema unchanged. Cross-user persistence re-verified (David's new pledge visible to Sarah).

### UI Redesign Sandbox Setup

Experimental UI work lives on Git branch **`ui-redesign`** (local repo initialized; no remote required for prototype).

| Item | Location / notes |
|---|---|
| **Git branch** | `ui-redesign` — all UI polish commits go here; compare or revert against pre-v2 via git or `index-classic.html`. |
| **Archive (rollback)** | [`index-classic.html`](index-classic.html) — pre-v2 Landing (red hero, pledge card, three module cards, amber hint bar). |
| **Redirect stub** | [`index-v2.html`](index-v2.html) — redirects to `index.html` (v2 is now canonical). |
| **Landing styles** | [`css/landing-v2.css`](css/landing-v2.css) — cream background, headline, compact pledge, sphere links, hint pill. Linked from `index.html` only. |
| **Module styles** | [`css/ui-v2.css`](css/ui-v2.css) — cream page shell + softer cards. Requires `body class="ui-v2"`. |
| **Tokens** | [`css/tokens.css`](css/tokens.css) — `--landing-bg`, `--landing-bg-accent`, `--landing-accent`, `--landing-sphere-*`, `--landing-card-*`; Nav/Footer glass (`backdrop-filter`, soft border). |
| **Enable ui-v2 on a page** | 1) Add `<link rel="stylesheet" href="css/ui-v2.css" />` after `tokens.css`. 2) Set `<body class="ui-v2">`. |

**Pages with `body.ui-v2` applied:**

- `workflows.html`
- `workflow-detail.html`
- `workflow-submit.html`
- `explore.html`
- `peer-cases.html`
- `trust-center.html`
- `pledge.html`

**Pages not yet on ui-v2** *(still v1 inline styles / default gray shell):*

- `login.html`
- `pledge-edit.html`
- `case-detail.html`
- `profile.html`
- `ideas-lab.html`
- `skill-lab.html`
- `learning-partners.html`

**Landing uses its own class:** `index.html` → `body.landing-v2` + `landing-v2.css` (not `ui-v2`).

**Compare URLs** *(local server on port 8765):*

- New Landing: `http://localhost:8765/index.html`
- Classic Landing: `http://localhost:8765/index-classic.html`

**Demo path unchanged:**

Login → Landing → Pledge (card) → three sphere modules (Workflows / Explore / Trust Center) → Hint pill → Trust Center → Workflows run → Explore Peer Cases → Profile (avatar) → Log out.

---

### Handoff Notes for Next Session

#### Next tasks (UI polish only)

1. **Extend ui-v2** to remaining pages: Login, Pledge Edit, Case Detail, Profile, Ideas Lab, Skill Lab, Learning Partners — add `ui-v2.css` + `body.ui-v2` (or page-specific overrides where layout differs).
2. **Landing refinement:** sphere size/overlap, headline scale, pledge card density — iterate against reference mood; use `index-classic.html` for A/B.
3. **Trust Center + Pledge** — inline styles still dominate; migrate key panels to shared ui-v2 card treatment for consistency.
4. **Explore sub-pages** (Ideas / Skill / Learning Partners) — layout-only pass to match Explore hub cream shell.
5. **Mobile stacking** — Landing spheres already stack at ≤760px; spot-check module pages.
6. **Optional:** commit ui-redesign branch snapshot when a visual milestone is approved.

#### UI decisions already made *(do not revert without owner)*

- Cream gradient page background (`--landing-bg` / `--landing-bg-accent`) on Landing + ui-v2 module pages.
- Landing v2: centered headline with accent word, compact glass pledge card, three overlapping CIBC-red sphere links, quiet hint pill (replaces amber hint bar on Landing only).
- Softer cards on ui-v2 pages: semi-transparent white, light border, subtle shadow (`css/ui-v2.css`).
- Glass Nav / Footer: frosted white bar, soft border, avatar ring on hover (`tokens.css` + `renderNav()` / `renderFooter()`).
- Classic Landing preserved at `index-classic.html` for rollback.
- CIBC red retained for brand accent and spheres (not reference-image dusty rose as primary hue).

#### Pending owner decisions *(visual)*

- Sphere layout proportions vs. reference image (2-sphere reference vs. 3-sphere product requirement).
- Whether to adopt reference headline copy (*"Everything you need to work confidently with AI"*) or keep Spark copy (*Your AI Journey* + subline).
- Pledge Edit / Write button styles on Pledge page (filled red + outline secondary — keep or unify).
- Whether Pledge → Trust Center footer pointer stays as in-page secondary link or gets added to canonical link list (§8).
- Login page: adopt ui-v2 cream shell or keep focused white card on gray-50.
- Profile page: apply ui-v2 or keep current progression-focused layout as-is until capstone review.

#### Known UI consistency gaps

- **Split visual languages:** ui-v2 pages (cream) vs. v1 pages (gray-50 default) — noticeable when jumping Landing → Profile or Explore → Case Detail.
- **Inline `<style>` blocks** still exist on most pages; ui-v2.css only overrides shared selectors — full unification not done.
- **DESIGN_SYSTEM §5.4** (red gradient hero) superseded on Landing by §5.13; §5.4 still documents v1 for `index-classic.html`.
- **Pledge save banner** auto-dismisses at 4s — can look missing if checked late (`?updated=1`).
- **Landing background** may need hard refresh if CSS cached during iteration.

#### Do not touch without explicit owner request

- All feature logic (auth, workflows run, submit, comments, upvote, pledge save, chatbot, Director form, profile stats).
- `localStorage` schema (`spark_runtime`, `sessionStorage` workflow run key).
- Eleven sanctioned cross-surface links (+ documented Pledge → Trust Center secondary link).
- Seeded data in `js/data.js` (Sarah / David personas, pledges, cases, boundaries).
- Owner-approved deviations (Landing avatar, Risk/Finance pledges, Technology null pledge, dual-mode pledge editor).

#### Reference docs

- Visual spec: `DESIGN_SYSTEM.md` §5.13 (Landing v2)
- Product spec unchanged: `DESIGN_LOGIC.md` §4.1.2 (Landing content)
- Run locally: `README.md`

---

### Handoff archive *(superseded — see **Handoff Notes for Next Session** above)*

#### Key decisions log (for continuity)

| Decision | Resolution | Date |
|---|---|---|
| Login: password field? | Keep email + password (SPEC §6.1 wins over DESIGN_SYSTEM §5.12 email-only) | Owner 2026-06-29 |
| Login error copy | SPEC version with demo emails | Owner 2026-06-29 |
| Landing: profile avatar? | Keep top-right avatar despite §4.1.3 "No My Profile entry" | Owner-approved deviation 2026-06-29 |
| Pledge dept mock data | Risk + Finance seeded; Technology stays `null` for empty-state demo | Owner 2026-06-29 |
| Pledge task vocabulary | All task strings from `SPARK_DATA.boundaries[].task` only | DESIGN_LOGIC §4.2.3 |
| Pledge-edit multi-select UI | Toggle pills (not checkbox list or dropdown chips) | Owner 2026-06-29 |
| Pledge storage key | `spark_runtime.pledgeOverrides[dept]` (SPEC §5.4), NOT `pledges.departments` | Engineering spec |
| Pledge dual-mode editor | Edit (default) + New (`?mode=new`) with mock AI assist + Save guard | Owner 2026-06-30 |
| Save guard (New mode) | Save disabled until manual keystroke in statement; chip/Generate fills don't count | DESIGN_LOGIC §4.2.5 |
| Banner copy | Short: *"Your pledge has been updated."* | Owner 2026-06-30 |

#### Known Issues index

**Owner-approved deviations (do not "fix" without asking):**
- Landing retains profile avatar (violates DESIGN_LOGIC §4.1.3 literally; owner explicitly chose to keep it).
- Risk + Finance department pledges exist (DESIGN_LOGIC §4.2.3 says only Operational in MVP; owner requested for demo fullness).
- Pledge → Trust Center footer link exists (not in §3.6 canonical 11-link list).

**Resolved conflicts (documented, stable):**
- 15 HTML files vs "14 pages" naming — build all 15.
- Login fields + error copy — SPEC wins.

**Pending assets / doc hygiene (not bugs):**
- None at handoff. `assets/logo.svg` and `README.md` are in place.

**Not bugs — tester gotchas:**
- Pledge save banner auto-dismiss (4s) can look like a failure if checked late.

**No open code bugs** reported at handoff. Demo path verified by owner.

---

## 11. What Is Deliberately Out of Scope

To match Design Logic Section 3.7 and prevent scope creep:

- No real AI integration. All outputs mocked.
- No backend, database, or API.
- No real authentication, password hashing, or session tokens.
- No mobile-responsive design (desktop-first; phone view is acceptable to break).
- No accessibility audit (basic semantic HTML is enough; no full WCAG pass).
- No analytics, no telemetry, no error logging.
- No animations beyond simple CSS transitions and the one "Run with AI" spinner.
- No multi-language support.
- No tests (this is a 2-day demo prototype).
- No Skill Lab interactivity, no Ideas Lab posting form, no POD scheduling — these are look-only.

If anything in this list seems necessary to revisit, raise it as an open question in Section 10 before implementing.

---

*End of SPEC.md — v1.0. Update Section 10 as you go; everything else is locked.*
