"use client"
import { authApi } from "@/features/auth/api/auth-api"
import { ResponseWithAccessToken } from "@/features/auth/api/auth-api.types"
import { useAuthStore } from "@/features/auth/model/auth-store"
import { LoginFormValuesT } from "@/features/auth/model/validators/sign-in-validation-schema"
import { useMutation } from "@tanstack/react-query"
import { AxiosError, AxiosResponse } from "axios"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { queryClient } from "../query-client"

export const useLoginMutation = () => {
  const { setIsLoggedIn } = useAuthStore()
  const router = useRouter()

  const loginMutation = useMutation({
    mutationFn: async (loginData: LoginFormValuesT) => {
      return await authApi.login(loginData)
    },
    onSuccess: (response: AxiosResponse<ResponseWithAccessToken>) => {
      const { accessToken } = response.data
      localStorage.setItem("accessToken", accessToken)
      setIsLoggedIn(true)
      queryClient.invalidateQueries({ queryKey: ["me"] })
      toast.success("Вы успешно вошли в систему")
      router.push("/todolists")
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data?.message || "Что-то пошло не так...")
      console.error(error.response?.data?.message || "Что-то пошло не так...")
    },
  })

  return loginMutation
}
