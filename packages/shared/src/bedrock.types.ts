import type { LoadProfile, SystemDesign, BOQ, FinancialMetrics } from './plan.types'

export interface IrradianceResult {
  monthlyKwhPerM2PerDay: number[]
  annualAvgKwhPerM2PerDay: number
}

export interface BillExtractionResult {
  disco: string
  tariffBand: string
  monthlyKwh: number
  amountNgn: number
}

export interface FieldSchema {
  id: string
  label: string
  watts: number
  icon?: string
}

export type BedrockToolName =
  | 'get_location_irradiance'
  | 'extract_bill'
  | 'build_load_profile'
  | 'size_system'
  | 'price_design'
  | 'model_financials'
  | 'generate_schedule'
  | 'render_report'
  | 'list_financing'
  | 'list_installers'
  | 'infer_user_priority'
  | 'extend_form_schema'
