export type ProductItem = {
  // Cấu trúc chính từ backend Go với snake_case
  id: number
  product_name: string
  product_price: string
  product_status?: number | null
  product_thumb: string
  product_pictures?: string[]
  product_videos?: string[]
  product_ratings_average?: string | null
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  product_variations?: any
  product_description?: string | null
  product_slug?: string | null
  product_quantity?: number | null
  product_type: number
  sub_product_type?: number[]
  discount?: string | null
  product_discounted_price: string
  product_selled?: number | null
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  product_attributes?: any
  is_draft?: boolean | null
  is_published?: boolean | null
  created_at: string
  updated_at: string
}

// Type cho tham số tìm kiếm sản phẩm
export interface ProductSearchParams {
  query?: string
  type?: number
  subType?: number
  minPrice?: number
  maxPrice?: number
  inStock?: boolean
  limit?: number
  offset?: number
  page?: number // Để tương thích ngược
}

// Type cho response danh sách sản phẩm
export interface ProductListResponse {
  products: ProductItem[]
  total?: number
  currentPage?: number
  totalPages?: number
}
