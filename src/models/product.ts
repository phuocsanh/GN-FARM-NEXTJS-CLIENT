export type ProductItem = {
  // Cấu trúc chính từ backend Go với camelCase
  id: number
  productName: string
  productPrice: string
  productStatus?: number | null
  productThumb: string
  productPictures?: string[]
  productVideos?: string[]
  productRatingsAverage?: string | null
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  productVariations?: any
  productDescription?: string | null
  productSlug?: string | null
  productQuantity?: number | null
  productType: number
  subProductType?: number[]
  discount?: string | null
  productDiscountedPrice: string
  productSelled?: number | null
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  productAttributes?: any
  isDraft?: boolean | null
  isPublished?: boolean | null
  createdAt: string
  updatedAt: string
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
