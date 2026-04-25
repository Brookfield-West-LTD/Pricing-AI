**PRODUCT REQUIREMENTS DOCUMENT**

**Pricing AI**

*An AI-guided renewable energy decision & pricing platform*

Version 0.1 (Draft for Review)

April 2026

Owner: Mayorkingx

# **1\. Document Control**

| Field | Value |
| :---- | :---- |
| Product name | Pricing AI |
| Document type | Product Requirements Document (PRD) |
| Version | 0.1 — Draft |
| Prepared for | Mayorkingx (Product Owner) |
| Prepared by | Product team \+ Claude (research & drafting) |
| Date | April 22, 2026 |
| Status | Draft for internal review |
| Intended audience | Founding team, product, engineering, design, investors, early partners |

# **2\. Executive Summary**

Pricing AI is an AI-powered platform that helps anyone — homeowners, SMEs, facility managers, developers and installers — make confident, well-priced, well-designed decisions about adopting renewable energy. The user describes what they want to power, where they are, and how they want to pay. Pricing AI does the rest: it asks the right follow-up questions, sizes the system, produces a complete budget, generates charts and schedules, and explains trade-offs in plain language.

Unlike existing tools that are either (a) simple one-screen calculators that only estimate savings, or (b) professional installer software priced for Western markets, Pricing AI is positioned as a vendor-neutral decision layer built first for the African energy reality — where diesel generators, unreliable grid supply, naira volatility, and import-driven component prices dominate the buying decision.

The platform covers all major renewable energy options — solar PV (on-grid, off-grid, hybrid), small wind, micro-hydro, biomass/biogas, solar thermal, and hybrid combinations — and produces rich, shareable outputs: budgets, bills of quantities, Gantt project timelines, cost-over-time charts, system layout visualisations, savings projections vs. the user’s current power source, and a clear payback analysis. Outputs export as XLSX, PDF and shareable web links.

### **2.1 One-line positioning**

*“The AI energy advisor that turns a renewable energy question into a priced, scheduled, ready-to-execute plan — in minutes, not weeks.”*

### **2.2 Why now**

* Diesel and petrol prices in Nigeria roughly tripled after the 2023 subsidy removal, making generator-dependent households and SMEs actively shop for alternatives.

* Solar component costs continue to fall globally while AI model costs (Bedrock, OpenAI, local LLMs) have reached a level where conversational, tool-using agents are viable at consumer price points.

* Nigerian banks (Sterling, FCMB, Access, Wema) and PAYG providers (Arnergy, Lumos, Daystar Power) now offer dedicated solar financing — but there is no neutral place for a buyer to size the right system and compare financing cleanly.

* Existing global solar tools (Aurora Solar, OpenSolar, Project Sunroof) are built for US/EU roof data, tariffs, and incentive structures — they do not speak to the African market.

# **3\. Problem Statement**

## **3.1 The user problem**

Anyone considering a renewable energy investment today faces a surprisingly painful journey. The questions sound simple — “Can I run my house on solar?”, “How much will it cost me?”, “Is it better than my generator?” — but the honest answers require expertise in electrical load analysis, component pricing, geography-specific solar irradiance, tariff structures, financing, and project planning. Today this expertise is locked inside installer sales teams, who are incentivised to upsell.

Concretely, a user who wants to switch to renewable energy typically has to:

1. Guess their load (or dig through old electricity bills and generator fuel logs).

2. Contact 3–5 installers, share their requirements, and wait days for quotes.

3. Receive quotes in wildly different formats, with different assumptions and different component brands — and no way to compare apples-to-apples.

4. Either accept the first decent-looking quote or give up and stay with the generator.

*The result: a slow, opaque, vendor-biased decision that drives many people back to diesel and kerosene — exactly the systems renewables are meant to replace.*

## **3.2 Nigerian market reality (our starting context)**

Pricing AI is being designed first for the Nigerian and broader African context, which has specific dynamics that global solar tools do not model well:

* **Grid unreliability:** Most Nigerian households on the grid still receive only a fraction of 24-hour supply, so solar is almost always paired with batteries and sometimes a backup generator. Pure grid-tie systems that dominate US tools are rarely appropriate here.

* **Generator-first baseline:** The meaningful comparison is usually not “solar vs. grid bill” but “solar vs. diesel/petrol generator running cost”. Pricing Ai must model this explicitly.

* **FX and import exposure:** Panels, inverters and lithium batteries are largely imported and priced (directly or indirectly) in USD. Naira volatility meaningfully changes prices month-to-month, so a static price table goes stale fast.

* **Tariff complexity:** NERC tariff bands (A, B, C, D, E) differ across DisCos (Ikeja Electric, Eko, Abuja, PHED, etc.). Cross-subsidies, Band A reclassification, and estimated billing all change the economics.

* **Multiple renewable options are under-served:** Solar PV dominates the conversation, but small wind (coastal), biomass/biogas (agricultural SMEs), and micro-hydro (rural communities) are real options that almost no consumer tool helps people evaluate.

## **3.3 What we believe**

* The core value is not a calculator number. It is a complete, defensible, ready-to-act plan: system design \+ BOQ \+ schedule \+ financing \+ comparison narrative.

* Speed and clarity win. If a homeowner can go from “I have a generator problem” to “here’s my ₦X plan and when it pays back” in under 15 minutes, we win their trust.

* Vendor neutrality is a moat. Installers will eventually pay us for qualified leads; users will trust us because we don’t sell panels.

* AI is the unlock. A conversational agent that adapts to what it already knows about the user is dramatically better UX than a 30-field form.

# **4\. Competitive Landscape**

We researched the market across four tiers of competing tools. Pricing AI occupies the whitespace between consumer calculators and professional installer software — but uniquely positioned for African energy realities and for all renewables, not just solar.

## **4.1 Tier 1 — Consumer solar calculators**

These are lightweight, web-based estimators. They answer roughly one question — “how much solar do I need and what will I save?” — and they work best in markets with clean tariff data and roof imagery.

| Tool | Geography | What it does / limits |
| :---- | :---- | :---- |
| Google Project Sunroof | US only | Uses aerial imagery to show a roof’s solar potential and connects to providers. No pricing depth, no project plan, no African coverage. |
| PVWatts (NREL) | Global | Free, technical, accurate energy-production model. Outputs kWh, not a budget or a system design. Aimed at engineers, not consumers. |
| Solar-Estimate.org | US only | AI-assisted consumer estimator with Genability-powered savings. Strong on US tariffs and incentives, irrelevant outside the US. |
| GreenMetricAI | US-centric | Free multi-calculator suite (solar, generators, EV). Good example of “one brand, many calculators” play — but shallow depth per calculator. |
| Solar Energy AI Calculator (ChatGPT) | Generic | Conversational savings estimator built on GPT-4o. Cute demo, not a real product — no structured outputs or schedule. |
| Stera Power (NG), BOYLS, Sunplenti | Nigeria | Installer-hosted solar-vs-generator calculators. Useful lead-gen widgets, but inherently biased toward their own packages. No cross-vendor, no Gantt, no BOQ. |

## **4.2 Tier 2 — Professional installer / design software**

These are deep, subscription-priced design tools used by solar installers in North America, Europe, Australia. They are extremely capable but also expensive, technical, and not designed for end users.

| Tool | Pricing / Access | Strengths & gaps for our users |
| :---- | :---- | :---- |
| Aurora Solar | \~$159+/mo \+ credits | Market leader. AI-powered 3D roof models in under 15 seconds, LIDAR shading, interactive proposals, integrated financing via partners. Residential US focus; expensive for African SMEs; no generator-replacement framing. |
| HelioScope (owned by Aurora) | \~$159+/mo | Commercial & industrial specialist, strong simulations up to 5 MW. Great for developers, inaccessible for SMEs and homeowners. |
| OpenSolar | Free (monetised via hardware & financing partners) | Used by 25,000+ solar pros in 160+ countries. 3D modelling, CRM, proposal generator. Best free option but still installer-oriented and US/EU-dominant. |
| Solargraf, Solo, ARKA 360 | Paid SaaS | Proposal/design focused. Accuracy and customisation have been criticised by installers migrating to Aurora. |
| EasySolar AI | Paid SaaS, global | Has preconfigured local subsidies and tariffs for US, Germany, Australia, Brazil, South Africa and more. Notably does not yet have deep Nigerian support. |
| Freyr Energy (India) | Free, vendor-owned | AI/ML-enhanced consumer calculator, pulls PM Surya Ghar subsidy data. Good example of a localised consumer experience — but vendor-biased. |
| HOMER Pro, System Advisor Model (SAM), RETScreen | Technical / licensed | Industry-standard techno-economic modelling for hybrid systems including wind, biomass, hydro. Too complex for end users; Pricing AI can act as a friendly front-end to this kind of rigour. |

## **4.3 Tier 3 — Nigerian / African operators**

These are installers and energy service providers, not independent pricing tools. They matter because they define the current buying journey — and they are the natural downstream partners once Pricing AI delivers qualified leads.

* **Arnergy —** Series B Nigerian cleantech (US$30M raised), 1,800+ installations in 35 states. Full-stack solar with PAYG \+ diaspora investment product. No consumer-facing pricing tool beyond basic sizing forms.

* **Daystar Power —** Commercial & industrial Power-as-a-Service. Designs, finances, installs and operates; users pay per kWh. Large projects only.

* **Rensource, Gennex, Lumos, Rubitec, Auxano, GVE —** A wide field of installers and mini-grid operators, each with their own lead form. Fragmented; painful for a user to compare.

* **PowerLabs —** A new Nigerian startup building an “intelligence layer” to coordinate existing distributed energy systems. Adjacent, not directly competing — could be a data / integration partner.

## **4.4 Landscape summary — where Pricing AI sits**

Visualising the market on two axes — (Y) depth of planning output, and (X) vendor neutrality / user-first orientation:

|  | Low neutrality (vendor-biased) | Medium neutrality | High neutrality (user-first) |
| :---- | :---- | :---- | :---- |
| Deep output (design \+ BOQ \+ schedule \+ financing) | Aurora Solar, HelioScope, OpenSolar (installer-biased) | HOMER Pro, SAM (research / expert-only) | PRICING AI (our target position) |
| Shallow output (savings number only) | Installer calculators (Arnergy, Stera, BOYLS, Sunplenti) | Project Sunroof, GreenMetricAI, Solar-Estimate.org | PVWatts (technical, not useful without expertise) |

The top-right quadrant — deep, vendor-neutral output — is effectively empty, especially for African users and for non-solar renewables. That is Pricing AI’s opportunity.

# **5\. How Pricing AI Stays Unique**

Ten concrete differentiators we will defend through product, data and brand:

### **5.1 Conversational intake, not a form**

Every existing tool asks 15–40 form fields. Pricing AI uses an AI agent that asks only what it needs, adapts based on earlier answers, and lets users upload an electricity bill or a generator log instead of typing numbers. Fewer clicks, more accurate inputs.

### **5.2 All renewables, one decision surface**

Solar PV (on-grid, off-grid, hybrid), solar thermal (water heating, industrial), small & medium wind, micro-hydro, biomass / biogas, and hybrid combinations that blend two or more with or without a backup generator. No consumer tool today covers this breadth in a single flow.

### **5.3 African-reality data layer**

A first-class data layer the competition does not have:

* NERC tariff bands per DisCo, updated when tariffs change.

* Average grid availability hours per state / LGA (from published DisCo \+ third-party data).

* Monthly-tracked solar component pricing from Nigerian distributors plus USD-pegged global benchmarks, with FX adjustment.

* Current diesel and petrol pump prices with a forecasting curve for payback scenarios.

* Live catalogue of available solar financing products (bank loans, PAYG, lease-to-own) from at least five providers at MVP.

### **5.4 Vendor-neutral by design**

We do not sell panels, inverters or installation. Our revenue comes from qualified-lead referrals to verified installers, financing-product referrals, a pro tier for installers who use our outputs as sales decks, and an API for developers / utilities.

### **5.5 Generator-replacement framing (not just grid savings)**

Our primary comparison for Nigerian users is against the user’s current diesel/petrol generator spend, not a grid bill. We model monthly fuel, servicing, downtime, and noise externalities, then show the payback vs. solar/hybrid. This is how real buying decisions happen here.

### **5.6 Rich, ready-to-share outputs**

For every completed plan we generate, in the user’s browser or downloadable:

* A printable PDF report (executive summary, design, BOQ, schedule, financing options, assumptions).

* An Excel workbook with the full BOQ, month-by-month cashflow, savings ledger, and sensitivity table.

* A Gantt chart of the installation project (procurement, site prep, install, commissioning, handover).

* Interactive cost and savings charts (energy produced, diesel avoided, cumulative cashflow, CO₂ avoided).

* A system layout visualisation (roof panel placement for solar, turbine siting for wind, component diagram for all).

* A shareable link with optional watermark (homeowners can send to family; SMEs to boards).

### **5.7 What-if simulations**

One-click levers: “What if I add a freezer?”, “What if diesel goes to ₦2,500/L?”, “What if naira weakens 20%?”, “What if I only install half now and expand in year 3?”. The agent re-computes and explains which numbers moved and why. This is the kind of live reasoning that spreadsheets cannot offer.

### **5.8 Plain-language explanations**

Every number in the output is accompanied by a short, human-readable explanation (“We sized for 6 kWh/day because your bill averages 180 kWh/month and you flagged that your fridge must stay on overnight.”). The AI agent is available in-context to answer any follow-up.

### **5.9 Installer marketplace (tiered)**

After the plan is produced, users can optionally request quotes from up to three vetted installers operating in their state. Installers see a pre-qualified brief (load, location, budget, financing preference) and respond faster and cheaper than through their normal sales funnel.

### **5.10 Trustworthy, auditable numbers**

Every result page shows: data sources, assumption tables, confidence bands, and a “show the math” view. We publish our methodology and reference models (PVWatts-style irradiance, NREL-style LCOE) openly — installers, banks, and buyers all benefit from the transparency, and it is a moat vs. LLM-only competitors whose numbers can look confident but be wrong.

# **6\. Target Users & Personas**

Pricing AI serves four distinct user types. The MVP focuses on the first two (homeowner and SME owner). Installer and developer tiers are planned for v1.x and v2.

### **6.1 Persona 1 — Homeowner (Adaeze)**

Adaeze is 42, lives in Lekki, and runs a 7.5 kVA generator that she now spends ₦150,000–₦220,000/month on petrol for. She has heard solar is “the answer” but does not know if her load is too heavy, whether she needs batteries, or if she can afford it. She has seen three different quotes ranging from ₦2.8M to ₦6.4M and has no way to tell which is fair.

Adaeze wants:

* A trustworthy number she can take to her husband and her bank.

* Confidence that the system will actually run her AC, fridge, pumping machine and a 1.5 hp borehole.

* A clear payback timeline vs. what she pays now for petrol.

* The option to pay monthly, not lump-sum.

### **6.2 Persona 2 — SME owner (Tunde)**

Tunde owns a 12-bed maternity clinic in Ibadan. He loses ₦90,000/month on diesel, plus equipment damage from power surges. He also thinks about wind (his roof is exposed) and biogas (food waste). He needs uptime, not elegance.

Tunde wants:

* A BOQ he can share with his accountant and his board.

* A realistic Gantt — he cannot be without power for weeks during install.

* Financing options that match his cashflow.

* Confidence that, if he grows, the system can grow with him.

### **6.3 Persona 3 — Installer / EPC (Chidi) — v1.x**

Chidi runs a 22-person solar installation company. He spends too much unpaid sales time producing quotes that go nowhere. He would gladly pay for pre-qualified leads and would also use Pricing AI as a fast proposal generator for his own clients, with his branding on the output.

Chidi wants:

* Leads with load, location and budget already attached.

* A branded output mode he can hand to his own customers.

* API access so he can pull data into his CRM.

### **6.4 Persona 4 — Developer / utility (Ada) — v2**

Ada is a mini-grid developer planning 12 rural sites. She needs fast techno-economic modelling per site without paying for HOMER Pro seats for a small team. She also needs programmatic access for batch site scoring.

Ada wants:

* Batch mode: upload 12 locations, get 12 prioritised plans.

* Deeper modelling for hybrid mini-grids.

* Integration with her internal GIS.

# **7\. Product Principles**

These principles guide all design and engineering trade-offs. When in doubt, we pick the option that honours the highest-ranked principle on this list.

5. Honest over optimistic. A defensible estimate with confidence bands beats a flashy marketing number. We never fabricate savings.

6. Fast path to value. A homeowner must be able to get a usable first answer in under 5 minutes, a full plan in under 15\.

7. Explain everything. Every output includes a short, plain-language reason. The agent is reachable at any point for follow-up.

8. African-first, globally viable. Our models and data layers are designed around African realities, but our architecture allows market-specific overlays for any region we expand into.

9. Vendor neutral, always. No upsell logic, no sponsored panel brands, no hidden kickbacks in recommendations.

10. Separate deterministic math from AI. Financial and electrical calculations run in deterministic TypeScript code. The AI agent orchestrates, explains and adapts — it does not do the math itself.

11. Every answer is shareable. A plan that cannot be exported as PDF \+ XLSX and shared by link does not exist.

12. Design as a first-class tool, not a nice-to-have. For solar especially, a visual layout massively increases buyer confidence.

# **8\. In Scope and Out of Scope**

### **8.1 In scope (MVP)**

* Solar PV sizing and pricing for residential and SME use, both off-grid (with batteries) and hybrid (with optional backup generator).

* Generator-replacement comparison (diesel / petrol) with payback modelling.

* Load-profile builder from electricity bill upload (OCR) and/or appliance selector.

* Location-based solar irradiance using NASA POWER / PVGIS-style data for Nigeria.

* PDF report, XLSX workbook (BOQ \+ cashflow \+ sensitivity), basic Gantt chart, cost/savings charts, simple roof layout visual.

* Conversational AI agent for intake, explanation, and what-if simulations.

* Financing options listing (informational only at MVP, referrals at v1).

* Installer marketplace — request quotes from up to three vetted partners per user.

* User accounts, saved plans, sharing by link.

### **8.2 In scope (v1.x — fast follow)**

* Small wind and hybrid solar+wind systems for applicable regions.

* Biomass / biogas feasibility for agricultural SMEs (first pass: technology suitability and rough budget).

* Solar thermal (water heating) add-on module.

* Installer pro tier (branded outputs, lead inbox).

* Deeper roof / site imagery via Google Maps Solar API or third-party satellite imagery, where available for Nigeria.

### **8.3 In scope (v2)**

* Micro-hydro feasibility modelling.

* Full techno-economic modelling for rural mini-grids (batch mode).

* Developer API and CRM integrations.

* Regional expansion packs (Ghana, Kenya, South Africa) with local tariff and FX data.

### **8.4 Explicitly out of scope**

* We do not sell panels, inverters, batteries, or installation services directly.

* We do not perform structural roof engineering or stamped permit drawings — we refer to partner installers for these.

* We do not offer our own credit or insurance products at MVP.

* We do not do on-site monitoring of already-installed systems (PowerLabs and vendor apps already do this).

# **9\. Core Features**

Nine feature pillars, each with user stories, MVP behaviour, and a note on how AI participates.

## **9.1 Conversational intake agent ("Pria")**

A chat-style onboarding experience that replaces the traditional intake form.

### **User stories**

* As a homeowner, I can say “I want to switch from my generator” and Pria asks me the right follow-ups.

* As an SME owner, I can describe my business in one sentence and upload my electricity bill, and Pria extracts the numbers.

### **MVP behaviour**

* Pria always starts with: Who are you planning for? \+ Where are you? \+ Which energy source are you considering?

* Pria branches based on the energy source (solar, wind, biomass, hybrid, "not sure").

* Pria supports bill/photo upload and appliance checklist as alternative inputs.

* If Pria has enough inputs to produce a first-pass sizing, it does so and shows a draft plan, even if some answers are approximate.

## **9.2 Load-profile builder**

A structured model of what the user wants to power, by hour of day.

### **User stories**

* As a user, I can upload a past NEPA/DisCo bill and have the platform extract my average monthly kWh.

* As a user, I can tick appliances (AC, fridge, pumping machine, lights…) with hours/day and get a profile.

* As an SME, I can flag critical loads that must stay on 24/7 vs. tolerant loads.

### **MVP behaviour**

* Default Nigerian household and SME profiles seeded (bachelor flat, 3-bedroom family home, clinic, small office, small retail).

* OCR extraction of kWh and naira amounts from scanned bills (MTN/DisCo formats).

* Output: a 24-hour load curve, peak demand (kW), and daily energy (kWh).

## **9.3 Sizing & design engine**

Deterministic, explainable calculations converting a load profile \+ location \+ energy source choice into a system design.

### **User stories**

* Given my load and location, tell me how many panels, what inverter size, and what battery capacity I need.

* Show me how the numbers change if I pick a cheaper panel brand or a bigger battery.

### **MVP behaviour**

* Solar PV sizing uses irradiance data (NASA POWER / PVGIS) per location, panel derating factors, inverter efficiency curves, battery depth-of-discharge and autonomy days.

* Generator replacement mode: sizes for the user's current generator kVA or their declared peak load.

* Output: a structured SystemDesign object (panels, inverter, battery, mounting, cabling, protections) the BOQ engine reads.

## **9.4 Pricing & BOQ engine**

Turns the system design into a priced bill of quantities.

### **User stories**

* Show me every line item that goes into my system, with naira prices.

* Show me which line items are FX-sensitive and by how much they change if naira moves 10%.

### **MVP behaviour**

* Component catalogue with tier options (economy / standard / premium) for panels, inverters and batteries, refreshed at least monthly.

* Line items: panels, mounting, inverter, battery bank, BOS (balance of system), cables, protections, monitoring, delivery, installation labour, VAT, contingency.

* FX rule: any line item tagged USD\_LINKED is recomputed from a configured USD/NGN rate at the time the report is generated, with a banner showing the rate used.

## **9.5 Financial model & comparison**

The heart of the decision: does it make sense vs. what the user does today?

### **User stories**

* Compare my new solar plan vs. my current generator over 5, 10, 20 years.

* Show me payback month, NPV, IRR, cumulative savings.

* Show me what happens if diesel prices rise 10% a year.

### **MVP behaviour**

* Baseline-vs-plan cashflow model in monthly buckets over 20 years.

* Sensitivity table: fuel price, FX rate, grid reliability, inflation — each varied ±20%.

* CO₂-avoided estimate using published Nigerian grid and diesel emission factors.

## **9.6 Project schedule (Gantt)**

A realistic installation timeline the user can use to plan around.

### **User stories**

* Show me how long this project will take and which week my power will be interrupted.

* Export the schedule to Excel for my operations team.

### **MVP behaviour**

* Standard project template: site survey → procurement → delivery to site → structural prep → electrical install → commissioning → handover & training.

* Durations parametrised by system size and location (Lagos vs. rural).

* Gantt export to Excel (with conditional formatting) and printable PDF.

## **9.7 Outputs & sharing**

Every completed plan produces a package of artefacts.

### **User stories**

* Download a professional PDF report I can send to my husband, my accountant, my board.

* Download an Excel workbook with my BOQ, cashflow, and sensitivity tables.

* Share a read-only link with a relative or a colleague.

### **MVP behaviour**

* PDF: cover, exec summary, system design, BOQ, cashflow, sensitivity, Gantt, FAQ, assumptions & sources.

* XLSX: tabs \= Inputs, BOQ, 20-year cashflow, Sensitivity, Gantt, Assumptions.

* Shareable link with optional expiry and optional PIN.

## **9.8 Financing options**

Show users how they can pay, not only what it costs.

### **User stories**

* Show me solar loans from Nigerian banks and PAYG options I qualify for.

* Tell me what my monthly payment would look like, side by side.

### **MVP behaviour**

* Static catalogue at MVP of top solar financing products (Sterling, FCMB, Access, Wema, Arnergy PAYG, etc.) with eligibility rules and representative rates.

* Lead-referral integration at v1 — users can opt in to share their plan with one lender.

## **9.9 Installer marketplace**

Turn a completed plan into real quotes from vetted installers.

### **User stories**

* After my plan is ready, I want to request quotes from up to three trusted installers in my state.

* Let installers see my plan without seeing my personal identity until I accept.

### **MVP behaviour**

* Installer onboarding with state coverage, capability, past projects, and a basic rating system.

* Anonymous RFQ: the installer sees the plan, load, budget band, location band — not name or contact until the user chooses to reveal.

* Commercial model: installer pays a flat qualification fee per revealed lead, or a success fee on completed install (TBD in commercial workstream).

# **10\. AI Feature Deep-Dive**

This is where Pricing AI defends the name. We apply AI across six layers, deliberately keeping deterministic math out of the LLM and using the LLM only for orchestration, natural language, and explanation.

## **10.1 Six AI layers**

| Layer | AI role | What the user experiences |
| :---- | :---- | :---- |
| 1\. Conversational intake | Agentic planning: the agent asks the minimum set of questions, branches on answers, and knows when it has enough. | A chat that feels like talking to a patient, knowledgeable advisor — not a form. |
| 2\. Document & image understanding | Vision \+ OCR: extract kWh, tariff band, DisCo, amount paid from uploaded bills. Identify appliances from photos of a meter cupboard or generator. | Snap a photo of your last NEPA bill instead of typing numbers. |
| 3\. Load-profile inference | Classifies users into load archetypes based on answers (family home, clinic, small retail, POS agent, hair salon, welder). | If the user only says “I run a small barbing salon in Surulere”, the agent can still produce a usable draft load profile. |
| 4\. Explanation layer | Summarises every numeric output in plain language; adapts tone to the user’s self-declared role (homeowner vs. engineer). | Hover any number on the output page, get a one-sentence, human explanation. |
| 5\. What-if reasoning | Translates free-form user questions (“What if diesel hits ₦2,500/L?”) into structured simulation parameters. | Ask anything about the plan; get a live, recomputed answer. |
| 6\. Plan summarisation & negotiation prep | Pre-writes emails / WhatsApp messages the user can send to banks, spouses, installers to advocate for their plan. | One-click “Draft a message to my bank requesting a solar loan” that pulls the right numbers in. |

## **10.2 Agent architecture (archetype-based)**

Consistent with our prior work on Syna (Synapsio) and CzettaPal (ZettaPay), Pricing AI adopts an archetype-based agent persona. The agent’s name is Pria. Pria is framed not as a list of adjectives but as a named advisor with:

* A clear role — a senior renewable-energy analyst who has priced thousands of Nigerian installations.

* An adaptive tone — warm and simple with homeowners, precise and technical with installers and engineers, concise with SME owners.

* Hard guardrails — will not fabricate prices, will not recommend a specific installer without disclosing the referral relationship, will always cite sources on request.

## **10.3 Deterministic vs. generative boundary**

All financial and electrical math — sizing, BOQ, cashflow, payback, sensitivity — runs in deterministic TypeScript services (NestJS). The AI agent only orchestrates and explains.

*This matters because:*

* LLMs are unreliable with arithmetic and lookups; a 3% error on ₦4M is ₦120,000 the user did not expect.

* Banks, installers and developers must be able to audit the math. Deterministic code is auditable; LLM reasoning is not.

* This matches the Bedrock Return Control pattern already used in Synapsio and ZettaPay — the LLM decides which tool to call, the backend does the actual calculation and returns structured results.

## **10.4 Retrieval strategy**

Two knowledge stores for Pria:

* **Unstructured Knowledge Base (Bedrock KB → S3 \+ Titan Embeddings \+ OpenSearch Serverless):** methodology documents, regulatory explainers (NERC tariffs, SON standards), product datasheets, installation best-practice docs, case studies. Used for explanation and background.

* **Structured data (PostgreSQL via NestJS tools, Return Control):** component prices, irradiance per location, tariff tables, FX rate, financing product rules, installer roster. Used for actual calculations — never approximated by the LLM.

## **10.5 Guardrails and safety**

* Output validation: every priced plan is validated against a range check before display (total cost per kW of installed capacity must fall in a sane band; negative cashflows flagged for review).

* Source disclosure: every numeric claim the agent makes in chat must be tied to a tool call result or a KB citation — no free-floating numbers.

* Escalation: if Pria detects an unusual request (off-grid rural community, industrial loads \>500 kW, requests involving child labour or weapons), it refuses and flags for human review.

* Privacy: bill uploads are scrubbed of personally identifying information after extraction; retention of raw images is limited.

# **11\. Primary User Flows**

## **11.1 Homeowner happy path**

13. User lands on pricing.ai, clicks “Start my plan.”

14. Pria asks: who is this for, where are you, which option are you leaning toward?

15. User picks “home in Lekki, solar”. Pria asks about current power source — user says generator. Pria asks how much they spend on petrol/month.

16. Pria offers two paths: quick appliance checklist or upload last DisCo bill. User uploads a bill. Pria confirms extracted kWh.

17. Pria produces a draft plan in under a minute: 5 kW solar, 10 kWh lithium, recommended inverter, total \~₦4.2M.

18. User opens Explore panel, asks “What if I skip the battery?” — Pria re-runs with grid-tie \+ daytime-only use and shows the trade-off.

19. User clicks Export → receives PDF \+ XLSX. Clicks “Get quotes from installers” — releases plan to 3 vetted installers.

## **11.2 SME happy path**

20. Clinic owner picks “Business, Ibadan, not sure”. Pria asks load profile questions.

21. Pria suggests hybrid solar \+ small backup generator based on critical-load declaration.

22. Pria produces full plan, BOQ and Gantt. Owner asks “Can we phase this?” Pria re-plans as a two-phase install.

23. Owner shares plan link with board member, who leaves a comment on line item 14 via the shared view.

24. Owner requests financing options; Pria shows 3 lender products and a lease-to-own option.

## **11.3 Installer happy path (v1.x)**

25. Chidi logs into installer portal and sees 4 new qualified leads in his state.

26. For each lead, he sees load, system size, budget band, preferred financing. He accepts two, passes on two.

27. He uses Pricing AI’s pro mode to generate a branded proposal for an existing client who didn’t originate on our platform.

# **12\. Outputs in Detail**

This is what the user receives. Each artefact must be production-quality and shareable.

### **12.1 PDF report**

* Cover: user name (optional), plan name, date, share ID, confidence band.

* Executive summary: one paragraph \+ three headline numbers (total cost, monthly saving vs. baseline, payback).

* Current situation: what the user has today, what they spend today.

* Recommended design: diagram and spec table.

* Bill of quantities: priced line items with source tags.

* Financial model: 20-year cashflow chart, NPV, IRR, payback.

* Sensitivity: ±20% on fuel, FX, grid reliability, inflation.

* Project schedule: Gantt.

* Risks and assumptions.

* Next steps: financing options, installer referral, FAQ.

### **12.2 XLSX workbook**

* Inputs tab: all answers the user gave (editable for what-if analysis).

* BOQ tab: line items with quantity, unit price, subtotal, USD-linked flag.

* Cashflow tab: month-by-month, 20 years.

* Sensitivity tab: two-way data table on fuel × FX.

* Gantt tab: timeline with conditional formatting.

* Assumptions tab: irradiance used, derating factors, FX rate, tariff, data sources.

### **12.3 Charts**

* Energy produced vs. consumed, monthly.

* Cumulative cashflow (plan vs. baseline).

* Monthly cost (plan vs. baseline).

* CO₂ avoided over 20 years.

### **12.4 Gantt**

* Tasks: survey, design sign-off, procurement, delivery, civil prep, electrical install, commissioning, handover, training.

* Dependencies: procurement blocks install; commissioning blocks handover.

* Milestones: signed quote, deposit paid, panels on roof, system live.

### **12.5 System visualisation**

* Solar: rooftop layout (satellite image \+ panel polygons) when imagery is available; top-down schematic when not.

* Wind: turbine siting on a map relative to known obstacles.

* All: one-line component diagram (panels → MPPT → inverter → battery → loads).

# **13\. Technical Architecture (Overview)**

Pricing AI aligns with the established patterns across Mayorkingx's other ventures (MARS, Synapsio, ZettaPay) so we can reuse infrastructure, observability, and team knowledge.

### **13.1 Stack**

* Frontend: Next.js (latest stable), React, Tailwind; mobile web-first; plus a lightweight React Native companion (stretch for v1.x).

* Backend: NestJS (TypeScript) — primary API and tool execution for the Bedrock agent (Return Control pattern).

* AI: AWS Bedrock Agents for Pria; Bedrock Knowledge Bases (S3 \+ Titan Embeddings \+ OpenSearch Serverless) for unstructured retrieval; AgentCore Policy / Observability / Memory / Identity as additive layers.

* Deterministic math services: dedicated NestJS modules for sizing, pricing, cashflow, sensitivity, scheduling.

* Database: PostgreSQL (primary) — component catalogue, pricing, plans, users, installer directory.

* Document generation: server-side XLSX (exceljs) and PDF (Playwright \+ HTML template or pdfkit); chart rendering via headless Chromium with Chart.js.

* Files & media: S3 for bill uploads, generated outputs, and shared plan snapshots.

* Async tasks: SQS \+ Lambda or Node workers for heavy generation (PDF \+ XLSX \+ chart bundles).

* Payments (v1+): Paystack primary, Flutterwave secondary for installer tier subscriptions and referral fees.

* Region: AWS eu-central-1 primary (consistent with Synapsio plan); data residency option for African regions (af-south-1) evaluated in v2.

### **13.2 High-level modules**

* intake-agent — Pria orchestration, prompts, Bedrock configuration.

* load-profile — appliance library, archetypes, bill OCR, hourly curve generator.

* geo-irradiance — NASA POWER / PVGIS data ingestion and caching per lat/lng.

* sizing-engine — electrical sizing for PV, batteries, inverters, wind, biomass (deterministic).

* catalogue — component SKUs, tiers, USD-linked flags, monthly refresh.

* boq-engine — turns a design into a priced BOQ with VAT, labour, delivery, contingency.

* financial-model — cashflow, payback, NPV, IRR, sensitivity, CO₂.

* schedule-engine — Gantt generation from design \+ location.

* report-builder — PDF, XLSX, chart images, shareable snapshot.

* financing — lender product catalogue and eligibility.

* installer-marketplace — installer profiles, lead distribution, RFQ.

* admin — catalogue updates, FX rate, tariff updates, installer verification.

### **13.3 Bedrock tool surface (examples)**

Pria invokes these tools through Return Control. Each tool is a NestJS endpoint with a typed schema.

* get\_location\_irradiance(lat, lng) → monthly kWh/m²/day.

* extract\_bill(imageId) → { disco, tariff\_band, monthly\_kwh, amount\_ngn }.

* build\_load\_profile(inputs) → LoadProfile.

* size\_system(loadProfile, location, source) → SystemDesign.

* price\_design(design, fxRate) → BOQ.

* model\_financials(boq, baseline, assumptions) → CashflowModel.

* generate\_schedule(design, location) → Gantt.

* render\_report(planId, format) → { url, expiresAt }.

* list\_financing(planId) → Array\&lt;LoanProduct\&gt;.

* list\_installers(planId) → Array\&lt;Installer\&gt;.

### **13.4 Data model (high level)**

* User, Plan (a single decision journey, revisions kept), LoadProfile, SystemDesign, BOQ, CashflowModel, Schedule, Installer, LoanProduct, Quote, Share.

* Every plan is a snapshot — editing produces a new revision. All revisions sharable.

# **14\. Data Sources & Dependencies**

| Data | Source (initial) | Refresh / notes |
| :---- | :---- | :---- |
| Solar irradiance | NASA POWER API; PVGIS; NREL datasets. | Cached per lat/lng, refresh monthly (slow-changing). |
| DisCo tariff bands | NERC publications; individual DisCo sites (Ikeja, Eko, Abuja, PHED, Kano…) | Manual \+ scraped updates; review monthly and on NERC announcements. |
| Diesel / petrol pump prices | NBS, NNPC, Petroleumprice.ng, news aggregators. | Weekly refresh; volatile. |
| FX rates (USD/NGN) | CBN official \+ parallel market (where used). | Daily; displayed on every report. |
| Solar component prices | Nigerian distributors (Solar Energy Supply Stores, Blue Camel, Auxano, etc.) \+ global benchmarks. | Monthly catalogue refresh; monitor for brand withdrawal. |
| Financing products | Sterling, FCMB, Access, Wema, Arnergy PAYG, Lumos, etc. | Quarterly or on announcement. |
| Carbon factors | IEA, Nigerian grid emission factor, diesel EF. | Annual. |
| Installer roster | Onboarded directly; public directories as seed. | Ongoing; vetting tiered (basic, verified, premium). |

# **15\. Monetisation & Business Model**

Pricing AI uses a marketplace \+ pro-tier model. The core consumer experience stays free so the data moat (plans, conversion, comparisons) grows quickly.

### **15.1 Revenue streams**

* **Installer lead fees.** Vetted installers pay a flat qualification fee per revealed lead, or a success fee on a completed install. This is the primary near-term revenue stream.

* **Installer pro subscription.** Monthly SaaS for installers who use our branded proposal mode for their own pipeline.

* **Financing referrals.** Commission on funded loans originated through our catalogue.

* **Enterprise / API tier (v2).** Developers, DFIs, mini-grid operators pay for batch plans and API access.

* **Data licensing (later).** Anonymised market insights (what systems are selling at what prices in what states) — sold to manufacturers, DFIs, government agencies.

### **15.2 Pricing (draft)**

* Consumer: free for generating plans and reports.

* Installer tier: free to be listed; pay per revealed lead (target band: ₦5,000–₦25,000 depending on system size); pro branded proposal mode from ₦40,000/month (target).

* API / enterprise: quoted per use case.

# **16\. Success Metrics**

### **16.1 North-star**

Number of renewable energy decisions made with a Pricing AI plan per month.

### **16.2 Primary metrics**

* Weekly plans started and % completed.

* Median time-to-first-plan (target: \< 5 minutes).

* Plan share rate (target: \> 25% of completed plans shared or exported).

* Lead-to-quote conversion in installer marketplace (target: \> 60% of revealed leads get at least one installer response within 48h).

* Repeat returns (user comes back within 30 days to revise).

### **16.3 Quality metrics**

* % of plans where actual installed cost (reported by installer post-install) is within ±10% of Pricing AI estimate.

* NPS among users who export a plan.

* Installer NPS on lead quality.

### **16.4 Ecosystem metrics**

* States covered by ≥3 vetted installers.

* Number of financing products listed.

* Catalogue freshness (days since last price refresh).

# **17\. Roadmap**

### **Phase 0 — Foundations (Weeks 1–4)**

* Finalise PRD, design sprints, data-model schema.

* Stand up AWS accounts, Bedrock, Postgres, base CI/CD.

* Onboard 5–10 installers for closed beta.

* Seed component catalogue and tariff data for Lagos, Abuja, Port Harcourt, Kano, Ibadan.

### **Phase 1 — MVP (Weeks 5–12)**

* Solar PV (off-grid \+ hybrid) full flow.

* Pria conversational intake, load profile, sizing, BOQ, cashflow, basic Gantt, PDF \+ XLSX export.

* Bill upload OCR.

* Shareable plan links.

* Informational financing catalogue.

* Closed beta with 100 homeowners \+ 20 SMEs \+ 10 installers.

### **Phase 2 — Public launch (Weeks 13–20)**

* Installer marketplace with paid lead reveal.

* Financing referrals (live lead pass-through to two lender partners).

* Solar thermal module, small wind module.

* Roof imagery overlay for major cities where coverage exists.

* Public launch in Nigeria.

### **Phase 3 — Expansion (Months 6–12)**

* Biomass / biogas module.

* Installer pro branded-proposal mode.

* Ghana expansion pack.

* Developer API (private preview).

### **Phase 4 — Scale (Year 2\)**

* Micro-hydro module.

* Batch mode for mini-grid developers.

* Kenya, South Africa expansion packs.

* Data-licensing product.

# **18\. Risks & Mitigations**

| Risk | Why it matters | Mitigation |
| :---- | :---- | :---- |
| Inaccurate pricing becomes known publicly. | One viral “Pricing AI told me X but I paid Y” post could damage trust. | Catalogue freshness SLA, confidence bands on every report, post-install reconciliation loop with installers, prominent assumptions page. |
| Installer network not dense enough at launch. | Without good quote response, users churn. | Onboard 10+ installers in 3 states before public launch; keep a manual concierge path for first 90 days. |
| FX volatility drives large week-to-week price swings. | User receives a plan today, gets a quote in 3 weeks that is 20% higher. | Report shows FX rate used and valid-until date; re-price on demand; optional FX-locked quotes from partner installers. |
| LLM hallucination in technical explanations. | Pria could confidently state an incorrect technical fact. | Deterministic math outside LLM; strict tool-call discipline; source-citation requirement in prompts; human review of top FAQs. |
| Regulatory scrutiny (is this financial advice? insurance?). | Financing comparisons and referrals could attract regulator attention. | Clear positioning: informational only, not financial advice; legal review before lender partnerships; disclosures on every referral. |
| Installer backlash (we disrupt their sales funnel). | Installers might perceive us as competition. | Position as top-of-funnel partner, share economics transparently, offer branded pro mode that makes installers faster, not slower. |
| Data-privacy concerns around bill uploads. | Users worry about sharing addresses and bills. | Bill images scrubbed post-extraction; retention limit; opt-in for plan sharing; NDPC compliance review. |
| Feature sprawl — trying to cover every renewable from day one. | We build a shallow product that does nothing well. | MVP is solar PV only. Every additional module must pass a ‘tier 1 vendor neutrality \+ ready-to-act output’ bar. |

# **19\. Open Questions**

28. What is the minimum installer panel size for launch (state coverage vs. quality trade-off)?

29. Do we offer a freemium homeowner → paid deeper analysis tier, or keep consumer fully free and monetise only installer side?

30. Do we white-label the pro mode for specific installer brands, or strictly co-brand?

31. Do we integrate with PowerLabs or similar intelligence-layer platforms for installed-system monitoring handoff?

32. Regulatory: do financing referrals require a licence (PSSP or otherwise)? Legal opinion required, consistent with the CareBridge regulatory approach.

33. Data: should we publish any anonymised pricing telemetry publicly to build SEO \+ trust, or keep it private for commercial licensing later?

# **20\. Appendices**

## **20.1 Glossary**

* **BOQ —** Bill of Quantities; a priced line-by-line list of everything that goes into a project.

* **DisCo —** Nigerian electricity Distribution Company (e.g. Ikeja Electric, Eko Electric, Abuja Electricity).

* **kW vs. kWh —** kW is a rate of power (how much right now); kWh is energy (how much over time). A 5 kW system running for 2 hours produces 10 kWh.

* **LCOE —** Levelized Cost of Energy; the per-unit (₦/kWh or $/kWh) cost of energy over the lifetime of the system.

* **Load profile —** How much power is used, hour by hour, through the day.

* **NERC —** Nigerian Electricity Regulatory Commission.

* **NPV / IRR —** Net Present Value / Internal Rate of Return; standard ways to compare investments over time.

* **PAYG —** Pay-As-You-Go; a model where customers pay a small deposit plus monthly instalments instead of lump sum.

* **PV —** Photovoltaic; the panels that convert sunlight to electricity.

* **Return Control —** A Bedrock Agent pattern where the LLM decides which tool to call and the backend (not the LLM) actually executes the tool and returns a structured result.

## **20.2 Competitor quick-reference**

| Competitor | Closest to us on | Where we win |
| :---- | :---- | :---- |
| Aurora Solar | Depth of design \+ pricing | Vendor-neutral, consumer UX, African data, non-solar renewables, much lower price point. |
| OpenSolar | Breadth of installer tools, free core | Consumer-first framing, richer what-if simulation, deep Nigerian data and generator-replacement framing. |
| Project Sunroof | Consumer onboarding simplicity | Covers off-grid/hybrid, works in Nigeria, does full BOQ \+ Gantt \+ financing. |
| Solar-Estimate.org | AI-assisted consumer estimate | We cover multiple renewables, we are not biased toward US utilities, we produce full project plans. |
| Freyr Energy (India) | Local-market AI calculator | Vendor-neutral; African focus; generator-first comparison; installer marketplace. |
| Nigerian installer calculators (Stera, Sunplenti, etc.) | Nigerian context | Vendor-neutral; richer outputs; multi-renewable; AI-driven. |
| HOMER Pro, RETScreen | Technical hybrid modelling | Accessible to non-experts; fraction of the price; built-in financing \+ marketplace. |

## **20.3 Example first-message from Pria**

*“Hey\! I’m Pria. I help people figure out whether switching to renewable energy actually makes sense for them — in real naira, with a real plan. To give you something useful in the next couple of minutes, I need three quick things: who is this for (a home, a business, a community), roughly where you are, and which energy source you’re leaning toward. If you’re not sure, pick “not sure” — I’ll walk you through it.”*

## **20.4 Working draft — success criteria for MVP readiness**

* A non-technical homeowner can produce an accurate, priced solar plan for a 3-bedroom home in Lagos in under 10 minutes.

* The PDF \+ XLSX render cleanly and can be shared by link and printed.

* 5 installers actively respond to leads within 48 hours.

* Two lender partners confirm they will accept referrals.

* Confidence bands on total cost are within ±15% for at least 10 test installs (validated against actual post-install invoices).

**End of document. Version 0.1 (Draft for Review).** *Prepared April 22, 2026\.*