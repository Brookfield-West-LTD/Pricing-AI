// Volt Horizon — three live-plan side-panel variants
// All three read the same `data` shape and size a plan consistently.
(() => {
  const { useEffect, useRef, useState } = React;

  // ---- Shared math ----
  const computePlan = (d) => {
    const daily = d.appliances.reduce((s,a)=>s + a.watts*a.hours, 0) / 1000;
    const kw = Math.max(1, Math.ceil(daily/4.5));
    const bat = Math.ceil(daily*1.2);
    const panel = kw*1000*280;
    const batc = bat*1000*320;
    const inv = kw*95000;
    const inst = Math.round((panel+batc+inv)*0.18);
    const total = panel+batc+inv+inst;
    const monthlyGen = (d.currentSource==='generator'||d.currentSource==='mix') ? Math.round(d.generatorKVA*30*1.3*1100) : 0;
    const payM = monthlyGen ? Math.ceil(total/monthlyGen) : null;
    return { daily, kw, bat, panel, batc, inv, inst, total, monthlyGen, payM };
  };

  const useCounter = (target, dur=600) => {
    const [v,setV] = useState(target);
    const prev = useRef(target);
    useEffect(() => {
      const s = prev.current, e = target, t0 = performance.now();
      let raf;
      const tick = (t) => {
        const p = Math.min(1, (t - t0)/dur);
        const eased = 1 - Math.pow(1-p, 3);
        setV(Math.round(s + (e-s)*eased));
        if (p < 1) raf = requestAnimationFrame(tick);
        else prev.current = e;
      };
      raf = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(raf);
    }, [target, dur]);
    return v;
  };

  const readyOf = (d) => !!d.who || !!d.location;

  // =====================================================================
  // VARIANT A — RECEIPT
  // A tall, dark receipt. Dashed rules, monospace numerics, a voltage total.
  // For users who want "every line, sourced."
  // =====================================================================
  const PlanPanel_Receipt = ({ data }) => {
    const p = computePlan(data);
    const ready = readyOf(data);
    const total = useCounter(p.total);

    const who = data.who && ({ home:'A home', business:'A business', community:'A community' }[data.who]);
    const src = data.currentSource && ({
      generator:`${data.generatorKVA} kVA generator`,
      grid:'Grid only',
      mix:`Grid + ${data.generatorKVA} kVA gen`,
      none:'Nothing yet',
    }[data.currentSource]);
    const dir = data.energyDirection && ({
      solar:'Solar PV', wind:'Small wind', hybrid:'Hybrid', biomass:'Biomass', unsure:'Pria to decide',
    }[data.energyDirection]);

    return (
      <div style={{ height:'100%', display:'flex', flexDirection:'column', background:'var(--vh-surface-100)', fontFamily:'var(--vh-font-body)' }}>
        <div style={{ padding:'22px 24px 16px', borderBottom:'1px dashed var(--vh-line)' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', fontFamily:'var(--vh-font-mono)', fontSize:10, letterSpacing:'.18em', textTransform:'uppercase', color:'var(--vh-text-200)' }}>
            <span>— LIVE PLAN · DRAFT</span>
            <span style={{ display:'flex', alignItems:'center', gap:8, color:'var(--vh-bio)' }}>
              <span className="vh-dot-live"/> ASSEMBLING
            </span>
          </div>
        </div>

        <div style={{ padding:'22px 24px', overflowY:'auto', flex:1 }}>
          {/* BOQ */}
          <div style={{ fontFamily:'var(--vh-font-mono)', fontSize:10, letterSpacing:'.18em', textTransform:'uppercase', color:'var(--vh-text-300)', marginBottom:12 }}>BOQ</div>
          <div style={{ display:'flex', flexDirection:'column' }}>
            {[
              { k:`${p.kw}× 1 kW panels`,    v:p.panel },
              { k:`${p.kw} kW hybrid inverter`, v:p.inv },
              { k:`${p.bat} kWh LFP battery`,   v:p.batc },
              { k:`Install · BOS · VAT`,        v:p.inst },
            ].map((row,i) => (
              <div key={row.k} className="vh-in" style={{
                display:'grid', gridTemplateColumns:'1fr auto', gap:14,
                padding:'10px 0', borderBottom:'1px dashed var(--vh-line)',
                fontSize:13, animationDelay:`${0.05*i}s`,
              }}>
                <span style={{ color:'var(--vh-text-100)' }}>{row.k}</span>
                <span style={{ fontFamily:'var(--vh-font-mono)', color:'var(--vh-text-000)', fontSize:12.5, fontWeight:500 }}>
                  ₦{row.v.toLocaleString()}
                </span>
              </div>
            ))}
          </div>

          {/* Captured decisions */}
          <div style={{ marginTop:22, fontFamily:'var(--vh-font-mono)', fontSize:10, letterSpacing:'.18em', textTransform:'uppercase', color:'var(--vh-text-300)', marginBottom:10 }}>WHAT PRIA KNOWS</div>
          <div style={{ display:'grid', gap:6 }}>
            {[['For', who],['Where', data.location],['Today', src],['Direction', dir],['Loads', data.appliances.length ? `${data.appliances.length} appliances · ${p.daily.toFixed(1)} kWh/d` : null]].map(([k,v]) => (
              <div key={k} style={{ display:'flex', justifyContent:'space-between', fontSize:12.5, fontFamily:'var(--vh-font-body)' }}>
                <span style={{ fontFamily:'var(--vh-font-mono)', fontSize:10, letterSpacing:'.15em', textTransform:'uppercase', color:'var(--vh-text-300)' }}>{k}</span>
                <span style={{ color: v ? 'var(--vh-text-000)' : 'var(--vh-text-300)', textAlign:'right' }}>{v || '—'}</span>
              </div>
            ))}
          </div>

          {p.monthlyGen > 0 && (
            <div className="vh-up" style={{
              marginTop:22, padding:14, borderRadius:'var(--vh-r-md)',
              border:'1px solid var(--vh-line-hot)', background:'rgba(255,107,53,0.06)',
            }}>
              <div style={{ fontFamily:'var(--vh-font-mono)', fontSize:10, letterSpacing:'.18em', textTransform:'uppercase', color:'var(--vh-voltage)', marginBottom:6 }}>VS. YOUR GENERATOR</div>
              <div style={{ fontFamily:'var(--vh-font-body)', fontSize:13, lineHeight:1.55, color:'var(--vh-text-100)' }}>
                You burn ≈ <strong style={{ color:'var(--vh-text-000)' }}>₦{p.monthlyGen.toLocaleString()}/mo</strong> on petrol. This plan pays back in{' '}
                <strong style={{ color:'var(--vh-voltage-hot)' }}>{p.payM} months</strong>, then runs near-free for 15+ years.
              </div>
            </div>
          )}
        </div>

        {/* Total — always bottom */}
        <div style={{ padding:'20px 24px', background:'var(--vh-surface-200)', borderTop:'1px dashed var(--vh-line)' }}>
          <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between' }}>
            <div>
              <div style={{ fontFamily:'var(--vh-font-mono)', fontSize:10, letterSpacing:'.18em', textTransform:'uppercase', color:'var(--vh-text-200)' }}>— TOTAL EST.</div>
              <div style={{ fontFamily:'var(--vh-font-mono)', fontSize:10, letterSpacing:'.14em', textTransform:'uppercase', color:'var(--vh-text-300)', marginTop:4 }}>±15% · LOCKED AT SIGN-OFF</div>
            </div>
            <div style={{
              fontFamily:'var(--vh-font-mono)', fontWeight:500, fontSize:32, lineHeight:1, letterSpacing:'-0.015em',
              background:'linear-gradient(180deg, var(--vh-voltage-hot), var(--vh-voltage-deep))',
              WebkitBackgroundClip:'text', backgroundClip:'text', color:'transparent',
            }}>
              {ready ? `₦${total.toLocaleString()}` : '—'}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // =====================================================================
  // VARIANT B — ORCHESTRA
  // Pria "narrates" each decision. Conversational card-on-card feed that
  // builds downward as the user answers. Warmer, more personal.
  // =====================================================================
  const PlanPanel_Orchestra = ({ data, step }) => {
    const p = computePlan(data);
    const ready = readyOf(data);

    const lines = [];
    if (data.who)             lines.push({ k:'who', text: <>Planning for <em>{({home:'a home', business:'a business', community:'a community'})[data.who]}</em>.</> });
    if (data.location)        lines.push({ k:'loc', text: <>Locked onto <em>{data.location}</em> — pulling irradiance and local installer pool.</> });
    if (data.currentSource)   lines.push({ k:'src', text: <>Baseline: <em>{({generator:`a ${data.generatorKVA} kVA generator`, grid:'grid only', mix:`grid + ${data.generatorKVA} kVA`, none:'nothing yet'})[data.currentSource]}</em>. {p.monthlyGen ? `≈ ₦${p.monthlyGen.toLocaleString()}/mo in petrol.` : ''}</> });
    if (data.energyDirection) lines.push({ k:'dir', text: <>Direction: <em>{({solar:'solar PV', wind:'small wind', hybrid:'hybrid', biomass:'biomass', unsure:"I'll decide once I see the load"})[data.energyDirection]}</em>.</> });
    if (data.appliances.length) lines.push({ k:'load', text: <>Sizing around <em>{data.appliances.length} appliances</em>, {p.daily.toFixed(1)} kWh/day. Calling for a <strong>{p.kw} kW</strong> system with <strong>{p.bat} kWh</strong> of storage.</> });

    return (
      <div style={{ height:'100%', display:'flex', flexDirection:'column', background:'var(--vh-surface-100)', fontFamily:'var(--vh-font-body)' }}>
        <div style={{ padding:'22px 24px', borderBottom:'1px solid var(--vh-line)', display:'flex', alignItems:'center', gap:12 }}>
          <window.VH_Pria size={36}/>
          <div>
            <div style={{ fontFamily:'var(--vh-font-display)', fontSize:20, fontWeight:500, color:'var(--vh-text-000)', letterSpacing:'-0.02em' }}>
              Pria is <span style={{ fontStyle:'italic', color:'var(--vh-voltage)' }}>listening</span>
            </div>
            <div style={{ fontFamily:'var(--vh-font-mono)', fontSize:10, letterSpacing:'.18em', textTransform:'uppercase', color:'var(--vh-text-300)', marginTop:2, display:'flex', alignItems:'center', gap:8 }}>
              <span className="vh-dot-live"/> LIVE · STEP {String(step).padStart(2,'0')}
            </div>
          </div>
        </div>

        <div style={{ padding:'16px 24px', flex:1, overflowY:'auto', display:'flex', flexDirection:'column', gap:10 }}>
          {!ready && (
            <div style={{ fontFamily:'var(--vh-font-display)', fontStyle:'italic', fontWeight:300, fontSize:18, color:'var(--vh-text-300)', lineHeight:1.4, marginTop:20, textWrap:'balance' }}>
              Your plan will take shape here as you answer — each question composes one more piece of the whole.
            </div>
          )}
          {lines.map((ln,i) => (
            <div key={ln.k} className="vh-up" style={{
              background:'var(--vh-surface-200)',
              border:'1px solid var(--vh-line)',
              borderRadius:'6px 18px 18px 18px',
              padding:'12px 14px',
              fontSize:13.5, lineHeight:1.55, color:'var(--vh-text-100)',
              animationDelay:`${i*0.06}s`,
            }}>
              {ln.text}
            </div>
          ))}

          {ready && data.appliances.length > 0 && (
            <div className="vh-up" style={{
              marginTop:8, padding:16, borderRadius:'var(--vh-r-md)',
              background:'linear-gradient(145deg, rgba(255,107,53,0.08), rgba(88,200,255,0.05))',
              border:'1px solid var(--vh-line-hot)',
            }}>
              <div style={{ fontFamily:'var(--vh-font-mono)', fontSize:10, letterSpacing:'.18em', textTransform:'uppercase', color:'var(--vh-voltage)', marginBottom:8 }}>— CURRENT DRAFT</div>
              <div style={{ fontFamily:'var(--vh-font-mono)', fontWeight:500, fontSize:34, lineHeight:1, letterSpacing:'-0.015em',
                background:'linear-gradient(180deg, var(--vh-voltage-hot), var(--vh-voltage-deep))',
                WebkitBackgroundClip:'text', backgroundClip:'text', color:'transparent' }}>
                ₦{p.total.toLocaleString()}
              </div>
              {p.payM && (
                <div style={{ fontFamily:'var(--vh-font-body)', fontSize:13, lineHeight:1.55, color:'var(--vh-text-100)', marginTop:8 }}>
                  Pays itself back in <strong style={{ color:'var(--vh-voltage-hot)' }}>{Math.floor(p.payM/12)}y {p.payM%12}m</strong>, then runs near-free for 15+ years.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  // =====================================================================
  // VARIANT C — TELEMETRY
  // A cool, info-dense read-out. Fills in like a dashboard — three rings
  // (kW / kWh / years payback), sparkline on petrol-spend offset,
  // horizon-blue labels. For the spreadsheet crowd.
  // =====================================================================
  const Ring = ({ pct, label, value, unit, color }) => {
    const r = 34, c = 2*Math.PI*r;
    const p = Math.max(0, Math.min(1, pct));
    return (
      <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:6 }}>
        <svg width="88" height="88" viewBox="0 0 88 88">
          <circle cx="44" cy="44" r={r} stroke="var(--vh-line)" strokeWidth="4" fill="none"/>
          <circle cx="44" cy="44" r={r} stroke={color} strokeWidth="4" fill="none"
            strokeDasharray={`${c*p} ${c}`} strokeDashoffset="0"
            style={{ transform:'rotate(-90deg)', transformOrigin:'44px 44px', transition:'stroke-dasharray 600ms cubic-bezier(.16,1,.3,1)' }}
            strokeLinecap="round" />
          <text x="44" y="42" textAnchor="middle" fill="var(--vh-text-000)"
                style={{ fontFamily:'var(--vh-font-mono)', fontSize:18, fontWeight:500 }}>{value}</text>
          <text x="44" y="56" textAnchor="middle" fill="var(--vh-text-300)"
                style={{ fontFamily:'var(--vh-font-mono)', fontSize:8, letterSpacing:'.15em' }}>{unit}</text>
        </svg>
        <div style={{ fontFamily:'var(--vh-font-mono)', fontSize:9, letterSpacing:'.18em', textTransform:'uppercase', color:'var(--vh-text-300)' }}>{label}</div>
      </div>
    );
  };

  const PlanPanel_Telemetry = ({ data }) => {
    const p = computePlan(data);
    const ready = readyOf(data);
    const payY = p.payM ? p.payM/12 : 0;

    // Ring progress heuristics (just for nice fills as data comes in)
    const kwPct = Math.min(1, p.kw/8);
    const kwhPct = Math.min(1, p.daily/12);
    const payPct = p.payM ? Math.min(1, 5/payY) : 0;

    // Sparkline: petrol spend cumulative vs. plan
    const months = 60;
    const monthlyGen = p.monthlyGen;
    const makePath = (fn) => {
      const pts = Array.from({length:months}, (_,i)=> fn(i));
      const max = Math.max(...pts, 1);
      return pts.map((y,i)=> `${i===0?'M':'L'} ${(i/(months-1))*100} ${100 - (y/max)*100}`).join(' ');
    };
    const dieselPath = makePath(i => monthlyGen * i);
    const planPath   = makePath(i => Math.min(p.total, p.total * Math.min(1, i/(p.payM||999)) ));

    return (
      <div style={{ height:'100%', display:'flex', flexDirection:'column', background:'var(--vh-surface-100)', fontFamily:'var(--vh-font-body)' }}>
        <div style={{ padding:'18px 24px', borderBottom:'1px solid var(--vh-line)', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <div style={{ fontFamily:'var(--vh-font-mono)', fontSize:10, letterSpacing:'.18em', textTransform:'uppercase', color:'var(--vh-text-200)' }}>— TELEMETRY · LIVE</div>
          <div style={{ fontFamily:'var(--vh-font-mono)', fontSize:10, letterSpacing:'.14em', textTransform:'uppercase', color:'var(--vh-horizon)', display:'flex', alignItems:'center', gap:8 }}>
            <span className="vh-dot-voltage" style={{ background:'var(--vh-horizon)', boxShadow:'0 0 10px var(--vh-horizon)' }}/>
            REV {String(data.appliances.length + (data.who?1:0) + (data.location?1:0)).padStart(2,'0')}
          </div>
        </div>

        <div style={{ padding:'22px 24px 0', display:'flex', justifyContent:'space-around' }}>
          <Ring pct={ready?kwPct:0}  label="SYSTEM"  value={ready?p.kw:'—'}            unit="kW"     color="var(--vh-voltage)"/>
          <Ring pct={ready?kwhPct:0} label="LOAD"    value={ready?p.daily.toFixed(1):'—'} unit="kWh/d"  color="var(--vh-bio)"/>
          <Ring pct={ready?payPct:0} label="PAYBACK" value={p.payM?payY.toFixed(1):'—'}    unit="YEARS"  color="var(--vh-horizon)"/>
        </div>

        <div style={{ padding:'22px 24px', flex:1, overflowY:'auto' }}>
          <div style={{
            padding:16, borderRadius:'var(--vh-r-md)',
            border:'1px solid var(--vh-line)', background:'var(--vh-surface-200)',
          }}>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:10 }}>
              <div style={{ fontFamily:'var(--vh-font-mono)', fontSize:10, letterSpacing:'.18em', textTransform:'uppercase', color:'var(--vh-text-300)' }}>5-YEAR OUTFLOW</div>
              <div style={{ display:'flex', gap:10, fontFamily:'var(--vh-font-mono)', fontSize:9, letterSpacing:'.15em', textTransform:'uppercase' }}>
                <span style={{ color:'var(--vh-voltage)' }}>■ PLAN</span>
                <span style={{ color:'var(--vh-text-300)' }}>■ DIESEL</span>
              </div>
            </div>
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ width:'100%', height:86 }}>
              {monthlyGen > 0 && (
                <path d={dieselPath} stroke="var(--vh-text-300)" strokeWidth="0.6" fill="none" vectorEffect="non-scaling-stroke"/>
              )}
              <path d={planPath} stroke="var(--vh-voltage)" strokeWidth="1.2" fill="none" vectorEffect="non-scaling-stroke"/>
            </svg>
            <div style={{ display:'flex', justifyContent:'space-between', fontFamily:'var(--vh-font-mono)', fontSize:9, letterSpacing:'.15em', textTransform:'uppercase', color:'var(--vh-text-300)', marginTop:4 }}>
              <span>MONTH 0</span><span>M60</span>
            </div>
          </div>

          {/* Component table */}
          <div style={{ marginTop:18 }}>
            <div style={{ fontFamily:'var(--vh-font-mono)', fontSize:10, letterSpacing:'.18em', textTransform:'uppercase', color:'var(--vh-text-300)', marginBottom:10 }}>COMPONENTS</div>
            <div style={{ display:'grid', gap:4 }}>
              {[
                { k:'PV',  v:p.kw, u:'kW',  c:'var(--vh-voltage)' },
                { k:'BAT', v:p.bat, u:'kWh', c:'var(--vh-bio)' },
                { k:'INV', v:p.kw, u:'kW',  c:'var(--vh-horizon)' },
              ].map(row => (
                <div key={row.k} style={{ display:'grid', gridTemplateColumns:'44px 1fr auto', gap:10, alignItems:'center' }}>
                  <div style={{ fontFamily:'var(--vh-font-mono)', fontSize:10, letterSpacing:'.18em', color:row.c, fontWeight:500 }}>{row.k}</div>
                  <div style={{ height:4, borderRadius:2, background:'var(--vh-surface-300)', overflow:'hidden' }}>
                    <div style={{ height:'100%', width: `${Math.min(100, row.v*8)}%`, background:row.c, transition:'width 600ms cubic-bezier(.16,1,.3,1)' }}/>
                  </div>
                  <div style={{ fontFamily:'var(--vh-font-mono)', fontSize:11, color:'var(--vh-text-000)', fontWeight:500 }}>{row.v} {row.u}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ padding:'16px 24px', borderTop:'1px solid var(--vh-line)', background:'var(--vh-surface-200)', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <div style={{ fontFamily:'var(--vh-font-mono)', fontSize:10, letterSpacing:'.18em', textTransform:'uppercase', color:'var(--vh-text-200)' }}>CAPEX</div>
          <div style={{ fontFamily:'var(--vh-font-mono)', fontWeight:500, fontSize:26,
            background:'linear-gradient(180deg, var(--vh-voltage-hot), var(--vh-voltage-deep))',
            WebkitBackgroundClip:'text', backgroundClip:'text', color:'transparent', letterSpacing:'-0.015em' }}>
            {ready ? `₦${p.total.toLocaleString()}` : '—'}
          </div>
        </div>
      </div>
    );
  };

  Object.assign(window, {
    VH_PlanPanel_Receipt: PlanPanel_Receipt,
    VH_PlanPanel_Orchestra: PlanPanel_Orchestra,
    VH_PlanPanel_Telemetry: PlanPanel_Telemetry,
  });
})();
