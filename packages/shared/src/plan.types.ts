export type EnergyDirection = 'solar' | 'wind' | 'biomass' | 'hybrid' | 'any'
export type CurrentSource = 'grid_only' | 'grid_gen' | 'gen_only' | 'none'
export type WhoType = 'homeowner' | 'sme' | 'industrial' | 'developer'
export type Priority = 'cost' | 'reliability' | 'sustainability'

export interface Appliance {
  id: string
  name: string
  watts: number
  hoursPerDay: number
  quantity: number
  addedByPria?: boolean | undefined
}

export interface LoadProfile {
  who: WhoType
  location: string
  lat?: number
  lng?: number
  currentSource: CurrentSource
  generatorKva?: number
  energyDirection: EnergyDirection
  appliances: Appliance[]
  dailyKwh?: number
  peakKw?: number
}

export interface SystemDesign {
  panelKw: number
  inverterKw: number
  batteryKwh: number
  autonomyDays: number
  components: SystemComponent[]
}

export interface SystemComponent {
  category: string
  name: string
  quantity: number
  unitWatts?: number
}

export interface BOQLineItem {
  id: string
  description: string
  category: string
  quantity: number
  unitPriceNgn: number
  totalNgn: number
  usdLinked: boolean
}

export interface BOQ {
  lineItems: BOQLineItem[]
  subtotalNgn: number
  vatNgn: number
  totalNgn: number
  fxRateUsed: number
  generatedAt: string
}

export interface CashflowMonth {
  month: number
  year: number
  baselineCostNgn: number
  planCostNgn: number
  cumulativeSavingsNgn: number
}

export interface FinancialMetrics {
  paybackMonths: number
  npvNgn: number
  irr: number
  twentyYearSavingsNgn: number
  co2AvoidedTonnes: number
}

export interface Plan {
  id: string
  shareToken: string
  loadProfile?: LoadProfile
  systemDesign?: SystemDesign
  boq?: BOQ
  financialMetrics?: FinancialMetrics
  cashflow?: CashflowMonth[]
  priority?: Priority
  createdAt: string
  updatedAt: string
}
