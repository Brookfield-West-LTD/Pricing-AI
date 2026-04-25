'use client'
import * as React from 'react'

type Variant = 'primary' | 'ghost' | 'bio'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  loading?: boolean
}

const base =
  'inline-flex items-center justify-center gap-2 font-body font-medium rounded-full transition-all duration-[180ms] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--vh-voltage)] active:scale-[0.97] disabled:opacity-40 disabled:pointer-events-none'

const variants: Record<Variant, string> = {
  primary:
    'bg-[var(--vh-voltage)] text-[var(--vh-surface-000)] hover:bg-[var(--vh-voltage-hot)] shadow-[0_0_24px_rgba(255,107,53,0.3)] hover:shadow-[0_0_40px_rgba(255,107,53,0.5)]',
  ghost:
    'border border-[var(--vh-line)] text-[var(--vh-text-000)] bg-transparent hover:bg-[var(--vh-surface-300)] hover:border-[var(--vh-voltage)]',
  bio: 'bg-[var(--vh-bio)] text-[var(--vh-surface-000)] hover:bg-[var(--vh-bio-deep)] shadow-[0_0_24px_rgba(123,255,171,0.25)]',
}

const sizes: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', loading, children, className = '', ...props }, ref) => (
    <button
      ref={ref}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={loading ?? props.disabled}
      {...props}
    >
      {loading && (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      )}
      {children}
    </button>
  ),
)
Button.displayName = 'Button'
