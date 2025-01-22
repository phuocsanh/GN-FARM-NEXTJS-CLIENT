import { HttpError } from "@/lib/http";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  // Lấy refreshToken từ header
  const cookieStore = cookies();

  const refreshToken = cookieStore.get("refreshToken")?.value;

  if (!refreshToken) {
    return NextResponse.json(
      {
        message: "No refresh token",
        code: 500,
        data: null,
      },
      { status: 500 }
    );
  }

  try {
    // Gửi refreshToken trong header để lấy accessToken mới
    const response = await fetch(
      " http://localhost:8080/api/v1/access/handleRefreshToken",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${refreshToken}`, // Gửi refreshToken trong header
          "Content-Type": "application/json", // Optional nếu server yêu cầu JSON format
        },
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        {
          message: "An unexpected error occurred",
          code: 500,
          data: null,
        },
        { status: 500 }
      );
    }
    const responseData = await response.json();
    return Response.json(responseData);
  } catch (e) {
    if (e instanceof HttpError) {
      return NextResponse.json(
        {
          message: `HTTP Error: ${e.message}`,
          code: e.code,
          data: e.data,
        },
        { status: e.code }
      );
    }

    // Trường hợp lỗi khác
    return NextResponse.json(
      {
        message: "An unexpected error occurred",
        code: 500,
        data: null,
      },
      { status: 500 }
    );
  }
}
