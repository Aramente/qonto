---
name: ai-native-perf-comp
description: AI-native performance & compensation review tools — what they do, where AI shows up, trust patterns, ideas worth stealing for the Qonto demo.
---

# AI-Native Perf & Comp Tools

Survey of 7 AI-forward HR / perf / comp products (Nov 2026 product pages). Goal: identify AI features that genuinely help managers vs marketing fluff, and seed a short list to lift into the Qonto demo.

## Tools Surveyed

| Tool | URL | Core AI features | Stage |
|---|---|---|---|
| **Lattice AI** | lattice.com/ai | Performance Insights (review drafts), Engagement Insights (survey synth), Writing Assistance (grammar/bias), Team Health (trends + attrition signal), AI Agent (policy Q&A), Manager Effectiveness (burnout flags, career coaching prompts) | Mature (incumbent + OpenAI partnership) |
| **Mesh AI** | mesh.ai | "Maven" real-time coaching, GenAI nudges for check-ins, manager insight feed (cross-process synthesis), risk/trend foresight | Mid-stage |
| **Effy AI** | effy.ai | AI 360 review summaries from peer signals, OKR drafting, "40+ hours saved / cycle" framing, ChatGPT-style review writer | SMB-focused, growing |
| **Zavvy** | zavvy.io | AI Assistant for review drafts, growth plans, 1:1 agendas (page TLS-failed; G2 + 2025 launches cited) | Mature mid-market |
| **Macorva** | macorva.com | "Radiant AI" — auto-generates performance reviews, dev plans, SMART goals, OKRs, PIPs, meeting agendas from survey + customer experience data | Mid-stage |
| **Praisidio** | praisidio.com | Conversational HR analytics ("Talent Defender"), ask-anything chat on unified HRIS data, attrition/retention prediction, RBAC-guarded | Niche / analytics-first |
| **Pave AI** | pave.com | Real-time comp benchmarks + ML-driven equity grant suggestions, comp recommendation engine, AI on top of 8.7K-company live dataset | Mature, enterprise comp leader |

## AI Features That Actually Help

Organized by job-to-be-done:

### Writing self-reviews
- **Effy AI**: drafts self-assessment from peer signals + goals.
- **Macorva**: generates self-review draft from survey + 1:1 data, employee edits.
- **Lattice Writing Assistance**: real-time grammar/clarity/bias checks while you type — closer to "Grammarly for reviews" than full draft.

### Writing manager reviews
- **Lattice Performance Insights**: synthesizes cross-functional feedback, goals, growth areas into a draft review. Heaviest evidence-aware draft on the market.
- **Macorva Radiant AI**: generates the review *and* dev plan + PIP from same data substrate.
- **Effy**: shorter-form summary from 360 inputs.

### Gathering 360 / peer signals
- **Effy AI 360**: auto-summarizes peer answers into themes (strengths/improvement areas).
- **Mesh**: surfaces who to ask + auto-nudges peers for inputs.

### Calibration
- **Macorva**: claims "unbiased" rating distributions (very vague — see hype section).
- **Lattice Team Health**: trend view of ratings + engagement, but doesn't visibly do anomaly detection on calibration.
- **Praisidio**: closest to true calibration analytics — ask "show me managers whose ratings drift from peers" in natural language.

### Compensation
- **Pave AI**: equity grant suggestions tuned to live market data; comp letter / total-rewards statement generation. Closest to a "comp copilot."
- No one in the survey owns "explain why this person got this raise" cleanly — opportunity.

### Goals / OKRs
- **Macorva**: drafts SMART goals + OKRs from strategy doc + role.
- **Effy**: OKR alignment + drift detection.
- **Mesh**: progress detection via cross-tool signal.

### 1:1 prep
- **Mesh**: surfaces "what's new since last 1:1" — recent goals progress, feedback received, risks flagged.
- **Macorva**: meeting agendas auto-generated from survey insights.
- **Lattice**: career coaching prompts based on team health signals.

### Engagement / survey synthesis
- **Lattice Engagement Insights**: key driver analysis + comment trends + recommended actions, post-survey, in seconds. Strongest demo-able feature in the survey.
- **Macorva**: action plans per employee from survey feedback.

### People analytics ("ask anything")
- **Praisidio**: chat interface over unified HRIS data — "who's at retention risk on X team," with RBAC guardrails. Closest to the right shape for a manager-facing assistant.

## AI Trust & Control Patterns

What the leaders actually do to make AI trustworthy (paraphrased from product pages + screenshots):

- **Editable drafts, never silent writes**: every AI output is a starting point — Lattice / Macorva / Effy all show the human as final author.
- **Source-cited synthesis**: Lattice Performance Insights references which goals/feedback/PRs informed each paragraph (visible in screenshots). Mesh nudges link back to the underlying signal.
- **Bias check overlay** (Lattice): real-time word-level flags ("knowledge" → "expertise"), Grammarly-pattern UX.
- **Vendor data promise**: Lattice page leads with "GDPR + SOC 2" and "powered by OpenAI" — explicit transparency.
- **RBAC + own-data-only training** (Praisidio): "your installation is trained purely on your data" — directly addresses the #1 enterprise objection.
- **"Augment, not replace" framing**: Lattice opens with "augment managers" — every page hedges against autonomy fear.
- **Confidence not surfaced numerically anywhere** — gap in the market. No one shows "this draft is based on 12 signals, confidence high" the way you'd expect from a 2026 product.
- **Regenerate / variant buttons** are standard but invisible on marketing pages.

## What's Hype vs Real

Honest read:

- **Real and useful**:
  - Survey comment-trend synthesis (Lattice) — small, bounded, verifiable.
  - 360 peer-feedback summarization (Effy) — same.
  - Comp benchmark + grant suggestion (Pave) — backed by real dataset.
  - Bias / clarity writing checks (Lattice) — boring but works.
- **Plausible but unproven on marketing pages**:
  - "Manager Effectiveness" / burnout flags (Lattice). Could be solid; could be Likert delta + threshold. No methodology shown.
  - Mesh's "real-time coaching via Maven recommends." Nudge-based; usefulness depends entirely on signal quality.
  - Macorva's auto-generated PIPs. The riskiest auto-draft in the survey — putting someone on a PIP is high-stakes; "AI-generated" framing here is uncomfortable.
- **Hype**:
  - "Unbiased performance evaluations" (Macorva). No model can credibly claim this from marketing copy.
  - "AI in seconds vs days" framing universally — true for survey synthesis, much weaker for review writing where the bottleneck is *evidence collection*, not prose.
  - Effy's "40 hours saved / cycle" — almost certainly a one-customer anecdote generalized.
  - "AI Agent" / Lattice Library Q&A — a wrapper on company policy docs. Useful but not differentiated from any RAG chatbot.

## Specific AI Features Worth Building Into Our Qonto Demo

Prioritized for a manager-facing perf/comp demo. Each cites the inspiration source.

1. **Evidence-cited review draft** (from Lattice Performance Insights). Manager opens an employee, sees a draft pre-populated with bullets — each bullet links back to its source (goal, 1:1 note, PR, feedback). Manager edits, doesn't write from scratch. *Why for Qonto*: this is the single highest-leverage feature managers want from "AI HR" — and the citation pattern is how you make legal + employees trust it.

2. **360 summarizer with theme extraction** (from Effy AI 360 + Lattice Engagement Insights). After peers submit feedback, manager sees: "3 themes emerged: ownership (strong), communication in writing (mixed), stakeholder mgmt (growth area)" — with the underlying quotes one click away. *Why for Qonto*: turns 8 raw peer responses into 3 bullets — saves the part of review writing that actually takes manager hours.

3. **1:1 prep brief** (from Mesh + Lattice Manager Effectiveness). At the start of each 1:1, manager sees a generated brief: "Since last 1:1 with X: goal Y slipped, feedback Z received, engagement dipped on Q." 30-second context refresh. *Why for Qonto*: highest-frequency manager touchpoint, lowest current AI penetration — easy to wow.

4. **Bias + clarity overlay on review text** (from Lattice Writing Assistance). Inline flags as manager types: "vague verb," "gendered descriptor," "missing example." *Why for Qonto*: low risk, high credibility, regulator-friendly story (EU AI Act — bias mitigation as feature).

5. **Comp recommendation with rationale** (from Pave AI). When proposing a raise/grant, draft includes a one-paragraph rationale citing perf rating, market benchmark, and band position. Manager can edit. *Why for Qonto*: comp letters are the most-skipped write-up; if Qonto already has the underlying data (HRIS + pay bands), this is plausibly the lowest-effort, highest-perceived-magic feature.

6. **Calibration anomaly view** (gap in market — closest is Praisidio + Lattice Team Health). Show a head of function: "These 3 managers' rating distributions diverge from peers — review?" *Why for Qonto*: nobody owns this cleanly; differentiator + addresses HRBP / People Ops persona that competitors leave underserved.

7. **Conversational HR analytics scoped to manager's team** (from Praisidio). Manager asks: "Who on my team is at retention risk?" / "Who hasn't had a 1:1 in 3 weeks?" Natural-language Q&A on their own people data. *Why for Qonto*: maps to the "ask anything" pattern execs already expect from Claude/ChatGPT, but scoped + RBAC'd.

## Anti-patterns

AI features to *not* copy in the demo:

- **Auto-generated PIPs** (Macorva). PIP is a legally sensitive document — auto-drafting reads as cavalier and creates real liability exposure under EU labor law. Show evidence-citation instead; let humans write the consequences.
- **"Unbiased AI" claims**. Reads as either naive or dishonest; modern HR buyers (especially EU) view this as a red flag, not a feature.
- **AI Agent / company-policy chatbot as a hero feature**. Commodity RAG chatbot wrapped in HR branding (Lattice). Tablestakes, not differentiation. Demo it as a footnote at best.
- **Pure prose generation with no source citations**. Effy's review-summary screenshots are pretty but unsourced — biggest trust failure. Always show *where* the draft came from.
- **Generic "saves N hours" claims** without showing the workflow. They evaporate under scrutiny. Show the actual before/after surface.
- **"Powered by OpenAI" badges as a value prop** (Lattice). 2024 framing. In 2026 every buyer assumes this; leading with it now reads as dated.
- **Nudges without context** (general risk in Mesh's design). Notifications get ignored fast unless every nudge cites its specific trigger.

## Sources

Product pages parsed via `defuddle parse`, Nov 2026. Raw markdown at `/Users/kevinduchier/code/qonto/research-raw/ai-native/<slug>/`.

- Lattice: https://lattice.com/ai
- Mesh: https://www.mesh.ai/
- Effy: https://www.effy.ai/
- Zavvy: https://www.zavvy.io/ (TLS handshake failure on /product/ai-assistant — relied on G2 / public knowledge for feature list)
- Macorva: https://www.macorva.com/ + /platform/performance-management
- Praisidio: https://praisidio.com/
- Pave: https://www.pave.com/

Coverage gaps: Lattice's `/platform/ai-agent` and Mesh's `/products/maven-ai` deep pages 404'd; sufficient detail captured from main /ai and home pages. Pave's `/products/ai` not present as a single page — features distributed across product pages.
