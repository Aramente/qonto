---
name: qonto-design-system
description: Qonto's visual design tokens (colors, typography, spacing, radius) extracted directly from qonto.com's production Tailwind v4 stylesheet. Use when building any UI meant to look like Qonto.
---

# Qonto Design System

Tokens below are **real**, extracted from Qonto's live `tailwind.css` and the `<head>` of `qonto.com/en`. Not invented.

## Color Tokens

Qonto's signature palette: a deep blueberry navy as primary anchor + a wide accent palette (plum, mint, peach, sakura, mustard) in pastel-50 / saturated-1000 pairs. Black is **#050505**, not pure `#000`.

### Primary & neutrals

| Token | Hex | Use |
|---|---|---|
| `--qonto-black` | `#050505` | Primary text, hero bg |
| `--qonto-white` | `#ffffff` | Surface |
| `--qonto-grey-50` | `#f5f5f5` | Page bg |
| `--qonto-grey-100` | `#e8e8e8` | Subtle divider |
| `--qonto-grey-200` | `#e0e0e0` | Border |
| `--qonto-grey-300` | `#cccccc` | Disabled border |
| `--qonto-grey-400` | `#b8b8b8` | Placeholder |
| `--qonto-grey-500` | `#8f8f8f` | Secondary text |
| `--qonto-grey-600` | `#616161` | Body muted |
| `--qonto-grey-700` | `#3d3d3d` | Body |
| `--qonto-grey-800` | `#262626` | Heading on light |
| `--qonto-grey-900` | `#1a1a1a` | Hero text |

### Blueberry (primary brand)

| Token | Hex |
|---|---|
| `--qonto-blueberry-50` | `#c6e6fb` |
| `--qonto-blueberry-100` | `#9bc5ea` |
| `--qonto-blueberry-500` | `#3275c4` |
| `--qonto-blueberry-800` | `#71a5e0` |
| `--qonto-blueberry-900` | `#3275c4` |
| `--qonto-blueberry-1000` | `#093b75` |  ← hero navy
| `--qonto-blueberry-dark` | `#3020d8` |

### Accents (pair 50 + 1000 for pastel-on-dark or saturated-on-pastel)

| Family | 50 (pastel) | 800/900 | 1000 (deep) |
|---|---|---|---|
| Plum | `#d5c8ff` | `#a585db` / `#7b4db8` | `#461068` |
| Mint | `#c8ffec` | `#66c8c8` / `#2f95a0` | `#0d5563` |
| Peach | `#ffc9a6` | `#ff9e75` / `#ce6033` | `#7a250c` |
| Sakura | `#ffdfea` | `#e975b2` / `#c24b89` | `#7e0f4c` |
| Mustard | `#faffa4` | `#f0e060` / `#c5a635` | `#705208` |
| Orange | `#f9f3e4` | `#ea9301` | `#b04e10` |
| Red | `#ffb3b3` | `#f95656` / `#991b1b` | `#b81818` |
| Sandgold | — | `#c0a68a` (mid) | `#654d35` |

### Highlight wash (50% alpha — for inline highlights, badges)

`#c6e6fb80` (blueberry), `#c8ffec80` (mint), `#faffa480` (mustard), `#ffc9a680` (peach), `#d5c8ff80` (plum), `#ffdfea80` (sakura).

## Typography

**Font family**: `QontoSans` (custom, licensed) — falls back to `sans-serif`. Two weights in use: **regular (400)** + **semibold (600)**.

Real files at `demo/assets/qontosans-regular.woff2` and `demo/assets/qontosans-semibold.woff2`.

### Type scale (from tailwind tokens)

Pixel-precise sizes available: 8, 10, 11, 12, 13, 14, 16, 18, 19, 20, 22, 24, 26, 28, 32, 35, 40, 48, 50, 56, 64, 80, 88, 128.

Common pairings:
- Display hero: **88px / 1.0 / -0.025em** semibold
- Page title: **40px / 1.1** semibold
- Section heading: **24px / 1.25** semibold
- Body: **16px / 1.5** regular
- Small / caption: **13px / 1.5** regular
- Micro / label: **11px / 1.25** semibold uppercase tracking-wider

### Tracking & leading tokens

`--tracking-tight: -.025em`, `--tracking-tighter: -.05em` (large headings), `--tracking-wide: .025em`, `--tracking-wider: .05em` (uppercase labels).

`--leading-tight: 1.25`, `--leading-snug: 1.375`, `--leading-normal: 1.5`, `--leading-relaxed: 1.625`.

## Radius scale

| Token | Value |
|---|---|
| `--radius-xs` | `0.125rem` (2px) |
| `--radius-sm` | `0.25rem` (4px) |
| `--radius-md` | `0.375rem` (6px) |
| `--radius-lg` | `0.5rem` (8px) — **default button & input** |
| `--radius-xl` | `0.75rem` (12px) |
| `--radius-2xl` | `1rem` (16px) — **cards** |
| `--radius-3xl` | `1.5rem` (24px) — **large surfaces** |
| `--radius-4xl` | `2rem` (32px) |

## Components (observed)

- **Primary button**: black `#050505` background, white text, `radius-lg` (8px), 14–16px horizontal padding, semibold. Hover lifts to blueberry-1000.
- **Secondary button**: white bg, 1px `--qonto-grey-300` border, black text, same radius.
- **Card**: white bg, `radius-2xl` (16px), no shadow on light pages; subtle 1px border in some layouts.
- **Input**: white bg, 1px `--qonto-grey-300` border, focus ring uses `--color-blueberry-1000` or `blueberry-900`.
- **Pill / badge**: `radius-3xl`, accent-50 background + accent-1000 text.

## Logo

Qonto's wordmark uses QontoSans-style geometric forms with a distinctive lowercase **q** with descender curl. We render a stylized text wordmark in the demo (`Qonto` in QontoSans semibold) rather than ship a copyrighted SVG.

## CSS Variables snippet (copy-pasteable)

```css
:root {
  /* Primary */
  --qonto-black: #050505;
  --qonto-white: #ffffff;

  /* Grey scale */
  --qonto-grey-50:  #f5f5f5;
  --qonto-grey-100: #e8e8e8;
  --qonto-grey-200: #e0e0e0;
  --qonto-grey-300: #cccccc;
  --qonto-grey-400: #b8b8b8;
  --qonto-grey-500: #8f8f8f;
  --qonto-grey-600: #616161;
  --qonto-grey-700: #3d3d3d;
  --qonto-grey-800: #262626;
  --qonto-grey-900: #1a1a1a;

  /* Blueberry (primary brand accent) */
  --qonto-blueberry-50:   #c6e6fb;
  --qonto-blueberry-100:  #9bc5ea;
  --qonto-blueberry-500:  #3275c4;
  --qonto-blueberry-1000: #093b75;

  /* Accent palette */
  --qonto-plum-50:    #d5c8ff;
  --qonto-plum-1000:  #461068;
  --qonto-mint-50:    #c8ffec;
  --qonto-mint-1000:  #0d5563;
  --qonto-peach-50:   #ffc9a6;
  --qonto-peach-1000: #7a250c;
  --qonto-sakura-50:  #ffdfea;
  --qonto-sakura-1000:#7e0f4c;
  --qonto-mustard-50: #faffa4;
  --qonto-mustard-1000:#705208;
  --qonto-red-400:    #f95656;
  --qonto-red-1000:   #b81818;

  /* Radius */
  --qonto-radius-sm: 0.25rem;
  --qonto-radius-md: 0.5rem;
  --qonto-radius-lg: 1rem;
  --qonto-radius-xl: 1.5rem;

  /* Typography */
  --qonto-font-sans: "QontoSans", system-ui, -apple-system, sans-serif;
}

@font-face {
  font-family: "QontoSans";
  font-weight: 400;
  font-display: swap;
  src: url("./qontosans-regular.woff2") format("woff2");
}
@font-face {
  font-family: "QontoSans";
  font-weight: 600;
  font-display: swap;
  src: url("./qontosans-semibold.woff2") format("woff2");
}
```

## Tailwind config snippet

```js
// tailwind.config.js
export default {
  theme: {
    extend: {
      colors: {
        qonto: {
          black: "#050505",
          blueberry: { 50: "#c6e6fb", 100: "#9bc5ea", 500: "#3275c4", 1000: "#093b75" },
          plum:      { 50: "#d5c8ff", 1000: "#461068" },
          mint:      { 50: "#c8ffec", 1000: "#0d5563" },
          peach:     { 50: "#ffc9a6", 1000: "#7a250c" },
          sakura:    { 50: "#ffdfea", 1000: "#7e0f4c" },
          mustard:   { 50: "#faffa4", 1000: "#705208" },
          red:       { 400: "#f95656", 1000: "#b81818" },
          grey:      { 50: "#f5f5f5", 100: "#e8e8e8", 200: "#e0e0e0", 300: "#cccccc", 400: "#b8b8b8", 500: "#8f8f8f", 600: "#616161", 700: "#3d3d3d", 800: "#262626", 900: "#1a1a1a" },
        },
      },
      fontFamily: { sans: ["QontoSans", "system-ui", "sans-serif"] },
      borderRadius: { sm: "0.25rem", md: "0.5rem", lg: "1rem", xl: "1.5rem" },
    },
  },
};
```

## Distinctive Qonto visual signatures

1. **Pastel-50 + deep-1000 pairings on every accent family** — Qonto rarely uses mid-tone accents; they go either very pastel or very deep, and pair them.
2. **Near-black `#050505` instead of `#000`** — softens the contrast everywhere.
3. **Generous radius scale up to 32px** with `radius-2xl` (16px) being the default card.
4. **Tight letter-spacing on display type** (`-0.025em` → `-0.05em`).

## Sources

- `https://qonto.com/en` → `tailwind.css` bundle (Tailwind v4.2.1, fingerprint extracted 2026-05-12)
- QontoSans woff2 files served from the same origin
- Raw artifacts: `research-raw/qonto-design/css/tailwind.css`, `research-raw/qonto-design/qontosans-*.woff2`
