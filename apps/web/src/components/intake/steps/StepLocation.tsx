'use client'
import * as React from 'react'
import { useIntakeStore } from '@/lib/store'
import { Button } from '@pricing-ai/ui/primitives/Button'

const CITIES = ['Lagos', 'Abuja', 'Port Harcourt', 'Ibadan', 'Kano', 'Benin City', 'Enugu', 'Kaduna']

function IrradianceMap({ location }: { location: string }) {
  return (
    <div
      className="rounded-xl overflow-hidden border"
      style={{ borderColor: 'var(--vh-line)', background: 'var(--vh-surface-100)' }}
    >
      <div style={{ position: 'relative', height: 200, background: 'radial-gradient(circle at 50% 50%, rgba(255,107,53,0.15), transparent 55%), var(--vh-surface-200)' }}>
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.5 }} aria-hidden>
          <defs>
            <pattern id="vhgrid" width="36" height="36" patternUnits="userSpaceOnUse">
              <path d="M 36 0 L 0 0 0 36" fill="none" stroke="rgba(200,212,224,0.12)" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#vhgrid)" />
          <circle cx="50%" cy="50%" r="52" fill="#FF6B35" fillOpacity="0.08" />
          <circle cx="50%" cy="50%" r="28" fill="#FF6B35" fillOpacity="0.18" />
          <circle cx="50%" cy="50%" r="7" fill="#FF6B35" />
        </svg>

        <div style={{ position: 'absolute', bottom: 14, left: 16, fontFamily: 'var(--vh-font-mono)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--vh-text-200)' }}>
          <span style={{ color: 'var(--vh-voltage)' }}>IRRADIANCE</span>
          {' '}· 5.4 kWh/m²/day
          {' '}&nbsp;·&nbsp;{' '}
          <span style={{ color: 'var(--vh-horizon)' }}>GRID UPTIME</span>
          {' '}· 63%
          {location && (
            <span style={{ color: 'var(--vh-text-000)', marginLeft: 8 }}>· {location}</span>
          )}
        </div>
      </div>
    </div>
  )
}

export function StepLocation() {
  const { data, updateData, nextStep, prevStep } = useIntakeStore()
  const [query, setQuery] = React.useState(data.location)
  const [hits, setHits] = React.useState<string[]>([])
  const inputRef = React.useRef<HTMLInputElement>(null)

  function handleChange(val: string) {
    setQuery(val)
    updateData({ location: val, lat: null, lng: null })
    if (val.length >= 2) {
      setHits(CITIES.filter(s => s.toLowerCase().includes(val.toLowerCase())).slice(0, 5))
    } else {
      setHits([])
    }
  }

  function pick(loc: string) {
    setQuery(loc)
    setHits([])
    updateData({ location: loc })
    inputRef.current?.blur()
  }

  const canContinue = data.location.length >= 3

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      {/* Header */}
      <div className="vh-up" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <p style={{ fontFamily: 'var(--vh-font-mono)', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--vh-text-200)', margin: 0, display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ color: 'var(--vh-voltage)' }}>—</span>
          02 · WHERE EXACTLY
        </p>
        <h2 style={{ fontFamily: 'var(--vh-font-display)', fontWeight: 300, fontSize: 'clamp(36px, 5vw, 64px)', letterSpacing: '-0.035em', lineHeight: 0.95, color: 'var(--vh-text-000)', margin: 0 }}>
          Where{' '}
          <em style={{ fontStyle: 'italic', fontWeight: 500, color: 'var(--vh-voltage)' }}>exactly</em>{' '}
          is the site?
        </h2>
        <p style={{ fontFamily: 'var(--vh-font-body)', fontSize: 16, lineHeight: 1.55, color: 'var(--vh-text-200)', maxWidth: '52ch', margin: 0 }}>
          We pull solar irradiance, grid uptime, and local installer availability for the exact spot.
        </p>
      </div>

      {/* Input */}
      <div className="relative">
        <div
          className="flex items-center gap-3 rounded-xl border px-4 py-3 transition-all duration-150"
          style={{
            background: 'var(--vh-surface-100)',
            borderColor: query ? 'var(--vh-voltage)' : 'var(--vh-line)',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--vh-text-300)', flexShrink: 0 }} aria-hidden>
            <path d="M12 22s8-7.58 8-13a8 8 0 10-16 0c0 5.42 8 13 8 13z" />
            <circle cx="12" cy="9" r="3" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => handleChange(e.target.value)}
            placeholder="Type a city, state, or full address…"
            className="flex-1 bg-transparent text-base outline-none"
            style={{ color: 'var(--vh-text-000)', fontFamily: 'var(--vh-font-body)' }}
          />
          <span style={{ fontFamily: 'var(--vh-font-mono)', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--vh-text-300)', flexShrink: 0 }}>
            GPS · OPTIONAL
          </span>
        </div>

        {/* Autocomplete dropdown */}
        {hits.length > 0 && (
          <div
            className="absolute top-full mt-1 w-full rounded-xl border overflow-hidden z-10"
            style={{ background: 'var(--vh-surface-200)', borderColor: 'var(--vh-surface-300)' }}
          >
            {hits.map(h => (
              <button
                key={h}
                onClick={() => pick(h)}
                className="w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-[var(--vh-surface-300)]"
                style={{ color: 'var(--vh-text-000)', fontFamily: 'var(--vh-font-body)' }}
              >
                {h}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* City pills */}
      <div>
        <p style={{ fontFamily: 'var(--vh-font-mono)', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--vh-text-200)', marginBottom: 10 }}>
          — OR PICK A MAJOR CITY
        </p>
        <div className="flex flex-wrap gap-2">
          {CITIES.map(c => (
            <button
              key={c}
              onClick={() => pick(c)}
              className="px-3 py-1.5 rounded-full text-sm border transition-all duration-150"
              style={{
                background: data.location === c ? 'var(--vh-voltage)' : 'transparent',
                borderColor: data.location === c ? 'var(--vh-voltage)' : 'var(--vh-line)',
                color: data.location === c ? '#0A0F14' : 'var(--vh-text-200)',
                fontFamily: 'var(--vh-font-body)',
              }}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Irradiance map */}
      <IrradianceMap location={data.location} />

      <div className="flex justify-between pt-2">
        <Button variant="ghost" size="md" onClick={prevStep}>← Back</Button>
        <Button variant="primary" size="md" disabled={!canContinue} onClick={nextStep}>
          Continue →
        </Button>
      </div>
    </div>
  )
}
