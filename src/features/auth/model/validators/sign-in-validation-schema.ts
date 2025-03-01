import { z } from "zod";

export const SignInFormSchema = z.object({
  loginOrEmail: z.string().min(4, {
    message: "Login must be at least 4 characters.",
  }),
  password: z.string().min(4, {
    message: "Password must be at least 4 characters.",
  }),
});

export type SignInFormValues = z.infer<typeof SignInFormSchema>;
