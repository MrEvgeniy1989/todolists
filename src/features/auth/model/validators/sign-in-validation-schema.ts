import { z } from "zod"

export const LoginFormSchema = z.object({
  loginOrEmail: z.string().min(4, {
    message: "Логин или email должен быть не менее 4 символов.",
  }),
  password: z.string().min(4, {
    message: "Пароль должен быть не менее 4 символов.",
  }),
})

export type LoginFormValuesT = z.infer<typeof LoginFormSchema>
