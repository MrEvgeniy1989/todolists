"use client"
import { authApi } from "@/features/auth/api/auth-api"
import { ResponseWithAccessToken } from "@/features/auth/api/auth-api.types"
import { useAuthStore } from "@/features/auth/model/auth-store"
import { LoginFormValuesT } from "@/features/auth/model/validators/login-validation-schema"
import { ROUTES_PATH } from "@/shared/constants/routes"
import { useMutation } from "@tanstack/react-query"
import { AxiosError, AxiosResponse } from "axios"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { useMeQuery } from "./use-me-query"

export const useLoginMutation = () => {
  const { setIsLoggedIn, setUser } = useAuthStore()
  const router = useRouter()
  const { refetch: refetchMe } = useMeQuery()

  const loginMutation = useMutation({
    mutationFn: async (loginData: LoginFormValuesT) => {
      return await authApi.login(loginData)
    },
    onSuccess: async (response: AxiosResponse<ResponseWithAccessToken>) => {
      const { accessToken } = response.data
      localStorage.setItem("accessToken", accessToken)

      const { data: me } = await refetchMe()

      if (me) {
        setIsLoggedIn(true)
        setUser(me)
        toast.success("Вы успешно вошли в систему")
        router.push(ROUTES_PATH.todolists.main)
      } else {
        toast.error("Не удалось получить данные пользователя")
        setIsLoggedIn(false)
        setUser(null)
        localStorage.removeItem("accessToken")
      }
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const errorMessage = error.response?.data?.message || "Что-то пошло не так..."
      toast.error(errorMessage)
      console.error(errorMessage)
    },
  })

  return loginMutation
}
