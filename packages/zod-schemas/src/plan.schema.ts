import { z } from 'zod'
import { PrioritySchema } from './intake.schema'

export const CreatePlanSchema = z.object({
  who: z.string(),
  location: z.string(),
})

export const UpdatePrioritySchema = z.object({
  planId: z.string(),
  priority: PrioritySchema,
})

export const ExtendFormSchema = z.object({
  planId: z.string(),
  stepId: z.string(),
  userDescription: z.string().min(1).max(500),
})

export const SharePlanSchema = z.object({
  planId: z.string(),
})

export type CreatePlanInput = z.infer<typeof CreatePlanSchema>
export type UpdatePriorityInput = z.infer<typeof UpdatePrioritySchema>
export type ExtendFormInput = z.infer<typeof ExtendFormSchema>
