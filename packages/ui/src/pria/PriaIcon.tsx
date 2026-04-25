'use client'
import * as React from 'react'
import { Orb } from './Orb'

interface PriaIconProps {
  onOpen: () => void
  invite?: string
}

const DEFAULT_INVITE = 'ask me anything about your energy switch →'

export function PriaIcon({ onOpen, invite = DEFAULT_INVITE }: PriaIconProps) {
  const [displayed, setDisplayed] = React.useState('')
  const [visible, setVisible] = React.useState(false)
  const [typing, setTyping] = React.useState(false)
  const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)
  const indexRef = React.useRef(0)

  function startTyping() {
    if (typing) return
    setVisible(true)
    setTyping(true)
    setDisplayed('')
    indexRef.current = 0

    function tick() {
      if (indexRef.current < invite.length) {
        setDisplayed(invite.slice(0, indexRef.current + 1))
        indexRef.current++
        timerRef.current = setTimeout(tick, 40)
      } else {
        setTyping(false)
        timerRef.current = setTimeout(() => setVisible(false), 6000)
      }
    }
    tick()
  }

  React.useEffect(() => {
    const delay = setTimeout(startTyping, 1200)
    return () => {
      clearTimeout(delay)
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function handleHover() {
    if (timerRef.current) clearTimeout(timerRef.current)
    if (!typing) startTyping()
  }

  return (
    <button
      onClick={onOpen}
      onMouseEnter={handleHover}
      className="flex items-center gap-2 group"
      aria-label="Open Pria AI assistant"
    >
      <div className="relative">
        <Orb size={28} state="idle" />
      </div>
      <span
        className="text-xs transition-opacity duration-300 overflow-hidden whitespace-nowrap"
        style={{
          fontFamily: 'var(--vh-font-mono)',
          color: 'var(--vh-text-200)',
          maxWidth: visible ? '280px' : '0px',
          opacity: visible ? 1 : 0,
          transition: 'max-width 0.3s ease, opacity 0.3s ease',
        }}
      >
        {displayed}
        {typing && (
          <span
            className="inline-block w-[2px] h-3 ml-px align-middle animate-pulse"
            style={{ background: 'var(--vh-voltage)' }}
          />
        )}
      </span>
    </button>
  )
}
