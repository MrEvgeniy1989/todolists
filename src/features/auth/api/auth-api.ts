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
  }
}