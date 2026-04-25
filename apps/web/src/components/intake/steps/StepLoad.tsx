'use client'
import * as React from 'react'
import { motion } from 'motion/react'
import { useIntakeStore } from '@/lib/store'
import { Button } from '@pricing-ai/ui/primitives/Button'

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1]

const LOAD_LIB = [
  { id: 'lights',   name: 'LED lights',      watts: 60,   defaultHours: 6  },
  { id: 'fan',      name: 'Standing fan',    watts: 75,   defaultHours: 8  },
  { id: 'tv',       name: 'TV + decoder',    watts: 120,  defaultHours: 5  },
  { id: 'fridge',   name: 'Refrigerator',    watts: 200,  defaultHours: 24 },
  { id: 'freezer',  name: 'Deep freezer',    watts: 350,  defaultHours: 24 },
  { id: 'ac1',      name: 'AC (1 hp)',        watts: 750,  defaultHours: 6  },
  { id: 'ac15',     name: 'AC (1.5 hp)',      watts: 1100, defaultHours: 6  },
  { id: 'iron',     name: 'Pressing iron',   watts: 1000, defaultHours: 1  },
  { id: 'pump',     name: 'Pumping machine', watts: 750,  defaultHours: 1  },
  { id: 'router',   name: 'Wi-Fi router',    watts: 15,   defaultHours: 24 },
  { id: 'laptop',   name: 'Laptop',          watts: 65,   defaultHours: 8  },
  { id: 'borehole', name: 'Borehole pump',   watts: 1500, defaultHours: 2  },
]

export function StepLoad() {
  const { data, addAppliance, removeAppliance, updateApplianceHours, nextStep, prevStep } = useIntakeStore()

  const totalWh = data.appliances.reduce((s, a) => s + a.watts * a.hoursPerDay * a.quantity, 0)

  function toggle(item: typeof LOAD_LIB[number]) {
    const existing = data.appliances.find(a => a.id === item.id)
    if (existing) {
      removeAppliance(item.id)
    } else {
      addAppliance({ id: item.id, name: item.name, watts: item.watts, hoursPerDay: item.defaultHours, quantity: 1 })
    }
  }

  function adjustHours(id: string, delta: number) {
    const a = data.appliances.find(x => x.id === id)
    if (!a) return
    updateApplianceHours(id, a.hoursPerDay + delta)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      {/* Header */}
      <div className="vh-up" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <p style={{ fontFamily: 'var(--vh-font-mono)', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--vh-text-200)', margin: 0, display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ color: 'var(--vh-voltage)' }}>—</span>
          05 · WHAT MUST STAY ON
        </p>
        <h2 style={{ fontFamily: 'var(--vh-font-display)', fontWeight: 300, fontSize: 'clamp(36px, 5vw, 64px)', letterSpacing: '-0.035em', lineHeight: 0.95, color: 'var(--vh-text-000)', margin: 0 }}>
          What needs to{' '}
          <em style={{ fontStyle: 'italic', fontWeight: 500, color: 'var(--vh-voltage)' }}>stay on</em>?
        </h2>
        <p style={{ fontFamily: 'var(--vh-font-body)', fontSize: 16, lineHeight: 1.55, color: 'var(--vh-text-200)', maxWidth: '52ch', margin: 0 }}>
          Tap appliances that must keep running when the grid drops. Pria sizes battery autonomy around these.
        </p>
      </div>

      {/* Appliance tile grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
        {LOAD_LIB.map((item, index) => {
          const sel = data.appliances.find(a => a.id === item.id)
          return (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: EASE_OUT, delay: 0.05 + (index % 8) * 0.04 }}
              onClick={() => toggle(item)}
              className="relative flex flex-col justify-between rounded-xl border text-left transition-all duration-200"
              style={{
                minHeight: 92,
                padding: 14,
                background: sel ? 'var(--vh-surface-200)' : 'var(--vh-surface-100)',
                borderColor: sel ? 'var(--vh-voltage)' : 'var(--vh-line)',
                boxShadow: sel ? '0 0 0 1px var(--vh-voltage), 0 0 20px rgba(255,107,53,0.08)' : 'none',
              }}
            >
              <div>
                <p style={{ fontFamily: 'var(--vh-font-body)', fontWeight: 500, fontSize: 13.5, color: 'var(--vh-text-000)', marginBottom: 3 }}>
                  {item.name}
                </p>
                <p style={{ fontFamily: 'var(--vh-font-mono)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--vh-text-300)' }}>
                  {item.watts}W
                </p>
              </div>

              {sel && (
                <div
                  className="flex items-center gap-1.5 mt-2"
                  onClick={e => e.stopPropagation()}
                >
                  <button
                    onClick={e => { e.stopPropagation(); adjustHours(item.id, -1) }}
                    className="flex items-center justify-center rounded-full transition-colors"
                    style={{ width: 24, height: 24, background: 'var(--vh-surface-300)', color: 'var(--vh-text-000)', border: 'none', cursor: 'pointer', flexShrink: 0 }}
                    aria-label="Decrease hours"
                  >
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14" /></svg>
                  </button>
                  <span style={{ fontFamily: 'var(--vh-font-mono)', fontSize: 13, color: 'var(--vh-voltage)', fontWeight: 500, minWidth: 32, textAlign: 'center' }}>
                    {sel.hoursPerDay}h
                  </span>
                  <button
                    onClick={e => { e.stopPropagation(); adjustHours(item.id, 1) }}
                    className="flex items-center justify-center rounded-full transition-colors"
                    style={{ width: 24, height: 24, background: 'var(--vh-surface-300)', color: 'var(--vh-text-000)', border: 'none', cursor: 'pointer', flexShrink: 0 }}
                    aria-label="Increase hours"
                  >
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M12 5v14" /><path d="M5 12h14" /></svg>
                  </button>
                </div>
              )}
            </motion.button>
          )
        })}
      </div>

      {/* Summary bar */}
      <div
        className="flex items-end justify-between gap-4 flex-wrap rounded-xl border px-5 py-4"
        style={{ background: 'var(--vh-surface-100)', borderColor: 'var(--vh-line)' }}
      >
        <div>
          <p style={{ fontFamily: 'var(--vh-font-mono)', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--vh-text-200)', marginBottom: 6 }}>
            — DAILY ENERGY
          </p>
          <p style={{ fontFamily: 'var(--vh-font-mono)', fontWeight: 500, fontSize: 38, lineHeight: 1, letterSpacing: '-0.01em', background: 'linear-gradient(180deg, var(--vh-voltage-hot), var(--vh-voltage-deep))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            {(totalWh / 1000).toFixed(1)}
            <span style={{ fontSize: 13, WebkitTextFillColor: 'var(--vh-text-300)', marginLeft: 6 }}>kWh/day</span>
          </p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <p style={{ fontFamily: 'var(--vh-font-mono)', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--vh-text-200)', marginBottom: 6 }}>
            APPLIANCES
          </p>
          <p style={{ fontFamily: 'var(--vh-font-mono)', fontSize: 38, color: 'var(--vh-text-000)', fontWeight: 500, lineHeight: 1 }}>
            {data.appliances.length}
          </p>
        </div>
      </div>

      <div className="flex justify-between pt-2">
        <Button variant="ghost" size="md" onClick={prevStep}>← Back</Button>
        <Button variant="primary" size="md" disabled={data.appliances.length === 0} onClick={nextStep}>
          Continue →
        </Button>
      </div>
    </div>
  )
}
