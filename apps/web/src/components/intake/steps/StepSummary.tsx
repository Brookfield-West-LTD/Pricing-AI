'use client'
import * as React from 'react'
import { useRouter } from 'next/navigation'
import { useIntakeStore } from '@/lib/store'
import { Button } from '@pricing-ai/ui/primitives/Button'
import type { Priority } from '@pricing-ai/shared'

const PRIORITY_OPTIONS: { value: Priority; label: string; description: string; color: string }[] = [
  { value: 'cost',          label: 'Lowest cost',    description: 'Minimise CapEx and payback period.', color: 'var(--vh-voltage)' },
  { value: 'reliability',   label: 'Max reliability', description: 'Never lose power — autonomy first.', color: 'var(--vh-bio)' },
  { value: 'sustainability', label: 'Sustainability',  description: 'Maximise clean energy fraction.',    color: 'var(--vh-horizon)' },
]

const WHO_LABELS: Record<string, string> = {
  homeowner: 'Homeowner', sme: 'Small business', industrial: 'Industrial', developer: 'Project developer',
}
const SOURCE_LABELS: Record<string, string> = {
  grid_only: 'Grid only', grid_gen: 'Grid + generator', gen_only: 'Generator only', none: 'Nothing yet',
}
const DIR_LABELS: Record<string, string> = {
  solar: 'Solar PV', wind: 'Small wind', hybrid: 'Solar + wind', biomass: 'Biomass / biogas', any: 'Optimise for me',
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div
      className="flex items-baseline justify-between py-3"
      style={{ borderBottom: '1px solid var(--vh-line)' }}
    >
      <span style={{ fontFamily: 'var(--vh-font-mono)', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--vh-text-300)' }}>
        {label}
      </span>
      <span style={{ fontFamily: 'var(--vh-font-body)', fontSize: 13, fontWeight: 500, color: 'var(--vh-text-000)', textAlign: 'right' }}>
        {value}
      </span>
    </div>
  )
}

export function StepSummary() {
  const router = useRouter()
  const { data, priority, setPriority, prevStep, planId, shareToken } = useIntakeStore()
  const [submitting, setSubmitting] = React.useState(false)

  const totalKwh = data.appliances.reduce((s, a) => s + (a.watts * a.hoursPerDay * a.quantity) / 1000, 0)

  async function handleSubmit() {
    if (!planId) return
    setSubmitting(true)
    try {
      await fetch('/api/plans/' + planId + '/submit', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ data, priority }),
      })
      router.push('/reveal/' + shareToken)
    } catch {
      setSubmitting(false)
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      {/* Header */}
      <div className="vh-up" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <p style={{ fontFamily: 'var(--vh-font-mono)', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--vh-text-200)', margin: 0, display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ color: 'var(--vh-voltage)' }}>—</span>
          07 · REVIEW & GENERATE
        </p>
        <h2 style={{ fontFamily: 'var(--vh-font-display)', fontWeight: 300, fontSize: 'clamp(36px, 5vw, 64px)', letterSpacing: '-0.035em', lineHeight: 0.95, color: 'var(--vh-text-000)', margin: 0 }}>
          Ready to{' '}
          <em style={{ fontStyle: 'italic', fontWeight: 500, color: 'var(--vh-voltage)' }}>generate</em>{' '}
          your plan?
        </h2>
        <p style={{ fontFamily: 'var(--vh-font-body)', fontSize: 16, lineHeight: 1.55, color: 'var(--vh-text-200)', maxWidth: '52ch', margin: 0 }}>
          Review what Pria will price, then choose what matters most to you.
        </p>
      </div>

      {/* Summary receipt */}
      <div
        className="rounded-xl border overflow-hidden"
        style={{ background: 'var(--vh-surface-100)', borderColor: 'var(--vh-line)' }}
      >
        <div style={{ height: 3, background: 'linear-gradient(90deg, var(--vh-voltage-deep), var(--vh-voltage), var(--vh-voltage-hot))' }} />
        <div className="px-5 py-1">
          <SummaryRow label="WHO"       value={data.who ? (WHO_LABELS[data.who] ?? data.who) : '—'} />
          <SummaryRow label="SITE"      value={data.location || '—'} />
          <SummaryRow label="BASELINE"  value={
            data.currentSource
              ? [SOURCE_LABELS[data.currentSource] ?? data.currentSource, data.generatorKva ? `${data.generatorKva} kVA` : null].filter(Boolean).join(' · ')
              : '—'
          } />
          <SummaryRow label="DIRECTION" value={data.energyDirection ? (DIR_LABELS[data.energyDirection] ?? data.energyDirection) : '—'} />
          <SummaryRow label="APPLIANCES" value={String(data.appliances.length)} />
          <SummaryRow label="DAILY LOAD" value={`${totalKwh.toFixed(2)} kWh`} />
          {data.extractedKwh && (
            <SummaryRow label="BILL REF." value={`${data.extractedKwh.toFixed(1)} kWh/mo`} />
          )}
        </div>
      </div>

      {/* Priority picker */}
      <div className="flex flex-col gap-3">
        <p style={{ fontFamily: 'var(--vh-font-mono)', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--vh-text-200)' }}>
          — OPTIMISE FOR
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {PRIORITY_OPTIONS.map(opt => {
            const active = priority === opt.value
            return (
              <button
                key={opt.value}
                onClick={() => setPriority(opt.value)}
                className="flex flex-col gap-2 rounded-xl border text-left transition-all duration-200"
                style={{
                  padding: '14px 16px',
                  background: active ? 'var(--vh-surface-200)' : 'var(--vh-surface-100)',
                  borderColor: active ? opt.color : 'var(--vh-line)',
                  boxShadow: active ? `0 0 0 1px ${opt.color}, 0 0 20px rgba(255,107,53,0.06)` : 'none',
                }}
              >
                <div
                  className="rounded-full"
                  style={{ width: 8, height: 8, background: opt.color, boxShadow: active ? `0 0 10px ${opt.color}` : 'none' }}
                />
                <p style={{ fontFamily: 'var(--vh-font-body)', fontSize: 14, fontWeight: 500, color: active ? 'var(--vh-text-000)' : 'var(--vh-text-100)' }}>
                  {opt.label}
                </p>
                <p style={{ fontFamily: 'var(--vh-font-body)', fontSize: 12, color: 'var(--vh-text-200)', lineHeight: 1.4 }}>
                  {opt.description}
                </p>
              </button>
            )
          })}
        </div>
      </div>

      <div className="flex justify-between pt-2">
        <Button variant="ghost" size="md" onClick={prevStep}>← Back</Button>
        <Button
          variant="primary"
          size="lg"
          disabled={submitting}
          onClick={handleSubmit}
        >
          {submitting ? (
            <span className="flex items-center gap-2">
              <span
                className="inline-block w-4 h-4 rounded-full border-2"
                style={{ borderColor: 'transparent', borderTopColor: '#0A0F14', animation: 'vh-orb-spin 0.8s linear infinite' }}
              />
              Generating plan…
            </span>
          ) : (
            'Generate my plan →'
          )}
        </Button>
      </div>
    </div>
  )
}
