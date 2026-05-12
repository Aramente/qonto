# Career Framework & Skill-Matrix Systems — Synthesis

Round 2 research, ~30min time-boxed. Goal: model career frameworks as a *graph* (levels x dimensions x paths), not a PDF.

## Sources surveyed

| Source | Dimensions | Levels | Tracks | Format | Salary link | URL |
|--------|-----------|--------|--------|--------|-------------|-----|
| Progression.fyi (75 frameworks aggregator) | varies | varies | both | mixed (mostly sheets) | none | https://www.progression.fyi/ |
| Square / Block | Scope&Impact + Behaviors (2 sections, multi-category) | L3-L9 | IC + EM | PDF | implicit | https://developer.squareup.com/blog/squares-updated-growth-framework-for-engineers-and-engineering-managers/ |
| Etsy | 5 competencies (Delivery, Domain, Problem Solving, Comms, Leadership) | 5 (Beginner -> Leading Expert) | IC-only | static HTML matrix | none | https://etsy.github.io/Etsy-Engineering-Career-Ladder/ |
| CircleCI | 6 areas (technical, quality, debugging, code, comms, leadership) | E1-E6 | IC + EM (separate) | sheet, CC license | none | https://docs.google.com/spreadsheets/d/131XZCEb8LoXqy79WWrhCX4sBnGhCM1nAIz4feFZJsEo/ |
| Patreon | role + skillsets per IC level | not stated, IC+ | IC public | doc, levels.patreon.com | none | https://levels.patreon.com/ |
| Khan Academy | Skills / Scope / Experience | multiple | IC + lead | Google Doc | none | https://blog.khanacademy.org/engineering-career-development-at-khan-academy/ |
| engineeringladders.com | 5 dims (tech, system, people, process, influence) | 1-7 | 4 paths (Dev, TL, TPM, EM) | radar chart visualization | none | http://www.engineeringladders.com/ |
| Codecademy | 4 (SWE&Design, Execution, Collab, Community) | 5 IC + mgr | IC + Mgr | Markdown in GitHub | none | https://github.com/Codecademy/engineering-competencies |
| Stride open matrix | Themes -> Essential/Technical skills | configurable | configurable | JSON from sheet (tooling) | none | https://github.com/stride-so/matrix |
| Spotify model | n/a (org structure) | n/a | squad x chapter matrix | whitepaper | none | https://blog.crisp.se/wp-content/uploads/2012/11/SpotifyScaling.pdf |
| Buffer | role + level + location | implicit | n/a | formula | **direct** (level is salary input) | https://buffer.com/salary |
| GitLab | per job-family responsibilities + matrix | Engineer/Senior/Staff/Principal/EM | IC + Mgr fork at Senior | wiki pages, working-group governed | salary band reference exists | https://handbook.gitlab.com/handbook/engineering/careers/matrix/ |
| Lattice Grow | Themes (Impact/Behaviors/Functional, ~4) -> 9-12 competencies | 4-6 per template | IC + Mgr templates | in-product matrix UI | separate (Compensation product) | https://lattice.com/platform/grow |
| Notion templates | linked databases (Roles, Skills, Levels, IDPs) | varies | varies | linked DBs | none | https://www.notion.com/templates/skills-competency-matrix |

## Modeling patterns (the convergence)

Reading across 14 sources, the convergent model is:

1. **Framework** is the root. A company has 1+ frameworks (e.g., "Engineering 2025").
2. **Track / Path** sits under Framework. Always at least: IC track, Manager track. Often more (Tech Lead, TPM at engineeringladders; Backend/Frontend/Infra as job families at GitLab).
3. **Level** belongs to a Track. Numbered + named. Counts cluster around **5-7**. Levels are NOT global — a Senior on IC is not a Senior on Mgr necessarily. Square cleverly keeps level numbers shared across tracks (L6 IC = L6 Mgr by scope).
4. **Dimension / Competency** is orthogonal to Level. **Themes** group competencies (Lattice's idea — also implicit in Square's "categories"). 4-6 themes, 9-12 competencies is the modal shape.
5. **Expectation** = the cell at (Level x Competency). Written as **behavioral / "does" language**, not "can do". Cumulative ("includes previous levels"). Often **anchor behaviors** (specific examples) rather than abstract paragraphs — Square and Khan Academy explicitly iterated from paragraph -> anchors for clarity.
6. **Scoring** (Person x Competency x Level): a person sits at a level *per dimension*, not globally. They have a "current level" but a profile of strengths/gaps. **This is the radar chart**, the snowflake, the uneven profile that everyone acknowledges and few tools model well.
7. **Salary** is a separate concern. Buffer connects directly (`level + location + role` -> band). Most others leave it implicit (or in a separate Compensation product, like Lattice). The strongest pattern: **level is the only competency-side input to salary; framework determines level; level + market data determines salary.**

### Two macro-models in tension
- **Grid model** (Etsy, CircleCI, Codecademy): a 2D matrix. Simple, scannable, but flat — hides paths.
- **Graph model** (engineeringladders, Lattice, Notion): nodes for each entity, edges for relationships. Richer, supports paths, mobility, per-dimension scoring. Worse for printing, better for product.

**For a SaaS like Qonto: graph wins.** A printable matrix is a *view* over the graph.

## Recommended Qonto data model

```
Framework
  id, name, description, version, status, created_at, owner_id

Track                              # IC, Manager, Tech Lead, etc.
  id, framework_id, name, kind (ic|manager|hybrid), description

Level                              # Senior, Staff, L5, etc.
  id, track_id, ordinal, name, display_name, description
  # ordinal lets you order; name is human label

Theme                              # Impact, Behaviors, Functional (Lattice's layer)
  id, framework_id, name, description, color, ordinal

Competency / Dimension             # one node per skill
  id, theme_id, name, description, kind (technical|essential)

LevelExpectation                   # the (Track x Level x Competency) cell
  id, level_id, competency_id, body, anchor_behaviors[], examples[]
  # body = behavioral statement; anchors = concrete observable behaviors

JobFamily                          # GitLab pattern: Backend, Frontend, etc.
  id, framework_id, name, description
  # joins to Track via JobFamilyTrack to specify which tracks apply

JobFamilyTrack
  job_family_id, track_id
  # many-to-many; allows Backend job family to use IC + Mgr tracks

# --- Person side ---

Person
  id, name, email, current_job_family_id, current_track_id, current_level_id

PersonLevelAssessment              # the radar chart, per-dimension scoring
  id, person_id, competency_id, assessed_level_id, evidence_ref[], assessed_at, assessor_id

# --- Salary side (decoupled) ---

SalaryBand
  id, track_id, level_id, location_band, currency, min, mid, max
  # Buffer-style separation: level is the join key, no subjective inputs

# --- Mobility ---

LevelMapping                       # cross-track equivalence (Square's L6=L6)
  source_level_id, target_level_id, equivalence (exact|approx)
```

Key choices:
- **Theme as a first-class entity** (most public frameworks skip this; Lattice has it; payoff in UX is large).
- **PersonLevelAssessment per competency**, not per person — the radar chart is native, not derived.
- **JobFamily is separate from Track.** Backend (job family) can use IC track or Mgr track. This is the GitLab pattern and the cleanest way to avoid duplicating ladders per role.
- **Anchor behaviors are an array on LevelExpectation**, not free text — enables search ("show me everyone whose evidence matches anchor X").
- **SalaryBand keys on (track, level, location)** only. No competency averages bleeding in. Buffer's transparency model is the only one that survives legal/HR scrutiny.

## Features unlocked by a graph model

| id | name | description | primary_user | help_mode | ai_mode | complexity | poc_fit |
|----|------|-------------|--------------|-----------|---------|------------|---------|
| F1 | browse-framework | In-product matrix navigator: click a level, see all competencies x expectations | employee | high | low | M | high |
| F2 | gap-to-next-level | For each competency, show employee's current level vs next level expectation | employee | high | medium | M | high |
| F3 | radar-profile | Per-employee radar/spider chart across all competencies, vs target level | employee + manager | medium | low | S | high |
| F4 | promotion-case-builder | Promotion doc auto-assembled from evidence per competency mapped to next-level anchors | manager | high | high | L | high |
| F5 | calibration-mode | Side-by-side: avatar + level criteria + evidence, for calibration meetings | HR / leads | medium | medium | L | medium |
| F6 | mobility-marketplace | "You're 1 dimension from this open role" — surface roles where the candidate is close | employee | high | high | L | medium |
| F7 | manager-feedback-prompts | Conversation guides per competency at current level (Lattice IDP pattern) | manager | high | high | M | high |
| F8 | evidence-tagging | Tag PRs, docs, projects with competencies they demonstrate; backlinks fill the assessment | employee + manager | medium | high | M | medium |
| F9 | track-switch-wizard | Show level equivalence when moving IC->Manager or Backend->Platform | employee + HR | medium | medium | M | low |
| F10 | framework-versioning | Diff a framework version against the previous; communicate what changed | HR | low | medium | M | low |
| F11 | salary-band-reveal | Buffer-style transparency: show the band for the employee's level + location | employee | high | low | S | high |
| F12 | anchor-search | "Who has demonstrated anchor behavior X?" — search across evidence | manager | low | high | M | low |
| F13 | competency-heatmap | Team-level heatmap of strengths/gaps across competencies | manager + leads | medium | low | M | medium |
| F14 | skill-graph-explore | Click a competency, see related competencies, who's expert, learning resources | employee | medium | high | L | low |
| F15 | review-cycle-fact-check | At review time, AI checks every competency claim against tagged evidence | manager + HR | high | high | L | medium |

## How the skill matrix connects to the salary grid

The skill matrix is the **promotion engine**; the salary grid is the **paycheck engine**. They connect at exactly one point: **Level**. The framework determines what Level a person should be at (via the assessment of their competencies against LevelExpectations on their Track). The salary grid then reads `(Track, Level, Location)` and returns a band. Nothing about a person's competency scores feeds the salary formula directly — that would be a) legally risky (uneven competency strengths shouldn't yield uneven pay within a level) and b) a perverse incentive (gaming individual cells).

UI implication: a person sees two distinct screens, linked. **My Growth** shows the matrix, radar, gaps, IDP. **My Compensation** shows the band for my current Level + Location, and the band for next Level if I promote. The bridge between them is "promotion = level change = paycheck change." Crystal-clear cause-and-effect is the whole point of public-by-default systems like Buffer's.

## Sources

- Progression.fyi: https://www.progression.fyi/
- Square Growth Framework (2023): https://developer.squareup.com/blog/squares-updated-growth-framework-for-engineers-and-engineering-managers/
- Square SWE Ladder PDF: https://assets.ctfassets.net/1wryd5vd9xez/6bDnTwb4H7bfiFvg55ldRR/b1cb8514f0afd0a4050991d35ccbac03/Square_Software_Engineering_Career_Ladder.pdf
- Block Engineering Ladder PDF: https://assets.ctfassets.net/1wryd5vd9xez/3gb7ZSi95ipFegjuMWupGo/bcb0dd0253297bff48a4ad083b28d924/-Public-_Block_Engineering_Career_Ladder.pdf
- Etsy Career Ladder: https://etsy.github.io/Etsy-Engineering-Career-Ladder/competencies.html
- CircleCI redesign post: https://circleci.com/blog/why-we-re-designed-our-engineering-career-paths-at-circleci/
- CircleCI Matrix sheet: https://docs.google.com/spreadsheets/d/131XZCEb8LoXqy79WWrhCX4sBnGhCM1nAIz4feFZJsEo/
- CircleCI competency-matrix building guide: https://circleci.com/blog/7-steps-to-building-an-engineering-competency-matrix/
- Patreon levels writeup: https://www.gigabody.com/blog/how-patreon-levels-engineers/
- Khan Academy blog: https://blog.khanacademy.org/engineering-career-development-at-khan-academy/
- Khan Academy doc: https://docs.google.com/document/d/1qr0d05X5-AsyDYqKRCfgGGcWSshTMd_vfTggfhDpbls/
- engineeringladders.com: http://www.engineeringladders.com/
- engineeringladders GitHub: https://github.com/jorgef/engineeringladders
- Codecademy competencies: https://github.com/Codecademy/engineering-competencies
- Stride open matrix: https://github.com/stride-so/matrix
- Spotify scaling whitepaper (Kniberg & Ivarsson 2012): https://blog.crisp.se/wp-content/uploads/2012/11/SpotifyScaling.pdf
- Buffer salary page: https://buffer.com/salary
- GitLab career matrix: https://handbook.gitlab.com/handbook/engineering/careers/matrix/
- GitLab dev matrix: https://handbook.gitlab.com/handbook/engineering/careers/matrix/development/dev/
- GitLab backend job family: https://handbook.gitlab.com/job-families/engineering/development/backend/
- Lattice Grow product: https://lattice.com/platform/grow
- Lattice track templates: https://help.lattice.com/hc/en-us/articles/4402717644183-Track-Templates
- Lattice competency matrix template: https://lattice.com/templates/competency-matrix-managers
- Notion skills/competency matrix template: https://www.notion.com/templates/skills-competency-matrix
- Etsy on GitHub: https://github.com/etsy/Etsy-Engineering-Career-Ladder
- Glitch ladder: https://github.com/glitchdotcom/engineering-ladder
- Rent The Runway ladder: https://docs.google.com/spreadsheets/u/1/d/1k4sO6pyCl_YYnf0PAXSBcX776rNcTjSOqDxZ5SDty-4/edit
- Medium Snowflake (growth framework): https://docs.google.com/spreadsheets/d/1EO-Dbsayn8Nz9Ii3MKcwRbt-EIJ2MjQdpoyhh0tBdZk/
- Awesome engineering ladders list: https://github.com/posquit0/awesome-engineering-ladders
- Awesome career paths: https://github.com/gab0gomes/awesome-career-paths
