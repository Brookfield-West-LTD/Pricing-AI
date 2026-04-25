import React, { useState, useEffect, useRef } from "react";
import {
  ArrowRight, ArrowLeft, MapPin, Sun, Wind, Leaf, Zap, Home, Building2,
  Users, Plus, Minus, Check, Sparkles, Download, Share2, RefreshCw,
} from "lucide-react";

// =====================================================================
// PRICING AI — INTAKE FLOW
// Aesthetic translated from the editorial cream/coral reference video,
// combined with the modern reactive "generative UI" pattern used by
// products like v0, Linear AI, and Claude artifacts: every agent
// question renders as a beautiful card, and the plan assembles live
// on the right as the user answers.
// =====================================================================

// ---------- Design tokens (custom palette, since Tailwind core only) ----------
const T = {
  bg:         "#EFE7D7",  // warm cream background
  bgDeep:     "#E5DBC5",  // warm beige for tile illustrations
  bgDark:     "#191613",  // near-black for hero/dark sections
  surface:    "#FFFFFF",  // card surface
  ink:        "#1B1814",  // primary text
  inkSoft:    "#5C544A",  // muted text
  inkFaint:   "#9A9081",  // very muted text
  coral:      "#D8543E",  // primary accent
  coralDeep:  "#B83E2B",  // hover accent
  hairline:   "#D8CDB7",  // dividers
};

// ---------- Global font + animation styles ----------
const StyleTag = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

    .font-display { font-family: 'Instrument Serif', Georgia, serif; font-weight: 400; letter-spacing: -0.02em; }
    .font-display-i { font-family: 'Instrument Serif', Georgia, serif; font-style: italic; font-weight: 400; letter-spacing: -0.02em; }
    .font-body { font-family: 'DM Sans', system-ui, sans-serif; }
    .font-mono { font-family: 'JetBrains Mono', ui-monospace, monospace; letter-spacing: 0.06em; }

    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(14px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeIn {
      from { opacity: 0; } to { opacity: 1; }
    }
    @keyframes scaleIn {
      from { opacity: 0; transform: scale(0.94); }
      to   { opacity: 1; transform: scale(1); }
    }
    @keyframes ringExpand {
      0%   { transform: scale(0.2); opacity: 0; }
      60%  { opacity: 0.8; }
      100% { transform: scale(1); opacity: 0.5; }
    }
    @keyframes drawLine {
      from { transform: scaleX(0); }
      to   { transform: scaleX(1); }
    }
    @keyframes slashIn {
      0%   { transform: translateX(-30%) rotate(20deg); opacity: 0; }
      40%  { opacity: 0.5; }
      100% { transform: translateX(0%) rotate(20deg); opacity: 0.18; }
    }
    @keyframes counter {
      from { opacity: 0; transform: translateY(8px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    .anim-up    { animation: fadeUp 0.7s cubic-bezier(0.2, 0.7, 0.2, 1) both; }
    .anim-in    { animation: fadeIn 0.6s ease both; }
    .anim-pop   { animation: scaleIn 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) both; }
    .anim-slash { animation: slashIn 1.2s cubic-bezier(0.2, 0.7, 0.2, 1) both; }
    .anim-ring  { animation: ringExpand 1.4s cubic-bezier(0.2, 0.7, 0.2, 1) both; transform-origin: center; }
    .anim-line  { animation: drawLine 0.9s cubic-bezier(0.2, 0.7, 0.2, 1) both; transform-origin: left; }
    .anim-count { animation: counter 0.5s ease both; }

    .d-1  { animation-delay: 0.05s; }
    .d-2  { animation-delay: 0.15s; }
    .d-3  { animation-delay: 0.25s; }
    .d-4  { animation-delay: 0.35s; }
    .d-5  { animation-delay: 0.45s; }
    .d-6  { animation-delay: 0.55s; }
    .d-7  { animation-delay: 0.65s; }
    .d-8  { animation-delay: 0.75s; }
    .d-9  { animation-delay: 0.85s; }
    .d-10 { animation-delay: 0.95s; }

    .tile-hover { transition: transform 0.3s cubic-bezier(0.2,0.7,0.2,1), box-shadow 0.3s, border-color 0.3s; }
    .tile-hover:hover { transform: translateY(-3px); }
    .pill-hover { transition: all 0.25s cubic-bezier(0.2,0.7,0.2,1); }
    .pill-hover:hover { transform: translateY(-2px); }
    .underline-hover { background-image: linear-gradient(currentColor, currentColor); background-size: 100% 1px; background-repeat: no-repeat; background-position: 0 100%; transition: background-size 0.3s; }
    .underline-hover:hover { background-size: 0% 1px; }

    .scrollbar-clean::-webkit-scrollbar { width: 6px; }
    .scrollbar-clean::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.12); border-radius: 6px; }
  `}</style>
);

// ============================== CHROME ==============================

const TopBar = ({ step, total }) => (
  <div className="w-full px-6 lg:px-10 py-4 flex items-center justify-between font-mono text-[10px] uppercase"
       style={{ color: T.inkSoft }}>
    <div className="flex items-center gap-3">
      <span style={{ color: T.ink }}>PRICING AI</span>
      <span style={{ color: T.hairline }}>—</span>
      <span>RESEARCH PREVIEW · NIGERIA</span>
    </div>
    <div className="flex items-center gap-3">
      <div className="hidden md:flex items-center gap-2">
        <span>STEP {String(step).padStart(2, "0")}</span>
        <span style={{ color: T.hairline }}>/</span>
        <span>{String(total).padStart(2, "0")}</span>
      </div>
      <div className="w-32 h-px" style={{ background: T.hairline }}>
        <div className="h-full origin-left transition-transform duration-500"
             style={{ background: T.ink, transform: `scaleX(${step / total})` }} />
      </div>
    </div>
  </div>
);

// ============================== HERO ==============================

const HeroStep = ({ onNext }) => (
  <div className="relative w-full h-full flex items-center justify-center px-6 lg:px-16 overflow-hidden">
    {/* decorative diagonal slashes */}
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-0 left-1/4 w-px h-[140%] anim-slash"
           style={{ background: T.coral, animationDelay: "0.3s" }} />
      <div className="absolute top-0 left-[55%] w-px h-[140%] anim-slash"
           style={{ background: T.hairline, animationDelay: "0.5s" }} />
      <div className="absolute top-0 left-[78%] w-px h-[140%] anim-slash"
           style={{ background: T.hairline, animationDelay: "0.7s" }} />
    </div>

    <div className="relative max-w-5xl w-full">
      <div className="font-mono text-[10px] uppercase mb-8 anim-up d-1" style={{ color: T.inkSoft }}>
        — A NEW WAY TO BUDGET RENEWABLE ENERGY
      </div>

      <h1 className="font-display text-6xl md:text-8xl leading-[0.95] mb-8" style={{ color: T.ink }}>
        <span className="inline-block anim-up d-2">Design&nbsp;</span>
        <span className="inline-block font-display-i anim-up d-3" style={{ color: T.coral }}>your</span>
        <br />
        <span className="inline-block anim-up d-4">energy </span>
        <span className="inline-block font-display-i anim-up d-5">future</span>
        <span className="inline-block anim-up d-5" style={{ color: T.coral }}>.</span>
      </h1>

      <p className="font-body text-lg md:text-xl max-w-xl mb-12 anim-up d-6" style={{ color: T.inkSoft }}>
        From a question to a priced, scheduled, ready-to-execute plan — in minutes, not weeks.
      </p>

      <div className="flex flex-wrap items-center gap-6 anim-up d-7">
        <button onClick={onNext}
                className="group flex items-center gap-3 px-7 py-4 font-body font-medium text-base rounded-full transition-all"
                style={{ background: T.ink, color: T.bg }}
                onMouseEnter={(e) => e.currentTarget.style.background = T.coral}
                onMouseLeave={(e) => e.currentTarget.style.background = T.ink}>
          Begin your plan
          <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
        </button>
        <span className="font-mono text-[10px] uppercase" style={{ color: T.inkSoft }}>
          NO ACCOUNT NEEDED · ~5 MINUTES
        </span>
      </div>

      <div className="absolute bottom-0 right-0 font-mono text-[10px] uppercase text-right anim-up d-8"
           style={{ color: T.inkSoft }}>
        <div className="mb-1 flex items-center gap-1.5 justify-end">
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: T.coral }} />
          PRIA · YOUR ENERGY ANALYST
        </div>
        <div>SOLAR · WIND · HYBRID · BIOMASS</div>
      </div>
    </div>
  </div>
);

// ============================== STEP CARD WRAPPER ==============================

const StepShell = ({ stepNum, label, title, italicWord, leadingTitle, trailingTitle, subtitle, children }) => (
  <div className="w-full max-w-3xl mx-auto px-6 lg:px-12 py-10 lg:py-14">
    <div className="font-mono text-[10px] uppercase mb-4 anim-up d-1 flex items-center gap-3"
         style={{ color: T.inkSoft }}>
      <span style={{ color: T.coral }}>{String(stepNum).padStart(2, "0")}</span>
      <span style={{ color: T.hairline }}>/</span>
      <span>{label}</span>
    </div>

    <h2 className="font-display text-4xl md:text-6xl leading-[1.0] mb-3 anim-up d-2" style={{ color: T.ink }}>
      {leadingTitle}
      <span className="font-display-i" style={{ color: T.coral }}>{italicWord}</span>
      {trailingTitle}
    </h2>

    {subtitle && (
      <p className="font-body text-base md:text-lg mb-10 anim-up d-3" style={{ color: T.inkSoft }}>
        {subtitle}
      </p>
    )}

    <div className="anim-in d-3">{children}</div>
  </div>
);

// ============================== STEP 1: WHO ==============================

const WhoStep = ({ value, onChange }) => {
  const options = [
    { id: "home",      icon: Home,       label: "A home",       desc: "Apartment, house, or compound." },
    { id: "business",  icon: Building2,  label: "A business",   desc: "Shop, office, clinic, factory." },
    { id: "community", icon: Users,      label: "A community",  desc: "Estate, church, school, mini-grid." },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {options.map((opt, i) => {
        const selected = value === opt.id;
        const Icon = opt.icon;
        return (
          <button key={opt.id}
                  onClick={() => onChange(opt.id)}
                  className={`anim-up tile-hover text-left rounded-2xl overflow-hidden border-2 group d-${i + 4}`}
                  style={{
                    background: T.surface,
                    borderColor: selected ? T.coral : "transparent",
                    boxShadow: selected ? `0 12px 40px rgba(216,84,62,0.15)` : `0 1px 2px rgba(0,0,0,0.04)`,
                  }}>
            <div className="h-40 flex items-end px-5 py-5 relative"
                 style={{ background: selected ? T.coral : T.bgDeep }}>
              <Icon size={56} strokeWidth={1.2} style={{ color: selected ? T.surface : T.ink, opacity: 0.85 }} />
              <span className="font-mono text-[9px] uppercase absolute top-4 left-5"
                    style={{ color: selected ? T.surface : T.inkSoft, opacity: 0.8 }}>
                OPTION {i + 1}
              </span>
              {selected && (
                <span className="absolute top-4 right-4 anim-pop">
                  <Check size={18} style={{ color: T.surface }} />
                </span>
              )}
            </div>
            <div className="p-5 pt-4">
              <div className="font-display text-2xl mb-1" style={{ color: T.ink }}>{opt.label}</div>
              <div className="font-body text-sm" style={{ color: T.inkSoft }}>{opt.desc}</div>
            </div>
          </button>
        );
      })}
    </div>
  );
};

// ============================== STEP 2: LOCATION ==============================

const LocationStep = ({ value, onChange }) => {
  const cities = ["Lagos", "Abuja", "Port Harcourt", "Ibadan", "Kano", "Benin City", "Enugu", "Kaduna"];
  return (
    <div>
      <div className="rounded-2xl p-5 mb-5 flex items-center gap-3 anim-up d-4"
           style={{ background: T.surface, border: `1px solid ${T.hairline}` }}>
        <MapPin size={20} style={{ color: T.coral }} />
        <input type="text" value={value} onChange={(e) => onChange(e.target.value)}
               placeholder="Type a city, state, or full address…"
               className="flex-1 font-body text-base outline-none bg-transparent"
               style={{ color: T.ink }} />
        <span className="font-mono text-[10px] uppercase" style={{ color: T.inkFaint }}>
          GPS-OPTIONAL
        </span>
      </div>

      <div className="font-mono text-[10px] uppercase mb-3 anim-up d-5" style={{ color: T.inkSoft }}>
        OR PICK A POPULAR CITY
      </div>
      <div className="flex flex-wrap gap-2">
        {cities.map((c, i) => {
          const selected = value === c;
          return (
            <button key={c}
                    onClick={() => onChange(c)}
                    className={`pill-hover px-5 py-2.5 rounded-full font-body text-sm anim-up d-${(i % 7) + 5}`}
                    style={{
                      background: selected ? T.ink : T.surface,
                      color: selected ? T.bg : T.ink,
                      border: `1px solid ${selected ? T.ink : T.hairline}`,
                    }}>
              {c}
            </button>
          );
        })}
      </div>

      <div className="mt-8 rounded-2xl overflow-hidden anim-up d-7"
           style={{ background: T.bgDeep, border: `1px solid ${T.hairline}` }}>
        <div className="h-44 relative">
          {/* faux map */}
          <svg className="absolute inset-0 w-full h-full opacity-50">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke={T.hairline} strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            <circle cx="50%" cy="50%" r="40" fill={T.coral} fillOpacity="0.12" />
            <circle cx="50%" cy="50%" r="20" fill={T.coral} fillOpacity="0.18" />
            <circle cx="50%" cy="50%" r="6" fill={T.coral} />
          </svg>
          <div className="absolute bottom-3 left-4 font-mono text-[10px] uppercase"
               style={{ color: T.inkSoft }}>
            ESTIMATED IRRADIANCE · 5.4 kWh/m²/day
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================== STEP 3: CURRENT POWER ==============================

const CurrentPowerStep = ({ value, kva, onChange, onKvaChange }) => {
  const options = [
    { id: "generator", label: "Generator", desc: "Diesel or petrol generator is the workhorse.", note: "Most common" },
    { id: "grid",      label: "Grid only", desc: "DisCo supply only — no backup right now.",     note: null },
    { id: "mix",       label: "Grid + generator", desc: "Grid when it's there, generator when it's not.", note: null },
    { id: "none",      label: "Nothing yet", desc: "New build, off-grid site, or starting fresh.", note: null },
  ];
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {options.map((opt, i) => {
          const selected = value === opt.id;
          return (
            <button key={opt.id}
                    onClick={() => onChange(opt.id)}
                    className={`anim-up tile-hover text-left rounded-2xl p-5 border-2 d-${i + 4}`}
                    style={{
                      background: selected ? T.ink : T.surface,
                      borderColor: selected ? T.ink : "transparent",
                      color: selected ? T.bg : T.ink,
                    }}>
              <div className="flex items-center justify-between mb-2">
                <div className="font-display text-xl">{opt.label}</div>
                {opt.note && (
                  <span className="font-mono text-[9px] uppercase px-2 py-1 rounded-full"
                        style={{
                          background: selected ? "rgba(255,255,255,0.12)" : T.bgDeep,
                          color: selected ? T.bg : T.inkSoft
                        }}>
                    {opt.note}
                  </span>
                )}
              </div>
              <div className="font-body text-sm" style={{ color: selected ? "rgba(239,231,215,0.7)" : T.inkSoft }}>
                {opt.desc}
              </div>
            </button>
          );
        })}
      </div>

      {(value === "generator" || value === "mix") && (
        <div className="mt-6 anim-up rounded-2xl p-5"
             style={{ background: T.surface, border: `1px solid ${T.hairline}` }}>
          <div className="font-mono text-[10px] uppercase mb-3" style={{ color: T.inkSoft }}>
            GENERATOR DETAILS
          </div>
          <div className="flex items-center gap-4 flex-wrap">
            <span className="font-body text-base" style={{ color: T.ink }}>My generator is</span>
            <div className="flex items-center gap-2 rounded-full px-2 py-1"
                 style={{ border: `1px solid ${T.hairline}` }}>
              <button onClick={() => onKvaChange(Math.max(1, kva - 1))}
                      className="w-7 h-7 rounded-full flex items-center justify-center"
                      style={{ background: T.bgDeep }}>
                <Minus size={14} />
              </button>
              <span className="font-display text-2xl px-2 min-w-[3rem] text-center" style={{ color: T.coral }}>
                {kva}
              </span>
              <button onClick={() => onKvaChange(kva + 1)}
                      className="w-7 h-7 rounded-full flex items-center justify-center"
                      style={{ background: T.bgDeep }}>
                <Plus size={14} />
              </button>
            </div>
            <span className="font-body text-base" style={{ color: T.ink }}>kVA</span>
            <span className="font-mono text-[10px] uppercase ml-auto" style={{ color: T.inkSoft }}>
              ≈ ₦{(kva * 30 * 1.3 * 1100).toLocaleString()}/MO IN PETROL
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

// ============================== STEP 4: ENERGY DIRECTION (concentric rings) ==============================

const EnergyDirectionStep = ({ value, onChange }) => {
  const options = [
    { id: "solar",   label: "Solar",   icon: Sun },
    { id: "wind",    label: "Wind",    icon: Wind },
    { id: "hybrid",  label: "Hybrid",  icon: Zap },
    { id: "biomass", label: "Biomass", icon: Leaf },
    { id: "unsure",  label: "Help me choose", icon: Sparkles },
  ];
  return (
    <div className="relative h-[420px] flex items-center justify-center">
      {/* concentric rings */}
      {[180, 240, 300, 360].map((r, i) => (
        <div key={r}
             className="absolute rounded-full anim-ring"
             style={{
               width: r, height: r,
               border: `1px solid ${i === 1 ? T.coral : T.hairline}`,
               opacity: i === 1 ? 0.5 : 0.35,
               animationDelay: `${0.2 + i * 0.1}s`,
             }} />
      ))}

      {/* center label */}
      <div className="absolute text-center anim-up d-2 pointer-events-none">
        <div className="font-mono text-[10px] uppercase mb-1" style={{ color: T.coral }}>FRONTIER</div>
        <div className="font-display text-xl" style={{ color: T.ink }}>your direction</div>
      </div>

      {/* pills positioned around center */}
      {options.map((opt, i) => {
        const angle = (i / options.length) * Math.PI * 2 - Math.PI / 2;
        const radius = 175;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        const selected = value === opt.id;
        const Icon = opt.icon;
        return (
          <button key={opt.id}
                  onClick={() => onChange(opt.id)}
                  className={`absolute pill-hover anim-pop d-${i + 4} flex items-center gap-2 px-5 py-3 rounded-full font-body text-sm`}
                  style={{
                    transform: `translate(${x}px, ${y}px)`,
                    background: selected ? T.coral : T.surface,
                    color: selected ? T.surface : T.ink,
                    border: `1px solid ${selected ? T.coral : T.hairline}`,
                    boxShadow: selected ? `0 10px 30px rgba(216,84,62,0.25)` : `0 1px 2px rgba(0,0,0,0.04)`,
                  }}>
            <Icon size={16} />
            {opt.label}
          </button>
        );
      })}

      <div className="absolute bottom-0 left-0 right-0 text-center font-display-i text-base anim-up d-8"
           style={{ color: T.inkSoft }}>
        — pick one, or let Pria recommend —
      </div>
    </div>
  );
};

// ============================== STEP 5: LOAD PROFILE ==============================

const LOAD_LIBRARY = [
  { id: "lights",   name: "LED lights",       watts: 60,   defaultHours: 6 },
  { id: "fan",      name: "Standing fan",     watts: 75,   defaultHours: 8 },
  { id: "tv",       name: "TV + decoder",     watts: 120,  defaultHours: 5 },
  { id: "fridge",   name: "Refrigerator",     watts: 200,  defaultHours: 24 },
  { id: "freezer",  name: "Deep freezer",     watts: 350,  defaultHours: 24 },
  { id: "ac1",      name: "AC (1 hp)",        watts: 750,  defaultHours: 6 },
  { id: "ac15",     name: "AC (1.5 hp)",      watts: 1100, defaultHours: 6 },
  { id: "iron",     name: "Pressing iron",    watts: 1000, defaultHours: 0.5 },
  { id: "pump",     name: "Pumping machine",  watts: 750,  defaultHours: 1 },
  { id: "borehole", name: "Borehole pump",    watts: 1500, defaultHours: 2 },
  { id: "router",   name: "Wi-Fi router",     watts: 15,   defaultHours: 24 },
  { id: "laptop",   name: "Laptop",           watts: 65,   defaultHours: 8 },
];

const LoadStep = ({ items, onToggle, onHours }) => {
  const totalWh = items.reduce((sum, it) => sum + it.watts * it.hours, 0);
  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5">
        {LOAD_LIBRARY.map((appl, i) => {
          const selected = items.find((x) => x.id === appl.id);
          return (
            <button key={appl.id}
                    onClick={() => onToggle(appl)}
                    className={`tile-hover text-left rounded-xl p-3.5 border-2 anim-up d-${(i % 8) + 4}`}
                    style={{
                      background: selected ? T.ink : T.surface,
                      borderColor: selected ? T.ink : "transparent",
                      color: selected ? T.bg : T.ink,
                    }}>
              <div className="font-body text-sm font-medium mb-1">{appl.name}</div>
              <div className="font-mono text-[9px] uppercase"
                   style={{ color: selected ? "rgba(239,231,215,0.6)" : T.inkSoft }}>
                {appl.watts}W
              </div>
              {selected && (
                <div className="mt-2 flex items-center gap-1.5 anim-pop"
                     onClick={(e) => e.stopPropagation()}>
                  <button onClick={(e) => { e.stopPropagation(); onHours(appl.id, Math.max(0.5, selected.hours - 1)); }}
                          className="w-6 h-6 rounded-full flex items-center justify-center"
                          style={{ background: "rgba(255,255,255,0.12)" }}>
                    <Minus size={11} style={{ color: T.bg }} />
                  </button>
                  <span className="font-display text-base px-1.5 min-w-[3rem] text-center"
                        style={{ color: T.coral }}>
                    {selected.hours}h
                  </span>
                  <button onClick={(e) => { e.stopPropagation(); onHours(appl.id, selected.hours + 1); }}
                          className="w-6 h-6 rounded-full flex items-center justify-center"
                          style={{ background: "rgba(255,255,255,0.12)" }}>
                    <Plus size={11} style={{ color: T.bg }} />
                  </button>
                </div>
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-6 flex items-center justify-between rounded-2xl p-4 anim-up d-7"
           style={{ background: T.bgDeep }}>
        <div>
          <div className="font-mono text-[10px] uppercase mb-1" style={{ color: T.inkSoft }}>
            DAILY ENERGY USE
          </div>
          <div className="font-display text-3xl" style={{ color: T.ink }}>
            <span className="anim-count" key={totalWh}>{(totalWh / 1000).toFixed(1)}</span>
            <span className="font-mono text-sm ml-2" style={{ color: T.inkSoft }}>kWh / day</span>
          </div>
        </div>
        <div className="text-right">
          <div className="font-mono text-[10px] uppercase mb-1" style={{ color: T.inkSoft }}>
            APPLIANCES
          </div>
          <div className="font-display text-3xl" style={{ color: T.coral }}>{items.length}</div>
        </div>
      </div>
    </div>
  );
};

// ============================== LIVE PLAN PANEL ==============================

const useCounter = (target, duration = 700) => {
  const [v, setV] = useState(target);
  const prev = useRef(target);
  useEffect(() => {
    const start = prev.current; const end = target;
    const t0 = performance.now();
    let raf;
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setV(Math.round(start + (end - start) * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
      else prev.current = end;
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return v;
};

const LivePlan = ({ formData, currentStep }) => {
  // Compute a draft plan as state evolves
  const dailyKwh = formData.appliances.reduce((s, a) => s + a.watts * a.hours, 0) / 1000;
  const systemKw = Math.max(1, Math.ceil(dailyKwh / 4.5)); // rule of thumb
  const batteryKwh = Math.ceil(dailyKwh * 1.2);
  // very rough Nigerian price model
  const panelCost = systemKw * 1000 * 280;        // ₦/Wp
  const batteryCost = batteryKwh * 1000 * 320;
  const inverterCost = systemKw * 95000;
  const installCost = Math.round((panelCost + batteryCost + inverterCost) * 0.18);
  const totalCost = panelCost + batteryCost + inverterCost + installCost;

  const monthlyGenSpend = formData.currentSource === "generator" || formData.currentSource === "mix"
    ? Math.round(formData.generatorKVA * 30 * 1.3 * 1100) : 0;
  const paybackMonths = monthlyGenSpend > 0 ? Math.ceil(totalCost / monthlyGenSpend) : null;

  const animatedTotal = useCounter(totalCost);
  const animatedKwh = useCounter(Math.round(dailyKwh * 10));
  const animatedKw = useCounter(systemKw);

  const ready = currentStep >= 1 && (formData.who || formData.location);

  return (
    <div className="h-full flex flex-col p-6 lg:p-8 overflow-y-auto scrollbar-clean"
         style={{ background: T.bgDark, color: T.bg }}>
      <div className="font-mono text-[10px] uppercase mb-3 flex items-center justify-between"
           style={{ color: "#8E867A" }}>
        <span>YOUR PLAN · LIVE DRAFT</span>
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: T.coral }} />
          UPDATING
        </span>
      </div>

      <div className="font-display text-4xl mb-1">
        {ready ? `₦${animatedTotal.toLocaleString()}` : "—"}
      </div>
      <div className="font-mono text-[10px] uppercase mb-6" style={{ color: "#8E867A" }}>
        ESTIMATED TOTAL · INCL. VAT, INSTALL, CONTINGENCY
      </div>

      {/* Bars */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="rounded-xl p-3" style={{ background: "rgba(255,255,255,0.05)" }}>
          <div className="font-mono text-[9px] uppercase mb-1" style={{ color: "#8E867A" }}>SYSTEM</div>
          <div className="font-display text-2xl">{ready ? `${animatedKw} kW` : "—"}</div>
        </div>
        <div className="rounded-xl p-3" style={{ background: "rgba(255,255,255,0.05)" }}>
          <div className="font-mono text-[9px] uppercase mb-1" style={{ color: "#8E867A" }}>USE</div>
          <div className="font-display text-2xl">{ready ? `${(animatedKwh / 10).toFixed(1)}` : "—"}<span className="font-mono text-xs ml-1" style={{ color: "#8E867A" }}>kWh/d</span></div>
        </div>
        <div className="rounded-xl p-3" style={{ background: "rgba(255,255,255,0.05)" }}>
          <div className="font-mono text-[9px] uppercase mb-1" style={{ color: "#8E867A" }}>PAYBACK</div>
          <div className="font-display text-2xl">{paybackMonths ? `${Math.floor(paybackMonths / 12)}.${paybackMonths % 12}y` : "—"}</div>
        </div>
      </div>

      {/* Decisions captured */}
      <div className="mb-6">
        <div className="font-mono text-[10px] uppercase mb-3" style={{ color: "#8E867A" }}>
          WHAT PRIA HAS LEARNED
        </div>
        <div className="space-y-2">
          {[
            { k: "For", v: formData.who && ({ home: "A home", business: "A business", community: "A community" }[formData.who]) },
            { k: "Location", v: formData.location || null },
            { k: "Today", v: formData.currentSource && ({
                generator: `${formData.generatorKVA} kVA generator`,
                grid: "Grid only",
                mix: `Grid + ${formData.generatorKVA} kVA generator`,
                none: "Nothing yet",
              }[formData.currentSource]) },
            { k: "Direction", v: formData.energyDirection && ({
                solar: "Solar PV", wind: "Small wind", hybrid: "Hybrid", biomass: "Biomass", unsure: "Awaiting Pria",
              }[formData.energyDirection]) },
            { k: "Loads", v: formData.appliances.length > 0 ? `${formData.appliances.length} appliances` : null },
          ].map((row, i) => (
            <div key={row.k} className="flex items-center justify-between font-body text-sm anim-up"
                 style={{ animationDelay: `${0.05 * i}s`, color: row.v ? T.bg : "#5C544A" }}>
              <span style={{ color: "#8E867A" }} className="font-mono text-[10px] uppercase">{row.k}</span>
              <span className="text-right">{row.v || "—"}</span>
            </div>
          ))}
        </div>
      </div>

      {/* BOQ assembling */}
      {ready && formData.appliances.length > 0 && (
        <div className="mb-6">
          <div className="font-mono text-[10px] uppercase mb-3" style={{ color: "#8E867A" }}>
            BOQ · ASSEMBLING
          </div>
          <div className="space-y-1.5">
            {[
              { k: `${systemKw}× 1 kW solar panels`,    v: panelCost,    delay: 0 },
              { k: `${systemKw} kW hybrid inverter`,    v: inverterCost, delay: 0.08 },
              { k: `${batteryKwh} kWh lithium battery`, v: batteryCost,  delay: 0.16 },
              { k: `Installation, BOS, VAT (18%)`,      v: installCost,  delay: 0.24 },
            ].map((row, i) => (
              <div key={row.k} className="flex items-center justify-between font-body text-sm anim-up"
                   style={{ animationDelay: `${row.delay}s` }}>
                <span style={{ color: "#C8BFAB" }}>{row.k}</span>
                <span style={{ color: T.bg }}>₦{row.v.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Generator comparison */}
      {monthlyGenSpend > 0 && (
        <div className="mt-auto rounded-xl p-4 anim-up" style={{ background: T.coral, color: T.surface }}>
          <div className="font-mono text-[10px] uppercase mb-2" style={{ color: "rgba(255,255,255,0.75)" }}>
            VS. YOUR GENERATOR
          </div>
          <div className="font-body text-sm leading-relaxed">
            You currently spend about <strong>₦{monthlyGenSpend.toLocaleString()}/month</strong> on petrol.
            This plan pays itself back in roughly <strong>{paybackMonths} months</strong>, then runs near-free for 15+ years.
          </div>
        </div>
      )}

      {!ready && (
        <div className="mt-auto font-display-i text-base" style={{ color: "#8E867A" }}>
          Your plan will appear here as you answer Pria&rsquo;s questions.
        </div>
      )}
    </div>
  );
};

// ============================== REVEAL / FINAL ==============================

const RevealStep = ({ formData, onRestart }) => {
  const dailyKwh = formData.appliances.reduce((s, a) => s + a.watts * a.hours, 0) / 1000;
  const systemKw = Math.max(1, Math.ceil(dailyKwh / 4.5));
  const batteryKwh = Math.ceil(dailyKwh * 1.2);
  const totalCost = systemKw * 1000 * 280 + batteryKwh * 1000 * 320 + systemKw * 95000;
  const totalWithExtras = Math.round(totalCost * 1.18);
  const monthlyGenSpend = (formData.currentSource === "generator" || formData.currentSource === "mix")
    ? Math.round(formData.generatorKVA * 30 * 1.3 * 1100) : 0;
  const paybackMonths = monthlyGenSpend > 0 ? Math.ceil(totalWithExtras / monthlyGenSpend) : null;

  return (
    <div className="w-full max-w-3xl mx-auto px-6 lg:px-12 py-10 lg:py-14">
      <div className="font-mono text-[10px] uppercase mb-4 anim-up d-1" style={{ color: T.coral }}>
        — YOUR PLAN IS READY
      </div>
      <h2 className="font-display text-5xl md:text-7xl leading-[1.0] mb-6 anim-up d-2" style={{ color: T.ink }}>
        Here&rsquo;s your <span className="font-display-i" style={{ color: T.coral }}>renewable</span> path.
      </h2>
      <p className="font-body text-lg mb-10 anim-up d-3" style={{ color: T.inkSoft }}>
        Everything below was built from your answers. Nothing here is set in stone — you can re-open any step, ask Pria a question, or export the full document for your bank or board.
      </p>

      {/* Big number tile */}
      <div className="rounded-3xl p-8 mb-4 anim-up d-4 relative overflow-hidden"
           style={{ background: T.ink, color: T.bg }}>
        <div className="font-mono text-[10px] uppercase mb-2" style={{ color: "#8E867A" }}>
          TOTAL ESTIMATED COST
        </div>
        <div className="font-display text-6xl md:text-7xl mb-1">₦{totalWithExtras.toLocaleString()}</div>
        <div className="font-mono text-[10px] uppercase" style={{ color: "#8E867A" }}>
          ±15% CONFIDENCE · INCL. VAT, INSTALL, CONTINGENCY
        </div>
        {paybackMonths && (
          <div className="mt-6 flex items-center gap-6 flex-wrap">
            <div>
              <div className="font-mono text-[9px] uppercase" style={{ color: "#8E867A" }}>PAYBACK</div>
              <div className="font-display text-3xl">{Math.floor(paybackMonths / 12)} yrs {paybackMonths % 12} mo</div>
            </div>
            <div>
              <div className="font-mono text-[9px] uppercase" style={{ color: "#8E867A" }}>20-YR SAVINGS</div>
              <div className="font-display text-3xl">₦{((monthlyGenSpend * 12 * 20) - totalWithExtras).toLocaleString()}</div>
            </div>
            <div>
              <div className="font-mono text-[9px] uppercase" style={{ color: "#8E867A" }}>CO₂ AVOIDED</div>
              <div className="font-display text-3xl">{Math.round(systemKw * 1.4 * 20)} t</div>
            </div>
          </div>
        )}
      </div>

      {/* Output cards row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
        {[
          { label: "PDF report", desc: "12-page plan you can share or print.", num: "01" },
          { label: "Excel BOQ", desc: "Full bill of quantities + 20-yr cashflow.", num: "02" },
          { label: "Gantt schedule", desc: "Procurement to commissioning.", num: "03" },
        ].map((c, i) => (
          <div key={c.label}
               className={`rounded-2xl overflow-hidden anim-up d-${i + 5}`}
               style={{ background: T.surface }}>
            <div className="h-28 flex items-end p-4" style={{ background: T.bgDeep }}>
              <span className="font-mono text-[9px] uppercase" style={{ color: T.inkSoft }}>{c.num} / 03</span>
            </div>
            <div className="p-4">
              <div className="font-display text-xl mb-1" style={{ color: T.ink }}>{c.label}</div>
              <div className="font-body text-sm mb-3" style={{ color: T.inkSoft }}>{c.desc}</div>
              <button className="font-body text-sm font-medium underline-hover flex items-center gap-1.5"
                      style={{ color: T.coral }}>
                Download <Download size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-4 anim-up d-8">
        <button className="flex items-center gap-2 px-6 py-3 rounded-full font-body font-medium"
                style={{ background: T.coral, color: T.surface }}>
          Get quotes from 3 vetted installers <ArrowRight size={16} />
        </button>
        <button className="flex items-center gap-2 px-6 py-3 rounded-full font-body"
                style={{ background: T.surface, color: T.ink, border: `1px solid ${T.hairline}` }}>
          <Share2 size={16} /> Share plan
        </button>
        <button onClick={onRestart}
                className="flex items-center gap-2 px-4 py-3 font-body text-sm"
                style={{ color: T.inkSoft }}>
          <RefreshCw size={14} /> Start over
        </button>
      </div>
    </div>
  );
};

// ============================== ROOT ==============================

const STEPS = [
  { id: "hero",      label: "WELCOME" },
  { id: "who",       label: "WHO" },
  { id: "location",  label: "LOCATION" },
  { id: "current",   label: "TODAY" },
  { id: "direction", label: "DIRECTION" },
  { id: "loads",     label: "LOADS" },
  { id: "reveal",    label: "PLAN" },
];

export default function PricingAIFlow() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({
    who: null,
    location: "",
    currentSource: null,
    generatorKVA: 5,
    energyDirection: null,
    appliances: [],
  });

  const update = (patch) => setData((d) => ({ ...d, ...patch }));

  const toggleAppliance = (appl) => {
    setData((d) => {
      const exists = d.appliances.find((x) => x.id === appl.id);
      return {
        ...d,
        appliances: exists
          ? d.appliances.filter((x) => x.id !== appl.id)
          : [...d.appliances, { id: appl.id, name: appl.name, watts: appl.watts, hours: appl.defaultHours }],
      };
    });
  };
  const setApplianceHours = (id, hours) => {
    setData((d) => ({ ...d, appliances: d.appliances.map((a) => a.id === id ? { ...a, hours } : a) }));
  };

  const canContinue = (() => {
    switch (STEPS[step].id) {
      case "hero":      return true;
      case "who":       return !!data.who;
      case "location":  return data.location.trim().length > 1;
      case "current":   return !!data.currentSource;
      case "direction": return !!data.energyDirection;
      case "loads":     return data.appliances.length >= 1;
      default:          return true;
    }
  })();

  const next = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));
  const restart = () => {
    setStep(0);
    setData({ who: null, location: "", currentSource: null, generatorKVA: 5, energyDirection: null, appliances: [] });
  };

  const renderStep = () => {
    const id = STEPS[step].id;
    if (id === "hero")      return <HeroStep onNext={next} />;
    if (id === "reveal")    return <RevealStep formData={data} onRestart={restart} />;

    const wrappers = {
      who: {
        label: "WHO ARE WE PLANNING FOR",
        leadingTitle: "Who ", italicWord: "needs", trailingTitle: " the power?",
        subtitle: "This shapes everything from sizing to financing.",
        body: <WhoStep value={data.who} onChange={(v) => update({ who: v })} />,
      },
      location: {
        label: "WHERE EXACTLY",
        leadingTitle: "Where ", italicWord: "exactly", trailingTitle: " are you?",
        subtitle: "We use this for solar irradiance, grid availability, and local installer matching.",
        body: <LocationStep value={data.location} onChange={(v) => update({ location: v })} />,
      },
      current: {
        label: "WHAT YOU HAVE TODAY",
        leadingTitle: "What runs your ", italicWord: "power", trailingTitle: " today?",
        subtitle: "Your baseline is what we&rsquo;re going to compare every plan against.",
        body: <CurrentPowerStep value={data.currentSource} kva={data.generatorKVA}
                                onChange={(v) => update({ currentSource: v })}
                                onKvaChange={(v) => update({ generatorKVA: v })} />,
      },
      direction: {
        label: "ENERGY DIRECTION",
        leadingTitle: "Which ", italicWord: "direction", trailingTitle: " are you exploring?",
        subtitle: "Pick one — or let Pria pick the best fit for your site and load.",
        body: <EnergyDirectionStep value={data.energyDirection} onChange={(v) => update({ energyDirection: v })} />,
      },
      loads: {
        label: "WHAT MUST STAY ON",
        leadingTitle: "What needs to ", italicWord: "stay on", trailingTitle: "?",
        subtitle: "Tap the appliances. We&rsquo;ll size around them — adjust hours per day after selecting.",
        body: <LoadStep items={data.appliances} onToggle={toggleAppliance} onHours={setApplianceHours} />,
      },
    };
    const w = wrappers[id];
    return (
      <StepShell stepNum={step} label={w.label} leadingTitle={w.leadingTitle}
                 italicWord={w.italicWord} trailingTitle={w.trailingTitle} subtitle={w.subtitle}>
        {w.body}
      </StepShell>
    );
  };

  const isHero = STEPS[step].id === "hero";
  const isReveal = STEPS[step].id === "reveal";

  return (
    <div className="w-full min-h-screen font-body" style={{ background: T.bg, color: T.ink }}>
      <StyleTag />
      <TopBar step={step + 1} total={STEPS.length} />

      {/* Layout: hero is full-bleed; reveal is full-bleed; mid steps split with live plan */}
      {isHero || isReveal ? (
        <div className="min-h-[calc(100vh-90px)] flex items-center" key={step}>
          {renderStep()}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] min-h-[calc(100vh-90px)]">
          <div className="flex items-start lg:items-center" key={step}>
            {renderStep()}
          </div>
          <div className="lg:sticky lg:top-0 lg:h-screen border-t lg:border-t-0 lg:border-l"
               style={{ borderColor: T.hairline }}>
            <LivePlan formData={data} currentStep={step} />
          </div>
        </div>
      )}

      {/* Sticky bottom nav (hidden on hero & reveal) */}
      {!isHero && !isReveal && (
        <div className="sticky bottom-0 left-0 right-0 backdrop-blur-md"
             style={{ background: "rgba(239,231,215,0.92)", borderTop: `1px solid ${T.hairline}` }}>
          <div className="lg:pr-[400px] flex items-center justify-between px-6 lg:px-12 py-4">
            <button onClick={back}
                    className="flex items-center gap-2 font-body text-sm pill-hover"
                    style={{ color: T.inkSoft }}>
              <ArrowLeft size={16} /> Back
            </button>
            <div className="flex items-center gap-3">
              <span className="font-mono text-[10px] uppercase hidden md:inline" style={{ color: T.inkSoft }}>
                {canContinue ? "READY WHEN YOU ARE" : "PICK AT LEAST ONE TO CONTINUE"}
              </span>
              <button onClick={next} disabled={!canContinue}
                      className="group flex items-center gap-2 px-6 py-3 rounded-full font-body font-medium text-sm transition-all"
                      style={{
                        background: canContinue ? T.ink : T.hairline,
                        color: canContinue ? T.bg : T.inkFaint,
                        cursor: canContinue ? "pointer" : "not-allowed",
                      }}>
                Continue
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
