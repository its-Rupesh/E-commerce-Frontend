import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./api/userApi";
import { userReducer } from "./reducer/userReducer";
import { productApi } from "./api/productApi";

const server = import.meta.env.VITE_SERVER;

const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer, // api
    [productApi.reducerPath]: productApi.reducer, //api
    [userReducer.name]: userReducer.reducer, //Slice
  },
  //   middleware: (mid) => [...mid(), userApi.middleware],
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware, productApi.middleware),
});

export { configureStore, store, server };
