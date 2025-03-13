"use client"
import { authApi } from "@/features/auth/api/auth-api"
import { RegisterFormValuesT } from '@/features/auth/api/auth-api.types'
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import toast from "react-hot-toast"

type Props = {
  setIsOpenSuccessfulModalAction: (isOpenSuccessfulModal: boolean) => void
}

export const useRegisterMutation = ({
  setIsOpenSuccessfulModalAction,
}: Props) => {
  const registerMutation = useMutation({
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

  return registerMutation
}
