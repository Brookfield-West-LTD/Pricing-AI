export interface FinancialInput {
  totalSystemCostNgn: number
  monthlyBaselineCostNgn: number
  systemLifeYears?: number
  fuelInflationRate?: number
  ngnDepreciationRate?: number
  maintenanceCostPerYearNgn?: number
}

export interface CashflowMonth {
  month: number
  year: number
  baselineCostNgn: number
  planCostNgn: number
  netSavingsNgn: number
  cumulativeSavingsNgn: number
}

export interface FinancialMetrics {
  paybackMonths: number
  npvNgn: number
  irr: number
  twentyYearSavingsNgn: number
}
