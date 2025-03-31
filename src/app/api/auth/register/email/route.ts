import authApiRequest from "@/apiRequest/auth";
import { RegisterEmailType } from "@/schemaValidations/auth.schema";
import { createApiResponse, handleApiError } from "@/lib/api-response";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as RegisterEmailType;
    const res = await authApiRequest.registerEmail(body);
    return createApiResponse(res);
  } catch (error) {
    return handleApiError(error);
  }
}
