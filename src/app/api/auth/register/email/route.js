import authApiRequest from "@/apiRequest/auth"
import { createApiResponse, serverHandleApiError } from "@/lib/api-response"

export async function POST(request) {
  try {
    const body = await request.json()
    const res = await authApiRequest.registerEmail(body)
    return createApiResponse(res)
  } catch (error) {
    return serverHandleApiError(error)
  }
}
