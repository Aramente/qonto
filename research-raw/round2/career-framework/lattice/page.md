# Lattice Grow — In-product career framework

Sources:
- https://lattice.com/platform/grow
- https://help.lattice.com/hc/en-us/articles/4402717644183-Track-Templates
- https://lattice.com/templates/competency-matrix-managers

## Data model entities

### Track
A role definition (e.g., "Software Engineer"). Container for levels and competencies.

### Track Level
Columns in the matrix. Title + per-competency expectations.
Examples: Software Engineer I, Senior Software Engineer, Staff...
Templates ship with **4-6 job levels**.

### Competency Themes (4)
1. **Impact** — what the job is
2. **Behaviors** — how the job gets done
3. **Functional Skills** — what skills/experience are needed
(plus a 4th implied — varies by template)

### Competencies
Children of themes. **9-12 competencies per template**.

### Expectations
Per (Track Level x Competency) cell — the level-specific criterion.

### Individual Development Plan (IDP)
Per-employee short/long-term development goals tied to the framework.

## Templates
- IC track templates and Manager track templates (both shipped)
- Customizable: copy + edit

## Browse-ability
- Crystal clear in-product: employees see "what is needed to succeed and advance"
- Matrix is a first-class UI object, not a PDF link

## Connection to performance
- IDPs reference competencies + levels
- Manager conversation guides built around the matrix
- Reviews can map back to competencies

## Insight for Qonto
Lattice's vocabulary — **Track / Track Level / Theme / Competency / Expectation / IDP** — is a clean naming convention to copy. The Theme layer (group of competencies) is what most public ladders skip but adds real UX value (collapsing 12 competencies into 4 themes for navigation).
