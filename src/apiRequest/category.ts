import http from "@/lib/http";
import { CategoryItem } from "@/models/category";
import { ResponseData } from "@/models/common";

const categoryApiRequest = {
  getAllCategories: () => {
    return http.get<ResponseData<CategoryItem[]>>(
      "api/v1/category/get-all-categories",
      {
        cache: "no-store",
      }
    );
  },
};

export default categoryApiRequest;
