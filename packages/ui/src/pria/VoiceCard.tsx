'use client'
import * as React from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Orb } from './Orb'

type VoiceState = 'idle' | 'listening' | 'speaking' | 'thinking'

interface VoiceCardProps {
  isOpen: boolean
  onClose: () => void
  state?: VoiceState
  transcript?: string
}

const BAR_COUNT = 42

function Waveform({ state }: { state: VoiceState }) {
  return (
    <div className="pria-waveform" data-state={state}>
      {Array.from({ length: BAR_COUNT }).map((_, i) => {
        const rot = (360 / BAR_COUNT) * i
        const amp =
          state === 'idle'
            ? 0.6
            : 1.1 + (Math.sin(i * 0.7) + Math.sin(i * 0.31)) * 0.6 + (state === 'speaking' ? 0.8 : 0.4)
        const delay = (i * 42) % 900
        return (
          <span
            key={i}
            className="pria-wave-bar"
            style={{ '--rot': `${rot}deg`, '--amp': amp, animationDelay: `${delay}ms` } as React.CSSProperties}
          />
        )
      })}
    </div>
  )
}

export function VoiceCard({ isOpen, onClose, state = 'idle', transcript = '' }: VoiceCardProps) {
  const statusMap: Record<VoiceState, { label: string; dot: string }> = {
    listening: { label: 'LISTENING',     dot: 'bio'     },
    speaking:  { label: 'PRIA SPEAKING', dot: 'voltage' },
    thinking:  { label: 'THINKING',      dot: 'think'   },
    idle:      { label: 'IDLE',          dot: 'voltage' },
  }
  const status = statusMap[state] ?? statusMap.idle

  return (
    <AnimatePresence mode="wait">
      {!isOpen ? (
        <motion.button
          key="voice-btn"
          className="pria-voice-btn"
          onClick={onClose}
          aria-label="Talk to Pria"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          <Orb size={56} />
          <span className="pria-voice-btn-label">TALK TO PRIA</span>
        </motion.button>
      ) : (
        <motion.div
          key="voice-card"
          className="pria-voice-card"
          initial={{ opacity: 0, y: 14, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 14, scale: 0.96 }}
          transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Status + close */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <span className="pria-status">
              <span className="pria-status-dot" data-kind={status.dot} />
              {state === 'thinking' ? (
                <>
                  THINKING{' '}
                  <span className="pria-think-dots">
                    <span /><span /><span />
                  </span>
                </>
              ) : status.label}
            </span>
            <button
              onClick={onClose}
              className="pria-pill-btn"
              style={{ width: 28, height: 28 }}
              aria-label="Close voice assistant"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden={true}>
                <path d="M6 6l12 12" /><path d="M18 6L6 18" />
              </svg>
            </button>
          </div>

          {/* Orb + waveform */}
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', minHeight: 0 }}>
            <Waveform state={state} />
            <div className="pria-big-orb" data-state={state}>
              <Orb size={96} state={state} />
            </div>
          </div>

          {/* Transcript */}
          <div style={{
            fontFamily: 'var(--vh-font-mono)', fontSize: 12,
            color: 'var(--vh-text-200)', textAlign: 'center',
            minHeight: 16, marginBottom: 8,
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          }}>
            {transcript || '…'}
          </div>

          {/* Controls */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 8 }}>
            <button className="pria-ghost-mini">MUTE</button>
            <button className="pria-ghost-mini" onClick={onClose}>END</button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
