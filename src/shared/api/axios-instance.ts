import { authApi } from "@/features/auth/api/auth-api"
import axios, { AxiosError, CreateAxiosDefaults } from "axios"
import { settings } from "../settings"
import { errorCatch, ErrorResponse } from "../utils/error-catch"

const options: CreateAxiosDefaults = {
  // baseURL: "http://localhost:5000",
  baseURL: settings.API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
}

export const axiosNotAuthorized = axios.create(options) // axios без авторизации
export const axiosWithAuth = axios.create(options) // axios с авторизацией

axiosWithAuth.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken")
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

axiosWithAuth.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (error?.response?.status === 401 && originalRequest && !originalRequest._retry) {
      originalRequest._retry = true
      try {
        const response = await authApi.getNewTokens()

        if (response.data && response.data.accessToken) {
          localStorage.setItem("accessToken", response.data.accessToken)

          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`
          }

          return axiosWithAuth(originalRequest)
        } else {
          throw new Error("No new accessToken in the response")
        }
      } catch (refreshError: unknown) {
        if (
          errorCatch(refreshError as AxiosError<ErrorResponse>) ===
          "Invalid or expired refresh token."
        ) {
          localStorage.removeItem("accessToken")
          window.location.href = "/auth/sign-in"
          return Promise.reject(refreshError)
        }
      }
    }
    return Promise.reject(error)
  },
)
