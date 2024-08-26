import { z } from 'zod'

export const tokenSchema = z.object({
  access_token: z.string().min(1),
  scope: z.string().min(1),
  token_type: z.string().min(1),
  expires_in: z.number()
})
