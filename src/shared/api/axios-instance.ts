import { authApi } from "@/features/auth/api/auth-api"
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, CreateAxiosDefaults } from "axios"
import toast from "react-hot-toast"
import { settings } from "../settings"

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

let isRefreshing = false
let refreshSubscribers: ((token: string) => void)[] = []

// Функция для обработки очереди запросов, ожидающих новый токен
const processQueue = (newAccessToken: string) => {
  refreshSubscribers.forEach((callback) => callback(newAccessToken))
  refreshSubscribers = []
}

// Функция для сброса авторизации
const resetAuth = () => {
  localStorage.removeItem("accessToken")
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("auth:logout"))
  }
}

axiosWithAuth.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    // Если запрос не был выполнен (например, нет соединения с сервером)
    if (!error.response) {
      toast.error("Нет соединения с сервером. Проверьте подключение к интернету.")
      return Promise.reject(error)
    }

    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean }

    if (originalRequest?.url?.includes("/auth/refresh") && error?.response?.status === 401) {
      // Если ошибка при обновлении токена, значит refresh token истек или недействителен
      toast.error("Срок действия сессии истек. Пожалуйста, выполните повторный вход.")
      resetAuth()
      return Promise.reject(error)
    }

    // Проверяем, что ошибка 401 и запрос еще не повторялся
    if (error?.response?.status === 401 && originalRequest && !originalRequest._retry) {
      // Если уже идет обновление токена, добавляем запрос в очередь
      if (isRefreshing) {
        return new Promise<AxiosResponse>((resolve) => {
          refreshSubscribers.push((newAccessToken) => {
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
            }
            resolve(axiosWithAuth(originalRequest))
          })
        })
      }

      // Помечаем запрос как повторяющийся и начинаем обновление токена
      originalRequest._retry = true
      isRefreshing = true

      try {
        const response = await authApi.getNewTokens()
        const newAccessToken = response.data.accessToken

        if (newAccessToken) {
          localStorage.setItem("accessToken", newAccessToken)
          axiosWithAuth.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`

          // Обрабатываем очередь запросов
          processQueue(newAccessToken)

          // Повторяем исходный запрос с новым токеном
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
          }
          return axiosWithAuth(originalRequest)
        } else {
          throw new Error("Не получен новый токен доступа")
        }
      } catch (refreshError) {
        console.error(`Ошибка обновления токена: ${(refreshError as Error).message}`)
        resetAuth()
        return Promise.reject(refreshError)
      } finally {
        isRefreshing = false
      }
    }

    // Обработка других ошибок
    if (error.response.status === 403) {
      toast.error("У вас нет доступа к этому ресурсу")
    } else if (error.response.status === 404) {
      toast.error("Запрашиваемый ресурс не найден")
    } else if (error.response.status >= 500) {
      toast.error("Ошибка сервера. Пожалуйста, попробуйте позже.")
    }

    // Для других ошибок просто отклоняем промис
    return Promise.reject(error)
  },
)
