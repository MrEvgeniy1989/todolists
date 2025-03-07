import { UserT } from "@/entities/user/model/user.types"
import { authApi } from "@/features/auth/api/auth-api"
import { useQuery } from "@tanstack/react-query"
import { AxiosError, AxiosResponse } from "axios"
import { useEffect } from "react"

export const useMeQuery = () => {
  const query = useQuery<UserT, AxiosError>({
    queryKey: ["me"],
    queryFn: async () => {
      return authApi.me().then((res: AxiosResponse<UserT>) => {
        return res.data
      })
    },
    retry: false,
  })

  useEffect(() => {
    if (query.error) {
      console.log("useMeQuery: Request Error:", query.error?.response?.status)
    }
  }, [query.error])

  return query
}
