import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./api/userApi";
import { userReducer } from "./reducer/userReducer";
import { productApi } from "./api/productApi";
import { cartReducer } from "./reducer/cartReducer";
import { orderApi } from "./api/orderApi";

const server = import.meta.env.VITE_SERVER;

const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer, // api
    [productApi.reducerPath]: productApi.reducer, //api
    [orderApi.reducerPath]: orderApi.reducer,
    [userReducer.name]: userReducer.reducer, //Slice of User
    [cartReducer.name]: cartReducer.reducer, //Slice of Cart
  },
  //   middleware: (mid) => [...mid(), userApi.middleware],
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userApi.middleware,
      productApi.middleware,
      orderApi.middleware
    ),
});

export { configureStore, store, server };
