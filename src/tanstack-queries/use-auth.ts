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
import { useAppStore } from "@/stores"
import { useApiMutation, useApiQuery } from "@/hooks/use-api"

// Mutations
export const useLoginMutation = () =>
  useApiMutation<ResponseData<LoginResType>, LoginBodyType>("/api/auth/login", {
    onSuccessCallback: (res) => {
      if (res.code === 200 && res?.data?.tokens.accessToken) {
        useAppStore.setState({ isLogin: true })
      }
    },
  })

export const useLogoutMutation = () =>
  useApiMutation<ResponseData<{ success: boolean }>, void>("/api/auth/logout", {
    onSuccessCallback: () => {
      useAppStore.setState({ isLogin: false })
      // Chuyển hướng về trang login sau khi đăng xuất
      window.location.href = "/login"
    },
  })

export const useRegisterEmailMutation = () =>
  useApiMutation<ResponseData<null>, RegisterEmailType>(
    "/api/auth/register/email"
  )

export const useVerifyOTPMutation = () =>
  useApiMutation<ResponseData<VerifyOTPType>, RegisterVerifyOTPType>(
    "/api/auth/register/verify-otp"
  )

export const useUpdatePassRegisterMutation = () =>
  useApiMutation<ResponseData<UpdatePassType>, UpdatePassBodyType>(
    "/api/auth/register/update-pass"
  )

// Queries
export const useRefreshTokenQuery = () =>
  useApiQuery<ResponseData<{ accessToken: string }>>(
    "/api/auth/get-access-token-by-refresh-token",
    {
      queryKey: ["refreshToken"],
      credentials: "include",
      enabled: true,
    }
  )
