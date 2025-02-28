"use client";

import { authApi, SignUpDataT } from "@/features/auth/api/auth-api";
import { SignUpFormSchema, SignUpFormValues } from "@/features/auth/model/validators/sign-up-validation-schema";
import { Card } from "@/shared/components/ui/card/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/ui/form/form";
import { Input } from "@/shared/components/ui/input/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Link from "next/link";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

type Props = {
  setIsOpenSuccessfulModalAction: (isOpenSuccessfulModal: boolean) => void;
};

export const SignUpForm = ({ setIsOpenSuccessfulModalAction }: Props) => {
  const { mutate } = useMutation({
    mutationFn: async (formData: SignUpDataT) => {
      return authApi.signUp(formData);
    },
    onSuccess: () => {
      setIsOpenSuccessfulModalAction(true);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data?.message || "Something went wrong");
    },
  });

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: {
      login: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onFormDataSubmit = (formData: SignUpFormValues) => {
    mutate(formData);
    toast("You submitted the following values:");
  };

  return (
    <Card className={"w-full max-w-105 max-xs:max-w-[335px]"}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onFormDataSubmit)} className={"flex flex-col"}>
          <h1 className={`mb-5 text-center`}>Sign Up</h1>

          <FormField
            control={form.control}
            name="login"
            render={({ field }) => (
              <FormItem className={`mb-3`}>
                <FormLabel>Login</FormLabel>
                <FormControl>
                  <Input type={"text"} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className={`mb-3`}>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type={"email"} {...field} />
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

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem className={`mb-3`}>
                <FormLabel>Confirm password</FormLabel>
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

          <span className={"mt-5 text-center text-base"}>Do you have an account?</span>
          <Link href={"/auth/sign-in"} className={"text-primary text-center"}>
            Sign In
          </Link>
        </form>
      </Form>
    </Card>
  );
};
