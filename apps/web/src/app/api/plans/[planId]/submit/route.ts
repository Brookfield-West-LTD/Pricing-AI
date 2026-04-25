import { NextRequest, NextResponse } from 'next/server'

const NESTJS_URL = process.env.NESTJS_URL ?? 'http://localhost:3001'

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ planId: string }> },
) {
  const { planId } = await params
  const body = await req.json()

  try {
    const res = await fetch(`${NESTJS_URL}/api/plans/${planId}/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(5000),
    })
    if (res.ok) {
      return NextResponse.json(await res.json())
    }
  } catch {
    // NestJS not available — proceed without persisting
  }

  return NextResponse.json({ ok: true })
}
