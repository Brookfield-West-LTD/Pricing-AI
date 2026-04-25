// Nigerian grid emission factor: ~0.43 kgCO₂/kWh (IEA 2023)
// Diesel emission factor: ~2.68 kgCO₂/litre, ~0.72 kgCO₂/kWh (at 28% gen efficiency)
const GRID_EF_KG_PER_KWH = 0.43
const DIESEL_EF_KG_PER_KWH = 0.72

export function calcCo2Avoided(
  annualProductionKwh: number,
  baselineSource: 'grid' | 'generator',
  systemLifeYears = 20,
): number {
  const ef = baselineSource === 'generator' ? DIESEL_EF_KG_PER_KWH : GRID_EF_KG_PER_KWH
  const kgAvoided = annualProductionKwh * systemLifeYears * ef
  return Math.round(kgAvoided / 1000 * 10) / 10 // tonnes, 1dp
}
