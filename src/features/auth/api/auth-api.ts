import { SignInFormValues } from "@/features/auth/model/validators/sign-in-validation-schema";
import { SignUpFormValues } from "@/features/auth/model/validators/sign-up-validation-schema";
import { axiosNotAuthorized, axiosWithAuth } from "@/shared/api/axios-instance";
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
};
