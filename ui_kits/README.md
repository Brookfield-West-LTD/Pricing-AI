# Volt Horizon — Design System

**Volt Horizon** is the design language for **Pricing AI**, an AI-guided renewable energy decision platform for Nigeria. This repository is the single source of truth for colors, typography, motion, components, and UI kits.

> *"The first moment a city comes online."*

---

## Product & brand context

**Pricing AI** helps homeowners, SMEs, facility managers, developers and installers make confident, well-priced renewable-energy decisions. The user describes what they want to power, where they are, and how they want to pay. Pria (the AI agent) asks the right follow-up questions, sizes the system, produces a budget, generates charts and schedules, and explains trade-offs in plain language.

The platform's output is not a number — it is a **complete plan**: system design + bill of quantities + project schedule + financing comparison, exportable as PDF / XLSX / shareable link.

Primary market: Nigeria. Primary comparison baseline: the user's **diesel/petrol generator**, not a grid bill. Vendor-neutral by design.

### Personas
- **Adaeze** — Lekki homeowner, 7.5 kVA generator, ₦150–220k/month on petrol
- **Tunde** — Ibadan clinic owner, needs uptime + BOQ for his board
- **Chidi** (v1.x) — installer / EPC wanting pre-qualified leads
- **Ada** (v2) — mini-grid developer, batch plans

### Sources used to build this system
- `source/volt_horizon_original.html` — the 8-section Volt Horizon design system definition (tokens, philosophy, color, type, components, motion, guardrails, handoff). This is the authoritative brand document.
- `source/pricing_ai_flow_original.jsx` — the working-draft React onboarding flow (cream/coral variant). We reference the *flow structure* from this file but re-skin every screen in Volt Horizon.
- `source/Pricing_AI_PRD.md` — the full Pricing AI PRD (v0.1, April 2026).

---

## Content fundamentals

**Voice:** confident, clear, grounded. Pria is framed as a *senior renewable-energy analyst who has priced thousands of Nigerian installations* — not a chatbot.

**Tone register:**
- **Warm and simple** with homeowners
- **Precise and technical** with installers / engineers
- **Concise** with SME owners

**Copy rules:**
- **"You"**, not "the user". Pria addresses the reader directly.
- **Naira-first**, always. `₦4,280,000`, never `$2,750`.
- **Sentence case** for buttons and UI labels ("Begin your plan", "Continue"). **ALL-CAPS mono** reserved for eyebrows and data labels ("STEP 04 / 06", "VS. YOUR GENERATOR").
- **Italics do emphasis** — set in the display serif, often paired with voltage-orange: "Design *your* energy future."
- **Em-dashes** — for linking clauses, and leading editorial eyebrows (`— A NEW WAY TO BUDGET RENEWABLE ENERGY`).
- **No emoji.** Ever. This is the brand hard rule.
- **No jargon without translation.** kWh, BOQ, LCOE always get a hover explanation.

**Examples that land:**
- Hero: *"Design **your** energy **future**."* (serif, italic emphasis, final coral period)
- Eyebrow: `— A NEW WAY TO BUDGET RENEWABLE ENERGY`
- Reveal: *"Here's your **renewable** path."*
- Pria: *"Based on your generator spend and Lekki irradiance, a 5 kW hybrid pays back in about 26 months. Want me to try it with a smaller battery?"*

**Numbers are sacred.** Every number the user sees is rendered in **JetBrains Mono** — a non-negotiable trust signal. Gradient text is reserved for the **single** hero total-cost number per screen.

---

## Visual foundations

### Atmosphere — *pre-dawn, not midnight*
The base surface is `#0A0F14` — dark with a hint of teal, like the sky just before the sun shows up. Warm enough to sit with for 20 minutes. Three soft colored glows (voltage top-left, horizon top-right, bio bottom-center) ease up from the edges of every full-bleed composition. Layered over everything: a faint SVG grain (`opacity: 0.5`, `mix-blend-mode: overlay`) to keep the screen from looking plastic.

### Color — *one volt, not many*
- **Voltage `#FF6B35`** — the primary. A hot electric coral-amber. CTAs, highlights, live states, active indicators. **Rule: never more than 10% of a screen.**
- **Bio `#7BFFAB`** — secondary. Signals "the system is alive / producing / healthy". Success states, live pulse dots, completion. **Never used for a primary CTA.**
- **Horizon `#58C8FF`** — tertiary. Informational data and labels only.
- **Neutral ramp** — `#05080C` (void) → `#0A0F14` (surface-000) → `#0F1620` → `#17202B` (card) → `#1F2B38` (hover) → `#5A6B7F` → `#C8D4E0` → `#F4F8FB` (text primary).
- **Gradient rules:** the *only* sanctioned gradient is `linear-gradient(180deg, voltage-hot, voltage-deep)` on hero numbers, plus radial voltage-glow hero swatches. No purple gradients. No rainbow charts.

### Typography — *a voice with three accents*
- **Fraunces** — the soul. Display serif, weights 300 / 500 / italic 500. Used for H1–H3. Optical-size axis is live — heavier at large display sizes. Italics carry the editorial tone.
- **Inter Tight** — the clarity. UI, body, buttons. Weights 400–700.
- **JetBrains Mono** — the truth. Every displayed number the user will act on, and every eyebrow label. Tracking `+0.18em` on uppercase labels.

Scale: Display XL (96–128), Display LG (56), Display MD (36), Headline (24), Body-LG (18), Body (15), Caption (13), Mono-label (11).

### Spacing — *let surfaces breathe*
8-pixel base. `4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96`. Cards get a **minimum 24px padding** — never crowded. Sections `96px` vertical rhythm.

### Backgrounds & imagery
- Dark-first. Full-bleed compositions rather than light cards.
- Background imagery: **radial glow fields** (colored soft blobs blurred 30px), **SVG grain overlays**, and the occasional **conic-gradient avatar** for Pria.
- No photography yet in the brand — we use *data-as-texture*: glowing metric bars, assembling BOQ rows, live counter sweeps.
- No repeating patterns, no hand-drawn illustrations, no stock photos.

### Animation
Three signature motions, everything else is a variation:
- **Pulse** (M·01) — a soft voltage ring expanding from any "live" element. 1.8s, rare, **one per viewport**.
- **Assemble** (M·02) — BOQ lines and metric values ease up with staggered cubic-out. 80ms stagger, max 8 children. Triggered whenever the plan recomputes.
- **Horizon** (M·03) — Pria's avatar slowly rotates a conic gradient of all three accents. 8s/rev, always on, always subtle.

Easings: `var(--vh-ease)` = `cubic-bezier(.2,.7,.2,1)` for most; `var(--vh-ease-out)` = `cubic-bezier(.16,1,.3,1)` for hero reveals. Durations: Fast 180ms / Base 320ms / Slow 560ms. **Motion is earned. Never animate on every hover.**

### Hover / press states
- **Hover** → subtle lift (`translateY(-2px)` or `-3px` for tiles), border turns `voltage`, soft glow appears.
- **Press** → no shrink; the glow intensifies briefly. Button color shifts to `voltage-hot`.
- **Focus** → 4px `voltage-glow` halo ring — never a default browser outline.

### Borders, cards, shadows
- **Card** → `background: var(--vh-surface-200)` + `border: 1px solid var(--vh-line)` + `border-radius: var(--vh-r-lg)` (20px). Padding 24px minimum.
- **Active card** → border becomes `voltage`, `box-shadow: var(--vh-elev-glow)` (a voltage-tinted 60px glow).
- **Shadows are colored, not grey.** We glow in voltage or bio — never a black drop shadow.
- **Inner highlight:** `0 1px 0 rgba(255,255,255,0.04) inset` on every raised surface to hint at the light source.

### Corner radii
`6 / 10 / 14 / 20 / 28 / 999`. Cards 20. Metrics 14. Fields 14. Pills + CTAs fully rounded (999). Tiny tags 6.

### Transparency & blur
Used for **sticky nav bars** (`rgba(10,15,20,0.85)` + `backdrop-filter: blur(20px)`) and the **ambient glow fields** on page backgrounds. Never for cards — cards are solid.

### Layout rules
- Max shell width: `1280px`, 32px horizontal gutter.
- Hero + reveal are full-bleed, no sidebar.
- Mid-flow steps split `1fr / 400px` — left is the question, right is the persistent **Live Plan** panel.
- Sticky bottom nav (`Back` / `Continue`) appears only on flow steps, never on hero / reveal.

### Image color vibe
When imagery is introduced (post-MVP), treat it warm-cool split: **warm highlights** (voltage) against **cool shadows** (horizon), grain overlay. Never b&w; never oversaturated.

---

## Iconography

**Lucide** is the icon system. Stroke-based, 1.5–2px, rounded joins. Match the draft onboarding JSX which already uses `lucide-react` (ArrowRight, MapPin, Sun, Wind, Leaf, Zap, Home, Building2, Users, Plus, Minus, Check, Sparkles, Download, Share2, RefreshCw).

- In HTML, load Lucide via CDN: `<script src="https://unpkg.com/lucide@latest"></script>` then `lucide.createIcons()`.
- In JSX, import from `lucide-react`.
- Standard sizes: `14` (inline / button), `16` (button), `18` (input field hint), `20` (section icon), `32` (avatar ring contents), `56` (tile hero, stroke-width 1.2 for display).
- Stroke color = current text color. Voltage reserved for actively selected icons.

**No emoji, ever.** This is enforced.

**Custom iconography:**
- **Pria avatar** — a conic-gradient ring (voltage → bio → horizon → voltage) with a `P` glyph centered. This is her signature — used anywhere she speaks.
- **Field glow dot** — an 18px circle filled voltage with voltage-glow shadow, used as the input-field left-ornament.
- **Live pulse** — a 6px bio dot with bio-glow box-shadow, animated `animate-pulse`.

**Unicode chars used as icons:**
- `→` `←` inside `.vh-btn-arrow` for CTA arrows (substitutable with Lucide `ArrowRight`).
- `✓` `✕` on `do` / `dont` lists.
- `—` em-dash everywhere as a leading editorial mark.

No custom SVGs have been drawn for this system. All iconography is Lucide or typographic.

---

## Folder index

```
/
├── README.md                          # you are here
├── SKILL.md                           # Claude Skill entrypoint
├── colors_and_type.css                # THE CSS source of truth (tokens + classes)
│
├── source/                            # original input materials (read-only)
│   ├── volt_horizon_original.html     # brand design-system doc (8 sections)
│   ├── pricing_ai_flow_original.jsx   # original cream/coral intake flow
│   └── Pricing_AI_PRD.md              # Pricing AI PRD v0.1
│
├── assets/                            # logos, illustrations (none yet — see ICONOGRAPHY)
│
├── preview/                           # Design System tab cards (small, single-purpose)
│   ├── color-primary.html
│   ├── color-bio-horizon.html
│   ├── color-neutral-ramp.html
│   ├── type-display.html
│   ├── type-body-mono.html
│   ├── type-data.html
│   ├── spacing-radii.html
│   ├── spacing-elevation.html
│   ├── motion-tokens.html
│   ├── component-buttons.html
│   ├── component-pills.html
│   ├── component-fields.html
│   ├── component-metrics.html
│   ├── component-tiles.html
│   ├── component-ai-message.html
│   ├── component-boq-row.html
│   └── brand-atmosphere.html
│
└── ui_kits/
    └── pricing_ai/                    # Pricing AI onboarding + live-plan variants
        ├── README.md
        ├── index.html                 # full interactive flow, 3 variants switchable
        ├── tokens.css                 # thin re-export of colors_and_type.css
        ├── Chrome.jsx                 # TopBar + sticky BottomNav
        ├── Hero.jsx                   # step 00 (welcome)
        ├── StepShell.jsx              # step wrapper w/ eyebrow + display title
        ├── WhoStep.jsx                # step 01 (home / business / community)
        ├── LocationStep.jsx           # step 02 (city picker + faux map)
        ├── CurrentPowerStep.jsx       # step 03 (generator / grid / mix / none)
        ├── DirectionStep.jsx          # step 04 (concentric rings)
        ├── LoadStep.jsx               # step 05 (appliance grid)
        ├── RevealStep.jsx             # step 06 (final plan)
        ├── LivePlanClassic.jsx        # variant A — vertical assembling list
        ├── LivePlanOrbit.jsx          # variant B — system diagram orbit
        ├── LivePlanLedger.jsx         # variant C — running ledger / terminal
        └── Primitives.jsx             # Button, Pill, Metric, AIMessage, Field, Tile
```

---

## Caveats

- **Fonts:** we rely on Google Fonts for Fraunces, Inter Tight, and JetBrains Mono. No local `.ttf` files are shipped. If a user downloads this skill for offline use, they must either stay online or swap in locally-hosted font files.
- **No logo was provided.** The product's visual anchor is the Pria conic-gradient avatar, not a traditional wordmark. If you need a lockup, render **"Pricing AI"** in `Fraunces 300` with an italic-500 "AI" at 24px, all on surface-000.
- **No custom SVG illustrations shipped.** The brand intentionally rejects fake tech iconography (circuits, nodes). If a screen needs visual weight, lean on glow fields, data-as-texture, and the Pria avatar.
- **Single product** — only Pricing AI is represented. An installer-pro dashboard and developer-API surface are described in the PRD (v1.x, v2) but do not have UI kits yet.

---

## How to use this system

- **Production code:** import `colors_and_type.css`. All tokens are CSS custom properties on `:root` — consume via `var(--vh-voltage)` etc.
- **Prototypes / mocks:** copy `colors_and_type.css` and any component JSX from `ui_kits/pricing_ai/` into a new HTML shell.
- **Brand adherence:** read the DO / DON'T guardrails in `source/volt_horizon_original.html`. They are the difference between distinctive and generic.

See `SKILL.md` for how to invoke this as a Claude Skill.
