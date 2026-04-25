'use client'
import * as React from 'react'

export const AtmosphereBackground = React.memo(function AtmosphereBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {/* Three radial glow fields */}
      <div
        className="absolute -top-40 -left-40 w-[800px] h-[800px] rounded-full opacity-25"
        style={{ background: 'radial-gradient(circle, #FF6B35 0%, transparent 70%)' }}
      />
      <div
        className="absolute -top-20 -right-40 w-[600px] h-[600px] rounded-full opacity-15"
        style={{ background: 'radial-gradient(circle, #58C8FF 0%, transparent 70%)' }}
      />
      <div
        className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full opacity-10"
        style={{ background: 'radial-gradient(circle, #7BFFAB 0%, transparent 70%)' }}
      />
      {/* SVG grain overlay */}
      <svg className="absolute inset-0 w-full h-full opacity-40 mix-blend-overlay" xmlns="http://www.w3.org/2000/svg">
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>
    </div>
  )
})

