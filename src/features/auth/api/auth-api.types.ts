export type SignUpDataT = {
  login: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type ApiResponse = {
  message: string;
};

export type SignInResponse = {
  accessToken: string;
};