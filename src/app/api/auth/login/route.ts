import authApiRequest from "@/apiRequest/auth";
import { LoginBodyType } from "@/schemaValidations/auth.schema";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { HttpError } from "@/lib/http";
import { NextResponse } from "next/server";
export async function POST(request: Request) {
  const body = (await request.json()) as LoginBodyType;
  const cookieStore = cookies();
  try {
    const res = await authApiRequest.sLogin(body);
    if (res.data?.tokens.accessToken && res.data?.tokens.refreshToken) {
      const { accessToken, refreshToken } = res.data.tokens;
      const decodeAccessToken = jwt.decode(accessToken) as { exp: number };
      const decodeRefreshToken = jwt.decode(refreshToken) as { exp: number };
      cookieStore.set("accessToken", accessToken, {
        path: "/",
        httpOnly: true,
        sameSite: "lax",
        expires: decodeAccessToken.exp * 1000,
      });
      cookieStore.set("refreshToken", refreshToken, {
        path: "/",
        httpOnly: true,
        sameSite: "lax",
        expires: decodeRefreshToken.exp * 1000,
      });
    }

    return Response.json(res);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    console.log("🚀 ~ POST ~ e:", e);
    if (e instanceof HttpError) {
      return NextResponse.json(
        {
          message: ` ${e.message}`,
          code: e.code,
          data: e.data,
        },
        { status: e.code, statusText: e.message }
      );
    }

    // Trường hợp lỗi khác
    return NextResponse.json(
      {
        message: "An unexpected error occurred",
        code: 500,
        data: null,
      },
      { status: 500, statusText: "An unexpected error occurred" }
    );
  }
}
