'use client'
import * as React from 'react'
import { useRouter } from 'next/navigation'
import { AnimatePresence, motion } from 'motion/react'
import { useIntakeStore } from '@/lib/store'
import { VoiceCard } from '@pricing-ai/ui/pria/VoiceCard'
import { PriaComposer } from '@pricing-ai/ui/pria/PriaComposer'
import { LivePlanPanel } from './LivePlanPanel'

const STEP_LABELS = ['Who', 'Location', 'Current power', 'Direction', 'Load', 'Bill', 'Summary']
const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1]

interface IntakeShellProps {
  children: React.ReactNode
  step: number
  total?: number
}

function PricingAILogo() {
  return (
    <svg width="22" height="22" viewBox="0 0 64 64" fill="none" aria-hidden>
      <defs>
        <linearGradient id="tbg" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#FF8A5C" />
          <stop offset="1" stopColor="#D94E1F" />
        </linearGradient>
      </defs>
      <path d="M6 50 Q 32 6, 58 30" stroke="url(#tbg)" strokeWidth="4.5" strokeLinecap="round" fill="none" />
      <path d="M34 22 L28 36 L36 36 L30 50" stroke="#F4F8FB" strokeWidth="3.2" strokeLinejoin="round" strokeLinecap="round" fill="none" />
      <circle cx="6" cy="50" r="3" fill="#7BFFAB" />
    </svg>
  )
}

export function IntakeShell({ children, step, total = STEP_LABELS.length }: IntakeShellProps) {
  const router = useRouter()
  const { pria, openPria, closePria, toggleVoice, planId, reset } = useIntakeStore()
  const progress = ((step + 1) / total) * 100

  function handleRestart() {
    reset()
    router.push('/')
  }

  return (
    <div
      className="relative min-h-[100dvh] flex flex-col"
      style={{ background: 'var(--vh-surface-000)', color: 'var(--vh-text-000)' }}
    >
      {/* Top progress bar */}
      <div className="fixed top-0 inset-x-0 h-[2px] z-30" style={{ background: 'var(--vh-surface-200)' }}>
        <motion.div
          className="h-full"
          style={{ background: 'var(--vh-voltage)' }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4, ease: EASE_OUT }}
        />
      </div>

      {/* Header */}
      <header
        className="w-full px-6 lg:px-10 py-4 flex items-center justify-between"
        style={{ borderBottom: '1px solid var(--vh-line)', background: 'var(--vh-surface-000)' }}
      >
        {/* Left — logo + branding */}
        <div className="flex items-center gap-3">
          <PricingAILogo />
          <span
            style={{
              fontFamily: 'var(--vh-font-display)',
              fontSize: 15,
              fontWeight: 300,
              letterSpacing: '-0.02em',
              color: 'var(--vh-text-000)',
            }}
          >
            Pricing
            <em className="not-italic" style={{ fontWeight: 500, color: 'var(--vh-voltage)' }}>AI</em>
            <span
              style={{
                fontFamily: 'var(--vh-font-mono)',
                fontSize: 10,
                color: 'var(--vh-text-300)',
                marginLeft: 4,
              }}
            >
              .ng
            </span>
          </span>
          <span style={{ color: 'var(--vh-line-hot)', margin: '0 2px' }}>·</span>
          <span
            className="hidden md:inline"
            style={{
              fontFamily: 'var(--vh-font-mono)',
              fontSize: 10,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--vh-text-300)',
            }}
          >
            RESEARCH PREVIEW · NIGERIA
          </span>
        </div>

        {/* Right — step dots + step counter + Pria + restart */}
        <div
          className="flex items-center gap-4"
          style={{ fontFamily: 'var(--vh-font-mono)', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--vh-text-200)' }}
        >
          <div className="hidden md:flex items-center gap-1">
            {STEP_LABELS.map((label, i) => (
              <div
                key={label}
                title={label}
                className="h-1.5 w-1.5 rounded-full transition-all duration-300"
                style={{
                  background: i < step ? 'var(--vh-voltage)' : i === step ? 'var(--vh-text-000)' : 'var(--vh-surface-300)',
                }}
              />
            ))}
          </div>
          <span className="hidden sm:inline">
            STEP {String(step + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>

          {/* Ask Pria — text */}
          <button
            onClick={() => pria.isOpen ? closePria() : openPria()}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '6px 14px', borderRadius: 999, cursor: 'pointer',
              border: `1px solid ${pria.isOpen ? 'var(--vh-voltage)' : 'var(--vh-line)'}`,
              background: pria.isOpen ? 'rgba(255,107,53,0.10)' : 'var(--vh-surface-100)',
              color: pria.isOpen ? 'var(--vh-voltage)' : 'var(--vh-text-200)',
              fontFamily: 'var(--vh-font-mono)', fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase',
              transition: 'all 150ms',
            }}
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <circle cx="12" cy="12" r="3" /><path d="M12 2v3m0 14v3M2 12h3m14 0h3" />
            </svg>
            Ask Pria
          </button>

          <button
            onClick={handleRestart}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg transition-colors hover:bg-[var(--vh-surface-200)]"
            style={{ color: 'var(--vh-text-200)' }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M3 12a9 9 0 0115.5-6.3L21 8" /><path d="M21 3v5h-5" /><path d="M21 12a9 9 0 01-15.5 6.3L3 16" /><path d="M3 21v-5h5" />
            </svg>
            <span className="hidden sm:inline">restart</span>
          </button>
        </div>
      </header>

      {/* Content — split-screen on lg+ */}
      <main className="flex-1 px-6 lg:px-10 py-10">
        <div className="lg:grid lg:gap-10 lg:items-start" style={{ gridTemplateColumns: '1fr 400px' }}>
          {/* Left — question */}
          <div className="w-full min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.32, ease: EASE_OUT }}
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </div>
          {/* Right — Live Plan panel, hidden on mobile */}
          <div className="hidden lg:block">
            <LivePlanPanel step={step} />
          </div>
        </div>
      </main>

      {/* Voice card */}
      <VoiceCard isOpen={pria.isVoiceOpen} onClose={toggleVoice} state="idle" />

      {/* Floating Pria composer */}
      <AnimatePresence>
        {pria.isOpen && (
          <div className="fixed top-6 right-6 z-50">
            <PriaComposer planId={planId ?? undefined} onClose={closePria} onMic={toggleVoice} />
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
