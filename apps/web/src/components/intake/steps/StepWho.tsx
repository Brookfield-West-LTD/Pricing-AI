'use client'
import * as React from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useIntakeStore } from '@/lib/store'
import { Button } from '@pricing-ai/ui/primitives/Button'
import type { WhoType } from '@pricing-ai/shared'

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1]

// Unsplash CDN — exact same photo IDs as the reference design
const U = (id: string, w = 480, h = 200) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&h=${h}&q=75`

const IMAGES = {
  home:         U('1580587771525-78b9dba3b914'),   // modern home exterior
  solarRooftop: U('1509391366360-2e959784a276'),   // panels on roof
  smallShop:    U('1556761175-5973dc0f32e7'),       // shop / small business
  clinic:       U('1559302504-64aae6ca6b6d'),       // solar-powered community building
  africaRoof:   U('1532601224476-15c79f2f7a51'),   // aerial rooftops
  solarArray:   U('1545209463-e2825498edbf'),       // solar farm
}

interface CardOption {
  id: WhoType
  front: string
  back: string
  badge: string
  backBadge: string
  title: string
  titleItalic: string
  desc: string
  accentColor: string
}

const OPTIONS: CardOption[] = [
  {
    id: 'homeowner',
    front: IMAGES.home,
    back: IMAGES.solarRooftop,
    badge: 'RESIDENTIAL',
    backBadge: '→ RESIDENTIAL · POWERED',
    title: 'A ',
    titleItalic: 'home',
    desc: 'Apartment, house, or compound.',
    accentColor: 'var(--vh-voltage)',
  },
  {
    id: 'sme',
    front: IMAGES.smallShop,
    back: IMAGES.clinic,
    badge: 'COMMERCIAL',
    backBadge: '→ COMMERCIAL · POWERED',
    title: 'A ',
    titleItalic: 'business',
    desc: 'Shop, office, clinic, factory.',
    accentColor: 'var(--vh-horizon)',
  },
  {
    id: 'developer',
    front: IMAGES.africaRoof,
    back: IMAGES.solarArray,
    badge: 'SHARED',
    backBadge: '→ SHARED · POWERED',
    title: 'A ',
    titleItalic: 'community',
    desc: 'Estate, church, school, mini-grid.',
    accentColor: 'var(--vh-bio)',
  },
]

function WhoCard({
  opt,
  index,
  active,
  onClick,
}: {
  opt: CardOption
  index: number
  active: boolean
  onClick: () => void
}) {
  const [flipped, setFlipped] = React.useState(false)

  React.useEffect(() => {
    const t1 = setTimeout(() => setFlipped(true),  4500 + index * 600)
    const t2 = setTimeout(() => setFlipped(false), 7000 + index * 600)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [index])

  return (
    <motion.button
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: EASE_OUT, delay: 0.1 + index * 0.06 }}
      onClick={onClick}
      style={{
        display: 'flex', flexDirection: 'column',
        minHeight: 280, padding: 0, overflow: 'hidden',
        background: 'var(--vh-surface-100)',
        border: `1px solid ${active ? opt.accentColor : 'var(--vh-line)'}`,
        borderRadius: 'var(--vh-r-xl)',
        boxShadow: active
          ? `0 0 0 1px ${opt.accentColor}, 0 0 28px -8px ${opt.accentColor}55`
          : 'none',
        cursor: 'pointer', textAlign: 'left', width: '100%',
        transition: 'border-color 0.2s, box-shadow 0.2s',
      }}
    >
      {/* Photo area — crossfades between front and back */}
      <div style={{ position: 'relative', height: 120, flexShrink: 0, overflow: 'hidden' }}>
        <AnimatePresence mode="wait">
          <motion.img
            key={flipped ? 'back' : 'front'}
            src={flipped ? opt.back : opt.front}
            alt=""
            aria-hidden
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55 }}
            style={{
              position: 'absolute', inset: 0,
              width: '100%', height: '100%',
              objectFit: 'cover',
            }}
          />
        </AnimatePresence>

        {/* Gradient overlay */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'linear-gradient(to top, rgba(5,8,12,0.85) 0%, rgba(5,8,12,0.1) 55%, transparent 100%)',
        }} />

        {/* Active colour wash */}
        {active && (
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: `linear-gradient(135deg, ${opt.accentColor}1A, transparent 60%)`,
          }} />
        )}

        {/* Badge label */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '8px 12px' }}>
          <AnimatePresence mode="wait">
            <motion.span
              key={flipped ? 'b' : 'f'}
              initial={{ opacity: 0, y: 3 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -3 }}
              transition={{ duration: 0.22 }}
              style={{
                fontFamily: 'var(--vh-font-mono)', fontSize: 9,
                letterSpacing: '0.2em', textTransform: 'uppercase',
                color: active ? opt.accentColor : 'rgba(244,248,251,0.78)',
              }}
            >
              {flipped ? opt.backBadge : opt.badge}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>

      {/* Card body */}
      <div style={{
        display: 'flex', flexDirection: 'column', gap: 8,
        padding: '12px 16px 16px', flex: 1,
      }}>
        {/* Option counter + checkmark */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{
            fontFamily: 'var(--vh-font-mono)', fontSize: 10,
            letterSpacing: '0.18em', textTransform: 'uppercase',
            color: active ? opt.accentColor : 'var(--vh-text-300)',
          }}>
            OPTION 0{index + 1}
          </span>
          <AnimatePresence>
            {active && (
              <motion.span
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.2, ease: [0.2, 0.7, 0.2, 1] }}
                style={{ color: opt.accentColor, display: 'flex' }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        <div style={{ flex: 1 }} />

        {/* Fraunces display title */}
        <div style={{
          fontFamily: 'var(--vh-font-display)', fontWeight: 300,
          fontSize: 30, letterSpacing: '-0.025em', lineHeight: 1,
          color: 'var(--vh-text-000)',
        }}>
          {opt.title}
          <em style={{ fontStyle: 'italic', fontWeight: 500 }}>{opt.titleItalic}</em>
        </div>

        {/* Description */}
        <p style={{
          fontFamily: 'var(--vh-font-body)', fontSize: 13,
          lineHeight: 1.5, color: 'var(--vh-text-200)', margin: 0,
        }}>
          {opt.desc}
        </p>
      </div>

      {/* Active bottom accent bar */}
      {active && (
        <motion.div
          layoutId="who-active-bar"
          style={{ height: 2, background: opt.accentColor, flexShrink: 0 }}
        />
      )}
    </motion.button>
  )
}

export function StepWho() {
  const { data, updateData, nextStep } = useIntakeStore()

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      {/* Header */}
      <div className="vh-up" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <p style={{
          fontFamily: 'var(--vh-font-mono)', fontSize: 11,
          letterSpacing: '0.2em', textTransform: 'uppercase',
          color: 'var(--vh-text-200)', margin: 0,
          display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <span style={{ color: 'var(--vh-voltage)' }}>—</span>
          01 · WHO ARE WE PLANNING FOR
        </p>

        <h2 style={{
          fontFamily: 'var(--vh-font-display)', fontWeight: 300,
          fontSize: 'clamp(42px, 6vw, 72px)',
          letterSpacing: '-0.035em', lineHeight: 0.95,
          color: 'var(--vh-text-000)', margin: 0,
        }}>
          Who{' '}
          <em style={{ fontStyle: 'italic', fontWeight: 500, color: 'var(--vh-voltage)' }}>
            needs
          </em>{' '}
          the power?
        </h2>

        <p style={{
          fontFamily: 'var(--vh-font-body)', fontSize: 16,
          lineHeight: 1.55, color: 'var(--vh-text-200)',
          maxWidth: '52ch', margin: 0,
        }}>
          This shapes sizing, financing options, and the kind of installer we match you with.
        </p>
      </div>

      {/* 3-column card grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
        {OPTIONS.map((opt, i) => (
          <WhoCard
            key={opt.id}
            opt={opt}
            index={i}
            active={data.who === opt.id}
            onClick={() => updateData({ who: opt.id })}
          />
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: 8 }} className="vh-up vh-d5">
        <Button variant="primary" size="md" disabled={!data.who} onClick={nextStep}>
          Continue →
        </Button>
      </div>
    </div>
  )
}
