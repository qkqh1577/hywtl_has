export type PasswordResetQuery = {
  email: string;
  authKey: string;
}

export type PasswordResetParameter = {
  email: string;
}

export type PasswordChangeParameter = {
  email: string;
  password: string;
  authKey: string;
}
