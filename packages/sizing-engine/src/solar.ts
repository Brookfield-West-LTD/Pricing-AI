import type { SizingInput, SizingResult } from './types'

const DEFAULTS = {
  autonomyDays: 1,
  batteryDod: 0.8,
  panelDerating: 0.78,
  inverterEfficiency: 0.94,
}

export function sizeSolarSystem(input: SizingInput): SizingResult {
  const {
    dailyKwh,
    peakKw,
    irradianceKwhPerM2PerDay,
    autonomyDays = DEFAULTS.autonomyDays,
    batteryDod = DEFAULTS.batteryDod,
    panelDerating = DEFAULTS.panelDerating,
    inverterEfficiency = DEFAULTS.inverterEfficiency,
  } = input

  // Panel sizing: daily load / (irradiance × derating × inverter efficiency)
  const panelKw = dailyKwh / (irradianceKwhPerM2PerDay * panelDerating * inverterEfficiency)

  // Inverter sizing: cover peak load with 25% headroom, min 1 kW
  const inverterKw = Math.max(peakKw * 1.25, 1)

  // Battery sizing: cover autonomy days at declared DoD
  const batteryKwh = (dailyKwh * autonomyDays) / batteryDod

  // Round up to nearest practical size
  const panelKwRounded = Math.ceil(panelKw * 2) / 2        // 0.5 kW steps
  const inverterKwRounded = Math.ceil(inverterKw)           // 1 kW steps
  const batteryKwhRounded = Math.ceil(batteryKwh / 2) * 2  // 2 kWh steps

  const dailyProductionKwh =
    panelKwRounded * irradianceKwhPerM2PerDay * panelDerating * inverterEfficiency

  return {
    panelKw: panelKwRounded,
    inverterKw: inverterKwRounded,
    batteryKwh: batteryKwhRounded,
    batteryBankKwh: batteryKwhRounded,
    autonomyDays,
    dailyProductionKwh,
  }
}
