import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { LoadProfileService } from '../load-profile/load-profile.service'
import { GeoIrradianceService } from '../geo-irradiance/geo-irradiance.service'
import type { IntakeInput } from '@pricing-ai/zod-schemas'

@Injectable()
export class IntakeService {
  constructor(
    private prisma: PrismaService,
    private loadProfile: LoadProfileService,
    private geo: GeoIrradianceService,
  ) {}

  async submit(planId: string, intake: IntakeInput) {
    const plan = await this.prisma.plan.findUnique({ where: { id: planId } })
    if (!plan) throw new NotFoundException(`Plan ${planId} not found`)

    const profile = await this.loadProfile.upsertForPlan(planId, intake)

    let irradiance = null
    if (intake.lat != null && intake.lng != null) {
      irradiance = await this.geo.fetchIrradiance(intake.lat, intake.lng)
    }

    return { loadProfile: profile, irradiance }
  }

  async getState(planId: string) {
    const plan = await this.prisma.plan.findUnique({
      where: { id: planId },
      include: { loadProfile: true },
    })
    if (!plan) throw new NotFoundException(`Plan ${planId} not found`)
    return plan
  }

  getArchetypes() {
    return this.loadProfile.getArchetypes()
  }

  getArchetypeAppliances(archetypeId: string) {
    const appliances = this.loadProfile.getArchetypeAppliances(archetypeId)
    if (!appliances) throw new NotFoundException(`Archetype ${archetypeId} not found`)
    return appliances
  }
}
