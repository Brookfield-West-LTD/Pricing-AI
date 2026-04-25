import { NextResponse } from 'next/server'

const NESTJS_URL = process.env.NESTJS_URL ?? 'http://localhost:3001'

export async function POST() {
  try {
    const res = await fetch(`${NESTJS_URL}/api/plans`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: AbortSignal.timeout(3000),
    })
    if (res.ok) {
      const data = await res.json()
      return NextResponse.json(data)
    }
  } catch {
    // NestJS not available — generate client-side IDs
  }

  const id = crypto.randomUUID()
  return NextResponse.json({ id, shareToken: id })
}
