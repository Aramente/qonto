# Stride Open Competency Matrix

Source: https://github.com/stride-so/matrix
Built from ~20 different competency matrices/career tracks.

## Data model
- **Levels** with standardized role titles (customizable)
- **Themes** group skills
- Two skill types:
  - **Essential Skills** — transferable: communication, mentoring, leadership
  - **Technical Skills** — domain: code, testing, security, hardware, trade-offs
- **Skill attributes**: title, body/description, level-based expectations

## Format
- Primary representation: **JSON** (transposition of a spreadsheet/table)
- Go tool converts Excel -> JSON
- Designed for tooling: matrix -> job postings, tables, structured data

## Insight for Qonto
Stride's transposition idea is the right pattern: spreadsheet is the editing UX, JSON/relational is the queryable model. Anything in-product needs the structured form.
