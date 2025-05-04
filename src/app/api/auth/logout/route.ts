import { cookies } from "next/headers"
import { createApiResponse, serverHandleApiError } from "@/lib/api-response"
import authApiRequest from "@/apiRequest/auth"

export async function POST(request: Request) {
  try {
    const cookieStore = cookies()
    const accessToken = cookieStore.get("accessToken")?.value

    // Gọi API logout từ server nếu có accessToken
    if (accessToken) {
      try {
        await authApiRequest.logout(accessToken)
      } catch (error) {
        console.error("Error calling logout API:", error)
        // Tiếp tục xử lý ngay cả khi API logout thất bại
      }
    }

    // Xóa cookies bất kể API logout thành công hay thất bại
    cookieStore.delete("accessToken")
    cookieStore.delete("refreshToken")

    return createApiResponse({
      code: 200,
      message: "Logged out successfully",
      data: { success: true }
    })
  } catch (error) {
    return serverHandleApiError(error)
  }
}
