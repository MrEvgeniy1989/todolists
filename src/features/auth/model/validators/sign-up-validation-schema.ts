import { z } from "zod";

export const SignUpFormSchema = z.object({
  login: z.string().min(4, {
    message: "Login must be at least 4 characters.",
  }),
  email: z.string().email("Email is required"),
  password: z.string().min(4, {
    message: "Password must be at least 4 characters.",
  }),
  confirmPassword: z.string().min(4, {
    message: "Password must be at least 4 characters.",
  }),
});

export type SignUpFormValues = z.infer<typeof SignUpFormSchema>;
