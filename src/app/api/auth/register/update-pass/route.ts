import authApiRequest from "@/apiRequest/auth";
import { UpdatePassBodyType } from "@/models/auth";
import { createApiResponse, handleApiError } from "@/lib/api-response";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as UpdatePassBodyType;
    const res = await authApiRequest.updatePassRegister(body);
    return createApiResponse(res);
  } catch (error) {
    return handleApiError(error);
  }
}
