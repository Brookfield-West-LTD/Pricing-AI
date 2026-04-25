import type { FinancialInput } from './types'
import { buildCashflow } from './cashflow'
import { calcMetrics } from './metrics'

export interface SensitivityResult {
  fuelDelta: number
  fxDelta: number
  paybackMonths: number
  npvNgn: number
}

export function runSensitivity(base: FinancialInput): SensitivityResult[] {
  const deltas = [-0.20, 0, 0.20]
  const results: SensitivityResult[] = []

  for (const fuelDelta of deltas) {
    for (const fxDelta of deltas) {
      const adjusted: FinancialInput = {
        ...base,
        monthlyBaselineCostNgn: base.monthlyBaselineCostNgn * (1 + fuelDelta),
        totalSystemCostNgn: base.totalSystemCostNgn * (1 + fxDelta),
      }
      const cashflow = buildCashflow(adjusted)
      const metrics = calcMetrics(cashflow, adjusted.totalSystemCostNgn)
      results.push({ fuelDelta, fxDelta, paybackMonths: metrics.paybackMonths, npvNgn: metrics.npvNgn })
    }
  }

  return results
}
