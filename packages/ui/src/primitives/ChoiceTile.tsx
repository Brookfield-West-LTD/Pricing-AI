'use client'
import * as React from 'react'

interface ChoiceTileProps {
  counter: string
  title: string
  description?: string
  subtitle?: string
  icon?: React.ReactNode
  active?: boolean
  onClick?: () => void
}

export function ChoiceTile({ counter, title, description, subtitle, icon, active, onClick }: ChoiceTileProps) {
  return (
    <button
      onClick={onClick}
      className={[
        'relative flex flex-col justify-between p-6 rounded-[var(--vh-r-xl)] border text-left',
        'transition-all duration-[320ms] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--vh-voltage)]',
        'hover:-translate-y-0.5 hover:border-[var(--vh-voltage)]',
        active
          ? 'border-[var(--vh-voltage)] bg-[var(--vh-surface-300)] shadow-[var(--vh-elev-glow)]'
          : 'border-[var(--vh-line)] bg-[var(--vh-surface-200)] hover:shadow-[var(--vh-elev-glow)]',
      ].join(' ')}
    >
      <div className="flex items-center justify-between mb-8">
        <span className="font-mono text-[10px] tracking-[0.26em] uppercase text-[var(--vh-text-200)]">
          {counter}
        </span>
        {icon && (
          <span className={active ? 'text-[var(--vh-voltage)]' : 'text-[var(--vh-text-200)]'}>
            {icon}
          </span>
        )}
      </div>
      <div>
        <p className="font-display font-medium text-lg text-[var(--vh-text-000)]">{title}</p>
        {(description ?? subtitle) && (
          <p className="font-body text-sm text-[var(--vh-text-200)] mt-1">{description ?? subtitle}</p>
        )}
      </div>
      {active && (
        <span className="absolute top-4 right-4 w-2 h-2 rounded-full bg-[var(--vh-bio)] shadow-[var(--vh-elev-bio)]" />
      )}
    </button>
  )
}
