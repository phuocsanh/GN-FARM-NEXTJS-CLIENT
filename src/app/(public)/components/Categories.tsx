"use client"
import React from "react"
import Img from "@/app/components/Img"
import { ProductType } from "@/models/category"
import { useRouter } from "next/navigation"

function Categories({ categories }: { categories: ProductType[] }) {
  const router = useRouter()

  const handleCategoryClick = (categoryId: number, categoryName?: string) => {
    // Sử dụng ID cho URL mới, fallback về name cho tương thích ngược
    const param =
      typeof categoryId === "number"
        ? categoryId.toString()
        : categoryName || categoryId
    router.push(`?category=${param}`)
  }

  return (
    <section className='py-2 md:py-4 lg:py-7 w-full items-center'>
      <div className='flex mt-6 flex-wrap justify-between sm:justify-start'>
        <h1 className='font-bold text-[25px] text-primary'>Danh mục nổi bật</h1>
        <div className='w-8 h-8 ml-2'>
          <Img src={"/assets/leaf.png"} alt='leaf' />
        </div>
      </div>

      <div className='h-[1px] w-full bg-primary my-4'></div>

      <div className='overflow-x-auto w-full py-2 '>
        <div className='flex space-x-5 justify-center min-w-max'>
          {categories.length > 0 &&
            categories.map((category) => {
              // Xử lý cả cấu trúc cũ và mới
              const categoryId = category.id
              const categoryName = category.name
              const categoryTitle = category.name
              const categoryPicture =
                (category as ProductType).image_url || "/placeholder.png"

              return (
                <div
                  onClick={() => {
                    handleCategoryClick(categoryId!, categoryName)
                  }}
                  key={categoryId}
                  className='border-[0.5px] px-8 py-4 rounded-sm border-primary flex flex-col items-center cursor-pointer transition-transform duration-300 transform hover:scale-105'
                >
                  <div className='w-10 h-10 sm:w-10 sm:h-10 md:w-32 md:h-32 lg:w-40 lg:h-40 rounded-full overflow-hidden'>
                    <Img
                      src={categoryPicture}
                      alt={`category${categoryId}.png`}
                    />
                  </div>
                  <p className='mt-2 text-center font-semibold text-primary text-lg sm:text-base md:text-lg lg:text-xl'>
                    {categoryTitle}
                  </p>
                </div>
              )
            })}
        </div>
      </div>
    </section>
  )
}

export default Categories
