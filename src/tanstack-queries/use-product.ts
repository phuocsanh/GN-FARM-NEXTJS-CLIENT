import { useQuery, useInfiniteQuery } from "@tanstack/react-query"
import productApiRequest, { ListProductsParams } from "@/apiRequest/product"
import type { ProductItem } from "@/models/product"

// Hook để lấy danh sách sản phẩm với phân trang
export const useProductsQuery = (params: ListProductsParams) => {
  return useQuery({
    queryKey: ["products", params],
    queryFn: async () => {
      const response = await productApiRequest.listProducts(params)
      return {
        ...response,
        data: response.data?.items || []
      }
    },
    staleTime: 5 * 60 * 1000, // 5 phút
  })
}

// Hook để lấy danh sách sản phẩm theo loại (tương thích ngược)
export const useProductsByTypeQuery = (productType: string, limit = 30) => {
  return useQuery({
    queryKey: ["products", "type", productType, limit],
    queryFn: () => productApiRequest.findAllOrTypePublishProduct({
      product_type: productType,
      page: 1,
      limit,
    }),
    staleTime: 5 * 60 * 1000,
  })
}

// Hook để lấy danh sách sản phẩm với infinite scroll
export const useInfiniteProductsQuery = (params: Omit<ListProductsParams, 'offset'>) => {
  return useInfiniteQuery({
    queryKey: ["products", "infinite", params],
    queryFn: async ({ pageParam }: { pageParam: number }) => {
      const response = await productApiRequest.listProducts({
        ...params,
        offset: pageParam,
      })
      return {
        ...response,
        data: response.data?.items || []
      }
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage: { data: ProductItem[] }, allPages: unknown[]) => {
      const limit = params.limit || 30
      const currentOffset = allPages.length * limit
      
      // Nếu trang cuối không có items hoặc ít hơn limit items, không có trang tiếp theo
      if (!lastPage.data || lastPage.data.length < limit) {
        return undefined
      }
      
      return currentOffset
    },
    staleTime: 5 * 60 * 1000,
  })
}

// Hook để tìm kiếm sản phẩm
export const useSearchProductsQuery = (params: {
  query: string
  limit?: number
  offset?: number
}) => {
  return useQuery({
    queryKey: ["products", "search", params],
    queryFn: async () => {
      const response = await productApiRequest.searchProducts(params)
      return {
        ...response,
        data: response.data?.items || []
      }
    },
    enabled: !!params.query && params.query.length > 0,
    staleTime: 2 * 60 * 1000, // 2 phút
  })
}

// Hook để lọc sản phẩm
export const useFilterProductsQuery = (params: {
  minPrice?: number
  maxPrice?: number
  inStock?: boolean
  limit?: number
  offset?: number
}) => {
  return useQuery({
    queryKey: ["products", "filter", params],
    queryFn: async () => {
      const response = await productApiRequest.filterProducts(params)
      return {
        ...response,
        data: response.data?.items || []
      }
    },
    staleTime: 5 * 60 * 1000,
  })
}

// Hook để lấy thông tin một sản phẩm
export const useProductQuery = (id: number) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const response = await productApiRequest.getProduct(id)
      return {
        ...response,
        data: response.data?.item
      }
    },
    enabled: !!id,
    staleTime: 10 * 60 * 1000, // 10 phút
  })
}

// Hook để lấy sản phẩm theo nhiều loại (cho trang chủ)
export const useProductsByMultipleTypesQuery = (productTypes: number[], limit = 30) => {
  return useQuery({
    queryKey: ["products", "multipleTypes", productTypes, limit],
    queryFn: async () => {
      const promises = productTypes.map(type => 
        productApiRequest.listProducts({
          type,
          limit,
          offset: 0,
        })
      )
      
      const results = await Promise.all(promises)
      
      // Trả về object với key là productType và value là danh sách sản phẩm
      return productTypes.reduce<Record<number, { data: ProductItem[] }>>((acc, type, index) => {
        const result = results[index]
        if (result) {
          acc[type] = {
            ...result,
            data: result.data?.items || []
          }
        }
        return acc
      }, {})
    },
    staleTime: 5 * 60 * 1000,
  })
}
