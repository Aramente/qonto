# Adjacent-Industry Patterns → Qonto Perf+Comp

Mining adjacent-industry patterns (sales coaching, calendar AI, project mgmt copilots, knowledge RAG, writing assistance, difficult-conversation coaching) for "help, don't decide" features that translate into perf+comp review. Constraint: every translated feature uses only standard HR-tech data (HRIS, calendar, goals, recognition, manager notes, self-written content). No Slack/email/code/Linear ingestion.

## Tools surveyed

| Domain | Tool | Source pattern (one line) | Page |
|---|---|---|---|
| Sales coaching | Gong | Revenue-AI OS surfaces "moments" in calls — coaching hooks, not auto-scores | `sales-coaching/gong/page.md` |
| Sales coaching | Chorus (ZoomInfo) | Snippet-share + "winning behaviors" — peers learn from each other's recordings | `sales-coaching/chorus/page.md` |
| Sales coaching | Lavender | Real-time email tone/quality score with rewrite suggestions while the user types | `sales-coaching/lavender/page.md` |
| Sales coaching | Salesloft Coach | (404 — known: scorecards + manager 1:1 prep cards aggregating rep activity) | n/a |
| Sales coaching | Outreach Kaia | (404 — known: real-time call assistant, surfaces objections + content during call) | n/a |
| Calendar / focus | Reclaim | Auto-defends Focus Time blocks on calendar; "Initiatives" nudge teams toward agendas, buffer time, no-meeting days | `calendar-focus/reclaim/page.md` |
| Calendar / focus | Clockwise | (light page — known: AI-rearranges meetings to create team focus blocks; visibility, not control) | `calendar-focus/clockwise/page.md` |
| Calendar / focus | Motion | Auto-schedules tasks into open calendar slots based on priority + deadline | `calendar-focus/motion/page.md` |
| Calendar / focus | Spinach | AI meeting notes per use-case (PM, HR, eng) — captures decisions + action items, doesn't drive them | `calendar-focus/spinach/page.md` |
| Project mgmt | Linear | "Cycle" summaries; Triage Intelligence auto-labels but humans assign; "issue tracking is dead" framing — agents propose, humans accept | `project-mgmt/linear/page.md` |
| Project mgmt | Height | (ECONNRESET — known: AI auto-classifies tasks, drafts standup updates from activity, human edits before posting) | n/a |
| Project mgmt | Asana AI | Smart Assists + AI Teammates — embedded in flow, "transparent, controlled, and secure" framing | `project-mgmt/asana/page.md` |
| Project mgmt | Notion AI | Workspace AI that retrieves + drafts using your own pages as context | `project-mgmt/notion/page.md` |
| Knowledge / RAG | Glean | Personalized work-AI grounded in everything *you* have access to — finds your own artifacts | `knowledge-rag/glean/page.md` |
| Writing | Grammarly Business | Brand-tone profile + strategic-suggestion layer — coaches the writer, doesn't ghost-write | `writing/grammarly/page.md` |
| Writing | Mem | "Dump anything, find anything by description" — semantic recall of your own thoughts | `writing/mem/page.md` |
| Difficult conv | Bravely | On-demand confidential coaching with a *human*; AI-untouched; insights aggregated, never individual | `difficult-conv/bravely/page.md` |

## Pattern translations (18)

> Every feature below satisfies "help, don't decide" + uses only HRIS/calendar/goals/recognition/manager-notes/self-written data.

### 1. Moment-of-friction surfacing → Unresolved-thread digest for 1:1 prep
- **source_tool + source_pattern**: Gong → "moments" detection on sales calls (objections, competitor mentions, friction). Manager opens "moments since last review" and picks what to coach.
- **translated_feature**: Before a 1:1, surface threads from the manager's *own previous notes* that have no follow-up: goals with no progress logged in 14 days, action items the manager wrote that never got a checkbox, feedback given last cycle with no revisit.
- **id**: `pf-unresolved-threads`
- **name**: Unresolved-thread digest
- **description**: Pre-1:1 panel of items the manager opened but never closed.
- **primary_user**: manager
- **help_mode**: surface
- **ai_mode**: retrieval + summarization (no scoring)
- **complexity**: M
- **poc_fit**: high
- **trust_pattern**: Only operates on the manager's own notes. No aggregation, no comparison across managers. Manager dismisses items they consider closed.

### 2. Snippet share → Peer-praise echo
- **source_tool + source_pattern**: Chorus → reps share 60-sec snippets of a teammate's call to spread winning behavior.
- **translated_feature**: When an employee receives recognition (Bonusly / kudos / structured recognition in HRIS), they can opt-in to "echo" it into their next self-review draft as a citation block. Not auto-pulled into the review; available in a side panel labeled "Things people said about you this half."
- **id**: `pf-recognition-echo`
- **name**: Recognition echo panel
- **description**: Sidebar that surfaces structured recognition received during the cycle, ready to paste into self-review with one click.
- **primary_user**: employee
- **help_mode**: retrieve evidence
- **ai_mode**: pure retrieval, no rewriting
- **complexity**: S
- **poc_fit**: high
- **trust_pattern**: Employee owns the panel. Only structured kudos (not DMs, not chat). Visible only to them until they choose to cite it.

### 3. Lavender's tone coach → Self-review tone preview
- **source_tool + source_pattern**: Lavender → real-time score on outgoing emails ("too long," "too formal," "no question"). Writer keeps control; suggestion is a hint, not a rewrite.
- **translated_feature**: On a self-review draft, a "tone preview" panel shows: hedging-language count ("I think / maybe / kind of"), passive-voice ratio, balance of "I" vs "we", proportion of weak verbs ("helped with") vs strong verbs ("led / shipped / decided"). No scoring of the *person* — only the *draft*. User can ignore.
- **id**: `pf-tone-preview`
- **name**: Self-review tone preview
- **description**: Live linting of hedging, voice, ownership balance on a self-review draft.
- **primary_user**: employee
- **help_mode**: coach
- **ai_mode**: deterministic NLP (no LLM judgement)
- **complexity**: S
- **poc_fit**: high
- **trust_pattern**: Ephemeral. Never stored, never shown to manager, never aggregated. Same pattern as a spellchecker.

### 4. Lavender for managers → Manager-feedback tone preview
- **source_tool + source_pattern**: Lavender → coaches the writer, doesn't ghost-write.
- **translated_feature**: Same tone preview applied to manager-written feedback: flags "harsh-without-specifics" phrasing (e.g. negative adjectives with zero behavioral anchor), gendered descriptors known to skew reviews ("abrasive," "emotional"), and "feedback without forward-action" (criticism + no suggested next step). Manager decides what to change.
- **id**: `pf-feedback-tone-check`
- **name**: Feedback tone check
- **description**: Pre-submit linter for manager-written feedback — bias language, missing specifics, missing forward-action.
- **primary_user**: manager
- **help_mode**: coach
- **ai_mode**: pattern matching + LLM critique with explicit "manager decides"
- **complexity**: M
- **poc_fit**: high
- **trust_pattern**: Suggestions only, never auto-applied. Manager sees the lint privately before submitting; HR never sees flagged items.

### 5. Salesloft scorecard cards → 1:1 prep card
- **source_tool + source_pattern**: Salesloft Coach → per-rep cards aggregate the inputs a manager needs before a 1:1 (activity, deals at risk, last coaching note).
- **translated_feature**: Per-direct-report card before each 1:1: their last-cycle goals, progress they self-logged, recognition received, last 3 manager notes, next career-conversation milestone. Read-only. Manager adds notes during the meeting.
- **id**: `pf-1on1-prep-card`
- **name**: 1:1 prep card
- **description**: Read-only digest of everything already in the system about a direct report, refreshed before each 1:1.
- **primary_user**: manager
- **help_mode**: assemble context
- **ai_mode**: retrieval only
- **complexity**: S
- **poc_fit**: high
- **trust_pattern**: No new content is generated. Everything shown already exists somewhere in the HRIS / goals / recognition. Aggregation is the only added value.

### 6. Gong call-moment library → Manager-prompt library
- **source_tool + source_pattern**: Gong → searchable library of coaching moments ("how does a top closer handle pricing pushback?").
- **translated_feature**: Curated library of conversation starters tagged by situation: "underperformer who is unaware," "high-performer who is bored," "promotion deferred," "first feedback after a miss." Manager picks one as a starting frame, not a script.
- **id**: `pf-conversation-starters`
- **name**: Conversation-starter library
- **description**: Tagged playbook of opening frames for hard 1:1 topics; managers customize before using.
- **primary_user**: manager
- **help_mode**: scaffold
- **ai_mode**: curated static content + optional LLM rewrite to fit the report's context (LLM only on the *frame*, not on the person)
- **complexity**: S
- **poc_fit**: high
- **trust_pattern**: Static content authored by HR/coaches, not generated per-person. LLM only rewrites the template, not personal data.

### 7. Reclaim "Focus Time defense" → Review-writing block defense
- **source_tool + source_pattern**: Reclaim → auto-creates calendar holds for focus time, defends them against meeting requests, flex-moves them when needed.
- **translated_feature**: During review cycle window, system auto-proposes (does NOT force-create) 90-min calendar holds labeled "Review writing" on the employee's calendar — pre-aligned with their existing focus blocks. Employee accepts/edits/declines. Manager gets a different auto-proposal: 60-min "Review drafting" blocks distributed across the cycle window so they aren't all dumped on the last weekend.
- **id**: `pf-review-writing-block`
- **name**: Review-writing block proposal
- **description**: Proposed (not booked) calendar holds for self-review and manager-review writing time, scheduled within the cycle window.
- **primary_user**: employee + manager
- **help_mode**: protect time
- **ai_mode**: rule-based scheduling, no LLM
- **complexity**: M
- **poc_fit**: high
- **trust_pattern**: Proposed only. Calendar event is created only on explicit accept. Easy to delete. No nag if declined.

### 8. Reclaim "Initiatives" → Org-level fairness initiative
- **source_tool + source_pattern**: Reclaim → company-wide "Initiatives" (No-Meeting-Day, Buffer Time, Meeting Agenda) — culture nudges with metrics, not policies.
- **translated_feature**: HR can launch a cycle-wide "Initiative": e.g. "every manager spends ≥30 min in dedicated review-writing time per report." Surface a dashboard of completion *rates by team* (not by individual), with a banner reminding managers that the goal is the behavior, not the metric. Opt-out per team lead.
- **id**: `pf-cycle-initiative`
- **name**: Cycle initiative dashboard
- **description**: Opt-in org-level behavioral nudges during a cycle (writing time, calibration prep time, 1:1 cadence) — measured at team level, not individual.
- **primary_user**: HR / People Ops
- **help_mode**: scaffold culture
- **ai_mode**: pure analytics
- **complexity**: M
- **poc_fit**: medium
- **trust_pattern**: Team-level only. Never names individuals. Easy team opt-out. Initiative ends with cycle.

### 9. Motion task auto-planning → Review-task auto-planner (per individual)
- **source_tool + source_pattern**: Motion → drops tasks into calendar slots based on priority + deadline, reshuffles when something slips.
- **translated_feature**: A "Review checklist" view for employees: 5–7 micro-tasks (gather goals → list wins → request peer feedback → draft → tone-preview → submit). Each has a suggested calendar slot, draggable. If the user slips one, the others reshuffle within the cycle window. No silent auto-booking.
- **id**: `pf-review-checklist`
- **name**: Cycle checklist
- **description**: Time-boxed micro-tasks for the review cycle, slot-aware but never auto-booked.
- **primary_user**: employee
- **help_mode**: scaffold workflow
- **ai_mode**: deterministic, no LLM
- **complexity**: S
- **poc_fit**: high
- **trust_pattern**: Visual scheduler only — nothing lands on real calendar without an explicit click.

### 10. Spinach meeting notes (manager mode) → 1:1 action-item capture
- **source_tool + source_pattern**: Spinach → AI captures decisions + action items from a meeting; humans confirm.
- **translated_feature**: Manager-only 1:1 note pad (typed, not transcribed — never recorded audio). When the manager flags lines as "action: report" or "action: me," they auto-route into the per-direct-report card (see #5) and the manager's own todo. Nothing is transcribed; manager writes everything. AI only categorizes typed lines.
- **id**: `pf-1on1-notepad`
- **name**: 1:1 typed notepad with action routing
- **description**: Typed (never recorded) 1:1 notes with action-item routing.
- **primary_user**: manager
- **help_mode**: capture + route
- **ai_mode**: classification of typed lines only
- **complexity**: S
- **poc_fit**: high
- **trust_pattern**: Never records audio. Visible only to the manager. Report sees a separate "shared follow-ups" view of only the lines marked "share."

### 11. Linear "cycle summary" → "What shipped this half" auto-summary
- **source_tool + source_pattern**: Linear → end-of-cycle summary aggregates issues completed, with humans editing the narrative.
- **translated_feature**: At cycle close, auto-draft a "what I did this half" summary using only *structured* data the employee has already entered: completed goals, OKR check-ins, recognition received, projects assigned in HRIS, presentations logged. Employee gets a draft they can rewrite — system never submits it. Crucially: no code/PRs/Linear data, only HR-system data.
- **id**: `pf-shipped-this-half`
- **name**: "Shipped this half" draft
- **description**: First-draft of the self-review's accomplishments section from HRIS-only structured data.
- **primary_user**: employee
- **help_mode**: draft starter
- **ai_mode**: LLM summarization of structured fields only
- **complexity**: M
- **poc_fit**: high
- **trust_pattern**: Always presented as "draft — edit before submit." Source rows visible inline so user can verify provenance. Never auto-submits.

### 12. Linear "Triage Intelligence" → Goal-progress auto-tag
- **source_tool + source_pattern**: Linear → AI auto-suggests labels (Performance, iOS) but the human accepts.
- **translated_feature**: When an employee logs a completed initiative, AI suggests which goal(s) it maps to and which competency it touches. Employee confirms or rejects. Over a cycle, this produces a clean evidence trail without forcing the employee to categorize as they go.
- **id**: `pf-evidence-autotag`
- **name**: Evidence auto-tagging
- **description**: AI proposes goal + competency tags on logged accomplishments; employee accepts/rejects.
- **primary_user**: employee
- **help_mode**: classify
- **ai_mode**: LLM classification with confidence + alternatives
- **complexity**: M
- **poc_fit**: high
- **trust_pattern**: Suggestions, never silent writes. Show top-3 candidates + "none of these." Reject is a first-class option.

### 13. Glean "find anything *I* touched" → Self-review evidence retriever
- **source_tool + source_pattern**: Glean → personalized search grounded in everything the user already has access to. Returns artifacts, not summaries.
- **translated_feature**: Inside the self-review draft, a search box: "show me everything I logged about onboarding." Returns the user's *own* HRIS entries (goals, check-ins, recognition, manager notes the user can see, completed trainings) as snippets ready to cite. Read-only retrieval.
- **id**: `pf-evidence-search`
- **name**: Self-evidence search
- **description**: Personal-scope semantic search across the user's own HR-system data, returning citable snippets.
- **primary_user**: employee
- **help_mode**: retrieve
- **ai_mode**: vector search over user's own records
- **complexity**: M
- **poc_fit**: medium
- **trust_pattern**: Strictly user's own data — no cross-employee retrieval, no manager visibility into searches. Same access-control rules as the rest of the HRIS.

### 14. Notion AI workspace context → "Why this rating?" explainer
- **source_tool + source_pattern**: Notion AI → drafts using *your own pages* as context; transparency about source pages.
- **translated_feature**: When a manager assigns a rating, the system can generate a draft rationale paragraph using the goals + evidence the manager has cited, with each sentence linked back to the source field. Manager edits. The point isn't to write the rationale — it's to *force grounding*: the manager can't generate a paragraph that isn't tied to evidence already in the system.
- **id**: `pf-grounded-rationale`
- **name**: Grounded rationale draft
- **description**: LLM drafts a rating rationale citing only the evidence the manager has already attached; manager edits.
- **primary_user**: manager
- **help_mode**: structure
- **ai_mode**: grounded generation, refuses to write if evidence is missing
- **complexity**: M
- **poc_fit**: high
- **trust_pattern**: Will not generate unsupported claims — if evidence is missing, returns a checklist of "you haven't cited anything for X." Manager either adds evidence or accepts the gap; AI never invents.

### 15. Grammarly brand-tone profile → Manager calibration-voice profile
- **source_tool + source_pattern**: Grammarly Business → org-wide brand-tone profile turned into writer suggestions, opt-in per writer.
- **translated_feature**: Calibration committee defines what "Exceeds expectations" *language* looks like for the org (specific verbs, level of behavioral evidence, length). Managers writing reviews see how their draft compares — not a score, just a comparison strip showing typical phrasing for each rating band. Forces calibration without enforcing words.
- **id**: `pf-calibration-voice`
- **name**: Calibration-voice reference
- **description**: Side-panel showing typical phrasing per rating band so managers self-calibrate during drafting.
- **primary_user**: manager
- **help_mode**: calibrate
- **ai_mode**: retrieval + similarity, no scoring
- **complexity**: M
- **poc_fit**: medium
- **trust_pattern**: Never auto-changes wording. Reference panel only. Calibration committee owns the corpus, refreshed each cycle, never auto-derived from individual reviews.

### 16. Mem "find by description" → Career-conversation memory
- **source_tool + source_pattern**: Mem → semantic recall: "that thing on the tip of your tongue, even without keywords."
- **translated_feature**: An employee can ask "what did my manager say about my presentation skills last year?" — the system returns the relevant snippets from prior 1:1 notes the manager shared with them and prior review comments. Forward-looking version: "what do I want to work on?" surfaces aspirations the user wrote in any prior check-in.
- **id**: `pf-career-recall`
- **name**: Career-conversation recall
- **description**: Semantic search across the user's own past 1:1 shared notes, reviews, and check-ins.
- **primary_user**: employee
- **help_mode**: recall
- **ai_mode**: vector search
- **complexity**: S
- **poc_fit**: medium
- **trust_pattern**: Only items the user already has read access to. Search history not stored or shared with manager.

### 17. Bravely confidential coach → "Practice a hard conversation" sandbox
- **source_tool + source_pattern**: Bravely → confidential third-party coach, *deliberately decoupled from the manager hierarchy*. Aggregate insights, never individual.
- **translated_feature**: Manager-only sandbox to practice a hard conversation: types in the situation (no employee name, no IDs), gets a Socratic AI partner that role-plays the report's likely reactions and pushes back on missing specifics. Transcript never leaves the manager's account, never stored after session ends. Aggregate (anonymous) topic distribution surfaced to HR so they can build training on common pain points.
- **id**: `pf-conversation-sandbox`
- **name**: Hard-conversation sandbox
- **description**: Ephemeral role-play partner for managers preparing tough 1:1s.
- **primary_user**: manager
- **help_mode**: rehearse
- **ai_mode**: LLM role-play with explicit no-storage policy
- **complexity**: M
- **poc_fit**: medium (privacy story is the hardest part)
- **trust_pattern**: No employee identifiers accepted. Transcripts ephemeral. Aggregate topic stats only; individual content never logged.

### 18. Lavender leaderboard inversion → Personal-growth streak (private)
- **source_tool + source_pattern**: Lavender's gamified leaderboard. *Inverted* because comparing employees is the anti-pattern.
- **translated_feature**: Private, personal-only "growth streak": number of check-ins logged, peer-feedback requests sent, learning hours completed. Visible only to the user. Never shown to manager, never aggregated for ranking. Pure self-motivation surface.
- **id**: `pf-personal-streak`
- **name**: Personal growth streak
- **description**: Private streak of self-development behaviors.
- **primary_user**: employee
- **help_mode**: motivate
- **ai_mode**: counters, no AI
- **complexity**: S
- **poc_fit**: low (nice-to-have, easy to ship later)
- **trust_pattern**: Private by default and by architecture. No share button. No manager view. Streaks resetting is fine — there's no penalty.

## Anti-patterns from adjacent industries (do NOT port)

| Source | Anti-pattern | Why it would fail in perf+comp | Surveillance feel? |
|---|---|---|---|
| Gong / Chorus | Full call recording + searchable transcripts | Recording 1:1s would destroy psychological safety. Most EU works councils would refuse. | Severe |
| Outreach Kaia | Real-time prompts during the conversation ("ask this!") | Manager becomes a puppet. Report can feel something is "off." Erodes trust. | Severe |
| Chorus / Gong | "Winning behaviors" auto-detection on individual reps | Treating people as patterns to optimize. Crosses into behavioral surveillance. | Severe |
| Crystal (HR-adjacent) | Personality-from-public-data scoring | DISC/MBTI on people without consent. CNIL/GDPR red flag. | Severe |
| Lavender | Public leaderboard of "writing scores" | Public ranking of employees on writing quality is degrading; chills honesty. | Severe |
| Gong | "Deal health" auto-score per rep dashboard for managers | A red/yellow/green "employee health" surface invites manager laziness — treats colour as truth. | Severe |
| Motion / Reclaim | Hard-block auto-bookings on the user's calendar without consent | Loss of autonomy. Sloow-style failure mode: prescription where description was needed. | Moderate |
| Spinach | Auto-recording every 1:1 by default | Same as Gong — would freeze candor. Recording option must be explicit, opt-in, per session. | Severe |
| Linear AI / Codex | Agent autonomously *acts* on tickets | Translated to perf: AI auto-writing review text and submitting. Removes the human signature; legally fraught (FR requires manager-signed appraisals). | Severe |
| Glean | Cross-employee retrieval ("show me everyone who worked on X") | When applied to perf data, becomes ranking infrastructure. | Severe |
| Bravely (mis-port) | Coaching transcripts shared with manager "for context" | Confidentiality is the *product*. Breaking it kills the value. | Severe |
| Gong | "Talk-time ratio" metrics for sales calls applied to 1:1s | Quantifying the wrong thing (talk-time) as proxy for quality. Classic Goodhart. | Severe |
| Asana AI | "AI Teammates" that own tasks end-to-end | Translated to perf: AI as a peer reviewer. Removes accountability. Disallowed by EU AI Act high-risk classification anyway. | Severe |

## Common trust patterns across the surveyed tools

These five patterns recur in the tools that succeeded *without* becoming surveillance:

1. **Suggest, never silent-write.** Lavender, Reclaim, Linear Triage all propose; humans accept. Apply to every Qonto feature: AI output is always editable before it persists.
2. **Read-only aggregation beats inference.** Glean and the Salesloft-style prep card win by *gathering what already exists*, not by inferring new conclusions. Cheap, defensible, no model risk.
3. **Source provenance, always shown.** Notion AI's "shown sources" pattern: every AI sentence in the perf product should link to the field it came from. Removes the "where did this score come from?" question entirely.
4. **Ephemeral by default for rehearsal.** Bravely's confidentiality is the product. The conversation-sandbox feature (#17) only works if storage is explicitly absent.
5. **Aggregate at team level, never individual.** Reclaim's Initiatives surface team metrics; Bravely surfaces aggregate themes. Individual-level dashboards for managers about *their reports' behaviors* almost always trip the surveillance line.

## Sources

- Gong — `https://www.gong.io/` (saved: `sales-coaching/gong/page.md`)
- Chorus — `https://www.zoominfo.com/products/chorus` (saved: `sales-coaching/chorus/page.md`)
- Lavender — `https://www.lavender.ai/` (saved: `sales-coaching/lavender/page.md`)
- Salesloft Coach — `https://www.salesloft.com/platform/coach` (404 at fetch time; pattern from domain knowledge)
- Outreach Kaia — `https://www.outreach.io/products/kaia` (404 at fetch time; pattern from domain knowledge)
- Reclaim — `https://reclaim.ai/` (saved: `calendar-focus/reclaim/page.md`)
- Clockwise — `https://www.getclockwise.com/` (light page; pattern from domain knowledge)
- Motion — `https://www.usemotion.com/` (saved: `calendar-focus/motion/page.md`)
- Spinach — `https://www.spinach.ai/` (saved: `calendar-focus/spinach/page.md`)
- Linear — `https://linear.app/` (saved: `project-mgmt/linear/page.md`)
- Height — `https://height.app/` (ECONNRESET; pattern from domain knowledge)
- Asana AI — `https://asana.com/product/ai` (saved: `project-mgmt/asana/page.md`)
- Notion AI — `https://www.notion.com/product/ai` (saved: `project-mgmt/notion/page.md`)
- Glean — `https://www.glean.com/` (saved: `knowledge-rag/glean/page.md`)
- Grammarly Business — `https://www.grammarly.com/business` (saved: `writing/grammarly/page.md`)
- Mem — `https://get.mem.ai/` (saved: `writing/mem/page.md`)
- Bravely — `https://www.workbravely.com/` (saved: `difficult-conv/bravely/page.md`)
