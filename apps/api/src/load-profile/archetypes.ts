import type { Appliance } from '@pricing-ai/shared'

export interface Archetype {
  id: string
  name: string
  who: 'home' | 'business' | 'community'
  description: string
  appliances: Omit<Appliance, 'id' | 'addedByPria'>[]
}

export const ARCHETYPES: Archetype[] = [
  {
    id: 'home-small',
    name: '2-Bedroom Home',
    who: 'home',
    description: 'Small home with basic appliances',
    appliances: [
      { name: 'LED Bulb (9W)',      watts: 9,    hoursPerDay: 8,  quantity: 6  },
      { name: 'Ceiling Fan',        watts: 75,   hoursPerDay: 10, quantity: 2  },
      { name: 'Refrigerator (200L)',watts: 120,  hoursPerDay: 24, quantity: 1  },
      { name: 'TV 32"',             watts: 60,   hoursPerDay: 5,  quantity: 1  },
      { name: 'Phone Charger',      watts: 20,   hoursPerDay: 4,  quantity: 3  },
      { name: 'Wi-Fi Router',       watts: 15,   hoursPerDay: 24, quantity: 1  },
    ],
  },
  {
    id: 'home-medium',
    name: '3-Bedroom Home',
    who: 'home',
    description: 'Mid-size home, ceiling fans + 1 AC',
    appliances: [
      { name: 'LED Bulb (9W)',      watts: 9,    hoursPerDay: 8,  quantity: 10 },
      { name: 'Ceiling Fan',        watts: 75,   hoursPerDay: 10, quantity: 3  },
      { name: 'AC 1.5HP',           watts: 1100, hoursPerDay: 8,  quantity: 1  },
      { name: 'Refrigerator (400L)',watts: 180,  hoursPerDay: 24, quantity: 1  },
      { name: 'TV 55"',             watts: 100,  hoursPerDay: 5,  quantity: 1  },
      { name: 'TV 32"',             watts: 60,   hoursPerDay: 4,  quantity: 1  },
      { name: 'Laptop',             watts: 65,   hoursPerDay: 6,  quantity: 2  },
      { name: 'Water Pump (0.5HP)', watts: 370,  hoursPerDay: 1,  quantity: 1  },
      { name: 'Wi-Fi Router',       watts: 15,   hoursPerDay: 24, quantity: 1  },
    ],
  },
  {
    id: 'business-small-office',
    name: 'Small Office (5–10 staff)',
    who: 'business',
    description: 'Computers, lighting, 1 AC',
    appliances: [
      { name: 'Desktop PC + Monitor', watts: 250, hoursPerDay: 8, quantity: 5  },
      { name: 'LED Tube (18W)',        watts: 18,  hoursPerDay: 9, quantity: 10 },
      { name: 'AC 2HP',               watts: 1500, hoursPerDay: 8, quantity: 1 },
      { name: 'Printer',              watts: 400,  hoursPerDay: 1, quantity: 1  },
      { name: 'Wi-Fi Router',         watts: 15,   hoursPerDay: 24, quantity: 1 },
    ],
  },
  {
    id: 'business-shop',
    name: 'Retail Shop / Supermarket',
    who: 'business',
    description: 'Lighting, fridges, fans',
    appliances: [
      { name: 'LED Tube (18W)',       watts: 18,  hoursPerDay: 12, quantity: 20 },
      { name: 'Refrigerator (400L)', watts: 180,  hoursPerDay: 24, quantity: 3  },
      { name: 'Deep Freezer',        watts: 200,  hoursPerDay: 24, quantity: 2  },
      { name: 'Ceiling Fan',         watts: 75,   hoursPerDay: 12, quantity: 4  },
      { name: 'DSTV Decoder',        watts: 25,   hoursPerDay: 8,  quantity: 1  },
    ],
  },
  {
    id: 'community-clinic',
    name: 'Rural Health Clinic',
    who: 'community',
    description: 'Medical fridge, lighting, fans',
    appliances: [
      { name: 'Medical Fridge',      watts: 150, hoursPerDay: 24, quantity: 2  },
      { name: 'LED Tube (18W)',      watts: 18,  hoursPerDay: 12, quantity: 12 },
      { name: 'Ceiling Fan',         watts: 75,  hoursPerDay: 10, quantity: 4  },
      { name: 'Laptop',              watts: 65,  hoursPerDay: 6,  quantity: 2  },
      { name: 'Wi-Fi Router',        watts: 15,  hoursPerDay: 24, quantity: 1  },
      { name: 'Water Pump (0.5HP)', watts: 370,  hoursPerDay: 2,  quantity: 1  },
    ],
  },
]

export function getArchetype(id: string): Archetype | undefined {
  return ARCHETYPES.find(a => a.id === id)
}
