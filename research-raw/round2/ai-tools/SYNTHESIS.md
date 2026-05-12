# AI-Augment HR Tools — Round 2 Deep Scan

**Constraint:** pure augment only. Every feature must satisfy *"help, don't decide"* — no auto-rating, no auto-ranking, no AI-generated calibration verdicts.

**Context:** Qonto (~1,600 Qontoers, 8 countries, perf + comp scope).

---

## Tools (table)

| Tool | URL | Best pure-augment feature | Anti-pattern they fell into |
|---|---|---|---|
| Lattice AI | https://lattice.com/ai | Engagement Insights: surface trends from open-ended survey comments | Borderline — "Performance Insights" pulls toward review-drafting |
| Mesh Maven | https://www.mesh.ai/platform/maven-ai-coaching-copilot | Real-time COIN-framework coaching at moment of need | Post-review action plans flagged as "data-backed recommendations" — risk of prescriptive growth path |
| Effy AI | https://www.effy.ai/ | Instant theme summary across a 360 cycle (themes, not verdict) | Auto-generated review questions if reviewer skips question design |
| Zavvy / Deel Engage | https://www.zavvy.io/ai | AI-created growth plan grounded in real feedback + real course library | 9-box / spider charts if AI-positioned |
| Macorva | https://www.macorva.com/products/performance-management | Bias-and-evidence checker on submitted drafts (second-pass critic) | AI-generated initial drafts of full reviews — strongest anchor effect risk in the set |
| Praisidio | https://praisidio.com/ | Natural-language HR data Q&A, per-tenant model, RBAC-enforced | "Predictive insights" on individuals (flight risk) without transparency |
| Workhuman AI Assistant | https://www.workhuman.com/products/ai-assistant/ | Real-time bias coach on recognition writing (suggests inclusive wording) | "Talent intelligence" surfacing skills from recognition data — fine for self-edit, risky as hidden grade |
| Glean for HR | https://www.glean.com/solutions/people | Inline-cited, permission-inherited RAG search across HRIS + docs | Agentic actions inside Workday without confirmation step |
| Bunch.ai | https://bunch.ai/ | Daily personalized leadership-tip nudge | Archetype labeling ("you are The Maverick") if shared up to HR |
| Spinach | https://www.spinach.ai/ | 1:1 summary with speaker-attributed action items | Auto-routing extracted commitments to PM tools without confirm |
| PerformYard | https://www.performyard.com/ | AI-assisted 1:1 summaries + explicit "human interaction over algorithms" stance | "AI-backed narrative for the board" aggregates individuals invisibly |
| Leapsome AI | https://www.leapsome.com/product/leapsome-ai | AI Copilot retrieves past feedback/goals/achievements during review writing | None obvious — strongest "augment not decide" framing in the set |
| Cooleaf | https://www.cooleaf.com/ | Targeted engagement surveys + manager dashboards | Automated milestone recognition — authenticity dilution |
| (HuddleUp — domain dead) | n/a | — | — |
| (Praiseworthy — not found; surveyed adjacent recognition tools) | n/a | — | — |

---

## Pure-Augment Feature Inventory

Grouped by `primary_user`. 32 features.

### Employee-facing (employee-makes-case)

#### ai-draft-self-review-from-evidence
- **name**: Self-review evidence assembler
- **description**: Pulls the employee's own goal-closures, kudos received, shipped work, and 1:1 notes into a chronological "evidence bundle" so they can write their self-review *from* it rather than from memory.
- **primary_user**: employee
- **help_mode**: employee-makes-case
- **ai_mode**: retrieve + aggregate
- **inspiration**: Leapsome AI Copilot, Macorva
- **complexity**: M
- **poc_fit**: yes (static demo with seed data)
- **trust_pattern**: every assembled item shows its source link; user picks which to include before drafting

#### highlight-extractor
- **name**: "What did I do this cycle?" extractor
- **description**: Single-button pull of standout moments from Slack/Notion/Linear activity scoped to the employee. Surfaces 10–15 candidate highlights; user selects 3–5.
- **primary_user**: employee
- **help_mode**: employee-makes-case
- **ai_mode**: retrieve
- **inspiration**: Glean
- **complexity**: L (needs connectors)
- **poc_fit**: no (backend-required)
- **trust_pattern**: inline citation to source message/doc; explicit "I missed something" button

#### voice-to-draft
- **name**: Voice-input self-review
- **description**: Employee speaks their reflection in their own language; AI transcribes and lightly cleans up — keeps their voice, doesn't rewrite.
- **primary_user**: employee
- **help_mode**: employee-makes-case
- **ai_mode**: translate (speech→text)
- **inspiration**: Leapsome Review Assistant
- **complexity**: S
- **poc_fit**: yes (browser SpeechRecognition API)
- **trust_pattern**: side-by-side raw transcript vs. cleaned version, user picks

#### multilingual-drafting
- **name**: Write-in-FR, review-in-EN bridge
- **description**: Employee writes self-review in native language; AI offers an English version for the manager to read; both versions stored, employee owns canonical.
- **primary_user**: employee
- **help_mode**: employee-makes-case
- **ai_mode**: translate
- **inspiration**: Spinach (100+ languages)
- **complexity**: S
- **poc_fit**: yes
- **trust_pattern**: dual-language storage; manager sees "translated from FR" badge

#### goal-language-coach
- **name**: SMART-goal coach
- **description**: As employee types a goal, AI suggests sharper phrasing using a named framework (SMART or COIN). Inline, never auto-replaces.
- **primary_user**: employee
- **help_mode**: employee-makes-case
- **ai_mode**: translate
- **inspiration**: Mesh Maven (COIN), Lattice Writing Assistance
- **complexity**: S
- **poc_fit**: yes
- **trust_pattern**: shows original + suggestion side by side; framework named

#### claim-strengthener
- **name**: "Add evidence" prompt
- **description**: AI notices an unsupported claim ("I improved team velocity") and prompts: "Want to attach a specific PR / metric / quote?" Doesn't fabricate evidence.
- **primary_user**: employee
- **help_mode**: employee-makes-case
- **ai_mode**: retrieve
- **inspiration**: Macorva (risk analysis on drafts)
- **complexity**: M
- **poc_fit**: yes (prompts only, no real retrieval in demo)
- **trust_pattern**: prompt is a question, not a rewrite

#### career-track-mirror
- **name**: "Where does this map?" reflector
- **description**: Employee writes about an achievement; AI shows which competency dimensions it touches per the career framework — for self-positioning, not auto-rating.
- **primary_user**: employee
- **help_mode**: employee-makes-case
- **ai_mode**: synthesize
- **inspiration**: Zavvy career frameworks
- **complexity**: M
- **poc_fit**: yes
- **trust_pattern**: shows the exact framework text + confidence ("possibly maps to X")

---

### Manager-facing (manager-does-job)

#### one-on-one-recap-with-followups
- **name**: 1:1 recap + follow-up surfacer
- **description**: Summarizes the 1:1 transcript into Decisions / Blockers / Celebrations / Next Steps; surfaces "you said you'd do X last week, did you?"
- **primary_user**: manager
- **help_mode**: manager-does-job
- **ai_mode**: synthesize
- **inspiration**: Spinach, Mesh Maven, PerformYard
- **complexity**: M
- **poc_fit**: yes (static seed transcript)
- **trust_pattern**: each item links to transcript line; manager confirms before sending

#### peer-feedback-synthesizer
- **name**: Cross-peer theme synthesizer
- **description**: Manager pastes/loads 5 peer responses; AI surfaces recurring themes and divergences. Does NOT score. Does NOT recommend a rating.
- **primary_user**: manager
- **help_mode**: manager-does-job
- **ai_mode**: synthesize
- **inspiration**: Effy AI summaries, Lattice Performance Insights
- **complexity**: M
- **poc_fit**: yes
- **trust_pattern**: every theme cites the quotes that supported it; disagreement shown explicitly

#### feedback-tone-coach
- **name**: Real-time tone & bias coach
- **description**: As manager writes feedback, flags gendered/biased language ("emotional", "abrasive"), vagueness ("good team player"), and offers concrete alternatives.
- **primary_user**: manager
- **help_mode**: manager-does-job
- **ai_mode**: translate
- **inspiration**: Workhuman DEI Coach, Lattice Writing Assistance, Macorva bias check
- **complexity**: S
- **poc_fit**: yes
- **trust_pattern**: inline suggestion, manager accepts/rejects per phrase

#### prep-pack
- **name**: Pre-1:1 prep pack
- **description**: Before a scheduled 1:1, AI assembles: last 1:1 commitments, this week's shipped work, recent feedback received, open goals.
- **primary_user**: manager
- **help_mode**: manager-does-job
- **ai_mode**: aggregate
- **inspiration**: Mesh Maven, Glean
- **complexity**: M
- **poc_fit**: yes (seed data)
- **trust_pattern**: each card cites source; manager edits agenda before meeting

#### burnout-signal-surfacer
- **name**: Burnout signal surfacer (org-level)
- **description**: Patterns across the team — declining check-in tone, missed 1:1s, after-hours messages volume — surfaced as patterns to *talk about*, not individuals to flag.
- **primary_user**: manager
- **help_mode**: manager-does-job
- **ai_mode**: aggregate
- **inspiration**: Lattice Manager Effectiveness
- **complexity**: L
- **poc_fit**: no
- **trust_pattern**: team-level only; never names an individual as "at risk"

#### review-evidence-retrieval
- **name**: "Show me what they did this cycle" agent
- **description**: For the manager writing a review, retrieves the report's PRs, kudos, 1:1 notes, goal updates — pre-organized by competency dimension.
- **primary_user**: manager
- **help_mode**: manager-does-job
- **ai_mode**: retrieve + aggregate
- **inspiration**: Glean, Leapsome AI Copilot
- **complexity**: L
- **poc_fit**: no
- **trust_pattern**: every item is a link, not a summary; manager picks what to weight

#### draft-shaper-not-drafter
- **name**: Review structure scaffolder
- **description**: Not a draft. Just a checklist: "Strengths section is empty", "You mentioned 3 examples, all from Q4 — gap in H1?". Helps the manager *not miss* sections.
- **primary_user**: manager
- **help_mode**: manager-does-job
- **ai_mode**: synthesize
- **inspiration**: Macorva (risk analysis) reframed away from drafting
- **complexity**: S
- **poc_fit**: yes
- **trust_pattern**: gaps are questions, not autofills

#### coaching-prompt-after-review
- **name**: Post-review coaching prompts for the *manager*
- **description**: After submitting a review, AI asks the *manager* coaching questions: "What's one specific behavior change you want to see by next cycle? What support will you provide?"
- **primary_user**: manager
- **help_mode**: manager-does-job
- **ai_mode**: translate (Socratic prompts)
- **inspiration**: Mesh Maven post-review action plans, Bunch
- **complexity**: S
- **poc_fit**: yes
- **trust_pattern**: prompts are questions only; output is the manager's plan, not AI's

#### calibration-prep-surfacer
- **name**: Calibration evidence-pack (NOT calibration recommender)
- **description**: For a calibration meeting, AI prepares a per-report evidence pack — quotes from feedback, goal completion, scope of work. Calibrators discuss; AI does not propose levels.
- **primary_user**: manager
- **help_mode**: manager-does-job
- **ai_mode**: aggregate
- **inspiration**: Lattice Performance Insights stripped of recommendation
- **complexity**: M
- **poc_fit**: yes (seed pack)
- **trust_pattern**: pack contains evidence only; explicit "no recommendation" disclaimer

#### question-bank-for-1on1
- **name**: Situational 1:1 question suggester
- **description**: Given current context (just shipped X, OKR Y in red, recent peer feedback Z), suggests 3 1:1 questions. Manager picks 0 or more.
- **primary_user**: manager
- **help_mode**: manager-does-job
- **ai_mode**: synthesize
- **inspiration**: Bunch.ai
- **complexity**: S
- **poc_fit**: yes
- **trust_pattern**: questions are openers, not scripts; named "suggestions"

---

### Peer-facing (peer-contributes)

#### peer-feedback-draft-from-collab
- **name**: "Help me write feedback for X" assembler
- **description**: Peer clicks "give feedback to X". AI surfaces collabs (shared PRs, doc comments, Slack threads). Peer writes from those rather than from blank page.
- **primary_user**: peer
- **help_mode**: peer-contributes
- **ai_mode**: retrieve
- **inspiration**: Glean, Leapsome AI Copilot
- **complexity**: L
- **poc_fit**: no
- **trust_pattern**: collabs are links; peer writes the prose

#### specificity-coach
- **name**: "Make it more specific" coach for peers
- **description**: When peer writes "great team player", AI prompts: "Can you point to a specific moment when this showed up?" Won't accept vague-only feedback as final.
- **primary_user**: peer
- **help_mode**: peer-contributes
- **ai_mode**: translate
- **inspiration**: Effy AI follow-up prompts, Macorva bias check
- **complexity**: S
- **poc_fit**: yes
- **trust_pattern**: prompt is escapable ("submit anyway"), not a hard block

#### peer-feedback-translation
- **name**: Peer feedback language bridge
- **description**: Peer writes feedback in their native language; subject reads it in theirs. Both versions saved.
- **primary_user**: peer
- **help_mode**: peer-contributes
- **ai_mode**: translate
- **inspiration**: Spinach multilingual
- **complexity**: S
- **poc_fit**: yes
- **trust_pattern**: both versions visible; original marked canonical

#### tone-softener
- **name**: Optional tone-softener for hard feedback
- **description**: When peer writes critical feedback, offers a "want a more constructive phrasing?" suggestion — without watering down the content.
- **primary_user**: peer
- **help_mode**: peer-contributes
- **ai_mode**: translate
- **inspiration**: Workhuman DEI Coach
- **complexity**: S
- **poc_fit**: yes
- **trust_pattern**: opt-in only; original and softened shown side by side

#### recognition-prompt-suggester
- **name**: "Have you considered recognizing X?" nudge
- **description**: Surface low-recognition moments (a colleague shipped a major thing nobody acknowledged) as a *suggestion*, not auto-recognition.
- **primary_user**: peer
- **help_mode**: peer-contributes
- **ai_mode**: synthesize
- **inspiration**: Workhuman, Cooleaf (avoiding their auto-recognition anti-pattern)
- **complexity**: M
- **poc_fit**: no
- **trust_pattern**: nudge is one-click dismissable; never sends without explicit write

---

### HR-facing (hr-sees-patterns)

#### survey-theme-clusterer
- **name**: Open-text survey theme clustering
- **description**: HR loads engagement survey free-text responses; AI clusters into themes with example quotes. Themes are labeled by the AI but HR can rename / merge / split.
- **primary_user**: hr
- **help_mode**: hr-sees-patterns
- **ai_mode**: synthesize
- **inspiration**: Lattice Engagement Insights
- **complexity**: M
- **poc_fit**: yes (static demo with sample comments)
- **trust_pattern**: each theme expands to show every supporting quote; HR can dispute/rename

#### policy-qa-with-citations
- **name**: HR policy Q&A bot
- **description**: Employees ask "how much vacation do I have left?" or "what's the parental leave policy in Italy?" — AI answers from the actual HR docs with citation, never invents.
- **primary_user**: hr (deflects volume), also serves employees
- **help_mode**: hr-sees-patterns (sees what questions are asked)
- **ai_mode**: retrieve
- **inspiration**: Glean, Lattice AI Agent, Praisidio
- **complexity**: L
- **poc_fit**: no
- **trust_pattern**: every answer cites the policy document; "I don't know" is a valid response; permissions inherited

#### unanswered-question-log
- **name**: Surface "what employees keep asking but we never wrote down"
- **description**: HR-side dashboard of questions the policy bot couldn't answer — gap-finder for the handbook.
- **primary_user**: hr
- **help_mode**: hr-sees-patterns
- **ai_mode**: aggregate
- **inspiration**: Glean (scouts), Lattice Engagement Insights
- **complexity**: S
- **poc_fit**: yes (seed list)
- **trust_pattern**: aggregated counts, anonymized; HR decides what to write

#### cycle-completion-nag
- **name**: Personalized review-completion nudge
- **description**: Instead of broadcast email, AI generates contextual nudges: "You have 3 reviews due, here's the order I'd suggest starting with (longest collab first)."
- **primary_user**: hr (managers receive)
- **help_mode**: hr-sees-patterns
- **ai_mode**: synthesize
- **inspiration**: Effy status tracking, Lattice
- **complexity**: S
- **poc_fit**: yes
- **trust_pattern**: suggestion can be ignored; never marks-complete on behalf

#### skill-gap-org-view
- **name**: Org-level skill-density view (no individual grading)
- **description**: From self-reported skills + project tags + recognition language, shows org-level density of skills — for L&D investment decisions. Per-individual view requires the employee to opt in.
- **primary_user**: hr
- **help_mode**: hr-sees-patterns
- **ai_mode**: aggregate
- **inspiration**: Workhuman "talent intelligence" reframed as org-only
- **complexity**: L
- **poc_fit**: no
- **trust_pattern**: org-level by default; individual view is employee-controlled and visible to them

#### comp-rationale-explainer
- **name**: Compensation decision explainer (for employees)
- **description**: After comp decisions are made (by humans), AI generates a personalized narrative explanation pulling from the actual factors (band, position-in-range, performance signals, business constraints). Does NOT propose the number.
- **primary_user**: hr (employees read)
- **help_mode**: hr-sees-patterns
- **ai_mode**: translate
- **inspiration**: PerformYard "comp clarity for employees"
- **complexity**: M
- **poc_fit**: yes (template + variables)
- **trust_pattern**: explanation cites the policy components; manager reviews before send; employee can ask follow-up that routes to manager

#### review-cycle-process-monitor
- **name**: Process health monitor for HR
- **description**: Surfaces: which managers are submitting reviews 2x faster than average (red flag — phoning it in?); which 360 raters always say "exceeds"; calibration meetings that ended in <30 min. Pattern surface, not action.
- **primary_user**: hr
- **help_mode**: hr-sees-patterns
- **ai_mode**: aggregate
- **inspiration**: PerformYard analytics, Praisidio
- **complexity**: M
- **poc_fit**: yes (with seed)
- **trust_pattern**: patterns are starting-points for HR conversation, not auto-tickets

#### onboarding-buddy-helper
- **name**: Onboarding context-fetcher
- **description**: New joiner asks "what does our team mean by 'tier 1 incident'?" — AI retrieves from internal docs with citation. Reduces "stupid question" tax.
- **primary_user**: employee (HR-deployed)
- **help_mode**: hr-sees-patterns
- **ai_mode**: retrieve
- **inspiration**: Glean, Lattice AI Agent
- **complexity**: L
- **poc_fit**: no
- **trust_pattern**: citation + "I don't know, here's who to ask" fallback

#### recognition-writing-helper
- **name**: Recognition message specificity coach
- **description**: When someone writes "great job!", AI asks "great job at what specifically?" before sending. Doesn't replace, just sharpens.
- **primary_user**: peer (HR-policy-driven)
- **help_mode**: hr-sees-patterns
- **ai_mode**: translate
- **inspiration**: Workhuman Recognition Advisor
- **complexity**: S
- **poc_fit**: yes
- **trust_pattern**: send-anyway escape hatch; framed as suggestion not block

#### exit-interview-summarizer
- **name**: Exit-interview theme tracker (de-identified)
- **description**: Anonymized aggregation of exit-interview themes over time; surfaces "voluntary attrition reasons cluster around X in Q1." HR acts on patterns, never on individuals.
- **primary_user**: hr
- **help_mode**: hr-sees-patterns
- **ai_mode**: aggregate
- **inspiration**: Workhuman iQ, Praisidio
- **complexity**: M
- **poc_fit**: yes (seed)
- **trust_pattern**: de-identified, k-anonymity threshold (≥5 leavers per cluster)

---

## Anti-patterns to reject

Drawn from real features observed in the scanned tools.

1. **AI-generated initial draft of the full review** *(Macorva, some Lattice positioning)* — even with editability, anchoring effect dominates. Manager edits at the margin and ships AI's frame.
2. **AI-positioned 9-box / talent grid** *(Zavvy-style charts if AI-driven)* — quietly assigns performance × potential coordinates. The grid IS a rating.
3. **AI flight-risk / attrition predictions on named individuals** *(implicit in Praisidio "predictive insights")* — secret labeling. If the person doesn't see the prediction, it's a decision made without them.
4. **AI calibration recommender** — proposing levels or stack-rank for committee. Augments must surface evidence, never propose verdict.
5. **Auto-routing extracted commitments to PM tools** *(Spinach)* — AI mis-hears a casual "yeah I could maybe look at that" and creates a real ticket assigned to a real person. Needs explicit confirm.
6. **Auto-posted milestone recognition** *(Cooleaf)* — dilutes the meaning of recognition; the AI is performing the gesture, not the human.
7. **Agentic actions inside HRIS (PTO approval, comp signoff) without human confirm** *(Glean × Workday risk)* — automation masquerading as augmentation.
8. **AI-surfaced "talent" / "skills" labels visible to comp committee but not the employee** *(Workhuman talent intelligence risk)* — secret profile.
9. **Auto-generated narrative-for-the-board aggregating individuals** *(PerformYard)* — individuals never see the story being told about them.
10. **Personality/archetype assignment** *(Bunch — "you are The Maverick")* — fine for self-reflection, dangerous if read by manager/HR/comp.
11. **Mandatory specificity prompts that block submission** — turns "help" into "obstruction"; specificity coaches must always have an escape.
12. **AI bias detection that auto-redacts without showing the reviewer what was changed** — robs the reviewer of the learning moment.

---

## The pattern underneath

Three lenses that separate augment from decide, distilled from this scan:

1. **Does the AI cite its sources?** (Glean = yes; Macorva drafts = partially; pure-LLM drafts = no.)
2. **Does the user see and own the final artifact?** (Leapsome = yes; auto-routing = no.)
3. **Does the AI label individuals invisibly?** (Talent intelligence, flight risk, 9-box, archetypes — all violations.)

If a feature passes all three, it's augment. If it fails even one, it's masked decisioning.

---

## Sources

- Lattice AI — https://lattice.com/ai (WebFetch)
- Mesh Maven — https://www.mesh.ai/platform/maven-ai-coaching-copilot (WebSearch)
- Effy AI — https://www.effy.ai/features (defuddle + WebSearch)
- Zavvy / Deel Engage — https://www.zavvy.io/ai (WebSearch — original URL 404)
- Macorva — https://www.macorva.com/features/ai-performance-review-workflow (WebSearch)
- Praisidio — https://praisidio.com/ (defuddle)
- Workhuman AI Assistant — https://www.workhuman.com/products/ai-assistant/ (WebSearch — original URL 404)
- Glean for HR — https://www.glean.com/solutions/people (WebSearch — /use-cases/hr is 404)
- Bunch.ai — https://bunch.ai/ (defuddle)
- Spinach — https://www.spinach.ai/ (WebSearch — /use-cases/managers 404)
- PerformYard (Reflektive successor) — https://www.performyard.com/ (defuddle)
- Cooleaf — https://www.cooleaf.com/ (defuddle, thin content — recognition platform)
- Leapsome AI — https://www.leapsome.com/product/leapsome-ai (WebSearch, substituted for dead HuddleUpTeam.com)
- HuddleUp — domain expired / for sale; skipped
- Praiseworthy — no current product page found; recognition-AI patterns captured via adjacent tools

Per-tool notes live alongside this synthesis in `<slug>/notes.md`.
