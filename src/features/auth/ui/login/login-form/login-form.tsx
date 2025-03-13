"use client"

import {
  LoginFormSchema,
  LoginFormValuesT,
} from "@/features/auth/model/validators/sign-in-validation-schema"
import { useLoginMutation } from "@/shared/api/hooks/use-sign-in-mutation"
import { Card } from "@/shared/components/ui/card/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form/form"
import { Input } from "@/shared/components/ui/input/input"
import { ROUTES_PATH } from "@/shared/constants/routes"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useForm } from "react-hook-form"

export const LoginForm = () => {
  const { mutate: loginMutate, isPending: isLoginPending } = useLoginMutation()

  const form = useForm<LoginFormValuesT>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      loginOrEmail: "",
      password: "",
    },
  })

  const onFormDataSubmit = (formData: LoginFormValuesT) => {
    loginMutate(formData)
  }

  return (
    <Card className="w-full max-w-105 p-6 max-sm:max-w-[335px]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onFormDataSubmit)} className="flex flex-col">
          <h1 className="mb-5 text-center text-2xl font-bold">Вход</h1>

          <FormField
            control={form.control}
            name="loginOrEmail"
            render={({ field }) => (
              <FormItem className="mb-3">
                <FormLabel>Логин или Email</FormLabel>
                <FormControl>
                  <Input type="text" {...field} disabled={isLoginPending} />
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
                <FormLabel>Пароль</FormLabel>
                <FormControl>
                  <Input type="password" {...field} disabled={isLoginPending} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <button
            type="submit"
            className={`bg-primary border-border shadow-shadow mt-4 rounded-lg border px-10 py-1 shadow-xs disabled:cursor-not-allowed disabled:opacity-50`}
            disabled={isLoginPending}
          >
            {isLoginPending ? "Выполняется вход..." : "Войти"}
          </button>

          <div className="mt-3 flex items-center justify-center gap-x-2 text-sm">
            <span className="text-sm">Еще нет аккаунта? </span>
            <Link
              href={ROUTES_PATH.auth.register}
              className="text-primary-dark-400 text-center text-sm hover:underline"
            >
              Зарегистрироваться
            </Link>
          </div>
        </form>
      </Form>
    </Card>
  )
}
