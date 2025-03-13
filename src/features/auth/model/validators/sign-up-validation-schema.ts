import { z } from "zod"

export const RegisterFormSchema = z.object({
  login: z.string().min(4, {
    message: "Логин должен быть не менее 4 символов.",
  }),
  email: z.string().email("Email обязателен"),
  password: z.string().min(4, {
    message: "Пароль должен быть не менее 4 символов.",
  }),
  confirmPassword: z.string().min(4, {
    message: "Пароль должен быть не менее 4 символов.",
  }),
})

export type RegisterFormValuesT = z.infer<typeof RegisterFormSchema>
