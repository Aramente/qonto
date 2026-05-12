# OSS Round 2 — Perf + Comp Deep Dive

Companion to `/Users/kevinduchier/code/qonto/.claude/skills/perf-review-oss/SKILL.md` (Round 1). Round 1 mapped which OSS projects exist and gave the headline data-model shapes. Round 2 goes **deeper into Frappe HRMS schemas** (the only mature OSS perf module), **wider into specialized perf/comp/calibration OSS** (verified by exhaustive `gh search`), and **confirms the state of the compensation-OSS world** (which is: there is almost none).

Raw artifacts live at `/Users/kevinduchier/code/qonto/research-raw/round2/oss/`:
- `frappe-hrms/*.json` — 12 DocType JSON files for the Performance module
- `<repo>/README.md` — verified-existence READMEs for every project named below

---

## Frappe HRMS — full schema reference

This is the **canonical OSS data model for performance reviews**. Frappe HRMS is GPL-3.0, actively maintained, used in production by thousands of companies, and the schema reflects 13+ years of real HR workflow iteration. Field-level breakdown below; the proposed Qonto data model should start from this shape and trim.

### Entity map (8 core tables + 4 child tables)

```
Appraisal Cycle (parent container — "H1 2026", "Q1 Review")
   ├── Appraisal (1 per employee per cycle)
   │     ├── child: Appraisal KRA[]   (auto-scored mode)
   │     ├── child: Appraisal Goal[]  (manual-rated mode)
   │     └── child: Employee Feedback Rating[] (self-ratings)
   ├── Goal[] (employee goals, tree-structured, link to cycle + KRA)
   └── Employee Performance Feedback[] (one per reviewer per appraisee)
         └── child: Employee Feedback Rating[]

Appraisal Template (reusable bundle: KRAs + rating criteria)
   ├── child: Appraisal Template Goal[]
   └── child: Employee Feedback Rating[] (criteria with weights, no scores)

KRA (atomic — "Customer Success", "Code Quality") — referenced by Goal + Appraisal KRA
Employee Feedback Criteria (atomic — "Communication", "Ownership") — referenced by Employee Feedback Rating
```

### Field-by-field

#### `Appraisal` (the central document — one per employee per cycle)

| Field | Type | Purpose |
|---|---|---|
| `naming_series` | Select | Auto-naming pattern `HR-APR-.YYYY.-` |
| `employee` | Link → Employee | The appraisee (required, indexed) |
| `employee_name`, `department`, `designation`, `company`, `employee_image` | fetched | Denormalized from Employee for snapshot-at-time-of-review |
| `appraisal_cycle` | Link → Appraisal Cycle | Required; binds the appraisal to the cycle's dates/settings |
| `start_date`, `end_date` | Date (read-only) | Fetched from cycle |
| `appraisal_template` | Link → Appraisal Template | Optional; populates KRAs + rating criteria |
| **`rate_goals_manually`** | Check | **Switch between two modes**: KRA-weighted auto from Goal progress, or manual goal-by-goal rating |
| `appraisal_kra` | Table → Appraisal KRA[] | KRA-mode rows: KRA + weightage + auto goal completion + weighted score |
| `goals` | Table → Appraisal Goal[] | Manual-mode rows: free-text goal + weightage + manual score + earned score |
| `goal_score_percentage` | Float (read-only) | Auto-aggregated goal score |
| `total_score` | Float (read-only) | Total weighted goal score |
| `remarks` | Text | Manager remarks |
| **`self_ratings`** | Table → Employee Feedback Rating[] | **Self-appraisal scores against the same criteria reviewers use** |
| `self_score` | Float (read-only) | Aggregated self score |
| `reflections` | Text Editor | Free-form self-reflection narrative |
| `avg_feedback_score` | Float (hidden, read-only) | Aggregated peer/manager feedback score |
| **`final_score`** | Float (read-only) | **Average of Goal Score + Feedback Score + Self Appraisal Score** (or custom formula from cycle) |
| `amended_from` | Link → Appraisal | Audit trail when correcting a submitted appraisal |
| `is_submittable: 1` | doctype flag | Doc has Draft / Submitted / Cancelled states with audit log |

**Standout pattern**: Appraisal is **submittable** (Frappe's accounting-doc concept). Once submitted, edits create an Amendment that points back via `amended_from`. This is how Frappe gets immutable review history for free, without separate `appraisal_history` tables.

#### `Appraisal Cycle` (the container — "H1 2026")

| Field | Type | Purpose |
|---|---|---|
| `cycle_name` (unique) | Data | "H1 2026 Review" |
| `company`, `start_date`, `end_date`, `description` | std | |
| **`kra_evaluation_method`** | Select | **`Automated Based on Goal Progress` \| `Manual Rating`** — set globally per cycle |
| **`calculate_final_score_based_on_formula`** + `final_score_formula` (Python expression) | Check + Code | **Custom weighting** of goal/feedback/self in final score |
| `status` | Select (Not Started / In Progress / Completed) | Cycle state machine with color coding |
| `branch`, `department`, `designation` (filters) | Link | Scope cycle to a subset of employees |
| `appraisees` | Table → Appraisee[] | Materialized list of employees in this cycle |
| `get_employees` | Button | Server action to populate appraisees from filters |

**Standout pattern**: cycles have **filter-then-materialize**. You set department/designation filters, hit a button, the system snapshots the list. You can then manually edit (add/remove people). The snapshot prevents new hires mid-cycle from appearing automatically.

**Stealable for Qonto**: `final_score_formula` as a Python expression is overkill, but the concept of "the cycle owns the weighting" (not the template, not the employee) is clean. One column on the cycle row, applies to every appraisal in it.

#### `Goal` (employee goal — tree-structured)

| Field | Type | Purpose |
|---|---|---|
| `goal_name`, `description` | std | |
| `employee` | Link | Goal owner (required, set-only-once) |
| `parent_goal` | Link → Goal (self-ref) | **OKR cascade** |
| **`is_group`** | Check | Folder-node vs leaf-node (only leaves get progress edited directly) |
| **`lft`, `rgt`, `old_parent`** | Int (hidden) | **Modified preorder tree** for fast subtree queries |
| `progress` | Percent | 0–100; read-only if `is_group` (rolls up from children) |
| `status` | Select (Pending / In Progress / Completed / Archived / Closed) | |
| `start_date`, `end_date` | Date | Fetched from cycle by default |
| `appraisal_cycle` | Link → Appraisal Cycle | Optional binding |
| **`kra`** | Link → KRA | **The link that lets goals roll up into KRA scores on the appraisal** — `mandatory_depends_on: !parent_goal && appraisal_cycle` |
| `user`, `company`, `employee_name` | fetched | Denormalized |

**Standout pattern**: nested-set tree (`lft`/`rgt`) for goal hierarchies. `nsm_parent_field: parent_goal` + `is_tree: 1` are Frappe primitives. You get "show all goals rolling up to the VP" in one indexed query instead of N+1 recursive selects.

**Standout pattern**: **leaf-goal-only progress entry**. `progress` is read-only when `is_group=1`. Parents aggregate their children. This is the OKR cascade pattern done correctly — you can't enter a fake percentage on a group goal.

#### `KRA` (atomic Key Responsibility Area definition)

| Field | Type |
|---|---|
| `title` (unique) | Data |
| `description` | Small Text |

Trivial table. Lives separately so it can be reused across templates, appraisals, and goals. Pure dimension table.

#### `Appraisal KRA` (child of Appraisal — auto-mode scoring row)

| Field | Type | Purpose |
|---|---|---|
| `kra` | Link → KRA | Which KRA |
| `per_weightage` | Percent | Weight of this KRA in the appraisal (must sum to 100) |
| `goal_completion` | Percent (read-only) | **Auto-computed** from progress of goals tagged with this KRA |
| `goal_score` | Float (read-only) | `goal_completion * per_weightage / 100` |

**Stealable**: this is the bridge between "employee owns goals" and "manager rates KRAs". The KRA score is a deterministic function of goal progress. No double data entry.

#### `Appraisal Goal` (child of Appraisal — manual-mode scoring row)

| Field | Type | Purpose |
|---|---|---|
| `kra` | Small Text | Free-text goal text (legacy: column is named kra but stores the goal description) |
| `per_weightage` | Float | Weight |
| `score` | Float | Manager-entered score (e.g. 0–5) |
| `score_earned` | Float (read-only) | `score * per_weightage` |

Note: this is the legacy/manual path. Modern Frappe nudges users into the auto-mode (`Appraisal KRA` + `Goal` tree).

#### `Employee Performance Feedback` (the peer/manager feedback document)

| Field | Type | Purpose |
|---|---|---|
| `employee` | Link → Employee | Appraisee |
| **`reviewer`** | Link → Employee | The person giving feedback (could be peer or manager) |
| `reviewer_name`, `reviewer_designation` | fetched | |
| `appraisal` | Link → Appraisal | Required — feedback is always attached to an Appraisal |
| `appraisal_cycle` | fetched from appraisal | |
| `added_on` | Datetime | When feedback was submitted |
| **`feedback_ratings`** | Table → Employee Feedback Rating[] | **Per-criterion rating + weightage** |
| `total_score` | Float (read-only) | Weighted average |
| `feedback` | Text Editor (required) | Free-text feedback |
| `is_submittable: 1` | flag | |

**Standout pattern**: every feedback record links to **both** the appraisee and the appraisal. No floating feedback. No "we collected feedback before deciding to review you." The feedback is bound to the cycle's appraisal at creation time. Solves the "feedback purgatory" problem where Lattice-style continuous feedback never gets pulled into the formal review.

#### `Employee Feedback Criteria` (atomic — e.g. "Communication")

| Field | Type |
|---|---|
| `criteria` (unique) | Data |

#### `Employee Feedback Rating` (child table — used in 3 places)

| Field | Type | Purpose |
|---|---|---|
| `criteria` | Link → Employee Feedback Criteria | |
| `per_weightage` | Percent | Weight of this criterion |
| `rating` | **Rating** (Frappe primitive — 5-star fieldtype) | The score, **only visible when parent is not a template** |

**Standout pattern**: the **same child table** is reused as:
1. Template definition (criteria + weights, no ratings)
2. Self-appraisal ratings (criteria + weights + self-rating)
3. Peer/manager feedback ratings (criteria + weights + reviewer-rating)

The `depends_on: doc.parenttype != "Appraisal Template"` toggles the `rating` field visibility based on context. **One table, three uses, zero duplication.**

**Stealable**: define rating criteria once on the cycle/template, then use the exact same row shape for every actor (self / manager / peers). The criteria + weights are immutable across the cycle; only the rating value differs.

#### `Appraisal Template` (reusable bundle)

| Field | Type | Purpose |
|---|---|---|
| `template_title` (unique) | Data | "Engineering IC L3-L5", "Sales Rep" |
| `description` | Small Text | |
| **`goals`** | Table → Appraisal Template Goal[] | KRAs + weights, no employee-specific data |
| **`rating_criteria`** | Table → Employee Feedback Rating[] | Criteria + weights, no rating values |

**Stealable**: templates are **per-role** (linked from Designation), not per-cycle. Same template applies across multiple cycles. The cycle owns dates + status; the template owns content shape.

#### `Appraisal Template Goal` (child — template's KRA row)

| Field | Type |
|---|---|
| `kra` | Link → KRA |
| `per_weightage` | Float |

### Frappe HRMS schema — composable patterns worth stealing

1. **Cycle as the container, template as the content shape, appraisal as the per-employee instance.** Three-layer separation. Lattice/Lucca conflate cycle and template.
2. **Final score = formula on the cycle** (default: avg of goal/feedback/self, override with Python expression). Single source of truth for weighting; no hidden per-appraisal logic.
3. **`is_submittable` + `amended_from`** = immutable review history without separate audit table.
4. **Nested-set goal tree** = fast OKR cascade queries.
5. **One child-table type, three parent contexts** (template / self / feedback) = no duplicated rating-row schemas.
6. **Goals belong to the employee**, not to the appraisal. The appraisal references goal progress via KRA aggregation. Goals outlive cycles.
7. **`rate_goals_manually` switch** lets the same Appraisal entity support both auto-from-progress (modern, OKR-aligned) and manual scoring (legacy, simpler).

---

## Specialized perf-review OSS

Round 2 search results filtered to anything genuinely related to perf review (most `gh search "performance review"` hits are Magento/ML/iOS-skills repos — discarded).

| Repo | Stars | Stack | License | What's interesting |
|---|---|---|---|---|
| [eduardogr/evalytics](https://github.com/eduardogr/evalytics) | 11 | Python (Tornado) + Google Workspace | Apache-2.0 | **Platform-free orchestration** — defines the *process* (peer assignment → review phase → end phase) and pluggable backends. Surveys live in Google Forms/Sheets. Glossary explicitly defines `Survey`, `Direct report`, `Peer`, `Eval reports` as first-class entities. The whole project is a **state machine over a perf-review cycle**, decoupled from data storage. Closest thing to "headless perf review." |
| [markash/threesixty](https://github.com/markash/threesixty) | 17 | Java/Spring Boot + Vaadin + MongoDB | n/a | 360 assessment + **"kudos" recognition currency** as a first-class concept linked to the review. Three-stage assessment flow: self → manager → joint review. The kudos-as-currency is something almost no commercial tool does cleanly. |
| [Thinksy-app/thinksy](https://github.com/Thinksy-app/thinksy) | 14 | Python + OpenAI + Slack | MIT | **Slack-message-to-perf-summary** via OpenAI. Solves the "what did I do this quarter" pre-review problem. Single-purpose. The whole repo is ~Dockerfile + Slack bot + OpenAI call — easy to replicate. |
| [ajitesh123/auto-review-ai](https://github.com/ajitesh123/auto-review-ai) | 9 | TS/Python + Streamlit | MIT | AI review generator (multi-LLM: OpenAI / Anthropic / Google / Groq). **Audio-input → transcript → review draft** (Groq Whisper). Plus a FastAPI backend so it can run as a service. |
| [Cadence_HR_HUB](https://github.com/hadimercer/Cadence_HR_HUB) | 0 | Python + Streamlit + Supabase | n/a | **Surprise standout (single-author portfolio project but ambitious)**: four connected workflows — Headcount → Performance Management → Compensation Review → Attrition Risk — built around the explicit thesis that *the value is in cross-workflow data flow*. Includes a **7-factor attrition risk scoring engine with configurable weights** and a **6-gate merit eligibility engine** (rules-based, auditable). 13 DB tables, 45 functional requirements. Worth reading just for the design memos. |

**Findings:**
- No specialized OSS perf-review tool has crossed 100 stars. Frappe HRMS (7.96k) and Huly (25.9k) carry perf as a module inside a broader product; *standalone* perf-review OSS is hobby territory.
- The **gap between "OSS perf-review" and "what Qonto needs"** is bigger than I expected. None of these are realistic dependencies. They're useful as **schema references and feature inventories**, not as platforms to fork.
- **Thinksy** and **auto-review-ai** are the closest things to "AI-assisted review writing in OSS." Both are <20 stars and were last touched in 2024-2025. The category is genuinely underserved by OSS.

---

## Compensation OSS (state of the world)

**Confirmed: there is essentially no purpose-built compensation OSS.**

After exhaustive `gh search` across `compensation review`, `salary planning`, `pay equity`, `compensation management`, `salary band`, `merit increase`, `salary benchmark open source`, `performance management open source`:

- **Hundreds of results are dashboards, ML salary-prediction models, payroll systems, or coursework.** Not comp-review tools.
- **The handful of purpose-built tools are tiny.**

| Repo | Stars | Type | What it does |
|---|---|---|---|
| [compflow-app/compflow](https://github.com/compflow-app/compflow) | 1 | Marketing page only | "Compensation governance software for EU companies. Salary bands, approvals and pay equity insights aligned with EU Pay Transparency Directive." README is one paragraph + links. **No code in the public repo.** This is a closed-source product squatting on a public name. |
| [AlexVulaj/comp-calc](https://github.com/AlexVulaj/comp-calc) | 0 | Single HTML file | Compa-ratio calculator. Two modes: ratio → salary, salary → ratio. Inputs: min/mid/max band + value. No dependencies. **This is the entire OSS implementation of "compa-ratio."** |
| [robjailall/raise-calculator](https://github.com/robjailall/raise-calculator) | n/a | Python CLI | **Genuinely interesting algorithm**: given a raise budget + employee levels + current salaries + salary bands, allocates raises by **minimizing percentage deficit from market rate**. Philosophy doc argues against "everyone gets X%" and "X% by perf rating" schemes. Greedy: each raise dollar goes to whoever has the largest pay-deficit-vs-market in percentage terms. This is *budget-constrained pay-equity remediation as an optimization problem*, which is what every real comp review actually is — but no commercial tool I've surveyed exposes it as the explicit objective. |
| [LiviaMoreira/merit-increase-matrix](https://github.com/LiviaMoreira/merit-increase-matrix) | n/a | Jupyter notebook | **The classic merit matrix made explicit**: 2D grid of `(performance_grade quartile, compa-ratio quartile)` → merit % to apply. Walks through Compa-Ratio calc, matrix construction, applying it across an employee pool, and comparing the before/after distribution to confirm it actually compresses the compa-ratio spread. |
| [TerryusB/Pay-Equity-Analyzer](https://github.com/TerryusB/Pay-Equity-Analyzer) | 2 | Python + statsmodels | **OLS regression for pay-gap detection**: maps job titles to standardized levels N1–N8, computes compa-ratios with traffic-light buckets (Critical Underpayment / Market Aligned / Overpaid), suggests correction amounts + total budget impact, then runs multivariate OLS controlling for level + performance to test whether a Gender Pay Gap survives controls. **This is the methodology every EU-Pay-Transparency-Directive tool will need; it's published openly.** |
| [mikolajkuna/GAMBA](https://github.com/mikolajkuna/GAMBA) | 1 | Jupyter | Generalized Additive Models for pay equity — frequentist REML + Bayesian MCMC. Academic companion code (PP-RAI 2026). More rigorous than OLS for nonlinear age/tenure effects. |

**Compensation OSS feature inventory** (what does exist):

1. **Compa-ratio calculation** (comp-calc, pay-equity-analyzer, merit-increase-matrix) — well-understood, trivially reproducible
2. **Salary-band definition** (raise-calculator, merit-increase-matrix) — usually a `level → (min, mid, max)` table
3. **Merit-increase matrix** (merit-increase-matrix) — 2D grid keyed on (perf-quartile × compa-ratio-quartile)
4. **Budget-constrained raise allocation** (raise-calculator) — optimization, not a matrix
5. **OLS / GAM pay-gap regression** (Pay-Equity-Analyzer, GAMBA) — statistical pay-equity diagnosis
6. **Compa-ratio traffic-light buckets** (Pay-Equity-Analyzer) — Critical Underpayment / Market Aligned / Overpaid

**Compensation OSS feature inventory** (what does NOT exist in OSS):
- Comp review **cycle orchestration** (manager submits proposed raises → HRBP approves → exec sign-off → comm letter generation)
- **Multi-component comp** (base + bonus + equity + on-target variable) as a unified data model
- **Promotion + level-change workflow** linked to comp change
- **Equity / RSU refresh grant** modeling
- **Geographic / cost-of-labor differentials**
- **Comp letter / total-rewards-statement generation**
- **Approval chains** with budget gates
- **Audit trail** for comp decisions (who approved what, with what rationale)

**This is the gap.** A Qonto-internal tool that does *comp review cycle orchestration* would have no real OSS prior art to fork. Frappe HRMS has Salary Structure / Salary Component / Compensation Detail for payroll but no review/approval workflow. Comp review remains a spreadsheet workflow even at companies that have moved perf off spreadsheets.

---

## Calibration / talent-review OSS

Searched: `talent review`, `calibration HR`, `9-box`, `nine box talent`.

**Result: nothing usable.** The results are either:
- Personal portfolio repos with no real product (`epijim/TalentReview`, `Colin-ning/talent-review`, several Brazilian/Portuguese student projects)
- Unrelated (calibration of weather models, image dataset boxes, etc.)
- One Engineering promotion form (`rcruanes/Engineering-Talent-Review-App`) — a single Google Forms-style HTML, not a system

**9-box / talent-review / calibration is the biggest blind spot in OSS HR.** Commercial tools (Lattice, Culture Amp, Eloomi, Cornerstone) all do it; OSS has zero. This is consistent with comp: the higher-stakes / lower-frequency / more-political the HR workflow, the less OSS exists for it.

---

## Recurring data model patterns (appearing in 3+ sources)

| Pattern | Sources | What |
|---|---|---|
| **Cycle entity owns dates + status, separate from template** | Frappe (Appraisal Cycle vs Appraisal Template), ever-gauzy (Period vs Goal Template), Cadence (cycle vs scoring config) | Cycles are time-bounded; templates are content-shaped. Don't conflate. |
| **Compa-ratio as primary comp metric** | comp-calc, raise-calculator, merit-increase-matrix, Pay-Equity-Analyzer, GAMBA, Cadence | `base / midpoint(band)`. **This is the universal comp KPI.** |
| **Salary band as `(level, min, mid, max)`** | raise-calculator, comp-calc, Cadence, merit-increase-matrix, compflow | Every comp tool reduces to this. |
| **Final score = weighted avg of (goal, self, feedback)** | Frappe, evalytics, threesixty, Cadence | Three rating dimensions, weighted aggregate. Frappe makes the formula configurable. |
| **Submittable / immutable review docs** | Frappe (`is_submittable + amended_from`), threesixty (3-step lock), evalytics (phase transitions) | Once a review is "submitted," changes go through an amend flow with audit trail. |
| **Reviewer is a separate entity per feedback record** | Frappe (Employee Performance Feedback), threesixty (Review), evalytics (Survey response) | One employee can receive feedback from N reviewers; each record stores `reviewer_id` and `appraisee_id`. |
| **Rating criteria as reusable atomic entities** | Frappe (Employee Feedback Criteria), threesixty (Competency), evalytics (Question) | Define once, reference everywhere. Don't inline criteria into the appraisal. |
| **Goal tree with parent_goal self-ref** | Frappe (`lft/rgt` nested-set), ever-gauzy (parent_goal), okr-tracker (Firebase nested docs), BurningOKR (alignment tree) | OKR cascade is universally a self-referencing hierarchy. |
| **Rating fieldtype as a primitive** | Frappe ("Rating" 5-star), threesixty (star rating), most others (1–5 enum) | 5-point scales dominate; Frappe makes Rating a first-class field type. |
| **Levels as a master dimension table** (`level_name, min, mid, max`) | raise-calculator, comp-calc, merit-increase-matrix, Pay-Equity-Analyzer (N1–N8) | The level grid is the spine of the comp model. |

---

## Feature inventory

For the Qonto demo. Format: `kebab-id | name | description | primary_user | help_mode | ai_mode=none | inspiration | complexity | poc_fit`.

| kebab-id | name | description | primary_user | help_mode | ai_mode | inspiration | complexity | poc_fit |
|---|---|---|---|---|---|---|---|---|
| `cycle-container` | Review Cycle | Time-bounded container (start/end/status) owning a set of appraisals and a final-score formula | HRBP | tooltip + cycle-status banner | none | frappe/hrms Appraisal Cycle | M | YES |
| `cycle-filter-materialize` | Cycle Population | Filter employees by dept/role/level, then snapshot into the cycle. Manual add/remove afterwards. | HRBP | walkthrough | none | frappe/hrms Appraisee table + get_employees button | M | YES |
| `cycle-final-score-formula` | Final Score Weighting | Configurable weighting of (goal, self, feedback) per cycle. Default 1/3 each. | HRBP (admin) | form-level help | none | frappe/hrms calculate_final_score_based_on_formula | S | YES (preset weights only, no formula DSL) |
| `appraisal-doc` | Appraisal | Per-employee document for one cycle. Goal score, self score, feedback score, final score. | HRBP, manager, employee | inline labels | none | frappe/hrms Appraisal | L | YES |
| `appraisal-submittable` | Lock-on-submit | Submitting an appraisal makes it immutable. Edits create amendments linked via `amended_from`. | HRBP | confirmation modal | none | frappe `is_submittable` | M | NO (overkill for POC, but capture as future) |
| `template-per-role` | Appraisal Template | Reusable template (KRAs + criteria + weights) attached to a role / designation. | HRBP (admin) | form-level help | none | frappe Appraisal Template | M | YES |
| `kra-atomic` | KRA dimension | Atomic Key Responsibility Area definition (title, description). Reused across templates and goals. | HRBP (admin) | none | none | frappe/hrms KRA | XS | YES |
| `criteria-atomic` | Rating Criteria dimension | Atomic feedback criterion ("Communication", "Ownership"). Reused across templates and feedback records. | HRBP (admin) | none | none | frappe/hrms Employee Feedback Criteria | XS | YES |
| `rating-row-polymorphic` | Polymorphic Rating Row | One row shape (criteria + weight + rating value) reused in template (no value), self-ratings, and feedback ratings. | system | n/a | none | frappe/hrms Employee Feedback Rating | M | YES |
| `goal-tree` | Goal Cascade | Employee goals as a tree (parent_goal self-ref, `is_group` flag for folder nodes). Progress on leaves rolls up. | manager + employee | tree-view help | none | frappe/hrms Goal (`is_tree:1` + `lft/rgt`) | L | NO (tree adds complexity; flat goals for POC) |
| `goal-flat` | Flat Goals | Goals as a flat list per employee per cycle, tagged with a KRA. | employee | tooltip | none | derived | M | YES (POC alternative to goal-tree) |
| `goal-kra-tagging` | Goal → KRA tagging | Each goal carries a `kra` link. Required when bound to a cycle. | employee | tooltip | none | frappe Goal.kra | S | YES |
| `kra-auto-aggregation` | KRA Auto-Score | KRA score on the appraisal is auto-computed from progress of tagged goals (weighted average). | system (read-only on appraisal) | "how is this calculated" help | none | frappe Appraisal KRA goal_completion field | M | YES |
| `manual-vs-auto-toggle` | Goal Rating Mode | Per-cycle switch between "auto-score from goal progress" and "manager rates each goal manually". | HRBP | radio + explanation | none | frappe `rate_goals_manually` + cycle `kra_evaluation_method` | S | YES |
| `self-appraisal-ratings` | Self Ratings | Employee rates themselves against the same criteria reviewers use, before manager review. | employee | inline help | none | frappe Appraisal.self_ratings | M | YES |
| `self-reflection-narrative` | Reflections | Free-form text editor for "what went well / what to improve" alongside numeric self-ratings. | employee | prompt placeholder | none | frappe Appraisal.reflections | S | YES |
| `feedback-doc` | Performance Feedback | Standalone document. One per reviewer × appraisee. Linked to the appraisal. Carries criteria ratings + free-text. | peer or manager | structured form | none | frappe/hrms Employee Performance Feedback | M | YES |
| `feedback-bound-to-appraisal` | Feedback ↔ Appraisal binding | Every feedback record requires an `appraisal` link at creation. No floating feedback. | system | enforced via form | none | frappe (reqd: 1 on appraisal field) | S | YES |
| `360-peer-assignment` | Peer Assignment Phase | Managers nominate peers per direct report. Phase precedes the review phase. | manager | phased flow | none | evalytics Phase 1 | M | NO (defer; do "manager picks 3 peers" inline) |
| `review-360-180-mode` | 180° / 360° mode | Configurable: 180° = self + manager + reports; 360° = + peers. | HRBP (admin) | toggle on cycle | none | evalytics | S | YES |
| `reviewer-relationship-tagging` | Reviewer Relationship | Tag each feedback as `self / manager / direct_report / peer / skip-level`. | system | derived from org | none | evalytics (`employee.manager`, `area`) + Lattice/Lucca convention | S | YES |
| `final-score-aggregation` | Final Score | Read-only aggregate of goal + self + feedback weighted per cycle config. | manager / HRBP | "how is this calculated" panel | none | frappe Appraisal.final_score | S | YES |
| `kudos-currency` | Recognition Kudos | Continuous peer recognition currency. Surfaced in the formal review as context, not as score. | employee, peer | activity feed | none | markash/threesixty kudos feature | L | NO (out of scope) |
| `slack-work-summary` | Work Summary from Slack | "What did I do this quarter" — fetches the employee's Slack messages and generates a draft summary. | employee, manager | "summarize my Q" button | (would be heavy AI — flagged none for now per scope) | thinksy + ContribSync | L | NO (defer; nice-to-have) |
| `comp-band-master` | Salary Band Table | `(level, role, geography, currency) → (min, mid, max)`. The spine of every comp calc. | HRBP (admin) | table editor | none | raise-calculator, comp-calc, merit-increase-matrix universal pattern | M | YES |
| `compa-ratio-calc` | Compa-Ratio | Live calc: `base_pay / midpoint(band)`. Surfaced on every employee row in a comp review. | HRBP, manager | tooltip with formula | none | comp-calc, Pay-Equity-Analyzer | XS | YES |
| `compa-ratio-traffic-light` | Compa-Ratio Bucket | Bucket each employee into Critical Under (< 0.85) / Below (0.85–0.95) / Aligned (0.95–1.05) / Above (1.05–1.15) / Over (> 1.15) with color coding. | HRBP, manager | legend | none | Pay-Equity-Analyzer | XS | YES |
| `merit-matrix-2d` | Merit Increase Matrix | 2D grid (perf-quartile × compa-ratio-quartile) → merit %. HRBP edits the grid, system applies per employee. | HRBP (admin) | matrix editor | none | LiviaMoreira/merit-increase-matrix, BiancaJenkins/Compensation-Analytics-Merit-Planning | M | YES |
| `budget-constrained-allocation` | Budget-Aware Raise Allocation | Given a raise budget + per-employee fair-target deltas, allocate raises minimizing % pay-deficit-vs-market. | HRBP | budget panel + per-employee delta | none | robjailall/raise-calculator | L | NO (POC: show as a future toggle; default to merit matrix) |
| `pay-equity-ols` | Pay Equity Statistical Test | Run OLS regression of `log(base) ~ level + perf + tenure + gender` and surface whether gender coefficient is significant post-controls. | HRBP | report card | none | TerryusB/Pay-Equity-Analyzer | L | NO (defer; statistical complexity, low POC payoff) |
| `pay-gap-summary` | Pay-Gap Summary | Mean / median pay-gap by gender, controlled by level. Always-on dashboard tile. EU Pay Transparency Directive requires this. | HRBP, exec | dashboard tile | none | compflow positioning + EU directive | M | YES |
| `comp-review-cycle` | Comp Cycle | Same shape as Review Cycle but for comp. Phases: HRBP-seeds → manager-proposes → HRBP-reviews → exec-approves → letters-generated. | HRBP | phased UI | none | **gap** — no OSS does this; new design needed | XL | YES (the differentiating feature) |
| `comp-approval-chain` | Approval Chain | Each proposed raise/promo flows through manager → HRBP → exec sign-off, with budget gates at each level. | HRBP | inbox + state machine | none | **gap** — no OSS does this | L | YES |
| `comp-decision-audit` | Comp Decision Audit | Every comp change carries a `decision_rationale` text field + `approved_by` + `approved_at` + `previous_value`. Immutable log. | HRBP, exec | "why was this approved" expander | none | derived from Frappe submittable pattern | S | YES |
| `attrition-risk-score` | Attrition Risk | Per-employee risk score from N factors (compa-ratio gap, tenure, perf decline, manager turnover, etc.) with configurable weights. | HRBP | risk register | none | Cadence_HR_HUB 7-factor engine | L | NO (defer; data-hungry) |
| `merit-eligibility-gates` | Merit Eligibility | Boolean gate set ("12+ months tenure, perf ≥ 3, not on PIP, no recent promotion") — employees must pass all gates to be in the merit pool. | HRBP (admin) | gate editor | none | Cadence_HR_HUB 6-gate engine | M | YES |
| `total-rewards-statement` | Total Rewards Statement | Per-employee letter summarizing new base + bonus + equity + benefits after comp cycle. PDF export. | HRBP → employee | letter preview | none | **gap** — no OSS does this | L | NO (defer; nice-to-have) |

**POC slice (the `poc_fit: YES` subset)** — 22 features. Forms a coherent demo: cycle creation → templates → goals tagged with KRAs → self-appraisal + reflections → 360 feedback → auto-aggregated final score → linked comp cycle with band-based compa-ratio + merit matrix + pay-gap dashboard + audit trail.

---

## Sources

### Frappe HRMS DocType JSONs (saved locally)
- `frappe-hrms/appraisal.json`
- `frappe-hrms/appraisal_cycle.json`
- `frappe-hrms/appraisal_template.json`
- `frappe-hrms/appraisal_template_goal.json`
- `frappe-hrms/appraisal_kra.json`
- `frappe-hrms/appraisal_goal.json`
- `frappe-hrms/goal.json`
- `frappe-hrms/kra.json`
- `frappe-hrms/employee_performance_feedback.json`
- `frappe-hrms/employee_feedback_criteria.json`
- `frappe-hrms/employee_feedback_rating.json`

### READMEs (saved locally)
- `evalytics/README.md`, `threesixty/README.md`, `thinksy/README.md`, `auto-review-ai/README.md`, `Cadence_HR_HUB/README.md`
- `compflow/README.md`, `Pay-Equity-Analyzer/README.md`, `GAMBA/README.md`, `comp-calc/README.md`, `raise-calculator/README.md`, `merit-increase-matrix/README.md`, `Compensation-Analytics-Merit-Planning/README.md`

### Searches performed (all 2026-05-12)
- `gh search repos "performance review" --sort stars --limit 20`
- `gh search repos "360 feedback" --sort stars --limit 10`
- `gh search repos "OKR" --sort stars --limit 10`
- `gh search repos "compensation review" --sort stars`
- `gh search repos "salary planning" --sort stars`
- `gh search repos "pay equity" --sort stars`
- `gh search repos "compensation management" --sort stars --limit 15`
- `gh search repos "salary band" --sort stars`
- `gh search repos "merit increase" --sort stars`
- `gh search repos "talent review" --sort stars`
- `gh search repos "calibration HR" --sort stars`
- `gh search repos "9-box" --sort stars`
- `gh search repos "nine box talent" --sort stars`
- `gh search repos "performance management open source" --sort stars`
