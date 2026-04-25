const NEXT_BASE = '/api'
const NESTJS_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001'

async function nextRequest<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${NEXT_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...init,
  })
  if (!res.ok) throw new Error(`API ${res.status}: ${path}`)
  return res.json() as Promise<T>
}

async function nestRequest<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${NESTJS_BASE}/api${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...init,
  })
  if (!res.ok) throw new Error(`API ${res.status}: ${path}`)
  return res.json() as Promise<T>
}

export const api = {
  createPlan: () => nextRequest<{ id: string; shareToken: string }>('/plans', { method: 'POST' }),
  getPlan: (shareToken: string) => nestRequest<unknown>(`/plans/${shareToken}`),
}

export async function streamPria(
  planId: string,
  message: string,
  onChunk: (chunk: string) => void,
  onDone: () => void,
) {
  const res = await fetch(`${NESTJS_BASE}/api/pria/stream`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ planId, message }),
  })
  if (!res.body) return
  const reader = res.body.getReader()
  const decoder = new TextDecoder()
  while (true) {
    const { done, value } = await reader.read()
    if (done) { onDone(); break }
    onChunk(decoder.decode(value))
  }
}
