import { z } from "zod"
import { passwordSchema } from './password-validation-schema'
import { emailSchema } from './email-validation-schema'
export const RegisterFormSchema = z
  .object({
    login: z.string().min(4, {
      message: "Логин должен быть не менее 4 символов.",
    }),
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
  })

export type RegisterFormValuesT = z.infer<typeof RegisterFormSchema>
