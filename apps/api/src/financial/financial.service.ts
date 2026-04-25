import { Injectable, NotFoundException } from '@nestjs/common'
import { buildCashflow, calcMetrics, runSensitivity, calcCo2Avoided } from '@pricing-ai/financial-model'
import type { FinancialInput } from '@pricing-ai/financial-model'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class FinancialService {
  constructor(private prisma: PrismaService) {}

  async compute(planId: string, opts?: Partial<FinancialInput>) {
    const [boq, profile, design] = await Promise.all([
      this.prisma.bOQ.findUnique({ where: { planId } }),
      this.prisma.loadProfile.findUnique({ where: { planId } }),
      this.prisma.systemDesign.findUnique({ where: { planId } }),
    ])

    if (!boq) throw new NotFoundException(`No BOQ for plan ${planId} — run /boq/generate first`)
    if (!profile) throw new NotFoundException(`No LoadProfile for plan ${planId}`)

    const monthlyBaseline = this.estimateMonthlyBaseline(profile.currentSource, profile.dailyKwh ?? 10)

    const input: FinancialInput = {
      totalSystemCostNgn: boq.totalNgn,
      monthlyBaselineCostNgn: monthlyBaseline,
      ...opts,
    }

    const cashflow = buildCashflow(input)
    const metrics = calcMetrics(cashflow, boq.totalNgn)
    const sensitivity = runSensitivity(input)

    const annualKwh = (design?.panelKw ?? 0) * (4.5 * 365 * 0.78 * 0.94)
    const co2Tonnes = calcCo2Avoided(
      annualKwh,
      profile.currentSource === 'generator' ? 'generator' : 'grid',
    )

    await this.prisma.cashflowModel.upsert({
      where: { planId },
      create: {
        planId,
        paybackMonths: metrics.paybackMonths,
        npvNgn: metrics.npvNgn,
        irr: metrics.irr,
        monthlyRowsJson: cashflow as unknown as object[],
      },
      update: {
        paybackMonths: metrics.paybackMonths,
        npvNgn: metrics.npvNgn,
        irr: metrics.irr,
        monthlyRowsJson: cashflow as unknown as object[],
      },
    })

    return { metrics: { ...metrics, co2AvoidedTonnes: co2Tonnes }, cashflow, sensitivity }
  }

  private estimateMonthlyBaseline(source: string, dailyKwh: number): number {
    if (source === 'generator') {
      // Diesel at ~230 NGN/litre, 3.0 kWh/litre at 28% efficiency
      const litresPerDay = dailyKwh / 3.0
      return Math.round(litresPerDay * 230 * 30)
    }
    // Grid estimate: 100 NGN/kWh average (with tariff + levies)
    return Math.round(dailyKwh * 100 * 30)
  }
}
