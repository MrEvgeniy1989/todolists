import { z } from "zod"

const SPECIAL_CHARS = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/

export const passwordSchema = z
  .string()
  .trim()
  .min(8, { message: "Пароль должен быть не менее 8 символов" })
  .max(64, { message: "Пароль должен быть не более 64 символов" })
  .refine((password) => /[A-Z]/.test(password), {
    message: "Пароль должен содержать хотя бы одну заглавную букву",
  })
  .refine((password) => /[a-z]/.test(password), {
    message: "Пароль должен содержать хотя бы одну строчную букву",
  })
  .refine((password) => /[0-9]/.test(password), {
    message: "Пароль должен содержать хотя бы одну цифру",
  })
  .refine((password) => SPECIAL_CHARS.test(password), {
    message: "Пароль должен содержать хотя бы один специальный символ",
  })
  .refine((password) => !/\s/.test(password), {
    message: "Пароль не должен содержать пробелы",
  })
	.default("")

export type PasswordSchemaT = z.infer<typeof passwordSchema>
