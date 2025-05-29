import { Suspense } from "react"
import Loading from "./loading"
import Img from "../components/Img"
import categoryApiRequest from "@/apiRequest/category"
import Categories from "./components/Categories"
import productApiRequest from "@/apiRequest/product"
import { ProductItem } from "@/models/product"
import { ResponseData } from "@/models/common"
import Link from "next/link"
import { convertCurrency } from "@/lib/utils"
import { IoMdStar } from "react-icons/io"

// Sử dụng trực tiếp các fields từ backend Go

// Component hiển thị danh sách sản phẩm theo loại
const ProductTypeSection = ({
  products,
  title,
  type,
}: {
  products: ProductItem[]
  title: string
  type: string
}) => {
  return (
    <div className='mb-10'>
      <div className='flex mt-6 flex-wrap justify-between sm:justify-start'>
        <h2 className='font-bold text-[25px] text-primary'>{title}</h2>
        <div className='w-8 h-8 ml-2'>
          <Img src={"/assets/leaf.png"} alt='leaf' />
        </div>
      </div>
      <div className='h-[1px] w-full bg-primary my-4'></div>

      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-6'>
        {products.map((product) => (
          <div
            key={product.id}
            className='w-full pb-2 bg-white flex flex-col items-center cursor-pointer shadow-md transition-transform duration-300 transform hover:scale-105'
          >
            <div className='w-full h-48 overflow-hidden shadow-sm'>
              <Img
                src={product.product_thumb || "/placeholder.png"}
                alt={product.product_name || "Sản phẩm"}
              />
            </div>
            <div className='flex flex-col flex-grow justify-between w-full'>
              <p className='mt-2 px-2 line-clamp-2 font-semibold text-center flex-grow'>
                {product.product_name || "Sản phẩm"}
              </p>
              <div>
                <div className='flex justify-between'>
                  <p className='mt-1 px-2 line-clamp-2 text-slate-400 italic text-sm'>
                    {product.product_attributes?.size || ""}
                  </p>
                  <p className='mt-1 flex px-2 line-clamp-2 text-slate-400 italic items-center text-sm'>
                    {product.product_ratings_average || "5.0"}
                    <IoMdStar className='ml-1 text-yellow-400' />
                  </p>
                </div>
                <p className='mt-2 px-2 text-primary font-semibold text-center'>
                  {convertCurrency(
                    parseFloat(product.product_discounted_price) ||
                      parseFloat(product.product_price) ||
                      0
                  )}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className='flex justify-center mt-6'>
        <Link
          href={`/products?type=${type}`}
          className='px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/80 transition-colors'
        >
          Xem thêm
        </Link>
      </div>
    </div>
  )
}

async function Page() {
  try {
    // Lấy danh sách ProductType từ backend (sử dụng API đúng)
    const categoriesResponse = await categoryApiRequest.getProductTypes()
    const categories = categoriesResponse?.data?.items || []
    console.log("categoriesResponse", categoriesResponse)
    // Lấy danh sách sản phẩm cho từng loại sử dụng ID
    const productPromises = categories.map((category) => {
      console.log("🚀 ~ Page ~ category:", category)
      return productApiRequest
        .listProducts({
          type: category.id, // Sử dụng ID thay vì name
          limit: 30,
          offset: 0,
        })
        .then((response) => ({
          ...response,
          data: response.data?.items || [], // Sử dụng items thay vì data.data
        }))
    })

    // Chờ tất cả các promise hoàn thành
    const productResults = await Promise.all(productPromises)
    console.log("🚀 ~ Page ~ productResults:", productResults)

    // Tạo một object chứa sản phẩm theo từng loại (sử dụng ID)
    const productsByType: Record<
      number,
      ResponseData<ProductItem[]> | undefined
    > = {}
    categories.forEach((category, index) => {
      productsByType[category.id] = productResults[index]
      console.log(
        `🚀 ~ Products for category ${category.name}:`,
        productsByType[category.id]
      )
    })

    return (
      <main className='mb-20 min-h-screen'>
        <div className='w-full h-44 sm:h-44 md:h-64 lg:h-96'>
          <Img
            src={
              "https://bizweb.dktcdn.net/100/485/131/themes/906771/assets/slider_1.jpg?1710378366461"
            }
            alt='Banner chính'
          />
        </div>

        <div className='container mx-auto px-4 py-8'>
          <Suspense fallback={<Loading />}>
            <Categories categories={categories || []} />

            {/* Hiển thị sản phẩm theo từng loại */}
            {categories?.map((category, index) => {
              const productData = productsByType[category.id]
              // Kiểm tra kỹ lưỡng cấu trúc dữ liệu trước khi truy cập
              if (
                !productData ||
                !productData.data ||
                !Array.isArray(productData.data) ||
                productData.data.length === 0
              ) {
                return null
              }

              return (
                <ProductTypeSection
                  key={category.id || index}
                  products={productData.data}
                  title={category.name || "Sản phẩm"}
                  type={category.id.toString()}
                />
              )
            })}
          </Suspense>

          {/* <Bonsai /> */}
        </div>
      </main>
    )
  } catch (error) {
    console.error("Error in Page component:", error)
    return (
      <main className='mb-20 min-h-screen flex items-center justify-center'>
        <div className='text-center'>
          <h1 className='text-2xl font-bold text-red-500 mb-4'>
            Đã xảy ra lỗi
          </h1>
          <p className='text-gray-600'>Vui lòng thử lại sau</p>
        </div>
      </main>
    )
  }
}

export default Page
