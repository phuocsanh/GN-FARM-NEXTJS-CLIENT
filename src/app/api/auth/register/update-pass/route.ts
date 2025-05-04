import authApiRequest from "@/apiRequest/auth"
import { UpdatePassBodyType } from "@/models/auth"
import { createApiResponse, serverHandleApiError } from "@/lib/api-response"

export async function POST(request: Request) {
  console.log("🚀 ~ POST ~ request:", request)
  try {
    const body = (await request.json()) as UpdatePassBodyType
    const res = await authApiRequest.updatePassRegister(body)
    return createApiResponse(res)
  } catch (error) {
    return serverHandleApiError(error)
  }
}
