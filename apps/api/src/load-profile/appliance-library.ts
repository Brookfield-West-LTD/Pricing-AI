export interface ApplianceTemplate {
  id: string
  name: string
  category: string
  typicalWatts: number
  typicalHoursPerDay: number
}

export const APPLIANCE_LIBRARY: ApplianceTemplate[] = [
  // Lighting
  { id: 'led-bulb',       name: 'LED Bulb (9W)',        category: 'lighting',    typicalWatts: 9,    typicalHoursPerDay: 8  },
  { id: 'led-tube',       name: 'LED Tube (18W)',        category: 'lighting',    typicalWatts: 18,   typicalHoursPerDay: 8  },
  { id: 'floodlight',     name: 'Floodlight (50W)',      category: 'lighting',    typicalWatts: 50,   typicalHoursPerDay: 4  },
  // Cooling
  { id: 'fan-ceiling',    name: 'Ceiling Fan',           category: 'cooling',     typicalWatts: 75,   typicalHoursPerDay: 10 },
  { id: 'fan-standing',   name: 'Standing Fan',          category: 'cooling',     typicalWatts: 60,   typicalHoursPerDay: 10 },
  { id: 'ac-1hp',         name: 'AC 1HP',                category: 'cooling',     typicalWatts: 750,  typicalHoursPerDay: 8  },
  { id: 'ac-1-5hp',       name: 'AC 1.5HP',              category: 'cooling',     typicalWatts: 1100, typicalHoursPerDay: 8  },
  { id: 'ac-2hp',         name: 'AC 2HP',                category: 'cooling',     typicalWatts: 1500, typicalHoursPerDay: 8  },
  // Kitchen
  { id: 'fridge-med',     name: 'Refrigerator (200L)',   category: 'kitchen',     typicalWatts: 120,  typicalHoursPerDay: 24 },
  { id: 'fridge-large',   name: 'Refrigerator (400L)',   category: 'kitchen',     typicalWatts: 180,  typicalHoursPerDay: 24 },
  { id: 'freezer',        name: 'Deep Freezer',          category: 'kitchen',     typicalWatts: 200,  typicalHoursPerDay: 24 },
  { id: 'microwave',      name: 'Microwave',             category: 'kitchen',     typicalWatts: 1200, typicalHoursPerDay: 0.5 },
  { id: 'blender',        name: 'Blender',               category: 'kitchen',     typicalWatts: 350,  typicalHoursPerDay: 0.25 },
  { id: 'electric-kettle',name: 'Electric Kettle',       category: 'kitchen',     typicalWatts: 2000, typicalHoursPerDay: 0.25 },
  // Entertainment
  { id: 'tv-32',          name: 'TV 32"',                category: 'entertainment',typicalWatts: 60,  typicalHoursPerDay: 6  },
  { id: 'tv-55',          name: 'TV 55"',                category: 'entertainment',typicalWatts: 100, typicalHoursPerDay: 6  },
  { id: 'dstv',           name: 'DSTV Decoder',          category: 'entertainment',typicalWatts: 25,  typicalHoursPerDay: 6  },
  // Office / Devices
  { id: 'laptop',         name: 'Laptop',                category: 'office',      typicalWatts: 65,   typicalHoursPerDay: 8  },
  { id: 'desktop-pc',     name: 'Desktop PC + Monitor',  category: 'office',      typicalWatts: 250,  typicalHoursPerDay: 8  },
  { id: 'printer',        name: 'Printer',               category: 'office',      typicalWatts: 400,  typicalHoursPerDay: 0.5 },
  { id: 'phone-charger',  name: 'Phone Charger',         category: 'office',      typicalWatts: 20,   typicalHoursPerDay: 4  },
  { id: 'wifi-router',    name: 'Wi-Fi Router',          category: 'office',      typicalWatts: 15,   typicalHoursPerDay: 24 },
  // Water
  { id: 'water-pump',     name: 'Water Pump (0.5HP)',    category: 'water',       typicalWatts: 370,  typicalHoursPerDay: 2  },
  { id: 'water-pump-1hp', name: 'Water Pump (1HP)',      category: 'water',       typicalWatts: 750,  typicalHoursPerDay: 2  },
  // Medical / Commercial
  { id: 'fridge-medical', name: 'Medical Fridge',        category: 'medical',     typicalWatts: 150,  typicalHoursPerDay: 24 },
  { id: 'borehole-pump',  name: 'Borehole Pump (2HP)',   category: 'water',       typicalWatts: 1500, typicalHoursPerDay: 3  },
]

export function findAppliance(id: string): ApplianceTemplate | undefined {
  return APPLIANCE_LIBRARY.find(a => a.id === id)
}
