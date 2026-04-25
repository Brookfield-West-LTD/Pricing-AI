'use client'
import * as React from 'react'

interface PillProps {
  label?: string
  children?: React.ReactNode
  active?: boolean
  onClick?: () => void
  dot?: boolean
  className?: string
}

export function Pill({ label, children, active, onClick, dot, className = '' }: PillProps) {
  return (
    <button
      onClick={onClick}
      className={[
        'inline-flex items-center gap-2 px-4 py-2 rounded-full font-body text-sm transition-all duration-[180ms]',
        'border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--vh-voltage)]',
        active
          ? 'border-[var(--vh-voltage)] bg-gradient-to-r from-[var(--vh-voltage)] to-[var(--vh-voltage-deep)] text-[var(--vh-surface-000)]'
          : 'border-[var(--vh-line)] bg-[var(--vh-surface-200)] text-[var(--vh-text-000)] hover:border-[var(--vh-voltage)] hover:bg-[var(--vh-surface-300)]',
        className,
      ].join(' ')}
    >
      {dot && (
        <span
          className={`w-1.5 h-1.5 rounded-full ${active ? 'bg-[var(--vh-surface-000)]' : 'bg-[var(--vh-bio)]'}`}
        />
      )}
      {label ?? children}
    </button>
  )
}
