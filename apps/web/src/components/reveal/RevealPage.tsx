'use client'
import * as React from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useRouter } from 'next/navigation'
import { useIntakeStore } from '@/lib/store'
import { Button } from '@pricing-ai/ui/primitives/Button'
import { PriaComposer } from '@pricing-ai/ui/pria/PriaComposer'
import type { Plan, Priority } from '@pricing-ai/shared'

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1]

const PRIORITY_CONFIG: Record<Priority, {
  eyebrow: string
  title: React.ReactNode
  lede: string
  accent: string
}> = {
  cost: {
    eyebrow: 'YOUR PLAN · RANKED BY COST',
    title: <>Over 20 years you'll{' '}<em style={{ fontStyle: 'italic', fontWeight: 500, color: 'var(--vh-voltage)' }}>save</em>.</>,
    lede: "The math on this plan clears the diesel you're burning in just over three years — and keeps compounding for seventeen more.",
    accent: 'var(--vh-voltage)',
  },
  reliability: {
    eyebrow: 'YOUR PLAN · RANKED BY RELIABILITY',
    title: <>Your power stays{' '}<em style={{ fontStyle: 'italic', fontWeight: 500, color: 'var(--vh-horizon)' }}>on</em>.</>,
    lede: "Solar carries the day, lithium carries the night. There's a 36-minute gap near dawn on the heaviest days — everything else is covered.",
    accent: 'var(--vh-horizon)',
  },
  sustainability: {
    eyebrow: 'YOUR PLAN · RANKED BY IMPACT',
    title: <>Over 20 years you'll{' '}<em style={{ fontStyle: 'italic', fontWeight: 500, color: 'var(--vh-bio)' }}>avoid</em>.</>,
    lede: "Eighty-four tonnes of CO₂ that otherwise rolls out of your generator exhaust. About the weight of a blue whale.",
    accent: 'var(--vh-bio)',
  },
}

const PRIORITY_OPTIONS: { value: Priority; label: string; eyebrow: string; body: string; accent: string }[] = [
  { value: 'cost',           label: 'Cost',           eyebrow: 'BANG FOR NAIRA',   body: 'Payback, savings, lowest total cost over 20 years.',        accent: 'var(--vh-voltage)' },
  { value: 'reliability',    label: 'Reliability',    eyebrow: 'POWER THAT HOLDS', body: 'Hours of autonomy, coverage through outages, fewer gaps.',   accent: 'var(--vh-horizon)' },
  { value: 'sustainability', label: 'Sustainability', eyebrow: 'LOWER FOOTPRINT',  body: 'CO₂ avoided, diesel not burned, generational impact.',       accent: 'var(--vh-bio)'     },
]

interface BOQRow {
  description: string
  spec: string
  qty: number
  unitNgn: number
  totalNgn: number
}

function formatNgn(n: number) {
  return '₦' + n.toLocaleString('en-NG', { maximumFractionDigits: 0 })
}

// ---- Count-up ----
function useCountUp(target: number, dur = 1400) {
  const [val, setVal] = React.useState(0)
  React.useEffect(() => {
    setVal(0)
    const start = performance.now()
    let raf: number
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / dur)
      const eased = 1 - Math.pow(1 - t, 3)
      setVal(Math.round(target * eased))
      if (t < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [target, dur])
  return val
}

function BOQTable({ rows }: { rows: BOQRow[] }) {
  const headers = ['Component', 'Spec', 'Qty', 'Unit Price', 'Total']
  return (
    <div
      style={{ borderRadius: 'var(--vh-r-xl)', border: '1px solid var(--vh-line)', overflow: 'hidden' }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '2fr 2fr 60px 1fr 1fr',
          padding: '10px 16px',
          fontFamily: 'var(--vh-font-mono)',
          fontSize: 9, letterSpacing: '.18em', textTransform: 'uppercase',
          color: 'var(--vh-text-200)',
          background: 'var(--vh-surface-200)',
        }}
      >
        {headers.map(h => <span key={h}>{h}</span>)}
      </div>
      {rows.map((row, i) => (
        <motion.div
          key={row.description}
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, ease: EASE_OUT, delay: i * 0.06 }}
          style={{
            display: 'grid',
            gridTemplateColumns: '2fr 2fr 60px 1fr 1fr',
            alignItems: 'center',
            padding: '12px 16px',
            borderTop: '1px solid var(--vh-line)',
            background: i % 2 === 0 ? 'var(--vh-surface-100)' : 'transparent',
            fontSize: 13,
          }}
        >
          <span style={{ color: 'var(--vh-text-000)' }}>{row.description}</span>
          <span style={{ color: 'var(--vh-text-200)', fontSize: 12 }}>{row.spec}</span>
          <span style={{ fontFamily: 'var(--vh-font-mono)', color: 'var(--vh-text-200)' }}>{row.qty}</span>
          <span style={{ fontFamily: 'var(--vh-font-mono)', color: 'var(--vh-text-000)' }}>{formatNgn(row.unitNgn)}</span>
          <span style={{ fontFamily: 'var(--vh-font-mono)', color: 'var(--vh-voltage)', fontWeight: 500 }}>{formatNgn(row.totalNgn)}</span>
        </motion.div>
      ))}
      <div style={{
        display: 'flex', justifyContent: 'flex-end',
        padding: '12px 16px',
        borderTop: '1px dashed var(--vh-line)',
        background: 'var(--vh-surface-200)',
      }}>
        <span style={{ fontFamily: 'var(--vh-font-mono)', fontSize: 13, color: 'var(--vh-text-200)' }}>
          Total:{' '}
          <span style={{ color: 'var(--vh-voltage)', fontWeight: 500 }}>
            {formatNgn(rows.reduce((s, r) => s + r.totalNgn, 0))}
          </span>
          {' '}(excl. VAT)
        </span>
      </div>
    </div>
  )
}

interface RevealPageProps {
  shareToken: string
  plan?: Plan | null
}

const DEMO_BOQ: BOQRow[] = [
  { description: 'Solar panels',    spec: '450 W monocrystalline',          qty: 24, unitNgn: 280000,  totalNgn: 6720000  },
  { description: 'Hybrid inverter', spec: '10 kW 48 V MPPT',               qty: 1,  unitNgn: 1850000, totalNgn: 1850000  },
  { description: 'LiFePO4 battery', spec: '51.2 V / 100 Ah',               qty: 4,  unitNgn: 2400000, totalNgn: 9600000  },
  { description: 'Mounting frames', spec: 'Galv. steel roof-mount',         qty: 6,  unitNgn: 85000,   totalNgn: 510000   },
  { description: 'Installation',    spec: 'Labour, cabling, commissioning', qty: 1,  unitNgn: 1200000, totalNgn: 1200000  },
]

const DEMO_TOTAL = DEMO_BOQ.reduce((s, r) => s + r.totalNgn, 0)

const DOWNLOADS = [
  { n: '01', t: 'PDF report',     d: '12-page plan you can share or print.' },
  { n: '02', t: 'Excel BOQ',      d: 'Bill of quantities + 20-yr cashflow.' },
  { n: '03', t: 'Gantt schedule', d: 'Procurement to commissioning.' },
]

export function RevealPage({ shareToken, plan }: RevealPageProps) {
  const router = useRouter()
  const { priority, setPriority, data, reset, openPria, closePria, pria, planId } = useIntakeStore()
  const [copied, setCopied] = React.useState(false)

  function handleStartNew() {
    reset()
    router.push('/')
  }

  const metrics = plan?.financialMetrics

  const [shareUrl, setShareUrl] = React.useState(`/reveal/${shareToken}`)
  React.useEffect(() => {
    setShareUrl(`${window.location.origin}/reveal/${shareToken}`)
  }, [shareToken])

  // Compute plan figures from intake store or use API metrics
  const daily = data.appliances.reduce((s, a) => s + a.watts * a.hoursPerDay * a.quantity, 0) / 1000
  const kw = Math.max(1, Math.ceil(daily / 4.5))
  const hasGen = data.currentSource === 'grid_gen' || data.currentSource === 'gen_only'
  const monthlyGen = hasGen && data.generatorKva ? Math.round(data.generatorKva * 30 * 1.3 * 1100) : 0
  const payM = metrics?.paybackMonths ?? (monthlyGen ? Math.ceil(DEMO_TOTAL / monthlyGen) : null)
  const co2 = metrics?.co2AvoidedTonnes ?? Math.round(kw * 1.4 * 20)
  const savings20yr = monthlyGen ? monthlyGen * 12 * 20 - DEMO_TOTAL : null
  const totalNgn = DEMO_TOTAL

  const animatedTotal = useCountUp(totalNgn, 1600)
  const config = PRIORITY_CONFIG[priority] ?? PRIORITY_CONFIG.cost

  function copyLink() {
    navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div
      style={{ minHeight: '100dvh', background: 'var(--vh-surface-000)', color: 'var(--vh-text-000)' }}
    >
      {/* Voltage top bar */}
      <div style={{ height: 3, background: 'linear-gradient(90deg, var(--vh-voltage-deep), var(--vh-voltage), var(--vh-voltage-hot))' }} />

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '48px 24px 80px', display: 'flex', flexDirection: 'column', gap: 48 }}>

        {/* ── PRIORITY-DRIVEN HEADER ── */}
        <div className="vh-up" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <p style={{
            fontFamily: 'var(--vh-font-mono)', fontSize: 11,
            letterSpacing: '0.2em', textTransform: 'uppercase',
            color: 'var(--vh-text-200)', margin: 0,
            display: 'flex', alignItems: 'center', gap: 10,
          }}>
            <span style={{
              width: 7, height: 7, borderRadius: '50%',
              background: config.accent, boxShadow: `0 0 10px ${config.accent}`,
              display: 'inline-block', flexShrink: 0,
            }} />
            {config.eyebrow}
          </p>
          <h1 style={{
            fontFamily: 'var(--vh-font-display)', fontWeight: 300,
            fontSize: 'clamp(40px, 5vw, 72px)',
            letterSpacing: '-0.03em', lineHeight: 0.95,
            color: 'var(--vh-text-000)', margin: 0,
          }}>
            {config.title}
          </h1>
          <p style={{
            fontFamily: 'var(--vh-font-body)', fontSize: 16,
            lineHeight: 1.55, color: 'var(--vh-text-200)', maxWidth: '62ch', margin: 0,
          }}>
            {config.lede}
          </p>
        </div>

        {/* ── BIG RECEIPT ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.3 }}
          style={{
            borderRadius: 'var(--vh-r-xl)', overflow: 'hidden',
            border: '1px solid var(--vh-line)',
            background: 'var(--vh-surface-100)',
          }}
        >
          {/* Total row */}
          <div style={{
            padding: '28px 28px 22px',
            display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
            borderBottom: '1px dashed var(--vh-line)',
          }}>
            <div>
              <div style={{
                fontFamily: 'var(--vh-font-mono)', fontSize: 10,
                letterSpacing: '.18em', textTransform: 'uppercase',
                color: 'var(--vh-text-200)', marginBottom: 8,
              }}>
                — TOTAL ESTIMATED
              </div>
              <div style={{
                fontFamily: 'var(--vh-font-mono)', fontWeight: 500, fontSize: 60, lineHeight: 1,
                background: 'linear-gradient(180deg, var(--vh-voltage-hot), var(--vh-voltage-deep))',
                WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent',
                letterSpacing: '-0.02em',
              }}>
                ₦{animatedTotal.toLocaleString()}
              </div>
              <div style={{
                fontFamily: 'var(--vh-font-mono)', fontSize: 10,
                letterSpacing: '.15em', textTransform: 'uppercase',
                color: 'var(--vh-text-300)', marginTop: 8,
              }}>
                ±15% CONFIDENCE · INCL. VAT, INSTALL, CONTINGENCY
              </div>
            </div>
          </div>

          {/* 3-stat bar */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0 }}>
            {[
              { k: 'PAYBACK',       v: payM ? `${Math.floor(payM / 12)}.${payM % 12}y` : '—' },
              { k: '20-YR SAVINGS', v: savings20yr ? formatNgn(savings20yr) : '—' },
              { k: 'CO₂ AVOIDED',   v: `${co2} t` },
            ].map((m, i) => (
              <div key={m.k} style={{
                padding: '16px 22px',
                borderLeft: i > 0 ? '1px dashed var(--vh-line)' : 'none',
              }}>
                <div style={{
                  fontFamily: 'var(--vh-font-mono)', fontSize: 10,
                  letterSpacing: '.18em', textTransform: 'uppercase',
                  color: 'var(--vh-text-300)', marginBottom: 6,
                }}>
                  {m.k}
                </div>
                <div style={{
                  fontFamily: 'var(--vh-font-mono)', fontSize: 26,
                  color: 'var(--vh-text-000)', fontWeight: 500, letterSpacing: '-0.01em',
                }}>
                  {m.v}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── PRIORITY SWITCHER ── */}
        <div className="vh-up vh-d5" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <p style={{
            fontFamily: 'var(--vh-font-mono)', fontSize: 10, letterSpacing: '0.2em',
            textTransform: 'uppercase', color: 'var(--vh-text-300)', margin: 0,
          }}>
            — SAME PLAN · SAME NUMBERS · DIFFERENT ORDER
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
            {PRIORITY_OPTIONS.map(opt => {
              const active = priority === opt.value
              return (
                <button
                  key={opt.value}
                  onClick={() => setPriority(opt.value)}
                  style={{
                    textAlign: 'left',
                    background: active ? 'var(--vh-surface-200)' : 'var(--vh-surface-100)',
                    border: `1px solid ${active ? opt.accent : 'var(--vh-line)'}`,
                    boxShadow: active ? `0 0 0 1px ${opt.accent}, 0 18px 40px -20px ${opt.accent}` : 'none',
                    borderRadius: 'var(--vh-r-lg)', padding: '18px 20px 20px',
                    cursor: 'pointer', transition: 'all 220ms cubic-bezier(.2,.7,.2,1)',
                    color: 'inherit',
                  }}
                >
                  <div style={{
                    fontFamily: 'var(--vh-font-mono)', fontSize: 9.5, letterSpacing: '.22em',
                    textTransform: 'uppercase', color: opt.accent, marginBottom: 12,
                    display: 'flex', alignItems: 'center', gap: 8,
                  }}>
                    <span style={{
                      width: 6, height: 6, borderRadius: '50%', background: opt.accent,
                      boxShadow: active ? `0 0 8px ${opt.accent}` : 'none', flexShrink: 0,
                    }} />
                    {opt.eyebrow}
                  </div>
                  <div style={{
                    fontFamily: 'var(--vh-font-display)', fontWeight: 500, fontSize: 28,
                    letterSpacing: '-0.02em', color: 'var(--vh-text-000)', lineHeight: 1, marginBottom: 8,
                  }}>
                    {opt.label}
                  </div>
                  <div style={{ fontFamily: 'var(--vh-font-body)', fontSize: 13, color: 'var(--vh-text-200)', lineHeight: 1.5 }}>
                    {opt.body}
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* ── BOQ TABLE ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <h2 style={{
            fontFamily: 'var(--vh-font-display)', fontWeight: 500, fontSize: 22,
            letterSpacing: '-0.02em', color: 'var(--vh-text-000)', margin: 0,
          }}>
            Bill of Quantities
          </h2>
          <BOQTable rows={DEMO_BOQ} />
        </div>

        {/* ── DOWNLOAD CARDS ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
          {DOWNLOADS.map((card, i) => (
            <motion.div
              key={card.n}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: EASE_OUT, delay: 0.1 + i * 0.07 }}
              style={{
                display: 'flex', flexDirection: 'column',
                gap: 0, padding: 20, minHeight: 150,
                border: '1px solid var(--vh-line)',
                borderRadius: 'var(--vh-r-xl)',
                background: 'var(--vh-surface-100)',
              }}
            >
              <div style={{
                fontFamily: 'var(--vh-font-mono)', fontSize: 10,
                letterSpacing: '.18em', textTransform: 'uppercase',
                color: 'var(--vh-text-300)', marginBottom: 14,
              }}>
                {card.n} / 03
              </div>
              <div style={{
                fontFamily: 'var(--vh-font-display)', fontSize: 20, fontWeight: 500,
                letterSpacing: '-0.02em', color: 'var(--vh-text-000)', marginBottom: 8,
              }}>
                {card.t}
              </div>
              <div style={{
                fontFamily: 'var(--vh-font-body)', fontSize: 13,
                color: 'var(--vh-text-200)', marginBottom: 14, lineHeight: 1.5,
              }}>
                {card.d}
              </div>
              <button
                onClick={() => alert(`${card.t} — coming soon`)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 6, marginTop: 'auto',
                  background: 'none', border: 'none', cursor: 'pointer',
                  fontFamily: 'var(--vh-font-body)', fontSize: 12.5,
                  color: 'var(--vh-voltage)', padding: 0,
                }}
              >
                Download ↓
              </button>
            </motion.div>
          ))}
        </div>

        {/* ── SHARE LINK ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{
            fontFamily: 'var(--vh-font-mono)', fontSize: 10,
            letterSpacing: '.18em', textTransform: 'uppercase',
            color: 'var(--vh-text-200)',
          }}>
            — SHARE THIS PLAN
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <div style={{
              flex: 1, padding: '12px 16px',
              borderRadius: 'var(--vh-r-lg)',
              border: '1px solid var(--vh-line)',
              background: 'var(--vh-surface-100)',
              fontFamily: 'var(--vh-font-mono)', fontSize: 12,
              color: 'var(--vh-text-200)',
              overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            }}>
              {shareUrl}
            </div>
            <button
              onClick={copyLink}
              style={{
                padding: '12px 20px',
                borderRadius: 'var(--vh-r-lg)',
                background: copied ? 'var(--vh-bio)' : 'var(--vh-surface-300)',
                color: copied ? '#0A0F14' : 'var(--vh-text-000)',
                fontFamily: 'var(--vh-font-mono)', fontSize: 12,
                border: 'none', cursor: 'pointer',
                transition: 'background 0.2s, color 0.2s',
                flexShrink: 0,
              }}
            >
              {copied ? 'Copied!' : 'Copy link'}
            </button>
          </div>
        </div>

        {/* ── ACTION BUTTONS ── */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}
        >
          <button
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '14px 22px', borderRadius: 999,
              background: 'var(--vh-voltage)', color: '#0A0F14',
              fontFamily: 'var(--vh-font-body)', fontSize: 15, fontWeight: 500,
              border: 'none', cursor: 'pointer',
            }}
          >
            Get quotes from 3 vetted installers →
          </button>
          <Button variant="ghost" size="md" onClick={() => navigator.share?.({ url: shareUrl, title: 'My Solar Plan' })}>
            Share plan
          </Button>
          <Button variant="ghost" size="md" onClick={handleStartNew}>
            ↺ Start new plan
          </Button>
        </motion.div>

      </div>

      {/* ── FLOATING PRIA ORB ── */}
      <div style={{ position: 'fixed', bottom: 28, right: 28, zIndex: 50 }}>
        <AnimatePresence mode="wait">
          {pria.isOpen ? (
            <motion.div
              key="composer"
              initial={{ scale: 0.9, opacity: 0, y: 12 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 12 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            >
              <PriaComposer planId={planId ?? undefined} onClose={closePria} />
            </motion.div>
          ) : (
            <motion.button
              key="orb"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.22 }}
              onClick={() => openPria()}
              title="Ask Pria"
              aria-label="Open Pria voice assistant"
              style={{
                width: 56, height: 56, borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'var(--vh-surface-200)',
                border: '1px solid var(--vh-line)',
                boxShadow: '0 0 0 1px var(--vh-voltage-deep), 0 8px 32px rgba(255,107,53,0.25)',
                cursor: 'pointer',
                position: 'relative', overflow: 'hidden',
              }}
            >
              {/* Conic gradient orb */}
              <div style={{
                width: 36, height: 36, borderRadius: '50%',
                background: 'conic-gradient(from 0deg, var(--vh-voltage), var(--vh-bio), var(--vh-horizon), var(--vh-voltage))',
                animation: 'vh-orbit 6s linear infinite',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <div style={{
                  width: 26, height: 26, borderRadius: '50%',
                  background: 'var(--vh-surface-200)',
                }} />
              </div>
            </motion.button>
          )}
        </AnimatePresence>
      </div>

    </div>
  )
}
