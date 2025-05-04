import { useMutation, useQuery } from "@tanstack/react-query"
import { handleErrorApi } from "@/lib/utils"

type HttpMethod = "POST" | "PUT" | "PATCH" | "DELETE"

interface ApiQueryOptions<TData> {
  queryKey: string[]
  customQueryFn?: () => Promise<TData>
  headers?: Record<string, string>
  credentials?: RequestCredentials
  enabled?: boolean
  onError?: (error: Error) => void
}

interface ApiMutationOptions<TData, TVariables> {
  method?: HttpMethod
  customMutationFn?: (data: TVariables) => Promise<TData>
  onSuccessCallback?: (data: TData) => void
  headers?: Record<string, string>
  isFormData?: boolean
  credentials?: RequestCredentials
}

// Hook cho GET requests
export const useApiQuery = <TData>(
  endpoint: string,
  options: ApiQueryOptions<TData>
) => {
  const {
    queryKey,
    customQueryFn,
    headers: customHeaders,
    credentials,
    enabled = true,
    onError,
  } = options

  return useQuery<TData, Error>({
    queryKey: [
      ...queryKey,
      endpoint,
      customHeaders,
      credentials,
      customQueryFn,
    ],
    queryFn: async () => {
      try {
        if (customQueryFn) {
          return customQueryFn()
        }

        const config: RequestInit = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            ...customHeaders,
          },
          credentials,
        }

        const response = await fetch(endpoint, config)
        const result = await response.json()

        if (!response.ok) {
          throw { response: { data: result, message: result.message } }
        }

        return result as TData
      } catch (error) {
        onError?.(error as Error)
        throw error
      }
    },
    enabled,
    retry: 1,
    gcTime: 0,
  })
}

// Hook cho các methods khác (POST, PUT, PATCH, DELETE)
export const useApiMutation = <TData, TVariables>(
  endpoint: string,
  options?: ApiMutationOptions<TData, TVariables>
) => {
  const {
    method = "POST",
    customMutationFn,
    onSuccessCallback,
    headers: customHeaders,
    isFormData = false,
    credentials,
  } = options || {}

  return useMutation<TData, Error, TVariables>({
    mutationFn: async (data) => {
      if (customMutationFn) {
        return customMutationFn(data)
      }

      const headers: Record<string, string> = {
        ...(!isFormData && { "Content-Type": "application/json" }),
        ...customHeaders,
      }

      const config: RequestInit = {
        method,
        headers,
        credentials,
        ...(!isFormData && { body: JSON.stringify(data) }),
        ...(isFormData && { body: data as unknown as FormData }),
      }

      const response = await fetch(endpoint, config)
      console.log("🚀 ~ mutationFn: ~ response:", response)

      const result = await response.json()
      console.log("🚀 ~ mutationFn: ~ result:", result)

      if (!response.ok) {
        throw { response: { data: result, message: result.message } }
      }

      return result
    },
    onSuccess: (data) => {
      onSuccessCallback?.(data)
    },
    onError: (error) => {
      handleErrorApi({ error })
    },
  })
}
