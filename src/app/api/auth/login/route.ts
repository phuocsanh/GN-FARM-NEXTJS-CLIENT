import authApiRequest from "@/apiRequest/auth"
import { LoginBodyType } from "@/schemaValidations/auth.schema"
import { cookies } from "next/headers"
import jwt from "jsonwebtoken"
import { createApiResponse, serverHandleApiError } from "@/lib/api-response"

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as LoginBodyType

    const res = await authApiRequest.sLogin(body)
    const cookieStore = await cookies()

    if (res.data?.tokens.accessToken && res.data?.tokens.refreshToken) {
      const { accessToken, refreshToken } = res.data.tokens
      const decodeAccessToken = jwt.decode(accessToken) as { exp: number }
      const decodeRefreshToken = jwt.decode(refreshToken) as { exp: number }

      cookieStore.set("accessToken", accessToken, {
        path: "/",
        httpOnly: true,
        sameSite: "lax",
        expires: decodeAccessToken.exp * 1000,
      })

      cookieStore.set("refreshToken", refreshToken, {
        path: "/",
        httpOnly: true,
        sameSite: "lax",
        expires: decodeRefreshToken.exp * 1000,
      })
    }

    return createApiResponse(res)
  } catch (error) {
    return serverHandleApiError(error)
  }
}
