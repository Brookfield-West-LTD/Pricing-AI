import { Injectable } from '@nestjs/common'
import { sizeSolarSystem, sizeWindSystem, sizeBiomassSystem } from '@pricing-ai/sizing-engine'
import type { SizingInput, SizingResult } from '@pricing-ai/sizing-engine'
import { PrismaService } from '../prisma/prisma.service'
import { GeoIrradianceService } from '../geo-irradiance/geo-irradiance.service'

export interface SizingRequest {
  planId: string
  dailyKwh: number
  peakKw: number
  lat: number
  lng: number
  energyDirection?: 'solar' | 'wind' | 'biomass' | 'hybrid'
  autonomyDays?: number
}

export interface SizingResponse {
  solar: SizingResult
  irradianceKwhPerM2PerDay: number
  source: string
}

@Injectable()
export class SizingService {
  constructor(
    private prisma: PrismaService,
    private geo: GeoIrradianceService,
  ) {}

  async size(req: SizingRequest): Promise<SizingResponse> {
    const irradiance = await this.geo.fetchIrradiance(req.lat, req.lng)

    const input: SizingInput = {
      dailyKwh: req.dailyKwh,
      peakKw: req.peakKw,
      irradianceKwhPerM2PerDay: irradiance.avgDailyKwhPerM2,
      autonomyDays: req.autonomyDays,
    }

    const solar = sizeSolarSystem(input)

    await this.prisma.systemDesign.upsert({
      where: { planId: req.planId },
      create: {
        planId: req.planId,
        panelKw: solar.panelKw,
        inverterKw: solar.inverterKw,
        batteryKwh: solar.batteryKwh,
        componentJson: {},
      },
      update: {
        panelKw: solar.panelKw,
        inverterKw: solar.inverterKw,
        batteryKwh: solar.batteryKwh,
      },
    })

    return {
      solar,
      irradianceKwhPerM2PerDay: irradiance.avgDailyKwhPerM2,
      source: irradiance.source,
    }
  }
}
