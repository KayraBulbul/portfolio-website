<!-- Hallmark · pre-emit critique: P5 H5 E5 S5 R5 V5 -->
<!-- Hallmark · studied: yes · DNA-source: url · adapted for: software engineering portfolio -->

# Design — Kayra Bulbul Portfolio

Locked design system. Future Hallmark runs read this file first and defer to it.
Amend intentionally; preserve the routes, content, functionality, component ownership,
and information architecture already present in the project.

## System

- Genre · editorial
- Macrostructure · Type Specimen adapted as an Engineering Folio
- Theme · custom (vibe: "charcoal systems folio, warm proofs, orange signal")
- Axes · dual charcoal/light paper / display-heavy variable sans / warm orange
- Navigation · preserve the existing destinations; visually reinterpret as a restrained index or marginal rail
- Active navigation · the marginal rail follows the section crossing the viewport reading line; devlog routes hold the Devlogs item active
- Footer · mast-headed close with a short colophon and immediately legible contact links
- Brand mark · a sharp, font-independent K: ink stem and lower arm, orange upper arm, square paper field, no rounded tile
- Modes · preserve the existing `html.dark` class toggle, local preference, and charcoal dark default

## Provenance

- Source mode · URL
- Source · <https://www.usehallmark.com/examples/press-01/>
- Extracted · 2026-08-14
- Attestation · public reference used as inspiration for the user's own portfolio
- Confidence · colour and fonts are exact from source CSS; the red accent is intentionally replaced with orange
- Rhythm note · structure was inspected in rendered browser views, but exact full-page rhythm should be verified during implementation

## Tokens

Canonical values are emitted in `tokens.css`; this section remains the human-readable contract.

```css
:root {
  color-scheme: light;
  --color-paper:      oklch(93% 0.020 70);
  --color-paper-2:    oklch(89% 0.024 68);
  --color-paper-3:    oklch(86% 0.026 66);
  --color-ink:        oklch(17% 0.024 32);
  --color-ink-2:      oklch(28% 0.020 35);
  --color-neutral:    oklch(36% 0.018 38);
  --color-muted:      oklch(46% 0.018 40);
  --color-rule:       oklch(74% 0.024 60);
  --color-rule-2:     oklch(60% 0.024 56);
  --color-accent:     oklch(43% 0.170 50);
  --color-accent-hover: oklch(37% 0.180 48);
  --color-accent-contrast: oklch(78% 0.140 64);
  --color-accent-ink: oklch(97% 0.012 70);
  --color-focus:      oklch(48% 0.190 50);
  --color-shadow:     oklch(17% 0.024 32 / 0.18);

  --font-display: "Bricolage Grotesque", ui-sans-serif, system-ui, sans-serif;
  --font-body: "Fraunces", ui-serif, Georgia, serif;
  --font-mono: "JetBrains Mono", ui-monospace, "SFMono-Regular", Menlo, monospace;

  --space-3xs: 0.125rem; --space-2xs: 0.25rem; --space-xs: 0.5rem;
  --space-sm: 0.75rem; --space-md: 1rem; --space-lg: 1.5rem;
  --space-xl: 2.5rem; --space-2xl: 4rem; --space-3xl: 6.5rem; --space-4xl: 10rem;
  --space-5xl: 13rem;

  --text-xs: 0.75rem; --text-sm: 0.8125rem; --text-base: 1rem;
  --text-md: 1.125rem; --text-lg: 1.375rem; --text-xl: 2.25rem;
  --text-2xl: 3.75rem; --text-display-s: clamp(2.75rem, 7vw, 5.25rem);
  --text-display: clamp(3.25rem, 9vw, 7.5rem);

  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
  --dur-micro: 120ms; --dur-short: 220ms; --dur-long: 560ms;
  --radius-card: 0; --radius-pill: 0; --radius-input: 0;
}

.dark {
  color-scheme: dark;
  --color-paper:      oklch(16% 0.006 60);
  --color-paper-2:    oklch(20% 0.007 60);
  --color-paper-3:    oklch(25% 0.008 60);
  --color-ink:        oklch(95% 0.010 60);
  --color-ink-2:      oklch(86% 0.010 60);
  --color-neutral:    oklch(74% 0.009 60);
  --color-muted:      oklch(65% 0.009 60);
  --color-rule:       oklch(34% 0.008 60);
  --color-rule-2:     oklch(46% 0.009 60);
  --color-accent:     oklch(72% 0.160 60);
  --color-accent-hover: oklch(78% 0.150 65);
  --color-accent-contrast: oklch(43% 0.170 50);
  --color-accent-ink: oklch(17% 0.024 32);
  --color-focus:      oklch(78% 0.150 65);
  --color-shadow:     oklch(5% 0.006 60 / 0.38);
}
```

## Typography and composition

- Typography is the primary visual material: roman display headings, serif prose, and monospace metadata.
- Hero copy may become oversized composition, but must remain readable, wrap safely, and identify Kayra's role immediately.
- Use large changes in scale rather than extra chrome: display headline, section title, body, then compact labels.
- Section eyebrows are off by default. Do not add decorative Plate, Index, or chapter labels above page sections; number only genuinely ordinal project or experience items.
- Build on a disciplined grid. Permit at most one obvious grid-breaking element in a composition so the exception reads as intentional.
- Use hairline rules, alternating press/proof surfaces, and whitespace for grouping; avoid generic card grids.
- Keep prose measures near 60–65 characters and metadata aligned into predictable columns.
- Headings remain roman. Italic is reserved for emphasis inside running prose.

## Portfolio information architecture

- Preserve `/`, `/devlog`, and `/devlog/:slug`, plus all current home-page anchors and theme behavior.
- Home remains Hero · About · Projects · Skills · Devlogs · Contact. Do not reorder or rename content without approval.
- Projects · treat featured work as editorial proof sheets and the remaining work as a ruled ledger. Always expose title, purpose, stack, and repository link without hover.
- Experience · when present, use chronological ledger rows: dates, organisation, role, and concise outcomes. Do not invent employment history.
- Skills · use a compact, grouped technical index or spec sheet; categories and keywords must scan faster than prose.
- Devlogs · use dated index rows and preserve search, tag filtering, article routes, and Markdown behavior.
- Contact · keep email, GitHub, LinkedIn, X, and resume immediately visible and keyboard accessible.
- Recruiter scan · role, location, education, strongest projects, technologies, availability, and contact path must be findable within one pass.
- Current role and focus · Software Engineer; backend engineering, infrastructure, and systems.
- Never hide project facts, experience details, or contact information behind animation, hover, disclosure, or decorative overlays.

## CTA voice

- Primary · orange fill, high-contrast mode-aware ink, square geometry, compact monospace label.
- Secondary · typographic link or hairline outline, square geometry, orange shift on hover.
- Prefer descriptive verbs such as `View project`, `Read devlog`, `Open resume`, and `Send email`.
- Focus rings use `--color-focus`, appear instantly, and maintain at least 3:1 contrast.

## Motion stance

- One orchestrated fade-up reveal may establish the page; otherwise motion is functional and restrained.
- Variable-type movement is allowed only where it communicates engineering systems or interaction, never as ambient noise.
- Animate transform and opacity only. Do not use `transition: all`, card scaling, bounce, or scroll hijacking.
- Reduced-motion fallback · no spatial movement; use an opacity crossfade of 150ms or less.

## Responsive rules

- Preserve scan order at every width; the DOM order remains the reading order.
- Collapse marginal navigation and multi-column ledgers below 60rem without hiding destinations or metadata.
- At 40rem and below, labels move inline, project facts stack, and all interactive targets remain at least 44px.
- Display headings use `overflow-wrap: anywhere`; both `html` and `body` use `overflow-x: clip` during implementation.

## Notes

- Do not copy the reference's type-studio content, variable-font tester, poster artwork, or exact compositions.
- Do not turn every section into a numbered plate; projects and experience earn numbering only when sequence helps scanning.
- Use off-register or broken-grid effects once or twice, never as a global filter.
- Avoid rounded cards, pill-heavy skill clouds, radial glows, generic bento layouts, and excessive section eyebrows.
- Avoid literal terminal windows, fake browser chrome, invented metrics, invented experience, and hover-only evidence.
- The orange accent replaces the studied red; do not introduce a second competing chromatic accent.

## Exports

`design.md` remains the design contract. `tokens.css` is the runtime token source and
`tailwind.config.js` maps those values into the existing Tailwind 3 setup without
replacing the current dark-mode mechanism.

### CSS custom properties

```css
@import "./tokens.css";

body {
  background: var(--color-paper);
  color: var(--color-ink);
  font-family: var(--font-body);
}
```

### DTCG token shape

```json
{
  "color": {
    "paper": { "$type": "color", "$value": "oklch(93% 0.020 70)" },
    "ink": { "$type": "color", "$value": "oklch(17% 0.024 32)" },
    "accent": { "$type": "color", "$value": "oklch(43% 0.170 50)" },
    "focus": { "$type": "color", "$value": "oklch(48% 0.190 50)" }
  },
  "font": {
    "display": { "$type": "fontFamily", "$value": ["Bricolage Grotesque", "sans-serif"] },
    "body": { "$type": "fontFamily", "$value": ["Fraunces", "serif"] },
    "mono": { "$type": "fontFamily", "$value": ["JetBrains Mono", "monospace"] }
  },
  "dimension": {
    "space-md": { "$type": "dimension", "$value": { "value": 1, "unit": "rem" } },
    "space-3xl": { "$type": "dimension", "$value": { "value": 6.5, "unit": "rem" } },
    "radius-card": { "$type": "dimension", "$value": { "value": 0, "unit": "px" } }
  }
}
```

Dark-mode values are semantic overrides for the same token names, not a parallel API.

### Tailwind mapping

The live project uses Tailwind 3 and maps the CSS properties in `tailwind.config.js`.
For a portable Tailwind 4 consumer, the equivalent bridge is:

```css
@theme inline {
  --color-paper: var(--color-paper);
  --color-ink: var(--color-ink);
  --color-muted: var(--color-muted);
  --color-rule: var(--color-rule);
  --color-accent: var(--color-accent);
  --font-display: var(--font-display);
  --font-body: var(--font-body);
  --font-mono: var(--font-mono);
}
```

### shadcn-compatible semantic aliases

The site does not install shadcn or another UI framework. These aliases are provided
only for interoperability and keep the square editorial geometry intact.

```css
:root {
  --background: var(--color-paper);
  --foreground: var(--color-ink);
  --card: var(--color-paper-2);
  --card-foreground: var(--color-ink);
  --primary: var(--color-accent);
  --primary-foreground: var(--color-accent-ink);
  --muted: var(--color-paper-2);
  --muted-foreground: var(--color-muted);
  --border: var(--color-rule);
  --ring: var(--color-focus);
  --radius: 0rem;
}
```
