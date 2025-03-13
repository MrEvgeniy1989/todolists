"use client"
import { authApi } from "@/features/auth/api/auth-api"
import { useAuthStore } from "@/features/auth/model/auth-store"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"

export const useLogoutMutation = () => {
  const { setIsLoggedIn } = useAuthStore()
  const router = useRouter()

  const logoutMutation = useMutation({
    mutationFn: async () => {
      const response = await authApi.logout()
      return response
    },
    onSuccess: () => {
      localStorage.removeItem("accessToken")
      setIsLoggedIn(false)
      toast.success("Вы успешно вышли из системы")
      router.push("/auth/sign-in")
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data?.message || "Что-то пошло не так...")
    },
  })

  return logoutMutation
}
