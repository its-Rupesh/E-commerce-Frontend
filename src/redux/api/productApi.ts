import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  CategoryResponse,
  ProductResponse,
  SearchProductRequest,
  SearchProductResponse,
} from "../../types/api-Types";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/products/`,
  }),
  endpoints: (builder) => ({
    latestProducts: builder.query<ProductResponse, string>({
      query: () => "latest",
    }),
    allProducts: builder.query<ProductResponse, string>({
      query: (id) => `admin-products?id=${id}`,
    }),
    allcategories: builder.query<CategoryResponse, string>({
      query: () => `categorys`,
    }),
    searchProducts: builder.query<
      SearchProductResponse,
      Partial<SearchProductRequest>
    >({
      query: (data) => {
        let base = `search/?search=${data.search}&page=${data.page}`;

        if (data.price) base += `&price=${data.price}`;
        if (data.sort) base += `&sort=${data.sort}`;
        if (data.category) base += `&category=${data.category}`;

        return base;
      },
    }),
  }),
});

export const {
  useLatestProductsQuery,
  useAllProductsQuery,
  useAllcategoriesQuery,
  useSearchProductsQuery,
} = productApi;
