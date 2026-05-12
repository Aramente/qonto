# Glean (Work AI for HR)

URL: https://www.glean.com/solutions/people (the /use-cases/hr returns 404)

## Features (WebSearch)
- **Enterprise RAG search** — retrieves internal docs and grounds responses in them
- **Knowledge graph** — maps relationships between people, teams, policies, roles, activity
- **Multi-step agents** — decomposes request, coordinates sub-agents, sends "scouts" to close knowledge gaps
- **Workday integration** — agents complete HR workflows (approvals, time-off, feedback) inside source apps
- **Access-controlled grounding** — every response filtered through the same permissions as source systems

## Trust pattern
The strongest in the set: **inline citations to source documents** on every answer + **inherits permissions from source systems** so the AI never reveals more than the user could already see. RAG explicitly framed as "reduces hallucination risk and makes outputs more defensible."

## Anti-patterns
None on the HR side. Risk is in *agentic* mode — if an agent can change HR state (approve PTO, submit feedback) without confirmation step, that's auto-decision.
