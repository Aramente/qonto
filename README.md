# Qonto Performance & Compensation — Workday Replacement (Demo)

Click-through HTML demo of a Workday replacement, built specifically for Qonto's culture and operating model. Performance reviews + compensation reviews, with no backend — every page is a static HTML file you can open and navigate.

## Try the demo

```bash
open demo/index.html
# or
cd demo && python3 -m http.server 8000 && open http://localhost:8000
```

## Demo flow

Recommended path through the 9 screens:

1. **`demo/index.html`** — landing hero with the five Qonto values and Steve Anavi quote
2. **`demo/pages/dashboard.html`** — employee home (Camille's view) · _Mine / My team / Admin_ IA
3. **`demo/pages/perf-self-review.html`** — writing a self-review with AI assist grounded in evidence
4. **`demo/pages/perf-team.html`** — manager's team dashboard (Lucca-style _vue synthèse_)
5. **`demo/pages/perf-write.html`** — manager writing a review using the **three pillars** (Boost Individual / Catalyze Collective / Build the Team)
6. **`demo/pages/perf-calibration.html`** — Lattice-style 3×3 calibration box view with bias signals — the "wow" screen
7. **`demo/pages/comp-team.html`** — manager compensation worksheet with **Figures-style position-in-band rows** + live envelope tracker
8. **`demo/pages/comp-letter.html`** — Pave-style Visual Offer Letter, three-pillar framed
9. **`demo/pages/admin-cycles.html`** — People-team campaign manager + 3-step launch wizard (`admin-cycle-new.html`)
10. **`demo/pages/admin-insights.html`** — rating distribution, manager bias, EU Pay Transparency heatmap

Every screen has a role-switcher in the top-right (Employee / Manager / People team) to move between views fast.

## Why this looks like Qonto

It uses the real Qonto design system, extracted from `qonto.com`'s production Tailwind CSS:

- **QontoSans** (the actual licensed font, served from `demo/assets/`)
- Real color palette: blueberry, plum, mint, peach, sakura, mustard pairs with pastel-50 + deep-1000 anchors
- Near-black `#050505` instead of pure `#000` (Qonto's signature)
- Tight tracking on display type (`-0.05em`)
- 16px radius cards, 8px button radius

And the real Qonto culture:

- **Progress Review** (not "performance review") — Qonto's actual term
- The **three pillars** (Boost Individual / Catalyze Collective / Build the Team) as the manager review structure
- The five values (Customer Focus · Ownership · Teamwork · Mastery · Integrity)
- **Skill matrix** + **salary grid** as the structural anchors
- **Andon** culture references — Qonto's Lean operating model
- "Qontoer" as the in-product term for employees
- Steve Anavi quote on the landing page
- Bilingual (FR/EN) touches: "Lancer une campagne", "Préparation groupée"

## What's in `.claude/`

```
.claude/
  skills/                          Research artifacts — Claude reads these like a knowledge base
    qonto-culture/SKILL.md         Values, voice, Progress Review philosophy, three pillars
    qonto-design-system/SKILL.md   Real tokens from qonto.com — copy-paste CSS + Tailwind
    perf-review-competitors/SKILL.md  Lattice, Leapsome, Lucca, Javelo, Figures, Pave, Ravio + 11 more
    perf-review-oss/SKILL.md       GitHub mine: frappe/hrms, Horilla, OrangeHRM, Gauzy, Huly, etc.
    ai-native-perf-comp/SKILL.md   Mesh, Effy, Macorva, Zavvy, Praisidio, Lattice Coach

  agents/                          Researcher definitions — re-run any time to refresh
    qonto-culture-researcher.md
    qonto-design-extractor.md
    perf-review-competitor-scout.md
    perf-review-oss-scout.md
    ai-native-perf-comp-scout.md
```

## Research provenance

Every skill is sourced. The competitor synthesis links 30+ product pages. The culture skill cites 13 Qonto Medium posts + careers pages. The design system was extracted directly from qonto.com's `tailwind.css` (Tailwind v4.2.1) and their hosted woff2 fonts — raw assets are at `research-raw/qonto-design/`.

To refresh any of the research, ask Claude: *"Re-run the perf-review-competitor-scout agent"*.

## Repo layout

```
demo/                  Static HTML demo — start at index.html
  pages/               9 click-through screens
  assets/              CSS + QontoSans woff2 fonts

.claude/
  skills/              5 SKILL.md research files
  agents/              5 researcher definitions

research-raw/          Raw page dumps, READMEs, captured CSS — uncurated
```

## Status

Demo + 5 research skills + 5 research agents shipped. No backend. Click-through only.

Built 2026-05-12.
