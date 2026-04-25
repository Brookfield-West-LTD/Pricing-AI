---
name: volt-horizon-design
description: Use this skill to generate well-branded interfaces and assets for Volt Horizon (the design system for Pricing AI, an AI-guided renewable energy decision platform for Nigeria), either for production or throwaway prototypes/mocks. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files.

Key files:
- `README.md` — product context, content fundamentals, visual foundations, iconography, folder index
- `colors_and_type.css` — CSS tokens and semantic classes (source of truth)
- `source/volt_horizon_original.html` — full brand design-system doc (philosophy, color, type, components, motion, guardrails, handoff)
- `ui_kits/pricing_ai/` — JSX components and interactive index.html for the Pricing AI onboarding flow, including three live-plan panel variants
- `preview/` — small preview cards (color, type, spacing, components, brand)

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. Always import `colors_and_type.css` (or inline its tokens) so `var(--vh-voltage)`, `var(--vh-font-display)` etc. resolve. If working on production code, copy assets and read the rules here to become an expert in designing with this brand.

Hard rules (non-negotiable):
- Dark-first. Page background is `var(--vh-surface-000)` with the `.vh-atmosphere` glow field.
- One hot voltage element per screen, never two. Never more than 10% of a screen.
- Every displayed number the user will act on is in JetBrains Mono.
- Bio-green is for "alive / producing / success" states — never a primary CTA.
- No emoji. No purple gradients. No fake tech iconography (circuits, nodes).
- Pria (the AI agent) always speaks behind her conic-gradient chromatic avatar.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.
