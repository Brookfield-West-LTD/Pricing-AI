import { Injectable } from '@nestjs/common'
import {
  BedrockRuntimeClient,
  InvokeModelWithResponseStreamCommand,
} from '@aws-sdk/client-bedrock-runtime'

const SYSTEM_PROMPT =
  'You are Pria, an AI energy planning assistant for renewable energy projects in Africa. ' +
  'Be concise, practical, and focus on solar, wind, and hybrid systems. ' +
  'Speak in plain English and cite realistic Nigerian/African market figures where relevant.'

@Injectable()
export class PriaService {
  private bedrock = new BedrockRuntimeClient({ region: 'eu-central-1' })

  async *streamResponse(message: string, planId?: string): AsyncGenerator<string> {
    const context = planId ? `\n\n[Active plan ID: ${planId}]` : ''

    const body = JSON.stringify({
      anthropic_version: 'bedrock-2023-05-31',
      max_tokens: 1024,
      system: SYSTEM_PROMPT + context,
      messages: [{ role: 'user', content: message }],
    })

    try {
      const cmd = new InvokeModelWithResponseStreamCommand({
        modelId: 'anthropic.claude-3-5-haiku-20241022-v1:0',
        contentType: 'application/json',
        accept: 'application/json',
        body,
      })

      const response = await this.bedrock.send(cmd)
      if (!response.body) return

      const decoder = new TextDecoder()
      for await (const event of response.body) {
        if (event.chunk?.bytes) {
          const raw = decoder.decode(event.chunk.bytes)
          try {
            const parsed = JSON.parse(raw)
            if (parsed.type === 'content_block_delta' && parsed.delta?.text) {
              yield parsed.delta.text as string
            }
          } catch {
            // skip malformed chunks
          }
        }
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Unknown error'
      yield `Error: ${msg}`
    }
  }
}
