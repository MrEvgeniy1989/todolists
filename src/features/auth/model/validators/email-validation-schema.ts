import { z } from "zod"

export const EMAIL_PATTERN =
  /^[-!#$%&'*+/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+/0-9=?A-Z^_a-z{|}~])*@[a-zA-Z](-?[a-zA-Z0-9])*(\.[a-zA-Z](-?[a-zA-Z0-9])*)+$/

export const emailSchema = z
  .string()
  .trim()
  .nonempty({ message: "Email обязателен" })
  .max(100, { message: "Email слишком длинный" })
  .regex(EMAIL_PATTERN, "Некорректный email")
  .default("")

export type EmailSchemaT = z.infer<typeof emailSchema>
