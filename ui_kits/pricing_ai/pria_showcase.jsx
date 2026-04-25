// Volt Horizon — Pria agentic substrate SHOWCASE
// Five scenes demonstrating Pria as the operating layer of Pricing AI.

(() => {
  const { useState } = React;
  const { Pria_Orb, Pria_Icon, Pria_TypingLine, Pria_Composer, Pria_VoiceCard,
          Pria_VoiceButton, Pria_Helper, Pria_Added, Pria_Waveform } = window;

  // ---------- Small bits of chrome shared by scenes ----------
  const BrandBar = ({ step = 5, total = 7 }) => (
    <div style={{
      display:'flex', alignItems:'center', justifyContent:'space-between',
      padding:'14px 22px', borderBottom:'1px solid var(--vh-line)',
      background:'var(--vh-surface-000)',
    }}>
      <div style={{ display:'flex', alignItems:'center', gap: 10,
        fontFamily:'var(--vh-font-mono)', fontSize: 10, letterSpacing:'.18em',
        textTransform:'uppercase', color:'var(--vh-text-200)' }}>
        <svg width="22" height="22" viewBox="0 0 64 64" fill="none">
          <defs><linearGradient id="lg1" x1="0" y1="0" x2="64" y2="64"><stop offset="0" stopColor="#FF8A5C"/><stop offset="1" stopColor="#D94E1F"/></linearGradient></defs>
          <path d="M6 50 Q 32 6, 58 30" stroke="url(#lg1)" strokeWidth="4.5" strokeLinecap="round" fill="none"/>
          <path d="M34 22 L28 36 L36 36 L30 50" stroke="#F4F8FB" strokeWidth="3.2" strokeLinejoin="round" strokeLinecap="round" fill="none"/>
          <circle cx="6" cy="50" r="3" fill="#7BFFAB"/>
        </svg>
        <span style={{ fontFamily:'var(--vh-font-display)', fontSize: 14, color:'var(--vh-text-000)', textTransform:'none' }}>
          Pricing<span style={{ fontStyle:'italic', color:'var(--vh-voltage)' }}>AI</span>
        </span>
        <span style={{ color:'var(--vh-line-hot)' }}>·</span>
        <span>PRIA</span>
      </div>
      <div style={{ fontFamily:'var(--vh-font-mono)', fontSize: 10, letterSpacing:'.18em',
        textTransform:'uppercase', color:'var(--vh-text-200)' }}>STEP 0{step} / 0{total}</div>
    </div>
  );

  // ====================================================================
  // SHARED: Appliance grid and helper scene pieces
  // ====================================================================
  const LOADS = [
    { id:'fridge', name:'Refrigerator',   w:200, icon:'❄︎' },
    { id:'tv',     name:'TV',             w:120, icon:'▢'  },
    { id:'router', name:'Wi-Fi router',   w:15,  icon:'⟟'  },
    { id:'fan',    name:'Standing fan',   w:65,  icon:'✺'  },
    { id:'ac1',    name:'AC · 1 hp',      w:750, icon:'❖'  },
    { id:'kettle', name:'Electric kettle',w:1500,icon:'⧐'  },
    { id:'laptop', name:'Laptops × 2',    w:120, icon:'◫'  },
    { id:'lights', name:'LED lights',     w:80,  icon:'☀'  },
    { id:'iron',   name:'Pressing iron',  w:1100,icon:'△'  },
  ];
  const EXTRA_WELDER = { id:'welder', name:'Welder', w:2200, icon:'⚡', added: true };

  const ApplianceTile = ({ a, selected, glow }) => {
    const Body = (
      <div className="vh-tile" data-selected={selected} style={{
        padding: 14, minHeight: 94, display:'flex', flexDirection:'column', justifyContent:'space-between',
        textAlign:'left', position:'relative', ...(glow ? {} : {}),
      }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <span style={{ fontSize: 20, color:'var(--vh-voltage)' }}>{a.icon}</span>
          <span style={{
            fontFamily:'var(--vh-font-mono)', fontSize: 9, letterSpacing:'.16em',
            textTransform:'uppercase', color:'var(--vh-text-300)',
          }}>{a.w}W</span>
        </div>
        <div style={{ fontFamily:'var(--vh-font-body)', fontSize: 13.5, fontWeight: 500, color:'var(--vh-text-000)' }}>
          {a.name}
        </div>
      </div>
    );
    if (glow) return <Pria_Added label="ADDED BY PRIA">{Body}</Pria_Added>;
    return Body;
  };

  const StepFrame = ({ children, step = 5, total = 7, withVoiceBtn = false, voiceCard = null, width = 980, height = 820 }) => (
    <div style={{ width, height, background:'var(--vh-surface-000)', color:'var(--vh-text-000)',
      position:'relative', fontFamily:'var(--vh-font-body)', overflow:'hidden' }}>
      <BrandBar step={step} total={total}/>
      <div style={{ padding:'28px 36px 32px', height: 'calc(100% - 52px)', overflowY:'auto', position:'relative' }}>
        {children}
      </div>
      {withVoiceBtn && <Pria_VoiceButton onOpen={() => {}} />}
      {voiceCard}
    </div>
  );

  // ====================================================================
  // SCENE 1 — Intake 05 (Loads) · base with ambient Pria
  //   - ambient icon next to the step headline (collapsed)
  //   - a second icon below appliance grid, open as composer (empty)
  //   - form rescue card below, both chips visible
  //   - Welder tile (pria-added, glow still fading)
  // ====================================================================
  const Scene1 = () => (
    <StepFrame step={5}>
      <div style={{ display:'flex', alignItems:'center', gap: 14, flexWrap:'wrap',
        fontFamily:'var(--vh-font-mono)', fontSize: 10, letterSpacing:'.18em',
        textTransform:'uppercase', color:'var(--vh-text-200)', marginBottom: 14 }}>
        <span style={{ color:'var(--vh-voltage)' }}>—</span> 05 · WHAT DO YOU RUN
      </div>

      <div style={{ display:'flex', alignItems:'flex-start', gap: 22, marginBottom: 14 }}>
        <h2 style={{
          flex:1,
          fontFamily:'var(--vh-font-display)', fontWeight:300, letterSpacing:'-0.03em', lineHeight: 0.95,
          fontSize: 56, color:'var(--vh-text-000)', margin: 0, textWrap:'balance'
        }}>
          What do you <span style={{ fontStyle:'italic', fontWeight:500, color:'var(--vh-voltage)' }}>need</span> to run?
        </h2>
        <div style={{ paddingTop: 12 }}>
          <Pria_Icon size={28} invite="ask me anything about your energy switch →"/>
        </div>
      </div>
      <p style={{ color:'var(--vh-text-200)', fontSize: 14.5, lineHeight: 1.55, marginBottom: 24, maxWidth: 640 }}>
        Tap every appliance that matters. We'll size the inverter and battery from this, not from guesses.
      </p>

      {/* Grid */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap: 10 }}>
        {LOADS.map((a) => (
          <ApplianceTile key={a.id} a={a}
                         selected={['fridge','router','fan','laptop','lights'].includes(a.id)}/>
        ))}
        {/* AI-added tile */}
        <ApplianceTile a={EXTRA_WELDER} selected glow/>
      </div>

      {/* Second Pria icon below grid — open in composer (empty) */}
      <div style={{ marginTop: 22, display:'flex', alignItems:'flex-start', gap: 14 }}>
        <Pria_Composer value="" placeholder="tell Pria what to add to the form…" onClose={()=>{}} onChange={()=>{}}/>
      </div>

      {/* Helper card */}
      <Pria_Helper onDontUnderstand={()=>{}} onAddSomething={()=>{}}/>
    </StepFrame>
  );

  // ====================================================================
  // SCENE 2 — Intake 05 with voice card active (listening · bio waveform)
  // ====================================================================
  const Scene2 = () => {
    const voiceCard = (
      <Pria_VoiceCard state="listening"
        transcript="so, we run a welder on weekends, about four hours…"
        onClose={()=>{}} onMute={()=>{}} onEnd={()=>{}}/>
    );
    return (
      <StepFrame step={5} voiceCard={voiceCard}>
        <div style={{ display:'flex', alignItems:'center', gap: 14, flexWrap:'wrap',
          fontFamily:'var(--vh-font-mono)', fontSize: 10, letterSpacing:'.18em',
          textTransform:'uppercase', color:'var(--vh-text-200)', marginBottom: 14 }}>
          <span style={{ color:'var(--vh-voltage)' }}>—</span> 05 · WHAT DO YOU RUN
        </div>
        <h2 style={{
          fontFamily:'var(--vh-font-display)', fontWeight:300, letterSpacing:'-0.03em', lineHeight:0.95,
          fontSize: 56, margin: 0, marginBottom: 10
        }}>
          What do you <span style={{ fontStyle:'italic', fontWeight:500, color:'var(--vh-voltage)' }}>need</span> to run?
        </h2>
        <p style={{ color:'var(--vh-text-200)', fontSize: 14.5, marginBottom: 22, maxWidth: 620 }}>
          Speak or tap. Pria's listening in the corner — she'll add what she hears to the form.
        </p>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap: 10, marginBottom: 20 }}>
          {LOADS.map((a) => (
            <ApplianceTile key={a.id} a={a}
                           selected={['fridge','router','fan'].includes(a.id)}/>
          ))}
        </div>
        <Pria_Helper onDontUnderstand={()=>{}} onAddSomething={()=>{}}/>
      </StepFrame>
    );
  };

  // ====================================================================
  // SCENE 3 — Reveal page with three Pria icons in different states
  //   - collapsed with typing invitation next to total cost
  //   - open with streaming response about payback
  //   - idle icon in BOQ section
  // ====================================================================
  const RevealRow = ({ k, v }) => (
    <div style={{ display:'grid', gridTemplateColumns:'1fr auto', gap: 14,
      padding:'10px 0', borderBottom:'1px dashed var(--vh-line)',
      fontFamily:'var(--vh-font-body)', fontSize: 14 }}>
      <span style={{ color:'var(--vh-text-200)' }}>{k}</span>
      <span style={{ fontFamily:'var(--vh-font-mono)', color:'var(--vh-text-000)' }}>{v}</span>
    </div>
  );

  const Scene3 = () => (
    <StepFrame step={7}>
      <div style={{ fontFamily:'var(--vh-font-mono)', fontSize: 10, letterSpacing:'.18em',
        textTransform:'uppercase', color:'var(--vh-voltage)', marginBottom: 14,
        display:'flex', alignItems:'center', gap: 10 }}>
        <span className="vh-dot-voltage"/> YOUR PLAN IS READY
      </div>
      <h2 style={{ fontFamily:'var(--vh-font-display)', fontWeight: 300, letterSpacing:'-0.03em',
        lineHeight: 0.95, fontSize: 56, margin: 0, marginBottom: 24 }}>
        Your <span style={{ fontStyle:'italic', fontWeight: 500, color:'var(--vh-voltage)' }}>renewable</span> path.
      </h2>

      {/* Total cost card with Pria icon next to big number */}
      <div style={{
        background:'var(--vh-surface-100)', border:'1px solid var(--vh-line)',
        borderRadius: 'var(--vh-r-lg)', padding: 22, marginBottom: 16,
      }}>
        <div style={{ fontFamily:'var(--vh-font-mono)', fontSize: 10, letterSpacing:'.2em',
          textTransform:'uppercase', color:'var(--vh-text-300)', marginBottom: 6 }}>TOTAL · TURNKEY</div>
        <div style={{ display:'flex', alignItems:'center', gap: 16 }}>
          <div style={{ fontFamily:'var(--vh-font-mono)', fontWeight: 500, fontSize: 52,
            color:'var(--vh-text-000)', letterSpacing:'-0.01em', lineHeight: 1 }}>
            ₦9,280,000
          </div>
          <Pria_Icon size={28} invite="why this number? tap to ask" hideInviteAfter={0}/>
        </div>
        <div style={{ fontFamily:'var(--vh-font-mono)', fontSize: 10, letterSpacing:'.18em',
          textTransform:'uppercase', color:'var(--vh-text-200)', marginTop: 8 }}>
          PAYBACK · 2.6Y VS DIESEL · LOCKED TO JUNE 2026 PRICES
        </div>
      </div>

      {/* Open composer with streaming response — about payback */}
      <div style={{ marginBottom: 20 }}>
        <Pria_Composer
          value="why is the payback 2.6 years?"
          response={"Two and a half years is how long it takes the monthly savings (~₦312,000 vs diesel) to match the system's up-front cost. We use your declared 1,240 kWh/mo load, current diesel price ₦1,150/L, and conservative 4.4 peak sun-hours for Lekki. If diesel trends up, payback shortens."}
          onClose={()=>{}} onChange={()=>{}}
        />
      </div>

      {/* BOQ section */}
      <div style={{ background:'var(--vh-surface-100)', border:'1px solid var(--vh-line)',
        borderRadius:'var(--vh-r-lg)', padding: 22 }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom: 14 }}>
          <div style={{ fontFamily:'var(--vh-font-mono)', fontSize: 10, letterSpacing:'.2em',
            textTransform:'uppercase', color:'var(--vh-text-300)' }}>BILL OF QUANTITIES</div>
          <Pria_Icon size={24} hideInviteAfter={0}/>
        </div>
        <RevealRow k="8 × LONGi 550W monocrystalline panels" v="₦2,150,000"/>
        <RevealRow k="Deye 5kW hybrid inverter" v="₦1,480,000"/>
        <RevealRow k="15 kWh BYD LFP battery" v="₦3,600,000"/>
        <RevealRow k="Mounting · BOS · protections" v="₦860,000"/>
        <RevealRow k="Install · commissioning · VAT" v="₦1,190,000"/>
      </div>
    </StepFrame>
  );

  // ====================================================================
  // SCENE 4 — Voice card triptych: idle · listening · speaking
  // ====================================================================
  const TriptychCard = ({ state, label, transcript }) => (
    <div style={{ position:'relative', width: 360, height: 260,
      background:'var(--vh-surface-100)', border:'1px solid var(--vh-line)',
      borderRadius:'var(--vh-r-xl)', padding:'14px 16px',
      display:'flex', flexDirection:'column',
      boxShadow:'0 22px 56px -22px rgba(0,0,0,0.7)' }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
        <span className="pria-status">
          <span className="pria-status-dot" data-kind={
            state === 'listening' ? 'bio' : state === 'speaking' ? 'voltage' : state === 'thinking' ? 'think' : 'voltage'
          }/>
          {label}
        </span>
        <span style={{ fontFamily:'var(--vh-font-mono)', fontSize: 9, letterSpacing:'.2em',
          color:'var(--vh-text-300)' }}>{state === 'idle' ? '—' : '●'}</span>
      </div>
      <div style={{ flex: 1, display:'flex', alignItems:'center', justifyContent:'center', position:'relative' }}>
        <Pria_Waveform state={state}/>
        <div className="pria-big-orb" data-state={state}>
          <Pria_Orb size={96}/>
        </div>
      </div>
      <div style={{
        fontFamily:'var(--vh-font-mono)', fontSize: 12, color:'var(--vh-text-200)',
        textAlign:'center', minHeight: 16, marginBottom: 8,
        overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap',
      }}>{transcript}</div>
      <div style={{ display:'flex', justifyContent:'center', gap: 8 }}>
        <button className="pria-ghost-mini">MUTE</button>
        <button className="pria-ghost-mini">END</button>
      </div>
    </div>
  );

  const Scene4 = () => (
    <div style={{ width: 1240, height: 520, background:'var(--vh-surface-000)', color:'var(--vh-text-000)',
      position:'relative', padding:'28px 36px', display:'flex', flexDirection:'column', gap: 28 }}>
      <div>
        <div style={{ fontFamily:'var(--vh-font-mono)', fontSize: 10, letterSpacing:'.2em',
          textTransform:'uppercase', color:'var(--vh-voltage)' }}>— PRIA · VOICE CARD STATES</div>
        <h3 style={{ fontFamily:'var(--vh-font-display)', fontWeight: 300, fontSize: 32,
          letterSpacing:'-0.02em', margin: '6px 0 0' }}>
          One orb, <span style={{ fontStyle:'italic', color:'var(--vh-voltage)' }}>three moods</span>.
        </h3>
      </div>
      <div style={{ display:'flex', gap: 40, alignItems:'center', justifyContent:'center' }}>
        <TriptychCard state="idle"      label="IDLE"          transcript="…"/>
        <TriptychCard state="listening" label="LISTENING"     transcript="so, we run a welder on weekends…"/>
        <TriptychCard state="speaking"  label="PRIA SPEAKING" transcript="okay — I've added a 2.2 kW welder to your load."/>
      </div>
    </div>
  );

  // ====================================================================
  // SCENE 5 — Form rescue triptych: collapsed · composer open · tile added
  // ====================================================================
  const RescueFrame = ({ title, children }) => (
    <div style={{ width: 520, background:'var(--vh-surface-000)', border:'1px solid var(--vh-line)',
      borderRadius:'var(--vh-r-lg)', overflow:'hidden' }}>
      <div style={{ padding:'10px 16px', borderBottom:'1px solid var(--vh-line)',
        fontFamily:'var(--vh-font-mono)', fontSize: 10, letterSpacing:'.2em',
        textTransform:'uppercase', color:'var(--vh-text-300)',
        display:'flex', alignItems:'center', gap: 10 }}>
        <span style={{ color:'var(--vh-voltage)' }}>—</span> {title}
      </div>
      <div style={{ padding: 18 }}>{children}</div>
    </div>
  );

  const MiniGrid = ({ withWelder, withGlow }) => (
    <div style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap: 8, marginBottom: 14 }}>
      {LOADS.slice(0, 6).map((a) => (
        <ApplianceTile key={a.id} a={a} selected={['fridge','router','fan'].includes(a.id)}/>
      ))}
      {withWelder && <ApplianceTile a={EXTRA_WELDER} selected glow={withGlow}/>}
    </div>
  );

  const Scene5 = () => (
    <div style={{ width: 1720, height: 640, background:'var(--vh-surface-000)', color:'var(--vh-text-000)',
      padding:'28px 36px', display:'flex', flexDirection:'column', gap: 22 }}>
      <div>
        <div style={{ fontFamily:'var(--vh-font-mono)', fontSize: 10, letterSpacing:'.2em',
          textTransform:'uppercase', color:'var(--vh-voltage)' }}>— PRIA · FORM RESCUE INTERACTION</div>
        <h3 style={{ fontFamily:'var(--vh-font-display)', fontWeight: 300, fontSize: 32,
          letterSpacing:'-0.02em', margin: '6px 0 0' }}>
          The form is a <span style={{ fontStyle:'italic', color:'var(--vh-voltage)' }}>living surface.</span>
        </h3>
      </div>
      <div style={{ display:'flex', gap: 22, alignItems:'flex-start' }}>

        {/* 1 · Collapsed helper */}
        <RescueFrame title="01 · HELPER COLLAPSED">
          <MiniGrid/>
          <Pria_Helper onDontUnderstand={()=>{}} onAddSomething={()=>{}}/>
        </RescueFrame>

        {/* 2 · "Add something not listed" clicked — composer inline */}
        <RescueFrame title="02 · ADD SOMETHING NOT LISTED">
          <MiniGrid/>
          <Pria_Helper expanded>
            <Pria_Composer
              value="I run a welder on weekends, about 2.2 kW"
              placeholder="tell me what to add…"
              onClose={()=>{}} onChange={()=>{}}/>
          </Pria_Helper>
        </RescueFrame>

        {/* 3 · Pria added the welder tile */}
        <RescueFrame title="03 · PRIA ADDED IT">
          <MiniGrid withWelder withGlow/>
          <div style={{
            background:'var(--vh-surface-100)', border:'1px solid var(--vh-line)',
            borderRadius:'var(--vh-r-md)', padding:'12px 14px', display:'flex', alignItems:'center', gap: 10,
          }}>
            <Pria_Orb size={18}/>
            <span style={{ fontFamily:'var(--vh-font-mono)', fontSize: 11, letterSpacing:'.14em',
              textTransform:'uppercase', color:'var(--vh-text-200)' }}>
              added: <span style={{ color:'var(--vh-voltage)' }}>welder · 2200w</span>
            </span>
            <span style={{ marginLeft:'auto', fontFamily:'var(--vh-font-mono)', fontSize: 10,
              color:'var(--vh-text-300)', letterSpacing:'.18em', textTransform:'uppercase' }}>
              UNDO · EDIT
            </span>
          </div>
        </RescueFrame>

      </div>
    </div>
  );

  // ====================================================================
  // Canvas mount
  // ====================================================================
  const { DesignCanvas, DCSection, DCArtboard } = window;

  const App = () => (
    <DesignCanvas title="Pricing AI · Pria Agentic Substrate"
                  subtitle="Ambient invitations · inline composer · voice orb · form rescue">
      <DCSection id="intake" title="Intake · Loads" subtitle="Pria is present on every screen — not as chat, but as a substrate">
        <DCArtboard id="s1" label="01 · Loads with ambient Pria" width={980} height={820}>
          <Scene1/>
        </DCArtboard>
        <DCArtboard id="s2" label="02 · Loads with voice card active" width={980} height={820}>
          <Scene2/>
        </DCArtboard>
      </DCSection>

      <DCSection id="reveal" title="Reveal" subtitle="Three ambient icons in three states — collapsed, open, idle">
        <DCArtboard id="s3" label="03 · Reveal with three Pria states" width={980} height={820}>
          <Scene3/>
        </DCArtboard>
      </DCSection>

      <DCSection id="voice" title="Voice card · detail" subtitle="One orb, three moods — idle · listening · speaking">
        <DCArtboard id="s4" label="04 · Voice card triptych" width={1240} height={520}>
          <Scene4/>
        </DCArtboard>
      </DCSection>

      <DCSection id="rescue" title="Form rescue" subtitle="Pria extends the schema — the form itself changes">
        <DCArtboard id="s5" label="05 · Form rescue interaction" width={1720} height={640}>
          <Scene5/>
        </DCArtboard>
      </DCSection>
    </DesignCanvas>
  );

  ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
})();
