import { SignInFormValues } from "@/features/auth/model/validators/sign-in-validation-schema";
import { SignUpFormValues } from "@/features/auth/model/validators/sign-up-validation-schema";
import { axiosNotAuthorized, axiosWithAuth } from "@/shared/api/axios-instance";
import { AxiosResponse } from "axios";
import { ApiResponse, SignInResponse, SignUpDataT } from "./auth-api.types";

export const authApi = {
  signUp: async (signUpData: SignUpFormValues) => {
    return await axiosNotAuthorized.post<null, AxiosResponse<ApiResponse>, SignUpDataT>(
      `/api/v1/auth/register`,
      signUpData,
    );
  },

  signIn: async (signInData: SignInFormValues) => {
    return await axiosNotAuthorized.post<
      SignInResponse | ApiResponse,
      AxiosResponse<SignInResponse | ApiResponse>,
      SignInFormValues
    >(`/api/v1/auth/login`, signInData);
  },

  me: async () => {
    return await axiosWithAuth.get(`/api/v1/auth/me`);
  },

  logout: async () => {
    return await axiosWithAuth.post(`/api/v1/auth/logout`);
  },

  getNewTokens: async () => {
    return await axiosWithAuth.post(`/api/v1/auth/refresh`);
  },
};
