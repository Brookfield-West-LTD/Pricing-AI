import { RevealPage } from '@/components/reveal/RevealPage'

export default async function RevealPageRoute({
  params,
}: {
  params: Promise<{ shareToken: string }>
}) {
  const { shareToken } = await params
  return <RevealPage shareToken={shareToken} />
}
