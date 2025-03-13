import { UserT } from "@/entities/user/model/user.types"
import { LoginFormValuesT } from "@/features/auth/model/validators/sign-in-validation-schema"
import { SignUpFormValues } from "@/features/auth/model/validators/sign-up-validation-schema"
import { axiosNotAuthorized, axiosWithAuth } from "@/shared/api/axios-instance"
import { AxiosResponse } from "axios"
import { BaseResponse, RegisterFormValuesT, ResponseWithAccessToken } from "./auth-api.types"

export const authApi = {
  register: async (signUpData: SignUpFormValues) => {
    return await axiosNotAuthorized.post<null, AxiosResponse<BaseResponse>, RegisterFormValuesT>(
      `/api/v1/auth/register`,
      signUpData,
    )
  },

  login: async (signInData: LoginFormValuesT) => {
    return await axiosNotAuthorized.post<
      ResponseWithAccessToken,
      AxiosResponse<ResponseWithAccessToken>,
      LoginFormValuesT
    >(`/api/v1/auth/login`, signInData)
  },

  me: async () => {
    return await axiosWithAuth.get<UserT>(`/api/v1/auth/me`)
  },

  logout: async () => {
    return await axiosWithAuth.post<BaseResponse, AxiosResponse<BaseResponse>, null>(
      `/api/v1/auth/logout`,
    )
  },

  getNewTokens: async () => {
    return await axiosWithAuth.post<
      ResponseWithAccessToken,
      AxiosResponse<ResponseWithAccessToken>,
      null
    >(`/api/v1/auth/refresh`)
  },
}
