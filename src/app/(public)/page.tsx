// import { cookies } from "next/headers";

import categoryApiRequest from "@/apiRequest/category";
import Categories from "./components/Categories";
import ListProduct from "./ListProduct";
import productApiRequest from "@/apiRequest/product";
import { Suspense } from "react";
import Loading from "./loading";
import Img from "../components/Img";
import Bonsai from "./components/Bonsai";

async function Page({ searchParams }: { searchParams: { category?: string } }) {
  const { category } = searchParams;
  const categories = await categoryApiRequest.getAllCategories();
  console.log("🚀 ~ Page ~ categories:", categories);
  const res = await productApiRequest.findAllOrTypePublishProduct({
    product_type: category || "",
    limit: 30,
    page: 1,
  });
  return (
    <main className="mb-20 min-h-screen ">
      <div className="w-full h-44 sm:h-44 md:h-64 lg:h-96">
        <Img
          src={
            "https://bizweb.dktcdn.net/100/485/131/themes/906771/assets/slider_1.jpg?1710378366461"
          }
          alt="a"
        />
      </div>
      <Suspense fallback={<Loading />}>
        {/* <ListProduct data={res} /> */}
        <Categories categories={categories?.data || []} />
      </Suspense>
      <Bonsai />
    </main>
  );
}
export default Page;
