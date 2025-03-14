export type RegisterFormValuesT = {
  login: string
  email: string
  password: string
  confirmPassword: string
}

export type BaseResponse = {
  message: string
}

export type ResponseWithAccessToken = {
  accessToken: string
}
