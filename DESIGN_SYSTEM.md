# Spark — Design System

> **Companion to:** `DESIGN_LOGIC.md`
> **Purpose:** Visual & interaction specification for the Spark prototype.
> **Scope:** Colors, typography, spacing, components, and interaction patterns.
> **Status:** v1.0 — locked for prototype build.

---

## How to read this document

This document defines **what Spark looks like and how it behaves visually**. It does NOT define:
- *What each surface is for* → see `DESIGN_LOGIC.md` Section 4
- *How users move through the product* → see `DESIGN_LOGIC.md` Section 5–6
- *File structure or code rules* → see `.cursorrules`

When implementing, both documents must be read together. If there is ever a conflict between Design Logic and Design System, **Design Logic wins** — visuals serve the logic, not the other way around.

---

## 1. Design Philosophy

Spark's visual language follows three principles, in order:

1. **Professional & trustworthy.** This is a financial institution prototype. Restraint over flair.
2. **Modern & clean.** Generous whitespace, clear hierarchy, subtle shadows. No skeuomorphism, no heavy gradients, no decorative noise.
3. **Warm, not corporate-cold.** The CIBC red provides warmth; cards and surfaces stay soft (rounded corners, off-white backgrounds) to avoid feeling clinical.

The product should feel like a **well-designed banking tool**, not a SaaS dashboard and not a consumer app.

---

## 2. Color System

### 2.1 Brand Colors

| Token | Hex | Usage |
|---|---|---|
| `--cibc-red` | `#C8102E` | CIBC official brand red. Primary CTAs, hero banner, key emphasis numbers, logo. |
| `--cibc-red-dark` | `#A00D24` | Hover state on primary buttons. Hero banner gradient endpoint. |
| `--cibc-red-light` | `#FEE2E5` | Light red tint for backgrounds (badges, soft highlights). |

### 2.2 Accent Colors

| Token | Hex | Usage |
|---|---|---|
| `--amber-500` | `#F59E0B` | Progression bar fill, streak/fire icons, secondary emphasis. |
| `--amber-50` | `#FEF3E8` | Hint bar background (the "Need to check what's allowed?" strip). |

### 2.3 Neutrals

| Token | Hex | Usage |
|---|---|---|
| `--white` | `#FFFFFF` | Card backgrounds, modals. |
| `--gray-50` | `#FAFAFA` | Page background. |
| `--gray-100` | `#F3F4F6` | Subtle section dividers, disabled button background. |
| `--gray-200` | `#E5E7EB` | Card borders, input borders. |
| `--gray-400` | `#9CA3AF` | Placeholder text, disabled text. |
| `--gray-500` | `#6B7280` | Secondary text, metadata, captions. |
| `--gray-700` | `#374151` | Default UI labels. |
| `--gray-900` | `#1F2937` | Primary body text (NOT pure black — softer). |

### 2.4 Semantic Colors (Confidence Indicator & Status)

| Token | Hex | Usage |
|---|---|---|
| `--success` | `#10B981` | 🟢 High confidence indicator. Success states. |
| `--success-bg` | `#D1FAE5` | Background tint for High confidence pill. |
| `--warning` | `#F59E0B` | 🟡 Medium confidence indicator. Warning states. (Same as `--amber-500`.) |
| `--warning-bg` | `#FEF3C7` | Background tint for Medium confidence pill. |
| `--danger` | `#DC2626` | 🔴 Low confidence indicator. Error/danger states. **Note:** This is distinct from `--cibc-red` — keep them visually separate. |
| `--danger-bg` | `#FEE2E2` | Background tint for Low confidence pill. |
| `--info` | `#3B82F6` | Informational messages, links (rarely used — most links are red). |

### 2.5 Color Usage Rules

- **CIBC red is for emphasis, not decoration.** Use sparingly — a page with too much red feels alarming.
- **Primary CTA = CIBC red.** Secondary CTA = white background, gray border.
- **Never use pure black** (`#000`) for text. Use `--gray-900`.
- **Confidence colors are reserved.** Do not use `--success`, `--warning`, `--danger` for general UI accents — they have specific semantic meaning tied to the Confidence Indicator.
- **Manager badge** uses CIBC red as background tint (`--cibc-red-light`) with `--cibc-red` text.

---

## 3. Typography

### 3.1 Font Family

```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
```

Load Inter via Google Fonts CDN:
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```

### 3.2 Type Scale

| Token | Size | Weight | Line Height | Usage |
|---|---|---|---|---|
| `text-hero` | 36px | 600 | 1.2 | Hero title ("Your AI Journey") |
| `text-h1` | 30px | 600 | 1.25 | Page-level title (e.g., "Trust Center") |
| `text-h2` | 24px | 600 | 1.3 | Section title (e.g., "Boundaries") |
| `text-h3` | 18px | 500 | 1.4 | Card title (e.g., Peer Case card title) |
| `text-body-lg` | 16px | 400 | 1.5 | Lead paragraph, hero subtitle |
| `text-body` | 15px | 400 | 1.55 | Default body text |
| `text-sm` | 13px | 400 | 1.5 | Metadata, captions, helper text |
| `text-xs` | 12px | 500 | 1.4 | Tags, badges, very small labels |

### 3.3 Typography Rules

- **Headings use weight 600.** Body text uses weight 400. Medium (500) is reserved for UI labels and card titles.
- **Numbers in "Personal Wins"** (e.g., "4h 20m", "12") use `text-hero` size + CIBC red color for visual punch.
- **Line length:** keep paragraph width ≤ 70 characters (`max-width: 65ch`).
- **Letter spacing:** default is fine. Slight tightening (`-0.01em`) on `text-hero` only.

---

## 4. Spacing & Layout

### 4.1 Spacing Scale

Based on **4px increments**:

| Token | Value | Common Use |
|---|---|---|
| `space-1` | 4px | Tight gaps within tags, badges |
| `space-2` | 8px | Inline element gaps |
| `space-3` | 12px | Form field internal padding |
| `space-4` | 16px | Card padding (compact), small section gaps |
| `space-5` | 20px | Card padding (default) |
| `space-6` | 24px | Card padding (spacious), section padding |
| `space-8` | 32px | Section vertical spacing |
| `space-10` | 40px | Major section breaks |
| `space-12` | 48px | Page vertical padding (top/bottom) |
| `space-16` | 64px | Hero section padding |

### 4.2 Layout Container

- **Max content width:** `1200px`, centered, with `padding: 0 24px` on the sides.
- On screens narrower than 1240px, content reaches the edges minus padding.
- The prototype is **desktop-first**. Basic responsive behavior (content stacks on mobile) is nice-to-have but not required for the demo.

### 4.3 Grid

- **Three-column module cards** (Landing, Explore hub): `grid-template-columns: repeat(3, 1fr); gap: 24px;`
- **Four-column sub-modules** (Explore hub showing 4 cards): `grid-template-columns: repeat(4, 1fr); gap: 20px;`
- **Two-column Trust Center**: 60/40 split (`grid-template-columns: 1.5fr 1fr; gap: 32px;`) — Ask column wider than Look-up column.
- **Two-column Workflow side-by-side**: equal split (`grid-template-columns: 1fr 1fr; gap: 24px;`)

---

## 5. Components

### 5.1 Cards

**Default card:**
```css
background: var(--white);
border: 1px solid var(--gray-200);
border-radius: 12px;
padding: 24px;
box-shadow: 0 1px 3px rgba(0,0,0,0.04);
transition: all 0.15s ease;
```

**Hover (clickable card):**
```css
border-color: var(--gray-400);
box-shadow: 0 4px 12px rgba(0,0,0,0.06);
transform: translateY(-1px);
```

**Card with header accent (e.g., Pledge card):**
- A 3px solid CIBC red line at the top.
- Optional: small icon in top-left corner.

### 5.2 Buttons

**Primary button (CIBC red):**
```css
background: var(--cibc-red);
color: white;
padding: 10px 20px;
border-radius: 8px;
font-weight: 500;
font-size: 15px;
border: none;
cursor: pointer;
transition: background 0.15s ease;
```
- Hover: `background: var(--cibc-red-dark)`
- Disabled: `background: var(--gray-100); color: var(--gray-400); cursor: not-allowed;`

**Secondary button (outline):**
```css
background: white;
color: var(--gray-900);
padding: 10px 20px;
border-radius: 8px;
border: 1px solid var(--gray-200);
font-weight: 500;
font-size: 15px;
```
- Hover: `background: var(--gray-50); border-color: var(--gray-400);`

**Text button (no background):**
- Color: `var(--cibc-red)`, weight 500.
- Hover: underline.
- Used for "See full Boundaries →", "Try this in a workflow", etc.

**Button sizes:**
- Default: 10px 20px padding, 15px text.
- Large (hero CTAs): 14px 28px padding, 16px text.
- Small (in-card): 8px 14px padding, 13px text.

### 5.3 Top Navigation Bar

```
[✦ Spark]  Home  Trust Center  Explore  Workflows                    [👤]
```

- Height: `64px`
- Background: white
- Bottom border: `1px solid var(--gray-200)`
- Logo: CIBC red, weight 700, with a small ✦ (4-point sparkle) glyph before "Spark"
- Nav links: `text-body`, weight 500, color `var(--gray-700)`, gap 32px between
- Active link: color `var(--cibc-red)`, with a 2px red underline (4px below text)
- Avatar (right-most): 36px circle, gray-200 background with user initials in `var(--gray-700)`
- Hover on nav link: color shifts to `var(--cibc-red)` (no underline yet — that's reserved for active)
- **Not present on `/login` and `/` (Landing).** Present on every other page.

### 5.4 Hero Banner (Landing, optionally on `/profile`)

```css
background: linear-gradient(135deg, var(--cibc-red) 0%, var(--cibc-red-dark) 100%);
color: white;
border-radius: 16px;
padding: 40px 48px;
```
- Title in `text-hero`, white.
- Subtitle in `text-body-lg`, white at 85% opacity.
- Optional decorative ✦ sparkle in top-right corner (subtle, white at 30% opacity).

### 5.5 Confidence Indicator Pill

Sits at the top of any AI output panel.

```css
display: inline-flex;
align-items: center;
gap: 6px;
padding: 6px 12px;
border-radius: 999px;
font-size: 13px;
font-weight: 500;
```

**🟢 High:**
- Background: `var(--success-bg)`, text: `var(--success)`, icon: 🟢
- Label: "High confidence — likely reliable. Quick scan before use."

**🟡 Medium:**
- Background: `var(--warning-bg)`, text: `#92400E`, icon: 🟡
- Label: "Medium confidence — plausible, but parts need a structured check."

**🔴 Low:**
- Background: `var(--danger-bg)`, text: `var(--danger)`, icon: 🔴
- Label: "Low confidence — uncertain. Human review required before this leaves your hands."

Below the pill, an **inline note** in `text-sm`, gray-700, italic, explaining *why* the confidence is reduced (for Medium and Low only).

### 5.6 Manager Badge

Used next to a commenter's name in Peer Cases when the commenter is a manager.

```css
display: inline-block;
padding: 2px 8px;
background: var(--cibc-red-light);
color: var(--cibc-red);
border-radius: 4px;
font-size: 11px;
font-weight: 600;
text-transform: uppercase;
letter-spacing: 0.02em;
margin-left: 6px;
```
Label: "MANAGER"

### 5.7 Progression Bar (My Profile)

A horizontal bar with 4 stages.

- Container: full width of its parent, height 8px, background `var(--gray-200)`, border-radius 999px.
- Fill: gradient from `var(--cibc-red)` to `var(--amber-500)`, with width = current progress.
- Above the bar: 4 stage labels evenly spaced. The current stage is bold and colored `var(--cibc-red)`; others are `var(--gray-500)`.
- A small dot marker (12px, white border 2px, `var(--cibc-red)` fill) sits on the bar at the current position.
- Below the bar: a single sentence note explaining where the user is and what's next (`text-sm`, `var(--gray-700)`).

### 5.8 Form Inputs

**Text input / textarea:**
```css
border: 1px solid var(--gray-200);
border-radius: 8px;
padding: 10px 14px;
font-size: 15px;
font-family: inherit;
background: white;
transition: border-color 0.15s ease;
```
- Focus: `border-color: var(--cibc-red); outline: 2px solid var(--cibc-red-light);`
- Placeholder: `color: var(--gray-400);`
- Disabled: `background: var(--gray-50); color: var(--gray-500);`

**Multi-select / dropdown:** styled to match text input. Selected items appear as removable chips inside the field, with `var(--cibc-red-light)` background.

**Checkbox (verification checklist):**
- 18px × 18px square, 4px border-radius
- Unchecked: white background, `var(--gray-200)` border
- Checked: `var(--cibc-red)` background, white checkmark
- Label sits 8px to the right, `text-body`, `var(--gray-900)`

### 5.9 Tags / Pills (Metadata)

For role tags, task family tags, etc.

```css
display: inline-block;
padding: 4px 10px;
background: var(--gray-100);
color: var(--gray-700);
border-radius: 6px;
font-size: 12px;
font-weight: 500;
```

### 5.10 Hint Bar (Landing bottom)

```css
background: var(--amber-50);
border: 1px solid #FCD9A8;
border-radius: 12px;
padding: 16px 24px;
display: flex;
align-items: center;
justify-content: space-between;
```
- Left side: 💡 icon + text
- Right side: → arrow
- Hover: background slightly darker (`#FDEBD0`), cursor pointer.

### 5.11 Empty States

Every list view must define its empty state. Visual treatment:
- Centered in the container.
- Small icon (or emoji) at top, 40px size, gray-400 color.
- One-line message in `text-body`, `var(--gray-500)`.
- Optional secondary action button (secondary button style) below.

### 5.12 Login Page

A focused, single-card layout. **No top nav.**

- Centered card, ~400px wide, white background, `border-radius: 16px`, `box-shadow: 0 10px 40px rgba(0,0,0,0.08)`.
- CIBC logo at top (red ✦ Spark wordmark).
- Title: "Sign in to Spark" — `text-h2`.
- Subtitle: "Use your CIBC email to continue." — `text-sm`, `var(--gray-500)`.
- Email input (full width).
- "Continue" primary button (full width).
- Below the form: small helper text — "For demo: try `sarah.chen@cibc.com` or `david.kim@cibc.com`" in `text-xs`, `var(--gray-400)`. **This helper line is shown intentionally because this is a prototype** — in real use it would not exist.
- Page background: `var(--gray-50)`, with a very subtle red sparkle decoration in a corner (optional).

**Error state** (invalid email): a red message appears below the input — "Please enter a valid @cibc.com email address." Input border becomes `var(--danger)`.

---

## 6. Iconography

- **Use emoji where they fit the friendly tone**: 💡 (hint), 🟢🟡🔴 (confidence), 👍 (upvote), 💬 (comment), ✦ (Spark logo), 🔥 (streak), 📅 (calendar).
- **For UI chrome icons** (arrows, close, edit, etc.), use **Lucide icons** via CDN: `https://unpkg.com/lucide@latest`. Icons render at 16px or 20px, stroke width 1.5, color inherits from text.
- **Module icons on Landing/Explore cards**: simple, friendly. Can use emoji (📋 Workflows, 🔍 Explore, 🛡️ Trust Center) or small Lucide icons in CIBC red. **Pick one approach and stay consistent across the whole prototype.** Recommendation: emoji on Landing/Explore hub cards (warmer), Lucide icons everywhere else (cleaner).

---

## 7. Interaction Patterns

### 7.1 Hover

- All clickable elements have a visible hover state.
- Cards lift slightly (`translateY(-1px)`) and gain a subtle shadow.
- Buttons darken (primary) or gain a background (secondary).
- Text links underline.
- Transition: `0.15s ease` on all hover changes.

### 7.2 Focus

- Keyboard focus visible on all interactive elements.
- Default: `outline: 2px solid var(--cibc-red-light); outline-offset: 2px;`

### 7.3 Click feedback

- Buttons briefly scale to 98% on active (`transform: scale(0.98)`).
- Upvote button: count increments with a tiny scale-up bounce on the number.

### 7.4 Transitions between pages

- For the prototype, **no fancy page transitions** — instant navigation. The exception: confirmation screens (e.g., after submitting a case) may have a subtle fade-in on the success message.

### 7.5 Loading states

- This prototype has **no real async loading** (all data is mocked). Where the demo wants to simulate AI thinking (e.g., "Run with AI"), show a brief spinner + "Generating..." text for ~1 second, then reveal the mocked output. Spinner: CIBC red, 20px, standard CSS spinner.

### 7.6 Notifications / banners

- After actions like "Pledge updated" or "Case submitted," show a brief banner at the top of the page.
- Style: full-width strip, soft green background (`#ECFDF5`) for success, `var(--success)` text, with a checkmark icon. Auto-dismisses after 4 seconds, or click to dismiss.

---

## 8. Visual Hierarchy Rules

When in doubt about what should stand out:

1. **CIBC red** = most important action or piece of information on the page.
2. **Large numbers + red** = personal wins, key metrics.
3. **Bold dark text** = section titles, names.
4. **Gray text** = supporting info, metadata, timestamps.
5. **Whitespace** is a hierarchy tool — use it generously. Better to break content into two cards with breathing room than cram into one dense card.

---

## 9. Accessibility (basic)

The prototype should meet a reasonable bar even if not formally audited:

- All text on white backgrounds passes WCAG AA contrast (4.5:1).
- All interactive elements are keyboard-accessible.
- Color is never the only indicator of meaning (Confidence pills include both color AND emoji AND text).
- Form fields have visible labels (no placeholder-as-label).
- Buttons have descriptive text (no "Click here").

---

## 10. What This Design System Deliberately Does Not Specify

- **Exact pixel-perfect layouts of every page.** Those are left to the implementer's judgment, guided by these tokens and components.
- **Animation libraries or motion design beyond simple hover/transitions.** This is a prototype; restraint is fine.
- **Mobile layouts.** Desktop-first; basic stacking on narrow viewports is acceptable but not specified.
- **Dark mode.** Not in scope.
- **Print styles.** Not in scope.
- **A full component library file.** These tokens are meant to be implemented inline in CSS/Tailwind config, not as a separate component package.

---

## 5.13 Landing v2 (UI redesign)

Adopted 2026-07 after initial v1 build. **Product content unchanged** (DESIGN_LOGIC §4.1.2); visual language only. Supersedes §5.4 hero treatment on `index.html`; §5.4 remains valid for `index-classic.html`.

### Scope

| Surface | Class / CSS | Notes |
|---|---|---|
| Landing | `body.landing-v2` + `css/landing-v2.css` | Canonical entry: `index.html` |
| Module pages | `body.ui-v2` + `css/ui-v2.css` | Cream shell + soft cards (partial rollout) |
| Rollback | `index-classic.html` | Full v1 Landing layout |

### Tokens (`css/tokens.css`)

```css
--landing-bg: #f7f4f0;
--landing-bg-accent: #f0ebe6;
--landing-accent: var(--cibc-red);
--landing-sphere-light: #e8364f;
--landing-sphere-mid: var(--cibc-red);
--landing-sphere-dark: #8f0c22;
--landing-sphere-glow: rgba(200, 16, 46, 0.22);
--landing-card-bg: rgba(255, 255, 255, 0.72);
--landing-card-border: rgba(200, 16, 46, 0.12);
```

### Chrome (Nav / Footer)

- Nav: `rgba(255,255,255,0.92)` + `backdrop-filter: blur(10px)`; border `rgba(0,0,0,0.06)`.
- Avatar: white fill, `--landing-card-border` ring; hover → CIBC red border + sphere glow shadow.
- Footer: `.spark-footer` — transparent, soft top border (via `renderFooter()` in `components.js`).

### Landing layout (top → bottom)

1. **Brand bar** — logo + profile avatar (owner-approved deviation; no top nav).
2. **Welcome** — `15px`, `--gray-500`, centered (*Welcome back, {firstName}.*).
3. **Headline** — `clamp(36px, 5vw, 56px)`, weight 600, letter-spacing `-0.03em`. Accent span: `--landing-accent` (default: *AI Journey* in *Your AI Journey*).
4. **Subline** — `17px`, `--gray-500`, max-width ~52ch, centered (DESIGN_LOGIC §4.1.2 copy).
5. **Pledge card** — max-width 520px, glass background, links to `pledge.html`. Role-conditional CTA unchanged.
6. **Three spheres** — overlapping `<a>` circles, white label, radial gradient (light → CIBC red → dark). Order: Workflows (left), Explore (center-forward), Trust Center (right-rear). Hover: `scale(1.03)`; active: `scale(0.98)`.
7. **Hint pill** — quiet rounded link to Trust Center (replaces amber §5.10 hint bar on Landing only).

### Module page treatment (`css/ui-v2.css`)

- Page background: same cream gradient family as Landing.
- Cards / panels / feed cards: `rgba(255,255,255,0.88)`, light border, soft shadow, optional `backdrop-filter`.
- Titles: tighter letter-spacing (`-0.02em`).

**ui-v2 applied:** Workflows hub/detail/submit, Explore hub, Peer Cases, Trust Center, Pledge.

**Not yet applied:** Login, Pledge Edit, Case Detail, Profile, Ideas Lab, Skill Lab, Learning Partners.

### Responsive

- Landing spheres: horizontal overlap on desktop; stack vertically at `≤760px`.
- Desktop-first; mobile module pages acceptable to break.

### Compare / demo

- New: `/index.html` — Old: `/index-classic.html`
- Demo path unchanged (Login → Landing → Pledge → spheres → Hint → modules).

### Relationship to v1

- §5.4 red gradient hero: **Landing v1 only** (`index-classic.html`).
- §5.10 amber hint bar: **Landing v1 only**; v2 uses hint pill.
- §5.1 module cards (rectangular): **Landing v1 only**; v2 uses spheres.

---

*End of Design System v1.0. Next document: `.cursorrules` — behavioural rules for the AI assistant building this prototype.*
