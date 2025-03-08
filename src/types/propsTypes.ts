import { ReactElement } from "react";

import { CartItemsType, User } from "./types";

export interface HeaderPropsType {
  user: User | null;
}
export interface ProtectedRoutePropsType {
  children?: ReactElement;
  isAuthenticated: boolean;
  adminOnly?: boolean;
  admin?: boolean;
  redirect?: string;
}
export type ProductsProps = {
  productId: string;
  photo: string;
  name: string;
  price: number;
  stock: number;
  handler: (cartItem: CartItemsType) => string | undefined;
};
