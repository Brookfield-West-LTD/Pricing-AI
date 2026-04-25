# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

All commands run from the monorepo root unless noted.

```bash
bun run dev          # start all apps (web :3000, api :3001) via Turborepo
bun run build        # production build (respects dependency order)
bun run type-check   # tsc --noEmit across all packages

# Per-package (faster during development)
cd apps/web  && bun run dev        # Next.js only
cd apps/web  && bun run build      # web build
cd apps/web  && bun run type-check # web type check only
cd apps/api  && bun run dev        # NestJS watch mode
cd packages/ui && bunx tsc --noEmit  # UI package type check

# Database (from apps/api)
bunx prisma migrate dev   # apply migrations
bunx prisma generate      # regenerate Prisma client
bunx prisma studio        # open DB browser
```

**No test runner is configured yet.**

## Commit messages

Do NOT add `Co-Authored-By` trailers to commit messages.

## Architecture

### Monorepo layout

```
apps/
  web/    — Next.js 16 (App Router, Turbopack) — user-facing UI, port 3000
  api/    — NestJS — AI, sizing, financial, BOQ, plan persistence, port 3001
packages/
  shared/          — shared TypeScript types (Plan, BOQ, Appliance, etc.)
  zod-schemas/     — Zod schemas for intake and plan validation
  sizing-engine/   — deterministic electrical sizing (solar, battery, wind, biomass)
  financial-model/ — cashflow, payback, NPV, IRR, CO₂, sensitivity
  tokens/          — Volt Horizon design tokens (CSS custom properties)
  ui/              — shared React component library (primitives + Pria substrate)
```

All packages are local workspace dependencies. `next.config.ts` transpiles them via `transpilePackages`.

### Request flow

1. User fills the 7-step intake form (`apps/web`) → state held in Zustand (`useIntakeStore`, persisted to `localStorage` as `pricing-ai-intake`).
2. On submit, the web app POSTs to `/api/plans` (Next.js route handler), which proxies to `NestJS :3001/api/intake`.
3. NestJS orchestrates: sizing engine → component catalogue → BOQ → financial model → saves `Plan` to Postgres via Prisma.
4. Pria AI responses stream via SSE: web → `/api/pria/stream` (Next.js) → NestJS `/api/pria/stream` → AWS Bedrock (`claude-3-5-haiku`, `eu-central-1` region).
5. Reveal page is served at `/reveal/[shareToken]` and fetches the completed plan by token.

### Design system — Volt Horizon

All UI uses the **Volt Horizon** design system. **Never use raw hex values or inline colours** — always use CSS custom properties:

| Token | Value |
|---|---|
| `--vh-voltage` | `#FF6B35` (primary orange — calls to action, Pria highlights) |
| `--vh-bio` | `#7BFFAB` (green — listening state, positive signals) |
| `--vh-horizon` | `#58C8FF` (blue — thinking state) |
| `--vh-surface-000..300` | dark surface ramp (`#0A0F14` → `#1F2B38`) |
| `--vh-text-000..300` | text ramp |
| `--vh-font-display` | Fraunces (headlines) |
| `--vh-font-mono` | JetBrains Mono (labels, data, badges) |
| `--vh-font-body` | Inter Tight |

CSS lives in `apps/web/src/styles/`: `globals.css` (Tailwind v4 + `@theme`), `colors_and_type.css`, `motion.css` (keyframes: `vh-drift-up`, `vh-kenburns`, `vh-marquee`, `vh-stream`), `pria.css` (all Pria-specific classes).

Tailwind v4 is used — do not mix v3 syntax. CSS custom properties are always prefixed `--vh-`.

### Pria substrate (`packages/ui/src/pria/`)

Pria is the AI agent layer present on every screen. Components:

- `Orb` — the conic-gradient spinning orb, accepts `size` and `state`
- `PriaIcon` — ambient collapsed icon with typing invitation
- `PriaComposer` — floating input pill with streaming response card
- `VoiceCard` — fixed bottom-right voice modal: 42-bar radial waveform (CSS `--rot`/`--amp` custom props on `.pria-wave-bar`), `.pria-big-orb` breathing animation driven by `data-state`, `.pria-status` pill, MUTE/END ghost buttons

All Pria CSS classes are in `apps/web/src/styles/pria.css` — do not add inline styles for anything already covered there.

### Intake flow

Steps 0–6 map to: `StepWho → StepLocation → StepCurrentPower → StepDirection → StepLoad → StepBillConfirm → StepSummary`.

Each step reads/writes `useIntakeStore`. `IntakeShell` wraps all steps with the progress bar, header, `LivePlanPanel` (desktop right column), and the floating Pria composer + VoiceCard.

### Environment variables

| Variable | Used by |
|---|---|
| `NESTJS_URL` | web → api proxy (default `http://localhost:3001`) |
| `API_PORT` | NestJS listen port (default `3001`) |
| `DATABASE_URL` | Prisma / Postgres |
| AWS credentials | Bedrock streaming (`eu-central-1`) |

See `.env.example` for the full list.
