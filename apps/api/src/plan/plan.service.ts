import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class PlanService {
  constructor(private prisma: PrismaService) {}

  async create() {
    return this.prisma.plan.create({ data: {} })
  }

  async findByShareToken(shareToken: string) {
    return this.prisma.plan.findUnique({
      where: { shareToken },
      include: {
        loadProfile: true,
        systemDesign: true,
        boq: true,
        cashflow: true,
        schedule: true,
        reports: true,
      },
    })
  }

  async submitIntake(planId: string, intake: { data: Record<string, unknown>; priority: string }) {
    const { data } = intake
    const appliances = (data.appliances as { watts: number; hoursPerDay: number; quantity: number }[]) ?? []
    const dailyKwh = appliances.reduce(
      (sum, a) => sum + (a.watts * a.hoursPerDay * a.quantity) / 1000,
      0,
    )

    await this.prisma.loadProfile.upsert({
      where: { planId },
      create: {
        planId,
        who: String(data.who ?? ''),
        location: String(data.location ?? ''),
        lat: (data.lat as number | null) ?? null,
        lng: (data.lng as number | null) ?? null,
        currentSource: String(data.currentSource ?? ''),
        energyDirection: String(data.energyDirection ?? ''),
        appliancesJson: appliances,
        dailyKwh,
      },
      update: {
        who: String(data.who ?? ''),
        location: String(data.location ?? ''),
        lat: (data.lat as number | null) ?? null,
        lng: (data.lng as number | null) ?? null,
        currentSource: String(data.currentSource ?? ''),
        energyDirection: String(data.energyDirection ?? ''),
        appliancesJson: appliances,
        dailyKwh,
      },
    })

    return { ok: true }
  }
}
