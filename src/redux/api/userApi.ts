import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  allUserResponse,
  MessageResponse,
  UserResponse,
} from "../../types/api-Types";
import { User } from "../../types/types";
import axios from "axios";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/user/`,
  }),
  tagTypes: ["allUser"],
  endpoints: (builder) => ({
    login: builder.mutation<MessageResponse, User>({
      query: (user) => ({ url: "new", method: "POST", body: user }),
    }),

    //http://localhost:8000/api/v1/user/allUser?id=15
    allUser: builder.query<allUserResponse, string>({
      query: (id) => ({ url: `allUser?id=${id}` }),
      providesTags: ["allUser"],
    }),

    //http://localhost:8000/api/v1/user/1?id=15
    deleteUser: builder.mutation<MessageResponse, { id: string; _id: string }>({
      query: ({ id, _id }) => ({ url: `${id}?id=${_id}`, method: "DELETE" }),
      invalidatesTags: ["allUser"],
    }),
  }),
});
//http://localhost:8000/api/v1/user/id?id=15
export const getUser = async (id: string) => {
  try {
    const { data }: { data: UserResponse } = await axios.get(
      `${import.meta.env.VITE_SERVER}/api/v1/user/${id}`
    );
    return data;
  } catch (error) {
    throw error;
  }
};
export const { useAllUserQuery, useLoginMutation, useDeleteUserMutation } =
  userApi;
