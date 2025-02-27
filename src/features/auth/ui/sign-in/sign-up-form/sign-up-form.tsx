"use client";

import { authApi, SignUpDataT } from "@/features/auth/api/auth-api";
import { Card } from "@/shared/components/ui/card/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/ui/form/form";
import { Input } from "@/shared/components/ui/input/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const SignInFormSchema = z.object({
  loginOrEmail: z.string().min(4, {
    message: "Login must be at least 4 characters.",
  }),
  password: z.string().min(4, {
    message: "Password must be at least 4 characters.",
  }),
});

export const SignInForm = () => {
  const { mutate } = useMutation({
    mutationFn: async (formData: SignUpDataT) => {
      return authApi.signUp(formData);
    },
    onSuccess: () => {
    },
  });

  const form = useForm<z.infer<typeof SignInFormSchema>>({
    resolver: zodResolver(SignInFormSchema),
    defaultValues: {
      loginOrEmail: "",
      password: "",
    },
  });

  const onFormDataSubmit = (formData: z.infer<typeof SignInFormSchema>) => {
    mutate(formData);
    toast("You submitted the following values:");
  };

  return (
    <Card className={"w-full max-w-105 max-sm:max-w-[335px]"}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onFormDataSubmit)} className={"flex flex-col"}>
          <h1 className={`mb-5 text-center`}>Sign In</h1>

          <FormField
            control={form.control}
            name="loginOrEmail"
            render={({ field }) => (
              <FormItem className={`mb-3`}>
                <FormLabel>Login or Email</FormLabel>
                <FormControl>
                  <Input type={"text"} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className={`mb-3`}>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type={"password"} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <button
            type="submit"
            className={`bg-primary border-border shadow-shadow mt-8 rounded-lg border px-10 py-1 shadow-xs`}
          >
            Submit
          </button>

          <span className={"mt-5 text-center text-base"}>Do you have account?</span>
          <Link href={"/auth/sign-up"} className={"text-primary text-center"}>
            Sign Up
          </Link>
        </form>
      </Form>
    </Card>
  );
};
