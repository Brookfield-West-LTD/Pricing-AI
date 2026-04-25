import { NextRequest } from 'next/server'

const NESTJS_URL = process.env.NESTJS_URL ?? 'http://localhost:3001'

export async function POST(req: NextRequest) {
  const body = await req.json()

  try {
    const upstream = await fetch(`${NESTJS_URL}/api/pria/stream`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(60000),
    })
    if (upstream.ok && upstream.body) {
      return new Response(upstream.body, {
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          Connection: 'keep-alive',
        },
      })
    }
  } catch {
    // NestJS not available — stream a canned response
  }

  // Fallback: stream a simple reply
  const message = body?.message ?? ''
  const reply = `I received your message: "${message}". The backend is not yet connected — run the full Turborepo stack with \`bun run dev\` from the project root to enable AI responses.`

  const stream = new ReadableStream({
    start(controller) {
      const words = reply.split(' ')
      let i = 0
      function push() {
        if (i < words.length) {
          const chunk = (i === 0 ? '' : ' ') + words[i++]
          controller.enqueue(new TextEncoder().encode(`data: ${chunk}\n\n`))
          setTimeout(push, 40)
        } else {
          controller.enqueue(new TextEncoder().encode('data: [DONE]\n\n'))
          controller.close()
        }
      }
      push()
    },
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  })
}
