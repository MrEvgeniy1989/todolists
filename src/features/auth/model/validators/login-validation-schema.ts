import { z } from "zod"
import { passwordSchema } from './password-validation-schema'
export const LoginFormSchema = z.object({
  loginOrEmail: z.string().min(4, {
    message: "Логин или email должен быть не менее 4 символов.",
  }),
  password: passwordSchema,
})

export type LoginFormValuesT = z.infer<typeof LoginFormSchema>
