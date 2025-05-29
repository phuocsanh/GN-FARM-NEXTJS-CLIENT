import http from "@/lib/http"
import { CategoryItem, ProductType, ProductSubtype } from "@/models/category"
import { ResponseData, ResponseDataWithItems } from "@/models/common"

const categoryApiRequest = {
  // API cũ để tương thích ngược
  getAllCategories: () => {
    return http.get<ResponseData<CategoryItem[]>>("product/type", {
      cache: "no-store",
    })
  },

  // API mới để lấy danh sách ProductType
  getProductTypes: () => {
    return http.get<ResponseDataWithItems<ProductType>>("product/type", {
      cache: "no-store",
    })
  },

  // Lấy thông tin một ProductType
  getProductType: (id: number) => {
    return http.get<ResponseData<ProductType>>(`product/type/${id}`)
  },

  // Lấy danh sách ProductSubtype
  getProductSubtypes: () => {
    return http.get<ResponseData<ProductSubtype[]>>("product/subtype")
  },

  // Lấy danh sách ProductSubtype theo ProductType
  getProductSubtypesByType: (typeId: number) => {
    return http.get<ResponseData<ProductSubtype[]>>(
      `product/type/${typeId}/subtypes`
    )
  },

  // Tạo ProductType mới
  createProductType: (data: { name: string; description?: string }) => {
    return http.post<ResponseData<ProductType>>("product/type", data)
  },

  // Cập nhật ProductType
  updateProductType: (
    id: number,
    data: { name: string; description?: string }
  ) => {
    return http.put<ResponseData<ProductType>>(`product/type/${id}`, data)
  },

  // Xóa ProductType
  deleteProductType: (id: number) => {
    return http.delete<ResponseData<null>>(`product/type/${id}`)
  },
}

export default categoryApiRequest
