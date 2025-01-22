import authApiRequest from "@/apiRequest/auth";
import { HttpError } from "@/lib/http";
import { UpdatePassBodyType } from "@/models/auth";
import { RegisterPasswordType } from "@/schemaValidations/auth.schema";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = (await request.json()) as UpdatePassBodyType;
  try {
    const res = await authApiRequest.updatePassRegister(body);

    return Response.json(res);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    // Kiểm tra lỗi kiểu HttpError
    if (e instanceof HttpError) {
      return NextResponse.json(
        {
          message: `HTTP Error: ${e.message}`,
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
