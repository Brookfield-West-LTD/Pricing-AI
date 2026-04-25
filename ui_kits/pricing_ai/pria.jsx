// Volt Horizon — Pria agentic substrate: React components
// Exports: window.Pria_Orb, Pria_Icon, Pria_Composer, Pria_Voice, Pria_Helper, Pria_AddedTile

(() => {
  const { useEffect, useState, useRef } = React;

  // ---------- Mini icons (inline) ----------
  const Svg = ({ d, size = 16, stroke = 2 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">{d}</svg>
  );
  const IconMic = (p) => <Svg {...p} d={<><rect x="9" y="3" width="6" height="12" rx="3"/><path d="M5 11a7 7 0 0014 0"/><path d="M12 18v3"/><path d="M9 21h6"/></>} />;
  const IconX   = (p) => <Svg {...p} d={<><path d="M6 6l12 12"/><path d="M18 6L6 18"/></>} />;
  const IconSparkle = (p) => <Svg {...p} d={<><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/></>} />;
  const IconSend = (p) => <Svg {...p} d={<><path d="M5 12l14-7-7 14-2-6z"/></>} />;
  const IconPlus = (p) => <Svg {...p} d={<><path d="M12 5v14"/><path d="M5 12h14"/></>} />;

  // ---------- Orb (reusable at any size) ----------
  const Orb = ({ size = 28, state, className = "" }) => {
    if (size >= 32 && window.VH_PriaOrbShader) {
      return (
        <div className={`pria-orb ${className}`} data-state={state}
             style={{ width:size, height:size, position:'relative', overflow:'hidden', animation:'none', background:'none' }}>
          <window.VH_PriaOrbShader size={size} state={state}/>
        </div>
      );
    }
    return <div className={`pria-orb ${className}`} data-state={state} style={{ width:size, height:size }}/>;
  };

  // ---------- Typing-invite string ----------
  const TypingLine = ({ text, speed = 40, delay = 0, done: doneProp }) => {
    const [out, setOut] = useState('');
    const [done, setDone] = useState(false);
    useEffect(() => {
      let cancelled = false;
      setOut(''); setDone(false);
      const t0 = setTimeout(() => {
        let i = 0;
        const tick = () => {
          if (cancelled) return;
          setOut(text.slice(0, i));
          if (i < text.length) { i++; setTimeout(tick, speed); }
          else { setDone(true); }
        };
        tick();
      }, delay);
      return () => { cancelled = true; clearTimeout(t0); };
    }, [text]);
    const isDone = doneProp != null ? doneProp : done;
    return <span className="pria-caret" data-done={isDone}>{out}</span>;
  };

  // ---------- Ambient Pria icon + invitation ----------
  //  collapsed mode: orb + halo + typing invitation (invitation fades after 6s)
  //  open: clicking opens the inline composer (parent handles state)
  const PriaIcon = ({
    size = 28, invite, inviteDone = false, hideInviteAfter = 6000,
    onOpen, align = 'right', state = 'idle'
  }) => {
    const [inviteHidden, setInviteHidden] = useState(false);
    const [hovered, setHovered] = useState(false);
    useEffect(() => {
      if (hideInviteAfter === 0) return;
      const t = setTimeout(() => setInviteHidden(true), hideInviteAfter);
      return () => clearTimeout(t);
    }, [hideInviteAfter]);
    const visible = !inviteHidden || hovered;
    return (
      <span
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{ display:'inline-flex', alignItems:'center', gap: 10, flexDirection: align === 'left' ? 'row-reverse' : 'row' }}
      >
        <span className="pria-halo" onClick={onOpen} style={{ cursor: 'pointer' }}>
          <Orb size={size} state={state}/>
        </span>
        {invite && (
          <span className="pria-invite" data-hidden={!visible}>
            {visible && <TypingLine key={hovered ? 'h' : 'v'} text={invite} speed={40} done={inviteDone}/>}
          </span>
        )}
      </span>
    );
  };

  // ---------- Inline composer pill ----------
  //  states: collapsed (icon only, handled by PriaIcon)
  //          open_empty (pill) — `response` prop null/undefined
  //          open_with_response (pill + response card) — `response` provided
  const PriaComposer = ({ value = '', placeholder = 'ask Pria…', response, onClose, onChange, onSubmit, onMic }) => {
    return (
      <div style={{ display:'inline-block' }}>
        <div className="pria-pill">
          <Orb size={24}/>
          <input
            autoFocus
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') onSubmit?.(value); }}
          />
          <button className="pria-pill-btn pria-pill-btn-mic" aria-label="voice" onClick={onMic}>
            <IconMic size={15}/>
          </button>
          <button className="pria-pill-btn" aria-label="close" onClick={onClose}>
            <IconX size={14}/>
          </button>
        </div>
        {response && (
          <div className="pria-response">
            <button className="pria-response-close" onClick={onClose}><IconX size={9}/> close</button>
            <div style={{ display:'flex', alignItems:'center', gap: 8, marginBottom: 10,
              fontFamily:'var(--vh-font-mono)', fontSize: 10, letterSpacing:'.18em', textTransform:'uppercase', color:'var(--vh-text-300)' }}>
              <Orb size={14}/> PRIA · STREAMING
            </div>
            <div>
              {typeof response === 'string' ? (
                <TypingLine text={response} speed={14}/>
              ) : response}
            </div>
          </div>
        )}
      </div>
    );
  };

  // ---------- Waveform ring ----------
  const Waveform = ({ bars = 42, state = 'idle' }) => {
    const items = Array.from({ length: bars });
    return (
      <div className="pria-waveform" data-state={state}>
        {items.map((_, i) => {
          const rot = (360 / bars) * i;
          // deterministic pseudo-amplitude for each bar based on state + index
          const amp = state === 'idle'
            ? 0.6
            : 1.1 + (Math.sin(i * 0.7) + Math.sin(i * 0.31)) * 0.6 + (state === 'speaking' ? 0.8 : 0.4);
          const delay = (i * 42) % 900;
          return (
            <span key={i} className="pria-wave-bar"
                  style={{ '--rot': `${rot}deg`, '--amp': amp, animationDelay: `${delay}ms` }}/>
          );
        })}
      </div>
    );
  };

  // ---------- Voice card ----------
  //  state: 'idle' (still uses Orb), 'listening' (bio), 'speaking' (voltage), 'thinking'
  //  transcript: live line below orb
  const PriaVoiceCard = ({ state = 'listening', transcript = '', onClose, onMute, onEnd }) => {
    const statusMap = {
      listening: { label: 'LISTENING',     dot: 'bio' },
      speaking:  { label: 'PRIA SPEAKING', dot: 'voltage' },
      thinking:  { label: 'THINKING',      dot: 'think' },
      idle:      { label: 'IDLE',          dot: 'voltage' },
    };
    const status = statusMap[state] || statusMap.idle;
    return (
      <div className="pria-voice-card">
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
          <span className="pria-status">
            <span className="pria-status-dot" data-kind={status.dot}/>
            {state === 'thinking' ? (
              <>THINKING <span className="pria-think-dots"><span/><span/><span/></span></>
            ) : status.label}
          </span>
          <button className="pria-pill-btn" onClick={onClose} style={{ width: 28, height: 28 }} aria-label="close">
            <IconX size={12}/>
          </button>
        </div>

        <div style={{ flex: 1, display:'flex', alignItems:'center', justifyContent:'center', position:'relative', minHeight: 0 }}>
          <Waveform state={state}/>
          <div className="pria-big-orb" data-state={state}>
            <Orb size={96}/>
          </div>
        </div>

        <div style={{
          fontFamily:'var(--vh-font-mono)', fontSize: 12, color:'var(--vh-text-200)',
          textAlign:'center', minHeight: 16, marginBottom: 8,
          overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap',
        }}>{transcript || '…'}</div>

        <div style={{ display:'flex', justifyContent:'center', gap: 8 }}>
          <button className="pria-ghost-mini" onClick={onMute}>MUTE</button>
          <button className="pria-ghost-mini" onClick={onEnd}>END</button>
        </div>
      </div>
    );
  };

  // ---------- Idle voice button ----------
  const PriaVoiceButton = ({ onOpen }) => (
    <button className="pria-voice-btn" onClick={onOpen} aria-label="Talk to Pria">
      <Orb size={56}/>
      <span className="pria-voice-btn-label">TALK TO PRIA</span>
    </button>
  );

  // ---------- Form rescue helper card ----------
  const PriaHelper = ({ onDontUnderstand, onAddSomething, expanded, children }) => (
    <div className="pria-helper">
      <div style={{ display:'flex', alignItems:'center', gap: 12, flexWrap:'wrap' }}>
        <Orb size={20}/>
        <span style={{
          fontFamily:'var(--vh-font-mono)', fontSize: 10, letterSpacing:'.2em', textTransform:'uppercase',
          color:'var(--vh-text-300)', marginRight: 'auto',
        }}>
          PRIA IS HERE IF YOU NEED HER
        </span>
        {!expanded && (
          <>
            <button className="pria-chip" onClick={onDontUnderstand}>
              <IconSparkle size={13}/> Don't understand this step?
            </button>
            <button className="pria-chip" onClick={onAddSomething}>
              <IconPlus size={13}/> Add something not listed
            </button>
          </>
        )}
      </div>
      {expanded && (
        <div style={{ marginTop: 14 }}>
          {children}
        </div>
      )}
    </div>
  );

  // ---------- Pria-added tile signature wrapper ----------
  const PriaAdded = ({ children, label = 'Added by Pria', style }) => (
    <div className="pria-added" style={style}>
      <div style={{ position:'absolute', top: 8, left: 10, zIndex: 2 }}>
        <span className="pria-added-tag">
          <Orb size={10}/> {label}
        </span>
      </div>
      {children}
    </div>
  );

  Object.assign(window, {
    Pria_Orb: Orb,
    Pria_Icon: PriaIcon,
    Pria_TypingLine: TypingLine,
    Pria_Composer: PriaComposer,
    Pria_VoiceCard: PriaVoiceCard,
    Pria_VoiceButton: PriaVoiceButton,
    Pria_Helper: PriaHelper,
    Pria_Added: PriaAdded,
    Pria_Waveform: Waveform,
  });
})();
