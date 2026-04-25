export type ComponentCategory = 'panel' | 'inverter' | 'battery' | 'mounting' | 'wiring' | 'protection' | 'installation'

export interface ComponentSku {
  id: string
  category: ComponentCategory
  name: string
  brand: string
  spec: string
  unitPriceUsd: number
  leadTimeWeeks: number
  madeIn: string
}

export const COMPONENT_CATALOGUE: ComponentSku[] = [
  // ── Panels ─────────────────────────────────────────────────────
  {
    id: 'panel-mono-550w',
    category: 'panel',
    name: '550W Monocrystalline Panel',
    brand: 'JA Solar',
    spec: '550Wp, Mono PERC, 21.5% eff',
    unitPriceUsd: 95,
    leadTimeWeeks: 2,
    madeIn: 'China',
  },
  {
    id: 'panel-mono-400w',
    category: 'panel',
    name: '400W Monocrystalline Panel',
    brand: 'Canadian Solar',
    spec: '400Wp, Mono PERC, 20.3% eff',
    unitPriceUsd: 75,
    leadTimeWeeks: 2,
    madeIn: 'China',
  },
  // ── Inverters ───────────────────────────────────────────────────
  {
    id: 'inv-hybrid-5kw',
    category: 'inverter',
    name: '5kW Hybrid Inverter',
    brand: 'Victron Energy',
    spec: '5kVA, MPPT 100A, 48V, Wi-Fi',
    unitPriceUsd: 1200,
    leadTimeWeeks: 3,
    madeIn: 'Netherlands',
  },
  {
    id: 'inv-hybrid-10kw',
    category: 'inverter',
    name: '10kW Hybrid Inverter',
    brand: 'Victron Energy',
    spec: '10kVA, MPPT 150A, 48V, Wi-Fi',
    unitPriceUsd: 2400,
    leadTimeWeeks: 3,
    madeIn: 'Netherlands',
  },
  {
    id: 'inv-hybrid-3kw',
    category: 'inverter',
    name: '3kW Hybrid Inverter',
    brand: 'Deye',
    spec: '3kVA, MPPT 80A, 48V',
    unitPriceUsd: 650,
    leadTimeWeeks: 2,
    madeIn: 'China',
  },
  // ── Batteries ───────────────────────────────────────────────────
  {
    id: 'bat-lfp-100ah',
    category: 'battery',
    name: '100Ah LiFePO4 Battery',
    brand: 'CATL',
    spec: '5.12kWh, 48V, 4000+ cycles, BMS',
    unitPriceUsd: 800,
    leadTimeWeeks: 2,
    madeIn: 'China',
  },
  {
    id: 'bat-lfp-200ah',
    category: 'battery',
    name: '200Ah LiFePO4 Battery',
    brand: 'CATL',
    spec: '10.24kWh, 48V, 4000+ cycles, BMS',
    unitPriceUsd: 1500,
    leadTimeWeeks: 2,
    madeIn: 'China',
  },
  {
    id: 'bat-agm-200ah',
    category: 'battery',
    name: '200Ah AGM Deep Cycle',
    brand: 'Ritar',
    spec: '200Ah, 12V, 600 cycles',
    unitPriceUsd: 220,
    leadTimeWeeks: 1,
    madeIn: 'China',
  },
  // ── Mounting ────────────────────────────────────────────────────
  {
    id: 'mount-roof-4panel',
    category: 'mounting',
    name: 'Roof Mount Kit (4 panels)',
    brand: 'Generic',
    spec: 'Aluminium rails + L-feet + clamps',
    unitPriceUsd: 120,
    leadTimeWeeks: 1,
    madeIn: 'China',
  },
  // ── Protection ──────────────────────────────────────────────────
  {
    id: 'prot-dc-spd',
    category: 'protection',
    name: 'DC Surge Protection Device',
    brand: 'Dehn',
    spec: '1000Vdc, Type 2',
    unitPriceUsd: 85,
    leadTimeWeeks: 1,
    madeIn: 'Germany',
  },
  {
    id: 'prot-ac-spd',
    category: 'protection',
    name: 'AC Surge Protection Device',
    brand: 'Dehn',
    spec: '240Vac, Type 2',
    unitPriceUsd: 65,
    leadTimeWeeks: 1,
    madeIn: 'Germany',
  },
  {
    id: 'prot-dc-breaker',
    category: 'protection',
    name: 'DC Circuit Breaker',
    brand: 'Schneider',
    spec: '63A, 1000Vdc',
    unitPriceUsd: 45,
    leadTimeWeeks: 1,
    madeIn: 'France',
  },
  // ── Wiring ──────────────────────────────────────────────────────
  {
    id: 'wire-dc-6mm',
    category: 'wiring',
    name: 'DC Solar Cable 6mm² (per metre)',
    brand: 'Generic',
    spec: '6mm², UV-rated, TÜV',
    unitPriceUsd: 1.5,
    leadTimeWeeks: 1,
    madeIn: 'China',
  },
  // ── Installation ────────────────────────────────────────────────
  {
    id: 'install-labour',
    category: 'installation',
    name: 'Installation Labour (per kWp)',
    brand: 'Local',
    spec: 'Certified installer, per kWp installed',
    unitPriceUsd: 150,
    leadTimeWeeks: 0,
    madeIn: 'Nigeria',
  },
]

export function findComponentsByCategory(category: ComponentCategory): ComponentSku[] {
  return COMPONENT_CATALOGUE.filter(c => c.category === category)
}

export function findComponentById(id: string): ComponentSku | undefined {
  return COMPONENT_CATALOGUE.find(c => c.id === id)
}
