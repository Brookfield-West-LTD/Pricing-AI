// Volt Horizon — Pricing AI: shared chrome (top bar, shell, Pria bubble)
// Depends on React globals + lucide icons loaded via UMD as `window.lucide` (fallback to inline SVG when missing)

(() => {
  const { useEffect, useRef, useState } = React;

  // ---- Inline icon fallbacks (so we don't depend on lucide React UMD) ----
  const Icon = ({ d, size = 18, stroke = 2 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">
      {d}
    </svg>
  );
  const IconArrowRight = (p) => <Icon {...p} d={<><path d="M5 12h14"/><path d="M13 5l7 7-7 7"/></>} />;
  const IconArrowLeft  = (p) => <Icon {...p} d={<><path d="M19 12H5"/><path d="M11 5l-7 7 7 7"/></>} />;
  const IconCheck      = (p) => <Icon {...p} d={<path d="M4 12l5 5L20 6"/>} />;
  const IconPlus       = (p) => <Icon {...p} d={<><path d="M12 5v14"/><path d="M5 12h14"/></>} />;
  const IconMinus      = (p) => <Icon {...p} d={<path d="M5 12h14"/>} />;
  const IconPin        = (p) => <Icon {...p} d={<><path d="M12 22s8-7.58 8-13a8 8 0 10-16 0c0 5.42 8 13 8 13z"/><circle cx="12" cy="9" r="3"/></>} />;
  const IconDownload   = (p) => <Icon {...p} d={<><path d="M12 3v12"/><path d="M7 10l5 5 5-5"/><path d="M5 21h14"/></>} />;
  const IconShare      = (p) => <Icon {...p} d={<><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4"/><path d="M15.4 6.5l-6.8 4"/></>} />;
  const IconRefresh    = (p) => <Icon {...p} d={<><path d="M3 12a9 9 0 0115.5-6.3L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 01-15.5 6.3L3 16"/><path d="M3 21v-5h5"/></>} />;
  const IconSpark      = (p) => <Icon {...p} d={<><path d="M12 3v4"/><path d="M12 17v4"/><path d="M3 12h4"/><path d="M17 12h4"/><path d="M5.6 5.6l2.8 2.8"/><path d="M15.6 15.6l2.8 2.8"/><path d="M18.4 5.6l-2.8 2.8"/><path d="M8.4 15.6l-2.8 2.8"/></>} />;

  // ---- Top bar ----
  const TopBar = ({ step, total, onRestart }) => (
    <header className="w-full px-6 lg:px-10 py-4 flex items-center justify-between"
            style={{ borderBottom: '1px solid var(--vh-line)', background: 'var(--vh-surface-000)' }}>
      <div className="flex items-center gap-3" style={{ fontFamily: 'var(--vh-font-mono)', fontSize: 10, letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--vh-text-200)' }}>
        {/* logo */}
        <svg width="22" height="22" viewBox="0 0 64 64" fill="none" aria-hidden>
          <defs>
            <linearGradient id="tbg" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#FF8A5C"/><stop offset="1" stopColor="#D94E1F"/>
            </linearGradient>
          </defs>
          <path d="M6 50 Q 32 6, 58 30" stroke="url(#tbg)" strokeWidth="4.5" strokeLinecap="round" fill="none"/>
          <path d="M34 22 L28 36 L36 36 L30 50" stroke="#F4F8FB" strokeWidth="3.2" strokeLinejoin="round" strokeLinecap="round" fill="none"/>
          <circle cx="6" cy="50" r="3" fill="#7BFFAB"/>
        </svg>
        <span style={{ color: 'var(--vh-text-000)', fontFamily: 'var(--vh-font-display)', fontSize: 15, fontWeight: 300, letterSpacing: '-0.02em', textTransform: 'none' }}>
          Pricing<span style={{ fontStyle: 'italic', fontWeight: 500, color: 'var(--vh-voltage)' }}>AI</span>
          <span style={{ fontFamily: 'var(--vh-font-mono)', fontSize: 10, color: 'var(--vh-text-300)', marginLeft: 8 }}>.ng</span>
        </span>
        <span style={{ color: 'var(--vh-line-hot)' }}>·</span>
        <span>RESEARCH PREVIEW · NIGERIA</span>
      </div>
      <div className="flex items-center gap-4" style={{ fontFamily: 'var(--vh-font-mono)', fontSize: 10, letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--vh-text-200)' }}>
        <div className="hidden md:flex items-center gap-1">
          {Array.from({ length: total }).map((_, i) => (
            <div key={i} className="vh-step-dot" data-active={i === step - 1} data-done={i < step - 1} />
          ))}
        </div>
        <span>STEP {String(step).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>
        <button onClick={onRestart} className="vh-btn vh-btn-ghost" style={{ padding: '6px 10px' }}>
          <IconRefresh size={14}/> restart
        </button>
      </div>
    </header>
  );

  // ---- Pria avatar + speech bubble ----
  const Pria = ({ size = 44 }) => (
    <div className="vh-pria" style={{ width: size, height: size }} aria-label="Pria" />
  );

  const PriaSays = ({ children, delay = 0 }) => (
    <div className="flex items-start gap-3 vh-up" style={{ animationDelay: `${delay}s` }}>
      <Pria size={40} />
      <div style={{
        background: 'var(--vh-surface-100)',
        border: '1px solid var(--vh-line)',
        borderRadius: '6px 20px 20px 20px',
        padding: '12px 16px',
        maxWidth: 520,
        fontFamily: 'var(--vh-font-body)',
        fontSize: 14.5,
        lineHeight: 1.5,
        color: 'var(--vh-text-000)',
      }}>
        <div style={{ fontFamily: 'var(--vh-font-mono)', fontSize: 10, letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--vh-text-300)', marginBottom: 4 }}>PRIA</div>
        {children}
      </div>
    </div>
  );

  // ---- Step header (eyebrow + huge title + sub) ----
  const StepHeader = ({ eyebrow, children, sub }) => (
    <div>
      <div className="vh-up vh-d1" style={{ fontFamily: 'var(--vh-font-mono)', fontSize: 10, letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--vh-text-200)', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ color: 'var(--vh-voltage)' }}>—</span> {eyebrow}
      </div>
      <h2 className="vh-up vh-d2" style={{
        fontFamily: 'var(--vh-font-display)', fontWeight: 300, letterSpacing: '-0.03em', lineHeight: 0.95,
        fontSize: 'clamp(40px, 5vw, 68px)', color: 'var(--vh-text-000)', marginBottom: 14, textWrap: 'balance'
      }}>
        {children}
      </h2>
      {sub && (
        <p className="vh-up vh-d3" style={{
          fontFamily: 'var(--vh-font-body)', fontSize: 16, lineHeight: 1.55, color: 'var(--vh-text-200)',
          marginBottom: 28, maxWidth: 620,
        }}>{sub}</p>
      )}
    </div>
  );

  // ---- Footer nav ----
  const FooterNav = ({ onBack, onNext, canContinue, canContinueMsg }) => (
    <div className="sticky bottom-0" style={{
      background: 'linear-gradient(to top, var(--vh-surface-000), rgba(10,15,20,0.9) 70%, transparent)',
      backdropFilter: 'blur(10px)',
      borderTop: '1px solid var(--vh-line)',
      padding: '16px 24px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      zIndex: 10,
    }}>
      <button className="vh-btn vh-btn-ghost" onClick={onBack}>
        <IconArrowLeft size={16}/> Back
      </button>
      <div className="flex items-center gap-4">
        <span style={{ fontFamily: 'var(--vh-font-mono)', fontSize: 10, letterSpacing: '.18em', textTransform: 'uppercase', color: canContinue ? 'var(--vh-text-200)' : 'var(--vh-voltage-hot)' }} className="hidden md:inline">
          {canContinue ? '— READY WHEN YOU ARE' : canContinueMsg}
        </span>
        <button className="vh-btn vh-btn-primary" disabled={!canContinue} onClick={onNext}>
          Continue <IconArrowRight size={16}/>
        </button>
      </div>
    </div>
  );

  Object.assign(window, {
    VH_Icon: { IconArrowRight, IconArrowLeft, IconCheck, IconPlus, IconMinus, IconPin, IconDownload, IconShare, IconRefresh, IconSpark },
    VH_TopBar: TopBar,
    VH_Pria: Pria,
    VH_PriaSays: PriaSays,
    VH_StepHeader: StepHeader,
    VH_FooterNav: FooterNav,
  });
})();
