import type { FinancialInput, CashflowMonth } from './types'

const DEFAULTS = {
  systemLifeYears: 20,
  fuelInflationRate: 0.15,      // 15% annual — conservative for Nigeria
  ngnDepreciationRate: 0.10,    // 10% annual USD/NGN depreciation
  maintenanceCostPerYearNgn: 120_000,
}

export function buildCashflow(input: FinancialInput): CashflowMonth[] {
  const {
    totalSystemCostNgn,
    monthlyBaselineCostNgn,
    systemLifeYears = DEFAULTS.systemLifeYears,
    fuelInflationRate = DEFAULTS.fuelInflationRate,
    maintenanceCostPerYearNgn = DEFAULTS.maintenanceCostPerYearNgn,
  } = input

  const months = systemLifeYears * 12
  const rows: CashflowMonth[] = []
  let cumulative = -totalSystemCostNgn

  for (let i = 0; i < months; i++) {
    const yearIndex = Math.floor(i / 12)
    const inflationFactor = Math.pow(1 + fuelInflationRate, yearIndex)
    const baselineCost = monthlyBaselineCostNgn * inflationFactor
    const planCost = maintenanceCostPerYearNgn / 12
    const netSavings = baselineCost - planCost
    cumulative += netSavings

    rows.push({
      month: (i % 12) + 1,
      year: yearIndex + 1,
      baselineCostNgn: Math.round(baselineCost),
      planCostNgn: Math.round(planCost),
      netSavingsNgn: Math.round(netSavings),
      cumulativeSavingsNgn: Math.round(cumulative),
    })
  }

  return rows
}
