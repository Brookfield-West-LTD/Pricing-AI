import { Injectable, Logger } from '@nestjs/common'

const FALLBACK_RATE_USD_NGN = 1600

@Injectable()
export class FxService {
  private readonly logger = new Logger(FxService.name)
  private cachedRate: number | null = null
  private cacheAt: number | null = null
  private readonly ttlMs = 60 * 60 * 1000 // 1 hour

  async getUsdToNgn(): Promise<number> {
    if (this.cachedRate && this.cacheAt && Date.now() - this.cacheAt < this.ttlMs) {
      return this.cachedRate
    }

    try {
      const res = await fetch('https://api.exchangerate-api.com/v4/latest/USD')
      if (!res.ok) throw new Error(`FX API HTTP ${res.status}`)
      const json = await res.json() as { rates: Record<string, number> }
      const rate = json.rates['NGN']
      if (!rate) throw new Error('NGN rate not found in response')
      this.cachedRate = rate
      this.cacheAt = Date.now()
      return rate
    } catch (err) {
      this.logger.warn(`FX fetch failed, using fallback ${FALLBACK_RATE_USD_NGN}: ${err}`)
      return FALLBACK_RATE_USD_NGN
    }
  }
}
