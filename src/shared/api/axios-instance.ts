import axios, { CreateAxiosDefaults } from "axios";
import { settings } from '../settings'

const options: CreateAxiosDefaults = {
  baseURL: settings.API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
};

export const axiosNotAuthorized = axios.create(options) // axios без авторизации
export const axiosWithAuth = axios.create(options) // axios с авторизацией

axiosWithAuth.interceptors.request.use(config => {
  const accessToken = localStorage.getItem("accessToken")

  if (config.headers && accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }

  return config
})
