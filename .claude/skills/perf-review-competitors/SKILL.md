---
name: perf-review-competitors
description: UX patterns from Workday competitors (Lattice, Leapsome, Lucca, Javelo, Figures, Pave, HiBob, 15Five). Use when designing perf or comp review screens.
---

# Competitor UX Patterns

Snapshot taken 2026-05-12 from product marketing pages only (no demo videos, no G2). Patterns are sourced from product-page copy and screenshot captions; treat as a *vocabulary primer*, not a feature audit. Raw pages: `/Users/kevinduchier/code/qonto/research-raw/competitors/<slug>/page.md`.

## Tools Surveyed

| Tool | URL | Best-known-for | French? | Star feature (page-level) |
|------|-----|---------------|---------|---------------------------|
| **Lattice** | lattice.com/products/performance | Modern perf platform — reviews + habits | EN | Splits "Performance" (reviews, talent reviews, PIPs, succession) from "Habits" (1:1s, updates, feedback, Q&A boards) |
| **Leapsome** | leapsome.com/product/performance-reviews | Flexible review builder + AI Review Assistant | EN/DE | AI Review Assistant — voice or type, evidence-based drafts, reframing suggestions |
| **Lucca (Poplee)** | lucca.fr/gestion-rh/entretiens | FR-compliance-grade entretiens | FR-native | Legal compliance for FR-mandated interviews (parcours pro, mi-carrière, fin de carrière, forfait jours) + 8-year bilan export |
| **Javelo** | javelo.io (now Tellent HR Grow) | Mid-market FR perf platform, recently acquired | FR/EN | Real-time objective tracking; rebranded into Tellent suite |
| **Figures** | figures.hr | FR/EU comp benchmarks + bands + pay-equity | FR/EN | 4-step flow surfaced on homepage: Benchmark → Salary Bands → Comp Review → Pay Equity |
| **Pave** | pave.com | US comp benchmarks (real-time) + comp review | EN | Real-time benchmark dataset (8.7K+ companies); positioned as "AI-powered" comp intelligence |
| **HiBob** | hibob.com/performance-management | All-in-one HRIS + perf | EN | Continuous-feedback narrative; 360 + check-ins integrated with HRIS records |
| **15Five** | 15five.com/products/perform | Reviews + Growth Studio + Kona meeting AI | EN | Drag-and-drop 9-Box Talent Matrix + Kona AI auto-takes 1:1 notes that feed reviews |

## Performance Review — Patterns Worth Stealing

Organized by the job-to-be-done. Each pattern lists which competitor(s) surface it.

### 1. Launching a cycle
- **Templated cycle builder with question bank** (Leapsome, Lucca, 15Five). Pre-built templates for annual / 360 / project-based / leadership / probation, plus a question bank — admin picks blocks rather than authoring from scratch.
- **"Launch in 15 min" speed promise** (15Five). Headline metric on the cycle setup flow — the wizard exists to compress admin friction.
- **Duplicate-a-campaign** (Lucca). Last year's campaign is the starting point for this year's. Implies a *campaign* object that's cloneable, not a fresh form every cycle.
- **Population targeting at campaign level** (Lucca): "ciblez les populations concernées et fixez des échéances claires" — filter by service, métier, site, country; add late joiners without restarting.
- **Anonymity & visibility toggles per question/block** (Leapsome). Granular: anonymous to peers vs visible to manager vs visible to subject.

### 2. Writing the self-review / manager review
- **AI Review Assistant with voice or type input** (Leapsome). Speak to the assistant → guided prompts, reframing suggestions, evidence-based drafts. Critical: positioned as "all under your control" — assistive, not authoritative.
- **AI pulls real signals into the draft** (15Five, Leapsome). Drafts cite past 1:1 notes, goal progress, peer praise, meeting takes. Kona Meeting Assistant (15Five) auto-captures 1:1 notes so reviews "practically write themselves."
- **Side panel with context while writing** (Leapsome "Reviews built on real insights"): past performance, peer feedback, goal progress visible in the same screen as the form.
- **Competency framework rendered as a rubric in the form** (Lucca, Leapsome). Each competency shows definition + level descriptors; self-evaluator clicks the level that matches.

### 3. Gathering 360 / peer feedback
- **Request peer feedback as a sub-flow inside the review** (15Five, Leapsome). Not a separate cycle; peers are nominated from inside the review form, with deadline + auto-reminders.
- **Visibility model: feedback aggregates into manager view** (Leapsome). Peer answers attribute or anonymize per question; manager sees the synthesis.
- **Real-time progress dashboard on completion %** (Lucca, Leapsome). Status states: non réalisé, en cours, en attente de validation, clôturé. Bulk-reminder action.

### 4. Calibration
- **Drag-and-drop 9-Box Talent Matrix** (15Five, Lattice "Talent Reviews"). Visual grid (performance × potential). Real-time adjustments during a calibration meeting; everyone sees the same canvas.
- **Heatmaps across multiple cycles** (Leapsome "People analytics"). Spot rating drift, manager leniency, team-level outliers.
- **Calibration as a managed step in the cycle, not an export** (15Five, Lattice). HR can lock managers from finalizing until calibration approves.

### 5. Finalizing / sharing with employee
- **Two-phase finalize**: manager submits → calibrator/HR approves → employee receives (implied across Lattice, 15Five). The employee never sees a number that hasn't been calibrated.
- **PDF / synthèse export for archive** (Lucca). FR-specific: legal evidence on demand for URSSAF.
- **Linked PIP creation** (Lattice, 15Five Growth Studio). If rating is low, the review converts directly into a PIP / IDP / succession nomination — no rekeying.

## Compensation Review — Patterns Worth Stealing

Less rich content from product pages (Pave and Figures are CTA-heavy, light on UI screenshots in markdown form), but the dominant patterns:

### 1. Budget allocation
- **Top-down budget envelope cascaded to managers** (implied by Pave's "Comp Review" product). HR sets total budget; managers see their share.
- **Live overspend / underspend indicators** at manager and HR level. (Standard in this category; Pave and Figures both call this out as the value prop.)

### 2. Manager recommendation flow
- **Per-employee row UI**: current salary | band position | benchmark percentile | proposed raise | proposed bonus | proposed equity | warnings (Pave, Figures). Spreadsheet-like, but with band visualization inline.
- **Band visualization on the same row** (Figures' "Salary Bands" + "Comp Review" combined). Manager sees where the employee sits in the band *before* recommending. This is the differentiator vs spreadsheets.
- **Justification text required for outliers** (industry standard, surfaced by Pave's "credibility" framing).

### 3. Calibration grid
- **Same drag-and-drop talent matrix used for perf** (15Five) doubles as a comp distribution view.
- **Distribution-vs-policy check**: red flag if the team's raise distribution skews wrong way against the target curve (Pave).

### 4. Approvals
- **Multi-level approval chain** with status per row (manager → skip-level → HR → CFO). Pave's "control + confidence + credibility" framing implies this.
- **Locked once approved** with diff-view if a change is requested.

### 5. Letter generation
- **Auto-generated comp letters** templated from approved values (industry standard, all comp tools).

## Information Architecture — Common Shapes

Three dominant layouts emerge:

1. **Two-pane review form** (Leapsome, 15Five, Lattice): question/section list on left, current question's form fields on right, context drawer (past feedback, goals, peer notes) toggleable on the far right.
2. **Campaign dashboard as the admin home** (Lucca, Leapsome): table of campaigns with status, % complete, deadline, owner — admin's daily view. Drill-down into per-employee status from there.
3. **9-Box / matrix canvas as the calibration view** (15Five, Lattice Talent Reviews): full-screen 3×3 grid, employee cards draggable between cells, side panel for the selected employee.

Cross-cutting nav pattern (Lattice, Leapsome, HiBob): the platform separates **"Performance"** (cyclical: reviews, talent reviews, PIPs, succession) from **"Habits / Continuous"** (1:1s, feedback, updates, goals). Same data, different mental model. Worth mirroring in Qonto's IA so users find perf cycles where they expect them.

## Anti-patterns to Avoid

- **Generic glossary pages as product pages.** HiBob's perf URL is a glossary article, not a product tour — easy to do, low signal for buyers.
- **AI assistant framed as authoritative.** Leapsome carefully writes "all under your control" — calibration of trust matters. Don't ship "AI writes your review" copy.
- **One mega-form per review.** All competitors break the form into sections/blocks with progress; nobody ships a scroll-of-doom.
- **Hiding band data from the manager during comp rec.** Spreadsheet exports lose this; band visualization inline is the point.
- **Treating 360 as a separate product.** Lattice, 15Five, Leapsome embed it inside the review cycle. A separate "360 tool" feels like a tax.
- **No campaign concept.** Lucca/Leapsome lean hard on "campagne" as a first-class object. Without it, every cycle is bespoke and unrepeatable.

## Top 5 Screens We Should Copy for the Qonto Demo

1. **Lattice's two-track nav** — split "Performance" (cycles) from "Habits" (continuous). Sets the mental model before the demo even starts.
2. **Leapsome's review form with context drawer** — left rail of sections, center form, right drawer with past 1:1s, goal progress, peer praise, prior reviews. This is the single most important screen for the demo.
3. **15Five's drag-and-drop 9-Box calibration canvas** — full-screen, draggable cards, live filters by team/role/manager. Sells "calibration as a meeting, not a spreadsheet."
4. **Figures' comp review row** — one line per employee with current salary, band position bar, benchmark percentile, proposed raise input, live budget-remaining counter at the top. The band bar is the visual that beats Excel.
5. **Lucca's campagne dashboard** — table of cycles with completion %, deadline, status filters, bulk-reminder action. The admin's home screen. FR-flavored: legal compliance badges visible per campaign type.

Bonus #6 if time: **Leapsome's AI Review Assistant chat** — keep the "you control the output" framing; show the assistant suggesting reframes on a draft, never replacing it.

## Sources

- `/Users/kevinduchier/code/qonto/research-raw/competitors/lattice/page.md` — https://lattice.com/products/performance
- `/Users/kevinduchier/code/qonto/research-raw/competitors/leapsome/page.md` — https://www.leapsome.com/product/performance-reviews
- `/Users/kevinduchier/code/qonto/research-raw/competitors/lucca/page.md` — https://www.lucca.fr/gestion-rh/entretiens
- `/Users/kevinduchier/code/qonto/research-raw/competitors/javelo/page.md` — https://javelo.io (redirects to Tellent HR Grow)
- `/Users/kevinduchier/code/qonto/research-raw/competitors/figures/page.md` — https://figures.hr/
- `/Users/kevinduchier/code/qonto/research-raw/competitors/pave/page.md` — https://www.pave.com/
- `/Users/kevinduchier/code/qonto/research-raw/competitors/hibob/page.md` — https://www.hibob.com/performance-management/ (glossary content, not a product page)
- `/Users/kevinduchier/code/qonto/research-raw/competitors/15five/page.md` — https://www.15five.com/products/perform/

Caveats:
- Product pages only — no in-app screenshots, no demo videos. Real UX may differ from marketing claims.
- Javelo has been folded into Tellent's "HR Grow" module; the standalone product page no longer exists.
- HiBob's `/performance-management/` URL serves a glossary article; their actual product tour lives elsewhere on the site.
- Pave and Figures product pages are CTA-heavy with limited UI detail in markdown form.
