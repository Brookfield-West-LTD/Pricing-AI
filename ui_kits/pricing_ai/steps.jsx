// Volt Horizon — Pricing AI: step bodies
(() => {
  const { useState } = React;
  const { IconCheck, IconPlus, IconMinus, IconPin, IconSpark } =
    window.VH_Icon;

  // ---------- HERO ----------
  const HeroStep = ({ onNext }) => {
    const IM = window.VH_IMAGES;
    const heroImages = [IM.solarRooftop, IM.solarArray, IM.inverterRoom, IM.cityDusk, IM.engineer, IM.sunRise];
    const stackImages = [IM.africaRoof, IM.solarInstall, IM.lagosBridge, IM.batteryBank, IM.clinic, IM.solarCloseup];
    return (
    <div className="relative w-full" style={{ minHeight: '100%', padding: '48px 24px 110px' }}>
      <div className="w-full max-w-6xl mx-auto" style={{ display:'grid', gridTemplateColumns:'minmax(0, 1.25fr) minmax(0, 1fr)', gap:56, alignItems:'center' }}>
        <div style={{ position:'relative' }}>
          <div className="vh-up vh-d1" style={{ fontFamily:'var(--vh-font-mono)', fontSize:11, letterSpacing:'.2em', textTransform:'uppercase', color:'var(--vh-voltage)', marginBottom:24, display:'flex', alignItems:'center', gap:12 }}>
            <window.VH_Pria size={28}/> PRIA · YOUR ENERGY ANALYST
          </div>
          <h1 style={{
            fontFamily:'var(--vh-font-display)', fontWeight:300, lineHeight:0.92, letterSpacing:'-0.04em',
            color:'var(--vh-text-000)', fontSize:'clamp(52px, 7.4vw, 108px)', marginBottom:26, textWrap:'balance',
          }}>
            <span className="vh-up vh-d2">Your </span>
            <span className="vh-up vh-d3" style={{ fontStyle:'italic', fontWeight:500, color:'var(--vh-voltage)' }}>energy</span>
            <br/>
            <span className="vh-up vh-d4">future, </span>
            <span className="vh-up vh-d5" style={{ fontStyle:'italic', fontWeight:500 }}>priced.</span>
          </h1>
          <p className="vh-up vh-d6" style={{ fontFamily:'var(--vh-font-body)', fontSize:17, lineHeight:1.55, color:'var(--vh-text-200)', maxWidth:520, marginBottom:20, minHeight:56 }}>
            <window.VH_TypingText
              text="From a question to a priced, scheduled, ready-to-execute renewable plan — in minutes, not weeks."
              speed={22} startDelay={900} loop pauseAtEnd={6000}/>
          </p>
          <div className="vh-up vh-d7 flex items-center gap-6 flex-wrap" style={{ marginBottom:36 }}>
            <button className="vh-btn vh-btn-primary" onClick={onNext} style={{ padding:'16px 26px', fontSize:15 }}>
              Begin your plan <window.VH_Icon.IconArrowRight size={18}/>
            </button>
            <span style={{ fontFamily:'var(--vh-font-mono)', fontSize:10, letterSpacing:'.18em', textTransform:'uppercase', color:'var(--vh-text-300)' }}>
              ~5 MINUTES · NO ACCOUNT
            </span>
          </div>

          {/* Live ticker marquee */}
          <div className="vh-up vh-d8" style={{ border:'1px solid var(--vh-line)', borderRadius:'var(--vh-r-md)', padding:'12px 0', background:'var(--vh-surface-100)', marginBottom:24 }}>
            <window.VH_Marquee items={[
              { text:'PLAN #4,820 · Lekki residence · 5 kW hybrid · ₦9.2M', color:'var(--vh-voltage)' },
              { text:'PLAN #4,821 · Ibadan clinic · 8 kW PV + 15 kWh battery · ₦14.8M', color:'var(--vh-bio)' },
              { text:'PLAN #4,822 · Enugu SME · 3 kW + genset fallback · ₦4.6M', color:'var(--vh-horizon)' },
              { text:'PLAN #4,823 · Abuja estate · 40 kW mini-grid · ₦62M', color:'var(--vh-voltage)' },
              { text:'PLAN #4,824 · Kano farm · biomass + 12 kW PV · ₦18.1M', color:'var(--vh-bio)' },
            ]}/>
          </div>

          {/* Stats with count-up */}
          <div className="vh-up vh-d8" style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:1, background:'var(--vh-line)', border:'1px solid var(--vh-line)', borderRadius:'var(--vh-r-lg)', overflow:'hidden' }}>
            {[
              { k:'PLANS PRICED', n:4820, dec:0, s:'SINCE Q1' },
              { k:'MEDIAN PAYBACK', n:2.4, dec:1, suffix:'y', s:'VS. DIESEL' },
              { k:'LGAs COVERED', n:112, dec:0, suffix:' / 774', s:'EXPANDING' },
            ].map(m => (
              <div key={m.k} style={{ background:'var(--vh-surface-100)', padding:'20px 22px' }}>
                <div style={{ fontFamily:'var(--vh-font-mono)', fontSize:10, letterSpacing:'.18em', textTransform:'uppercase', color:'var(--vh-text-300)', marginBottom:8 }}>{m.k}</div>
                <div style={{ fontFamily:'var(--vh-font-mono)', fontWeight:500, fontSize:34, color:'var(--vh-text-000)', letterSpacing:'-0.01em' }}>
                  <window.VH_CountUp to={m.n} decimals={m.dec} suffix={m.suffix||''} duration={1800}/>
                </div>
                <div style={{ fontFamily:'var(--vh-font-mono)', fontSize:10, letterSpacing:'.14em', textTransform:'uppercase', color:'var(--vh-text-200)', marginTop:4 }}>{m.s}</div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — layered imagery + orbit */}
        <div className="vh-up vh-d3" style={{ position:'relative', height:620, display:'flex', alignItems:'center', justifyContent:'center' }}>
          {/* big Ken-Burns crossfade behind */}
          <div style={{ position:'absolute', inset:'0 -20px 80px 0' }}>
            <window.VH_KenBurns images={heroImages} height={620} caption="LIVE · NIGERIA"/>
          </div>
          {/* drifting photo stack overlaid left */}
          <div style={{ position:'absolute', left:-40, top:40, width:200, height:520, zIndex:2, opacity:0.95 }}>
            <window.VH_PhotoStack images={stackImages} height={520} speed={34}/>
          </div>
          {/* orbit scene floating on top */}
          <div style={{ position:'relative', zIndex:3, marginTop:20, marginRight:-20 }}>
            <window.VH_OrbitScene size={320} photo={false}/>
          </div>
          {/* live stream bars bottom-right */}
          <div style={{ position:'absolute', right:10, bottom:28, width:160, height:56, padding:10, background:'rgba(15,22,32,0.78)', backdropFilter:'blur(10px)', border:'1px solid var(--vh-line)', borderRadius:'var(--vh-r-md)', zIndex:4, display:'flex', flexDirection:'column', gap:4 }}>
            <div style={{ fontFamily:'var(--vh-font-mono)', fontSize:9, letterSpacing:'.2em', textTransform:'uppercase', color:'var(--vh-text-300)' }}>LIVE LOAD</div>
            <div style={{ flex:1 }}><window.VH_StreamBars count={14} height={32}/></div>
          </div>
        </div>
      </div>
    </div>
  );};

  // ---------- STEP SHELL ----------
  const StepBody = ({ children }) => (
    <div className="w-full" style={{ padding:'44px 24px 120px', maxWidth:780, margin:'0 auto' }}>
      {children}
    </div>
  );

  // ---------- WHO ----------
  const WhoStep = ({ value, onChange }) => {
    const IM = window.VH_IMAGES;
    const opts = [
      { id:'home',      title:'A home',       desc:'Apartment, house, or compound.',  meta:'Residential', img:IM.home,     back:IM.solarRooftop },
      { id:'business',  title:'A business',   desc:'Shop, office, clinic, factory.',  meta:'Commercial',  img:IM.smallShop, back:IM.clinic },
      { id:'community', title:'A community',  desc:'Estate, church, school, mini-grid.', meta:'Shared',   img:IM.africaRoof, back:IM.solarArray },
    ];
    return (
      <StepBody>
        <window.VH_StepHeader
          eyebrow="01 · WHO ARE WE PLANNING FOR"
          sub="This shapes sizing, financing options, and the kind of installer we match you with.">
          Who <span style={{ fontStyle:'italic', fontWeight:500, color:'var(--vh-voltage)' }}>needs</span> the power?
        </window.VH_StepHeader>

        <div className="vh-in vh-d3" style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:12 }}>
          {opts.map((o, i) => (
            <button key={o.id} className="vh-tile vh-up" data-selected={value === o.id}
                    style={{ animationDelay:`${0.1 + i*0.05}s`, display:'flex', flexDirection:'column', gap:12, minHeight:280, padding:0, overflow:'hidden' }}
                    onClick={() => onChange(o.id)}>
              <div style={{ position:'relative', height:120 }}>
                <window.VH_FlipPhoto front={o.img} back={o.back}
                  frontLabel={o.meta.toUpperCase()} backLabel={'→ ' + o.meta.toUpperCase() + ' · POWERED'}
                  height={120} interval={4500 + i*600} delay={i*800}/>
              </div>
              <div style={{ padding:'4px 16px 16px', display:'flex', flexDirection:'column', gap:10, flex:1 }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                  <span style={{ fontFamily:'var(--vh-font-mono)', fontSize:10, letterSpacing:'.18em', textTransform:'uppercase', color: value===o.id ? 'var(--vh-voltage)' : 'var(--vh-text-300)' }}>
                    OPTION 0{i+1}
                  </span>
                  {value===o.id && <span className="vh-pop" style={{ color:'var(--vh-voltage)' }}><IconCheck size={18}/></span>}
                </div>
                <div style={{ flex:1 }}/>
                <div style={{ fontFamily:'var(--vh-font-display)', fontWeight:300, fontSize:30, letterSpacing:'-0.025em', lineHeight:1, color:'var(--vh-text-000)' }}>
                  {o.title.split(' ').map((w,wi)=> wi===1 ? <span key={wi} style={{ fontStyle:'italic', fontWeight:500 }}>{w}</span> : w+' ')}
                </div>
                <div style={{ fontFamily:'var(--vh-font-body)', fontSize:13, color:'var(--vh-text-200)', lineHeight:1.5 }}>{o.desc}</div>
              </div>
            </button>
          ))}
        </div>
      </StepBody>
    );
  };

  // ---------- LOCATION ----------
  const LocationStep = ({ value, onChange }) => {
    const cities = ['Lagos','Abuja','Port Harcourt','Ibadan','Kano','Benin City','Enugu','Kaduna'];
    return (
      <StepBody>
        <window.VH_StepHeader
          eyebrow="02 · WHERE EXACTLY"
          sub="We pull solar irradiance, grid uptime, and local installer availability for the exact spot.">
          Where <span style={{ fontStyle:'italic', fontWeight:500, color:'var(--vh-voltage)' }}>exactly</span> is the site?
        </window.VH_StepHeader>

        <div className="vh-up vh-d4 vh-field" style={{ marginBottom:18 }}>
          <IconPin size={18} />
          <input value={value} placeholder="Type a city, state, or full address…"
                 onChange={(e) => onChange(e.target.value)} />
          <span style={{ fontFamily:'var(--vh-font-mono)', fontSize:10, letterSpacing:'.18em', textTransform:'uppercase', color:'var(--vh-text-300)' }}>GPS · OPTIONAL</span>
        </div>

        <div className="vh-up vh-d5" style={{ fontFamily:'var(--vh-font-mono)', fontSize:10, letterSpacing:'.18em', textTransform:'uppercase', color:'var(--vh-text-200)', marginBottom:10 }}>— OR PICK A MAJOR CITY</div>
        <div className="flex flex-wrap gap-2 vh-up vh-d5" style={{ marginBottom:28 }}>
          {cities.map(c => (
            <button key={c} className="vh-pill" data-selected={value === c} onClick={() => onChange(c)}>{c}</button>
          ))}
        </div>

        <div className="vh-up vh-d6" style={{
          borderRadius:'var(--vh-r-lg)', overflow:'hidden',
          border:'1px solid var(--vh-line)', background:'var(--vh-surface-100)',
        }}>
          <div style={{ position:'relative', height:220, background:'radial-gradient(circle at 50% 50%, rgba(255,107,53,0.18), transparent 55%), var(--vh-surface-200)' }}>
            <svg style={{ position:'absolute', inset:0, width:'100%', height:'100%', opacity:0.5 }}>
              <defs>
                <pattern id="vhgrid" width="36" height="36" patternUnits="userSpaceOnUse">
                  <path d="M 36 0 L 0 0 0 36" fill="none" stroke="rgba(200,212,224,0.12)" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#vhgrid)" />
              <circle cx="50%" cy="50%" r="46" fill="#FF6B35" fillOpacity="0.1" />
              <circle cx="50%" cy="50%" r="22" fill="#FF6B35" fillOpacity="0.25" />
              <circle cx="50%" cy="50%" r="6"  fill="#FF6B35" />
            </svg>
            <div style={{ position:'absolute', bottom:14, left:16, fontFamily:'var(--vh-font-mono)', fontSize:10, letterSpacing:'.14em', textTransform:'uppercase', color:'var(--vh-text-200)' }}>
              <span style={{ color:'var(--vh-voltage)' }}>IRRADIANCE</span> · 5.4 kWh/m²/day &nbsp;·&nbsp; <span style={{ color:'var(--vh-horizon)' }}>GRID UPTIME</span> · 63%
            </div>
          </div>
        </div>
      </StepBody>
    );
  };

  // ---------- CURRENT POWER ----------
  const CurrentStep = ({ value, kva, onChange, onKva }) => {
    const opts = [
      { id:'generator', title:'Generator',           desc:'Diesel or petrol generator is the workhorse.', meta:'MOST COMMON' },
      { id:'grid',      title:'Grid only',           desc:'DisCo supply only — no backup right now.',    meta:null },
      { id:'mix',       title:'Grid + generator',    desc:"Grid when it's up, generator when it's not.", meta:null },
      { id:'none',      title:'Nothing yet',         desc:'New build, off-grid site, or starting fresh.', meta:null },
    ];
    return (
      <StepBody>
        <window.VH_StepHeader
          eyebrow="03 · WHAT YOU HAVE TODAY"
          sub="Your baseline is what every plan is compared against — petrol spend, uptime, CO₂.">
          What runs your <span style={{ fontStyle:'italic', fontWeight:500, color:'var(--vh-voltage)' }}>power</span> today?
        </window.VH_StepHeader>

        <div className="vh-in" style={{ display:'grid', gridTemplateColumns:'repeat(2, 1fr)', gap:12 }}>
          {opts.map((o,i)=>(
            <button key={o.id} className="vh-tile vh-up" data-selected={value===o.id}
                    style={{ animationDelay:`${0.1 + i*0.05}s`, minHeight:130, display:'flex', flexDirection:'column', gap:8 }}
                    onClick={()=>onChange(o.id)}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                <div style={{ fontFamily:'var(--vh-font-display)', fontSize:24, fontWeight:500, letterSpacing:'-0.02em', color:'var(--vh-text-000)' }}>{o.title}</div>
                {o.meta && <span style={{ fontFamily:'var(--vh-font-mono)', fontSize:9, letterSpacing:'.18em', textTransform:'uppercase', color:'var(--vh-voltage)', border:'1px solid var(--vh-line-hot)', padding:'3px 8px', borderRadius:999 }}>{o.meta}</span>}
              </div>
              <div style={{ fontFamily:'var(--vh-font-body)', fontSize:13.5, color:'var(--vh-text-200)', lineHeight:1.5 }}>{o.desc}</div>
            </button>
          ))}
        </div>

        {(value==='generator' || value==='mix') && (
          <div className="vh-up" style={{
            marginTop:18, padding:18,
            background:'var(--vh-surface-100)', border:'1px solid var(--vh-line)', borderRadius:'var(--vh-r-lg)',
            display:'flex', alignItems:'center', gap:14, flexWrap:'wrap',
          }}>
            <div style={{ fontFamily:'var(--vh-font-mono)', fontSize:10, letterSpacing:'.18em', textTransform:'uppercase', color:'var(--vh-text-200)' }}>— GEN SIZE</div>
            <div style={{ display:'flex', alignItems:'center', gap:8, border:'1px solid var(--vh-line)', borderRadius:999, padding:'4px 6px' }}>
              <button className="vh-btn vh-btn-ghost" style={{ width:30, height:30, padding:0, borderRadius:'50%', background:'var(--vh-surface-200)', color:'var(--vh-text-000)' }} onClick={()=>onKva(Math.max(1, kva-1))}><IconMinus size={14}/></button>
              <span style={{ fontFamily:'var(--vh-font-mono)', fontSize:22, color:'var(--vh-voltage)', fontWeight:500, minWidth:44, textAlign:'center' }}>{kva}</span>
              <button className="vh-btn vh-btn-ghost" style={{ width:30, height:30, padding:0, borderRadius:'50%', background:'var(--vh-surface-200)', color:'var(--vh-text-000)' }} onClick={()=>onKva(kva+1)}><IconPlus size={14}/></button>
            </div>
            <span style={{ fontFamily:'var(--vh-font-body)', color:'var(--vh-text-000)', fontSize:14 }}>kVA</span>
            <span style={{ marginLeft:'auto', fontFamily:'var(--vh-font-mono)', fontSize:11, letterSpacing:'.12em', textTransform:'uppercase', color:'var(--vh-text-200)' }}>
              ≈ <span style={{ color:'var(--vh-voltage-hot)' }}>₦{(kva*30*1.3*1100).toLocaleString()}</span>/MO IN PETROL
            </span>
          </div>
        )}
      </StepBody>
    );
  };

  // ---------- DIRECTION ----------
  const DirectionStep = ({ value, onChange }) => {
    const opts = [
      { id:'solar',   title:'Solar PV',    meta:'PHOTOVOLTAIC',    desc:'Rooftop or ground-mount panels + hybrid inverter.' },
      { id:'wind',    title:'Small wind',  meta:'SITE-DEPENDENT',  desc:'Best on coastal / elevated sites with steady wind.' },
      { id:'hybrid',  title:'Hybrid',      meta:'MOST RESILIENT',  desc:'Solar + battery + existing generator as a last fallback.' },
      { id:'biomass', title:'Biomass',     meta:'AG-ADJACENT',     desc:'Digester or husk gasifier for farms & food processing.' },
      { id:'unsure',  title:'Let Pria pick', meta:'— RECOMMENDED', desc:'I tell you my constraints; Pria picks what fits best.' },
    ];
    return (
      <StepBody>
        <window.VH_StepHeader
          eyebrow="04 · DIRECTION"
          sub="Pick one — or let Pria choose the best fit for your site, load, and budget.">
          Which <span style={{ fontStyle:'italic', fontWeight:500, color:'var(--vh-voltage)' }}>direction</span> are you exploring?
        </window.VH_StepHeader>

        <div className="vh-in" style={{ display:'grid', gridTemplateColumns:'repeat(2, 1fr)', gap:12 }}>
          {opts.map((o,i)=>{
            const isRecommended = o.id === 'unsure';
            return (
              <button key={o.id} className="vh-tile vh-up" data-selected={value===o.id}
                      style={{
                        animationDelay:`${0.1 + i*0.05}s`, minHeight:130,
                        gridColumn: isRecommended ? 'span 2' : 'auto',
                        display:'flex', flexDirection:'column', gap:8,
                      }}
                      onClick={()=>onChange(o.id)}>
                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                  <div style={{ fontFamily:'var(--vh-font-mono)', fontSize:10, letterSpacing:'.18em', textTransform:'uppercase', color: isRecommended ? 'var(--vh-voltage)' : 'var(--vh-text-300)' }}>{o.meta}</div>
                  {isRecommended && <IconSpark size={16} style={{ color:'var(--vh-voltage)' }}/>}
                </div>
                <div style={{ fontFamily:'var(--vh-font-display)', fontSize:28, fontWeight:500, letterSpacing:'-0.02em', color:'var(--vh-text-000)' }}>{o.title}</div>
                <div style={{ fontFamily:'var(--vh-font-body)', fontSize:13.5, color:'var(--vh-text-200)', lineHeight:1.5 }}>{o.desc}</div>
              </button>
            );
          })}
        </div>
      </StepBody>
    );
  };

  // ---------- LOADS ----------
  const LOAD_LIB = [
    { id:'lights',   name:'LED lights',      w:60,   h:6   },
    { id:'fan',      name:'Standing fan',    w:75,   h:8   },
    { id:'tv',       name:'TV + decoder',    w:120,  h:5   },
    { id:'fridge',   name:'Refrigerator',    w:200,  h:24  },
    { id:'freezer',  name:'Deep freezer',    w:350,  h:24  },
    { id:'ac1',      name:'AC (1 hp)',       w:750,  h:6   },
    { id:'ac15',     name:'AC (1.5 hp)',     w:1100, h:6   },
    { id:'iron',     name:'Pressing iron',   w:1000, h:0.5 },
    { id:'pump',     name:'Pumping machine', w:750,  h:1   },
    { id:'router',   name:'Wi-Fi router',    w:15,   h:24  },
    { id:'laptop',   name:'Laptop',          w:65,   h:8   },
    { id:'borehole', name:'Borehole pump',   w:1500, h:2   },
  ];

  const LoadStep = ({ items, onToggle, onHours }) => {
    const totalWh = items.reduce((s,i) => s + i.watts * i.hours, 0);
    return (
      <StepBody>
        <window.VH_StepHeader
          eyebrow="05 · WHAT MUST STAY ON"
          sub="Tap appliances that must keep running when the grid drops. Pria sizes battery autonomy around these.">
          What needs to <span style={{ fontStyle:'italic', fontWeight:500, color:'var(--vh-voltage)' }}>stay on</span>?
        </window.VH_StepHeader>

        <div className="vh-in" style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:8 }}>
          {LOAD_LIB.map((a,i)=>{
            const sel = items.find(x=>x.id===a.id);
            return (
              <button key={a.id} className="vh-tile vh-up" data-selected={!!sel}
                      style={{ animationDelay:`${0.05 + (i%8)*0.04}s`, padding:14, minHeight:92, display:'flex', flexDirection:'column', justifyContent:'space-between' }}
                      onClick={()=>onToggle(a)}>
                <div>
                  <div style={{ fontFamily:'var(--vh-font-body)', fontWeight:500, fontSize:13.5, color:'var(--vh-text-000)' }}>{a.name}</div>
                  <div style={{ fontFamily:'var(--vh-font-mono)', fontSize:10, letterSpacing:'.12em', textTransform:'uppercase', color:'var(--vh-text-300)', marginTop:3 }}>{a.w}W</div>
                </div>
                {sel && (
                  <div className="vh-pop" onClick={e=>e.stopPropagation()} style={{ display:'flex', alignItems:'center', gap:6, marginTop:8 }}>
                    <button onClick={e=>{e.stopPropagation(); onHours(a.id, Math.max(0.5, sel.hours-1));}} style={{ width:24, height:24, borderRadius:'50%', background:'var(--vh-surface-300)', color:'var(--vh-text-000)', border:'none', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer' }}><IconMinus size={12}/></button>
                    <span style={{ fontFamily:'var(--vh-font-mono)', fontSize:13, color:'var(--vh-voltage)', minWidth:40, textAlign:'center', fontWeight:500 }}>{sel.hours}h</span>
                    <button onClick={e=>{e.stopPropagation(); onHours(a.id, sel.hours+1);}} style={{ width:24, height:24, borderRadius:'50%', background:'var(--vh-surface-300)', color:'var(--vh-text-000)', border:'none', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer' }}><IconPlus size={12}/></button>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        <div className="vh-up" style={{
          marginTop:18, padding:'18px 22px',
          background:'var(--vh-surface-100)', border:'1px solid var(--vh-line)', borderRadius:'var(--vh-r-lg)',
          display:'flex', alignItems:'flex-end', justifyContent:'space-between', gap:20, flexWrap:'wrap',
        }}>
          <div>
            <div style={{ fontFamily:'var(--vh-font-mono)', fontSize:10, letterSpacing:'.18em', textTransform:'uppercase', color:'var(--vh-text-200)', marginBottom:6 }}>— DAILY ENERGY</div>
            <div style={{ fontFamily:'var(--vh-font-mono)', fontWeight:500, fontSize:40, lineHeight:1,
              background:'linear-gradient(180deg, var(--vh-voltage-hot), var(--vh-voltage-deep))',
              WebkitBackgroundClip:'text', backgroundClip:'text', color:'transparent', letterSpacing:'-0.01em' }}>
              {(totalWh/1000).toFixed(1)}
              <span style={{ fontSize:14, color:'var(--vh-text-300)', background:'none', WebkitTextFillColor:'var(--vh-text-300)', marginLeft:8 }}>kWh/day</span>
            </div>
          </div>
          <div style={{ textAlign:'right' }}>
            <div style={{ fontFamily:'var(--vh-font-mono)', fontSize:10, letterSpacing:'.18em', textTransform:'uppercase', color:'var(--vh-text-200)', marginBottom:6 }}>APPLIANCES</div>
            <div style={{ fontFamily:'var(--vh-font-mono)', fontSize:40, color:'var(--vh-text-000)', fontWeight:500 }}>{items.length}</div>
          </div>
        </div>

        {window.Pria_Helper && (
          <window.Pria_Helper onDontUnderstand={() => {}} onAddSomething={() => {}} expanded={false}/>
        )}
      </StepBody>
    );
  };

  // ---------- REVEAL ----------
  const RevealStep = ({ data, onRestart }) => {
    const daily = data.appliances.reduce((s,a)=>s + a.watts*a.hours, 0) / 1000;
    const kw = Math.max(1, Math.ceil(daily/4.5));
    const bat = Math.ceil(daily*1.2);
    const raw = kw*1000*280 + bat*1000*320 + kw*95000;
    const total = Math.round(raw * 1.18);
    const monthlyGen = (data.currentSource==='generator'||data.currentSource==='mix') ? Math.round(data.generatorKVA*30*1.3*1100) : 0;
    const payM = monthlyGen ? Math.ceil(total/monthlyGen) : null;

    return (
      <StepBody>
        <div className="vh-up vh-d1" style={{ fontFamily:'var(--vh-font-mono)', fontSize:11, letterSpacing:'.2em', textTransform:'uppercase', color:'var(--vh-voltage)', marginBottom:14, display:'flex', alignItems:'center', gap:10 }}>
          <span className="vh-dot-voltage"/>  YOUR PLAN IS READY
        </div>
        <h2 style={{ fontFamily:'var(--vh-font-display)', fontWeight:300, letterSpacing:'-0.03em', lineHeight:0.95, fontSize:'clamp(40px,5vw,72px)', color:'var(--vh-text-000)', marginBottom:18 }} className="vh-up vh-d2">
          Your <span style={{ fontStyle:'italic', fontWeight:500, color:'var(--vh-voltage)' }}>renewable</span> path.
        </h2>
        <p className="vh-up vh-d3" style={{ fontFamily:'var(--vh-font-body)', fontSize:16, color:'var(--vh-text-200)', lineHeight:1.55, marginBottom:28, maxWidth:620 }}>
          Built from your answers. Every line traces to a source; nothing here is set in stone — re-open any step or ask Pria to run a variant.
        </p>

        {/* Big receipt */}
        <div className="vh-up vh-d4" style={{
          borderRadius:'var(--vh-r-xl)', overflow:'hidden',
          border:'1px solid var(--vh-line)', background:'var(--vh-surface-100)', marginBottom:16,
        }}>
          <div style={{ padding:'28px 28px 22px', display:'flex', alignItems:'baseline', justifyContent:'space-between', borderBottom:'1px dashed var(--vh-line)' }}>
            <div>
              <div style={{ fontFamily:'var(--vh-font-mono)', fontSize:10, letterSpacing:'.18em', textTransform:'uppercase', color:'var(--vh-text-200)', marginBottom:6 }}>— TOTAL ESTIMATED</div>
              <div style={{ fontFamily:'var(--vh-font-mono)', fontWeight:500, fontSize:60, lineHeight:1,
                background:'linear-gradient(180deg, var(--vh-voltage-hot), var(--vh-voltage-deep))',
                WebkitBackgroundClip:'text', backgroundClip:'text', color:'transparent', letterSpacing:'-0.02em' }}>
                ₦{total.toLocaleString()}
              </div>
              <div style={{ fontFamily:'var(--vh-font-mono)', fontSize:10, letterSpacing:'.15em', textTransform:'uppercase', color:'var(--vh-text-300)', marginTop:8 }}>±15% CONFIDENCE · INCL. VAT, INSTALL, CONTINGENCY</div>
            </div>
          </div>
          <div style={{ padding:22, display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:0 }}>
            {[
              { k:'PAYBACK',       v: payM ? `${Math.floor(payM/12)}.${payM%12}y` : '—' },
              { k:'20-YR SAVINGS', v: monthlyGen ? `₦${(monthlyGen*12*20 - total).toLocaleString()}` : '—' },
              { k:'CO₂ AVOIDED',   v: `${Math.round(kw*1.4*20)} t` },
            ].map((m,i)=>(
              <div key={m.k} style={{ padding:'0 14px', borderLeft: i>0 ? '1px dashed var(--vh-line)' : 'none' }}>
                <div style={{ fontFamily:'var(--vh-font-mono)', fontSize:10, letterSpacing:'.18em', textTransform:'uppercase', color:'var(--vh-text-300)', marginBottom:6 }}>{m.k}</div>
                <div style={{ fontFamily:'var(--vh-font-mono)', fontSize:26, color:'var(--vh-text-000)', fontWeight:500, letterSpacing:'-0.01em' }}>{m.v}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Downloads */}
        <div className="vh-up vh-d5" style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:10, marginBottom:28 }}>
          {[
            { n:'01', t:'PDF report',    d:'12-page plan you can share or print.' },
            { n:'02', t:'Excel BOQ',     d:'Bill of quantities + 20-yr cashflow.' },
            { n:'03', t:'Gantt schedule',d:'Procurement to commissioning.' },
          ].map(c => (
            <div key={c.n} className="vh-tile" style={{ minHeight:150 }}>
              <div style={{ fontFamily:'var(--vh-font-mono)', fontSize:10, letterSpacing:'.18em', textTransform:'uppercase', color:'var(--vh-text-300)', marginBottom:14 }}>{c.n} / 03</div>
              <div style={{ fontFamily:'var(--vh-font-display)', fontSize:22, fontWeight:500, letterSpacing:'-0.02em', color:'var(--vh-text-000)', marginBottom:6 }}>{c.t}</div>
              <div style={{ fontFamily:'var(--vh-font-body)', fontSize:13, color:'var(--vh-text-200)', marginBottom:12 }}>{c.d}</div>
              <button className="vh-btn vh-btn-ghost" style={{ padding:'6px 0', fontSize:12.5, color:'var(--vh-voltage)' }}>
                Download <window.VH_Icon.IconDownload size={14}/>
              </button>
            </div>
          ))}
        </div>

        <div className="vh-up vh-d6 flex flex-wrap gap-3 items-center">
          <button className="vh-btn vh-btn-primary">Get quotes from 3 vetted installers <window.VH_Icon.IconArrowRight size={16}/></button>
          <button className="vh-btn vh-btn-secondary"><window.VH_Icon.IconShare size={14}/> Share plan</button>
          <button className="vh-btn vh-btn-ghost" onClick={onRestart}><window.VH_Icon.IconRefresh size={14}/> Start over</button>
        </div>
      </StepBody>
    );
  };

  Object.assign(window, {
    VH_HeroStep: HeroStep,
    VH_WhoStep: WhoStep,
    VH_LocationStep: LocationStep,
    VH_CurrentStep: CurrentStep,
    VH_DirectionStep: DirectionStep,
    VH_LoadStep: LoadStep,
    VH_RevealStep: RevealStep,
  });
})();
