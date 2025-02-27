import { SignInFormValues } from "@/features/auth/model/validators/sign-in-validation-schema";
import { SignUpFormValues } from "@/features/auth/model/validators/sign-up-validation-schema";
import { settings } from "@/shared/settings";
import axios, { AxiosResponse } from "axios";

export type SignUpDataT = {
  login: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type ApiResponse = {
  message: string;
};

export const authApi = {
  signUp: async (signUpData: SignUpFormValues) => {
    return await axios.post<null, AxiosResponse<ApiResponse>, SignUpDataT>(
      `${settings.API_URL}/api/v1/auth/register`,
      signUpData,
    );
  },

  signIn: async (signInData: SignInFormValues) => {
    return await axios.post<null, AxiosResponse<ApiResponse>, SignInFormValues>(
      `${settings.API_URL}/api/v1/auth/login`,
      signInData,
      {
        withCredentials: true,
      },
    );
  },

  // me: async () => {
  //   return await axios.get(`${settings.API_URL}/api/v1/auth/me`)
  // }
};
