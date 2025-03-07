import { AxiosError } from "axios"

export type ErrorResponse = {
  message: string | string[]
}

/** обработка серверных ошибок */
export const errorCatch = (error: AxiosError<ErrorResponse>): string =>
  error.response && error.response.data
    ? typeof error.response.data.message === "object"
      ? error.response.data.message[0]
      : error.response.data.message
    : error.message
