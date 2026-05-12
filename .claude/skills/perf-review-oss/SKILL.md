---
name: perf-review-oss
description: Open-source HR / performance / OKR / comp tools surveyed for data models and UX patterns. Companion to perf-review-competitors (which covers the commercial SaaS side).
---

# Open-Source HR Tools Survey

Reference for stealing **data-model shapes and feature scoping** for the Qonto perf-review demo. Where `perf-review-competitors` shows the *polished UX* (Lattice, Lucca, Figures), this skill shows the *underlying schemas* that real production HR systems converge on — because OSS code is the only place those schemas are public.

Raw READMEs per repo live at `/Users/kevinduchier/code/qonto/research-raw/oss/<repo>/README.md`.

## Active Projects

| Repo | Stars | Last commit | Stack | Features in scope for us | License |
|---|---|---|---|---|---|
| [hcengineering/platform](https://github.com/hcengineering/platform) (Huly) | 25.9k | 2026-05-12 | TS / Svelte | HRM + ATS modules in same workspace; project mgmt primitives | EPL-2.0 |
| [frappe/hrms](https://github.com/frappe/hrms) | 7.96k | 2026-05-12 | Python (Frappe) / Vue | **Full Performance Management module: Appraisal, Appraisal Cycle, KRA, Goal trees, Feedback** | GPL-3.0 |
| [ever-co/ever-gauzy](https://github.com/ever-co/ever-gauzy) | 3.69k | 2026-05-12 | TS / NestJS / Angular | **Goals + KPI + Key Results model with weights, alignment, owners**; time-tracking | AGPL-3.0 |
| [domenicosolazzo/awesome-okr](https://github.com/domenicosolazzo/awesome-okr) | 1.77k | 2026-05-11 | Curated list | OKR mental-model references; OKR Scorecard templates from Google re:Work | CC0 |
| [horilla-opensource/horilla](https://github.com/horilla-opensource/horilla) | 1.22k | 2026-05-11 | Django / Bootstrap | Recruitment + onboarding + perf module (lightweight) | LGPL-2.1 |
| [OrangeHRM/orangehrm](https://github.com/OrangeHRM/orangehrm) | 1.05k | 2026-05-12 | PHP | Veteran HRMS (Starter edition open) — modules are reference-only | GPL-3.0 |
| [BurningOKR/BurningOKR](https://github.com/BurningOKR/BurningOKR) | 169 | 2026-04-18 | Java Spring + Angular | OKR-only, company alignment focus | Apache-2.0 |
| [oslokommune/okr-tracker](https://github.com/oslokommune/okr-tracker) | 89 | 2026-05-11 | Vue + Firebase | **Live OKR tracker — Periods, Departments, Products, KPIs as first-class** | MIT |
| [opf/openproject](https://github.com/opf/openproject) | (large) | 2026-05-12 | Ruby on Rails | Project mgmt + work packages — adjacent, not direct perf | GPLv3 |
| [wso2/people-ops-suite](https://github.com/wso2/people-ops-suite) | 5 | 2026-04-24 | TS (Ballerina services) | New (sparse README); "performance reviews + leave + promotions" as configurable apps | Apache-2.0 |

## Stale or Reference-Only

- **OrangeHRM** — the open-source "Starter" edition; full perf/comp modules are paid Enterprise. Useful only for the public DB schema and module taxonomy.
- **BurningOKR** — small, single-purpose. Last meaningful update April. Good for showing a company-tree alignment UI exists in OSS, but not a serious dependency.
- **awesome-okr** — list itself stopped curating active products around 2018-2019. The closed-source side (BetterWorks, Weekdone, Gtmhub, Koan, Ally.io, 15Five, Zugata) is more useful as a "who built this category" map than a tool to study.

## Recurring Data Model Patterns

These are the entities that show up across **2+ projects**, with the standout fields. Citations point to the source repo's schema.

### Goal / Objective

Appears in: frappe/hrms, ever-gauzy, BurningOKR, okr-tracker (Firebase `objectives` collection).

```text
Goal {
  id
  name / goal_name           — required, short label
  description                — rich text
  owner                      — Employee | Team | Department (polymorphic)
  lead                       — second person; separate from owner (ever-gauzy)
  level                      — 'company' | 'department' | 'team' | 'individual' (ever-gauzy `level: string`)
  parent_goal                — self-ref for OKR cascading (frappe `parent_goal` + lft/rgt nested-set)
  start_date / end_date / deadline
  status                     — enum
  progress                   — 0..100 percent, derived from KRs
  kra / strategic_initiative — link upward to a Key Result Area
  appraisal_cycle / period   — links into the cycle entity
}
```

**Standout field worth stealing**: `level: 'company' | 'department' | 'team' | 'individual'` (ever-gauzy). One column gives you the entire OKR cascade view without separate tables.

**Standout pattern**: Frappe stores Goal as a **modified preorder tree** (`lft`, `rgt`, `parent_goal`, `is_group`). That's how they render a recursive goal tree at query speed. Overkill for a demo, but if Qonto wants "show all goals rolling up to my VP" without N+1 queries, this is the canonical answer.

### Key Result (KR)

Appears in: ever-gauzy (very rich), okr-tracker, BurningOKR.

```text
KeyResult {
  id
  name
  description
  type                       — 'number' | 'percentage' | 'currency' | 'boolean' | 'milestone'
  unit                       — 'sales' | 'visitors' | 'people' | 'items' | 'clients'  (ever-gauzy enum)
  initialValue / targetValue / currentValue (update)
  progress                   — computed 0..100
  weight                     — 1x / 2x / 4x (ever-gauzy KeyResultWeightEnum)
  owner / lead               — Employee
  hardDeadline / softDeadline — two-deadline pattern, not just one
  status
  goalId                     — parent Goal
  taskId / projectId         — link to delivery work
  kpiId                      — link to KPI metric source (auto-update from telemetry)
}

KeyResultUpdate {           — append-only log of progress entries
  id
  owner                      — who updated
  progress
  update                     — the delta value
  status                     — 'on_track' | 'at_risk' | 'off_track' (RAG)
  keyResultId
  createdAt
}
```

**Standout fields worth stealing**: `weight (1x / 2x / 4x)`, `hardDeadline / softDeadline`, `KeyResultUpdate` as a separate append-only entity (audit trail + comments-on-progress in one shape).

### Appraisal / Performance Review

Appears in: frappe/hrms (canonical, mature), horilla, OrangeHRM, wso2/people-ops-suite.

Frappe's model is the strongest in the OSS world (mature, multi-cycle, calibration-ready):

```text
AppraisalCycle {
  cycle_name
  start_date / end_date
  status                     — 'Draft' | 'In Progress' | 'Completed'
  kra_evaluation_method      — config: how KRA score rolls up
  final_score_formula        — `Code` field (Python expression!)
                               formula combines goal_score / kra_score / feedback_score
                               with configurable weights
  calculate_final_score_based_on_formula : bool
  appraisees                 — Table: which employees are in this cycle
  filters: department / branch / company / designation — population scoping
}

Appraisal {                   — one per employee per cycle
  employee → Employee
  appraisal_cycle → AppraisalCycle
  appraisal_template → AppraisalTemplate
  appraisal_kra              — Table of KRA evaluations
  goals                      — Table of goal evaluations
  self_ratings               — Table (self-appraisal section)
  total_score / self_score / avg_feedback_score / final_score   — four scores
  reflections                — free-text self-reflection
  rate_goals_manually : bool — toggle between auto goal-score and manual rating
  remarks
}

EmployeePerformanceFeedback { — peer / upward / downward feedback
  employee → Employee         (the subject)
  reviewer → Employee         (the writer)
  reviewer_designation       — for "Manager" / "Peer" / "Skip-level" framing
  appraisal_cycle → AppraisalCycle
  appraisal → Appraisal      (optional: bind to a specific cycle artifact)
  feedback_ratings           — Table of (criterion, rating) pairs
  feedback                   — rich text
  total_score                — derived
}

KRA { title, description }    — definitional; reusable across cycles
AppraisalTemplate             — defines weight of goals vs KRAs vs feedback for a population
```

**Standout pattern**: `final_score_formula` as a code field. The HR admin writes `goal_score*0.4 + kra_score*0.4 + feedback_score*0.2` once per cycle, system computes. This is the OSS answer to "how do enterprises configure their composite-score rules" and you almost never see it documented in commercial product docs.

**Standout pattern**: four separate scores (`total_score`, `self_score`, `avg_feedback_score`, `final_score`) coexist on the same Appraisal record. You don't replace one with another — you store all of them and let the calibration UI show the deltas. Lattice's "self vs manager rating gap" view is essentially showing `self_score` vs `total_score` from this shape.

### Cycle / Period

Appears in: frappe (Appraisal Cycle), okr-tracker (`periods` collection), ever-gauzy (implicit via Goal dates).

The minimum useful shape:

```text
Period {
  name (e.g., "H1 2026")
  start_date / end_date
  status                     — 'Draft' | 'Active' | 'Closed'
  scope: company / department / product   — okr-tracker pattern: periods are per-entity, not global
  parent_period              — optional, for nested quarterly-inside-annual
}
```

okr-tracker's choice — `Periods` belong to a `Product` or `Department` rather than being global — matters for scale-ups: VP of Engineering can run a different cadence than VP of Sales without forking the whole tool.

### Feedback / Rating Criteria

Appears in: frappe (Employee Feedback Criteria + Rating), ever-gauzy (Candidate Criterions Rating), horilla.

```text
FeedbackCriterion {           — reusable across cycles
  name (e.g., "Drives outcomes")
  description
  scale: 1-5 / 1-10 / qualitative
  weight
  applicable_for: role / level / team
}

FeedbackRating {
  feedback → EmployeePerformanceFeedback
  criterion → FeedbackCriterion
  score
  comment
}
```

The Frappe pattern is **criteria as separate definitional entities** rather than embedded in the form template. This means: change the criterion definition once, every cycle using it updates. That's how Lucca/Lattice avoid "we redefined the rating scale in Q3 and now the data is incomparable."

### Compensation

Mostly **absent from OSS**. None of the surveyed repos has a real Compensation Cycle / Salary Band / Merit Matrix model. Frappe has payroll (Salary Structure, Salary Slip, Salary Component) but not merit cycles or banding. ever-gauzy has `employee.rate` and `income`/`expense` but no comp planning.

Implication: **comp-cycle UX has no OSS reference implementation**. Anything you build for the Qonto demo on the compensation side is competing against Figures / Pave / Ravio / Assemble (all closed-source). The data-model design freedom is real here.

## Recurring UX Patterns

- **Cycle-as-container + Population scoping** (Frappe, Lucca-style 3-step echo): admin defines the cycle, picks the population by filters (department/branch/designation), system fans out per-employee records. Don't make admins create one appraisal at a time.
- **Self-appraisal tab + Reviewer tab + Manager tab in the same record** (Frappe Appraisal has explicit `self_appraisal_tab`, `feedback_tab`, `kra_tab`, `employee_details_tab`). Tabs > separate forms because the manager wants to see the self-rating while writing theirs.
- **Goal cascade view** (BurningOKR, ever-gauzy): tree visualization of company → department → team → individual goals with progress aggregation up the tree. BurningOKR's whole reason to exist is this view.
- **OKR Scorecard** (Google re:Work template, via awesome-okr): one-page A4/letter view with objective + 3-5 KRs + status RAG + comments. Print-friendly. Worth offering as an export from the demo.
- **Two-deadline (hard/soft) for KRs** (ever-gauzy): soft is the team's target, hard is the manager's drop-dead. UI surfaces both as a range. Almost no commercial tool does this.
- **Append-only KeyResultUpdate log** (ever-gauzy): every progress change is a row with author, value, RAG status, and optional comment. Becomes the activity feed for free.

## Worth-Cloning Ideas for the Qonto Demo

1. **`final_score_formula` as a configurable expression on the cycle** — admin RH writes `goal*0.5 + competency*0.3 + feedback*0.2` once, system computes per employee. Shipping this in the demo signals "we understand that every company has a different rubric" and immediately differentiates from any tool that hard-codes weights. **Source: frappe/hrms `appraisal_cycle.final_score_formula`.**
2. **Four-score storage on the Appraisal record** (`self`, `peer_avg`, `manager`, `final`) — never overwrite, always store all of them. Enables the Lattice "self vs manager gap" view and calibration's "where did the score change between draft and final" trail with zero extra modeling. **Source: frappe/hrms `appraisal` doctype.**
3. **`level: company | department | team | individual` as one column on Goal** — single-table OKR cascade. Filter by `level` to show the right tree slice. **Source: ever-co/ever-gauzy `IGoal.level`.**
4. **`KeyResultUpdate` as append-only check-in log with RAG status** — solves "give me a weekly check-in feed" and "show me the goal's history" with one entity. The Lattice/15Five weekly check-in pattern is fundamentally this shape. **Source: ever-co/ever-gauzy `IKeyResultUpdate`.**
5. **KRA / Competency as definitional entities, not template fields** — define "Drives outcomes" once with description and scale, reuse across cycles, compare scores over years without schema migrations. **Source: frappe/hrms `kra`, `employee_feedback_criteria`.**
6. **Per-product / per-department Periods, not one global calendar** — VP of Engineering can run quarterly, VP of Sales can run trimesters, no fork needed. **Source: oslokommune/okr-tracker `periods` belonging to `products` / `departments`.**
7. **Hard + soft deadlines on KRs** — single field pair that captures "team target" vs "drop-dead" without inventing two KR types. Lucca and Javelo both lack this; would be a small differentiator. **Source: ever-co/ever-gauzy `IKeyResult.hardDeadline / softDeadline`.**

## Avoid

- **Cloning Frappe HRMS's overall stack** — the Frappe framework's DocType / nested-set / Server Scripts model is powerful but it's an entire app platform. Adopt the *schemas*, not the framework, and stay close to whatever the Qonto demo's stack already is.
- **Modeling Compensation off OSS** — there's nothing serious here. Use Figures / Pave / Ravio / Assemble (commercial, in `perf-review-competitors`) as the references for comp UX and data model instead. OSS compensation data == payroll/payslip, which is not what the demo is about.
- **OrangeHRM as a structural reference** — the open Starter edition omits the modules we care about (Performance, Compensation), and the schema decisions are visibly 2007-era PHP. Use only if you need a feature-checklist sanity check.
- **awesome-okr's "Software" section** — last serious update years ago, includes shutdown products (Zugata, Statuspath, Kapta). Use the curated articles/templates, not the tool list.

## Sources

Raw README snapshots (fetched 2026-05-12) and key schema files:

- `/Users/kevinduchier/code/qonto/research-raw/oss/frappe-hrms/README.md` — plus DocType JSONs fetched live from `frappe/hrms/hrms/hr/doctype/{appraisal,appraisal_cycle,goal,kra,employee_performance_feedback}/*.json`
- `/Users/kevinduchier/code/qonto/research-raw/oss/ever-gauzy/README.md` — plus `packages/contracts/src/lib/goals.model.ts` (IGoal, IKeyResult, IKeyResultUpdate interfaces)
- `/Users/kevinduchier/code/qonto/research-raw/oss/okr-tracker/README.md` — Firestore collections list: `audit, departments, keyResults, kpis, objectives, organizations, periods, products, users`
- `/Users/kevinduchier/code/qonto/research-raw/oss/huly/README.md`
- `/Users/kevinduchier/code/qonto/research-raw/oss/burningokr/README.md`
- `/Users/kevinduchier/code/qonto/research-raw/oss/horilla/README.md`
- `/Users/kevinduchier/code/qonto/research-raw/oss/orangehrm/README.md`
- `/Users/kevinduchier/code/qonto/research-raw/oss/openproject/README.md`
- `/Users/kevinduchier/code/qonto/research-raw/oss/people-ops-suite/README.md`
- `/Users/kevinduchier/code/qonto/research-raw/oss/awesome-okr/README.md`
