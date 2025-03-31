import { cookies } from "next/headers";
import { createApiResponse, handleApiError } from "@/lib/api-response";
import envConfig from "@/config";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const cookieStore = cookies();
    const refreshToken = cookieStore.get("refreshToken")?.value;

    if (!refreshToken) {
      return NextResponse.json(
        {
          message: "No refresh token",
          code: 401,
          data: null,
        },
        { status: 401 }
      );
    }

    const response = await fetch(
      `${envConfig.NEXT_PUBLIC_API_ENDPOINT}/api/v1/access/handleRefreshToken`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${refreshToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        {
          message: "Invalid refresh token",
          code: 401,
          data: null,
        },
        { status: 401 }
      );
    }

    const responseData = await response.json();
    
    // Update cookies with new tokens
    if (responseData.data?.tokens.accessToken && responseData.data?.tokens.refreshToken) {
      const { accessToken, refreshToken: newRefreshToken } = responseData.data.tokens;
      const decodeAccessToken = jwt.decode(accessToken) as { exp: number };
      const decodeRefreshToken = jwt.decode(newRefreshToken) as { exp: number };

      cookieStore.set("accessToken", accessToken, {
        path: "/",
        httpOnly: true,
        sameSite: "lax",
        expires: decodeAccessToken.exp * 1000,
      });

      cookieStore.set("refreshToken", newRefreshToken, {
        path: "/",
        httpOnly: true,
        sameSite: "lax",
        expires: decodeRefreshToken.exp * 1000,
      });
    }

    return createApiResponse(responseData);
  } catch (error) {
    return handleApiError(error);
  }
}
