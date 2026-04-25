**PRODUCT REQUIREMENTS DOCUMENT**

**Pricing AI**

*An AI-native platform for renewable energy decisions in Africa*

Version 0.2 — Full rewrite, integrated

April 24, 2026

Owner: Mayorkingx · KJB A³ Limited

*— Design system: Volt Horizon —*

# **1\. Document Control**

| Field | Value |
| :---- | :---- |
| Product name | Pricing AI |
| Document type | Product Requirements Document (PRD) |
| Version | 0.2 — full rewrite, supersedes v0.1 |
| Prepared for | Mayorkingx (Product Owner), KJB A³ Limited |
| Prepared by | Product team with Claude as drafting collaborator |
| Date | April 24, 2026 |
| Status | Draft for internal review |
| Design system | Volt Horizon v0.1 — dark-first, voltage-coral primary, Fraunces \+ Inter Tight \+ JetBrains Mono |
| AI substrate | Pria — agentic layer across the entire product, not a feature module |
| Intended audience | Founders, engineering, design, investors, early installer and lender partners |

# **2\. What Changed Since v0.1**

Version 0.1 established the product scope, the competitive position, and the technical architecture. Version 0.2 integrates three significant additions that happened during design exploration, and rewrites the whole document around them rather than appending them as annexes.

### **2.1 Three additions, now central**

* **A named design system — Volt Horizon.** Previously the PRD said “restrained, defensible design.” That has been resolved into a specific, tokenised system: pre-dawn dark base, a single hot voltage-coral accent, a bio-green for live/producing states, three typefaces each with one job, and four signature motions. Volt Horizon is referenced throughout this document.

* **Pria as substrate, not feature.** Pria was previously described as “a conversational intake agent.” That framing sold short what Pria actually is. In v0.2, Pria is the operating layer of the entire product — ambient across every screen, inline (never modal), voice-capable, and authorised to extend the UI itself (form rescue). Every other feature either uses Pria or is reachable through her.

* **A hyper-personalization architecture.** v0.1 treated personalization as “the numbers update live.” v0.2 defines a six-layer personalization model — numbers, conditional UI, sequence, priority, copy, atmosphere, memory — sequenced by impact so engineering can ship it in phases without boiling the ocean.

### **2.2 What did not change**

The product thesis, the Nigerian market position, the vendor-neutral business model, the monetization plan, the roadmap shape, and the technical stack (NestJS, Next.js, PostgreSQL, AWS Bedrock with Return Control) are unchanged from v0.1. The core feature pillars (intake, load profile, sizing, pricing, cashflow, Gantt, outputs, financing, marketplace) are unchanged. This is a clarification, not a pivot.

# **3\. Executive Summary**

Pricing AI is an AI-native platform that helps anyone in Africa — homeowners, SMEs, facility managers, developers and installers — make confident, well-priced, well-designed decisions about adopting renewable energy. A user describes what they want to power, where they are, and how they want to pay. Our AI agent, Pria, does the rest: she asks only the questions she actually needs, sizes the system, produces a complete budget, generates charts, schedules, and visualisations, and explains the trade-offs in the user’s own language.

Pricing AI differs from every existing tool on three axes at once. First, it is vendor-neutral — we do not sell panels, inverters, or installation. Second, it is built for the African energy reality — diesel generators, unreliable grid supply, naira volatility, and import-driven component prices are first-class citizens in our model, not edge cases. Third, it is AI-native in a specific, defensible sense: Pria is present across the entire product as an ambient substrate, not bolted on as a chatbot in the corner.

The platform covers solar PV (off-grid, hybrid, and on-grid), solar thermal, small wind, biomass and biogas, micro-hydro, and hybrid combinations. Every completed plan produces a package of shareable artefacts: a PDF report, an Excel workbook with BOQ and 20-year cashflow, a Gantt schedule, charts, and a system layout visualisation.

### **3.1 Positioning**

*“The AI energy advisor that turns a renewable energy question into a priced, scheduled, ready-to-execute plan — in minutes, not weeks.”*

### **3.2 Three reasons senior stakeholders should care**

* Diesel costs in Nigeria have roughly tripled since the 2023 subsidy removal. Every household and SME that runs a generator is now actively — and painfully — shopping for alternatives. The buying journey today is slow, opaque, and vendor-biased.

* AI model economics have reached the level where a conversational, tool-using, voice-capable agent is viable at a consumer price point. This unlocks a product category — AI-guided decision platforms — that did not exist three years ago.

* The top-right quadrant of the market (deep output \+ vendor neutrality \+ African-reality data) is empty. Aurora Solar owns the professional tier, OpenSolar owns the free installer tier, Project Sunroof owns the US consumer tier. No one owns the African consumer tier, and AI unlocks a new way to own it.

# **4\. Problem Statement**

## **4.1 The user problem**

Anyone considering a renewable energy investment today faces a surprisingly painful journey. The questions sound simple — “Can I run my house on solar?”, “How much will it cost me?”, “Is it better than my generator?” — but the honest answers require expertise in electrical load analysis, component pricing, geography-specific solar irradiance, tariff structures, financing, and project planning. Today this expertise is locked inside installer sales teams, who are incentivised to upsell.

Concretely, a user who wants to switch to renewable energy typically has to:

1. Guess their load, or dig through old electricity bills and generator fuel logs.

2. Contact three to five installers, share their requirements, and wait days for quotes.

3. Receive quotes in wildly different formats, with different assumptions and different component brands, with no way to compare apples-to-apples.

4. Either accept the first decent-looking quote, or give up and stay with the generator.

*The result is a slow, opaque, vendor-biased decision that drives many people back to diesel and kerosene — exactly the systems renewables are meant to replace.*

## **4.2 Nigerian market reality**

Pricing AI is being designed first for the Nigerian and broader African context, which has specific dynamics global solar tools do not model well:

* **Grid unreliability.** Most Nigerian households on the grid receive only a fraction of 24-hour supply. Solar is almost always paired with batteries and sometimes a backup generator.

* **Generator-first baseline.** The meaningful comparison is not “solar vs. grid bill” but “solar vs. diesel or petrol generator running cost.”

* **FX and import exposure.** Panels, inverters, and lithium batteries are largely imported and priced in USD.

* **Tariff complexity.** NERC tariff bands differ across DisCos.

* **Under-served non-solar options.** Small wind, biomass/biogas, and micro-hydro are real options that almost no consumer tool helps people evaluate.

## **4.3 Product beliefs**

* The value is not a calculator number. It is a complete, defensible, ready-to-act plan: system design, bill of quantities, schedule, financing, and a comparison narrative.

* Speed and clarity win. A homeowner should go from “I have a generator problem” to “here’s my plan and its payback” in under fifteen minutes.

* Vendor neutrality is a moat. We earn revenue from verified installers who pay for qualified leads and from financing referrals; we do not sell hardware.

* AI is the unlock. A conversational, voice-capable agent that adapts to what it already knows about the user is dramatically better UX than a 30-field form.

* Design craft is a moat. The product that feels premium to a user — editorial typography, restrained motion, live-assembling numbers — earns the trust that unlocks the decision. This is why Volt Horizon exists as a named system rather than as a loose style.

# **5\. Competitive Landscape**

The market breaks into four tiers. Pricing AI occupies the whitespace between consumer calculators and professional installer software, uniquely positioned for African energy realities and for all renewables, not just solar.

## **5.1 Tier 1 — Consumer solar calculators**

Lightweight web-based estimators. They answer one question — how much solar do I need and what will I save? — and work best in markets with clean tariff data and roof imagery.

| Tool | Geography | What it does / limits |
| :---- | :---- | :---- |
| Google Project Sunroof | US only | Uses aerial imagery to show a roof's solar potential and connects to providers. No pricing depth, no project plan, no African coverage. |
| PVWatts (NREL) | Global | Free, technical, accurate energy-production model. Outputs kWh, not a budget or a system design. Aimed at engineers. |
| Solar-Estimate.org | US only | AI-assisted consumer estimator with Genability-powered savings. Strong on US tariffs and incentives, irrelevant outside the US. |
| GreenMetricAI | US-centric | Free multi-calculator suite (solar, generators, EV). Shallow depth per calculator. |
| Stera Power, BOYLS, Sunplenti | Nigeria | Installer-hosted solar-vs-generator calculators. Useful lead-gen widgets but inherently biased toward their own packages. |

## **5.2 Tier 2 — Professional installer software**

| Tool | Pricing | Strengths & gaps for our users |
| :---- | :---- | :---- |
| Aurora Solar | \~$159/mo+ | Market leader with AI-powered 3D roof models and LIDAR shading. Residential US focus; expensive for African SMEs. |
| HelioScope (Aurora) | \~$159/mo+ | Commercial & industrial specialist, strong simulations to 5 MW. Great for developers, inaccessible for SMEs. |
| OpenSolar | Free, monetised via partners | Used by 25,000+ solar pros in 160+ countries. Best free option but still installer-oriented and US/EU-dominant. |
| HOMER Pro, SAM, RETScreen | Licensed / technical | Industry-standard techno-economic modelling. Too complex for end users; Pricing AI can be a friendly front-end to this kind of rigour. |

## **5.3 Tier 3 — Nigerian / African operators**

These are installers and energy service providers, not independent pricing tools. They define the current buying journey and will become downstream partners once Pricing AI delivers qualified leads.

* **Arnergy.** Series B Nigerian cleantech, 1,800+ installations across 35 states. Full-stack solar with PAYG \+ diaspora investment. No independent consumer pricing tool.

* **Daystar Power.** Commercial & industrial Power-as-a-Service for large projects only.

* **Rensource, Gennex, Lumos, Rubitec, Auxano, GVE.** Installers and mini-grid operators, each with their own lead form. Fragmented, painful to compare.

* **PowerLabs.** Intelligence layer for distributed energy systems. Adjacent, not directly competing — potential data partner.

## **5.4 Where Pricing AI sits**

On two axes — (Y) depth of planning output, (X) vendor neutrality and user-first orientation:

|  | Low neutrality | Medium neutrality | High neutrality |
| :---- | :---- | :---- | :---- |
| Deep output (design \+ BOQ \+ schedule \+ financing) | Aurora, HelioScope, OpenSolar | HOMER Pro, SAM (expert-only) | PRICING AI — target position |
| Shallow output (savings only) | Installer calculators (Arnergy, Stera, BOYLS) | Project Sunroof, GreenMetricAI | PVWatts (technical, not useful alone) |

The top-right quadrant — deep, vendor-neutral output — is effectively empty, especially for African users and non-solar renewables. That is Pricing AI's opportunity.

# **6\. Target Users**

Four user types. MVP focuses on the first two. Installer and developer tiers follow in v1.x and v2.

### **6.1 Homeowner — Adaeze**

Adaeze is 42, lives in Lekki, and runs a 7.5 kVA generator that now costs her ₦150,000–₦220,000 a month in petrol. She has seen three quotes ranging from ₦2.8M to ₦6.4M with no way to judge which is fair. She wants a trustworthy number she can take to her husband and her bank, confidence the system will run her AC, fridge, pumping machine, and borehole, a clear payback vs. what she pays now, and the option to pay monthly.

### **6.2 SME owner — Tunde**

Tunde runs a 12-bed maternity clinic in Ibadan. He loses ₦90,000/month on diesel plus equipment damage from surges. He is also curious about wind (exposed roof) and biogas (food waste). He needs a BOQ his accountant will accept, a Gantt that minimises downtime, financing that matches his cashflow, and assurance the system can grow as he does.

### **6.3 Installer / EPC — Chidi (v1.x)**

Chidi runs a 22-person solar installation company and spends too much unpaid time producing quotes that go nowhere. He would pay for pre-qualified leads and use Pricing AI as a proposal generator for his own clients, with his branding on the output.

### **6.4 Developer / utility — Ada (v2)**

Ada is a mini-grid developer planning 12 rural sites. She needs fast techno-economic modelling per site without paying for HOMER Pro seats, and programmatic access for batch scoring.

# **7\. Product Principles**

Eight principles. When in doubt, pick the option that honours the highest-ranked principle on this list.

5. Honest over optimistic. A defensible estimate with confidence bands beats a flashy marketing number. We never fabricate savings.

6. Fast path to value. A homeowner gets a usable first answer in under five minutes, a full plan in under fifteen.

7. Explain everything. Every output carries a short, plain-language reason. Pria is reachable at any point for follow-up.

8. African-first, globally viable. Our models are designed around African realities, but the architecture allows market-specific overlays for any region we expand into.

9. Vendor neutral, always. No upsell logic, no sponsored panel brands, no hidden kickbacks in recommendations.

10. Separate deterministic math from AI. Financial and electrical calculations run in TypeScript. Pria orchestrates, explains, adapts — she does not do the math.

11. Every answer is shareable. A plan that cannot be exported as PDF \+ XLSX and shared by link does not exist.

12. Design craft is strategy. Volt Horizon is not decoration; it is the signal that tells users this tool is trustworthy enough to guide a millions-of-naira decision.

# **8\. Design System — Volt Horizon**

Every screen Pricing AI ships is built on Volt Horizon, a named, tokenised design system. It is not a theme and not a style guide; it is the language of the product.

## **8.1 Concept**

Renewable energy is fundamentally about the sky and the horizon — the moment before sunrise, the first flash of voltage, a city coming online. Volt Horizon captures that moment. The base is dark but never dead — a pre-dawn charcoal with a hint of teal, warm enough for a 20-minute session. A single hot accent does the heavy lifting (no purple AI gradients, no neon cliché). A biological green signals when the system is live and producing. Everything else is restraint.

## **8.2 Color system**

| Token | Hex | Role | Rule |
| :---- | :---- | :---- | :---- |
| \--vh-surface-000 | \#0A0F14 | Page background | Base dark. Never \#000. |
| \--vh-surface-100 | \#0F1620 | Raised surface | Subtle layering. |
| \--vh-surface-200 | \#17202B | Card surface | Where content lives. |
| \--vh-surface-300 | \#1F2B38 | Interactive hover | Hover lift surface. |
| \--vh-voltage | \#FF6B35 | Primary accent | CTAs, highlights, live states. Never more than 10% of any screen. |
| \--vh-voltage-hot | \#FF8A5C | Voltage hover | Hover and glow treatment. |
| \--vh-voltage-deep | \#D94E1F | Voltage pressed | Borders and pressed state. |
| \--vh-bio | \#7BFFAB | Live / producing | Success, live indicators. Never a primary CTA. |
| \--vh-bio-deep | \#3EDB7A | Success confirm | Completed states. |
| \--vh-horizon | \#58C8FF | Informational | Data labels, tertiary. Never hero. |
| \--vh-text-000 | \#F4F8FB | Primary text | Body and headlines. |
| \--vh-text-200 | \#8A9AAD | Muted text | Captions, labels. |

## **8.3 Typography — three fonts with three jobs**

* **Fraunces (display).** Contemporary variable serif with expressive italics. Used for hero headlines and card titles. Mixes regular and italic to create editorial emphasis — e.g., “Your energy future.” Weight 300 for hero, 500 for italic emphasis and card titles. Tight tracking (−2 to −3.5%).

* **Inter Tight (UI / body).** Tighter than standard Inter, more architectural. Handles every piece of UI copy and running body text. Weight 400 body, 500 medium labels, 600 headlines.

* **JetBrains Mono (numbers).** Every displayed number the user will act on renders in mono — prices, kWh, payback, percentages. This is a trust signal, non-negotiable.

## **8.4 Motion vocabulary**

Four signature motions. Every other animation in the product is a variation of one of these.

| Motion | Timing | Where it's used | Rule |
| :---- | :---- | :---- | :---- |
| Pulse | 1800ms ease-out, infinite | Live elements, active step markers, Pria's presence | One per viewport — never two at once |
| Assemble | 80ms stagger \+ 320ms ease | Numbers ticking up, BOQ lines, metric cards | Cap at 8 items — remainder appear simultaneously |
| Chromatic spin | 8s per rev, linear, always on | Pria's avatar — the conic gradient rotation | Only place all three accents appear at once |
| AI-glow fade-in | 600ms soft voltage halo | Elements Pria adds dynamically | Signals “this came from AI” |

Additional timing tokens: Fast \= 180ms, Base \= 320ms, Slow \= 560ms. All use cubic-bezier(0.2, 0.7, 0.2, 1\) unless specified otherwise.

## **8.5 Component primitives**

Eleven primitives. Everything Pricing AI ships — onboarding, live plan, reveal, installer dashboard — is a composition of these.

* Button — primary (voltage), ghost (outlined), bio (for completed / live states).

* Input field — surface-200 background with glowing icon; focus state is a 4px voltage-glow halo.

* Choice pill — surface-200 default with bio-green indicator dot; active state fills with voltage gradient.

* Metric card — edge-glow marker, mono number, small mono label, optional delta indicator.

* Choice tile — tall 3:4 portrait card with visual top, text bottom, counter label ("01 / 04"-style).

* AI message bubble — with Pria's chromatic avatar.

* Pria icon — the ambient 28px pop-in icon with typing invitation.

* Inline composer pill — grows from icon position, never a modal.

* Voice card — orb \+ circular audio-reactive waveform, persistent bottom-right, non-blocking.

* Form rescue card — sits below forms with two affordances ("don't understand this?" and "add something not listed").

* Persona chip — shows what Pria understands about the user, tappable to correct.

## **8.6 Guardrails**

* No purple, cyan-gradient or neon-blue "AI" accents. Tired and generic.

* No voltage and bio adjacent as CTAs — they fight.

* Never render financial data in the display serif or the body sans. Mono only.

* Never animate on every hover. Pulse is rare. Motion is earned.

* Never use pure black (\#000) anywhere. Route through void or surface-000.

* No fake "tech" lines, circuit nodes, or schematic overlays. The system is the tech.

* Never stack more than three colored glows in a single viewport.

# **9\. Pria — The Agentic Substrate**

Pria is not a chatbot in the corner. Pria is the operating layer of Pricing AI. Every interaction in the product has three layers — the deterministic UI (forms, cards, buttons), the ambient AI layer (Pria's icons, inline composer, voice), and the dynamic form layer (Pria can edit the UI itself). Most "AI in product" experiences give you a chatbot sidebar. Pricing AI gives Pria authority to mutate the interface in real time. This is the single biggest product differentiator we own.

## **9.1 What Pria is**

* **A named advisor, not a faceless AI.** Pria has a chromatic conic-gradient avatar (voltage → bio → horizon → voltage) that spins slowly (8s/rev) wherever she appears. Her presence is visual, consistent, and warm.

* **An archetype-based persona, not an adjective list.** Pria is framed as a senior renewable-energy analyst who has priced thousands of Nigerian installations. This is the same pattern we use for Syna (Synapsio) and CzettaPal (ZettaPay) and it produces more reliable personality expression than trying to specify "friendly, helpful, warm" as adjectives.

* **Deterministic-boundary respectful.** Pria never does arithmetic. She orchestrates which tool to call, and she explains results in plain language. Every number on every screen is computed by deterministic TypeScript services, not generated by an LLM.

## **9.2 Four surfaces Pria lives on**

### **Surface 1 — Ambient icons with typing invitations**

Throughout the app, small contextual Pria icons appear at relevant moments. Placement is per-screen, chosen for real value (a tricky form field, the hero number, a metric card) — not decoration. The icon is a 28px circular badge using the chromatic gradient, with a subtle 1.8s pulse halo. Beside or below each icon, a small typing-text invitation types out at \~40ms per character in JetBrains Mono 11px, voltage color, lowercase. Examples:

* On the hero: "ask me anything about your energy switch →"

* Next to the location field: "not sure of your address? let me help"

* Below the appliance grid: "don't see your appliance? add it here"

* On the reveal page total cost: "why this number? tap to ask"

The invitation text fades after 6 seconds if untouched, but the icon stays. On hover, the invitation re-types. The icon never blocks content and never appears more than twice per viewport.

### **Surface 2 — Inline composer (the growing pill)**

When a user taps any Pria icon, no modal opens. Instead, the icon itself transforms into a horizontal pill-shaped composer that grows out from the icon's exact position over 320ms with cubic-bezier(0.16, 1, 0.3, 1\) ease. The composer:

* Pill-shaped, fully rounded, surface-200 background with 1px voltage-deep border and colored elevation glow.

* Contains a 24px Pria avatar on the left, a text input with placeholder "ask Pria…", a microphone icon on the right, and a ✕ to dismiss.

* Width grows from 28px to \~480px, height stays compact (\~52px).

* The page underneath is not dimmed, blurred, or pushed — the composer floats with z-index, inline to the user's eye.

* On submit, the composer expands downward into a response card with Pria's streaming response (token-by-token, soft blinking voltage cursor).

* Response card max-height \~280px with internal scroll. A "✕ close" pill at top-right collapses the whole thing back to the 28px icon over 320ms, in reverse.

*This is the single design decision most likely to impress senior designers — spatial continuity (composer grows from the exact pixel the user tapped) is rare in production UIs.*

### **Surface 3 — Voice mode (the orb and the waveform)**

A persistent voice button lives bottom-right of the viewport at all times. Default state: 56px circular button with the chromatic avatar, subtle voltage-glow halo. When tapped, it expands into a non-blocking 360×200px voice card anchored bottom-right. The card contains:

* **Center — the Pria orb.** 96px sphere with chromatic gradient. Audio-reactive — gently morphs while Pria speaks (scale 1.0 → 1.08 tied to amplitude), pulses softly when listening (voltage ring every 1.8s).

* **Around the orb — the waveform.** Circular audio-reactive waveform radiating from the orb's edge. Thin bars, heights tied to live amplitude. Bio-green when the user is speaking; voltage when Pria is speaking; surface-300 at rest.

* **Below the orb — live transcript.** A single line of mono 12px text showing the most recent words being spoken, fading old text out as new text arrives.

* **Top-left — status pill.** "LISTENING" (bio dot), "PRIA SPEAKING" (voltage dot), "THINKING" (animated three dots).

The voice card is non-blocking — the user keeps scrolling, keeps interacting with the form. It never covers the live-plan panel. On mobile it docks as a slim bottom bar.

### **Surface 4 — Form rescue (Pria extends the UI)**

On every form step, a soft helper card sits below the form with two affordances: "Don't understand this step?" and "Add something not listed." The first expands into a plain-language explanation. The second is the magic — Pria can dynamically add new fields to the form on the user's behalf.

*Concrete example:*

A welder runs a small workshop. The appliance picker shows fridges, fans, AC units — no welder. He taps "Add something not listed" and says "I use a stick welder, draws about 2.2 kilowatts." Pria adds a new "Welder · 2200W" tile to the grid with a 600ms AI-glow fade-in that signals "this came from AI." The form is now extended. The live-plan panel re-runs.

This is the moment the product stops looking like a calculator with AI sprinkled on top and starts looking like a living, AI-native surface. A senior designer seeing this the first time should understand instantly that the form is not a static schema — it is a surface Pria can shape to the user.

## **9.3 Architecture**

* **Orchestration:** AWS Bedrock Agents with Return Control. Pria decides which tool to invoke; NestJS tool endpoints execute and return structured results.

* **Knowledge:** Bedrock Knowledge Base on S3 \+ Titan Embeddings \+ OpenSearch Serverless for unstructured retrieval (methodology, regulatory explainers, component datasheets, case studies).

* **Structured data:** PostgreSQL via NestJS tool endpoints — component prices, irradiance per location, tariff tables, FX rates, financing product rules, installer roster. Never approximated by the LLM.

* **Voice:** Real-time streaming via Bedrock-compatible speech-to-speech pipeline (evaluate AWS Nova Sonic or partner with a real-time voice provider during phase 1 spike).

* **Persona prompt:** Archetype-based, maintained via instructionOverride in Bedrock API calls (version-controlled in the codebase, not in the console) — consistent with our pattern across Synapsio and ZettaPay.

## **9.4 Guardrails**

* Output validation: every priced plan is validated against a range check before display (total cost per kW installed must fall in a sane band; negative cashflows flagged for review).

* Source discipline: every numeric claim Pria makes in chat must tie to a tool call result or a KB citation — no free-floating numbers.

* Escalation: unusual requests (off-grid rural community, industrial \>500 kW, anything involving restricted use) trigger refusal and flag for human review.

* Privacy: bill uploads are scrubbed of PII after extraction; raw image retention is limited and disclosed in the privacy card.

* Voice mode can always be disabled. The ambient icons can always be dismissed. Pria is present but never mandatory.

# **10\. Hyper-Personalization Architecture**

Hyper-personalization is not "the numbers update live." That is parameterization — useful but not differentiating. Real hyper-personalization happens when the interface itself becomes biographical: same product, different sequence, different priority, different language, different atmosphere, different memory for every user. Pricing AI defines personalization across six layers, sequenced by impact so engineering can ship in phases without boiling the ocean.

## **10.1 The six layers**

| Layer | Phase | What adapts | Implementation status |
| :---- | :---- | :---- | :---- |
| 1\. Numbers | Built | Cost, kWh, payback recompute live on every answer | MVP — already shipped in intake flow |
| 2\. Conditional UI | Built | Generator sub-fields surface only for generator users; form rescue can add fields | MVP — partial |
| 3\. Adaptive sequencing | Phase 1 | Flow prunes and reorders based on what we already know | Phase 1 build |
| 4\. Adaptive priority | Phase 2 | Reveal page re-ranks hero number \+ card order by what the user values | Phase 2 build |
| 5\. Adaptive Pria copy | Phase 3 | Tone, examples, technical depth shift to the user's persona | Phase 3 build |
| 6\. Atmosphere | Phase 4 | Warmth and decoration shift by energy direction (solar, wind, biomass, hybrid) | Phase 4 build |
| 7\. Memory | Phase 5 | Returning users see their plan remembered, deltas surfaced, screens rearranged | Phase 5 build |

## **10.2 Phase 1 — Adaptive sequencing**

Today all users go through Steps 1 → 7 in the same order. That is wrong. The flow must prune and reorder based on what the user has already told us. A context engine runs between each step and decides which step to show next.

*Concrete rules at MVP:*

* If the user uploads a NEPA bill in Step 2, skip the appliance picker in Step 5\. Replace with a "confirm what we extracted" step showing extracted data as editable metric cards.

* If the user picks "Help me choose" on energy direction, skip the static direction step. Replace with a diagnostic conversation — Pria asks three adaptive questions ("when you lose power, what's the first thing that stops working?", "if you had to pick one: cheap, quiet, or future-proof?", "are you comfortable with maintenance, or do you want it to just work?") and composes a recommendation with a "why this fits you" explanation.

* If the user is on mobile with spotty network (detected via connection API), compress the flow to four steps by merging who \+ location and current-source \+ direction.

When a step is skipped, show a subtle "Pria skipped the appliance step — we already have what we need from your bill" inline notice that fades in at the top of the next step and dismisses itself after 4 seconds.

## **10.3 Phase 2 — Adaptive priority on the reveal page**

Today the reveal page shows the same hero number (total cost) to everyone. It should re-rank based on what the user values most. A priority choice is either added as a micro-step or inferred from context (a clinic implies reliability; a large generator spend implies payback; a sustainability-declared user implies CO₂). Three reveal variants, same underlying data:

* **Cost-first.** Hero number is 20-year savings. Payback is the second card. CO₂ is third. Headline leads with "over 20 years you'll save…"

* **Reliability-first.** Hero number is hours of autonomy per day, rendered with a day/night ring graphic showing when the system covers load. Cost becomes third. Headline leads with "your power stays on for…"

* **Sustainability-first.** Hero number is tonnes of CO₂ avoided, with a bio-green aura replacing voltage on that single element. Cost is second. Headline leads with "over 20 years you'll avoid…"

A small "change what matters most to you" pill re-opens the priority choice. Metric cards slide into new positions with the base 320ms transition, no jumping.

## **10.4 Phase 3 — Adaptive Pria copy**

Pria should sound different to different users. Same engine, different voice. A persona chip appears in the inline composer and voice card showing what Pria currently understands: "HOMEOWNER · LEKKI · COST-DRIVEN" or "SME · CLINIC · RELIABILITY-FIRST" or "FACILITY MGR · FACTORY · EXPERT-MODE." Tapping the chip opens a correction card ("that's not me").

Same question — "why did you pick a 5 kW system?" — produces three responses:

* **Homeowner:** "Your fridge and pumping machine run 24/7 — that's about 4 kWh before you even turn on anything else. 5 kW gives you enough cushion for the AC on weekend afternoons."

* **SME / clinic:** "Your critical loads — incubators, vaccine fridge, ward lighting — must never drop. 5 kW holds those comfortably, with headroom for two surgical days a week."

* **Expert:** "At 5.4 kWh/m²/day irradiance in your location, derated 0.78 for losses, 5 kW gives 21 kWh/day — matches your declared 6.2 kWh load with \>3x autonomy buffer for storm days."

When Pria's understanding of the user updates, a soft voltage line sweeps across her avatar once ("Pria is adapting") over 600ms. Rare, restrained.

## **10.5 Phase 4 — Atmosphere (by energy direction)**

When the user picks their direction, the app's atmosphere shifts. Not a new color system — a warmth-or-coolness shift on the existing Volt Horizon base. Think time of day. No new primary colors. Voltage stays voltage.

* **Solar.** Background gains a warm radial gradient from the top (sun rising). A barely-visible concentric sun-arc in the margin on the reveal page. The hero number gets a slight gold-shifted gradient (voltage-hot → amber). Warm light particles drift slowly upward behind the live-plan panel.

* **Wind.** Base cools slightly (2–3% toward horizon-cyan). Soft diagonal air-line streaks animate through the background. A turbine silhouette ghosted on the reveal page. Hero number stays voltage but the surrounding glow leans cooler.

* **Biomass.** Warmest variant. Very subtle amber cast on the base. Organic line pattern (leaf veins) ghosted in the margin. Slower, more organic easing on all transitions.

* **Hybrid.** Two atmospheres blend — dawn-warm at top, storm-cool at bottom. Both sun-arc and turbine ghosted at low opacity.

Transition: when the user picks a direction, the current atmosphere dissolves outward from the pill they tapped (ink-drop spreading), the new atmosphere resolves inward, decorative elements scale in with slow ease. Total duration \~900ms.

## **10.6 Phase 5 — Memory across sessions**

For a returning user, Pricing AI opens already knowing them. A returning-user landing screen rearranges itself based on the user's prior plan, location, and preferences. Example:

* Hero greeting picks up mid-thought: "let's keep going with your Lekki plan."

* Last plan shown as an editable summary card.

* "What changed since you were last here" card — FX rate moved, panel prices dropped 4%, Wema added a new financing product — each as a mono delta with voltage or bio signal depending on whether the change helps or hurts.

* Three adaptive next-step cards: "request quotes", "explore wind as a second option", "share with your husband".

Memory is visible and controllable. A privacy card on the settings screen shows exactly what Pria remembers about the user, with a one-click "forget this" action per item. This matters in Nigeria under NDPC — memory must feel reassuring, never surveilling.

## **10.7 Risk: the over-personalization trap**

There is a real risk of personalizing so much that users feel surveilled, or the UI changes so much they cannot find things on return. The discipline: personalize priority and examples, keep structure recognizable. Do not move navigation. Do not hide the back button. Personalization is a finishing layer, not the foundation.

# **11\. In Scope and Out of Scope**

### **11.1 In scope (MVP)**

* Solar PV sizing and pricing for residential and SME use — off-grid (with batteries) and hybrid (with optional backup generator).

* Generator-replacement comparison (diesel / petrol) with payback modelling.

* Load-profile builder from electricity-bill upload (OCR) and appliance selector.

* Location-based solar irradiance using NASA POWER / PVGIS for Nigeria.

* Pria as ambient substrate — icons, inline composer, voice mode, form rescue.

* Hyper-personalization phases 1 and 2 (adaptive sequencing \+ adaptive priority on reveal).

* PDF report, XLSX workbook, Gantt chart, cost/savings charts, roof layout visual.

* Shareable plan links.

* Informational financing catalogue.

* Installer marketplace — three vetted-installer quotes per plan.

* User accounts, saved plans.

### **11.2 In scope (v1.x — fast follow)**

* Small wind and hybrid solar+wind systems.

* Biomass / biogas feasibility for agricultural SMEs.

* Solar thermal (water heating) add-on.

* Installer pro tier (branded outputs, lead inbox).

* Deeper roof imagery via Google Maps Solar API or satellite imagery where Nigerian coverage exists.

* Hyper-personalization phases 3 and 4 (adaptive Pria copy \+ atmosphere shifts).

### **11.3 In scope (v2)**

* Micro-hydro feasibility modelling.

* Rural mini-grid batch mode.

* Developer API and CRM integrations.

* Regional expansion packs (Ghana, Kenya, South Africa) with local tariff and FX data.

* Hyper-personalization phase 5 (memory across sessions).

### **11.4 Out of scope**

* We do not sell panels, inverters, batteries, or installation directly.

* We do not perform structural roof engineering or stamped permit drawings — we refer to partner installers.

* We do not offer our own credit or insurance products at MVP.

* We do not monitor already-installed systems.

# **12\. Core Features**

Nine feature pillars. Each one sits inside the Pria substrate — every pillar is reachable through ambient Pria icons, the inline composer, or voice.

## **12.1 Conversational intake with Pria**

Pria replaces traditional intake forms. She starts every plan with three questions (who is this for, where are you, which direction are you leaning) and branches from there. She supports bill / photo upload and appliance checklist as alternative inputs, and produces a draft sizing as soon as she has enough signal.

## **12.2 Load-profile builder**

A structured model of what the user wants to power, by hour of day.

* Default Nigerian archetypes seeded (bachelor flat, 3-bedroom family home, clinic, small office, small retail, POS agent, welder, barber).

* OCR extraction of kWh and naira amounts from scanned bills in DisCo formats.

* Output: a 24-hour load curve, peak demand (kW), daily energy (kWh).

* Form rescue: Pria can add appliances not in the library (see §9.2, Surface 4).

## **12.3 Sizing & design engine**

Deterministic, explainable calculations converting a load profile \+ location \+ direction into a system design.

* Solar PV sizing uses irradiance data (NASA POWER / PVGIS) per location, panel derating, inverter efficiency, battery depth-of-discharge, autonomy days.

* Generator-replacement mode sizes for declared generator kVA or declared peak load.

* Output: a structured SystemDesign object (panels, inverter, battery, mounting, cabling, protections) consumed by the BOQ engine.

## **12.4 Pricing & BOQ engine**

Priced bill of quantities.

* Component catalogue with tier options (economy / standard / premium) refreshed monthly.

* Line items: panels, mounting, inverter, battery bank, BOS, cables, protections, monitoring, delivery, installation labour, VAT, contingency.

* FX-linked components recomputed from the current USD/NGN rate at report generation; banner shows the rate used.

## **12.5 Financial model & comparison**

The heart of the decision: does it make sense vs. what the user does today?

* Baseline-vs-plan cashflow in monthly buckets over 20 years.

* Sensitivity: fuel price, FX, grid reliability, inflation — each varied ±20%.

* CO₂-avoided estimate using published Nigerian grid and diesel emission factors.

* Payback, NPV, IRR in mono typography with confidence bands.

## **12.6 Project schedule (Gantt)**

A realistic installation timeline.

* Standard template: site survey → procurement → delivery → structural prep → electrical install → commissioning → handover & training.

* Durations parametrised by system size and location.

* Gantt export to XLSX (conditional formatting) and PDF.

## **12.7 Outputs & sharing**

Every completed plan produces a package of artefacts. See §13 for detail.

## **12.8 Financing options**

Static catalogue at MVP (Sterling, FCMB, Access, Wema, Arnergy PAYG, Lumos, etc.) with eligibility rules and representative rates. Lead-referral integration at v1.

## **12.9 Installer marketplace**

Turn a completed plan into real quotes from vetted installers.

* Installer onboarding with state coverage, capability, past projects, basic rating.

* Anonymous RFQ: installers see plan \+ load \+ budget \+ location band, not contact details until the user reveals.

* Commercial model: flat qualification fee per revealed lead, or success fee on completed install.

# **13\. Outputs in Detail**

Every completed plan generates a package of production-quality, shareable artefacts. Each respects Volt Horizon's typographic discipline — mono for numbers, Fraunces for section titles, Inter Tight for body.

### **13.1 PDF report**

* Cover with plan name, date, share ID, confidence band.

* Executive summary: one paragraph, three headline numbers.

* Current situation: what the user has today, what they spend today.

* Recommended design: diagram \+ spec table.

* Bill of quantities: priced line items with source tags.

* Financial model: 20-year cashflow chart, NPV, IRR, payback.

* Sensitivity: ±20% on fuel, FX, grid reliability, inflation.

* Project schedule: Gantt.

* Risks and assumptions.

* Next steps: financing options, installer referral, FAQ.

### **13.2 XLSX workbook**

* Inputs tab — all user answers (editable for what-if).

* BOQ tab — quantity, unit price, subtotal, USD-linked flag.

* Cashflow tab — month-by-month, 20 years.

* Sensitivity tab — two-way data table on fuel × FX.

* Gantt tab — timeline with conditional formatting.

* Assumptions tab — irradiance, derating, FX rate, tariff, data sources.

### **13.3 Charts**

* Energy produced vs. consumed, monthly.

* Cumulative cashflow (plan vs. baseline).

* Monthly cost (plan vs. baseline).

* CO₂ avoided over 20 years.

### **13.4 System visualisation**

* Solar — rooftop layout (satellite image \+ panel polygons) when imagery is available; top-down schematic otherwise.

* Wind — turbine siting relative to obstacles.

* All — one-line component diagram.

# **14\. User Flows**

## **14.1 Homeowner — with adaptive sequencing**

13. User lands on pricing.ai. Hero screen with diagonal slash decorations animating in; Pria icon in corner types out "ask me anything about your energy switch."

14. User clicks "Begin your plan." Step 1 asks who the plan is for. User picks "A home."

15. Step 2 asks location. User types "Lekki." Pria icon next to the field offers "not sure of your address? let me help."

16. Step 3 asks about current power. User picks generator, 7.5 kVA surfaces as a sub-field. Live plan panel on the right begins computing estimated monthly petrol spend.

17. User uploads NEPA bill. Context engine decides to skip appliance picker entirely. A notice fades in: "Pria skipped the appliance step — we already have what we need from your bill."

18. Step 4 (confirmation) shows extracted data as metric cards — 180 kWh/month, Band B tariff, Ikeja Electric, ₦11,200 average monthly cost — each editable.

19. User confirms. Reveal page loads. User has implicitly signalled cost-driven priority (large generator spend). Hero number is 20-year savings; payback is the second card; CO₂ is third.

20. User taps Pria icon next to total cost. Inline composer grows from the icon. User asks "why this number?" Pria streams an explanation.

21. User taps voice button bottom-right. Orb expands. User asks verbally "what if I add a deep freezer?" Pria re-runs, plan panel updates with assemble animation.

22. User clicks Export → receives PDF \+ XLSX. Clicks "Get quotes" — plan released to three vetted installers.

## **14.2 SME — with form rescue**

23. Clinic owner picks "Business, Ibadan, not sure." "Help me choose" triggers diagnostic: Pria asks three adaptive questions.

24. Pria recommends hybrid solar \+ small backup generator. "Reliability-first" priority inferred from clinic context.

25. On the load step, the appliance grid doesn't have "vaccine fridge" or "incubator." Owner taps form rescue "add something not listed." Pria adds both tiles with the AI-glow fade-in.

26. Reveal loads in reliability-first variant — hero is hours-of-autonomy with a day/night ring graphic.

27. Owner shares plan link with board. Board member comments on line item 14 via the shared view.

## **14.3 Returning user — with memory**

28. Adaeze returns three weeks later. Home screen greets her: "let's keep going with your Lekki plan."

29. Her last plan surfaces as an editable summary card. Beside it: "what changed" deltas — panel prices dropped 4%, Wema added a new 24-month financing product.

30. Three adaptive next-action cards: "request quotes," "explore wind as a second option," "share with your husband."

# **15\. Technical Architecture**

Pricing AI aligns with the established patterns across Mayorkingx's other ventures (MARS, Synapsio, ZettaPay, CareBridge) so we can reuse infrastructure, observability, and team knowledge.

### **15.1 Stack**

* Frontend: Next.js (latest stable), React, Tailwind. Mobile web-first. Optional React Native companion in v1.x.

* Backend: NestJS (TypeScript) — primary API and tool execution for Bedrock agents (Return Control pattern).

* AI: AWS Bedrock Agents for Pria. Bedrock Knowledge Bases (S3 \+ Titan Embeddings \+ OpenSearch Serverless) for unstructured retrieval. AgentCore Policy / Observability / Memory / Identity as additive layers.

* Voice: real-time streaming via AWS Nova Sonic or partner speech-to-speech provider (decided in phase-1 spike).

* Deterministic math: dedicated NestJS modules for sizing, pricing, cashflow, sensitivity, scheduling.

* Database: PostgreSQL (primary) with Prisma ORM.

* Document generation: server-side XLSX (exceljs) and PDF (Playwright \+ HTML template); chart rendering via headless Chromium with Chart.js.

* Files & media: S3 for bill uploads, generated outputs, shared plan snapshots.

* Async tasks: SQS \+ Node workers for heavy generation (PDF \+ XLSX \+ chart bundles).

* Payments (v1+): Paystack primary, Flutterwave secondary.

* Region: AWS eu-central-1 primary. Data residency for African regions (af-south-1 Cape Town \+ Lagos Local Zone) evaluated in v2.

### **15.2 High-level modules**

* pria-substrate — Pria orchestration, prompts, Bedrock configuration, voice pipeline.

* context-engine — adaptive sequencing rules, step-skipping logic, persona inference.

* intake-agent — Pria's onboarding flow.

* load-profile — appliance library, archetypes, bill OCR, hourly curve generator.

* geo-irradiance — NASA POWER / PVGIS data ingestion and caching.

* sizing-engine — electrical sizing for PV, batteries, inverters, wind, biomass.

* catalogue — component SKUs, tiers, USD-linked flags, monthly refresh.

* boq-engine — design → priced BOQ with VAT, labour, delivery, contingency.

* financial-model — cashflow, payback, NPV, IRR, sensitivity, CO₂.

* schedule-engine — Gantt generation.

* report-builder — PDF, XLSX, chart images, shareable snapshot.

* financing — lender product catalogue and eligibility.

* installer-marketplace — profiles, lead distribution, RFQ.

* memory-service — v2 — cross-session memory for returning users.

* admin — catalogue, FX rate, tariff updates, installer verification.

### **15.3 Bedrock tool surface**

Pria invokes these through Return Control. Each is a typed NestJS endpoint. The LLM never computes these values itself.

* get\_location\_irradiance(lat, lng) → monthly kWh/m²/day

* extract\_bill(imageId) → { disco, tariff\_band, monthly\_kwh, amount\_ngn }

* build\_load\_profile(inputs) → LoadProfile

* size\_system(loadProfile, location, source) → SystemDesign

* price\_design(design, fxRate) → BOQ

* model\_financials(boq, baseline, assumptions) → CashflowModel

* generate\_schedule(design, location) → Gantt

* render\_report(planId, format) → { url, expiresAt }

* list\_financing(planId) → LoanProduct\[\]

* list\_installers(planId) → Installer\[\]

* infer\_user\_priority(conversationHistory) → Priority — used by adaptive reveal page

* extend\_form\_schema(stepId, userDescription) → FieldSchema — used by form rescue

### **15.4 Data model (high level)**

* User, Plan (a single decision journey, revisions kept), LoadProfile, SystemDesign, BOQ, CashflowModel, Schedule, Installer, LoanProduct, Quote, Share, UserMemory (v2).

* Every plan is a snapshot — editing produces a new revision. All revisions shareable.

# **16\. Data Sources & Dependencies**

| Data | Source | Refresh / notes |
| :---- | :---- | :---- |
| Solar irradiance | NASA POWER API; PVGIS; NREL datasets | Cached per lat/lng, refresh monthly |
| DisCo tariff bands | NERC publications; individual DisCo sites | Manual \+ scraped updates; review monthly and on announcement |
| Diesel / petrol pump prices | NBS, NNPC, Petroleumprice.ng | Weekly refresh — volatile |
| FX rates (USD/NGN) | CBN official \+ parallel market | Daily; displayed on every report |
| Solar component prices | Nigerian distributors \+ global benchmarks | Monthly catalogue refresh |
| Financing products | Sterling, FCMB, Access, Wema, Arnergy PAYG, Lumos | Quarterly or on announcement |
| Carbon factors | IEA, Nigerian grid emission factor, diesel EF | Annual |
| Installer roster | Onboarded directly; public directories as seed | Ongoing; tiered vetting (basic, verified, premium) |

# **17\. Craft Transfer & Cross-Product Patterns**

Pricing AI is one product in a portfolio (MARS, Synapsio, ZettaPay, CareBridge, Pricing AI). Some craft transfers across products; some does not. This section is the explicit policy on what moves and what stays.

### **17.1 What transfers**

* **Motion vocabulary.** Pulse, Assemble, Chromatic Spin, AI-glow — and the 180ms/320ms/560ms timing scale. Applicable across every KJB A³ product that has a reactive UI.

* **Editorial card composition.** Tall 3:4 portrait cards with visual-top \+ text-bottom \+ mono counter label. Reusable anywhere.

* **Split-pane live panel pattern.** Input on the left, live computation on the right. Applicable to any product where user input drives calculated outputs — CareBridge's contribution calculator, ZettaPay's payment flows, Synapsio's BOQ estimator.

* **Typographic discipline.** One display serif, one body sans, one mono — every displayed number in mono. Applicable regardless of which specific fonts each product picks.

* **AI-substrate pattern.** Ambient icons, inline composer (growing pill from icon position), voice mode (orb \+ waveform), form rescue. Applicable to any product with a conversational agent — with the agent renamed and re-personaed per product (Pria here, Syna at Synapsio, CzettaPal at ZettaPay).

* **Hyper-personalization framework.** The six-layer model is generic. Each product implements the layers that matter for its context.

### **17.2 What does NOT transfer**

* **Volt Horizon colors.** Voltage-coral, bio-green, horizon-cyan, pre-dawn surfaces are Pricing AI's identity. Do not copy them to CareBridge or any other product.

* **Specific font choices.** Fraunces \+ Inter Tight \+ JetBrains Mono is Pricing AI's voice. Other products pick their own typefaces appropriate to their register.

* **Agent name and personality.** Pria is renewable-energy specific. Other products get their own named agents.

* **Renewable-energy decorative metaphors.** Sun-arc, turbine silhouette, voltage particles, leaf veins — these are Volt Horizon's. Other products invent their own decorative language.

* **Dark-first mode.** Volt Horizon is dark-first because pre-dawn suggests "city coming online." A healthcare product like CareBridge should be light-first — the atmosphere must lower cortisol, not raise it.

### **17.3 The principle**

Transfer the craft, not the costume. Every KJB A³ product deserves its own visual identity but shares the same discipline, motion vocabulary, and AI-substrate thinking. This is how we build a portfolio that feels coherent without feeling copy-pasted.

# **18\. Monetisation & Business Model**

Pricing AI uses a marketplace \+ pro-tier model. The core consumer experience stays free so the data moat (plans, conversion, comparisons) grows quickly.

### **18.1 Revenue streams**

* **Installer lead fees.** Vetted installers pay per revealed lead or a success fee on completed install. Primary near-term revenue.

* **Installer pro subscription.** Monthly SaaS for installers using branded proposal mode for their own pipeline.

* **Financing referrals.** Commission on funded loans originated through our catalogue.

* **Enterprise / API tier (v2).** DFIs, mini-grid operators, utilities pay for batch plans and API access.

* **Data licensing (later).** Anonymised market insights sold to manufacturers, DFIs, government agencies.

### **18.2 Pricing (draft)**

* Consumer: free for generating plans and reports.

* Installer: free to be listed; pay per revealed lead (₦5,000–₦25,000 depending on system size); pro branded-proposal mode from ₦40,000/month.

* API / enterprise: quoted per use case.

# **19\. Success Metrics**

### **19.1 North star**

Number of renewable energy decisions made with a Pricing AI plan per month.

### **19.2 Primary**

* Weekly plans started and % completed.

* Median time-to-first-plan (target: \< 5 minutes).

* Plan share rate (target: \> 25% of completed plans shared or exported).

* Lead-to-quote conversion (target: \> 60% of revealed leads get a response within 48h).

* Repeat returns (user comes back within 30 days to revise).

### **19.3 Pria-specific**

* % of plans that use at least one Pria inline composer interaction.

* % of plans that use voice mode at least once.

* % of plans that use form rescue to extend the schema.

* Pria response helpfulness rating (1–5, asked opportunistically after complex exchanges).

### **19.4 Quality**

* % of plans where actual installed cost (reported post-install) is within ±10% of Pricing AI estimate.

* NPS among users who export a plan.

* Installer NPS on lead quality.

### **19.5 Ecosystem**

* States covered by ≥3 vetted installers.

* Number of financing products listed.

* Catalogue freshness (days since last price refresh).

# **20\. Roadmap**

### **Phase 0 — Foundations (Weeks 1–4)**

* Finalise PRD v0.2; design system sign-off; data-model schema.

* Stand up AWS, Bedrock, Postgres, CI/CD. Volt Horizon tokens in code.

* Onboard 5–10 installers for closed beta.

* Seed component catalogue and tariff data for Lagos, Abuja, Port Harcourt, Kano, Ibadan.

### **Phase 1 — MVP (Weeks 5–12)**

* Solar PV (off-grid \+ hybrid) full flow.

* Pria surfaces 1 and 2 — ambient icons and inline composer.

* Hyper-personalization Layer 1 & 2 shipped (numbers \+ conditional UI).

* Hyper-personalization Phase 1 shipped (adaptive sequencing with bill-upload skip).

* Bill upload OCR. Load profile. BOQ. Cashflow. Gantt. PDF \+ XLSX exports.

* Shareable plan links. Financing catalogue (static).

* Closed beta: 100 homeowners \+ 20 SMEs \+ 10 installers.

### **Phase 2 — Public launch (Weeks 13–20)**

* Installer marketplace with paid lead reveal.

* Financing referrals (two lender partners live).

* Pria Surface 3 — voice mode.

* Hyper-personalization Phase 2 — adaptive priority reveal.

* Solar thermal \+ small wind modules.

* Roof imagery overlay for major cities where coverage exists.

* Public launch in Nigeria.

### **Phase 3 — Expansion (Months 6–12)**

* Pria Surface 4 — form rescue.

* Hyper-personalization Phase 3 — adaptive Pria copy.

* Biomass / biogas module.

* Installer pro branded-proposal mode.

* Ghana expansion pack.

* Developer API (private preview).

### **Phase 4 — Scale (Year 2\)**

* Hyper-personalization Phase 4 — atmosphere shifts (solar / wind / biomass / hybrid).

* Hyper-personalization Phase 5 — memory across sessions.

* Micro-hydro module.

* Batch mode for mini-grid developers.

* Kenya, South Africa expansion packs.

* Data-licensing product.

# **21\. Risks & Mitigations**

| Risk | Why it matters | Mitigation |
| :---- | :---- | :---- |
| Inaccurate pricing becomes public. | One viral "Pricing AI told me X but I paid Y" post damages trust. | Catalogue freshness SLA; confidence bands; post-install reconciliation loop; visible assumptions. |
| Installer network not dense enough at launch. | Without good quote response, users churn. | Onboard 10+ installers in 3 states before public launch; manual concierge path for first 90 days. |
| FX volatility drives week-to-week price swings. | Plan today, quote in 3 weeks 20% higher. | Report shows FX rate used and valid-until date; re-price on demand; FX-locked quotes from partner installers (optional). |
| Pria hallucination in technical explanations. | Confident-sounding incorrect fact. | Deterministic math outside the LLM; strict tool-call discipline; source-citation in prompts; human review of top FAQs. |
| Voice mode latency feels sluggish. | Kills the "live conversation" magic. | Spike early; pick whichever voice stack delivers sub-500ms round-trip; graceful fallback to text. |
| Over-personalization feels surveilling. | Users creeped out when app knows too much. | Personalize priority and examples; keep structure recognizable; one-click forget on memory items. |
| Form rescue generates nonsense fields. | Pria invents an appliance that doesn't exist. | Validation against a sanity range; flagged fields show a "Pria added this — verify?" badge for the first session. |
| Regulatory scrutiny on financing referrals. | Could be reclassified as financial advice. | Clear positioning as informational only; legal review before lender partnerships; disclosures on every referral. |
| Installer backlash (we disrupt their funnel). | Perceive us as competition. | Position as top-of-funnel partner; share economics transparently; branded pro mode. |
| Data-privacy concerns on bill uploads. | Addresses and bills are sensitive. | Scrub post-extraction; retention limit; NDPC compliance review; visible memory controls. |
| Feature sprawl — covering every renewable day 1\. | Shallow product that does nothing well. | MVP is solar PV only. Every additional module passes the neutrality \+ ready-to-act bar. |

# **22\. Open Questions**

31. Minimum installer panel size for launch — state coverage vs. quality trade-off?

32. Freemium homeowner → paid deeper analysis tier, or keep consumer fully free?

33. White-label pro mode for specific installer brands, or strictly co-brand?

34. Integration with PowerLabs or similar for installed-system monitoring handoff?

35. Regulatory — do financing referrals require a licence? Legal opinion needed, consistent with CareBridge approach.

36. Publish anonymised pricing telemetry publicly for SEO \+ trust, or keep private for commercial licensing later?

37. Voice provider — AWS Nova Sonic vs. partner (Retell, Vapi, others)? Latency \+ Nigerian accent robustness are the two decision factors.

38. Does the persona chip (§10.4) appear to all users, or only when Pria has high confidence in the classification?

# **23\. Appendices**

## **23.1 Glossary**

* **BOQ —** Bill of Quantities; a priced line-by-line list of everything that goes into a project.

* **DisCo —** Nigerian electricity Distribution Company (Ikeja Electric, Eko Electric, Abuja Electricity, etc.).

* **kW vs. kWh —** kW is a rate of power; kWh is energy (power × time). A 5 kW system running 2 hours produces 10 kWh.

* **LCOE —** Levelized Cost of Energy; per-unit cost over the lifetime of the system.

* **Load profile —** How much power is used, hour by hour, through the day.

* **NERC —** Nigerian Electricity Regulatory Commission.

* **NPV / IRR —** Standard ways to compare investments over time.

* **PAYG —** Pay-As-You-Go solar financing.

* **PV —** Photovoltaic; the panels that convert sunlight to electricity.

* **Pria —** The named agentic substrate of Pricing AI.

* **Return Control —** A Bedrock Agent pattern where the LLM picks the tool but the backend executes and returns structured results.

* **Volt Horizon —** The named design system of Pricing AI.

## **23.2 MVP readiness criteria**

* A non-technical homeowner produces an accurate priced solar plan for a 3-bedroom home in Lagos in under 10 minutes.

* PDF \+ XLSX render cleanly, share by link and print cleanly.

* 5 installers respond to leads within 48 hours.

* Two lender partners confirm they will accept referrals.

* Confidence bands on total cost are within ±15% for at least 10 test installs (validated against actual post-install invoices).

* Pria voice mode sustains sub-500ms round-trip on 4G from Lagos.

* Form rescue flagged-field review shows \< 5% nonsense rate on a 100-request sample.

## **23.3 Example first-message from Pria**

*"Hey — I'm Pria. I help people figure out whether switching to renewable energy actually makes sense for them, in real naira, with a real plan. To give you something useful in the next couple of minutes, I need three quick things: who is this for (a home, a business, a community), roughly where you are, and which direction you're leaning. If you're not sure, pick "help me choose" and I'll walk you through it."*

**End of document. Version 0.2 — full rewrite, integrated.** *Prepared April 24, 2026\.*