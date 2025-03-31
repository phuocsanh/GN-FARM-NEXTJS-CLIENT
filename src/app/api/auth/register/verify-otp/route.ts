import authApiRequest from "@/apiRequest/auth";
import { RegisterVerifyOTPType } from "@/schemaValidations/auth.schema";
import { createApiResponse, handleApiError } from "@/lib/api-response";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as RegisterVerifyOTPType;
    const res = await authApiRequest.verifyOTP(body);
    return createApiResponse(res);
  } catch (error) {
    return handleApiError(error);
  }
}
