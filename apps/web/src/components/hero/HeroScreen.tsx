'use client'
import * as React from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'motion/react'
import { AtmosphereBackground } from './AtmosphereBackground'
import { PriaComposer } from '@pricing-ai/ui/pria/PriaComposer'
import { api } from '@/lib/api'
import { useIntakeStore } from '@/lib/store'

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1]

// Unsplash CDN — same IDs as ui_kits/pricing_ai/motion.jsx
const U = (id: string, w = 1200, h = 800) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&h=${h}&q=70`

const HERO_IMAGES = [
  U('1509391366360-2e959784a276'),
  U('1545209463-e2825498edbf'),
  U('1581091226825-a6a2a5aee158'),
  U('1605635543078-1e0096f0f9fe'),
  U('1581092921461-eab62e97a780'),
  U('1500534623283-312aade485b7'),
]

const STACK_IMAGES = [
  U('1532601224476-15c79f2f7a51'),
  U('1508514177221-188b1cf16e9d'),
  U('1580060839134-75a5edca2e99'),
  U('1581090700227-1e37b190418e'),
  U('1559302504-64aae6ca6b6d'),
  U('1559087867-ce4c91325525'),
]

const MARQUEE_ITEMS = [
  { text: 'PLAN #4,820 · Lekki residence · 5 kW hybrid · ₦9.2M',             color: 'var(--vh-voltage)' },
  { text: 'PLAN #4,821 · Ibadan clinic · 8 kW PV + 15 kWh battery · ₦14.8M', color: 'var(--vh-bio)'     },
  { text: 'PLAN #4,822 · Enugu SME · 3 kW + genset fallback · ₦4.6M',        color: 'var(--vh-horizon)' },
  { text: 'PLAN #4,823 · Abuja estate · 40 kW mini-grid · ₦62M',             color: 'var(--vh-voltage)' },
  { text: 'PLAN #4,824 · Kano farm · biomass + 12 kW PV · ₦18.1M',           color: 'var(--vh-bio)'     },
]

const STATS = [
  { k: 'PLANS PRICED',   n: 4820, dec: 0, suffix: '',       s: 'SINCE Q1'   },
  { k: 'MEDIAN PAYBACK', n: 2.4,  dec: 1, suffix: 'y',      s: 'VS. DIESEL' },
  { k: 'LGAs COVERED',  n: 112,  dec: 0, suffix: ' / 774', s: 'EXPANDING'  },
]

const TYPING_TEXT = 'From a question to a priced, scheduled, ready-to-execute renewable plan — in minutes, not weeks.'

// ---- Ken-Burns crossfade ----
const KenBurns = React.memo(function KenBurns({
  images,
  interval = 5200,
  height = 560,
}: {
  images: string[]
  interval?: number
  height?: number
}) {
  const [idx, setIdx] = React.useState(0)

  React.useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % images.length), interval)
    return () => clearInterval(t)
  }, [images.length, interval])

  return (
    <div
      style={{
        position: 'relative', width: '100%', height,
        borderRadius: 'var(--vh-r-xl)', overflow: 'hidden',
        border: '1px solid var(--vh-line)',
      }}
    >
      {images.map((src, i) => (
        <img
          key={src}
          src={src}
          alt=""
          loading={i === 0 ? 'eager' : 'lazy'}
          aria-hidden
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%', objectFit: 'cover',
            opacity: i === idx ? 1 : 0,
            transition: 'opacity 1200ms ease',
            animation: i === idx ? 'vh-kenburns 7s ease-out forwards' : 'none',
            filter: 'saturate(1.05) contrast(1.03)',
          }}
        />
      ))}
      {/* bottom gradient */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'linear-gradient(180deg, rgba(10,15,20,0.1) 40%, rgba(10,15,20,0.85) 100%)',
      }} />
      {/* voltage inner glow */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        boxShadow: 'inset 0 0 80px rgba(255,107,53,0.18)',
      }} />
      {/* LIVE caption */}
      <div style={{
        position: 'absolute', left: 16, bottom: 14,
        display: 'flex', alignItems: 'center', gap: 10,
        fontFamily: 'var(--vh-font-mono)', fontSize: 10,
        letterSpacing: '.2em', textTransform: 'uppercase',
        color: 'var(--vh-text-100)',
      }}>
        <span style={{
          width: 7, height: 7, borderRadius: '50%',
          background: 'var(--vh-bio)',
          boxShadow: '0 0 10px var(--vh-bio)',
          display: 'inline-block',
          animation: 'vh-glow 2.4s ease-in-out infinite',
        }} />
        LIVE · NIGERIA
      </div>
    </div>
  )
})

// ---- Drifting photo stack ----
const PhotoStack = React.memo(function PhotoStack({
  images,
  height = 520,
  speed = 36,
}: {
  images: string[]
  height?: number
  speed?: number
}) {
  const list = [...images, ...images]

  return (
    <div
      style={{
        position: 'relative', height, width: '100%', overflow: 'hidden',
        borderRadius: 'var(--vh-r-lg)',
        maskImage: 'linear-gradient(180deg, transparent 0%, #000 12%, #000 88%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(180deg, transparent 0%, #000 12%, #000 88%, transparent 100%)',
      }}
    >
      <div style={{
        display: 'flex', flexDirection: 'column', gap: 14,
        animation: `vh-drift-up ${speed}s linear infinite`,
      }}>
        {list.map((src, i) => (
          <div key={i} style={{
            position: 'relative',
            borderRadius: 'var(--vh-r-md)', overflow: 'hidden',
            border: '1px solid var(--vh-line)',
            boxShadow: '0 20px 40px -20px rgba(0,0,0,0.6)',
          }}>
            <img
              src={src} alt="" loading="lazy" aria-hidden
              style={{
                width: '100%', height: 170, objectFit: 'cover', display: 'block',
                filter: 'brightness(0.85) saturate(1.05)',
              }}
            />
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(180deg, transparent 60%, rgba(10,15,20,0.55))',
            }} />
          </div>
        ))}
      </div>
    </div>
  )
})

// ---- Live stream bars ----
const StreamBars = React.memo(function StreamBars({
  count = 14,
  height = 32,
}: {
  count?: number
  height?: number
}) {
  return (
    <div className="vh-stream-bars" style={{ height }}>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="vh-stream-bar"
          style={{
            animationDelay: `${(i * 0.09) % 1.6}s`,
            animationDuration: `${1.2 + (i % 5) * 0.18}s`,
          }}
        />
      ))}
    </div>
  )
})

// ---- Marquee ticker ----
function MarqueeTicker() {
  const doubled = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS]

  return (
    <div style={{
      overflow: 'hidden', width: '100%',
      maskImage: 'linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent)',
      WebkitMaskImage: 'linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent)',
      border: '1px solid var(--vh-line)',
      borderRadius: 'var(--vh-r-md)',
      padding: '12px 0',
      background: 'var(--vh-surface-100)',
    }}>
      <div className="vh-marquee-track">
        {doubled.map((item, i) => (
          <span key={i} style={{
            padding: '0 28px',
            fontFamily: 'var(--vh-font-mono)',
            fontSize: 11, letterSpacing: '.2em', textTransform: 'uppercase',
            color: 'var(--vh-text-200)',
            display: 'inline-flex', alignItems: 'center', gap: 10,
          }}>
            <span style={{ width: 4, height: 4, borderRadius: '50%', background: item.color, flexShrink: 0 }} />
            {item.text}
          </span>
        ))}
      </div>
    </div>
  )
}

// ---- Count-up ----
function CountUp({
  to,
  decimals = 0,
  suffix = '',
  duration = 1800,
}: {
  to: number
  decimals?: number
  suffix?: string
  duration?: number
}) {
  const [val, setVal] = React.useState(0)

  React.useEffect(() => {
    const start = performance.now()
    let raf: number
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - t, 3)
      setVal(to * eased)
      if (t < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [to, duration])

  const formatted = val.toLocaleString('en-NG', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })
  return <>{formatted}{suffix}</>
}

// ---- Typing text ----
function TypingText({ text, speed = 22, startDelay = 900 }: { text: string; speed?: number; startDelay?: number }) {
  const [out, setOut] = React.useState('')
  const [round, setRound] = React.useState(0)

  React.useEffect(() => {
    let cancelled = false
    const t0 = setTimeout(() => {
      let i = 0
      const tick = () => {
        if (cancelled) return
        setOut(text.slice(0, i))
        if (i < text.length) {
          i++
          setTimeout(tick, speed)
        } else {
          setTimeout(() => { if (!cancelled) { setOut(''); setRound(r => r + 1) } }, 6000)
        }
      }
      tick()
    }, startDelay)
    return () => { cancelled = true; clearTimeout(t0) }
  }, [text, round, speed, startDelay])

  return <span className="vh-typing">{out}</span>
}

// =====================================================================
// HERO SCREEN
// =====================================================================
export function HeroScreen() {
  const router = useRouter()
  const { setPlanId, openPria, closePria, pria } = useIntakeStore()
  const [loading, setLoading] = React.useState(false)

  async function handleBegin() {
    if (loading) return
    setLoading(true)
    try {
      const { id, shareToken } = await api.createPlan()
      setPlanId(id, shareToken)
    } catch {
      const id = crypto.randomUUID()
      setPlanId(id, id)
    }
    router.push('/plan')
  }

  return (
    <div
      className="relative min-h-[100dvh] flex flex-col"
      style={{ background: 'var(--vh-surface-000)', color: 'var(--vh-text-000)' }}
    >
      <AtmosphereBackground />

      {/* ── Nav ─────────────────────────────────────────────── */}
      <nav className="relative z-10 flex items-center justify-between px-6 md:px-12 pt-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          style={{ display: 'flex', alignItems: 'center', gap: 8 }}
        >
          <span style={{ fontFamily: 'var(--vh-font-display)', fontSize: 16, fontWeight: 500, letterSpacing: '-0.02em' }}>
            Pricing AI
          </span>
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2, ease: EASE_OUT }}
          onClick={() => pria.isOpen ? closePria() : openPria()}
          style={{
            background: 'none', border: '1px solid var(--vh-line)',
            borderRadius: 'var(--vh-r-md)',
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 8,
            fontFamily: 'var(--vh-font-mono)', fontSize: 10,
            letterSpacing: '.18em', textTransform: 'uppercase',
            color: 'var(--vh-text-200)', padding: '8px 14px',
            transition: 'border-color 0.2s, color 0.2s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = 'var(--vh-voltage)'
            e.currentTarget.style.color = 'var(--vh-voltage)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = 'var(--vh-line)'
            e.currentTarget.style.color = 'var(--vh-text-200)'
          }}
          aria-label="Open Pria"
        >
          <span style={{
            width: 7, height: 7, borderRadius: '50%',
            background: 'var(--vh-voltage)', display: 'inline-block',
            animation: 'vh-glow 2.4s ease-in-out infinite',
          }} />
          Ask Pria
        </motion.button>
      </nav>

      {/* ── Main content ───────────────────────────────────── */}
      <main
        className="relative z-10 flex-1 w-full max-w-[1400px] mx-auto px-6 md:px-12"
        style={{
          paddingTop: 48, paddingBottom: 80,
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.25fr) minmax(0, 1fr)',
          gap: 56,
          alignItems: 'center',
        }}
      >
        {/* ──────────────── LEFT COLUMN ──────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 26 }}>

          {/* Pria badge */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05, ease: EASE_OUT }}
            style={{
              display: 'flex', alignItems: 'center', gap: 12,
              fontFamily: 'var(--vh-font-mono)', fontSize: 11,
              letterSpacing: '.2em', textTransform: 'uppercase',
              color: 'var(--vh-voltage)',
            }}
          >
            <span style={{
              width: 8, height: 8, borderRadius: '50%',
              background: 'var(--vh-voltage)',
              boxShadow: '0 0 12px var(--vh-voltage)',
              display: 'inline-block',
              animation: 'vh-glow 2.4s ease-in-out infinite',
            }} />
            PRIA · YOUR ENERGY ANALYST
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.1 }}
            style={{
              fontFamily: 'var(--vh-font-display)', fontWeight: 300,
              lineHeight: 0.92, letterSpacing: '-0.04em',
              color: 'var(--vh-text-000)', margin: 0,
              fontSize: 'clamp(52px, 7.4vw, 108px)',
            }}
          >
            Your{' '}
            <em style={{ fontStyle: 'italic', fontWeight: 500, color: 'var(--vh-voltage)' }}>energy</em>
            <br />
            future,{' '}
            <em style={{ fontStyle: 'italic', fontWeight: 500 }}>priced.</em>
          </motion.h1>

          {/* Typing subtext */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.25 }}
            style={{
              fontFamily: 'var(--vh-font-body)', fontSize: 17,
              lineHeight: 1.55, color: 'var(--vh-text-200)',
              maxWidth: 520, margin: 0, minHeight: 56,
            }}
          >
            <TypingText text={TYPING_TEXT} />
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.35 }}
            style={{ display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}
          >
            <button
              onClick={handleBegin}
              disabled={loading}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                padding: '16px 26px', fontSize: 15, fontWeight: 500,
                borderRadius: '999px',
                background: loading ? 'var(--vh-surface-200)' : 'var(--vh-voltage)',
                color: loading ? 'var(--vh-text-200)' : '#0A0F14',
                border: 'none', cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'transform 0.15s',
              }}
              onMouseEnter={e => { if (!loading) (e.currentTarget as HTMLElement).style.transform = 'scale(1.02)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)' }}
            >
              {loading ? (
                <>
                  <span style={{
                    width: 16, height: 16, borderRadius: '50%',
                    border: '2px solid transparent',
                    borderTopColor: 'var(--vh-text-200)',
                    display: 'inline-block',
                    animation: 'vh-orbit 0.8s linear infinite',
                  }} />
                  Setting up your plan…
                </>
              ) : (
                <>
                  Begin your plan
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                    aria-hidden
                  >
                    →
                  </motion.span>
                </>
              )}
            </button>

            <span style={{
              fontFamily: 'var(--vh-font-mono)', fontSize: 10,
              letterSpacing: '.18em', textTransform: 'uppercase',
              color: 'var(--vh-text-300)',
            }}>
              ~5 MINUTES · NO ACCOUNT
            </span>
          </motion.div>

          {/* Live marquee ticker */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <MarqueeTicker />
          </motion.div>

          {/* 3-col stats */}
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            style={{
              display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 1, background: 'var(--vh-line)',
              border: '1px solid var(--vh-line)',
              borderRadius: 'var(--vh-r-lg)', overflow: 'hidden',
            }}
          >
            {STATS.map(stat => (
              <div key={stat.k} style={{ background: 'var(--vh-surface-100)', padding: '20px 22px' }}>
                <div style={{
                  fontFamily: 'var(--vh-font-mono)', fontSize: 10,
                  letterSpacing: '.18em', textTransform: 'uppercase',
                  color: 'var(--vh-text-300)', marginBottom: 8,
                }}>
                  {stat.k}
                </div>
                <div style={{
                  fontFamily: 'var(--vh-font-mono)', fontWeight: 500,
                  fontSize: 34, color: 'var(--vh-text-000)', letterSpacing: '-0.01em',
                }}>
                  <CountUp to={stat.n} decimals={stat.dec} suffix={stat.suffix} />
                </div>
                <div style={{
                  fontFamily: 'var(--vh-font-mono)', fontSize: 10,
                  letterSpacing: '.14em', textTransform: 'uppercase',
                  color: 'var(--vh-text-200)', marginTop: 4,
                }}>
                  {stat.s}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ──────────────── RIGHT COLUMN — photo visual ──────────────── */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.15 }}
          className="hidden lg:block"
          style={{ position: 'relative', height: 620 }}
        >
          {/* Ken-Burns crossfade — big background panel */}
          <div style={{ position: 'absolute', inset: '0 -20px 80px 0' }}>
            <KenBurns images={HERO_IMAGES} height={560} />
          </div>

          {/* Drifting photo stack — overlaid on left edge */}
          <div style={{
            position: 'absolute', left: -44, top: 24,
            width: 186, height: 520, zIndex: 2, opacity: 0.95,
          }}>
            <PhotoStack images={STACK_IMAGES} height={520} speed={36} />
          </div>

          {/* Live stream bars — bottom-right overlay */}
          <div style={{
            position: 'absolute', right: -8, bottom: 96, zIndex: 4,
            width: 160,
            padding: '10px 14px',
            background: 'rgba(15,22,32,0.82)',
            backdropFilter: 'blur(12px)',
            border: '1px solid var(--vh-line)',
            borderRadius: 'var(--vh-r-md)',
          }}>
            <div style={{
              fontFamily: 'var(--vh-font-mono)', fontSize: 9,
              letterSpacing: '.2em', textTransform: 'uppercase',
              color: 'var(--vh-text-300)', marginBottom: 6,
            }}>
              LIVE LOAD
            </div>
            <StreamBars count={14} height={32} />
          </div>
        </motion.div>
      </main>

      {/* ── Pria floating composer ───────────────────────────── */}
      <AnimatePresence>
        {pria.isOpen && (
          <div className="fixed top-6 right-6 z-50">
            <PriaComposer planId={pria.anchorId ?? undefined} onClose={closePria} />
          </div>
        )}
      </AnimatePresence>

      {/* ── Footer ──────────────────────────────────────────── */}
      <footer
        className="relative z-10 px-6 md:px-12 pb-8 text-xs"
        style={{ color: 'var(--vh-text-200)', fontFamily: 'var(--vh-font-mono)' }}
      >
        © {new Date().getFullYear()} Pricing AI — Renewable Energy Planning
      </footer>
    </div>
  )
}
