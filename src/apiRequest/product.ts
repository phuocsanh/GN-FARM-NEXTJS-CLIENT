import http from "@/lib/http";
import { PagingResponseData } from "@/models/common";
import { ProductItem } from "@/models/product";

const productApiRequest = {
  findAllOrTypePublishProduct: ({
    product_type,
    page,
    limit,
  }: {
    product_type: string;
    page: number;
    limit: number;
  }) => {
    return http.get<PagingResponseData<ProductItem>>(
      `v1/api/product/find-all-or-type-publish-product?product_type=${product_type}&page=${page}&limit=${limit}`
    );
  },
};
export default productApiRequest;
