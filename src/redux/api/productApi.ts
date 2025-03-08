import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  CategoryResponse,
  deleteProductRequest,
  deleteProductResponse,
  MessageResponse,
  newProductRequest,
  ProductResponse,
  SearchProductRequest,
  SearchProductResponse,
  singleProductResponse,
  updateProductRequest,
  updateProductResponse,
} from "../../types/api-Types";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/products/`,
  }),
  tagTypes: [
    "lastestProduct",
    "allProducts",
    "allcategories",
    "productsDetails",
  ],
  endpoints: (builder) => ({
    latestProducts: builder.query<ProductResponse, string>({
      query: () => "latest",
      providesTags: ["lastestProduct"],
    }),
    allProducts: builder.query<ProductResponse, string>({
      query: (id) => `admin-products?id=${id}`,
      providesTags: ["allProducts"],
    }),
    allcategories: builder.query<CategoryResponse, string>({
      query: () => `categorys`,
      providesTags: ["allcategories"],
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
    productsDetails: builder.query<singleProductResponse, string>({
      query: (id) => `${id}`,
      providesTags: ["productsDetails"],
      // invalidatesTags:["lastestProduct"]
    }),
    createProduct: builder.mutation<MessageResponse, newProductRequest>({
      query: ({ formData, id }) => ({
        url: `new?id=${id}`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["allProducts", "allcategories", "lastestProduct"],
    }),
    updateProduct: builder.mutation<
      updateProductResponse,
      updateProductRequest
    >({
      query: ({ formData, id, productId }) => ({
        url: `${productId}?id=${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: [
        "lastestProduct",
        "allProducts",
        "allcategories",
        "productsDetails",
      ],
    }),
    deleteProduct: builder.mutation<
      deleteProductResponse,
      deleteProductRequest
    >({
      query: ({ id, productId }) => ({
        url: `${productId}?id=${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [
        "lastestProduct",
        "allProducts",
        "allcategories",
        "productsDetails",
      ],
    }),
  }),
});

export const {
  useLatestProductsQuery,
  useAllProductsQuery,
  useAllcategoriesQuery,
  useSearchProductsQuery,
  useCreateProductMutation,
  useProductsDetailsQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
