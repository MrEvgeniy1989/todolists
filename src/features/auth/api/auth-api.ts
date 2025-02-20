import { settings } from "@/shared/settings";
import axios, { AxiosResponse } from "axios";

export type SignUpDataT = {
  login: string;
  email: string;
  password: string;
}

type SignUpResponse = {
  message: string;
}


export const authApi = {
  signUp: async (signUpData: SignUpDataT) => {
    return await axios.post<null, AxiosResponse<SignUpResponse>, SignUpDataT>(`${settings.API_URL}/api/v1/auth/register`, signUpData)
  },

  // signIn: async (signInData: SignInDataT) => {
  //   return await axios.post<null, AxiosResponse<SignInResponse>, SignInDataT>(`${settings.API_URL}/api/v1/auth/login`, signInData)
  // }

  // me: async () => {
  //   return await axios.get(`${settings.API_URL}/api/v1/auth/me`)
  // }
}