import { z } from "zod"

export const AuthUserSchema = z.object({
  id: z.number(),
  email: z.string().email(),
})

export const SharedPropsSchema = z
  .object({
    auth: z
      .object({
        user: AuthUserSchema.nullable(),
      })
      .optional(),
  })
  .passthrough()

export type SharedProps = z.infer<typeof SharedPropsSchema>
