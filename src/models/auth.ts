export type VerifyOTPType = {
  token: string
  user_id: string
  message: string
}
export type UpdatePassType = {
  userId: number
}
export type UpdatePassBodyType = {
  userToken: string
  userPassword: string
}
