export interface BiomassSizingInput {
  dailyKwh: number
  feedstockKgPerDay: number
  feedstockType: 'agricultural' | 'municipal' | 'wood' | 'biogas'
}

export interface BiomassSizingResult {
  feasible: boolean
  generatorKw: number
  estimatedDailyKwh: number
  feedstockSufficiencyRatio: number
  note: string
}

const FEEDSTOCK_ENERGY_DENSITY: Record<BiomassSizingInput['feedstockType'], number> = {
  agricultural: 3.5,
  municipal: 2.5,
  wood: 4.5,
  biogas: 6.0,
}

const CONVERSION_EFFICIENCY = 0.25

export function sizeBiomassSystem(input: BiomassSizingInput): BiomassSizingResult {
  const { dailyKwh, feedstockKgPerDay, feedstockType } = input

  const densityKwhPerKg = FEEDSTOCK_ENERGY_DENSITY[feedstockType]
  const potentialDailyKwh = feedstockKgPerDay * densityKwhPerKg * CONVERSION_EFFICIENCY
  const feedstockSufficiencyRatio = potentialDailyKwh / dailyKwh

  const feasible = feedstockSufficiencyRatio >= 0.8

  const generatorKw = feasible
    ? Math.ceil((dailyKwh / 20) * 10) / 10
    : 0

  return {
    feasible,
    generatorKw,
    estimatedDailyKwh: potentialDailyKwh,
    feedstockSufficiencyRatio,
    note: feasible
      ? `${feedstockType} feedstock covers ${(feedstockSufficiencyRatio * 100).toFixed(0)}% of load`
      : `Insufficient feedstock: ${(feedstockSufficiencyRatio * 100).toFixed(0)}% of required load`,
  }
}
