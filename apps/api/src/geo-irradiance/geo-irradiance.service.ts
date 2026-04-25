import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

export interface IrradianceResult {
  lat: number
  lng: number
  avgDailyKwhPerM2: number
  source: 'nasa' | 'pvgis' | 'fallback'
  year: number
}

@Injectable()
export class GeoIrradianceService {
  private readonly logger = new Logger(GeoIrradianceService.name)
  private readonly nasaUrl: string
  private readonly pvgisUrl: string

  constructor(private config: ConfigService) {
    this.nasaUrl = config.get('NASA_POWER_API_URL', 'https://power.larc.nasa.gov/api/temporal/daily/point')
    this.pvgisUrl = config.get('PVGIS_API_URL', 'https://re.jrc.ec.europa.eu/api/v5_2')
  }

  async fetchIrradiance(lat: number, lng: number): Promise<IrradianceResult> {
    try {
      return await this.fetchFromNasa(lat, lng)
    } catch (err) {
      this.logger.warn(`NASA POWER failed for (${lat},${lng}), trying PVGIS: ${err}`)
      try {
        return await this.fetchFromPvgis(lat, lng)
      } catch (err2) {
        this.logger.error(`PVGIS also failed for (${lat},${lng}): ${err2}`)
        return this.nigeriaFallback(lat, lng)
      }
    }
  }

  private async fetchFromNasa(lat: number, lng: number): Promise<IrradianceResult> {
    const params = new URLSearchParams({
      parameters: 'ALLSKY_SFC_SW_DWN',
      community: 'RE',
      longitude: String(lng),
      latitude: String(lat),
      start: '2023',
      end: '2023',
      format: 'JSON',
    })

    const res = await fetch(`${this.nasaUrl}?${params}`)
    if (!res.ok) throw new Error(`NASA POWER HTTP ${res.status}`)

    const json = await res.json() as {
      properties: { parameter: { ALLSKY_SFC_SW_DWN: Record<string, number> } }
    }

    const daily = json.properties.parameter.ALLSKY_SFC_SW_DWN
    const values = Object.values(daily).filter(v => v > 0)
    const avg = values.reduce((s, v) => s + v, 0) / values.length

    return { lat, lng, avgDailyKwhPerM2: Math.round(avg * 100) / 100, source: 'nasa', year: 2023 }
  }

  private async fetchFromPvgis(lat: number, lng: number): Promise<IrradianceResult> {
    const params = new URLSearchParams({
      lat: String(lat),
      lon: String(lng),
      outputformat: 'json',
      startyear: '2022',
      endyear: '2022',
    })

    const res = await fetch(`${this.pvgisUrl}/seriescalc?${params}`)
    if (!res.ok) throw new Error(`PVGIS HTTP ${res.status}`)

    const json = await res.json() as {
      outputs: { hourly: Array<{ G_i: number }> }
    }

    const hourly = json.outputs.hourly
    const totalKwh = hourly.reduce((s, h) => s + h.G_i / 1000, 0)
    const avgDailyKwhPerM2 = Math.round((totalKwh / 365) * 100) / 100

    return { lat, lng, avgDailyKwhPerM2, source: 'pvgis', year: 2022 }
  }

  private nigeriaFallback(lat: number, lng: number): IrradianceResult {
    // Nigeria irradiance roughly correlates with latitude
    // North (~13°N) gets ~6.5 kWh/m²/day; South (~4°N) gets ~4.2 kWh/m²/day
    const normalized = Math.max(0, Math.min(1, (lat - 4) / 9))
    const avgDailyKwhPerM2 = 4.2 + normalized * 2.3
    return {
      lat,
      lng,
      avgDailyKwhPerM2: Math.round(avgDailyKwhPerM2 * 10) / 10,
      source: 'fallback',
      year: 0,
    }
  }
}
