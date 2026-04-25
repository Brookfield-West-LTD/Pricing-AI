// Volt Horizon — Phase 2 · Adaptive priority on reveal
// Exports: P2_RevealCostFirst, P2_RevealReliabilityFirst, P2_RevealSustainFirst, P2_PriorityPicker, P2_AllThreeVariants

(() => {
  const { useState } = React;
  const { Pria_Orb } = window;

  // ──────── shared data (same underlying plan) ────────
  const _PD = { capex:9_280_000, savings20:32_540_000, paybackY:3.1, autonomyH:22.4, co2T:84, dieselL:18_600, kw:6, bat:14 };
  const PLAN = new Proxy(_PD, { get(t,k){ const l=window.VH_PLAN_LIVE; return l&&k in l?l[k]:t[k]; } });

  // ──────── icons ────────
  const I = (d, size = 14, sw = 1.6) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">{d}</svg>
  );
  const IconSwap   = (p = {}) => I(<><path d="M7 10l-4 4 4 4"/><path d="M21 14H3"/><path d="M17 4l4 4-4 4"/><path d="M3 8h18"/></>, p.size || 12, 1.7);
  const IconSparkle= (p = {}) => I(<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/>, p.size || 13);
  const IconCheck  = (p = {}) => I(<path d="M5 13l4 4L19 7"/>, p.size || 13);

  // ──────── priority picker pill ────────
  const PriorityPicker = ({ value, onChange, compact = false }) => (
    <div className="rv2-priority-picker" style={ compact ? {} : { marginLeft: 0 }}>
      {[
        { k: 'cost',        label: 'Cost'           },
        { k: 'reliability', label: 'Reliability'    },
        { k: 'sustain',     label: 'Sustainability' },
      ].map(o => (
        <button key={o.k}
                data-kind={o.k}
                aria-pressed={value === o.k}
                onClick={() => onChange?.(o.k)}>
          {value === o.k && <IconCheck size={11}/>}
          {o.label}
        </button>
      ))}
    </div>
  );

  // ──────── shared "change what matters most" pill + expanded form ────────
  const PriorityPill = ({ current, onChange, expanded, onToggle }) => {
    const labels = { cost: 'cost', reliability: 'reliability', sustain: 'sustainability' };
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
        {!expanded ? (
          <button className="rv2-priority-pill" onClick={onToggle}>
            <span className="rv2-pill-dot"/>
            <span>Ranked by <b>{labels[current]}</b> · <span style={{ textDecoration: 'underline', textUnderlineOffset: 3, textDecorationColor: 'var(--vh-line-hot)' }}>change what matters most</span></span>
            <IconSwap/>
          </button>
        ) : (
          <>
            <span style={{
              fontFamily: 'var(--vh-font-mono)', fontSize: 10, letterSpacing: '.2em',
              textTransform: 'uppercase', color: 'var(--vh-text-300)',
            }}>RANK BY</span>
            <PriorityPicker value={current} onChange={(v) => { onChange(v); }}/>
            <button className="rv2-priority-pill" onClick={onToggle}
                    style={{ padding: '6px 10px', fontSize: 11 }}>
              <span style={{ color: 'var(--vh-text-300)' }}>done</span>
            </button>
          </>
        )}
      </div>
    );
  };

  // ──────── Day/Night ring for reliability hero ────────
  // 24 wedges, 15° each. Day = 6am–6pm (hours 6..17). Gap states represent grid/solar coverage.
  const DayNightRing = () => {
    const covered = [22.4];     // hours/day
    const coverageByHour = Array.from({ length: 24 }, (_, h) => {
      // solar zone 7–17 fully covered, battery covers 18–5 for 22.4/24. gap at ~4–5am.
      if (h >= 7 && h <= 17) return 'covered';           // solar
      if (h >= 18 || h <= 3)  return 'covered';          // battery
      if (h === 4)            return 'edge';             // edge case
      return 'gap';                                      // 5–6 gap (0.6 hrs)
    });
    const cx = 120, cy = 120, rOuter = 108, rInner = 74;

    const wedgePath = (h) => {
      const a0 = ((h - 6) / 24) * Math.PI * 2 - Math.PI / 2; // start at 6 o'clock orientation
      const a1 = ((h - 5) / 24) * Math.PI * 2 - Math.PI / 2;
      const x0o = cx + rOuter * Math.cos(a0), y0o = cy + rOuter * Math.sin(a0);
      const x1o = cx + rOuter * Math.cos(a1), y1o = cy + rOuter * Math.sin(a1);
      const x1i = cx + rInner * Math.cos(a1), y1i = cy + rInner * Math.sin(a1);
      const x0i = cx + rInner * Math.cos(a0), y0i = cy + rInner * Math.sin(a0);
      return `M ${x0o} ${y0o} A ${rOuter} ${rOuter} 0 0 1 ${x1o} ${y1o} L ${x1i} ${y1i} A ${rInner} ${rInner} 0 0 0 ${x0i} ${y0i} Z`;
    };

    return (
      <div className="rv2-ring" style={{ position:'relative' }}>
        {window.VH_DayNightRingShader && <window.VH_DayNightRingShader size={240}/>}
        <svg viewBox="0 0 240 240">
          {coverageByHour.map((state, h) => (
            <path key={h} d={wedgePath(h)} className="rv2-ring-wedge" data-state={state}/>
          ))}
          {/* hour marks */}
          <text x={120} y={14}  className="rv2-ring-mark" textAnchor="middle">12AM</text>
          <text x={232} y={124} className="rv2-ring-mark" textAnchor="end">6AM</text>
          <text x={120} y={234} className="rv2-ring-mark" textAnchor="middle">12PM</text>
          <text x={10}  y={124} className="rv2-ring-mark">6PM</text>
        </svg>
        <div className="rv2-ring-core">
          <span className="n">22.4<span style={{ fontSize: 18, color: 'var(--vh-text-200)', marginLeft: 3 }}>h</span></span>
          <span className="l">COVERED / 24h</span>
        </div>
      </div>
    );
  };

  // ──────── metrics definitions for each priority ────────
  // Each variant shows the hero + two support cards (order matters — hero is the #1 card)
  // Cost-first: savings → payback → co2
  // Reliability-first: autonomy → payback → cost (cost third)
  // Sustain-first: co2 → cost → payback  (cost second)
  const METRIC = new Proxy({}, {
    get(_, k) {
      const P = window.VH_PLAN_LIVE || _PD;
      return ({
        savings:  { kind:'TOTAL SAVINGS · 20 YEARS',  value:`₦${P.savings20.toLocaleString()}`,  sub:'vs. staying on grid + generator' },
        payback:  { kind:'PAYBACK PERIOD',             value:`${P.paybackY}y`,                    sub:'against your current diesel cost' },
        co2:      { kind:'CO₂ AVOIDED · 20 YEARS',    value:`${P.co2T}t`,                        sub:`${P.dieselL.toLocaleString()} L diesel not burned` },
        autonomy: { kind:'HOURS OF AUTONOMY / DAY',   value:`${P.autonomyH}h`,                   sub:'your power stays on without the grid' },
        cost:     { kind:'TOTAL SYSTEM COST',         value:`₦${P.capex.toLocaleString()}`,      sub:'incl. VAT, install, 10yr warranty' },
      })[k];
    }
  });

  // ──────── individual hero blocks ────────
  const CostHero = () => (
    <div className="rv2-hero" data-style="cost">
      <div className="rv2-hero-kind">
        <span style={{ width: 6, height: 6, borderRadius: 2, background: 'var(--vh-voltage)',
                       boxShadow: '0 0 6px var(--vh-voltage)' }}/>
        TOTAL SAVED · 20 YEARS
      </div>
      <div className="rv2-hero-number">₦{PLAN.savings20.toLocaleString()}</div>
      <div className="rv2-hero-sub">VS. STAYING ON GRID + GENERATOR · PAYS BACK IN {PLAN.paybackY}Y</div>
    </div>
  );

  const ReliabilityHero = () => (
    <div className="rv2-hero" data-style="reliability">
      <div>
        <div className="rv2-hero-kind">
          <span style={{ width: 6, height: 6, borderRadius: 2, background: 'var(--vh-horizon)',
                         boxShadow: '0 0 6px var(--vh-horizon)' }}/>
          POWER STAYS ON FOR
        </div>
        <div className="rv2-hero-number">
          {PLAN.autonomyH}<sup>h / 24</sup>
        </div>
        <div className="rv2-hero-sub">SOLAR + {PLAN.bat}KWH BATTERY · 0.6H GAP NEAR DAWN</div>
      </div>
      <DayNightRing/>
    </div>
  );

  const SustainHero = () => (
    <div className="rv2-hero" data-style="sustain">
      <div className="rv2-hero-kind">
        <span style={{ width: 6, height: 6, borderRadius: 2, background: 'var(--vh-bio)',
                       boxShadow: '0 0 6px var(--vh-bio)' }}/>
        CO₂ AVOIDED · 20 YEARS
      </div>
      <div className="rv2-hero-number">{PLAN.co2T}<span style={{ fontSize: '0.42em', marginLeft: 6, color: 'var(--vh-bio-deep)', fontWeight: 400 }}>tonnes</span></div>
      <div className="rv2-hero-sub">{PLAN.dieselL.toLocaleString()} L DIESEL NOT BURNED · 220 TREES EQUIVALENT</div>
    </div>
  );

  // ──────── the rows of supporting metrics (2 cards each, displayed below hero) ────────
  const SupportRow = ({ pair }) => (
    <div className="rv2-metric-row">
      {pair.map((k, i) => (
        <div key={k} className="rv2-metric">
          <div className="rv2-metric-kind">
            <span className="pos">#{i + 2}</span>
            {METRIC[k].kind}
          </div>
          <div className="rv2-metric-value">{METRIC[k].value}</div>
          <div className="rv2-metric-sub">{METRIC[k].sub}</div>
        </div>
      ))}
    </div>
  );

  // ──────── generic reveal block, parameterized by priority ────────
  const RevealVariant = ({ priority, onPriorityChange, expandedInit = false, scope = 'standalone' }) => {
    const [expanded, setExpanded] = useState(expandedInit);

    const config = {
      cost: {
        eyebrow: 'YOUR PLAN · RANKED BY COST',
        title: (<>Over 20 years you'll <em>save</em>.</>),
        lede: 'The math on this plan clears the diesel you\'re burning in just over three years — and keeps compounding for seventeen more.',
        Hero: CostHero,
        pair: ['payback', 'co2'],
      },
      reliability: {
        eyebrow: 'YOUR PLAN · RANKED BY RELIABILITY',
        title: (<>Your power stays <em>on</em>.</>),
        lede: 'Solar carries the day, lithium carries the night. There\'s a 36-minute gap near dawn on the heaviest days — everything else is covered.',
        Hero: ReliabilityHero,
        pair: ['payback', 'cost'],
      },
      sustain: {
        eyebrow: 'YOUR PLAN · RANKED BY IMPACT',
        title: (<>Over 20 years you'll <em>avoid</em>.</>),
        lede: 'Eighty-four tonnes of CO₂ that otherwise rolls out of your generator exhaust. About the weight of a blue whale.',
        Hero: SustainHero,
        pair: ['cost', 'payback'],
      },
    }[priority];

    return (
      <div className="rv2" data-priority={priority}>
        <div className="rv2-eyebrow">
          <Pria_Orb size={12}/>
          {config.eyebrow}
        </div>
        <h1 className="rv2-title">{config.title}</h1>
        <p className="rv2-lede">{config.lede}</p>

        <config.Hero/>
        <SupportRow pair={config.pair}/>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, alignItems: 'center', marginTop: 8 }}>
          <PriorityPill
            current={priority}
            onChange={(v) => { onPriorityChange?.(v); setExpanded(false); }}
            expanded={expanded}
            onToggle={() => setExpanded(e => !e)}
          />
          <span style={{
            marginLeft: 'auto',
            fontFamily: 'var(--vh-font-mono)', fontSize: 10, letterSpacing: '.2em',
            textTransform: 'uppercase', color: 'var(--vh-text-300)',
          }}>
            SAME PLAN · SAME NUMBERS · DIFFERENT ORDER
          </span>
        </div>
      </div>
    );
  };

  // ──────── standalone variant wrappers (for the static showcase frames) ────────
  const RevealCostFirst       = () => <RevealVariant priority="cost"        />;
  const RevealReliabilityFirst= () => <RevealVariant priority="reliability" />;
  const RevealSustainFirst    = () => <RevealVariant priority="sustain"     />;

  // ──────── live picker version (the interactive one) ────────
  const RevealInteractive = ({ start = 'cost' }) => {
    const [priority, setPriority] = useState(start);
    return (
      <RevealVariant
        priority={priority}
        onPriorityChange={setPriority}
        expandedInit={false}
      />
    );
  };

  // ──────── the "priority chooser" micro-step (before reveal) ────────
  const PriorityMicrostep = () => {
    const [picked, setPicked] = useState(null);
    const options = [
      { k: 'cost',        eyebrow: 'BANG FOR NAIRA',     title: 'Cost',           body: 'Payback, savings, lowest total cost over 20 years.', accent: 'var(--vh-voltage)' },
      { k: 'reliability', eyebrow: 'POWER THAT HOLDS',   title: 'Reliability',    body: 'Hours of autonomy, coverage through outages, fewer gaps.', accent: 'var(--vh-horizon)' },
      { k: 'sustain',     eyebrow: 'LOWER FOOTPRINT',    title: 'Sustainability', body: 'CO₂ avoided, diesel not burned, generational impact.', accent: 'var(--vh-bio)' },
    ];
    return (
      <div style={{
        width: 960, padding: '48px 52px 56px',
        background: 'var(--vh-surface-000)',
        border: '1px solid var(--vh-line)', borderRadius: 20,
      }}>
        <div style={{
          fontFamily: 'var(--vh-font-mono)', fontSize: 10, letterSpacing: '.26em',
          textTransform: 'uppercase', color: 'var(--vh-voltage)',
          display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14,
        }}>
          <Pria_Orb size={12}/> MICRO-STEP · JUST BEFORE YOUR PLAN
        </div>
        <h1 style={{
          fontFamily: 'var(--vh-font-display)', fontWeight: 300, letterSpacing: '-0.025em',
          fontSize: 48, lineHeight: 0.98, color: 'var(--vh-text-000)', margin: '0 0 10px',
        }}>
          What should I lead with — <em style={{ fontStyle: 'italic', fontWeight: 500, color: 'var(--vh-voltage)' }}>when I show you the plan</em>?
        </h1>
        <p style={{ fontFamily: 'var(--vh-font-body)', fontSize: 15, color: 'var(--vh-text-200)', lineHeight: 1.55, maxWidth: 620, margin: '0 0 30px' }}>
          Same plan, same numbers — I'll just put the one that matters most to you first. You can change this later.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
          {options.map(o => {
            const sel = picked === o.k;
            return (
              <button key={o.k}
                      onClick={() => setPicked(o.k)}
                      style={{
                        textAlign: 'left',
                        background: sel ? 'var(--vh-surface-200)' : 'var(--vh-surface-100)',
                        border: `1px solid ${sel ? o.accent : 'var(--vh-line)'}`,
                        boxShadow: sel ? `0 0 0 1px ${o.accent}, 0 18px 40px -20px ${o.accent}` : 'none',
                        borderRadius: 14, padding: '22px 22px 24px',
                        cursor: 'pointer', transition: 'all 220ms cubic-bezier(.2,.7,.2,1)',
                        color: 'inherit',
                      }}>
                <div style={{
                  fontFamily: 'var(--vh-font-mono)', fontSize: 9.5, letterSpacing: '.22em',
                  textTransform: 'uppercase', color: o.accent, marginBottom: 14,
                  display: 'flex', alignItems: 'center', gap: 8,
                }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: o.accent,
                                 boxShadow: `0 0 8px ${o.accent}` }}/>
                  {o.eyebrow}
                </div>
                <div style={{
                  fontFamily: 'var(--vh-font-display)', fontWeight: 500, fontSize: 34,
                  letterSpacing: '-0.02em', color: 'var(--vh-text-000)', lineHeight: 1, marginBottom: 10,
                }}>{o.title}</div>
                <div style={{ fontFamily: 'var(--vh-font-body)', fontSize: 13, color: 'var(--vh-text-200)', lineHeight: 1.5 }}>
                  {o.body}
                </div>
              </button>
            );
          })}
        </div>

        <div style={{ marginTop: 28, display: 'flex', alignItems: 'center', gap: 14 }}>
          <button style={{
            background: 'var(--vh-voltage)', color: 'var(--vh-void)',
            border: 0, borderRadius: 999, padding: '13px 22px',
            fontFamily: 'var(--vh-font-body)', fontWeight: 600, fontSize: 14, cursor: 'pointer',
            opacity: picked ? 1 : 0.45,
          }}>
            Show me the plan
          </button>
          <span style={{
            fontFamily: 'var(--vh-font-mono)', fontSize: 10, letterSpacing: '.2em',
            textTransform: 'uppercase', color: 'var(--vh-text-300)',
          }}>
            OR PRIA INFERS IT — a clinic user → reliability, a homeowner with ₦80k/mo fuel spend → cost
          </span>
        </div>
      </div>
    );
  };

  Object.assign(window, {
    P2_RevealCostFirst:        RevealCostFirst,
    P2_RevealReliabilityFirst: RevealReliabilityFirst,
    P2_RevealSustainFirst:     RevealSustainFirst,
    P2_RevealInteractive:      RevealInteractive,
    P2_PriorityMicrostep:      PriorityMicrostep,
  });
})();
