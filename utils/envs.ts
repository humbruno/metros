import { z } from 'zod'

const envSchema = z.object({
  API_BASE_URL: z
    .string({ required_error: 'env API_BASE_URL is required' })
    .min(1),
  TOKEN_URL: z
    .string({ required_error: 'env TOKEN_API_URL is required' })
    .min(1),
  HEADER_KEY: z
    .string({ required_error: 'env API_HEADER_KEY is required' })
    .min(1),
  HEADER_VALUE: z
    .string({ required_error: 'env API_HEADER_VALUE is required' })
    .min(1)
})

export const envs = envSchema.parse({
  API_BASE_URL: process.env.EXPO_PUBLIC_API_BASE_URL,
  TOKEN_URL: process.env.EXPO_PUBLIC_TOKEN_API_URL,
  HEADER_KEY: process.env.EXPO_PUBLIC_API_HEADER_KEY,
  HEADER_VALUE: process.env.EXPO_PUBLIC_API_HEADER_VALUE
})
