import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./api/userApi";

const server = import.meta.env.VITE_SERVER;
const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
  },
//   middleware: (mid) => [...mid(), userApi.middleware],
    middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(userApi.middleware),
});

export { configureStore, store, server };
