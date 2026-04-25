'use client'
import * as React from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useIntakeStore, type IntakeData } from '@/lib/store'

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1]

type Variant = 'panel' | 'receipt' | 'orchestra' | 'telemetry'

// ---- Shared math ----
function computePlan(data: IntakeData) {
  const daily = data.appliances.reduce((s, a) => s + a.watts * a.hoursPerDay * a.quantity, 0) / 1000
  const kw = Math.max(1, Math.ceil(daily / 4.5))
  const bat = Math.ceil(daily * 1.2)
  const panel = kw * 1000 * 280
  const batc = bat * 1000 * 320
  const inv = kw * 95000
  const inst = Math.round((panel + batc + inv) * 0.18)
  const total = panel + batc + inv + inst
  const hasGen = data.currentSource === 'grid_gen' || data.currentSource === 'gen_only'
  const monthlyGen = hasGen && data.generatorKva ? Math.round(data.generatorKva * 30 * 1.3 * 1100) : 0
  const payM = monthlyGen ? Math.ceil(total / monthlyGen) : null
  return { daily, kw, bat, panel, batc, inv, inst, total, monthlyGen, payM }
}

function useCounter(target: number, dur = 600) {
  const [v, setV] = React.useState(target)
  const prev = React.useRef(target)
  React.useEffect(() => {
    const s = prev.current
    const e = target
    const t0 = performance.now()
    let raf: number
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / dur)
      const eased = 1 - Math.pow(1 - p, 3)
      setV(Math.round(s + (e - s) * eased))
      if (p < 1) raf = requestAnimationFrame(tick)
      else prev.current = e
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, dur])
  return v
}

const WHO_LABEL: Record<string, string> = {
  homeowner: 'A home',
  sme:       'A business',
  developer: 'A community',
}

function sourceLabel(data: IntakeData): string | null {
  if (!data.currentSource) return null
  const kva = data.generatorKva
  const map: Record<string, string> = {
    gen_only:  kva ? `${kva} kVA generator` : 'Generator only',
    grid_gen:  kva ? `Grid + ${kva} kVA gen` : 'Grid + generator',
    grid_only: 'Grid only',
    none:      'Nothing yet',
  }
  return map[data.currentSource] ?? data.currentSource
}

const DIR_LABEL: Record<string, string> = {
  solar:   'Solar PV',
  wind:    'Small wind',
  hybrid:  'Hybrid',
  biomass: 'Biomass',
  any:     'Pria to decide',
}

const readyOf = (d: IntakeData) => !!d.who || !!d.location

// =====================================================================
// VARIANT A — RECEIPT
// =====================================================================
function ReceiptVariant({ data }: { data: IntakeData }) {
  const p = computePlan(data)
  const ready = readyOf(data)
  const total = useCounter(p.total)

  const who = data.who ? (WHO_LABEL[data.who] ?? null) : null
  const src = sourceLabel(data)
  const dir = data.energyDirection ? (DIR_LABEL[data.energyDirection] ?? null) : null

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
      {/* Header */}
      <div style={{ padding: '18px 20px 14px', borderBottom: '1px dashed var(--vh-line)', flexShrink: 0 }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          fontFamily: 'var(--vh-font-mono)', fontSize: 10, letterSpacing: '.18em',
          textTransform: 'uppercase', color: 'var(--vh-text-200)',
        }}>
          <span>— LIVE PLAN · DRAFT</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 7, color: 'var(--vh-bio)' }}>
            <span style={{
              width: 6, height: 6, borderRadius: '50%', display: 'inline-block',
              background: 'var(--vh-bio)', boxShadow: '0 0 8px var(--vh-bio)',
              animation: 'vh-glow 2.4s ease-in-out infinite',
            }} />
            ASSEMBLING
          </span>
        </div>
      </div>

      {/* Scrollable body */}
      <div style={{ padding: '18px 20px', overflowY: 'auto', flex: 1 }}>
        {/* BOQ */}
        <div style={{
          fontFamily: 'var(--vh-font-mono)', fontSize: 10, letterSpacing: '.18em',
          textTransform: 'uppercase', color: 'var(--vh-text-300)', marginBottom: 10,
        }}>
          BOQ
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {[
            { k: `${p.kw}× 1 kW panels`,      v: p.panel },
            { k: `${p.kw} kW hybrid inverter`,      v: p.inv   },
            { k: `${p.bat} kWh LFP battery`,        v: p.batc  },
            { k: 'Install · BOS · VAT',   v: p.inst  },
          ].map((row, i) => (
            <motion.div
              key={row.k}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.28, delay: i * 0.05, ease: EASE_OUT }}
              style={{
                display: 'grid', gridTemplateColumns: '1fr auto', gap: 12,
                padding: '9px 0', borderBottom: '1px dashed var(--vh-line)', fontSize: 13,
              }}
            >
              <span style={{ color: 'var(--vh-text-100)' }}>{row.k}</span>
              <span style={{ fontFamily: 'var(--vh-font-mono)', color: 'var(--vh-text-000)', fontSize: 12, fontWeight: 500 }}>
                &#8358;{row.v.toLocaleString()}
              </span>
            </motion.div>
          ))}
        </div>

        {/* WHAT PRIA KNOWS */}
        <div style={{
          marginTop: 20, fontFamily: 'var(--vh-font-mono)', fontSize: 10,
          letterSpacing: '.18em', textTransform: 'uppercase',
          color: 'var(--vh-text-300)', marginBottom: 8,
        }}>
          WHAT PRIA KNOWS
        </div>
        <div style={{ display: 'grid', gap: 6 }}>
          {([
            ['For',       who],
            ['Where',     data.location || null],
            ['Today',     src],
            ['Direction', dir],
            ['Loads',     data.appliances.length
              ? `${data.appliances.length} appliances · ${p.daily.toFixed(1)} kWh/d`
              : null],
          ] as [string, string | null][]).map(([k, v]) => (
            <div key={k} style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
              <span style={{
                fontFamily: 'var(--vh-font-mono)', fontSize: 10,
                letterSpacing: '.15em', textTransform: 'uppercase',
                color: 'var(--vh-text-300)', flexShrink: 0,
              }}>
                {k}
              </span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={v ?? '__empty'}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    color: v ? 'var(--vh-text-000)' : 'var(--vh-surface-300)',
                    textAlign: 'right',
                    fontFamily: v ? 'var(--vh-font-body)' : 'var(--vh-font-mono)',
                    fontSize: v ? 12.5 : 10,
                  }}
                >
                  {v ?? '—'}
                </motion.span>
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* VS. YOUR GENERATOR */}
        {p.monthlyGen > 0 && (
          <div style={{
            marginTop: 20, padding: 14, borderRadius: 'var(--vh-r-md)',
            border: '1px solid var(--vh-line-hot)',
            background: 'rgba(255,107,53,0.06)',
          }}>
            <div style={{
              fontFamily: 'var(--vh-font-mono)', fontSize: 10, letterSpacing: '.18em',
              textTransform: 'uppercase', color: 'var(--vh-voltage)', marginBottom: 6,
            }}>
              VS. YOUR GENERATOR
            </div>
            <div style={{ fontFamily: 'var(--vh-font-body)', fontSize: 13, lineHeight: 1.55, color: 'var(--vh-text-100)' }}>
              You burn &#x2248;{' '}
              <strong style={{ color: 'var(--vh-text-000)' }}>&#8358;{p.monthlyGen.toLocaleString()}/mo</strong>
              {' '}on petrol. This plan pays back in{' '}
              <strong style={{ color: 'var(--vh-voltage-hot)' }}>{p.payM} months</strong>
              , then runs near-free for 15+ years.
            </div>
          </div>
        )}
      </div>

      {/* Total — pinned bottom */}
      <div style={{
        padding: '16px 20px',
        background: 'var(--vh-surface-200)',
        borderTop: '1px dashed var(--vh-line)',
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontFamily: 'var(--vh-font-mono)', fontSize: 10, letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--vh-text-200)' }}>
              — TOTAL EST.
            </div>
            <div style={{ fontFamily: 'var(--vh-font-mono)', fontSize: 10, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--vh-text-300)', marginTop: 3 }}>
              ±15% · LOCKED AT SIGN-OFF
            </div>
          </div>
          <motion.div
            key={total}
            animate={{ scale: [1.04, 1] }}
            transition={{ duration: 0.3, ease: EASE_OUT }}
            style={{
              fontFamily: 'var(--vh-font-mono)', fontWeight: 500,
              fontSize: 30, lineHeight: 1, letterSpacing: '-0.015em',
              background: 'linear-gradient(180deg, var(--vh-voltage-hot), var(--vh-voltage-deep))',
              WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent',
            }}
          >
            {ready ? `₦${total.toLocaleString()}` : '—'}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

// =====================================================================
// VARIANT B — ORCHESTRA
// =====================================================================
function OrchestraVariant({ data, step }: { data: IntakeData; step: number }) {
  const p = computePlan(data)
  const ready = readyOf(data)

  const lines: { k: string; text: React.ReactNode }[] = []
  if (data.who) {
    const whoMap: Record<string, string> = { homeowner: 'a home', sme: 'a business', developer: 'a community', industrial: 'a facility' }
    const whoText = whoMap[data.who]
    lines.push({ k: 'who', text: <>Planning for <em>{whoText}</em>.</> })
  }
  if (data.location) {
    lines.push({ k: 'loc', text: <>Locked onto <em>{data.location}</em> — pulling irradiance and local installer pool.</> })
  }
  if (data.currentSource) {
    const src = sourceLabel(data)
    lines.push({ k: 'src', text: <>Baseline: <em>{src}</em>.{p.monthlyGen ? ` ≈ ₦${p.monthlyGen.toLocaleString()}/mo in petrol.` : ''}</> })
  }
  if (data.energyDirection) {
    lines.push({ k: 'dir', text: <>Direction: <em>{DIR_LABEL[data.energyDirection] ?? data.energyDirection}</em>.</> })
  }
  if (data.appliances.length) {
    lines.push({ k: 'load', text: <>Sizing around <em>{data.appliances.length} appliances</em>, {p.daily.toFixed(1)} kWh/day. Calling for a <strong>{p.kw} kW</strong> system with <strong>{p.bat} kWh</strong> of storage.</> })
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
      <div style={{ padding: '18px 20px', borderBottom: '1px solid var(--vh-line)', flexShrink: 0 }}>
        <div style={{ fontFamily: 'var(--vh-font-display)', fontSize: 18, fontWeight: 500, color: 'var(--vh-text-000)', letterSpacing: '-0.02em' }}>
          Pria is{' '}
          <span style={{ fontStyle: 'italic', color: 'var(--vh-voltage)' }}>listening</span>
        </div>
        <div style={{ fontFamily: 'var(--vh-font-mono)', fontSize: 10, letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--vh-text-300)', marginTop: 4, display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--vh-bio)', boxShadow: '0 0 8px var(--vh-bio)', animation: 'vh-glow 2.4s ease-in-out infinite', display: 'inline-block' }} />
          LIVE · STEP {String(step + 1).padStart(2, '0')}
        </div>
      </div>

      <div style={{ padding: '14px 20px', flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {!ready && (
          <div style={{ fontFamily: 'var(--vh-font-display)', fontStyle: 'italic', fontWeight: 300, fontSize: 16, color: 'var(--vh-text-300)', lineHeight: 1.5, marginTop: 16 }}>
            Your plan will take shape here as you answer — each question composes one more piece of the whole.
          </div>
        )}
        <AnimatePresence>
          {lines.map((ln, i) => (
            <motion.div
              key={ln.k}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.04, ease: EASE_OUT }}
              style={{
                background: 'var(--vh-surface-200)',
                border: '1px solid var(--vh-line)',
                borderRadius: '6px 16px 16px 16px',
                padding: '10px 13px',
                fontSize: 13, lineHeight: 1.55, color: 'var(--vh-text-100)',
              }}
            >
              {ln.text}
            </motion.div>
          ))}
        </AnimatePresence>

        {ready && data.appliances.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: EASE_OUT }}
            style={{
              marginTop: 6, padding: 14, borderRadius: 'var(--vh-r-md)',
              background: 'linear-gradient(145deg, rgba(255,107,53,0.08), rgba(88,200,255,0.05))',
              border: '1px solid var(--vh-line-hot)',
            }}
          >
            <div style={{ fontFamily: 'var(--vh-font-mono)', fontSize: 10, letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--vh-voltage)', marginBottom: 6 }}>
              — CURRENT DRAFT
            </div>
            <div style={{
              fontFamily: 'var(--vh-font-mono)', fontWeight: 500, fontSize: 30, lineHeight: 1, letterSpacing: '-0.015em',
              background: 'linear-gradient(180deg, var(--vh-voltage-hot), var(--vh-voltage-deep))',
              WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent',
            }}>
              ₦{p.total.toLocaleString()}
            </div>
            {p.payM && (
              <div style={{ fontFamily: 'var(--vh-font-body)', fontSize: 13, lineHeight: 1.55, color: 'var(--vh-text-100)', marginTop: 6 }}>
                Pays itself back in{' '}
                <strong style={{ color: 'var(--vh-voltage-hot)' }}>{Math.floor(p.payM / 12)}y {p.payM % 12}m</strong>
                , then runs near-free for 15+ years.
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  )
}

// =====================================================================
// VARIANT C — TELEMETRY
// =====================================================================
function TelemetryRing({ pct, label, value, unit, color }: { pct: number; label: string; value: string; unit: string; color: string }) {
  const r = 32
  const c = 2 * Math.PI * r
  const p = Math.max(0, Math.min(1, pct))
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
      <svg width="80" height="80" viewBox="0 0 80 80">
        <circle cx="40" cy="40" r={r} stroke="var(--vh-line)" strokeWidth="3.5" fill="none" />
        <circle
          cx="40" cy="40" r={r} stroke={color} strokeWidth="3.5" fill="none"
          strokeDasharray={`${c * p} ${c}`}
          style={{ transform: 'rotate(-90deg)', transformOrigin: '40px 40px', transition: 'stroke-dasharray 600ms cubic-bezier(.16,1,.3,1)' }}
          strokeLinecap="round"
        />
        <text x="40" y="38" textAnchor="middle" fill="var(--vh-text-000)" style={{ fontFamily: 'var(--vh-font-mono)', fontSize: 16, fontWeight: 500 }}>{value}</text>
        <text x="40" y="51" textAnchor="middle" fill="var(--vh-text-300)" style={{ fontFamily: 'var(--vh-font-mono)', fontSize: 7, letterSpacing: '.15em' }}>{unit}</text>
      </svg>
      <div style={{ fontFamily: 'var(--vh-font-mono)', fontSize: 9, letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--vh-text-300)' }}>{label}</div>
    </div>
  )
}

function TelemetryVariant({ data }: { data: IntakeData }) {
  const p = computePlan(data)
  const ready = readyOf(data)
  const payY = p.payM ? p.payM / 12 : 0

  const kwPct  = Math.min(1, p.kw / 8)
  const kwhPct = Math.min(1, p.daily / 12)
  const payPct = p.payM ? Math.min(1, 5 / payY) : 0

  const months = 60
  const mg = p.monthlyGen
  const makePath = (fn: (i: number) => number) => {
    const pts = Array.from({ length: months }, (_, i) => fn(i))
    const max = Math.max(...pts, 1)
    return pts.map((y, i) => `${i === 0 ? 'M' : 'L'} ${(i / (months - 1)) * 100} ${100 - (y / max) * 100}`).join(' ')
  }
  const dieselPath = makePath(i => mg * i)
  const planPath   = makePath(i => Math.min(p.total, p.total * Math.min(1, i / (p.payM ?? 999))))

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
      <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--vh-line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
        <div style={{ fontFamily: 'var(--vh-font-mono)', fontSize: 10, letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--vh-text-200)' }}>
          — TELEMETRY · LIVE
        </div>
        <div style={{ fontFamily: 'var(--vh-font-mono)', fontSize: 10, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--vh-horizon)', display: 'flex', alignItems: 'center', gap: 7 }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--vh-horizon)', boxShadow: '0 0 10px var(--vh-horizon)', display: 'inline-block' }} />
          REV {String(data.appliances.length + (data.who ? 1 : 0) + (data.location ? 1 : 0)).padStart(2, '0')}
        </div>
      </div>

      <div style={{ padding: '18px 20px 0', display: 'flex', justifyContent: 'space-around', flexShrink: 0 }}>
        <TelemetryRing pct={ready ? kwPct : 0}  label="SYSTEM"  value={ready ? String(p.kw) : '—'}        unit="kW"    color="var(--vh-voltage)" />
        <TelemetryRing pct={ready ? kwhPct : 0} label="LOAD"    value={ready ? p.daily.toFixed(1) : '—'}   unit="kWh/d" color="var(--vh-bio)" />
        <TelemetryRing pct={ready ? payPct : 0} label="PAYBACK" value={p.payM ? payY.toFixed(1) : '—'}     unit="YEARS" color="var(--vh-horizon)" />
      </div>

      <div style={{ padding: '16px 20px', flex: 1, overflowY: 'auto' }}>
        <div style={{ padding: 14, borderRadius: 'var(--vh-r-md)', border: '1px solid var(--vh-line)', background: 'var(--vh-surface-200)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
            <div style={{ fontFamily: 'var(--vh-font-mono)', fontSize: 10, letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--vh-text-300)' }}>5-YEAR OUTFLOW</div>
            <div style={{ display: 'flex', gap: 8, fontFamily: 'var(--vh-font-mono)', fontSize: 9, letterSpacing: '.15em', textTransform: 'uppercase' }}>
              <span style={{ color: 'var(--vh-voltage)' }}>&#9632; PLAN</span>
              <span style={{ color: 'var(--vh-text-300)' }}>&#9632; DIESEL</span>
            </div>
          </div>
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ width: '100%', height: 76 }}>
            {mg > 0 && <path d={dieselPath} stroke="var(--vh-text-300)" strokeWidth="0.6" fill="none" vectorEffect="non-scaling-stroke" />}
            <path d={planPath} stroke="var(--vh-voltage)" strokeWidth="1.2" fill="none" vectorEffect="non-scaling-stroke" />
          </svg>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--vh-font-mono)', fontSize: 9, letterSpacing: '.15em', textTransform: 'uppercase', color: 'var(--vh-text-300)', marginTop: 4 }}>
            <span>MONTH 0</span><span>M60</span>
          </div>
        </div>

        <div style={{ marginTop: 16 }}>
          <div style={{ fontFamily: 'var(--vh-font-mono)', fontSize: 10, letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--vh-text-300)', marginBottom: 8 }}>COMPONENTS</div>
          <div style={{ display: 'grid', gap: 5 }}>
            {[
              { k: 'PV',  v: p.kw,  u: 'kW',  c: 'var(--vh-voltage)' },
              { k: 'BAT', v: p.bat, u: 'kWh', c: 'var(--vh-bio)'     },
              { k: 'INV', v: p.kw,  u: 'kW',  c: 'var(--vh-horizon)' },
            ].map(row => (
              <div key={row.k} style={{ display: 'grid', gridTemplateColumns: '40px 1fr auto', gap: 10, alignItems: 'center' }}>
                <div style={{ fontFamily: 'var(--vh-font-mono)', fontSize: 10, letterSpacing: '.18em', color: row.c, fontWeight: 500 }}>{row.k}</div>
                <div style={{ height: 4, borderRadius: 2, background: 'var(--vh-surface-300)', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${Math.min(100, row.v * 8)}%`, background: row.c, transition: 'width 600ms cubic-bezier(.16,1,.3,1)' }} />
                </div>
                <div style={{ fontFamily: 'var(--vh-font-mono)', fontSize: 11, color: 'var(--vh-text-000)', fontWeight: 500 }}>{row.v} {row.u}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ padding: '14px 20px', borderTop: '1px solid var(--vh-line)', background: 'var(--vh-surface-200)', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ fontFamily: 'var(--vh-font-mono)', fontSize: 10, letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--vh-text-200)' }}>CAPEX</div>
        <div style={{
          fontFamily: 'var(--vh-font-mono)', fontWeight: 500, fontSize: 24,
          background: 'linear-gradient(180deg, var(--vh-voltage-hot), var(--vh-voltage-deep))',
          WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent',
          letterSpacing: '-0.015em',
        }}>
          {ready ? `₦${p.total.toLocaleString()}` : '—'}
        </div>
      </div>
    </div>
  )
}

// =====================================================================
// VARIANT D — PANEL (simple data rows)
// =====================================================================
const WHO_LABELS_SIMPLE: Record<string, string> = {
  homeowner: 'Homeowner',
  sme:       'Small business',
  developer: 'Project developer',
}
const SOURCE_LABELS_SIMPLE: Record<string, string> = {
  grid_only: 'Grid only',
  grid_gen:  'Grid + generator',
  gen_only:  'Generator only',
  none:      'Nothing yet',
}
const DIR_LABELS_SIMPLE: Record<string, string> = {
  solar: 'Solar PV', wind: 'Small wind',
  hybrid: 'Solar + wind', biomass: 'Biomass / biogas', any: 'Optimise for me',
}

function PanelRow({ label, value, accent }: { label: string; value: string | null; accent?: 'voltage' | 'bio' | 'horizon' }) {
  const accentColor = accent === 'bio' ? 'var(--vh-bio)' : accent === 'horizon' ? 'var(--vh-horizon)' : 'var(--vh-voltage)'
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, padding: '10px 0', borderBottom: '1px solid var(--vh-line)' }}>
      <span style={{ fontFamily: 'var(--vh-font-mono)', fontSize: 10, letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--vh-text-300)', flexShrink: 0, paddingTop: 1 }}>
        {label}
      </span>
      <AnimatePresence mode="wait">
        {value ? (
          <motion.span key={value} initial={{ opacity: 0, y: 3 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2, ease: EASE_OUT }}
            style={{ fontFamily: 'var(--vh-font-body)', fontSize: 12.5, fontWeight: 500, color: accent ? accentColor : 'var(--vh-text-000)', textAlign: 'right', lineHeight: 1.4 }}>
            {value}
          </motion.span>
        ) : (
          <motion.span key="__empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
            style={{ fontFamily: 'var(--vh-font-mono)', fontSize: 10, color: 'var(--vh-surface-300)' }}>
            —
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  )
}

function PanelVariant({ data, step }: { data: IntakeData; step: number }) {
  const totalWh = data.appliances.reduce((s, a) => s + a.watts * a.hoursPerDay * a.quantity, 0)
  const totalKwh = totalWh > 0 ? (totalWh / 1000).toFixed(1) : null
  const loadLabel = data.appliances.length > 0 ? `${data.appliances.length} appliances · ${totalKwh} kWh/day` : null
  const petrolMonthly = data.generatorKva && (data.currentSource === 'grid_gen' || data.currentSource === 'gen_only')
    ? `₦${Math.round(data.generatorKva * 30 * 1.3 * 1100).toLocaleString()}/mo` : null
  const filled = [data.who, data.location, data.currentSource, data.energyDirection, data.appliances.length > 0].filter(Boolean).length

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
      <div style={{ padding: '18px 20px', overflowY: 'auto', flex: 1 }}>
        <PanelRow label="WHO"       value={data.who ? (WHO_LABELS_SIMPLE[data.who] ?? null) : null} />
        <PanelRow label="SITE"      value={data.location || null} />
        <PanelRow label="BASELINE"  value={data.currentSource
          ? [SOURCE_LABELS_SIMPLE[data.currentSource] ?? data.currentSource, data.generatorKva ? `${data.generatorKva} kVA` : null].filter(Boolean).join(' · ')
          : null} />
        <PanelRow label="DIRECTION" value={data.energyDirection ? (DIR_LABELS_SIMPLE[data.energyDirection] ?? null) : null} />
        <PanelRow label="LOAD"      value={loadLabel} accent="bio" />
        {petrolMonthly && <PanelRow label="FUEL COST" value={petrolMonthly} accent="horizon" />}
      </div>

      <div style={{ padding: '14px 20px', borderTop: '1px solid var(--vh-line)', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
          <span style={{ fontFamily: 'var(--vh-font-mono)', fontSize: 10, letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--vh-text-300)' }}>COMPLETENESS</span>
          <span style={{ fontFamily: 'var(--vh-font-mono)', fontSize: 11, color: 'var(--vh-voltage)', fontWeight: 500 }}>{Math.round((filled / 5) * 100)}%</span>
        </div>
        <div style={{ height: 4, borderRadius: 99, overflow: 'hidden', background: 'var(--vh-surface-300)' }}>
          <motion.div
            style={{ height: '100%', background: 'linear-gradient(90deg, var(--vh-voltage-deep), var(--vh-voltage))', borderRadius: 99 }}
            animate={{ width: `${(filled / 5) * 100}%` }}
            transition={{ duration: 0.5, ease: EASE_OUT }}
          />
        </div>
      </div>

      <AnimatePresence>
        {step >= 2 && filled < 3 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3, ease: EASE_OUT }}
            style={{ padding: '0 20px 16px' }}
          >
            <div className="pria-helper" style={{ margin: 0, borderRadius: 'var(--vh-r-md)' }}>
              <p className="pria-invite" style={{ fontSize: 12 }}>
                <span className="pria-caret">Keep going — I&apos;ll size your system once your load is set</span>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// =====================================================================
// SHELL — tab switcher
// =====================================================================
const TABS: { id: Variant; label: string }[] = [
  { id: 'panel',     label: 'PANEL'     },
  { id: 'receipt',   label: 'RECEIPT'   },
  { id: 'orchestra', label: 'ORCHESTRA' },
  { id: 'telemetry', label: 'TELEMETRY' },
]

export function LivePlanPanel({ step }: { step: number }) {
  const { data } = useIntakeStore()
  const [variant, setVariant] = React.useState<Variant>('receipt')

  return (
    <div
      style={{
        position: 'sticky', top: 72,
        height: 'calc(100vh - 88px)',
        display: 'flex', flexDirection: 'column',
        background: 'var(--vh-surface-100)',
        border: '1px solid var(--vh-line)',
        borderRadius: 'var(--vh-r-xl)',
        overflow: 'hidden',
      }}
    >
      {/* Voltage top bar */}
      <div style={{ height: 3, background: 'linear-gradient(90deg, var(--vh-voltage-deep), var(--vh-voltage), var(--vh-voltage-hot))', flexShrink: 0 }} />

      {/* Variant content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={variant}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.22, ease: EASE_OUT }}
          style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}
        >
          {variant === 'panel'     && <PanelVariant     data={data} step={step} />}
          {variant === 'receipt'   && <ReceiptVariant   data={data} />}
          {variant === 'orchestra' && <OrchestraVariant data={data} step={step} />}
          {variant === 'telemetry' && <TelemetryVariant data={data} />}
        </motion.div>
      </AnimatePresence>

      {/* Tab bar */}
      <div style={{ display: 'flex', borderTop: '1px solid var(--vh-line)', background: 'var(--vh-surface-200)', flexShrink: 0 }}>
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setVariant(tab.id)}
            style={{
              flex: 1, padding: '10px 0',
              fontFamily: 'var(--vh-font-mono)', fontSize: 9,
              letterSpacing: '.16em', textTransform: 'uppercase',
              color: variant === tab.id ? 'var(--vh-voltage)' : 'var(--vh-text-300)',
              background: 'none', border: 'none', cursor: 'pointer',
              borderTop: variant === tab.id ? '2px solid var(--vh-voltage)' : '2px solid transparent',
              transition: 'color 0.2s, border-color 0.2s',
              marginTop: -1,
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  )
}
