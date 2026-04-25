'use client'
import * as React from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useIntakeStore } from '@/lib/store'
import { Button } from '@pricing-ai/ui/primitives/Button'
import type { CurrentSource } from '@pricing-ai/shared'

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1]

const OPTIONS: { value: CurrentSource; title: string; desc: string; badge?: string }[] = [
  { value: 'gen_only',  title: 'Generator',        desc: 'Diesel or petrol generator is the workhorse.',    badge: 'MOST COMMON' },
  { value: 'grid_only', title: 'Grid only',         desc: 'DisCo supply only — no backup right now.' },
  { value: 'grid_gen',  title: 'Grid + generator',  desc: "Grid when it's up, generator when it's not." },
  { value: 'none',      title: 'Nothing yet',       desc: 'New build, off-grid site, or starting fresh.' },
]

function PowerTile({
  opt,
  index,
  active,
  onClick,
}: {
  opt: typeof OPTIONS[number]
  index: number
  active: boolean
  onClick: () => void
}) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.38, ease: EASE_OUT, delay: 0.1 + index * 0.05 }}
      onClick={onClick}
      style={{
        display: 'flex', flexDirection: 'column', gap: 10,
        minHeight: 130, padding: 18, textAlign: 'left',
        background: active
          ? 'linear-gradient(180deg, rgba(255,107,53,0.10), rgba(255,107,53,0.02))'
          : 'var(--vh-surface-100)',
        border: `1px solid ${active ? 'var(--vh-voltage)' : 'var(--vh-line)'}`,
        borderRadius: 'var(--vh-r-lg)',
        boxShadow: active ? '0 0 0 1px rgba(255,107,53,0.35), 0 18px 40px -18px rgba(255,107,53,0.35)' : 'none',
        cursor: 'pointer',
        transition: 'border-color 220ms cubic-bezier(.2,.7,.2,1), box-shadow 220ms cubic-bezier(.2,.7,.2,1), background 220ms cubic-bezier(.2,.7,.2,1)',
        width: '100%',
      }}
    >
      {/* Title row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{
          fontFamily: 'var(--vh-font-display)', fontSize: 24,
          fontWeight: 500, letterSpacing: '-0.02em',
          color: 'var(--vh-text-000)',
        }}>
          {opt.title}
        </span>
        {opt.badge && (
          <span style={{
            fontFamily: 'var(--vh-font-mono)', fontSize: 9,
            letterSpacing: '.18em', textTransform: 'uppercase',
            color: 'var(--vh-voltage)',
            border: '1px solid var(--vh-line-hot)',
            padding: '3px 8px', borderRadius: 999,
            flexShrink: 0,
          }}>
            {opt.badge}
          </span>
        )}
      </div>

      {/* Description */}
      <span style={{
        fontFamily: 'var(--vh-font-body)', fontSize: 13.5,
        color: 'var(--vh-text-200)', lineHeight: 1.5,
      }}>
        {opt.desc}
      </span>

      {/* Active check dot */}
      {active && (
        <span style={{
          position: 'absolute', top: 14, right: 14,
          width: 8, height: 8, borderRadius: '50%',
          background: 'var(--vh-bio)',
          boxShadow: '0 0 10px var(--vh-bio)',
          display: 'inline-block',
        }} />
      )}
    </motion.button>
  )
}

export function StepCurrentPower() {
  const { data, updateData, nextStep, prevStep } = useIntakeStore()
  const [kva, setKva] = React.useState(data.generatorKva ?? 5)

  const showGen = data.currentSource === 'grid_gen' || data.currentSource === 'gen_only'
  const petrolPerMonth = Math.round(kva * 30 * 1.3 * 1100)

  function handleKvaChange(newKva: number) {
    const clamped = Math.max(1, Math.min(500, newKva))
    setKva(clamped)
    updateData({ generatorKva: clamped })
  }

  React.useEffect(() => {
    if (showGen) updateData({ generatorKva: kva })
  }, [showGen]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      {/* Header */}
      <div className="vh-up" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <p style={{
          fontFamily: 'var(--vh-font-mono)', fontSize: 11,
          letterSpacing: '0.2em', textTransform: 'uppercase',
          color: 'var(--vh-text-200)', margin: 0,
          display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <span style={{ color: 'var(--vh-voltage)' }}>—</span>
          03 · WHAT YOU HAVE TODAY
        </p>

        <h2 style={{
          fontFamily: 'var(--vh-font-display)', fontWeight: 300,
          fontSize: 'clamp(36px, 5vw, 64px)',
          letterSpacing: '-0.035em', lineHeight: 0.95,
          color: 'var(--vh-text-000)', margin: 0,
        }}>
          What runs your{' '}
          <em style={{ fontStyle: 'italic', fontWeight: 500, color: 'var(--vh-voltage)' }}>
            power
          </em>{' '}
          today?
        </h2>

        <p style={{
          fontFamily: 'var(--vh-font-body)', fontSize: 16,
          lineHeight: 1.55, color: 'var(--vh-text-200)',
          maxWidth: '52ch', margin: 0,
        }}>
          Your baseline is what every plan is compared against — petrol spend, uptime, CO₂.
        </p>
      </div>

      {/* 2×2 tile grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, position: 'relative' }}>
        {OPTIONS.map((opt, i) => (
          <PowerTile
            key={opt.value}
            opt={opt}
            index={i}
            active={data.currentSource === opt.value}
            onClick={() => updateData({ currentSource: opt.value })}
          />
        ))}
      </div>

      {/* Generator kVA stepper */}
      <AnimatePresence>
        {showGen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: EASE_OUT }}
          >
            <div style={{
              display: 'flex', alignItems: 'center', gap: 14,
              flexWrap: 'wrap', padding: 18,
              background: 'var(--vh-surface-100)',
              border: '1px solid var(--vh-line)',
              borderRadius: 'var(--vh-r-lg)',
            }}>
              <span style={{
                fontFamily: 'var(--vh-font-mono)', fontSize: 10,
                letterSpacing: '.18em', textTransform: 'uppercase',
                color: 'var(--vh-text-200)', flexShrink: 0,
              }}>
                — GEN SIZE
              </span>

              {/* Stepper */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, border: '1px solid var(--vh-line)', borderRadius: 999, padding: '4px 6px' }}>
                <button
                  onClick={() => handleKvaChange(kva - 1)}
                  style={{ width: 30, height: 30, borderRadius: '50%', background: 'var(--vh-surface-200)', color: 'var(--vh-text-000)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  aria-label="Decrease kVA"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14" /></svg>
                </button>
                <span style={{ fontFamily: 'var(--vh-font-mono)', fontSize: 22, color: 'var(--vh-voltage)', fontWeight: 500, minWidth: 44, textAlign: 'center' }}>
                  {kva}
                </span>
                <button
                  onClick={() => handleKvaChange(kva + 1)}
                  style={{ width: 30, height: 30, borderRadius: '50%', background: 'var(--vh-surface-200)', color: 'var(--vh-text-000)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  aria-label="Increase kVA"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M12 5v14" /><path d="M5 12h14" /></svg>
                </button>
              </div>

              <span style={{ fontFamily: 'var(--vh-font-body)', color: 'var(--vh-text-000)', fontSize: 14 }}>kVA</span>

              <span style={{ marginLeft: 'auto', fontFamily: 'var(--vh-font-mono)', fontSize: 11, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--vh-text-200)' }}>
                ≈{' '}
                <span style={{ color: 'var(--vh-voltage-hot)' }}>
                  ₦{petrolPerMonth.toLocaleString()}
                </span>
                /MO IN PETROL
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Nav */}
      <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 8 }}>
        <Button variant="ghost" size="md" onClick={prevStep}>← Back</Button>
        <Button variant="primary" size="md" disabled={!data.currentSource} onClick={nextStep}>
          Continue →
        </Button>
      </div>
    </div>
  )
}
