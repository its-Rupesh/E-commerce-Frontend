import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ProductResponse } from "../../types/api-Types";

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
  }),
});

export const { useLatestProductsQuery, useAllProductsQuery } = productApi;
