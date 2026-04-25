// Volt Horizon — Phase 1 · Adaptive sequencing
// Exports: ContextEngineDiagram, BillConfirmation, DiagnosticStep, SkipNotice

(() => {
  const { useEffect, useState, useRef } = React;
  const { Pria_Orb, Pria_Icon, Pria_TypingLine, Pria_Composer } = window;

  // ───────── tiny icons ─────────
  const I = (d, size = 14, sw = 1.6) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">{d}</svg>
  );
  const IconBolt    = (p = {}) => I(<path d="M13 2L3 14h7l-1 8 11-14h-7l1-6z"/>, p.size || 14);
  const IconCheck   = (p = {}) => I(<path d="M5 13l4 4L19 7"/>, p.size || 14);
  const IconPencil  = (p = {}) => I(<><path d="M4 20h4L20 8l-4-4L4 16v4z"/><path d="M14 6l4 4"/></>, p.size || 13);
  const IconRefresh = (p = {}) => I(<><path d="M3 12a9 9 0 0116-5l2-2"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 01-16 5l-2 2"/><path d="M3 21v-5h5"/></>, p.size || 13);
  const IconMic     = (p = {}) => I(<><rect x="9" y="3" width="6" height="12" rx="3"/><path d="M5 11a7 7 0 0014 0"/><path d="M12 18v3"/><path d="M9 21h6"/></>, p.size || 13);
  const IconDoc     = (p = {}) => I(<><path d="M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8z"/><path d="M14 3v5h5"/></>, p.size || 14);
  const IconWifi    = (p = {}) => I(<><path d="M2 9a16 16 0 0120 0"/><path d="M5 12.5a11 11 0 0114 0"/><path d="M8.5 16a6 6 0 017 0"/><circle cx="12" cy="19" r="1" fill="currentColor" stroke="none"/></>, p.size || 14);
  const IconArrow   = (p = {}) => I(<><path d="M5 12h14"/><path d="M13 6l6 6-6 6"/></>, p.size || 14);

  // ═══════════════════════════════════════════════════════════════════
  // 1 · CONTEXT ENGINE DIAGRAM
  //    Editorial decision tree — not a dev flowchart.
  //    Pria centered; three "signals" radiate in; three "outcomes" radiate out.
  // ═══════════════════════════════════════════════════════════════════

  // Foreign-object card inside the SVG — lets us keep the HTML node styling consistent.
  const FOCard = ({ x, y, w, h, children }) => (
    <foreignObject x={x} y={y} width={w} height={h} style={{ overflow: 'visible' }}>
      <div xmlns="http://www.w3.org/1999/xhtml" style={{ width: w, height: h }}>
        {children}
      </div>
    </foreignObject>
  );

  const ContextEngineDiagram = () => {
    // Canvas is 1120 × 720.  Center node for Pria at (560, 360).
    // Signal nodes (left column) feed in; outcome nodes (right column) feed out.
    // Using orthogonal curved paths for an editorial feel.
    const cx = 560, cy = 360;

    const signals = [
      { y: 230, label: 'NEPA bill uploaded', body: 'We now know your kWh, tariff band, DisCo.', icon: <IconDoc/> },
      { y: 360, label: '"Help me choose" on direction', body: 'The standard 4-pill step won\'t converge.', icon: <IconBolt/> },
      { y: 490, label: 'Mobile · spotty network', body: 'Bandwidth is fragile; inputs are slow.', icon: <IconWifi/> },
    ];
    const outcomes = [
      { y: 230, op: 'PRUNE',    opClass: 'ce-op-prune',    label: 'Skip appliance picker',       body: 'Reason: we extracted load already.', icon: <IconCheck/> },
      { y: 360, op: 'INJECT',   opClass: 'ce-op-inject',   label: 'Diagnostic conversation',     body: 'A 3-question chat replaces the picker.', icon: <IconBolt/> },
      { y: 490, op: 'COMPRESS', opClass: 'ce-op-compress', label: 'Flow compressed · 7 → 4',     body: 'Merge optional steps. Save drafts locally.', icon: <IconArrow/> },
    ];

    // Build a cubic-bezier path between two endpoints (horizontal tangent).
    const curve = (x1, y1, x2, y2) => {
      const midX = (x1 + x2) / 2;
      return `M ${x1} ${y1} C ${midX} ${y1}, ${midX} ${y2}, ${x2} ${y2}`;
    };

    return (
      <div className="ce-board" style={{
        width: 1120, height: 720, borderRadius: 20, border: '1px solid var(--vh-line)',
        position: 'relative',
      }}>
        {/* bloom behind Pria */}
        <div className="ce-bloom" style={{ left: cx - 240, top: cy - 240 }}/>

        {/* headline eyebrow */}
        <div style={{
          position: 'absolute', top: 28, left: 36,
          fontFamily: 'var(--vh-font-mono)', fontSize: 10, letterSpacing: '.26em',
          textTransform: 'uppercase', color: 'var(--vh-text-300)',
        }}>
          <span style={{ color: 'var(--vh-voltage)' }}>◆</span> THE CONTEXT ENGINE
        </div>
        <div style={{
          position: 'absolute', top: 56, left: 36, maxWidth: 440,
          fontFamily: 'var(--vh-font-display)', fontWeight: 300, fontSize: 30, letterSpacing: '-0.02em',
          color: 'var(--vh-text-000)', lineHeight: 1.05,
        }}>
          Pria listens to <em style={{ fontStyle: 'italic', fontWeight: 500, color: 'var(--vh-voltage)' }}>signals</em>,
          then prunes, injects, or compresses the flow.
        </div>
        <div style={{
          position: 'absolute', top: 140, left: 36, maxWidth: 380,
          fontFamily: 'var(--vh-font-body)', fontSize: 13, color: 'var(--vh-text-200)', lineHeight: 1.5,
        }}>
          Two users never take the same path. The intake <b style={{ color: 'var(--vh-text-100)' }}>reshapes itself</b> around what we already know about you.
        </div>

        {/* Column headers */}
        <div style={{ position: 'absolute', left: 50, top: 220, fontFamily: 'var(--vh-font-mono)', fontSize: 9, letterSpacing: '.26em', textTransform: 'uppercase', color: 'var(--vh-text-300)' }}>
          SIGNALS &nbsp;<span style={{ color: 'var(--vh-text-200)' }}>(what we observe)</span>
        </div>
        <div style={{ position: 'absolute', right: 50, top: 220, fontFamily: 'var(--vh-font-mono)', fontSize: 9, letterSpacing: '.26em', textTransform: 'uppercase', color: 'var(--vh-text-300)', textAlign: 'right' }}>
          <span style={{ color: 'var(--vh-text-200)' }}>(what we do) </span>&nbsp;OUTCOMES
        </div>

        {/* SVG layer: curves + packets + center node */}
        <svg viewBox="0 0 1120 720" width="1120" height="720"
             style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <defs>
            <linearGradient id="ce-grad-in" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%"  stopColor="var(--vh-horizon)" stopOpacity="0.15"/>
              <stop offset="100%" stopColor="var(--vh-voltage)"/>
            </linearGradient>
            <linearGradient id="ce-grad-out" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%"  stopColor="var(--vh-voltage)"/>
              <stop offset="100%" stopColor="var(--vh-bio)"/>
            </linearGradient>
          </defs>

          {/* Incoming signals (left → center) */}
          {signals.map((s, i) => {
            const x1 = 360, y1 = s.y + 42;
            const x2 = cx - 74, y2 = cy;
            const d = curve(x1, y1, x2, y2);
            return (
              <g key={i}>
                <path d={d} stroke="url(#ce-grad-in)" className="ce-path"/>
                <circle r="3" fill="var(--vh-voltage)">
                  <animateMotion dur={`${3.4 + i * 0.3}s`} repeatCount="indefinite" path={d}/>
                  <animate attributeName="opacity" values="0;1;1;0" dur={`${3.4 + i * 0.3}s`} repeatCount="indefinite"/>
                </circle>
              </g>
            );
          })}
          {/* Outgoing outcomes (center → right) */}
          {outcomes.map((o, i) => {
            const x1 = cx + 74, y1 = cy;
            const x2 = 760, y2 = o.y + 42;
            const d = curve(x1, y1, x2, y2);
            return (
              <g key={i}>
                <path d={d} stroke="url(#ce-grad-out)" className="ce-path"/>
                <circle r="3" fill="var(--vh-bio)">
                  <animateMotion dur={`${3.2 + i * 0.25}s`} begin={`${0.8 + i * 0.2}s`} repeatCount="indefinite" path={d}/>
                  <animate attributeName="opacity" values="0;1;1;0" dur={`${3.2 + i * 0.25}s`} begin={`${0.8 + i * 0.2}s`} repeatCount="indefinite"/>
                </circle>
              </g>
            );
          })}
        </svg>

        {/* signal cards */}
        {signals.map((s, i) => (
          <div key={i} style={{ position: 'absolute', left: 50, top: s.y, width: 308 }}>
            <div className="ce-node" data-kind="signal">
              <div className="ce-node-kind">
                <span style={{ color: 'var(--vh-voltage)' }}>{s.icon}</span>
                SIGNAL · 0{i + 1}
              </div>
              <div style={{ fontWeight: 600, color: 'var(--vh-text-000)', fontSize: 14 }}>{s.label}</div>
              <div style={{ color: 'var(--vh-text-200)', marginTop: 2 }}>{s.body}</div>
            </div>
          </div>
        ))}

        {/* outcome cards */}
        {outcomes.map((o, i) => (
          <div key={i} style={{ position: 'absolute', left: 760, top: o.y, width: 308 }}>
            <div className="ce-node" data-kind="outcome">
              <div className="ce-node-kind" style={{ justifyContent: 'space-between' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ color: 'var(--vh-bio)' }}>{o.icon}</span>
                  OUTCOME · 0{i + 1}
                </span>
                <span className={`ce-op ${o.opClass}`}>{o.op}</span>
              </div>
              <div style={{ fontWeight: 600, color: 'var(--vh-text-000)', fontSize: 14 }}>{o.label}</div>
              <div style={{ color: 'var(--vh-text-200)', marginTop: 2 }}>{o.body}</div>
            </div>
          </div>
        ))}

        {/* Central Pria node */}
        <div style={{
          position: 'absolute', left: cx - 110, top: cy - 70, width: 220,
          textAlign: 'center',
        }}>
          <div className="pria-halo" style={{ display: 'inline-block' }}>
            <Pria_Orb size={74}/>
          </div>
          <div style={{
            marginTop: 10,
            fontFamily: 'var(--vh-font-mono)', fontSize: 9.5, letterSpacing: '.26em', textTransform: 'uppercase',
            color: 'var(--vh-voltage)',
          }}>PRIA · CONTEXT ENGINE</div>
          <div style={{
            fontFamily: 'var(--vh-font-body)', fontSize: 12.5, color: 'var(--vh-text-200)', marginTop: 4, lineHeight: 1.4,
          }}>
            evaluates on every step
          </div>
        </div>

        {/* footer — reading key */}
        <div style={{
          position: 'absolute', bottom: 28, left: 36, right: 36,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          fontFamily: 'var(--vh-font-mono)', fontSize: 9.5, letterSpacing: '.2em',
          textTransform: 'uppercase', color: 'var(--vh-text-300)',
        }}>
          <span>READ LEFT → RIGHT · signals arrive, outcomes leave</span>
          <span style={{ display: 'inline-flex', gap: 18, alignItems: 'center' }}>
            <span><span className="ce-op ce-op-prune" style={{ marginRight: 6 }}>PRUNE</span>skip a step</span>
            <span><span className="ce-op ce-op-inject" style={{ marginRight: 6 }}>INJECT</span>replace with something better</span>
            <span><span className="ce-op ce-op-compress" style={{ marginRight: 6 }}>COMPRESS</span>fold optional steps</span>
          </span>
        </div>
      </div>
    );
  };

  // ═══════════════════════════════════════════════════════════════════
  // 2 · BILL UPLOAD CONFIRMATION
  //    Left: small preview of uploaded bill (hand-drawn paper style)
  //    Right: 4 metric cards · each with inline edit · rerun signal when edited
  // ═══════════════════════════════════════════════════════════════════

  const BillPreview = () => (
    <div className="bill-preview" style={{ width: 360 }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
        paddingBottom: 12, borderBottom: '1px solid var(--vh-line)', marginBottom: 14,
      }}>
        <div>
          <div style={{
            fontFamily: 'var(--vh-font-display)', fontWeight: 500, fontSize: 18, letterSpacing: '-0.02em',
            color: 'var(--vh-text-000)',
          }}>IKEDC</div>
          <div style={{ fontFamily: 'var(--vh-font-mono)', fontSize: 9, letterSpacing: '.22em', color: 'var(--vh-text-300)' }}>
            IKEJA ELECTRIC · FEEDER 33/11 KV
          </div>
        </div>
        <div style={{
          fontFamily: 'var(--vh-font-mono)', fontSize: 9, letterSpacing: '.2em', textTransform: 'uppercase',
          color: 'var(--vh-text-300)', textAlign: 'right', lineHeight: 1.5,
        }}>
          METER · 45221067893<br/>
          CYCLE · MAR 2026
        </div>
      </div>

      {/* Customer */}
      <div style={{ fontFamily: 'var(--vh-font-body)', fontSize: 12.5, color: 'var(--vh-text-200)', lineHeight: 1.5 }}>
        Customer · A. Okonkwo<br/>
        14 Adeola Odeku St., Victoria Island<br/>
        Lagos, Nigeria
      </div>

      <div style={{
        marginTop: 18, padding: '14px 0',
        borderTop: '1px dashed var(--vh-line)', borderBottom: '1px dashed var(--vh-line)',
        display: 'grid', gridTemplateColumns: '1fr auto', rowGap: 8, fontSize: 13,
        fontFamily: 'var(--vh-font-body)', color: 'var(--vh-text-100)',
      }}>
        <span>Units consumed</span>
        <span style={{ fontFamily: 'var(--vh-font-mono)' }}>
          <span className="bill-field-highlight">486 kWh</span>
        </span>
        <span>Tariff band</span>
        <span style={{ fontFamily: 'var(--vh-font-mono)' }}>
          <span className="bill-field-highlight">Band B</span>
        </span>
        <span>Unit rate</span>
        <span style={{ fontFamily: 'var(--vh-font-mono)' }}>₦62.33 / kWh</span>
        <span>VAT (7.5%)</span>
        <span style={{ fontFamily: 'var(--vh-font-mono)' }}>₦2,272</span>
      </div>

      <div style={{
        marginTop: 18, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
      }}>
        <div style={{
          fontFamily: 'var(--vh-font-mono)', fontSize: 9, letterSpacing: '.22em',
          textTransform: 'uppercase', color: 'var(--vh-text-300)',
        }}>AMOUNT DUE</div>
        <div style={{
          fontFamily: 'var(--vh-font-mono)', fontWeight: 500, fontSize: 24, color: 'var(--vh-text-000)',
        }}>
          <span className="bill-field-highlight">₦32,565</span>
        </div>
      </div>

      <div style={{
        marginTop: 22, paddingTop: 14, borderTop: '1px solid var(--vh-line)',
        fontFamily: 'var(--vh-font-mono)', fontSize: 8.5, letterSpacing: '.2em',
        textTransform: 'uppercase', color: 'var(--vh-text-300)', lineHeight: 1.6,
      }}>
        THIS BILL IS GENERATED PER NERC ORDER/2024/002<br/>
        PAY AT ANY BANK · QUICKTELLER · IKEDC.COM · *329#
      </div>
    </div>
  );

  // edit-state lives inside the component so the glow feels alive
  const MetricCard = ({ kind, label, value, sub, initiallyEditing = false }) => {
    const [editing, setEditing]     = useState(initiallyEditing);
    const [rerunning, setRerunning] = useState(false);
    const [val, setVal]             = useState(value);
    const startEdit = () => { setEditing(true); setRerunning(false); };
    const commit = (v) => {
      setVal(v); setEditing(false); setRerunning(true);
      setTimeout(() => setRerunning(false), 1600);
    };
    return (
      <div className="metric-card"
           data-editing={editing || undefined}
           data-rerunning={rerunning || undefined}
           style={{ width: 240 }}>
        <div className="metric-kind">
          <span style={{
            width: 6, height: 6, borderRadius: 2, background: 'var(--vh-voltage)',
            boxShadow: '0 0 6px var(--vh-voltage)',
          }}/>
          {kind}
        </div>
        {editing ? (
          <input
            autoFocus
            defaultValue={val}
            onBlur={(e) => commit(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') commit(e.target.value); }}
            style={{
              background: 'transparent', border: 0, outline: 0, width: '100%',
              fontFamily: 'var(--vh-font-mono)', fontWeight: 500, fontSize: 30,
              color: 'var(--vh-text-000)', letterSpacing: '-0.01em',
              borderBottom: '1px solid var(--vh-voltage)', padding: '0 0 2px',
            }}
          />
        ) : (
          <div className="metric-value">{val}</div>
        )}
        <div className="metric-sub">{label}</div>
        {sub && (
          <div style={{ fontFamily: 'var(--vh-font-mono)', fontSize: 10, color: 'var(--vh-text-300)',
                        letterSpacing: '.14em', textTransform: 'uppercase', marginTop: 4 }}>
            {sub}
          </div>
        )}
        <span className="metric-edit" onClick={startEdit}>
          <IconPencil/> edit
        </span>
      </div>
    );
  };

  const BillConfirmation = ({ showSkipNotice = true, metricMode = 'default' }) => {
    // three demo states: 'default' (clean), 'editing' (tariff mid-edit), 'rerun' (after commit)
    const editingIdx = metricMode === 'editing' ? 1 : -1;
    return (
      <div style={{
        width: 1120, padding: '48px 56px',
        position: 'relative',
        background: 'var(--vh-surface-000)',
        borderRadius: 20, border: '1px solid var(--vh-line)',
      }}>
        {/* Skip notice (persistent for the showcase) */}
        {showSkipNotice && (
          <div style={{ position: 'absolute', top: 24, left: '50%', transform: 'translateX(-50%)' }}>
            <div className="skip-notice" data-frozen="true">
              <Pria_Orb size={16}/>
              <span>
                <b>Pria skipped the appliance step</b> — we already have what we need from your bill.
              </span>
              <span className="skip-notice-close">×</span>
            </div>
          </div>
        )}

        {/* Step meta */}
        <div style={{
          marginTop: 48,
          fontFamily: 'var(--vh-font-mono)', fontSize: 10, letterSpacing: '.26em',
          textTransform: 'uppercase', color: 'var(--vh-voltage)',
          display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <Pria_Orb size={12}/> STEP 3 · INJECTED BY PRIA
        </div>

        <h1 style={{
          fontFamily: 'var(--vh-font-display)', fontWeight: 300, letterSpacing: '-0.02em',
          fontSize: 54, lineHeight: 1, color: 'var(--vh-text-000)', margin: '12px 0 8px',
          maxWidth: 800,
        }}>
          Does this look <em style={{ fontStyle: 'italic', fontWeight: 500, color: 'var(--vh-voltage)' }}>right</em>?
        </h1>
        <p style={{
          fontFamily: 'var(--vh-font-body)', fontSize: 15, color: 'var(--vh-text-200)',
          maxWidth: 540, lineHeight: 1.55, marginBottom: 36,
        }}>
          I read your NEPA bill and pulled the four numbers I need. If anything's off, tap <b style={{ color: 'var(--vh-text-100)' }}>edit</b> — I'll recompute the plan live.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '360px 1fr', gap: 48, alignItems: 'start' }}>
          {/* Left: bill */}
          <div>
            <div style={{
              fontFamily: 'var(--vh-font-mono)', fontSize: 9, letterSpacing: '.22em',
              textTransform: 'uppercase', color: 'var(--vh-text-300)', marginBottom: 10,
            }}>UPLOADED · march_2026_bill.pdf</div>
            <BillPreview/>
          </div>

          {/* Right: extracted */}
          <div>
            <div style={{
              fontFamily: 'var(--vh-font-mono)', fontSize: 9, letterSpacing: '.22em',
              textTransform: 'uppercase', color: 'var(--vh-voltage)', marginBottom: 10,
              display: 'flex', alignItems: 'center', gap: 8,
            }}>
              <Pria_Orb size={10}/> PRIA EXTRACTED
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <MetricCard kind="MONTHLY CONSUMPTION" label="30-day average"    value="486 kWh"  sub="last 6 billing cycles"/>
              <MetricCard kind="TARIFF BAND"         label="NERC band"         value="BAND B"   sub="20hr+ supply · ₦62.33/kWh"
                          initiallyEditing={editingIdx === 1}/>
              <MetricCard kind="DISCO"               label="Distribution co."  value="IKEDC"    sub="feeder · Victoria Island"/>
              <MetricCard kind="MONTHLY COST"        label="Including VAT"     value="₦32,565"  sub="derived from the three above"/>
            </div>

            {/* rerun banner — only in 'rerun' metricMode */}
            {metricMode === 'rerun' && (
              <div style={{ marginTop: 18 }}>
                <div className="rerun-banner">
                  <Pria_Orb size={12}/>
                  <span>PRIA IS RE-COMPUTING YOUR PLAN</span>
                  <span className="rerun-bar"/>
                  <span>~ 2s</span>
                </div>
              </div>
            )}

            {/* confirm / reject actions */}
            <div style={{
              marginTop: 28, display: 'flex', gap: 12, alignItems: 'center',
            }}>
              <button style={{
                background: 'var(--vh-voltage)', color: 'var(--vh-void)',
                border: 0, borderRadius: 999, padding: '14px 22px',
                fontFamily: 'var(--vh-font-body)', fontWeight: 600, fontSize: 14,
                letterSpacing: '.02em', display: 'inline-flex', alignItems: 'center', gap: 8,
                cursor: 'pointer',
              }}>
                Looks right <IconArrow/>
              </button>
              <button style={{
                background: 'transparent', color: 'var(--vh-text-100)',
                border: '1px solid var(--vh-line)', borderRadius: 999, padding: '13px 20px',
                fontFamily: 'var(--vh-font-body)', fontWeight: 500, fontSize: 14, cursor: 'pointer',
              }}>
                Something's off
              </button>
              <span style={{
                marginLeft: 'auto',
                fontFamily: 'var(--vh-font-mono)', fontSize: 10, letterSpacing: '.2em',
                textTransform: 'uppercase', color: 'var(--vh-text-300)',
                display: 'inline-flex', alignItems: 'center', gap: 6,
              }}>
                <IconRefresh size={11}/> AUTO-RE-RUN ON EDIT
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ═══════════════════════════════════════════════════════════════════
  // 3 · DIAGNOSTIC CONVERSATION
  //    Replaces the 4-pill direction picker for uncertain users.
  //    Stage values: 'q1-open' | 'q2-open' | 'q3-open' | 'verdict'
  // ═══════════════════════════════════════════════════════════════════

  const DiagnosticStep = ({ stage = 'verdict' }) => {
    const stages = ['q1', 'q2', 'q3', 'verdict'];
    const idx = stage === 'verdict' ? 3 : (stage === 'q3-open' ? 2 : stage === 'q2-open' ? 1 : 0);

    // Show history of all completed + current question.
    const dialog = [
      {
        kind: 'Q · 1 OF 3',
        prompt: 'When you lose power at night, what\'s the first thing that stops working and actually matters?',
        options: ['Lights & fans', 'Fridge & freezer', 'Wi-Fi & laptops', 'Medical / water pump'],
        selected: 'Fridge & freezer',
      },
      {
        kind: 'Q · 2 OF 3',
        prompt: 'If you had to pick one word — which would it be?',
        options: ['Cheap', 'Quiet', 'Future-proof', 'Simple'],
        selected: 'Quiet',
      },
      {
        kind: 'Q · 3 OF 3',
        prompt: 'Maintenance — are you comfortable topping up water, checking inverter health, that kind of thing?',
        options: ['Yes, I\'ll tinker', 'I\'d rather it just worked', 'A monthly check is fine'],
        selected: 'I\'d rather it just worked',
      },
    ];

    return (
      <div style={{
        width: 1120, padding: '48px 56px 64px', minHeight: 720,
        background: 'var(--vh-surface-000)', borderRadius: 20, border: '1px solid var(--vh-line)',
        position: 'relative',
      }}>
        {/* skip notice */}
        <div style={{ position: 'absolute', top: 24, left: '50%', transform: 'translateX(-50%)' }}>
          <div className="skip-notice" data-frozen="true">
            <Pria_Orb size={16}/>
            <span>
              <b>Pria replaced the direction step</b> — you said <em>help me choose</em>, so we're talking it through.
            </span>
            <span className="skip-notice-close">×</span>
          </div>
        </div>

        {/* eyebrow */}
        <div style={{
          marginTop: 48,
          fontFamily: 'var(--vh-font-mono)', fontSize: 10, letterSpacing: '.26em',
          textTransform: 'uppercase', color: 'var(--vh-voltage)',
          display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <Pria_Orb size={12}/> STEP 4 · DIAGNOSTIC · INJECTED BY PRIA
        </div>

        <h1 style={{
          fontFamily: 'var(--vh-font-display)', fontWeight: 300, letterSpacing: '-0.02em',
          fontSize: 54, lineHeight: 1, color: 'var(--vh-text-000)', margin: '12px 0 36px',
          maxWidth: 780,
        }}>
          Let me ask you <em style={{ fontStyle: 'italic', fontWeight: 500, color: 'var(--vh-voltage)' }}>three things</em>.
        </h1>

        {/* progress dots */}
        <div className="diag-progress" style={{ marginBottom: 28 }}>
          <span>PROGRESS</span>
          {stages.slice(0, 3).map((_, i) => (
            <span key={i} className="diag-progress-dot"
                  data-state={i < idx ? 'done' : i === idx ? 'active' : 'idle'}/>
          ))}
          <span style={{ marginLeft: 6, color: 'var(--vh-text-200)' }}>{Math.min(idx, 3)} OF 3</span>
        </div>

        {/* dialog transcript */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 780 }}>
          {dialog.slice(0, Math.min(idx + 1, 3)).map((turn, i) => {
            const isCurrent = i === idx && stage !== 'verdict';
            return (
              <React.Fragment key={i}>
                <div className="diag-msg-pria">
                  <div className="pria-halo" style={{ flexShrink: 0 }}>
                    <Pria_Orb size={28}/>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div className="diag-bubble">
                      <div className="diag-question-kind">{turn.kind}</div>
                      {turn.prompt}
                    </div>

                    {/* answer chips — always visible for completed turns; for current turn, no selected */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 12 }}>
                      {turn.options.map((opt) => {
                        const isSelected = !isCurrent && opt === turn.selected;
                        return (
                          <span key={opt} className="diag-answer-chip" data-selected={isSelected || undefined}>
                            {isSelected && <IconCheck size={12}/>}
                            {opt}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* user answer bubble (only when past this turn) */}
                {!isCurrent && (
                  <div className="diag-bubble diag-bubble-user">
                    {turn.selected}
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* VERDICT */}
        {stage === 'verdict' && (
          <div style={{ marginTop: 40, maxWidth: 780 }}>
            <div className="diag-verdict">
              <div className="diag-verdict-eyebrow">
                <span style={{
                  width: 6, height: 6, borderRadius: '50%', background: 'var(--vh-bio)',
                  boxShadow: '0 0 8px var(--vh-bio)',
                }}/>
                RECOMMENDED DIRECTION · CONFIDENCE 0.89
              </div>
              <div className="diag-verdict-title">
                A <em>quiet hybrid</em> inverter with lithium backup.
              </div>
              <p style={{ fontFamily: 'var(--vh-font-body)', fontSize: 15, color: 'var(--vh-text-100)', lineHeight: 1.55, marginBottom: 18, maxWidth: 620 }}>
                Sized for your fridge-first priority, built for under-45dB operation, and maintenance-free for 5+ years. Solar-ready if you want to add panels later.
              </p>

              <div style={{
                fontFamily: 'var(--vh-font-mono)', fontSize: 9.5, letterSpacing: '.22em',
                textTransform: 'uppercase', color: 'var(--vh-bio)',
                margin: '18px 0 8px',
              }}>WHY THIS FITS YOU</div>

              <div>
                <div className="diag-why-row">
                  <span className="diag-why-dot"/>
                  <div>You said <b>fridge & freezer</b> go first — hybrid inverters are what keeps cold storage alive through 4-8hr outages without a generator.</div>
                </div>
                <div className="diag-why-row">
                  <span className="diag-why-dot"/>
                  <div>You picked <b>quiet</b> — lithium + IGBT inverter runs at 38dB. A petrol gen is 78dB. You'd hear the difference across the street.</div>
                </div>
                <div className="diag-why-row">
                  <span className="diag-why-dot"/>
                  <div>You said <b>it should just work</b> — no water top-ups, no fuel runs, auto-switching when NEPA drops. You don't touch it.</div>
                </div>
              </div>

              <div style={{
                display: 'flex', gap: 12, marginTop: 24, alignItems: 'center',
              }}>
                <button style={{
                  background: 'var(--vh-bio)', color: 'var(--vh-void)',
                  border: 0, borderRadius: 999, padding: '13px 22px',
                  fontFamily: 'var(--vh-font-body)', fontWeight: 600, fontSize: 14,
                  display: 'inline-flex', alignItems: 'center', gap: 8, cursor: 'pointer',
                }}>
                  Go with this <IconArrow/>
                </button>
                <button style={{
                  background: 'transparent', color: 'var(--vh-text-100)',
                  border: '1px solid var(--vh-line)', borderRadius: 999, padding: '12px 20px',
                  fontFamily: 'var(--vh-font-body)', fontWeight: 500, fontSize: 14, cursor: 'pointer',
                }}>
                  Show me the alternatives
                </button>
                <span style={{
                  marginLeft: 'auto',
                  fontFamily: 'var(--vh-font-mono)', fontSize: 10, letterSpacing: '.2em',
                  textTransform: 'uppercase', color: 'var(--vh-text-300)',
                }}>
                  2 more paths evaluated · hidden
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // ═══════════════════════════════════════════════════════════════════
  // 4 · SKIP NOTICE (standalone, for showcase close-up)
  // ═══════════════════════════════════════════════════════════════════

  const SkipNotice = ({ children, frozen = true }) => (
    <div className="skip-notice" data-frozen={frozen || undefined}>
      <Pria_Orb size={16}/>
      <span>{children}</span>
      <span className="skip-notice-close">×</span>
    </div>
  );

  Object.assign(window, {
    P1_ContextEngineDiagram: ContextEngineDiagram,
    P1_BillConfirmation:     BillConfirmation,
    P1_DiagnosticStep:       DiagnosticStep,
    P1_SkipNotice:           SkipNotice,
  });
})();
