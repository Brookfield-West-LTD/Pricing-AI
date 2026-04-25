export interface BatteryBankInput {
  requiredKwh: number
  nominalVoltage?: number
  dod?: number
}

export interface BatteryBankResult {
  capacityKwh: number
  capacityAh: number
  nominalVoltage: number
  recommendedConfiguration: string
}

export function sizeBatteryBank(input: BatteryBankInput): BatteryBankResult {
  const { requiredKwh, nominalVoltage = 48, dod = 0.8 } = input

  const grossKwh = requiredKwh / dod
  const capacityAh = (grossKwh * 1000) / nominalVoltage

  return {
    capacityKwh: Math.ceil(grossKwh * 2) / 2,
    capacityAh: Math.ceil(capacityAh / 50) * 50,
    nominalVoltage,
    recommendedConfiguration: `${nominalVoltage}V / ${Math.ceil(capacityAh / 50) * 50}Ah`,
  }
}
