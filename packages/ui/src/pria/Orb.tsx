import * as React from 'react'
import { clsx } from 'clsx'

type OrbState = 'idle' | 'listening' | 'thinking' | 'speaking'

export interface OrbProps {
  state?: OrbState
  size?: number
  className?: string
}

const stateGlow: Record<OrbState, string> = {
  idle:      '0 0 var(--r60) rgba(255,107,53,0.35), 0 0 var(--r30) rgba(255,107,53,0.25)',
  listening: '0 0 var(--r60) rgba(88,200,255,0.55),  0 0 var(--r30) rgba(88,200,255,0.35)',
  thinking:  '0 0 var(--r60) rgba(255,107,53,0.65),  0 0 var(--r30) rgba(255,107,53,0.45)',
  speaking:  '0 0 var(--r60) rgba(123,255,171,0.55), 0 0 var(--r30) rgba(123,255,171,0.35)',
}

const stateSpeed: Record<OrbState, string> = {
  idle:      '8s',
  listening: '5s',
  thinking:  '3s',
  speaking:  '6s',
}

export function Orb({ state = 'idle', size = 80, className }: OrbProps) {
  const r60 = `${Math.round(size * 0.6)}px`
  const r30 = `${Math.round(size * 0.3)}px`
  const inset = Math.round(size * 0.14)

  return (
    <div
      className={clsx('relative rounded-full flex-shrink-0', className)}
      style={{
        width: size,
        height: size,
        background:
          'conic-gradient(from 140deg at 50% 50%, #FF6B35 0%, #7BFFAB 22%, #58C8FF 48%, #FF6B35 72%, #7BFFAB 100%)',
        boxShadow: stateGlow[state]
          .replace(/var\(--r60\)/g, r60)
          .replace(/var\(--r30\)/g, r30),
        animation: `vh-orb-spin ${stateSpeed[state]} linear infinite`,
      }}
    >
      {/* inner dark lens with specular highlight */}
      <div
        className="absolute rounded-full"
        style={{
          inset,
          background:
            'radial-gradient(circle at 32% 28%, rgba(255,255,255,0.32), transparent 58%), var(--vh-surface-000)',
        }}
      />
    </div>
  )
}
