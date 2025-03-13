"use client"

import { authApi } from "@/features/auth/api/auth-api"
import { RegisterFormValuesT } from "@/features/auth/api/auth-api.types"
import { RegisterFormSchema } from "@/features/auth/model/validators/sign-up-validation-schema"
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
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import Link from "next/link"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"

type Props = {
  setIsOpenSuccessfulModalAction: (isOpenSuccessfulModal: boolean) => void
}

export const RegisterForm = ({ setIsOpenSuccessfulModalAction }: Props) => {
  const { mutate, isPending: isRegisterPending } = useMutation({
    mutationFn: async (formData: RegisterFormValuesT) => {
      return authApi.register(formData)
    },
    onSuccess: () => {
      setIsOpenSuccessfulModalAction(true)
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data?.message || "Что-то пошло не так")
    },
  })

  const form = useForm<RegisterFormValuesT>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: {
      login: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  const onFormDataSubmit = (formData: RegisterFormValuesT) => {
    mutate(formData)
  }

  return (
    <Card className={"max-xs:max-w-[335px] w-full max-w-105"}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onFormDataSubmit)} className={"flex flex-col"}>
          <h1 className={`mb-5 text-center`}>Регистрация</h1>

          <FormField
            control={form.control}
            name="login"
            render={({ field }) => (
              <FormItem className={`mb-3`}>
                <FormLabel>Логин</FormLabel>
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
                <FormLabel>Пароль</FormLabel>
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
                <FormLabel>Подтвердите пароль</FormLabel>
                <FormControl>
                  <Input type={"password"} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <button
            type="submit"
            className={`bg-primary border-border shadow-shadow mt-4 rounded-lg border px-10 py-1 shadow-xs disabled:cursor-not-allowed disabled:opacity-50`}
          >
            {isRegisterPending ? "Выполняется регистрация..." : "Зарегистрироваться"}
          </button>

          <div className="mt-3 flex items-center justify-center gap-x-2 text-sm">
            <span>Уже есть аккаунт?</span>
            <Link href={ROUTES_PATH.auth.login} className={"text-primary-dark-400 text-center"}>
              Войти
            </Link>
          </div>
        </form>
      </Form>
    </Card>
  )
}
