export interface WindSizingInput {
  dailyKwh: number
  avgWindSpeedMs: number
  turbineRatedKw?: number
  capacityFactor?: number
}

export interface WindSizingResult {
  turbineKw: number
  estimatedDailyKwh: number
  feasible: boolean
  note: string
}

const MIN_VIABLE_WIND_MS = 4.0
const DEFAULT_CAPACITY_FACTOR = 0.25

export function sizeWindSystem(input: WindSizingInput): WindSizingResult {
  const {
    dailyKwh,
    avgWindSpeedMs,
    capacityFactor = DEFAULT_CAPACITY_FACTOR,
  } = input

  if (avgWindSpeedMs < MIN_VIABLE_WIND_MS) {
    return {
      turbineKw: 0,
      estimatedDailyKwh: 0,
      feasible: false,
      note: `Wind speed ${avgWindSpeedMs} m/s is below viable minimum of ${MIN_VIABLE_WIND_MS} m/s`,
    }
  }

  const hoursPerDay = 24
  const requiredKw = dailyKwh / (hoursPerDay * capacityFactor)
  const turbineKw = Math.ceil(requiredKw * 10) / 10

  const estimatedDailyKwh = turbineKw * hoursPerDay * capacityFactor

  return {
    turbineKw,
    estimatedDailyKwh,
    feasible: true,
    note: `Sized for ${avgWindSpeedMs} m/s avg wind at CF=${capacityFactor}`,
  }
}
