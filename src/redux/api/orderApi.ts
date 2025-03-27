import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  allOrderResponseType,
  getMyOrderType,
  MessageResponse,
  newOrderRequest,
  singleOrderResponseType,
  updateOrderResponseType,
} from "../../types/api-Types";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/orders/`,
  }),
  tagTypes: ["orders"],
  endpoints: (builder) => ({
    newOrder: builder.mutation<MessageResponse, newOrderRequest>({
      query: (order) => ({ url: "newOrder", method: "POST", body: order }),
      invalidatesTags: ["orders"],
    }),

    // http://localhost:8000/api/v1/orders/myOrder?id=1
    myOrders: builder.query<getMyOrderType, string>({
      query: (id) => ({ url: `myOrder?id=${id}` }),
      providesTags: ["orders"],
    }),

    // http://localhost:8000/api/v1/orders/allOrder
    allOrder: builder.query<allOrderResponseType, "">({
      query: () => ({ url: `allOrder` }),
      providesTags: ["orders"],
    }),
    // http://localhost:8000/api/v1/orders/67d7f422f48f0a3a55bcb79e
    singleOrder: builder.query<singleOrderResponseType, string>({
      query: (id) => ({ url: `${id}` }),
      providesTags: ["orders"],
    }),

    // http://localhost:8000/api/v1/orders/67c082d509e07c08af6915a4?id=15
    updateOrder: builder.mutation<updateOrderResponseType, string>({
      query: (id) => ({ url: `${id}`, method: "PUT" }),
      invalidatesTags: ["orders"],
    }),

    // http://localhost:8000/api/v1/orders/67c082d509e07c08af6915a4?id=15
    deleteOrder: builder.mutation<updateOrderResponseType, string>({
      query: (id) => ({ url: `${id}`, method: "DELETE" }),
      invalidatesTags: ["orders"],
    }),
  }),
});


export const {
  useNewOrderMutation,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
  useMyOrdersQuery,
  useAllOrderQuery,
  useSingleOrderQuery,
} = orderApi;
