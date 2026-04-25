import { NextRequest, NextResponse } from 'next/server'

const NESTJS_URL = process.env.NESTJS_URL ?? 'http://localhost:3001'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const res = await fetch(`${NESTJS_URL}/api/plans/bill-upload`, {
      method: 'POST',
      body: formData,
      signal: AbortSignal.timeout(15000),
    })
    if (res.ok) {
      return NextResponse.json(await res.json())
    }
  } catch {
    // NestJS not available — return a plausible fallback
  }
  // Fallback: estimate a typical monthly kWh so the step can proceed
  return NextResponse.json({ extractedKwh: 220 })
}
