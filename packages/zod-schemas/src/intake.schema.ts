import { z } from 'zod'

export const WhoSchema = z.enum(['homeowner', 'sme', 'industrial', 'developer'])
export const CurrentSourceSchema = z.enum(['grid_only', 'grid_gen', 'gen_only', 'none'])
export const EnergyDirectionSchema = z.enum(['solar', 'wind', 'biomass', 'hybrid', 'any'])
export const PrioritySchema = z.enum(['cost', 'reliability', 'sustainability'])

export const ApplianceSchema = z.object({
  id: z.string(),
  name: z.string(),
  watts: z.number().positive(),
  hoursPerDay: z.number().min(0).max(24),
  quantity: z.number().int().positive(),
  addedByPria: z.boolean().optional(),
})

export const IntakeSchema = z.object({
  who: WhoSchema,
  location: z.string().min(1),
  lat: z.number().optional(),
  lng: z.number().optional(),
  currentSource: CurrentSourceSchema,
  generatorKva: z.number().positive().optional(),
  energyDirection: EnergyDirectionSchema,
  appliances: z.array(ApplianceSchema),
})

export type IntakeInput = z.infer<typeof IntakeSchema>
export type ApplianceInput = z.infer<typeof ApplianceSchema>
