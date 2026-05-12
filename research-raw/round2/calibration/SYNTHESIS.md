# Calibration UX — Exhaustive Pattern Library

Round 2 research synthesis for the Qonto perf demo. Tools surveyed: Lattice, Leapsome, Confirm, 15Five, Workday, Lucca Poplee, Culture Amp, Macorva, Greenhouse (recruiting, translated), Pave (comp-side). Plus academic critique of forced distribution and facilitation best practices.

Qonto philosophy guardrail: **help, don't decide**. AI surfaces patterns to managers; never delivers verdicts about employees.

---

## Tools surveyed

| Tool | Primary surface | Move people via | Bias surfacing | AI assist | Comments | Lock | Multi-user real-time | Notable |
|------|----------------|-----------------|----------------|-----------|----------|------|----------------------|---------|
| **Lattice** | 9-Box + Calibration Table (switchable) | Drag in box / cell edit in table / CSV bulk | Basic statistical outliers | None (Apr 2026) | Limited | Admin lock | No | Embedded analytics, group bulk config, scoped manager view |
| **Leapsome** | Distribution chart + Heatmap + Box grid | In-view edit | **Team-level heatmap** (cross-team fairness) | None named | Yes | Admin | No | Pick any 2 questions as box axes |
| **Confirm** | ONA-evidenced rating table | Move with evidence side-by-side; bulk | **Named: recency / affinity / visibility bias flags with ONA evidence** | **AI profile synthesis, AI auto-triage (15-20%)** | In-session comments | Yes | Designed for live 2-4h session | Audit trail per rating change |
| **15Five** | Talent Matrix + Calibration Table (paired, synced) | **Drag avatar between boxes**; hover-edit cell; CSV | Distribution display; outlier indicators | **AI Review Summaries** (multi-source) | **Threaded on each change** via dialogue bubble; @mentions; activity feed | Admin lock | Auto-save, live sync across sessions a participant is in | Renameable box labels; multi-session avatar badge |
| **Workday** | Configurable calibration views | Cell / bulk | Statistical outlier (AI) | Light | **Comments column on Activity Stream; tag employees; user attribution** | Yes | No live cursor | Splits Performance vs Talent calibration |
| **Lucca Poplee** | Form harmonization + post-hoc analysis | No matrix UI | None surfaced | No | No native comment-on-move | Campaign-level | No | French legal compliance; no calibration ritual |
| **Culture Amp** | Calibration View + Ratings Matrix | In-view edit + bulk import | **3-cycle history inline** (recency check) | None named | **Calibration Activity Log** (audit trail) | Yes | **Ratings Preview** async pre-step | Compare 3 past cycles per row |
| **Macorva** | AI workflow on top of review | Through review surface | **Risk Analysis flags biased language / unsupported statements** | **Radiant AI® with source citations** | Inline | n/a | n/a | "Human reviews flagged concerns" stance — closest to Qonto's "help, don't decide" |
| **Greenhouse** | Interviewer Calibration Report | n/a (analyze, not move) | **Per-rater distribution vs team mean** | None | n/a | n/a | n/a | **Surface lenient/strict raters by name** without naming any candidate as miscalibrated |
| **Pave** | Comp planning workflows | Approval flows + commenting | Pay equity / fairness analysis | Guidance prompts | **In-app commenting on approval flows** | Approval chain | No | "Stand behind every recommendation" — manager confidence framing |

---

## Calibration UI primitives — the building blocks

8 primitives recur across every serious tool. The Qonto demo should use 5-6 of these intentionally.

### 1. 9-Box grid (Performance × Potential, or any 2 axes)
- **Lattice, 15Five, Leapsome, Confirm, Culture Amp** all ship this.
- **Best implementation: 15Five** — drag avatar between boxes is the most direct manipulation; renameable labels; per-box filter that scopes the linked table.
- **Customization win: Leapsome** lets you set the axes to *any* two review questions (not just perf × potential).

### 2. Calibration Table (row-per-employee detail)
- Always paired with the grid for drill-down.
- **Best implementation: 15Five** — Manage Columns drawer (show/hide/reorder, persisted); yellow cell on change shows original (strikethrough) + new value side-by-side; flag/remove from session actions.
- **Differentiator: Culture Amp** ships 3-cycle history inline → "is this rating consistent with last two cycles?" is answerable without navigation.

### 3. Distribution / Bell-curve view
- Every tool. Two flavors:
  - **Org-level distribution**: are we shaping correctly overall.
  - **Team-level distribution heatmap (Leapsome)**: which teams are over/under-rating vs the org mean. This is the **bias-surfacing distribution** — surfaces the manager pattern without naming a person.

### 4. Comment-on-move (threaded justification)
- **Best: 15Five** — dialogue bubble icon on each change opens a thread. @mentions. The change itself + the conversation about it are *bound to the same UI object*.
- **Workday**: comments column, can tag employees, full attribution history.
- **Confirm**: comments anchored to ONA evidence shown alongside.
- **The pattern**: every move that crosses a threshold (e.g., changes someone's rating) should *require or strongly prompt* a justification comment. This is what separates a calibration ritual from a casual rating tweak.

### 5. AI hover summary / synthesis
- **Confirm (GPT-4 ONA-informed profiles)** and **15Five (AI Review Summaries)** lead.
- The pattern: when manager hovers an employee row/avatar, AI surfaces a 2-3 sentence synthesis of multi-source signals (peer feedback, self-review, manager notes, prior cycles) — **with sources cited** (Macorva).
- **Anti-pattern**: AI delivering a verdict ("recommended rating: 4/5"). Qonto must not do this.

### 6. Lock state / sign-off
- Universal. Admin or facilitator locks the session; calibrated ratings flow into the published review.
- **Differentiator (15Five)**: managers can edit their original *comments* to align with the calibrated *rating* before sharing with the employee. Awkward but realistic — comments must match the final rating.
- **Pre-meeting prep (Culture Amp Ratings Preview, Confirm async)**: the lock happens after a *pre-step* where disagreements are surfaced asynchronously; live time is for contested cases only.

### 7. Visibility / permission filter
- **15Five's model is the cleanest**:
  - **HR admin**: sees demographics + everything.
  - **Contributor (calibration participant)**: sees custom attributes, no demographics.
  - **Manager**: sees original vs calibrated.
  - **Participant (employee)**: sees the rating that was published; no calibration history surfaced ever.
- Demographics fenced from contributors is the bias-protection pattern: you can't be moved up because you're "like" the room if the room can't see the demographic.

### 8. Multi-user / real-time mode
- **Almost nobody has true Figma-style multi-cursor calibration.** 15Five comes closest via auto-save + live sync + activity feed.
- Most calibration is still "facilitator drives in a meeting, others watch / Slack their input."
- **Opportunity**: this is the biggest UX gap in the category. A genuine live-collab calibration room (cursors, presence, threaded reactions on each move) is unclaimed territory.

---

## Bias-surfacing patterns — how to flag anomaly without naming a person as biased

Ranked by sophistication.

### Tier 1 — Rater-level pattern surfacing (HIGHEST VALUE)
**Greenhouse Interviewer Calibration Report** is the canonical example.
- Y-axis = rater (manager). X-axis = their rating distribution. Reference line = team/org mean.
- Surfaces: "Manager A gives 60% top ratings; team mean is 22%."
- Powerful because: it names the **rater pattern**, not the ratee. Manager can defend the deviation with evidence; pattern is consistent across all their reports, so it's clearly about the rater, not any one person.
- **For Qonto**: ship a per-manager distribution panel in the calibration view. Compare each manager to all-managers mean for this cycle and to themselves across last 3 cycles.

### Tier 2 — Named bias flags with evidence (Confirm)
- AI flags "recency bias", "affinity bias", "visibility bias" on specific employees.
- Each flag carries the evidence that triggered it (ONA collaboration data, time-distribution of cited examples).
- **For Qonto**: if shipping AI flags, name the bias type and *always* show the evidence inline. Never flag without rationale.

### Tier 3 — Team-level distribution heatmap (Leapsome)
- Color-coded grid: teams on one axis, rating buckets on the other. Hotspots = anomalies.
- Surfaces over/under-rating teams without naming individuals.
- **For Qonto**: cheaper to build than per-employee bias AI. High signal-to-noise. **Recommended for Phase 1 demo.**

### Tier 4 — Multi-cycle history inline (Culture Amp)
- 3 cycles of ratings in the row → recency bias visible at a glance.
- "Same employee, 3, 3, 5" → why the jump?
- **For Qonto**: cheap, ship it.

### Tier 5 — Demographic distribution check (facilitation best practice)
- Are ratings distributed similarly across demographic groups?
- HR-admin-only (privacy).
- **For Qonto**: post-calibration check, not in-session. Show drift only above a statistical threshold so it's signal, not noise.

### Anti-patterns to avoid
- **"You are biased"** language anywhere in the UI. Always frame as *pattern* not *personal*.
- **AI prescriptive verdicts** ("recommended rating: 4"). Augment, don't decide.
- **Demographic data visible to anyone but HR admin during calibration.** Bias-protection requires fencing.

---

## Calibration meeting modes

### Async pre-meeting (Culture Amp Ratings Preview, Confirm AI synthesis)
- Calibrators review and react to manager-assigned ratings before the live session.
- Disagreements surface as deltas; live conversation only on contested cases.
- **Compresses 2-3 week cycles into single 2-4 hour live session (Confirm claim).**

### Synchronous live calibration (facilitator-driven)
- Neutral facilitator (HR, not a manager-of-reports-being-discussed).
- Intervention scripts: "Before we lock, let's check the bias list."
- Best tools (15Five) auto-save and live-sync so multiple people can be in the session simultaneously.
- **No tool yet ships true Figma-style cursors + presence.**

### Cross-team / cross-org calibration
- Workday's strength: multi-level workflows with custom approval chains.
- Pattern: roll calibrated team distributions up to a higher-level review of all-team distributions, surface anomalies (Team X has 5 of 6 in top bucket).

### Single-team check-in (no formal calibration)
- Lucca's model. Form harmonization, no ritual.
- Falls short for org-wide fairness; works for small companies with high trust + low headcount.

---

## Feature inventory for the Qonto demo

Schema: `id`, `name`, `description`, `primary_user`, `help_mode`, `ai_mode` (must be augment, never decide), `complexity`, `poc_fit` (1-5, 5 = must-have for demo).

| id | name | description | primary_user | help_mode | ai_mode | complexity | poc_fit |
|----|------|-------------|--------------|-----------|---------|------------|---------|
| C01 | Calibration session canvas | Top-level page binding a cohort to a review cycle with grid + table views | hr | structural | n/a | M | 5 |
| C02 | 9-box grid with drag-to-move | Drag avatar between boxes to change rating; per-box filter scopes table | manager | direct-manipulation | n/a | M | 5 |
| C03 | Configurable box axes | Pick any two review questions as x/y (not locked to perf × potential) | hr | flexibility | n/a | S | 4 |
| C04 | Calibration table with column manager | Row per employee; show/hide/reorder columns; preference persisted | manager | structural | n/a | M | 5 |
| C05 | Yellow-state cell on change | Cell shows original (strikethrough) + new value side-by-side after any rating change | manager | visibility | n/a | S | 5 |
| C06 | Comment-on-move thread | Dialogue bubble icon on each rating change opens threaded justification; @mentions | manager | accountability | n/a | M | 5 |
| C07 | AI multi-source synthesis on hover | Hover employee row → 2-3 sentence summary across self/peer/manager/prior cycles with citations | manager | context | augment | L | 5 |
| C08 | AI auto-triage (suggest who needs discussion) | Surface ~15-20% of employees whose ratings warrant review based on outliers, manager-pattern, or disagreement between rating sources | hr+manager | prioritization | augment | L | 4 |
| C09 | Per-manager distribution panel (Greenhouse pattern) | Per-rater rating distribution vs all-managers mean for this cycle + historical | hr | pattern-surfacing | n/a | M | 5 |
| C10 | Team distribution heatmap | Color-coded teams × rating-buckets matrix; hotspots = anomalies | hr | pattern-surfacing | n/a | M | 5 |
| C11 | Multi-cycle history inline | 3 prior cycles in each row of the calibration table — recency bias visible at glance | manager | context | n/a | S | 5 |
| C12 | Named bias flags with evidence | If flagging recency/affinity/visibility bias, always show the triggering evidence inline; manager can dismiss with reason | hr+manager | bias-surfacing | augment | L | 3 |
| C13 | Demographic distribution check (HR-admin-only) | Post-session, surface rating drift across demographic groups above a statistical threshold | hr | post-hoc audit | augment | L | 3 |
| C14 | Permission tiers (HR admin / facilitator / contributor / participant) | HR sees demographics; contributors see custom attributes only; participants never see calibration history | hr | bias-protection | n/a | M | 5 |
| C15 | Activity feed (audit trail) | All changes auto-logged with user attribution; export as audit log | hr | accountability | n/a | M | 5 |
| C16 | Async pre-meeting "Ratings Preview" | Calibrators react to manager ratings before the live session; deltas surface as agenda items | manager+hr | time-compression | n/a | M | 4 |
| C17 | Lock with manager-comment-realignment prompt | When locking, prompt managers to update their written feedback to match the calibrated rating before sharing | manager | consistency | n/a | M | 4 |
| C18 | Live calibration room (presence + cursors) | True multi-user real-time view of the session — cursors, presence dots, reactions on each move | hr+manager | collaboration | n/a | XL | 3 |
| C19 | Per-employee evidence drawer | Click name → full review history, peer feedback, prior comments, AI summary with sources | manager | context | augment | M | 4 |
| C20 | Facilitator intervention prompts | When facilitator clicks a flagged move, surface intervention scripts ("Walk us through one example from Q1") | hr (facilitator) | nudge | augment | M | 3 |

**Phase 1 demo recommendation (top picks):** C01, C02, C04, C05, C06, C07, C09, C10, C11, C14, C15. That's the calibration room with the highest-value bias surfacing (Tier-1 rater pattern + Tier-3 team heatmap + Tier-4 multi-cycle history) and the strongest accountability primitives (comment-on-move, audit trail, permission tiers), with AI augmentation only for synthesis (C07).

---

## Anti-patterns to call out in the demo narrative

1. **Forced distribution as a gate.** Hard quotas damage citizenship behavior, increase counterproductive behavior, and slow team work (Loberg et al. 2021; Schleicher et al. 2016). Use distribution as guidance, not gate.
2. **Bell-curve at team level.** Small teams (< 20) violate normality; forcing the shape manufactures fake variance.
3. **AI verdicts on employees.** "Recommended rating: 4/5" replaces manager judgment with machine judgment. Qonto's rule: AI augments managers, never replaces them.
4. **Secret-handshake calibrations.** No documented rationale, employees never see why their rating changed. Confirm calls this out; the audit-trail primitive (C15) solves it.
5. **Demographic data visible during calibration.** Bias-protection requires fencing; only HR admin sees demographic distributions, and only post-session.
6. **Annual-only calibration.** Mid-cycle check-ins keep talent picture current and reduce recency bias at year-end.
7. **Permanent box labels.** Treating 9-box placements as identities ("she's a B-player") rather than development inputs.
8. **One-tool monolith.** Workday's "process-heavy by design" critique. Calibration ritual should feel like a focused 2-4 hour event, not a 3-week workflow.

---

## Sources

### Tool documentation
- Lattice Talent Reviews: https://lattice.com/platform/performance/talent-reviews
- Lattice April 2026 product updates: https://lattice.com/blog/april-2026-product-updates
- Lattice help — Box View, Calibration Table View, Facilitator role, Calibration Groups (multiple URLs)
- Leapsome — Review calibrations, Running a calibration meeting, Calibrations playbook (multiple URLs)
- Confirm calibration: https://www.confirm.com/calibration
- Confirm enterprise calibration shootout (Confirm vs Workday vs Lattice): https://www.confirm.com/compare/enterprise-calibration-feature-shootout
- Confirm 9-box guide: https://www.confirm.com/blog/9-box-performance-review-talent-evaluation-guide
- 15Five calibration session: https://success.15five.com/hc/en-us/articles/4404620505371
- 15Five Talent Matrix: https://success.15five.com/hc/en-us/articles/360057179491
- Workday Calibration Comments: https://commitconsulting.com/blog/workday-calibration-comments
- Lucca Performance / Poplee Entretiens: https://www.lucca.fr/gestion-rh/entretiens
- Culture Amp Calibration Views: https://support.cultureamp.com/en/articles/10425688-create-and-share-calibration-views
- Culture Amp 2025 product updates: https://support.cultureamp.com/en/articles/10368650-performance-management-product-updates-2025
- Macorva — AI Risk Analysis, bias reduction: https://www.macorva.com/blog/how-ai-reduces-bias-in-employee-performance-reviews
- Greenhouse Interviewer Calibration Report: https://support.greenhouse.io/hc/en-us/articles/203941429-Interviewer-calibration-report
- Pave Compensation Planning: https://www.pave.com/products/compensation-planning

### Academic / critical writing
- Loberg, Nüesch, Foege (2021), "Forced distribution rating systems and team collaboration", J. Economic Behavior & Organization: https://www.sciencedirect.com/science/article/pii/S0167268121001827
- Schleicher et al. (2016), "Precarious curve ahead: The effects of forced distribution rating systems on job performance"
- Springer Management Review Quarterly (2023) systematic review on FDRS: https://link.springer.com/article/10.1007/s11301-023-00396-8
- Planche (Univ. Guelph) — Rater Reactions to FDRS thesis

### Facilitation best practices
- Sprad — Calibration Meeting Template (agenda, bias checks, scorecards)
- Sprad — Performance Review Biases: 12 examples with manager scripts
- Ravio — How to facilitate a calibration session
- Windmill — Facilitate a Calibration Session step-by-step
- Deel — 10 Best Practices for Productive Performance Calibration Meetings
