"use client"
import { UserT } from "@/entities/user/model/user.types"
import { authApi } from "@/features/auth/api/auth-api"
import { useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"
import toast from "react-hot-toast"

export const useMeQuery = () => {
  const hasToken = typeof window !== "undefined" && !!localStorage.getItem("accessToken")

  const query = useQuery<UserT, AxiosError>({
    queryKey: ["me"],
    queryFn: async () => {
      try {
        const res = await authApi.me()
        return res.data
      } catch (error) {
        if ((error as AxiosError).response?.status !== 401) {
          toast.error(`Ошибка получения данных пользователя: ${(error as Error).message}`)
        }
        throw error
      }
    },
    enabled: hasToken,
    retry: 0, // Не повторяем запрос при ошибке
    staleTime: 300000, // Кэшируем результат на 5 минут
    refetchOnMount: true, // Обновляем при монтировании компонента

    // refetchOnWindowFocus: false, // Не обновляем при фокусе окна
    // refetchOnReconnect: false, // Не обновляем при восстановлении соединения
    // refetchInterval: false, // Отключаем автоматическое обновление
  })

  return query
}
