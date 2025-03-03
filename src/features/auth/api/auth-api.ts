import { SignInFormValues } from "@/features/auth/model/validators/sign-in-validation-schema";
import { SignUpFormValues } from "@/features/auth/model/validators/sign-up-validation-schema";
import { axiosInstance } from "@/shared/api/axios-instance";
import { AxiosResponse } from "axios";

export type SignUpDataT = {
  login: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type ApiResponse = {
  message: string;
};

type SignInResponse = {
  accessToken: string;
};

export const authApi = {
  signUp: async (signUpData: SignUpFormValues) => {
    return await axiosInstance.post<null, AxiosResponse<ApiResponse>, SignUpDataT>(`/api/v1/auth/register`, signUpData);
  },

  signIn: async (signInData: SignInFormValues) => {
    return await axiosInstance.post<
      SignInResponse | ApiResponse,
      AxiosResponse<SignInResponse | ApiResponse>,
      SignInFormValues
    >(`/api/v1/auth/login`, signInData);
  },

  me: async () => {
    return await axiosInstance.get(`/api/v1/auth/me`);
  },

  logout: async () => {
    return await axiosInstance.post(`/api/v1/auth/logout`);
  },
};
