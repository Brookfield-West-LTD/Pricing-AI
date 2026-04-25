'use client'
import * as React from 'react'
import { motion } from 'motion/react'
import { useIntakeStore } from '@/lib/store'
import { Button } from '@pricing-ai/ui/primitives/Button'
import type { EnergyDirection } from '@pricing-ai/shared'

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1]

const PRIMARY_OPTIONS: { value: EnergyDirection; title: string; meta: string; description: string }[] = [
  { value: 'solar',   title: 'Solar PV',         meta: 'PHOTOVOLTAIC',   description: 'Rooftop or ground-mount panels + hybrid inverter.' },
  { value: 'wind',    title: 'Small wind',        meta: 'SITE-DEPENDENT', description: 'Best on coastal / elevated sites with steady wind.' },
  { value: 'hybrid',  title: 'Solar + wind',      meta: 'MOST RESILIENT', description: 'Solar + battery + existing generator as a last fallback.' },
  { value: 'biomass', title: 'Biomass / biogas',  meta: 'AG-ADJACENT',    description: 'Digester or husk gasifier for farms & food processing.' },
]

export function StepDirection() {
  const { data, updateData, nextStep, prevStep } = useIntakeStore()

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      {/* Header */}
      <div className="vh-up" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <p style={{ fontFamily: 'var(--vh-font-mono)', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--vh-text-200)', margin: 0, display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ color: 'var(--vh-voltage)' }}>—</span>
          04 · DIRECTION
        </p>
        <h2 style={{ fontFamily: 'var(--vh-font-display)', fontWeight: 300, fontSize: 'clamp(36px, 5vw, 64px)', letterSpacing: '-0.035em', lineHeight: 0.95, color: 'var(--vh-text-000)', margin: 0 }}>
          Which{' '}
          <em style={{ fontStyle: 'italic', fontWeight: 500, color: 'var(--vh-voltage)' }}>direction</em>{' '}
          are you exploring?
        </h2>
        <p style={{ fontFamily: 'var(--vh-font-body)', fontSize: 16, lineHeight: 1.55, color: 'var(--vh-text-200)', maxWidth: '52ch', margin: 0 }}>
          Pick one — or let Pria choose the best fit for your site, load, and budget.
        </p>
      </div>

      {/* 2-col grid for primary options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {PRIMARY_OPTIONS.map((opt, index) => {
          const active = data.energyDirection === opt.value
          return (
            <motion.button
              key={opt.value}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.38, ease: EASE_OUT, delay: 0.1 + index * 0.05 }}
              onClick={() => updateData({ energyDirection: opt.value })}
              className="flex flex-col gap-2 rounded-xl border text-left transition-all duration-200"
              style={{
                minHeight: 130,
                padding: 18,
                background: active ? 'var(--vh-surface-200)' : 'var(--vh-surface-100)',
                borderColor: active ? 'var(--vh-voltage)' : 'var(--vh-line)',
                boxShadow: active ? '0 0 0 1px var(--vh-voltage), 0 0 20px rgba(255,107,53,0.08)' : 'none',
              }}
            >
              <p style={{ fontFamily: 'var(--vh-font-mono)', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--vh-text-300)' }}>
                {opt.meta}
              </p>
              <p style={{ fontFamily: 'var(--vh-font-display)', fontSize: 28, fontWeight: 500, letterSpacing: '-0.02em', color: 'var(--vh-text-000)', lineHeight: 1 }}>
                {opt.title}
              </p>
              <p style={{ fontFamily: 'var(--vh-font-body)', fontSize: 13.5, color: 'var(--vh-text-200)', lineHeight: 1.5 }}>
                {opt.description}
              </p>
            </motion.button>
          )
        })}

        {/* Full-width "Let Pria pick" option */}
        <motion.button
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.38, ease: EASE_OUT, delay: 0.1 + 4 * 0.05 }}
          onClick={() => updateData({ energyDirection: 'any' })}
          className="col-span-1 sm:col-span-2 flex items-center justify-between gap-4 rounded-xl border text-left transition-all duration-200"
          style={{
            minHeight: 100,
            padding: '18px 22px',
            background: data.energyDirection === 'any' ? 'var(--vh-surface-200)' : 'var(--vh-surface-100)',
            borderColor: data.energyDirection === 'any' ? 'var(--vh-voltage)' : 'var(--vh-line)',
            boxShadow: data.energyDirection === 'any' ? '0 0 0 1px var(--vh-voltage), 0 0 20px rgba(255,107,53,0.08)' : 'none',
          }}
        >
          <div className="flex flex-col gap-1.5">
            <p style={{ fontFamily: 'var(--vh-font-mono)', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--vh-voltage)' }}>
              — RECOMMENDED
            </p>
            <p style={{ fontFamily: 'var(--vh-font-display)', fontSize: 28, fontWeight: 500, letterSpacing: '-0.02em', color: 'var(--vh-text-000)', lineHeight: 1 }}>
              Optimise for me
            </p>
            <p style={{ fontFamily: 'var(--vh-font-body)', fontSize: 13.5, color: 'var(--vh-text-200)', lineHeight: 1.5 }}>
              Tell Pria your constraints — she picks what fits your site, load, and budget best.
            </p>
          </div>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--vh-voltage)', flexShrink: 0 }} aria-hidden={true}>
            <path d="M12 3v4" /><path d="M12 17v4" /><path d="M3 12h4" /><path d="M17 12h4" />
            <path d="M5.6 5.6l2.8 2.8" /><path d="M15.6 15.6l2.8 2.8" />
            <path d="M18.4 5.6l-2.8 2.8" /><path d="M8.4 15.6l-2.8 2.8" />
          </svg>
        </motion.button>
      </div>

      <div className="flex justify-between pt-2">
        <Button variant="ghost" size="md" onClick={prevStep}>← Back</Button>
        <Button variant="primary" size="md" disabled={!data.energyDirection} onClick={nextStep}>
          Continue →
        </Button>
      </div>
    </div>
  )
}
