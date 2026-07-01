# Spark — Design Logic

> **Project:** Spark (formerly "CIBC Anchor Forward")
> **Client:** CIBC (Canadian Imperial Bank of Commerce)
> **Context:** Ivey MSc capstone prototype
> **Version:** 2.0
> **Status:** Design logic complete (Sections 1–6). Technical spec to follow.

---

## How to read this document

This document is **not a technical specification** and does not cover visual design details. It answers three questions:

1. **Why we designed it this way** (design logic)
2. **How users actually use the product** (user journeys)
3. **What each feature is for** (feature-by-feature explanation)

If you want file structures, data schemas, or code rules, those will live in a separate `PROJECT_SPEC.md` written after this document is locked.

Suggested reading order:
- **Section 2** (Core Design Principles) — the soul of the product
- **Section 4** (Module Specifications) — what each surface does
- **Section 6** (Demo Journey) — the scripted walkthrough

---

## 1. Project Background

### 1.1 The Challenge from CIBC

CIBC asked: **how can we build an innovative and adaptable culture in today's tech-driven world?**

Through multiple discussions with the client, we narrowed this broad challenge into a sharper, more actionable problem:

> **How do we help CIBC's operational employees genuinely trust AI tools, and make using AI part of their daily work — not because they're required to, but because they believe the tools are trustworthy and will make them more effective?**

### 1.2 Where We Focused

- **Role:** operational / back-office employees (not all of CIBC)
- **Tasks:** reconciliation + email/approval handling
- **Center of gravity:** the **employee's own AI behaviour journey** — not a top-down rollout, not a manager dashboard
- **Supporting cast:** managers (as fellow employees with one extra capability) and a designated risk-side Director (as a named presence, not a logged-in user)

### 1.3 What the Client Cares About Most

1. **Trust before usage.** Employees won't use tools they don't trust.
2. **Habit, not mandate.** Forced adoption doesn't create culture.
3. **Employee experience is the lever.** The challenge is about employees adapting — not about giving managers a dashboard.
4. **Operational focus first.** Prove it works in concrete scenarios before talking about scale.

### 1.4 Shift From Earlier Iterations

An earlier version of this prototype was manager-driven, with a heavy Manager Hub, a manager-to-director escalation channel, and a manager-approval gate on shared cases. Through team review, we shifted the centre of gravity toward the employee's own journey. The current design:

- Treats the manager as a fellow employee who can edit one pledge — nothing more.
- Replaces the manager-to-director escalation with a single shared Director channel inside Trust Center, open to all employees.
- Removes the manager-approval gate on Peer Cases; quality is now governed by community signals (upvotes, comments, manager-badged comments).
- Adds a curiosity layer — Peer Cases, Ideas Lab, Skill Lab, Learning Partners (PODs) — that gives safe employees somewhere to grow.

The trust foundation from the earlier design is preserved in full: pledges, Boundaries, Confidence Indicator, Audit Trail, and a named Director presence all remain.

---

## 2. Core Design Principles

> These are the soul of the product. Every feature must trace back to one of them. When in doubt, the axiom in 2.1 is the final referee.

### 2.1 The Core Axiom (Dual Engine)

> **Trust is the belief that I am safe when I use AI. Curiosity is what I choose to do once I feel safe.**

This is the design axiom of Spark. It has two halves, and the order matters.

**Trust comes first.** In a regulated financial environment, employees do not fear that AI will be wrong in the abstract — they fear that *they* will be the one held accountable when it is. Until that fear is structurally addressed, no amount of training, encouragement, or gamification will move the needle. Trust is not a feeling we market into existence; it is a state we engineer through explicit permission, visible boundaries, verifiable output, and a clear paper trail.

**Curiosity is the second engine, and it only fires once the first one runs.** An employee who feels safe will start to explore: try a new prompt, watch a 5-minute Skill Lab demo, suggest an idea, join a POD. Curiosity is what converts one-time usage into habit, and habit into culture. Without curiosity, Spark would be a compliance tool. Without trust, curiosity has nowhere safe to land.

Every feature in this product must answer one of two questions:
- **Does this make the user feel safer when using AI?** (Trust engine)
- **Does this give a safe user a reason to go one step further?** (Curiosity engine)

If a feature answers neither, it does not belong here.

### 2.2 The Six Principles

#### Principle 1 — Trust is verified, not marketed

Employees don't start trusting AI because an executive says they should. They start trusting it after they have **personally verified its output a few times** and seen, with their own eyes, where it is reliable and where it is not.

This is why Spark's hero mechanism is the **Confidence Indicator** combined with **side-by-side verification** inside Workflows. The product does not tell employees "AI is trustworthy." It gives them the tools to find out for themselves, one task at a time.

→ Lives in: **Workflows**

#### Principle 2 — What employees actually fear is carrying the blame

In a bank, the sharpest version of the AI fear is not "the AI might be wrong." It is **"if the AI is wrong, I'm the one who pays for it."** The product has to take this fear seriously and answer it structurally.

Spark answers it three ways:
- **Pledges** make the manager's permission visible, dated, and durable.
- **Boundaries** make the rules of the game explicit, so employees never have to guess.
- **Audit Trail** makes it provable, after the fact, that the employee did the human work the system asked of them.

Together, these convert a vague anxiety ("am I going to get in trouble?") into a concrete protection ("I followed the documented path, and there is a record of it").

→ Lives in: **Pledge** (commitments), **Trust Center** (Boundaries), **Workflows** (Audit Trail)

#### Principle 3 — When in doubt, employees need somewhere to ask

No policy document covers every situation. The real-world question is almost always more specific than what the boundaries table anticipated: *"Can I use AI on this particular email, which mentions a client by name but isn't a KYC document?"* If the only available answer is "ask your manager," adoption stalls — because asking is socially expensive and managers are often unsure themselves.

Spark gives employees a low-friction place to ask: a chatbot trained on internal CIBC policy for everyday questions, and a path to a designated **Director** (from a domain like Enterprise Risk Management) for the questions the bot can't confidently answer. This converts the gray-area problem from a one-on-one conversation into a structured, reusable resource.

→ Lives in: **Trust Center**

#### Principle 4 — Social proof must be real, not curated

"Seeing someone like me succeed at this" is the single strongest lever for adoption. But it only works if the success stories are **real, recent, and belong to people the viewer recognizes as peers**. The moment they feel like marketing, they lose their force.

Spark's **Peer Cases** (inside the Explore module) is built around peer authorship: employees submit their own real cases, in their own words. Quality is maintained not by a manager approval gate (which would slow contribution and reintroduce the "ask permission" dynamic Principle 3 is trying to dissolve), but by lightweight community signals: upvotes, comments, and visible manager endorsement on individual cases. Manager comments carry a small badge — a soft trust signal — without becoming a publishing checkpoint.

→ Lives in: **Explore** (Peer Cases sub-module)

#### Principle 5 — Curiosity needs a low-stakes place to live

Once an employee feels safe, the next barrier is competence: *"I'd like to try, but I don't want to look stupid, and I don't want my first attempt to be on a real client task."* Curiosity dies fast when its only outlet is high-stakes work.

Spark gives curiosity its own room. **Skill Lab** offers short, no-stakes practice exercises with no real data and no evaluation — just a place to feel out the tools. **Ideas Lab** lets employees voice things they'd want built, with a community vote. **Learning Partners (PODs)** let curious employees self-organize around a topic, with the option to just observe. None of these touch real work. All of them feed the same culture loop.

→ Lives in: **Explore** (Skill Lab, Ideas Lab, Learning Partners as sub-modules)

#### Principle 6 — Progression is personal, not performative

Habit is built by repetition, and repetition is sustained by a sense of personal progress. Spark recognizes this with a lightweight progression model — Beginner → Daily User → AI Expert → AI Champion — visible only on the employee's own profile page.

Crucially, this progression is **not** a leaderboard, not a public ranking, and not a basis for performance evaluation. The most common goal is "Daily User"; Expert and Champion are explicitly optional, intended for the curious, not as expectations imposed on everyone. The point is to give an individual a private mirror of their own growth — *"I've gone from never using this to using it three times a week, and here's what I've contributed"* — not to turn AI usage into a competition.

→ Lives in: **My Profile**

### 2.3 What Spark Is, and What It Is Not

Spark **is**:
- A behaviour-change system that moves operational employees from *afraid to use* to *habitual user*.
- A trust scaffold built on three structural supports: **explicit permission, calibrated verification, and clear accountability**.
- A culture surface that lets curiosity grow once safety is in place.

Spark **is not**:
- A real AI product (the prototype uses fully mocked outputs and a mocked Confidence Indicator).
- A management dashboard (the manager is, first and foremost, also an employee here — the only extra power is editing the department pledge).
- A surveillance tool (Spark never shows individual employee output content or performance metrics to anyone, including managers).
- A general learning platform or LMS (Skill Lab is a curiosity outlet, not a curriculum).
- A pan-CIBC tool (scope is operational / back-office, focused on reconciliation and email/approval tasks).

Anything that drifts toward the second list is rejected by default. To add such a feature, it must be re-tested against the axiom in 2.1.

---

## 3. Product Definition & Information Architecture

### 3.1 One-Line Definition

**Spark is an employee-centric AI adoption system that helps CIBC's operational and back-office staff build real trust in AI tools — and, once trust is in place, gives their curiosity a safe place to grow into habit.**

The product is organized as **a journey, not a compliance exercise**. Employees enter through a landing page that frames their use of AI as a personal arc and shows them their organization's commitment up front; from there they move between three working surfaces — Workflows, Explore, and Trust Center — each serving one of the two engines defined in Section 2.

### 3.2 What Spark Does (at a glance)

Spark gives an employee four things, in roughly the order they need them:

1. **Permission** — a visible, dated pledge from their department's manager and from the enterprise, surfaced the moment they open the product.
2. **A safe place to actually do the work** — Workflows for reconciliation and email/approval tasks, with a Confidence Indicator on every AI output and a human verification step that produces an Audit Trail.
3. **A peer environment to learn from** — real cases other employees have run, lightweight practice exercises, an idea board, and self-organizing interest groups, all inside Explore.
4. **Somewhere to ask when they're not sure** — a policy-trained chatbot, a curated boundaries reference, and a path to a designated risk-side Director when the answer is genuinely ambiguous, all inside Trust Center.

Spark gives managers exactly **one** additional capability beyond what employees have: the ability to **edit their department's pledge**. Everything else, a manager experiences as an employee.

Spark gives the Director role **no login at all**. The Director shows up inside Trust Center as a named, accountable presence — an endorsement statement, a library of rulings, and a contact channel — but never as a user of the product.

### 3.3 The Four Layers, Mapped to the Surfaces

The four-layer behavioural model from earlier project work is preserved as the **internal "why."** The surfaces (Landing, Pledge, three modules, and one profile page) are the external **"what."**

| Layer | Behavioural goal | Where it lives in Spark |
|---|---|---|
| **L1 — Spark (Permission)** | "I'm allowed to try AI here, and I won't be punished for trying." | **Landing** (surfaces the pledge entry) + **Pledge** (enterprise + department pledges) + **Trust Center** (boundaries, FAQ, Director endorsement) |
| **L2 — Champions (Guided Use)** | "I know how to use AI on my actual work, and I can tell when its output is reliable." | **Workflows** (prompts, Confidence Indicator, side-by-side, Audit Trail) |
| **L3 — Showcase (Peer Proof)** | "People like me have done this safely, and I can learn from or build on what they did." | **Explore** (Peer Cases, Ideas Lab, Skill Lab, Learning Partners) |
| **L4 — Reinforce (Habit & Growth)** | "This is part of how I work now, and I can see myself growing into it." | **My Profile** (progression, personal wins, calendar) + **Trust Center** (Director rulings as long-term policy memory) |

The four layers are not navigation. The user never sees the words "Spark," "Champions," "Showcase," or "Reinforce" in the UI. They are a design lens we use internally to check that each module is pulling its weight against a real behavioural goal.

### 3.4 The Surfaces

Spark consists of **a landing page, a pledge surface, three functional modules, and a personal profile page**, accessed through a persistent top navigation that runs across every page except the landing.

| # | Surface | Path | Purpose | Primary engine |
|---|---|---|---|---|
| 0 | **Landing** | `/` | Open with the employee's personal journey framing and the organization's commitment, then route them onward. | Trust (frames) |
| 1 | **Pledge** | `/pledge` | Show employees they have explicit permission to use AI — at the enterprise level and from their own department's manager. Edit-capable for managers, on their own department. | Trust |
| 2 | **Workflows** | `/workflows` | Walk employees through a real AI-assisted task end-to-end, with verifiable output and a complete record of what they checked. | Trust |
| 3 | **Explore** | `/explore` | Make AI usage social and learnable — real peer cases, low-stakes practice, community ideas, and interest-based groups. | Curiosity |
| 4 | **Trust Center** | `/trust-center` | Give employees somewhere to ask, and somewhere to look up, when the rules of the game aren't obvious. | Trust |
| 5 | **My Profile** | `/profile` | Give each employee a private mirror of their own AI growth — progression, personal wins, upcoming sessions. | Curiosity |

A note on naming: **Pledge** is a surface but not a navigation item. It's reached only from the landing page card. Surfacing it in the top nav would push pledges into the "browsed daily" category, which contradicts their ceremonial role. Putting it on the landing card preserves the *"first thing you see on every visit"* placement without diluting its weight.

### 3.5 Navigation Model

#### 3.5.1 Landing Page (`/`)

The landing page is the **only page in Spark without a top navigation bar**. This is deliberate. The landing page is meant to feel like an opening — a personal welcome, an organizational commitment, and a clear set of choices — not like a chrome-heavy app screen.

The page is composed of four vertically stacked sections:

**Top — Hero**
- Welcome line: *"Welcome back, Sarah"* (or first-time variant)
- Title: **"Your AI Journey"** in large type
- A short framing sub-line about Spark's purpose

**Upper middle — Pledge card**
- A single rectangular card labeled **Pledge**
- Below the label: a short preview of the enterprise pledge (one sentence, truncated) — enough to signal *"there is a commitment here"* without showing the full content on Landing
- For an **employee**, the card's CTA reads *"View your team's pledge"* and routes to `/pledge`
- For a **manager**, the card's CTA reads *"View or edit your team's pledge"* and routes to `/pledge` (where the editor lives on a separate `/pledge/edit` route — see 3.5.4)
- The card is sized smaller than a dashboard panel — pledge is the *opening commitment*, not the personal dashboard

**Lower middle — Three module cards**
Three equal-sized cards, side by side, in this left-to-right order:

| Card | One-line | Destination |
|---|---|---|
| **Workflows** | *"Use AI safely on your real work."* | `/workflows` |
| **Explore** | *"See teammates' cases, practice, share ideas, join PODs."* | `/explore` |
| **Trust Center** | *"Check the rules, ask the chatbot, see the Director's guidance."* | `/trust-center` |

Order matters: Workflows first because it's the trust engine's working surface; Explore second because it's the curiosity engine; Trust Center third because it's the reference layer for both. The order also matches the *frequency* with which a settled-in employee uses each.

**Bottom — Hint bar**
A full-width, low-emphasis bar at the bottom of the page:

> *"💡 Need to check what's allowed? → Go to Trust Center for more information."*

Clicking routes to `/trust-center`. This bar is **intentionally redundant** with the Trust Center card above it. The card serves the broader intent ("I want to explore the rules space"); the bar serves the specific intent ("I have a rules question *right now*"). For an employee mid-task who came to Spark to look something up, the bar is a faster path; the duplication is the feature.

#### 3.5.2 Persistent Top Nav (every page except `/`)

A horizontal bar visible on every page **other than the landing page**:

```
[✦ Spark → /]   Home   Trust Center   Explore   Workflows   [👤 Avatar → /profile]
```

- **Spark logo** routes back to the landing page (`/`).
- **Home** is an explicit text link, also routing to `/` — present because some users prefer text nav over logo clicks, and the landing page is meaningful enough to deserve a named link.
- **Trust Center / Explore / Workflows** are the three daily-use destinations.
- **Pledge is intentionally NOT in the top nav.** It is reached from the landing card only. Pledges are read as a starting ritual, not browsed casually, and surfacing them in the daily nav would dilute their ceremonial weight.
- **Avatar** opens **My Profile**.

#### 3.5.3 Role Differences in Navigation

Navigation is the same for employee and manager. The only role-conditional elements anywhere in the product are:

- The landing page Pledge card's label (View vs. View or edit).
- Inside Pledge (`/pledge`), managers see an Edit affordance on their own department's pledge that routes to a separate edit page.
- Inside Explore's Peer Cases, comment authorship displays role ("Employee" / "Manager") and, for managers, includes a small badge.

Director does not appear in the navigation at all. Director presence is contained inside Trust Center.

#### 3.5.4 Pledge editing — separate edit page

Per design decision, manager pledge editing happens on a **dedicated edit page** at `/pledge/edit`, not inline on the Pledge view page. The flow:

1. Manager opens `/pledge` from the landing card.
2. Manager selects their own department.
3. Manager clicks **Edit this pledge**.
4. Routes to `/pledge/edit`, where the editor renders.
5. On Save, routes back to `/pledge` with the updated pledge visible.

The separate-page approach (rather than an inline editor or modal) was chosen because pledge writing is a **deliberate authorial act** — giving it its own page reflects that weight, and avoids the "accidental edit" risk of inline editors.

### 3.6 Cross-Surface Connections (the only sanctioned ones)

Spark's surfaces are deliberately decoupled. The only places they speak to each other are listed here. Any other cross-surface link is out of scope until added to this list.

1. **Landing → Pledge** (the landing Pledge card).
2. **Landing → Workflows / Explore / Trust Center** (the three module cards).
3. **Landing → Trust Center** (the bottom hint bar — a second route, intent-specific).
4. **Top nav → Home (`/`) / Trust Center / Explore / Workflows** (every non-landing page).
5. **Top nav avatar → My Profile** (every non-landing page).
6. **Pledge → Pledge Edit (`/pledge/edit`)** (manager only, manager's own department only).
7. **Workflow boundary recap → Trust Center Boundaries** (a "See full Boundaries →" link inside Step 1 of any workflow).
8. **Workflow completion → Explore submission** ("Submit as a case" hands the run into Explore's Peer Cases submission form).
9. **Explore Peer Case detail → Workflow detail** ("Try this in a workflow" with the prompt pre-loaded).
10. **Explore Prompts view → Workflow detail** ("Use this prompt in a workflow").
11. **Trust Center chatbot → Trust Center Director contact** (when the bot's answer is uncertain, the user can escalate to the Director channel inside the same module).
12. **My Profile calendar entry → external event** (workshops, POD sessions — display-only in MVP; for the prototype, these do not actually integrate with a real calendar system).

Surfaces never share components or data files directly; if two surfaces need the same thing, it is lifted into the shared design system. (Code-level rules for this live in the eventual technical spec; here we are only describing the *user-visible* connections.)

### 3.7 What's Deliberately Absent from the Architecture

To make the trade-offs explicit:

- **No Manager Hub.** Managers are employees who can edit one pledge. They do not have a dashboard, an approval queue, a team activity view, or a director escalation channel.
- **No Director View / Director login.** The Director is a named role inside Trust Center, not a user.
- **No approval gate on Peer Case submissions in Explore.** Quality is maintained by upvotes, comments, and manager-badged comments — not by a publishing checkpoint.
- **No leaderboards or public ranking** anywhere in the product. Progression exists only on the individual's own profile page.
- **No left sidebar.** The top nav plus the landing page cards is the entire navigation system.
- **No top nav on the landing page.** The landing page is the opening; chrome would dilute it.
- **No Pledge in the top nav.** Pledge is reached from the landing card only, by design.
- **No inline pledge editing.** Editing is a deliberate authorial act on its own page.
- **No real AI model integration.** All outputs and confidence levels are mocked. This is a prototype.

Each of these is a deliberate response to a principle in Section 2. Reversing any of them requires re-testing against the axiom in 2.1.

---

## 4. Module Specifications

> For each module, this section answers three questions: **what's in it**, **why each piece is there**, and **how the user actually uses it**. Visual design, copy, and exact data shapes are intentionally out of scope here — those belong to the technical spec written after this document is locked.

> Spark has six surfaces in total: **Landing, Pledge, Workflows, Explore, Trust Center, My Profile.** Landing and Pledge are intertwined — Pledge is reached only from Landing — so they share Section 4.1 and 4.2 respectively but are designed as a pair.

### 4.1 Landing

#### 4.1.1 Purpose

The Landing page is the **opening of the product**.

Every other surface in Spark does work — Workflows runs tasks, Explore hosts the community, Trust Center answers questions, My Profile reflects growth. Landing does none of that. Its job is to **frame the visit**: welcome the employee, surface the organization's pledge as the opening commitment, and offer three clearly differentiated paths into the rest of the product.

It is the only page in Spark **without a top navigation bar**. This is a deliberate design statement: Landing is meant to feel like a doorway, not a dashboard. Chrome would dilute it.

→ Serves Principle 2 (permission as protection) and Principle 6 (progression is personal — the page never displays competitive or comparative content).

#### 4.1.2 What's on it

Landing has four vertically stacked sections, in order:

**Section 1 — Hero**
- A personal welcome line: *"Welcome back, Sarah."* (For first-time visitors, this is a softer variant like *"Welcome to Spark, Sarah."*)
- The title **Your AI Journey** in large type.
- A short framing sub-line: *"You're on your way. Here's where the organization stands, and where you can go next."*

The hero sets the personal-but-supported tone that defines Spark. It is read in 5 seconds, not lingered on.

**Section 2 — Pledge card**
- A single rectangular card, **labeled "Pledge."**
- Below the label: a short preview of the enterprise pledge (one sentence, truncated) — enough to signal *"there is a commitment here"* without showing the full content on Landing.
- For an **employee**, the card's CTA reads *"View your team's pledge."*
- For a **manager**, the card's CTA reads *"View or edit your team's pledge."*
- Clicking the card routes to `/pledge`.

The Pledge card is **sized smaller than a dashboard panel**. Pledge is the opening commitment, not the personal dashboard. The dashboard lives in My Profile.

**Section 3 — Three module cards**
Three equal-sized cards, side by side, in this left-to-right order:

| Card | One-line | Destination |
|---|---|---|
| **Workflows** | *"Use AI safely on your real work."* | `/workflows` |
| **Explore** | *"See teammates' cases, practice, share ideas, join PODs."* | `/explore` |
| **Trust Center** | *"Check the rules, ask the chatbot, see the Director's guidance."* | `/trust-center` |

Order matters: Workflows first because it's the trust engine's working surface; Explore second because it's the curiosity engine; Trust Center third because it's the reference layer for both. The order also matches the *frequency* with which a settled-in employee uses each.

**Section 4 — Hint bar**
A full-width, low-emphasis bar at the bottom of the page:

> *"💡 Need to check what's allowed? → Go to Trust Center for more information."*

Clicking routes to `/trust-center`. This bar is **intentionally redundant** with the Trust Center card above it. The card serves the broader intent ("I want to explore the rules space"); the bar serves the specific intent ("I have a rules question *right now*"). For an employee mid-task who came to Spark to look something up, the bar is a faster path; the duplication is the feature.

#### 4.1.3 What Landing deliberately does not have

- **No top navigation bar.** Landing is the only page in Spark without one.
- **No progression bar, personal wins, or calendar.** Those belong on My Profile, which is one click away via the avatar — but only after the employee has entered the rest of the product. Landing is not a dashboard.
- **No leaderboard, social feed, or "what your peers are doing" widget.** Landing never compares one employee to another.
- **No notifications, badges, or unread indicators.** Landing should feel calm.
- **No My Profile entry.** Landing has no nav, and Profile is opt-in. The employee gets to Profile from the avatar on any non-landing page.
- **No Director presence.** Director shows up only inside Trust Center.

#### 4.1.4 How an employee uses it

A first-time employee opens Spark and lands here. Their eye moves: hero (3s) → Pledge card (5s, they click) → returns later → three module cards → picks Workflows.

A returning employee, mid-task, opens Spark and uses the hint bar to jump straight to Trust Center.

A manager on Day 1 opens Spark, sees the Pledge card with the *"View or edit"* label, clicks through to edit.

The page works for all three patterns because it doesn't insist on any single path — it offers four (Pledge, Workflows, Explore, Trust Center) and trusts the user to pick.

#### 4.1.5 Why this design, not a richer one

An earlier wireframe explored putting the personal progression bar and dashboard widgets on Landing. We rejected that for two reasons:

1. **It duplicates My Profile.** If progression lives on Landing, what is My Profile for? Either we delete Profile (and lose the *private* mirror of growth, which is the entire point of Principle 6), or we keep Profile and Landing becomes redundant. Neither is clean.
2. **It makes Landing performative.** A progression bar visible on the page that opens every visit applies a low-grade adoption pressure that contradicts Principle 6. The employee should *choose* to see their progression by clicking their avatar — not have it pushed at them every time they open the product.

Landing's restraint — hero, pledge, three doors, one hint — is the feature. It's the opening of a journey, not the front of an app.

### 4.2 Pledge

#### 4.2.1 Purpose

Pledge exists to answer one question, before an employee touches anything else in Spark:

> **"Am I actually allowed to use AI here?"**

It is the starting ritual of the product. Every employee passes through it on their way in — surfaced by the Pledge card on Landing, opened deliberately by the user. Returning employees pass through it less often, but it is always one click from Landing.

It carries the weight of organizational permission, in two voices: the **enterprise** and the **employee's own department manager**.

→ Serves Principle 2 (permission as protection).

#### 4.2.2 Where it lives in the architecture

Pledge is a **surface but not a navigation item**. It's reached from the Landing card only — it does not appear in the top nav. This placement is deliberate. Surfacing it in the daily nav would push pledges into the "browsed casually" category, which contradicts their ceremonial role. The Landing-card-only entry preserves Pledge's *"first thing you see on every visit"* placement without diluting its weight as a deliberate read.

#### 4.2.3 What's in it

Pledge contains exactly two layers of content. No FAQ. No boundaries table. No Director endorsement. Those all live in Trust Center, by design.

**Layer 1 — Enterprise Pledge (top of page)**
A single, short statement from CIBC at the organizational level. It says, in plain language: *we encourage you to explore AI tools, here is the spirit in which we want you to do it, and we have built Spark to support you.* This is a static piece of content, the same for every employee.

**Layer 2 — Department Pledges (below the enterprise pledge)**
A department selector. The prototype displays several department names (e.g., Operational, Risk, Finance, Technology) but **only the Operational department contains a real pledge example** in MVP; other departments show a placeholder ("Your department's manager has not published a pledge yet"). This is deliberate: it shows the product's structure scales across CIBC, while keeping the demo focused.

Clicking into a department reveals:
- The manager's name and title.
- The pledge statement, in the manager's own voice.
- The date it was published or last updated.
- A short list of "tasks I encourage my team to try AI on" and "tasks I want my team to check with me on first." Both lists draw their options from the same task vocabulary used in the Boundaries table inside Trust Center, so the two surfaces stay consistent.

**Pointer to Trust Center**
At the bottom of the Pledge page, a small persistent footer reads:

> *Need to check the rules for a specific task, or ask a question? → Go to Trust Center.*

This exists because employees who finish reading the pledge will naturally have follow-up questions ("OK, but can I use AI on *this* email?"), and we need to route that energy somewhere productive.

#### 4.2.4 How an employee uses it

A first-time user lands on Spark, clicks the Pledge card from Landing. They read the enterprise pledge (≈20 seconds), then select their department from the selector. They see their manager's pledge — short, named, dated. Their psychological barrier drops: *"this isn't just corporate posturing — my actual boss said this, in writing, with a date on it."*

On subsequent visits, most employees won't return to Pledge daily. That's fine. The pledge has done its work the first time. The footer pointer to Trust Center is what catches them when they come back with a specific question.

#### 4.2.5 How a manager uses it

A manager sees the same Pledge page as an employee, with one difference: when they navigate to **their own department**, they see an **Edit this pledge** button next to the pledge content.

Clicking **Edit this pledge** routes them to a dedicated edit page at `/pledge/edit`. The editor is **on its own page, not inline or modal** — pledge writing is a deliberate authorial act, and giving it its own page reflects that weight and prevents the "accidental edit" risk of inline editors.

The editor contains:
- Pledge statement (free text, with a soft length guide).
- Two multi-select fields: "tasks I encourage" and "tasks I want my team to check with me first" — both pulling options from the shared task vocabulary.
- A **Preview as employees will see it** button.
- Save (publishes immediately) and Cancel (returns to `/pledge` without changes).

On Save, the manager is routed back to `/pledge` with the updated pledge visible. The new pledge is immediately visible to every employee in that department on their next Pledge visit. There is no review queue and no Director sign-off — pledges are the manager's own voice, and Spark's job is to make that voice visible, not to police it.

Managers cannot edit other departments' pledges, and they cannot edit the enterprise pledge.

#### 4.2.6 What Pledge deliberately does not do

- **No boundaries table.** Specific allow/disallow rulings live in Trust Center. Pledge is about *spirit*; Trust Center is about *specifics*.
- **No FAQ.** Same reason.
- **No Director endorsement.** The Director role lives in Trust Center; duplicating their voice here would muddy the product's two-engine structure.
- **No approval queue or notification when a pledge is updated.** The pledge is a passive document, not a broadcast channel.
- **No history or version log of past pledges.** A pledge is a current commitment; revisions overwrite the previous one. (If this turns out to matter, it goes in V2.)
- **No inline editing.** Editing happens only on the dedicated `/pledge/edit` route.

#### 4.2.7 Why this scope, not more

Earlier iterations bundled boundaries, FAQ, and Director endorsement into a "Trust Center" module that also held pledges. We split those out, moved them into the new Trust Center module (formerly Safe-to-Use), and made Pledge its own focused surface, because they answer different questions:

- **Pledge** answers *"do I have permission at all?"* (the organizational commitment)
- **Trust Center** answers *"what specifically can I do?"* (the rules of engagement)

Mixing the two diluted both. The current scope makes Pledge small but **load-bearing for the trust engine** — and lets Trust Center become the rich, single destination for specifics.

### 4.3 Workflows

#### 4.3.1 Purpose

Workflows is where trust gets **manufactured**, not declared.

Every other surface in Spark talks *about* AI — Pledge promises it's safe, Explore shows others have done it, Trust Center describes the rules. Workflows is the one place an employee actually **does the work**: paste real-shaped input, see real-shaped AI output, verify it step by step, and walk away with a record proving they did the human part properly.

This is the **hero module** of Spark. If a viewer of the demo only remembers one thing about the product, it should be the moment a Confidence Indicator appears next to an AI output and the employee realizes the system is being honest with them about its own uncertainty.

→ Serves Principle 1 (trust is verified, not marketed) and Principle 2 (Audit Trail as accountability protection).

#### 4.3.2 Scope: which workflows exist

The prototype ships workflows for two task families, matching the project's scoping decision:

- **Reconciliation** — drafting discrepancy explanations, summarizing exception patterns, organizing case notes.
- **Email & Approvals** — summarizing long threads, drafting approval-response emails, generating audit-friendly decision summaries.

Each task family contains 2–3 concrete workflows. The user picks their role, then picks a task. No workflows exist outside these two families in MVP; doing so would dilute the operational/back-office focus.

#### 4.3.3 What's in it

A workflow has **fixed steps, always in the same order**. The fixed order is a feature, not a limitation — it's what turns "using AI" from an improvisation into a repeatable procedure the employee can mentally rehearse.

**Step 1 — Boundary recap**
A small callout at the top of the workflow page reminds the employee what Trust Center says about this specific task: is it allowed, is human review required, are there caveats. This is a *reminder*, not a new policy — it pulls from the same data the Boundaries table in Trust Center uses. The employee can click through to the full Boundaries page if they want, but they don't have to leave the workflow to be reminded of the rules.

**Step 2 — Input**
A text area where the employee pastes their source material (a reconciliation discrepancy, an email thread). A "Use sample input" button loads a mocked example for demo purposes. A "Run with AI" button kicks off the (mocked) processing.

**Step 3 — Prompt panel**
The prompt being used is shown, not hidden. It's a real, sanctioned prompt — pulled from Explore's Prompts view, attributed to the original contributor, with their upvote count visible. The employee can view, copy, or lightly edit the prompt. This serves two purposes: it demystifies what the AI is being asked, and it teaches prompt literacy by example.

**Step 4 — AI output + Confidence Indicator** ⭐
The mocked AI output appears. At the top of the output panel, prominently, sits a **Confidence Indicator** with three possible states:

- 🟢 **High** — *"Likely reliable. Quick scan before use."*
- 🟡 **Medium** — *"Plausible, but parts need a structured check."*
- 🔴 **Low** — *"Uncertain. Human review required before this leaves your hands."*

For Medium and Low, an inline note explains *why* the confidence is reduced ("the discrepancy date range was ambiguous," "the email thread referenced an external party we couldn't verify"). The note is what converts the indicator from a color into a teaching moment.

**Important**: in the prototype, the Confidence Indicator is mocked. It's not computed from a real model — it's set in the mock data for each workflow, with a deliberate mix so the demo shows at least one High and at least one Medium/Low example. We do not pretend this is real model output. We do design it so the *behavior* — the employee's response to seeing a yellow or red indicator — is real.

**Step 5 — Side-by-side verification**
The screen splits. Source material on the left, AI output on the right. A checklist below — generated per workflow — gates the next step. Items like *"Amounts in the AI summary match the source ledger,"* *"Dates in the draft email match the original thread,"* *"No client name appears in any AI output that wasn't in the source."* The employee checks each item; the "Mark as verified" button activates only when all are checked.

For Low-confidence outputs, the verification checklist is longer and includes a mandatory rewrite step: the employee cannot submit until they've edited the output. This is the structural answer to the "AI confidently wrong" fear — the system literally won't let them ship a Low-confidence output without changing it.

**Step 6 — Outcome and Audit Trail**
On completion, the system generates an **Audit Trail** record:

```
Task: Reconciliation discrepancy explanation
Workflow: [name]
Prompt used: [prompt text]
AI output (original): [text]
Confidence at time of use: [High / Medium / Low]
Verification checklist: [items checked, with timestamps]
Final version (after human edit): [text]
Submitted by: [employee name]
Time: [timestamp]
```

The employee sees a confirmation screen with two CTAs:
- **"Use this output"** — closes the workflow and silently records the run.
- **"Submit as a case"** — hands the entire record into Explore's Peer Cases submission flow, where it becomes a peer-visible case (governed by Explore's lighter community rules — see 4.4).

#### 4.3.4 Why each step is there (the load-bearing logic)

| Step | What it protects against |
|---|---|
| Boundary recap | Employee using AI on a task they actually shouldn't |
| Prompt panel | Black-box anxiety; also seeds the "I could write one of these" feeling |
| Confidence Indicator | "AI confidently wrong" — the single sharpest fear |
| Side-by-side verification | Employee skipping the check and later being blamed for not catching an error |
| Audit Trail | The retrospective question *"can you prove you reviewed this?"* |

Removing any one of these steps re-opens one of the fears. This is why the workflow is not customizable in MVP — its rigidity is its protection.

#### 4.3.5 How an employee uses it

Sarah is a reconciliation analyst. She has a discrepancy to explain. From the top nav she opens Workflows, picks her role, picks "Discrepancy explanation." She sees the boundary recap (allowed, human review required, low risk) and clicks past it. She pastes her data — or uses the sample for the demo. She runs the prompt. The AI output appears with a 🟡 Medium label and a one-line note: *"The date range in your input was ambiguous; verify the period covered."* She reads the note, expands the side-by-side, checks each verification item, edits a sentence, marks verified, and submits. The Audit Trail is generated. She chooses **"Submit as a case"** to share it.

Total time: about 5 minutes. Net result: one verified AI output, one Audit Trail record, one Peer Case submission, and — most importantly — one employee who has now had a concrete experience of being *safe while using AI*.

#### 4.3.6 How a manager uses it

The same way an employee does. Managers are also users of these workflows on their own work. They have no special view, no team aggregate, no monitoring overlay on this module. This is by design (Section 2 Principle 6, and the broader employee-centric shift).

#### 4.3.7 What Workflows deliberately does not do

- **No real AI calls.** All outputs are mocked. Adding a real model is a V2 / production decision and is explicitly out of scope.
- **No employee-authored new workflows.** Workflows are pre-defined; employees use them, they don't create them.
- **No editing of the verification checklist by the user.** The checklist is what makes the Audit Trail meaningful; letting users skip items hollows out the whole module.
- **No persistence beyond the session.** A submitted Audit Trail is rendered as a confirmation and (if chosen) handed to Explore; nothing is stored long-term in the prototype.
- **No manager approval gate on the workflow run itself.** The decision to share a run as a Peer Case is the employee's; what happens to it after that is governed by Explore's rules, not Workflows'.

#### 4.3.8 Why this design, not a freer one

It is tempting to make this module feel like a general "AI assistant" — paste anything, ask anything, see what happens. We considered it and rejected it. A free-form assistant in a regulated environment **inherits all the fears Spark exists to dissolve**: ambiguity about what's allowed, no record of human review, no way to tell when the output is shaky. Workflows is deliberately narrow because that narrowness is what makes it trustworthy. We are not building a better AI here; we are building the **scaffolding around AI that makes employees willing to use it at all.**

### 4.4 Explore

#### 4.4.1 Purpose

Explore is the **peer environment** of Spark. Where Pledge says *"the organization permits this"* and Workflows says *"here is the safe way to do it,"* Explore says *"people like you are already doing it — come learn, share, and grow alongside them."*

It is the home of the **curiosity engine** (Section 2 Principle 5). Trust has to come first; this module is what fires once trust is in place. Without it, Spark would be a compliance scaffold. With it, Spark becomes a culture.

→ Serves Principles 4 (social proof must be real) and 5 (curiosity needs a low-stakes place to live).

#### 4.4.2 Structure: a hub of four sub-modules

Explore is **not a single feed**. It is a hub page with four entry cards, each opening into a dedicated sub-page. The four sub-modules are intentionally separate because they support **four different kinds of activity**, and folding them into tabs would imply they're variations of the same thing.

| Sub-module | What it's for | What the employee does there |
|---|---|---|
| **Peer Cases** | See real cases of AI used on real work | Browse, read, comment, upvote, reuse a prompt |
| **Ideas Lab** | Suggest what AI tools should exist next | Post an idea, upvote others' ideas |
| **Skill Lab** | Practice using AI with zero stakes | Do 5-minute exercises, no real data, no judgment |
| **Learning Partners** | Find people with similar curiosity | Join or start a POD (interest group) |

The hub page is the four cards plus a one-sentence framing: *"Real cases, real practice, real ideas, real people. This is how AI becomes part of how we work."*

#### 4.4.3 Sub-module: Peer Cases

##### 4.4.3.1 What it is

A **case library** of real AI-assisted runs that employees have chosen to share. Every entry is a snapshot of one workflow completion: the task, the prompt used, the AI output (with its original Confidence Indicator), what the employee verified, what they changed, and a short note about what it helped with and how much time it saved.

Each case is **submitted by an employee**, **visible immediately** upon submission (no approval queue), and **governed by community signals** afterward: upvotes, comments, and — for the manager-badged comments — a soft signal of senior endorsement.

##### 4.4.3.2 The Prompt Dictionary, as a view

The same case data has a **second view mode**, called **Prompts**. The toggle sits at the top of the Peer Cases sub-module: **Cases | Prompts**.

- **Cases view (default)**: cards organized around the *case* — who did what task, what was the outcome.
- **Prompts view**: cards organized around the *prompt* — what was the prompt, what workflow does it power, how many people have used or upvoted it.

The Prompts view **is** the Prompt Dictionary. It exists here, embedded in Peer Cases, rather than as a separate module — because a prompt outside the context of a real case is a piece of text on a wall; a prompt inside a verified peer case is a tool with provenance.

##### 4.4.3.3 What a card shows

**Cases view card:**
- Short title (the employee's "what did this help with" note)
- Role + task tags (e.g., Reconciliation Analyst · Discrepancy Explanation)
- Confidence level at time of use (🟢 / 🟡 / 🔴)
- Time saved (employee-reported, in minutes)
- Submitter's name + role badge (Employee / Manager)
- 👍 upvote count
- 💬 comment count (with a small badge if a manager has commented)

**Prompts view card:**
- Prompt text snippet (first ~120 chars)
- Workflow it powers (linked)
- Original contributor's name + role
- 👍 upvotes, "used by N people"
- CTA: **"Try this prompt in a workflow"**

##### 4.4.3.4 Case detail page

Opening a case card reveals the full run:
- The full prompt
- The original AI output (with its original Confidence Indicator preserved)
- The employee's verification record (which checklist items they checked)
- Their final edited version
- The "what it helped with" note + time saved
- A **comments section** (see below)
- An **upvote button**
- A **"Try this in a workflow"** CTA, which deep-links into the corresponding workflow with the prompt pre-loaded

##### 4.4.3.5 Comments — the soft quality mechanism

Comments are how Peer Cases maintains quality without an approval gate.

- **Anyone can comment** — employees, managers (Director does not log in, so does not comment).
- **Authorship always shows the role**: "Comment from a Manager" / "Comment from an Employee."
- **Anonymity is optional but role is not**: a commenter can choose "Post anonymously" → display becomes *"Anonymous Employee"* or *"Anonymous Manager"*. The role label is never hidden.
- **Manager comments carry a small badge** next to the comment. This is the **replacement trust signal** for the removed manager-approval gate (Section 2 Principle 4): a case endorsed in a manager's comment carries visible weight, while a case flagged in a manager's comment carries visible caution — without ever stopping the case from being published.

##### 4.4.3.6 The soft removal process

If a case contains something genuinely problematic — wrong information, accidental client data, a prompt that violates a boundary — the process is:

1. Anyone (employee, manager) leaves a comment explaining the concern.
2. The **original author** is notified and is expected to either revise (edit) the case or take it down.
3. If neither happens within a reasonable window, a small inline notice appears on the case: *"This case has unresolved concerns from the community."* The case remains visible.
4. No automatic deletion. No punishment. No manager override.

This is the explicit **soft process** — designed so a single manager comment cannot become a unilateral takedown, and so an unresolved concern is publicly visible rather than silently buried. The asymmetry — comments can flag, but only the author can delete — is what protects against the manager-bias risk while preserving the social pressure to maintain quality.

##### 4.4.3.7 What Peer Cases deliberately does not do

- No approval queue.
- No leaderboards, weekly winners, or contributor rankings.
- No threaded replies on comments (one level deep; no flame wars).
- No private messaging between users.
- No editing of someone else's case.
- No view of who *didn't* upvote.

#### 4.4.4 Sub-module: Ideas Lab

##### 4.4.4.1 What it is

A board where employees post **ideas for AI tools or workflows that don't exist yet** but they wish did. Anyone can post; anyone can upvote. The top-voted idea is committed to **be actually built** (in the prototype's narrative — for the demo, this is the social contract Ideas Lab makes visible, not a real engineering pipeline).

##### 4.4.4.2 Why it exists

Employees using AI on real work will inevitably notice: *"I wish there were a tool that did X."* Without an outlet, that energy dissipates. Ideas Lab captures it and turns it into a **pull signal** — what the organization should build next, surfaced from the people closest to the work.

It is the **forward-looking** counterpart to Peer Cases's backward-looking case library. Peer Cases says: *"here's what we've done."* Ideas Lab says: *"here's what we want next."*

##### 4.4.4.3 What's in it

- An idea board, sortable by **most upvoted**, **most recent**, **least seen** (to prevent only the top ideas getting attention).
- Each idea card: title, short description, submitter (with role badge, anonymizable in the same way as case comments), upvote count, comment count.
- A **"Top idea this quarter"** highlight at the top, visually distinguished. The narrative around this is *"this is being scoped for build"* — in the prototype, this is a static showcase; in a real deployment, it would tie to an actual roadmap commitment.
- A submission button: title + 1–2 sentence description + optional task family tag.

##### 4.4.4.4 What Ideas Lab deliberately does not do

- No leaderboard of submitters.
- No "ideas you should upvote" recommendations.
- No public visibility of who downvoted (there is no downvote — only upvote or absence of upvote).
- No comment threads beyond one level (same as Peer Cases).

#### 4.4.5 Sub-module: Skill Lab

##### 4.4.5.1 What it is

A library of **short, no-stakes practice exercises** — typically 5 minutes each — that let employees feel out AI tools without using real data and without anyone watching their performance.

This is where the **gamification lives**. Skill Lab has progress bars, completion check-ins, and practice streaks — because here, gamification is appropriate: it's a practice space, not a workplace.

##### 4.4.5.2 Why it exists separately from Workflows

Workflows is for **real work**. Skill Lab is for **practice**. They look superficially similar (both involve AI input/output), but they serve opposite needs:

| | Workflows | Skill Lab |
|---|---|---|
| Data | Real (employee's actual work) | Fake (mocked scenarios) |
| Stakes | Real (Audit Trail, accountability) | None |
| Verification | Required (gates submission) | Optional (it's practice) |
| Gamification | None (it's a regulated environment) | Yes (it's a sandbox) |
| Time per session | As long as the task takes | ~5 minutes |

Mixing them was considered and rejected — putting streaks into Workflows would have made serious work feel like a game, which is exactly the wrong tone for reconciliation and approvals.

##### 4.4.5.3 What's in it

- A **library of exercises**, grouped by skill (prompt writing, output verification, recognizing low-confidence signals, etc.).
- Each exercise: a fake scenario, a guided interaction, a "did you catch it?" reveal, no scoring beyond "completed."
- A **personal progress tracker** visible only to the employee themselves:
  - **Completion streak** (consecutive days with at least one exercise)
  - **Exercises completed** (count)
  - **Skill badges** (e.g., "Confidence Reader," "Prompt Tuner") — earned by completing exercise sets
- A **"start a 5-minute practice"** button on the Skill Lab home, which picks an exercise appropriate to the employee's recent activity.

##### 4.4.5.4 How Skill Lab connects to My Profile

Skill Lab is **the only place practice gamification lives**. But the **overall progression** (Beginner → Daily User → AI Expert → AI Champion) lives in **My Profile**, not here. The distinction:

- **Skill Lab progress** = practice-only metrics (streak, badges, exercises completed). Self-contained inside Skill Lab.
- **Overall progression in My Profile** = derived from *real* activity (workflows completed in Workflows, prompts contributed via Peer Cases, ideas posted in Ideas Lab) **plus** Skill Lab milestones as one input.

The boundary is: Skill Lab gamifies *practice*; My Profile reflects *growth*. They're related but not duplicates.

##### 4.4.5.5 What Skill Lab deliberately does not do

- No real data, ever.
- No public visibility of any employee's practice progress.
- No comparison to other employees.
- No connection to performance reviews or HR systems.
- No failure states — exercises can be "completed" but never "failed."

#### 4.4.6 Sub-module: Learning Partners (PODs)

##### 4.4.6.1 What it is

A directory of **interest-based groups** ("PODs") where employees curious about a particular AI tool or use case can find each other. Anyone can propose a POD; if others express interest, it forms.

##### 4.4.6.2 Why it exists

The deepest learning often happens **between peers**, not from official content. PODs give that peer learning a structure without forcing it. They are the **pull-based** counterpart to top-down training: employees self-organize because they're curious, not because they were told to.

The POD model also creates a soft on-ramp for the curious-but-hesitant: someone who isn't ready to "join" a POD can attend as an **observer** — listening without participating. This is the osmotic learning pattern preserved from earlier project work.

##### 4.4.6.3 What's in it

- A **POD directory**: cards for each active POD, showing topic, member count, host (if any), upcoming session if scheduled.
- A **"Propose a POD"** button: title, topic, what you'd like to explore. Sits in a "proposed" state until N people express interest, then "forms."
- A **"Join as observer"** option on each POD: lower-commitment than full membership; observers see schedule and materials but aren't expected to contribute.
- A connection to **My Profile's calendar**: any POD session the employee has joined (or is observing) shows up there as an upcoming event.

##### 4.4.6.4 What Learning Partners deliberately does not do

- No matching algorithm pairing individuals 1:1 (the original "learning partner" concept was 1:1 pairing; we are explicitly making it group-based instead, because 1:1 in a corporate setting requires too much social commitment to scale).
- No mandatory POD assignment.
- No public attendance records.
- No leaderboard of "most active POD members."

#### 4.4.7 How an employee uses Explore across the four sub-modules

An employee returning to Spark in week three might:

1. Open **Peer Cases** to see if anyone has shared a new reconciliation case. Spot one with a 🟡 Medium confidence, read what the person verified, upvote it.
2. Toggle to **Prompts view**, find a prompt with high upvotes, copy it, click "Try this in a workflow" — landing in Workflows with the prompt pre-loaded.
3. After running the workflow, return to Peer Cases and submit their own run as a case.
4. Drop by **Ideas Lab**, see that someone has proposed a tool they'd actually use, upvote it.
5. Open **Skill Lab** for a 5-minute exercise to extend a 4-day streak.
6. Notice that a new **POD** has formed on "AI for monthly audit prep" and join as an observer.

That entire loop is the **curiosity engine** doing what it was designed to do: small, voluntary, low-stakes steps that compound into habit.

#### 4.4.8 What Explore, at the module level, deliberately does not do

- **No publishing gate.** Everything goes live on submission.
- **No leaderboards anywhere** in Explore. (Skill Lab badges are visible only to the badge-holder; Ideas Lab upvotes are visible per-idea, not per-submitter.)
- **No identity reveal of upvoters** in any sub-module.
- **No cross-sub-module aggregation visible to others.** Other employees can't see "Maria has 12 cases, 4 Ideas, 38 Skill Lab exercises." That kind of aggregate exists only on **Maria's own** My Profile page.
- **No real-time notifications** of new content (no popups, no email digests in MVP).

### 4.5 Trust Center

#### 4.5.1 Purpose

Trust Center is where Spark stops talking about safety and starts **answering questions about it**.

Pledge says *"you have permission."* Workflows says *"here is the safe path on this task."* But neither answers the question that actually shows up in an employee's head most often: *"Wait — can I use AI on **this** specific thing?"* That question doesn't have a static answer. It needs a place to be asked, and a place to be looked up.

Trust Center is that place. It is **the single destination for specifics** — boundaries, FAQ, policy documents, a chatbot for live questions, and a named Director presence for the questions the chatbot can't confidently answer.

It is also where the Director role lives in Spark. The Director — typically from a domain like Enterprise Risk Management — is not a user of the product. They are a **named, accountable presence** inside this module: their endorsement frames the space, their rulings populate it, and their contact channel exists for escalation when the chatbot's answer is in doubt.

→ Serves Principles 2 (permission as protection), 3 (employees need somewhere to ask), and indirectly Principle 1 (the more specific the answer, the more verifiable the trust).

#### 4.5.2 Structure: a two-column module

Trust Center is organized around the difference between **asking** and **looking up**. These are two distinct employee behaviors — one is urgent and specific, the other is exploratory and general — and the module's information architecture makes the split visible.

| Column | What it's for | What's in it |
|---|---|---|
| **Ask** | I have a specific question right now | Chatbot · Director contact channel |
| **Look up** | I want to understand the rules | Boundaries · FAQ · Director endorsement & rulings · Document Resources |

On entering Trust Center, the employee sees both columns side by side, with the **Ask** column slightly more prominent (it's the active need; the **Look up** column is reference material).

#### 4.5.3 The "Ask" column

##### 4.5.3.1 Chatbot

A bounded chatbot that answers questions about AI usage at CIBC. In the prototype, the bot is **mocked** — it returns pre-written answers for a fixed set of demo questions, plus a generic "I'm not sure about that — would you like to ask the Director?" fallback. In a real deployment, it would be trained on CIBC's internal AI policy documents.

The bot's role is precisely scoped: it answers questions about **what is and isn't sanctioned**, not about how to do the work itself. It is not a productivity assistant; it is a policy assistant.

What the bot will answer (in the prototype):
- *"Can I use AI on KYC emails?"*
- *"What counts as client data for AI purposes?"*
- *"Is it OK to paste a reconciliation ledger into an AI tool?"*
- *"What do I do if AI gives me an answer I'm not sure about?"*

What the bot deliberately won't do:
- Generate prompts or draft work content (that's Workflows).
- Give legal advice.
- Make rulings on questions it isn't confident about — it routes those to the Director.

##### 4.5.3.2 Director contact channel

When the chatbot's answer is uncertain — or when the employee themselves wants a more authoritative response — a **"Ask the Director instead"** button is available. This opens a small form:

- Question title (one line)
- Description (a few sentences of context)
- Related task category (Reconciliation / Email-Approval / Other)
- An optional checkbox: *"It's OK to publish this question and its answer to the Director's rulings library."*

Submitted questions enter the Director's queue (the Director, recall, is not a user of the product — the prototype represents their responses as pre-authored mock content). The employee sees their question in a **"My questions"** sub-view with status *Pending* or *Answered*.

The contact channel is **employee-facing**. Managers can also use it (managers are employees in this product, with the single exception of pledge editing). There is no separate "manager escalation" — the original Director Channel concept has been deliberately retired in favor of this single shared channel.

##### 4.5.3.3 Why both, not just one

The chatbot handles **volume** — the dozens of small policy questions employees would otherwise either guess at or stop to ask a manager. The Director channel handles **weight** — the questions that genuinely need a named human's judgment. Having both, with a clear escalation path from one to the other, means:

- Employees get fast answers to easy questions without burning a Director's time.
- Hard questions get the seniority they deserve.
- Neither path becomes a bottleneck.

This is the structural replacement for the manager-to-director escalation that used to exist in earlier designs.

#### 4.5.4 The "Look up" column

##### 4.5.4.1 Boundaries

A reference table answering the question *"for a given task, can I use AI on it?"* For each task in scope:

- Task name (e.g., "Drafting a discrepancy explanation")
- Allowed? (✅ Yes / ❌ No / ⚠️ Conditional)
- Human review required? (and if so, what kind)
- Notes / caveats
- A link, where applicable, into the corresponding workflow

Tabs separate the two task families: **Reconciliation** and **Email & Approvals**.

Disallowed tasks remain visible in the table, grayed out, with no workflow link. **This is deliberate**: employees need to see what is *not* permitted, not just what is. Invisibility creates ambiguity, and ambiguity is the fear we are dissolving.

Boundaries is the **definitive reference** in Spark. When the Pledge mentions "tasks I encourage" or "tasks I want my team to check with me first," those task names are drawn from this same vocabulary. When the chatbot answers a question about whether a task is allowed, it's reading from this same table. There is one source of truth for "what is allowed," and it lives here.

##### 4.5.4.2 FAQ

The questions employees would otherwise ask out loud — but often don't, because asking feels socially expensive:

- *"What happens if the AI is wrong and I used its output?"*
- *"Is my AI usage being tracked individually?"*
- *"Can I use AI on tasks not listed in Boundaries?"*
- *"Are my prompts confidential?"*
- *"How do I escalate something the FAQ doesn't cover?"* → routes to the Ask column.

Each FAQ item is short, plainly written, and where relevant, linked to either a Boundary entry or a Director ruling that grounds the answer.

The FAQ is **maintained by the program team**, not crowd-sourced. This is a deliberate exception to Explore's peer-authored ethos: in this column, **authority is the point**. A community-edited FAQ would reintroduce the very ambiguity Trust Center exists to remove.

##### 4.5.4.3 Director Endorsement & Rulings

This is where the Director shows up as a named presence.

**Director Endorsement (top of section)**
A short, signed statement from the Director — a paragraph or two — framing the spirit in which AI use is being sanctioned from the risk side of the organization. It carries the Director's name, title (e.g., *"Director, Enterprise Risk Management"*), and the date. This is the **risk-side counterpart** to the enterprise pledge in Pledge: where the enterprise pledge says *"we encourage you to explore,"* the Director endorsement says *"and here is the guardrail within which exploration is safe."*

**Director Rulings library (below the endorsement)**
A growing library of resolved questions, each consisting of:

- The original question (anonymized — the asker's name is never shown)
- The Director's ruling
- The task category it applies to
- The date it was ruled

Rulings come from two sources:
1. Questions employees have submitted through the **Ask the Director** channel and chosen to make public.
2. Standing rulings the Director publishes proactively, without an incoming question (for clarity on common ambiguities).

The Director is described in this module as **reviewing the library periodically** — refreshing the endorsement when policy shifts, retiring rulings that no longer apply, adding new ones as patterns emerge. This periodic-review framing is what gives the library its weight: it isn't just a static FAQ; it's an actively maintained body of judgment.

##### 4.5.4.4 Document Resources

A short, curated list of links to the actual CIBC policy documents that govern AI use — things like the internal AI policy, the data classification guide, the client-information handling rules. In the prototype, these are **sample placeholders** (e.g., *"CIBC AI Acceptable Use Policy [sample]"*).

This section is intentionally last and intentionally short. Most employees will never click through; the documents exist for the rare case where someone genuinely needs the source text. Their presence signals that the rest of Trust Center is grounded in real policy, not invented.

#### 4.5.5 How an employee uses it

**Scenario A — quick question, easy answer.**
Sarah, mid-task, isn't sure if she can paste an email thread into AI when the thread contains a colleague's name (no client). She opens Trust Center, types the question into the chatbot, gets an answer in 5 seconds, goes back to work.

**Scenario B — quick question, hard answer.**
Sarah asks the bot whether she can use AI on a thread that mentions a *client* by name in the subject line but not in the body. The bot's answer hedges. She clicks **Ask the Director instead**, fills the short form, checks "OK to publish if helpful." Two days later, she receives a notification: Director ruled, published as a ruling. She reads the ruling, sees herself anonymized, and now knows — and so does every other employee who hits the same question.

**Scenario C — exploratory browsing.**
A new employee opens Trust Center on day one. They don't have a question yet. They click into Boundaries, scan the Reconciliation tab, read three FAQ entries, glance at the Director's endorsement. Five minutes later they close the tab — not because they got an answer to anything specific, but because they now have a mental map of where the lines are. That map is what makes them willing to use Workflows tomorrow.

#### 4.5.6 What Trust Center deliberately does not do

- **No live AI model** behind the chatbot in MVP. All responses are mocked.
- **No real Director login or Director-facing UI.** The Director appears as content (endorsement, rulings) and as a destination (the contact form), not as a logged-in user.
- **No manager-only escalation path.** The Director channel is open to all employees (managers included), replacing the earlier manager-to-director-only channel.
- **No public list of who asked what.** Askers are anonymized in published rulings; "My questions" is private to the asker.
- **No comments or discussion on rulings.** Rulings are authoritative statements, not conversation threads.
- **No editing of Boundaries or FAQ by employees or managers.** This content is program-team-owned. (Proposed changes can be raised via Ideas Lab or directly to the Director.)

#### 4.5.7 Why this design, not a thinner one

Trust Center ended up being the heaviest module in Spark — five distinct pieces of content (chatbot, Director channel, Boundaries, FAQ, rulings, documents) across two columns. We considered splitting it into two modules. We rejected that, because the entire module answers a single question — *"what are the specifics?"* — from multiple angles. Splitting would force employees to guess which sub-module their question belongs in, which is the exact friction Trust Center exists to eliminate.

The two-column structure (Ask / Look up) is the compromise: one module, one destination, but a visible signal about *how* to engage with it depending on whether you have a specific question or want to browse the rules.

### 4.6 My Profile

#### 4.6.1 Purpose

My Profile is the **private mirror** of an employee's AI journey.

Every other surface in Spark is shared space — pledges are public, workflows leave audit trails, Explore is peer-visible, Trust Center rulings are organization-wide. My Profile is the one place that belongs entirely to the individual: a quiet, personal view of *what I've done, how I've grown, and what's coming up*.

It exists because curiosity, once sparked, needs **somewhere to see itself accumulate**. Without that, every workflow run feels like an isolated event. With it, the seventh run feels different from the first — not because the task got easier, but because the employee can see themselves becoming someone who uses AI as part of their work.

→ Serves Principle 6 (progression is personal, not performative).

#### 4.6.2 Where it lives

My Profile is reached from the **avatar in the top-right corner** of the persistent nav. It does not appear in the main nav. It is not the landing page. It is not surfaced in any other module. This placement is deliberate: the page is **opt-in by the user**, not pushed at them.

#### 4.6.3 What's on it

My Profile is structured as four stacked sections, in order of psychological weight (most personally meaningful at the top).

##### 4.6.3.1 Section 1 — Progression

A horizontal progression bar with four stages:

**Beginner → Daily User → AI Expert → AI Champion**

The employee's current stage is clearly marked. The bar shows how far they are from the next stage, and — critically — a one-line note framing what each stage means:

- *Beginner* — *"You're getting started. Your goal is to feel safe trying."*
- *Daily User* — *"AI is part of your weekly rhythm. Most employees stop here, and that's the goal."*
- *AI Expert* — *"You've gone deeper. Optional, for the curious."*
- *AI Champion* — *"You help others learn. Optional, for those who want to."*

The framing matters as much as the bar. **Daily User is explicitly named as the destination for most people.** Expert and Champion are explicitly framed as optional. This is the structural defense against progression becoming a performance expectation: the product itself tells the employee that stopping at Daily User is success, not underachievement.

Progression is computed from a blend of real activity:
- Workflows completed
- Peer Cases submitted via Explore
- Prompts contributed (via Peer Cases)
- Ideas posted in Ideas Lab
- Skill Lab milestones (as one input among several, not the dominant one)

The exact thresholds are tunable in mock data; the prototype ships with each demo persona placed at a stage that makes the demo story land.

##### 4.6.3.2 Section 2 — Personal Wins

A small dashboard of numbers, all derived from real activity:

- **Time saved** (cumulative, in minutes/hours) — summed from Audit Trail entries' employee-reported time-saved figures
- **Tasks completed** (count) — number of workflow runs
- **Prompts contributed** (count) — Peer Cases submitted that included a new prompt
- **Ideas posted** (count)

Each number is clickable, linking back to the source surface: clicking "Tasks completed" opens the employee's own list of past workflow runs (private to them); clicking "Prompts contributed" opens their own Peer Cases.

This section is the **evidence layer** behind the progression bar. The progression bar says *"you're a Daily User"*; Personal Wins shows *the actual record* that puts them there. The combination is what makes progression feel earned rather than gamified.

##### 4.6.3.3 Section 3 — What's Next

A short, dynamic list of suggestions:

- **One workflow to try** — picked from workflows the employee hasn't run yet, weighted toward their role.
- **One Skill Lab exercise** — picked to extend a streak or open a new skill badge.
- **One Peer Case to read** — a recent peer case in the employee's task family.
- **One idea to weigh in on** — an Ideas Lab post with active voting.

This section is **lightweight nudging, not gamification pressure**. It exists because employees who already feel safe and want to do a little more often don't know *what* to do next; the page proposes specific, small, optional next steps.

Each suggestion is dismissible. Nothing tracks whether the employee acted on it.

##### 4.6.3.4 Section 4 — Calendar

A simple chronological list of upcoming events the employee can choose to attend:

- **Workshops** (organization-run AI sessions)
- **POD discussions** (from Learning Partners — including PODs the employee has joined or is observing)
- **Quarterly idea sessions** (organization-wide events where top-voted Ideas Lab submissions are reviewed)

Each event shows date, title, format (in-person / virtual), and a "Add to my calendar" affordance.

In the prototype, the calendar is **display-only** — clicking an event shows a detail card but does not actually integrate with a real calendar system. This is explicit (Section 3.6, link #12): the calendar exists in MVP to **demonstrate that Spark connects an employee's individual journey to organization-wide rhythms**, not to function as a real scheduling tool.

#### 4.6.4 What My Profile is, and what it is not

My Profile **is**:
- Private to the employee.
- A reflection of activity that has already happened or is opt-in upcoming.
- Pulled together from existing data on other surfaces — it does not generate new data of its own.

My Profile **is not**:
- A leaderboard, public ranking, or comparison view.
- Visible to managers, directors, HR, or any other employee.
- A feeder for performance evaluation.
- A place where progression *gates access* to anything elsewhere in Spark (a Beginner has the same access to every workflow, Peer Case, Trust Center ruling, etc. as a Champion).
- A notifications surface (no inbox, no unread counters).

#### 4.6.5 How a manager experiences My Profile

The same way an employee does. Their profile shows their *own* progression, their *own* Personal Wins, their *own* suggestions and calendar. There is no team aggregate, no "my reports' progression," no manager-only widget.

This is the strictest possible application of the employee-centric principle: even the people with the most legitimate interest in seeing aggregate adoption data (managers) don't see it inside this product. If CIBC wants adoption analytics at the program level, that's a separate tool with separate governance — not a feature inside Spark, where surveillance perception would corrode trust.

#### 4.6.6 What My Profile deliberately does not do

- No comparison to other employees, ever.
- No rank within team / department / organization.
- No leaderboard, no "top contributor" panel, no "people like you" suggestions.
- No badges visible to others. (Skill Lab badges are visible on My Profile but not exported anywhere external.)
- No streak pressure for real work — the only streaks live in Skill Lab (practice), not in Workflows (real work).
- No deletion of historical activity. Employees can't erase their Audit Trail entries, but they also can't *show them to anyone* — they're private by default.

#### 4.6.7 Why this design, not a richer one

A richer profile — with team comparisons, badges visible to peers, manager dashboards over employees — would have been the conventional choice. We rejected it for one reason: the moment progression becomes visible to someone else, **it stops being personal growth and starts being performance**. And the moment AI adoption becomes performance, the trust engine breaks.

Spark's premise is that habit forms when employees feel safe, curious, and unobserved. My Profile is the unobserved part. Its restraint is the feature.

---

## 5. User Journeys

> Spark has two logged-in users: **Employee** and **Manager**. The Director is not a user (Section 4.5.1). These two journeys describe what a real person does, over time, with the product — not the demo path, which is a separately curated walkthrough in Section 6.

### 5.1 Employee Journey — Sarah, Reconciliation Analyst

**Starting state:** Sarah has heard her department is encouraging AI use. She's curious but hesitant. Her core fear is not that AI will be wrong — it's that *she* will carry the consequences if she uses it and the output turns out to be wrong.

#### Day 1 — First contact

Sarah opens Spark for the first time. She lands on `/` — no top nav, just a welcoming opening. She sees the hero: *"Welcome to Spark, Sarah"* and the title **"Your AI Journey"** with a short framing sub-line.

Her eye moves down. She sees the **Pledge card**, with a one-line preview of the enterprise pledge. The card's CTA reads *"View your team's pledge."* She clicks.

She lands on `/pledge`. She reads the **enterprise pledge** — one paragraph from CIBC framing the spirit of AI experimentation. She selects **Operational** from the department list. Her manager's pledge appears: a short statement signed by name, dated, listing the tasks her manager encourages her to try AI on, and the tasks her manager wants her to check first.

She returns to Landing (via the top nav's "Home" link, which appeared the moment she left `/`). She glances at the three module cards — Workflows, Explore, Trust Center — but doesn't click them today. Total time: 3 minutes. She has not used AI yet. But her psychological barrier has dropped: *this isn't corporate posturing — my actual manager said this, in writing, with a date on it.*

#### Day 2 — First workflow

Sarah has a real reconciliation discrepancy to explain. She opens Spark, glances at the Landing page, and clicks the **Workflows** card. (On subsequent visits, she'll use the top nav directly, but today she's still learning the layout.)

She picks her role, then picks "Discrepancy explanation."

She sees the **boundary recap** at the top — allowed, low risk, human review required. She pastes her discrepancy data and clicks Run with AI. The output appears with a **🟡 Medium** Confidence Indicator and an inline note: *"The date range in your input was ambiguous; verify the period covered."*

She reads the note. She expands the **side-by-side verification** panel — source data on the left, AI output on the right. She checks four verification items, edits one sentence in the output, marks verified, and clicks submit.

An **Audit Trail** is generated: the task, the prompt, the original output, the confidence level, the items she verified, her final edited version, her name, the timestamp. A confirmation screen offers two options: *Use this output* or *Submit as a case*. She picks **Submit as a case**, adds a short note ("Helped me draft the explanation in 5 min instead of 25"), and submits.

Total time on the AI portion: 6 minutes. What she feels: *I did the human part. There is a record. I am safe.*

#### Day 5 — First time as a peer

Sarah returns to Spark, this time without a specific task. She uses the top nav to open **Explore** directly. She sees the Explore hub — four entry cards.

She clicks **Peer Cases**. Among the cards she sees her own submission from Day 2, now with 3 upvotes and one comment from a manager (badged) saying *"Good catch on the date range — this is a pattern worth sharing."* She reads two other peers' cases in her task family, upvotes one, and toggles to the **Prompts view**. She finds a prompt with 12 upvotes that looks useful, clicks **Try this prompt in a workflow**, and lands back in Workflows with the prompt pre-loaded.

Before leaving, she clicks **Skill Lab** from Explore and does a 5-minute exercise on recognizing low-confidence signals. Her practice streak ticks to 1.

#### Week 3 — Habit forming

Sarah is now running Workflows on most of her reconciliation work. She's submitted 4 cases, 2 of which have manager-badged comments. She drops by **Ideas Lab** and upvotes a proposed tool for monthly audit prep. She sees that a **POD** has formed around that same topic and joins as an **observer** — she's not ready to contribute but wants to listen.

She clicks her avatar in the top nav and opens **My Profile** for the first time. She sees her progression bar: she's between *Beginner* and *Daily User*. The Personal Wins section shows 18 tasks completed, 47 minutes saved cumulatively, 4 prompts contributed. *What's Next* suggests one workflow she hasn't tried. The Calendar shows the POD's first session next week.

She closes the tab. She's not doing this because she was told to. She's doing it because, at this point, it's just how she works.

### 5.2 Manager Journey — David, Operational Team Manager

**Starting state:** David manages 8 operational employees. He's been told to "support AI adoption" but doesn't have a clear way to do that without overstepping. He also has his own reconciliation and approval work to do.

The single most important fact about David's journey: **he is an employee in Spark, with one extra capability.** His day-to-day use of the product mirrors Sarah's. The difference is one button.

#### Day 1 — Setting the tone

David lands on `/`. He sees the same hero — *"Welcome to Spark, David"* — and the same **"Your AI Journey"** title. The **Pledge card** is sized the same as Sarah sees it, but the CTA reads *"View or edit your team's pledge."*

He clicks the card. He lands on `/pledge` and navigates to **Operational**. He sees the pledge area — currently showing placeholder text *"Your department's manager has not published a pledge yet."* Next to it, an **Edit this pledge** button.

He clicks it. He's routed to `/pledge/edit`, a dedicated editing page. The form has a free-text statement field, two multi-select fields ("tasks I encourage" and "tasks I want my team to check with me first"), both drawing from the shared task vocabulary in Trust Center's Boundaries. He writes a short pledge in his own voice, selects 3 encouraged tasks and 2 check-first tasks, clicks *Preview as employees will see it*, scans the preview, then clicks **Save**.

He's routed back to `/pledge`, now showing his published pledge with his name and the current date. The pledge is immediately visible to every employee in his department on their next Pledge visit. No approval, no notification flood, no broadcast. Just a published commitment with his name on it.

#### Week 1 — Using the product as an employee

David himself runs a Workflow on his own approval queue work — he's a user of Spark, not just a gatekeeper. He submits a case. He drops by Explore's Peer Cases and reads what his team has been sharing.

He sees Sarah's discrepancy explanation case from Day 2 of her journey. He leaves a comment: *"Good catch on the date range — this is a pattern worth sharing."* His comment carries the **Manager badge**. The comment is now visible on Sarah's case as a soft endorsement.

#### Week 2 — Soft moderation

David sees a case from another team member that contains a prompt referencing what looks like a real client name. He leaves a comment: *"Could you redact the name in the prompt? Otherwise the case is solid."* The badged comment is visible to the author and the community. The author edits the case the next day. No queue, no takedown, no escalation.

A different week, a different case has a concern that the author doesn't act on. After the configured window, the case gains a small inline notice: *"This case has unresolved concerns from the community."* It remains visible. David did not need to delete it; the system surfaced the disagreement honestly.

#### Ongoing — Same Profile as anyone

David clicks his avatar and opens **My Profile**. He sees *his own* progression bar, *his own* Personal Wins, *his own* Calendar. There is no "my team's progression," no "employees who haven't used AI this week," no aggregate dashboard.

This is by design. If David wants to know whether his team is adopting AI, he can see it the same way anyone else can — by reading Peer Cases in Explore, where his team's submissions are visible by name. Spark gives him no surveillance overlay. His tools for "supporting AI adoption" are: **his pledge**, **his badged comments**, and **his own visible use of the product**. That is the entire manager toolkit.

---

## 6. Demo Journey

> A scripted walkthrough for the project deliverable. Single coherent path, two role switches (Employee → Manager → Employee). State specs included so the prototype's behavior is unambiguous to whoever builds it.

> **Demo personas:** Sarah (Employee, Operational, Reconciliation Analyst) · David (Manager, Operational)

### 6.0 Pre-demo state

Before the demo begins, the mock data is pre-seeded:

- Enterprise pledge: published.
- Operational department pledge by David: published.
- 5 Peer Cases in Explore across both task families, with varying upvote counts and one manager-badged comment.
- 3 Ideas in Ideas Lab, one prominently upvoted.
- 1 active POD ("AI for monthly audit prep") with 4 members.
- 2 Director rulings published in Trust Center.
- Sarah's My Profile is set to **Beginner**, with 2 prior workflow runs and 1 case contribution from prior days.

The demo opens logged in as **Sarah**.

### 6.1 Step 1 — Landing page

**User enters** `/`

**Sees:**
- **No top nav.** Landing is the only page without one.
- Top: hero with *"Welcome back, Sarah"* and the title **"Your AI Journey"** with a short framing sub-line.
- Upper middle: **Pledge card**, labeled "Pledge," with a one-line preview of the enterprise pledge and the CTA *"View your team's pledge."*
- Lower middle: **three module cards** side by side — Workflows / Explore / Trust Center — each with a one-line description.
- Bottom: hint bar — *"💡 Need to check what's allowed? → Go to Trust Center for more information."*

**Clicks:** the Pledge card.

**Jumps to:** `/pledge`

**State specs:**
- *Success state*: all four sections render; cards are interactive.
- *Failure state*: not applicable in MVP (no auth, no async load that can fail meaningfully).
- *Empty state*: not applicable (Landing is static).

### 6.2 Step 2 — Pledge

**User now sees (and the top nav appears for the first time):**

```
[✦ Spark → /]   Home   Trust Center   Explore   Workflows   [👤]
```

**On the Pledge page:**
- Top: enterprise pledge — one paragraph.
- Below: department selector with 4 departments (Operational, Risk, Finance, Technology).
- Below the selector: department pledge area.
- Footer pointer: *"Need to check the rules for a specific task, or ask a question? → Go to Trust Center."*

**Clicks:** *Operational* in the department selector.

**Sees the pledge appear:** David's name, title, date, statement, "tasks I encourage" list, "tasks I want my team to check first" list.

**State specs:**
- *Success state (Operational selected)*: David's full pledge displays.
- *Empty state (Risk / Finance / Technology selected)*: placeholder text — *"Your department's manager has not published a pledge yet."* No Edit button (Sarah isn't a manager anyway).
- *Failure state*: not applicable.

**Clicks:** *Workflows* in the top nav.

**Jumps to:** `/workflows`

### 6.3 Step 3 — Workflows entry

**User sees:**
- Two role tiles: *Reconciliation Analyst* · *Approval Processor*
- Below: "Most-used workflows this month" — 3 cards (mock).

**Clicks:** *Reconciliation Analyst* tile → then *Discrepancy explanation* workflow card.

**Jumps to:** `/workflows/reconciliation/discrepancy-explanation`

**State specs:**
- *Success state*: tiles render, workflow cards render with mock metadata (used by N people, est. time saved).
- *Empty state*: not applicable in MVP (workflows are always pre-seeded).
- *Failure state*: not applicable.

### 6.4 Step 4 — Workflow run

**User sees, in order down the page:**

1. **Boundary recap callout** — *"Allowed · Human review required · Low risk."* Link: "See full Boundaries → Trust Center."
2. **Input panel** — text area + *Use sample input* button + *Run with AI* button.
3. **Prompt panel** — sanctioned prompt visible, with attribution "Prompt from [Case title] · 12 upvotes."
4. **AI output panel** — initially empty.
5. **Side-by-side verification panel** — initially collapsed.
6. **Outcome CTAs** — initially disabled.

**Clicks:** *Use sample input* → *Run with AI*

**AI output panel populates with:**
- Mocked output text.
- **🟡 Medium** Confidence Indicator at the top.
- Inline note: *"The date range in your input was ambiguous; verify the period covered."*

**State specs for Confidence Indicator:**
- *🟢 High*: output panel has green pill at top, no inline rewrite requirement, verification checklist is short (2–3 items).
- *🟡 Medium*: amber pill at top, inline note appears, verification checklist is medium (4 items). Sample input is wired to produce this state in the demo.
- *🔴 Low*: red pill at top, inline note appears, verification checklist is long (5+ items) **and** includes a mandatory edit step — *Mark as verified* button stays disabled until the output text has been modified.

**Clicks:** expands the verification panel. Checks all 4 items. Edits one sentence in the output. Clicks *Mark as verified*.

**Outcome panel activates with two CTAs:** *Use this output* · *Submit as a case*

**Clicks:** *Submit as a case*

**Jumps to:** `/workflows/reconciliation/discrepancy-explanation/submit`

### 6.5 Step 5 — Submit as a case

**User sees a pre-filled submission form:**
- Workflow name, prompt used, original output, confidence level, verification checklist outcome — all read-only.
- Editable fields: *"What did this help you with?"* (short text) · *"Estimated time saved (minutes)"* (number).
- *Submit* button.

**Types:** *"Drafted the discrepancy explanation in 5 min instead of 25."* / *20*

**Clicks:** *Submit*

**Sees a confirmation screen:** *"Your case has been published to Explore."* CTAs: *View my case* · *Return to Workflows*.

**Clicks:** *View my case*

**Jumps to:** `/explore/cases/[newCaseId]`

**State specs:**
- *Success state*: confirmation renders, case appears in Explore immediately.
- *Failure state*: not applicable in MVP (no real persistence; submission is local).
- *Empty state*: not applicable (case is being created, not viewed).

### 6.6 Step 6 — Switch role to Manager

> **Demo narrator beat:** *"Sarah's case has just been published. Let's see what her manager experiences."*

**Demo action:** use the **role switcher** (a small dev-only control in the corner — visually understated, present only for demo purposes; in real use, users would log in with their own credentials). Switch from Sarah to David.

**Jumps to:** `/` (re-landing as David)

**User (now David) sees:**
- Same Landing layout.
- Pledge card now reads *"View or edit your team's pledge."*

**Clicks:** *Explore* in the top nav directly (skipping the Landing cards — David is here on Explore business).

**Jumps to:** `/explore`

### 6.7 Step 7 — Manager engages with a Peer Case

**User sees the Explore hub:** four cards — *Peer Cases · Ideas Lab · Skill Lab · Learning Partners.*

**Clicks:** *Peer Cases*

**Sees the case list view, sorted by most recent.** Sarah's new case is at the top, with **0 upvotes, 0 comments.**

**Clicks:** Sarah's case card

**Jumps to:** `/explore/cases/[sarahsCaseId]`

**Sees the full case detail:**
- Title, role/task tags, 🟡 Medium confidence at time of use.
- Full prompt, full original output, verification record, final edited version, *"what it helped with"* note, time saved.
- Comments section: empty.
- Upvote button: 0.
- *Try this in a workflow* CTA.

**Clicks:** Upvote → counter ticks to 1.
**Clicks:** *Add a comment* → types *"Good catch on the date range — this is a pattern worth sharing."* → clicks Post.

**Comment renders with:** David's name · **Manager badge** · timestamp.

**State specs for Comments:**
- *Empty state*: *"No comments yet. Be the first to weigh in."*
- *Success state (Employee comment)*: name (or "Anonymous Employee" if anonymized), no badge.
- *Success state (Manager comment)*: name (or "Anonymous Manager"), small Manager badge next to name.
- *Unresolved-concerns state*: if a case has comment(s) flagged as concerns and the author hasn't responded within the configured window, a small inline notice appears at the top of the case: *"This case has unresolved concerns from the community."* The case remains visible. (Not exercised in the live demo, but the state must exist; demo narrator mentions it.)

### 6.8 Step 8 — Manager edits the pledge

**Clicks:** Spark logo (top-left) → returns to `/`.

**Clicks:** the *"View or edit your team's pledge"* card.

**Jumps to:** `/pledge`.

**Navigates to Operational** in the department selector. **Clicks:** *Edit this pledge*.

**Jumps to:** `/pledge/edit` — a dedicated editing page.

**Sees the editor pre-filled with the current pledge.** Adds a sentence: *"Including new patterns like the date-range catch from this week."* Clicks *Preview as employees will see it*, scans the preview, clicks **Save**.

**Routed back to:** `/pledge` with the updated pledge visible, new date stamped.

**Sees confirmation banner at top:** *"Your pledge has been updated. Everyone in Operational will see this on their next visit."*

**State specs:**
- *Success state*: pledge re-renders with new statement and updated date.
- *Empty state (new pledge, never published)*: editor opens with empty fields and placeholder text *"Write your team's pledge…"*
- *Failure state*: not applicable in MVP.

### 6.9 Step 9 — Switch role back to Employee, show the loop closing

**Demo action:** switch role back to Sarah.

**Jumps to:** `/`

**Clicks:** *Explore* in top nav → *Peer Cases* → her own case.

**Sees:** her case now has **1 upvote** and **1 manager-badged comment** from David.

**Demo narrator beat:** *"This is the moment the loop closes — Sarah's contribution has been seen, endorsed, and shaped the pledge her department now operates under."*

### 6.10 Step 10 — Show Trust Center briefly

**Clicks:** *Trust Center* in top nav.

**Jumps to:** `/trust-center`

**Sees the two-column layout:**
- Left (Ask): Chatbot panel · *Ask the Director instead* button.
- Right (Look up): Boundaries table · FAQ · Director Endorsement & Rulings library · Document Resources.

**Demo narrator beat:** *"When Sarah has a question that the pledge doesn't answer, she comes here. The chatbot handles volume; the Director handles weight. The rulings library is how one Director's judgment becomes a resource for hundreds of employees."*

**Clicks:** one ruling in the Director Rulings library to show its detail (anonymized asker, ruling text, task category, date).

**State specs:**
- *Success state (chatbot)*: mocked answer renders for any of 4 pre-seeded demo questions. For other inputs: *"I'm not sure about that. Would you like to ask the Director?"* with a button → opens the Ask form.
- *Empty state (My questions in Ask)*: *"You haven't asked the Director anything yet."*
- *Success state (rulings list)*: rulings render with anonymized asker label.
- *Empty state (rulings list)*: *"No rulings have been published yet."* (Not exercised; demo data has 2 rulings pre-seeded.)

### 6.11 Step 11 — Show My Profile briefly

**Clicks:** avatar (top-right).

**Jumps to:** `/profile`

**Sees four sections:**
1. **Progression bar**: Beginner → **Daily User** (current) → AI Expert → AI Champion. Sarah's marker between Daily User and AI Expert after today's activity.
2. **Personal Wins**: time saved, tasks completed, prompts contributed, ideas posted.
3. **What's Next**: one workflow, one Skill Lab exercise, one Peer Case, one idea.
4. **Calendar**: one upcoming POD session, one workshop.

**Demo narrator beat:** *"This is the only place where Sarah sees herself accumulate. It's private. Her manager doesn't see this. HR doesn't see this. That privacy is the feature."*

**State specs:**
- *Success state*: all four sections render with Sarah's mock data.
- *Empty state (Personal Wins, brand-new employee)*: each metric shows 0 with placeholder text *"Your first workflow will count here."*
- *Empty state (Calendar)*: *"No upcoming events. Browse Learning Partners to find a POD."*
- *Empty state (What's Next)*: *"Nothing to suggest right now — explore on your own."* (Rare; usually populated.)

### 6.12 End of demo

**Total demo time:** ~6 minutes for the core path (steps 1–9). Steps 10 and 11 add ~1 minute each as optional depth.

**The closing line for the narrator:** *"Spark works because trust comes first, curiosity comes second, and the product never confuses one for the other."*

---

*End of design logic v2.0 (Sections 1–6). Technical specification (file structure, data schemas, `.cursorrules`) to follow as a separate document.*
