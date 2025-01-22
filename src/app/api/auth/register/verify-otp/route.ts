import authApiRequest from "@/apiRequest/auth";
import { HttpError } from "@/lib/http";
import { RegisterVerifyOTPType } from "@/schemaValidations/auth.schema";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = (await request.json()) as RegisterVerifyOTPType;
  try {
    const res = await authApiRequest.verifyOTP(body);

    return Response.json(res);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    if (e instanceof HttpError) {
      return NextResponse.json(
        {
          message: `${e.message}`,
          code: e.code,
          data: e.data,
        },
        {
          status: e.code,
          statusText: e.message,
        }
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
