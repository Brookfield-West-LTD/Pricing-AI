import { Injectable } from '@nestjs/common'
import type { Appliance } from '@pricing-ai/shared'
import { PrismaService } from '../prisma/prisma.service'
import { GeoIrradianceService } from '../geo-irradiance/geo-irradiance.service'
import { ARCHETYPES, getArchetype } from './archetypes'

export interface LoadProfileSummary {
  dailyKwh: number
  peakKw: number
  applianceCount: number
  irradianceKwhPerM2PerDay: number | null
}

@Injectable()
export class LoadProfileService {
  constructor(
    private prisma: PrismaService,
    private geo: GeoIrradianceService,
  ) {}

  calcDailyKwh(appliances: Appliance[]): number {
    const total = appliances.reduce(
      (sum, a) => sum + (a.watts * a.hoursPerDay * a.quantity) / 1000,
      0,
    )
    return Math.round(total * 100) / 100
  }

  calcPeakKw(appliances: Appliance[]): number {
    const peak = appliances.reduce((sum, a) => sum + (a.watts * a.quantity) / 1000, 0)
    return Math.round(peak * 100) / 100
  }

  async upsertForPlan(
    planId: string,
    data: {
      who: string
      location: string
      lat?: number | null | undefined
      lng?: number | null | undefined
      currentSource: string
      energyDirection: string
      appliances: Appliance[]
    },
  ) {
    const dailyKwh = this.calcDailyKwh(data.appliances)
    const peakKw = this.calcPeakKw(data.appliances)

    const row = {
      who: data.who,
      location: data.location,
      lat: data.lat ?? null,
      lng: data.lng ?? null,
      currentSource: data.currentSource,
      energyDirection: data.energyDirection,
      appliancesJson: data.appliances as unknown as object[],
      dailyKwh,
      peakKw,
    }

    return this.prisma.loadProfile.upsert({
      where: { planId },
      create: { planId, ...row },
      update: row,
    })
  }

  async getSummary(planId: string, lat?: number, lng?: number): Promise<LoadProfileSummary | null> {
    const profile = await this.prisma.loadProfile.findUnique({ where: { planId } })
    if (!profile) return null

    const appliances = profile.appliancesJson as unknown as Appliance[]
    let irradiance: number | null = null

    const effectiveLat = lat ?? profile.lat
    const effectiveLng = lng ?? profile.lng
    if (effectiveLat != null && effectiveLng != null) {
      const geo = await this.geo.fetchIrradiance(effectiveLat, effectiveLng)
      irradiance = geo.avgDailyKwhPerM2
    }

    return {
      dailyKwh: profile.dailyKwh ?? this.calcDailyKwh(appliances),
      peakKw: profile.peakKw ?? this.calcPeakKw(appliances),
      applianceCount: appliances.length,
      irradianceKwhPerM2PerDay: irradiance,
    }
  }

  getArchetypes() {
    return ARCHETYPES.map(({ id, name, who, description }) => ({ id, name, who, description }))
  }

  getArchetypeAppliances(archetypeId: string) {
    return getArchetype(archetypeId)?.appliances ?? null
  }
}
