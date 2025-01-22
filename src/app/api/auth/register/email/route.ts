import authApiRequest from "@/apiRequest/auth";
import { HttpError } from "@/lib/http";
import { RegisterEmailType } from "@/schemaValidations/auth.schema";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = (await request.json()) as RegisterEmailType;
  try {
    const res = await authApiRequest.registerEmail(body);
    console.log("🚀 ~ POST ~ res:", res);

    return Response.json(res);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    console.log("🚀 ~ POST ~ e:", e);
    // Kiểm tra lỗi kiểu HttpError
    if (e instanceof HttpError) {
      let a = NextResponse.json(
        {
          message: `${e.message}`,
          code: e.code,
          data: e.data,
        },
        { status: e.code, statusText: e.message }
      );
      return a;
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
