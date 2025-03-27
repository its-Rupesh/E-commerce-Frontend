// Reducer Types Present here

import { CartItemsType, ShippingInfoType, User } from "./types";

export interface userReducerInitialState {
  user: User | null;
  loading: boolean;
}

export interface cartReducerInitialState {
  loading: boolean;
  cartItems: CartItemsType[];
  subTotal: number;
  tax: number;
  shippingCharges: number;
  discount: number;
  Total: number;
  shippingInfo: ShippingInfoType;
}
export type customerOrder = Omit<
  cartReducerInitialState,
  "loading" | "cartItems"
>;
