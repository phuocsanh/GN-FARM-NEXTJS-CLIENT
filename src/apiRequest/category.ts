import http from "@/lib/http";
import { CategoryItem } from "@/models/category";
import { ResponseData } from "@/models/common";
import { headers } from "next/headers";

const categoryApiRequest = {
  getAllCategories: () => {
    return http.get<ResponseData<CategoryItem[]>>(
      "v1/api/category/getAllCategories",
      {
        cache: "no-store",
      }
    );
  },
};
export default categoryApiRequest;
