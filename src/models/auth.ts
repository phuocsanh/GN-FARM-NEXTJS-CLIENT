export type VerifyOTPType = {
  token: string
  userId: string
  message: string
}

export type UpdatePassType = {
  userId: number
}

export type UpdatePassBodyType = {
  userToken: string
  userPassword: string
}
