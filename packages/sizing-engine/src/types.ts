export interface SizingInput {
  dailyKwh: number
  peakKw: number
  irradianceKwhPerM2PerDay: number
  autonomyDays?: number | undefined
  batteryDod?: number | undefined
  panelDerating?: number | undefined
  inverterEfficiency?: number | undefined
}

export interface SizingResult {
  panelKw: number
  inverterKw: number
  batteryKwh: number
  batteryBankKwh: number
  autonomyDays: number
  dailyProductionKwh: number
}
