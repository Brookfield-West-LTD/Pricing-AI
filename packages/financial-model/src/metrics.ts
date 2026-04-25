import type { CashflowMonth, FinancialMetrics } from './types'

export function calcMetrics(
  cashflow: CashflowMonth[],
  totalSystemCostNgn: number,
  discountRate = 0.20,
): FinancialMetrics {
  const paybackRow = cashflow.find(r => r.cumulativeSavingsNgn >= 0)
  const paybackMonths = paybackRow
    ? (paybackRow.year - 1) * 12 + paybackRow.month
    : cashflow.length

  // NPV
  let npv = -totalSystemCostNgn
  cashflow.forEach((row, i) => {
    npv += row.netSavingsNgn / Math.pow(1 + discountRate / 12, i + 1)
  })

  // IRR via bisection
  const irr = calcIrr(totalSystemCostNgn, cashflow.map(r => r.netSavingsNgn))

  const twentyYearSavings = cashflow.reduce((sum, r) => sum + r.netSavingsNgn, 0)

  return {
    paybackMonths,
    npvNgn: Math.round(npv),
    irr: Math.round(irr * 1000) / 1000,
    twentyYearSavingsNgn: Math.round(twentyYearSavings),
  }
}

function calcIrr(initialCost: number, monthlyFlows: number[]): number {
  let lo = -0.99, hi = 10
  for (let iter = 0; iter < 100; iter++) {
    const mid = (lo + hi) / 2
    const npv = -initialCost + monthlyFlows.reduce((s, f, i) => s + f / Math.pow(1 + mid / 12, i + 1), 0)
    if (Math.abs(npv) < 1) break
    npv > 0 ? (lo = mid) : (hi = mid)
  }
  return (lo + hi) / 2
}
