# Praisidio

URL: https://praisidio.com/

## Features (from defuddle of homepage)
- **Conversational HR data assistant** — ask HR questions in natural language, get instant analytics
- **Custom instant reports** across payroll, time cards, recruiting
- **Unified HR data layer** + 30+ integrations (ADP, Workday, Lattice, etc.)
- **Predictive insights** ("predictive insights that BI never could")
- **Per-tenant model** — trained only on your data, no cross-tenant
- **Role-based access controls** — sensitive data fenced by role

## Trust pattern
- Explicit: not trained on cross-customer data
- RBAC at fine grain — HR sees what their role permits
- Acknowledges data isn't perfect — offers cleanup support

## Anti-patterns
"Predictive insights" — if predictions about *individuals* (flight risk, performance trajectory) without consent and explicit user awareness, that's a decision-shaping black box. Acceptable as org-level pattern only.
