'use client'
import * as React from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Orb } from './Orb'

interface Message {
  role: 'user' | 'pria'
  text: string
}

interface PriaComposerProps {
  planId?: string | undefined
  onClose?: (() => void) | undefined
  onStream?: ((text: string) => void) | undefined
  onMic?: (() => void) | undefined
}

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1]

export function PriaComposer({ planId, onClose, onStream, onMic }: PriaComposerProps) {
  const [messages, setMessages] = React.useState<Message[]>([])
  const [input, setInput] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const inputRef = React.useRef<HTMLInputElement>(null)
  const bottomRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    inputRef.current?.focus()
  }, [])

  React.useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  async function submit() {
    const text = input.trim()
    if (!text || loading) return
    setInput('')
    setMessages(prev => [...prev, { role: 'user', text }])
    setLoading(true)

    try {
      const resp = await fetch('/api/pria/stream', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ message: text, planId }),
      })
      if (!resp.body) { setLoading(false); return }

      const reader = resp.body.getReader()
      const decoder = new TextDecoder()
      let buffer = ''

      setMessages(prev => [...prev, { role: 'pria', text: '' }])

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n')
        buffer = lines.pop() ?? ''
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const chunk = line.slice(6)
            if (chunk === '[DONE]') continue
            setMessages(prev => {
              const next = [...prev]
              const last = next[next.length - 1]
              if (last?.role === 'pria') {
                next[next.length - 1] = { ...last, text: last.text + chunk }
              }
              return next
            })
            onStream?.(chunk)
          }
        }
      }
    } catch {
      setMessages(prev => [...prev, { role: 'pria', text: 'Something went wrong. Please try again.' }])
    } finally {
      setLoading(false)
    }
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      submit()
    }
  }

  return (
    <motion.div
      initial={{ width: 40, opacity: 0 }}
      animate={{ width: 480, opacity: 1 }}
      transition={{ duration: 0.32, ease: EASE_OUT }}
      className="flex flex-col overflow-hidden rounded-[var(--radius-xl)] border"
      style={{
        background: 'var(--vh-surface-100)',
        borderColor: 'var(--vh-surface-300)',
        boxShadow: 'var(--vh-elev-glow)',
        maxHeight: '70vh',
      }}
    >
      {/* Header */}
      <div
        className="flex items-center gap-2 px-3 py-2 border-b shrink-0"
        style={{ borderColor: 'var(--vh-surface-300)' }}
      >
        <Orb size={22} state={loading ? 'thinking' : 'idle'} />
        <span
          className="text-xs font-medium flex-1"
          style={{ fontFamily: 'var(--vh-font-body)', color: 'var(--vh-text-200)' }}
        >
          Pria
        </span>
        {onClose && (
          <button
            onClick={onClose}
            className="text-xs hover:opacity-100 transition-opacity opacity-50"
            style={{ fontFamily: 'var(--vh-font-mono)', color: 'var(--vh-text-200)' }}
            aria-label="Close Pria"
          >
            ✕
          </button>
        )}
      </div>

      {/* Messages */}
      <AnimatePresence initial={false}>
        {messages.length > 0 && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            className="overflow-y-auto flex flex-col gap-3 px-4 py-3"
            style={{ maxHeight: '320px' }}
          >
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex gap-2 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.role === 'pria' && <Orb size={18} state="idle" className="shrink-0 mt-0.5" />}
                <span
                  className="text-sm leading-relaxed rounded-xl px-3 py-2 max-w-[320px]"
                  style={{
                    background: m.role === 'user' ? 'var(--vh-surface-300)' : 'transparent',
                    color: m.role === 'user' ? 'var(--vh-text-000)' : 'var(--vh-text-200)',
                    fontFamily: 'var(--vh-font-body)',
                  }}
                >
                  {m.text}
                  {m.role === 'pria' && loading && i === messages.length - 1 && m.text === '' && (
                    <span className="flex gap-1 items-center py-1">
                      {[0, 1, 2].map(j => (
                        <span
                          key={j}
                          className="inline-block w-1.5 h-1.5 rounded-full animate-pulse"
                          style={{
                            background: 'var(--vh-voltage)',
                            animationDelay: `${j * 150}ms`,
                          }}
                        />
                      ))}
                    </span>
                  )}
                </span>
              </div>
            ))}
            <div ref={bottomRef} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input */}
      <div className="flex items-center gap-2 px-3 py-2 shrink-0">
        <input
          ref={inputRef}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Ask about solar sizing, costs, timelines…"
          disabled={loading}
          className="flex-1 bg-transparent text-sm outline-none placeholder:opacity-40"
          style={{
            fontFamily: 'var(--vh-font-body)',
            color: 'var(--vh-text-000)',
          }}
        />
        {onMic && (
          <button
            onClick={onMic}
            className="flex items-center justify-center rounded-full transition-all duration-150"
            style={{ width: 30, height: 30, background: 'var(--vh-surface-200)', color: 'var(--vh-text-200)', border: 'none', cursor: 'pointer', flexShrink: 0 }}
            aria-label="Switch to voice"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <rect x="9" y="3" width="6" height="12" rx="3" /><path d="M5 11a7 7 0 0014 0" /><path d="M12 18v3" /><path d="M9 21h6" />
            </svg>
          </button>
        )}
        <button
          onClick={submit}
          disabled={loading || !input.trim()}
          className="text-xs px-3 py-1.5 rounded-full transition-all duration-150 disabled:opacity-30"
          style={{
            background: 'var(--vh-voltage)',
            color: '#0A0F14',
            fontFamily: 'var(--vh-font-mono)',
          }}
        >
          ↑
        </button>
      </div>
    </motion.div>
  )
}
