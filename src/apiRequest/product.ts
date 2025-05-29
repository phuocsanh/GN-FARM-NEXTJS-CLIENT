import http from "@/lib/http"
import { PagingResponseData } from "@/models/common"
import { ProductItem } from "@/models/product"

// Interface cho các tham số API sản phẩm
export interface ListProductsParams {
  limit?: number
  offset?: number
  type?: number // product_type as int32
  subType?: number // sub_product_type as int32
}

export interface FindProductsByTypeParams {
  product_type: string // Tên loại sản phẩm (string) - để tương thích ngược
  page: number
  limit: number
}

const productApiRequest = {
  // Hàm lấy danh sách sản phẩm với cấu trúc response mới
  listProducts: (params: ListProductsParams) => {
    const queryParams = new URLSearchParams()

    if (params.limit !== undefined) {
      queryParams.append("limit", params.limit.toString())
    }
    if (params.offset !== undefined) {
      queryParams.append("offset", params.offset.toString())
    }
    if (params.type !== undefined) {
      queryParams.append("type", params.type.toString())
    }
    if (params.subType !== undefined) {
      queryParams.append("subType", params.subType.toString())
    }

    console.log("Product API Request params:", params)
    console.log("Product API Request URL:", `product?${queryParams.toString()}`)

    return http.get<{
      code: number
      message: string
      data: {
        items: ProductItem[]
        pagination?: {
          total: number
          page: number
          page_size: number
          total_pages: number
        }
      }
    }>(`product?${queryParams.toString()}`)
  },

  // Hàm cũ để tương thích ngược (sẽ chuyển đổi string type thành int type)
  findAllOrTypePublishProduct: ({
    product_type,
    page,
    limit,
  }: FindProductsByTypeParams) => {
    // Sử dụng tham số type thay vì category và offset thay vì page theo cấu trúc backend
    return http.get<PagingResponseData<ProductItem>>(
      `product?type=${product_type || ""}&limit=${limit}&offset=${
        (page - 1) * limit
      }`
    )
  },

  // Hàm tìm kiếm sản phẩm
  searchProducts: ({
    query,
    limit = 10,
    offset = 0,
  }: {
    query: string
    limit?: number
    offset?: number
  }) => {
    return http.get<{
      code: number
      message: string
      data: {
        items: ProductItem[]
        pagination?: {
          total: number
          page: number
          page_size: number
          total_pages: number
        }
      }
    }>(
      `product/search?query=${encodeURIComponent(
        query
      )}&limit=${limit}&offset=${offset}`
    )
  },

  // Hàm lọc sản phẩm
  filterProducts: (params: {
    minPrice?: number
    maxPrice?: number
    inStock?: boolean
    limit?: number
    offset?: number
  }) => {
    const queryParams = new URLSearchParams()

    if (params.minPrice !== undefined) {
      queryParams.append("minPrice", params.minPrice.toString())
    }
    if (params.maxPrice !== undefined) {
      queryParams.append("maxPrice", params.maxPrice.toString())
    }
    if (params.inStock !== undefined) {
      queryParams.append("inStock", params.inStock.toString())
    }
    if (params.limit !== undefined) {
      queryParams.append("limit", params.limit.toString())
    }
    if (params.offset !== undefined) {
      queryParams.append("offset", params.offset.toString())
    }

    return http.get<{
      code: number
      message: string
      data: {
        items: ProductItem[]
        pagination?: {
          total: number
          page: number
          page_size: number
          total_pages: number
        }
      }
    }>(`product/filter?${queryParams.toString()}`)
  },

  // Lấy thông tin một sản phẩm
  getProduct: (id: number) => {
    return http.get<{
      code: number
      message: string
      data: {
        item: ProductItem
      }
    }>(`product/${id}`)
  },
}

export default productApiRequest
