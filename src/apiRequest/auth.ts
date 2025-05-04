import http from "@/lib/http"
import {
  UpdatePassBodyType,
  UpdatePassType,
  VerifyOTPType,
} from "@/models/auth"
import { ResponseData } from "@/models/common"
import {
  LoginBodyType,
  LoginResType,
  RegisterEmailType,
  RegisterVerifyOTPType,
} from "@/schemaValidations/auth.schema"

const authApiRequest = {
  sLogin: (body: LoginBodyType) => {
    console.log("🚀 ~ body:", body)
    return http.post<ResponseData<LoginResType>>("user/login", body)
  },

  registerEmail: (body: RegisterEmailType) => {
    console.log("Registering email with body:", body)
    // Thử endpoint khác nếu user/register không tồn tại
    return http.post<ResponseData<null>>("user/register", body)
  },
  verifyOTP: (body: RegisterVerifyOTPType) => {
    console.log("Verifying OTP with body:", body)
    // Thử endpoint khác nếu user/verify-otp không tồn tại
    return http.post<ResponseData<VerifyOTPType>>("user/verify-otp", body)
  },
  updatePassRegister: (body: UpdatePassBodyType) => {
    return http.post<ResponseData<UpdatePassType>>(
      "user/update-pass-register",
      body
    )
  },
  logout: (accessToken: string) => {
    return http.post<ResponseData<{ success: boolean }>>(
      "user/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
  },
}
export default authApiRequest
