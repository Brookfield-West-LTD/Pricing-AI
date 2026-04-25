// Volt Horizon — Motion components & scenes (imagery + motion)
// Reusable motion primitives + photographic layers for the Pricing AI onboarding.

(() => {
  const { useState, useEffect, useRef } = React;

  // ---------- IMAGE POOL (Unsplash source CDN — no API, safe to hotlink) ----------
  // Every image is an Unsplash photo ID. Source CDN returns a cropped JPG at the requested size.
  const U = (id, w = 1200, h = 800) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&h=${h}&q=70`;

  const IMAGES = {
    solarRooftop:   U('1509391366360-2e959784a276'),      // panels on roof
    solarArray:     U('1545209463-e2825498edbf'),         // solar farm angled
    solarCloseup:   U('1559087867-ce4c91325525'),         // macro panel cells
    solarInstall:   U('1508514177221-188b1cf16e9d'),      // installers
    inverterRoom:   U('1581091226825-a6a2a5aee158'),      // electrical room / inverter
    batteryBank:    U('1581090700227-1e37b190418e'),      // electronics/battery shelf
    engineer:       U('1581092921461-eab62e97a780'),      // engineer with tablet
    cityDusk:       U('1605635543078-1e0096f0f9fe'),      // lagos-ish city skyline dusk
    lagosBridge:    U('1580060839134-75a5edca2e99'),      // lagos bridge at night
    africaRoof:     U('1532601224476-15c79f2f7a51'),      // aerial rooftops
    smallShop:      U('1556761175-5973dc0f32e7'),         // shop/small business
    clinic:         U('1559302504-64aae6ca6b6d'),         // rural africa solar-powered community building
    home:           U('1580587771525-78b9dba3b914'),      // modern home exterior
    lightbulb:      U('1473341304170-971dccb5ac1e'),      // lights on
    grid:           U('1473341304170-971dccb5ac1e'),      // fallback
    generator:      U('1581092160607-ee22621dd758'),      // industrial generator (fallback solarArray if blocked)
    sunRise:        U('1500534623283-312aade485b7'),      // sunrise over horizon
  };

  // ---------- Typing text ----------
  const TypingText = ({ text, speed = 28, startDelay = 0, loop = false, pauseAtEnd = 2400, className, style }) => {
    const [out, setOut] = useState('');
    const [round, setRound] = useState(0);
    useEffect(() => {
      let cancelled = false;
      const t0 = setTimeout(() => {
        let i = 0;
        const tick = () => {
          if (cancelled) return;
          setOut(text.slice(0, i));
          if (i < text.length) { i++; setTimeout(tick, speed); }
          else if (loop) { setTimeout(() => { if (!cancelled) { setOut(''); setRound(r => r+1); } }, pauseAtEnd); }
        };
        tick();
      }, startDelay);
      return () => { cancelled = true; clearTimeout(t0); };
    }, [text, round]);
    return <span className={(className||'') + ' vh-typing'} style={style}>{out}</span>;
  };

  // ---------- Count-up ----------
  const CountUp = ({ to, duration = 1600, decimals = 0, prefix = '', suffix = '', className, style }) => {
    const [val, setVal] = useState(0);
    useEffect(() => {
      const start = performance.now();
      let raf;
      const step = (now) => {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 3);
        setVal(to * eased);
        if (t < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
      return () => cancelAnimationFrame(raf);
    }, [to, duration]);
    const formatted = val.toLocaleString('en-NG', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
    return <span className={className} style={style}>{prefix}{formatted}{suffix}</span>;
  };

  // ---------- Orbit scene ----------
  const OrbitScene = ({ size = 380, photo = true }) => {
    const R = size / 2;
    const spiralD = (() => {
      const pts = [];
      const turns = 2.2, steps = 220;
      for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        const angle = t * Math.PI * 2 * turns;
        const r = (1 - t) * (R - 18);
        pts.push(`${R + r * Math.cos(angle)},${R + r * Math.sin(angle)}`);
      }
      return 'M' + pts.join(' L');
    })();
    return (
      <div style={{ position:'relative', width:size, height:size }}>
        <div className="vh-glow-blob" style={{ width:320, height:320, top:'-40px', left:'-40px', background:'radial-gradient(circle, rgba(255,107,53,0.55), transparent 60%)' }}/>
        <div className="vh-glow-blob" style={{ width:260, height:260, bottom:'-30px', right:'-30px', background:'radial-gradient(circle, rgba(88,200,255,0.35), transparent 60%)', animationDelay:'2s' }}/>
        <div className="vh-glow-blob" style={{ width:200, height:200, top:'40%', left:'40%', background:'radial-gradient(circle, rgba(123,255,171,0.25), transparent 60%)', animationDelay:'4s' }}/>

        {/* Central photo disc — rotates slowly so imagery feels alive */}
        {photo && (
          <div style={{
            position:'absolute', inset: size*0.18, borderRadius:'50%', overflow:'hidden',
            boxShadow:'0 0 0 1px rgba(255,255,255,0.08), 0 20px 60px -20px rgba(255,107,53,0.4)',
            animation:'vh-spin-slow 60s linear infinite',
          }}>
            <img src={IMAGES.sunRise} alt="" style={{ width:'140%', height:'140%', objectFit:'cover', marginLeft:'-20%', marginTop:'-20%', filter:'saturate(1.1) contrast(1.05)' }}/>
            <div style={{ position:'absolute', inset:0, background:'radial-gradient(circle at 50% 50%, transparent 30%, rgba(10,15,20,0.7) 75%, rgba(10,15,20,0.95))' }}/>
          </div>
        )}

        <div className="vh-orbit-layer">
          <div className="vh-orbit-ring" data-spin="true"    style={{ width:size*0.92, height:size*0.92 }}>
            <div className="vh-orbit-sat" style={{ top:'-5px', left:'50%', marginLeft:-5 }}/>
          </div>
          <div className="vh-orbit-ring" data-spin="reverse" style={{ width:size*0.70, height:size*0.70, borderStyle:'solid', borderColor:'rgba(88,200,255,0.18)' }}>
            <div className="vh-orbit-sat" style={{ top:'50%', left:'-4px', marginTop:-4, width:8, height:8, background:'var(--vh-horizon)', boxShadow:'0 0 14px var(--vh-horizon)' }}/>
          </div>
          <div className="vh-orbit-ring" data-spin="fast"    style={{ width:size*0.48, height:size*0.48, borderColor:'rgba(123,255,171,0.22)' }}>
            <div className="vh-orbit-sat" style={{ top:'50%', right:'-4px', marginTop:-4, width:7, height:7, background:'var(--vh-bio)', boxShadow:'0 0 14px var(--vh-bio)' }}/>
          </div>
        </div>

        <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size} style={{ position:'absolute', inset:0, pointerEvents:'none' }}>
          <path d={spiralD} stroke="rgba(255,107,53,0.25)" strokeWidth="1" fill="none" strokeDasharray="2 4"/>
        </svg>
        {[0, 0.33, 0.66].map((offset, i) => (
          <div key={i} className="vh-spiral-dot" style={{
            offsetPath: `path('${spiralD}')`,
            animation: `vh-spiral-in 7s linear infinite`,
            animationDelay: `${offset * -7}s`,
            top: 0, left: 0,
          }}/>
        ))}
        {window.VH_OrbitSceneWebGL && <window.VH_OrbitSceneWebGL size={size}/>}
      </div>
    );
  };

  // ---------- Photo stack (the hero's vertical film strip — images slowly drift upward, seamless loop) ----------
  const PhotoStack = ({ images, height = 520, speed = 40 }) => {
    // Double the list for seamless vertical marquee.
    const list = [...images, ...images];
    return (
      <div style={{
        position:'relative', height, width:'100%', overflow:'hidden',
        borderRadius:'var(--vh-r-lg)',
        maskImage:'linear-gradient(180deg, transparent 0%, #000 12%, #000 88%, transparent 100%)',
        WebkitMaskImage:'linear-gradient(180deg, transparent 0%, #000 12%, #000 88%, transparent 100%)',
      }}>
        <div style={{
          display:'flex', flexDirection:'column', gap:14,
          animation:`vh-drift-up ${speed}s linear infinite`,
        }}>
          {list.map((src, i) => (
            <div key={i} style={{ position:'relative', borderRadius:'var(--vh-r-md)', overflow:'hidden', border:'1px solid var(--vh-line)', boxShadow:'0 20px 40px -20px rgba(0,0,0,0.6)' }}>
              <img src={src} alt="" loading="lazy"
                   style={{ width:'100%', height:180, objectFit:'cover', display:'block', filter:'brightness(0.85) saturate(1.05)' }}/>
              <div style={{ position:'absolute', inset:0, background:'linear-gradient(180deg, transparent 60%, rgba(10,15,20,0.55))' }}/>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ---------- Ken-Burns crossfade block (big hero image panel that slowly pans + swaps) ----------
  const KenBurns = ({ images, interval = 5200, height = 380, radius = 'var(--vh-r-lg)', caption }) => {
    const [idx, setIdx] = useState(0);
    useEffect(() => {
      const t = setInterval(() => setIdx(i => (i+1) % images.length), interval);
      return () => clearInterval(t);
    }, [images.length, interval]);
    return (
      <div style={{ position:'relative', width:'100%', height, borderRadius:radius, overflow:'hidden', border:'1px solid var(--vh-line)' }}>
        {window.VH_KenBurnsShaderBG && <window.VH_KenBurnsShaderBG/>}
        {images.map((src, i) => (
          <img key={src+i} src={src} alt="" loading="lazy"
               style={{
                 position:'absolute', inset:0, width:'100%', height:'100%',
                 objectFit:'cover',
                 opacity: i === idx ? 1 : 0,
                 transition:'opacity 1200ms ease',
                 animation: i === idx ? 'vh-kenburns 7s ease-out forwards' : 'none',
                 filter:'saturate(1.05) contrast(1.03)',
               }}/>
        ))}
        {/* overlays */}
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(180deg, rgba(10,15,20,0.1) 40%, rgba(10,15,20,0.85) 100%)', pointerEvents:'none' }}/>
        <div style={{ position:'absolute', inset:0, boxShadow:'inset 0 0 80px rgba(255,107,53,0.18)', pointerEvents:'none' }}/>
        {caption && (
          <div style={{
            position:'absolute', left:16, bottom:14, fontFamily:'var(--vh-font-mono)',
            fontSize:10, letterSpacing:'.2em', textTransform:'uppercase', color:'var(--vh-text-100)',
            display:'flex', alignItems:'center', gap:10,
          }}>
            <span className="vh-dot-live"/> {caption}
          </div>
        )}
      </div>
    );
  };

  // ---------- Flip photo (auto 3D flip between two images) ----------
  const FlipPhoto = ({ front, back, frontLabel, backLabel, height = 180, interval = 4200, delay = 0 }) => {
    const [flipped, setFlipped] = useState(false);
    useEffect(() => {
      const to = setTimeout(() => {
        setFlipped(f => !f);
        const iv = setInterval(() => setFlipped(f => !f), interval);
        return () => clearInterval(iv);
      }, delay);
      return () => clearTimeout(to);
    }, [interval, delay]);
    const face = (src, label, color) => (
      <div style={{ position:'absolute', inset:0, borderRadius:'var(--vh-r-md)', overflow:'hidden', border:'1px solid var(--vh-line)' }}>
        <img src={src} alt="" loading="lazy" style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }}/>
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(180deg, transparent 55%, rgba(10,15,20,0.85))' }}/>
        <div style={{
          position:'absolute', left:12, bottom:10,
          fontFamily:'var(--vh-font-mono)', fontSize:10, letterSpacing:'.2em', textTransform:'uppercase',
          color: color || 'var(--vh-text-000)',
        }}>{label}</div>
      </div>
    );
    return (
      <div style={{ position:'relative', width:'100%', height, perspective:1200 }}>
        <div className="vh-flip" data-flipped={flipped} style={{ width:'100%', height:'100%' }}>
          <div className="vh-flip-face">{face(front, frontLabel, '#FFB88A')}</div>
          <div className="vh-flip-face vh-flip-back">{face(back, backLabel, 'var(--vh-bio)')}</div>
        </div>
      </div>
    );
  };

  // ---------- Live stream bars ----------
  const StreamBars = ({ count = 18, height = 40, color = 'voltage' }) => {
    const bars = Array.from({ length: count });
    return (
      <div className="vh-stream-bars" style={{ height }}>
        {bars.map((_, i) => (
          <div key={i} className="vh-stream-bar" style={{
            animationDelay: `${(i * 0.09) % 1.6}s`,
            animationDuration: `${1.2 + (i % 5) * 0.18}s`,
            background: color === 'bio' ? 'linear-gradient(180deg, var(--vh-bio), #4FBD7E)' : undefined,
          }}/>
        ))}
      </div>
    );
  };

  // ---------- Ticker marquee ----------
  const Marquee = ({ items }) => (
    <div style={{ overflow:'hidden', width:'100%', maskImage:'linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent)', WebkitMaskImage:'linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent)' }}>
      <div className="vh-marquee-track">
        {[...items, ...items].map((it, i) => (
          <span key={i} style={{ padding:'0 28px', fontFamily:'var(--vh-font-mono)', fontSize:11, letterSpacing:'.2em', textTransform:'uppercase', color:'var(--vh-text-200)', display:'inline-flex', alignItems:'center', gap:10 }}>
            <span style={{ width:4, height:4, borderRadius:'50%', background: it.color || 'var(--vh-voltage)' }}/>
            {it.text}
          </span>
        ))}
      </div>
    </div>
  );

  // ---------- Payback arc ----------
  const PaybackArc = ({ months = 26, maxMonths = 60 }) => {
    const pct = Math.min(1, months / maxMonths);
    return (
      <svg viewBox="0 0 200 80" width="100%" height="80" style={{ overflow:'visible' }}>
        <defs>
          <linearGradient id="vhArcGrad" x1="0" x2="1">
            <stop offset="0" stopColor="#FF6B35"/>
            <stop offset="1" stopColor="#7BFFAB"/>
          </linearGradient>
        </defs>
        <path d="M4 70 Q 100 -10 196 70" stroke="rgba(200,212,224,0.12)" strokeWidth="1.5" fill="none"/>
        <path d="M4 70 Q 100 -10 196 70"
              stroke="url(#vhArcGrad)" strokeWidth="2.5" fill="none"
              strokeDasharray="400" strokeDashoffset="400"
              style={{ animation:'vh-dash 2s cubic-bezier(.6,0,.2,1) forwards' }}/>
        <circle cx={4 + pct * 192} cy={70 - Math.sin(pct * Math.PI) * 72} r="5"
                fill="var(--vh-voltage)" style={{ filter:'drop-shadow(0 0 8px var(--vh-voltage))' }}/>
      </svg>
    );
  };

  Object.assign(window, {
    VH_IMAGES: IMAGES,
    VH_TypingText: TypingText,
    VH_CountUp: CountUp,
    VH_OrbitScene: OrbitScene,
    VH_PhotoStack: PhotoStack,
    VH_KenBurns: KenBurns,
    VH_FlipPhoto: FlipPhoto,
    VH_StreamBars: StreamBars,
    VH_Marquee: Marquee,
    VH_PaybackArc: PaybackArc,
  });
})();
