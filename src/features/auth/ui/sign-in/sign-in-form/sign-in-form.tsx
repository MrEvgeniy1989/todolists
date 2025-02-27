"use client";

import { authApi } from "@/features/auth/api/auth-api";
import { SignInFormSchema, SignInFormValues } from "@/features/auth/model/validators/sign-in-validation-schema";
import { Card } from "@/shared/components/ui/card/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/ui/form/form";
import { Input } from "@/shared/components/ui/input/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Link from "next/link";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export const SignInForm = () => {
  const { mutate } = useMutation({
    mutationFn: async (formData: SignInFormValues) => {
      return authApi.signIn(formData);
    },
    onSuccess: () => {},
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data?.message || "Something went wrong");
    },
  });

  const form = useForm<SignInFormValues>({
    resolver: zodResolver(SignInFormSchema),
    defaultValues: {
      loginOrEmail: "",
      password: "",
    },
  });

  const onFormDataSubmit = (formData: SignInFormValues) => {
    mutate(formData);
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

          <span className={"mt-5 text-center text-base"}>You don&#39;t have an account?</span>
          <Link href={"/auth/sign-up"} className={"text-primary text-center"}>
            Sign Up
          </Link>
        </form>
      </Form>
    </Card>
  );
};
