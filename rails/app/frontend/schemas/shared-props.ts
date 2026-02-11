import { z } from "zod"

export const AuthUserSchema = z.object({
  id: z.number(),
  email: z.string().email(),
})

export const FlashSchema = z.object({
  notice: z.string().optional(),
  success: z.string().optional(),
  alert: z.string().optional(),
  error: z.string().optional(),
})

export const SharedPropsSchema = z
  .object({
    auth: z
      .object({
        user: AuthUserSchema.nullish(),
      })
      .optional(),
    flash: FlashSchema.optional(),
  })
  .passthrough()

export type SharedProps = z.infer<typeof SharedPropsSchema>
export type Flash = z.infer<typeof FlashSchema>
