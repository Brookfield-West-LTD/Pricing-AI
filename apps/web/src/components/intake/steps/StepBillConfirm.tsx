'use client'
import * as React from 'react'
import { useIntakeStore } from '@/lib/store'
import { Button } from '@pricing-ai/ui/primitives/Button'

export function StepBillConfirm() {
  const { data, updateData, nextStep, prevStep, planId } = useIntakeStore()
  const [uploading, setUploading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const inputRef = React.useRef<HTMLInputElement>(null)

  async function handleFile(file: File) {
    if (!planId) return
    setUploading(true)
    setError(null)
    const form = new FormData()
    form.append('file', file)
    form.append('planId', planId)
    try {
      const res = await fetch('/api/plans/bill-upload', { method: 'POST', body: form })
      if (!res.ok) throw new Error('Upload failed')
      const { extractedKwh } = await res.json()
      updateData({ billUploaded: true, extractedKwh })
    } catch {
      setError('Could not extract bill data. You can skip this step.')
    } finally {
      setUploading(false)
    }
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      {/* Header */}
      <div className="vh-up" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <p style={{ fontFamily: 'var(--vh-font-mono)', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--vh-text-200)', margin: 0, display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ color: 'var(--vh-voltage)' }}>—</span>
          06 · ELECTRICITY BILL
        </p>
        <h2 style={{ fontFamily: 'var(--vh-font-display)', fontWeight: 300, fontSize: 'clamp(36px, 5vw, 64px)', letterSpacing: '-0.035em', lineHeight: 0.95, color: 'var(--vh-text-000)', margin: 0 }}>
          Got a recent{' '}
          <em style={{ fontStyle: 'italic', fontWeight: 500, color: 'var(--vh-voltage)' }}>electricity bill</em>?
        </h2>
        <p style={{ fontFamily: 'var(--vh-font-body)', fontSize: 16, lineHeight: 1.55, color: 'var(--vh-text-200)', maxWidth: '52ch', margin: 0 }}>
          Pria reads your kWh usage to sharpen the load profile. PNG, JPG or PDF. You can skip this.
        </p>
      </div>

      {!data.billUploaded ? (
        <div
          className="relative flex flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed py-14 px-8 cursor-pointer transition-all duration-150"
          style={{ borderColor: 'var(--vh-line)', background: 'var(--vh-surface-100)' }}
          onDrop={handleDrop}
          onDragOver={e => e.preventDefault()}
          onClick={() => inputRef.current?.click()}
          role="button"
          tabIndex={0}
          onKeyDown={e => e.key === 'Enter' && inputRef.current?.click()}
          onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--vh-voltage)')}
          onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--vh-line)')}
        >
          <input
            ref={inputRef}
            type="file"
            accept="image/*,application/pdf"
            className="hidden"
            onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])}
          />

          {uploading ? (
            <div className="flex flex-col items-center gap-3">
              <div
                className="w-8 h-8 rounded-full border-2"
                style={{
                  borderColor: 'transparent',
                  borderTopColor: 'var(--vh-voltage)',
                  animation: 'vh-orb-spin 0.8s linear infinite',
                }}
              />
              <p style={{ fontFamily: 'var(--vh-font-mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--vh-text-200)' }}>
                Extracting data…
              </p>
            </div>
          ) : (
            <>
              <div
                className="flex items-center justify-center rounded-full"
                style={{ width: 48, height: 48, background: 'var(--vh-surface-200)', border: '1px solid var(--vh-line)' }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--vh-voltage)' }} aria-hidden>
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
              </div>
              <div className="text-center">
                <p style={{ fontFamily: 'var(--vh-font-body)', fontSize: 14, color: 'var(--vh-text-100)' }}>
                  Drop your bill here or{' '}
                  <span style={{ color: 'var(--vh-voltage)' }}>click to browse</span>
                </p>
                <p style={{ fontFamily: 'var(--vh-font-mono)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--vh-text-300)', marginTop: 4 }}>
                  PNG · JPG · PDF
                </p>
              </div>
            </>
          )}
        </div>
      ) : (
        <div
          className="flex items-center gap-4 px-5 py-4 rounded-xl border pria-added"
          style={{ background: 'var(--vh-surface-100)', borderColor: 'var(--vh-bio)' }}
        >
          <div
            className="flex items-center justify-center rounded-full flex-shrink-0"
            style={{ width: 36, height: 36, background: 'rgba(123,255,171,0.12)', border: '1px solid var(--vh-bio)' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--vh-bio)' }} aria-hidden>
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <div className="flex flex-col gap-0.5">
            <span style={{ fontFamily: 'var(--vh-font-body)', fontSize: 14, fontWeight: 500, color: 'var(--vh-bio)' }}>
              Bill uploaded
            </span>
            {data.extractedKwh && (
              <span style={{ fontFamily: 'var(--vh-font-mono)', fontSize: 11, letterSpacing: '0.12em', color: 'var(--vh-text-200)' }}>
                Extracted: {data.extractedKwh.toFixed(1)} kWh / month
              </span>
            )}
          </div>
        </div>
      )}

      {error && (
        <p style={{ fontFamily: 'var(--vh-font-mono)', fontSize: 11, letterSpacing: '0.12em', color: 'var(--vh-danger)' }}>
          {error}
        </p>
      )}

      <div className="flex justify-between pt-2">
        <Button variant="ghost" size="md" onClick={prevStep}>← Back</Button>
        <div className="flex gap-3">
          {!data.billUploaded && (
            <Button variant="ghost" size="md" onClick={nextStep}>
              Skip
            </Button>
          )}
          <Button variant="primary" size="md" onClick={nextStep}>
            {data.billUploaded ? 'Continue →' : 'Skip →'}
          </Button>
        </div>
      </div>
    </div>
  )
}
