'use client'
import * as React from 'react'

interface MetricCardProps {
  label: string
  value: string
  unit?: string
  delta?: { value: string; positive: boolean } | undefined
  glow?: 'voltage' | 'bio' | 'horizon'
  className?: string
}

const glowMap = {
  voltage: 'border-l-[var(--vh-voltage)] shadow-[0_0_40px_rgba(255,107,53,0.12)]',
  bio: 'border-l-[var(--vh-bio)] shadow-[0_0_40px_rgba(123,255,171,0.10)]',
  horizon: 'border-l-[var(--vh-horizon)] shadow-[0_0_40px_rgba(88,200,255,0.10)]',
}

export function MetricCard({ label, value, unit, delta, glow = 'voltage', className = '' }: MetricCardProps) {
  return (
    <div
      className={`relative bg-[var(--vh-surface-200)] border border-[var(--vh-line)] border-l-2 rounded-[var(--vh-r-lg)] p-5 ${glowMap[glow]} ${className}`}
      style={{ boxShadow: 'var(--vh-inner-light)' }}
    >
      <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-[var(--vh-text-200)] mb-2">
        {label}
      </p>
      <div className="flex items-baseline gap-1">
        <span
          className="font-mono text-3xl font-medium leading-none"
          style={{
            background: 'linear-gradient(180deg, var(--vh-voltage-hot), var(--vh-voltage-deep))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {value}
        </span>
        {unit && (
          <span className="font-mono text-sm text-[var(--vh-text-200)]">{unit}</span>
        )}
      </div>
      {delta && (
        <p
          className={`font-mono text-xs mt-2 ${delta.positive ? 'text-[var(--vh-bio)]' : 'text-[var(--vh-voltage)]'}`}
        >
          {delta.positive ? '+' : ''}{delta.value}
        </p>
      )}
    </div>
  )
}
