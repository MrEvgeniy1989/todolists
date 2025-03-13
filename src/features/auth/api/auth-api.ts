import { UserT } from "@/entities/user/model/user.types"
import { LoginFormValuesT } from "@/features/auth/model/validators/sign-in-validation-schema"
import { RegisterFormValuesT } from "@/features/auth/model/validators/sign-up-validation-schema"
import { axiosNotAuthorized, axiosWithAuth } from "@/shared/api/axios-instance"
import { AxiosResponse } from "axios"
import { BaseResponse, ResponseWithAccessToken } from "./auth-api.types"

const AUTH_PATH = "/api/v1/auth"

export const authApi = {
  register: async (signUpData: RegisterFormValuesT) => {
    return await axiosNotAuthorized.post<null, AxiosResponse<BaseResponse>, RegisterFormValuesT>(
      `${AUTH_PATH}/register`,
      signUpData,
    )
  },

  login: async (signInData: LoginFormValuesT) => {
    return await axiosNotAuthorized.post<
      ResponseWithAccessToken,
      AxiosResponse<ResponseWithAccessToken>,
      LoginFormValuesT
    >(`${AUTH_PATH}/login`, signInData)
  },

  me: async () => {
    return await axiosWithAuth.get<UserT>(`${AUTH_PATH}/me`)
  },

  logout: async () => {
    return await axiosWithAuth.post<BaseResponse, AxiosResponse<BaseResponse>, null>(
      `${AUTH_PATH}/logout`,
    )
  },

  getNewTokens: async () => {
    return await axiosWithAuth.post<
      ResponseWithAccessToken,
      AxiosResponse<ResponseWithAccessToken>,
      null
    >(`${AUTH_PATH}/refresh`)
  },
}
