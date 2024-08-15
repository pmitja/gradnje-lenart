import { z } from 'zod'

export const projectFilterSchema = z.object({
  location: z
    .string()
    .min(0, {
      message: 'Prosim izberite ustrezno lokacijo.'
    })
    .optional(),
  type: z
    .string()
    .min(0, {
      message: 'Prosim izberite ustrezno tip.'
    })
    .optional()
})
