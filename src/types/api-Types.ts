// Api Type
import {
  allOrderType,
  getMyOrderResponseType,
  orderItemType,
  Product,
  ShippingInfoType,
  singleOrderType,
  User,
} from "./types";

export type MessageResponse = {
  success: boolean;
  message: string;
};

export type UserResponse = {
  success: boolean;
  user: User;
};

export type ProductResponse = {
  success: boolean;
  message: Product[];
};

export type CategoryResponse = {
  success: boolean;
  message: string[];
};

export type SearchProductResponse = {
  success: boolean;
  message: Product[];
  totalPage: number;
};

export type singleProductResponse = {
  success: boolean;
  message: Product;
};
export type updateProductResponse = {
  success: boolean;
  message: string;
};
export type deleteProductResponse = {
  success: boolean;
  message: string;
};
export type SearchProductRequest = {
  search: string;
  price: number;
  category: string;
  sort: string;
  page: number;
};
export type newProductRequest = {
  id: string;
  formData: FormData;
};
export type updateProductRequest = {
  productId: string;
  id: string;
  formData: FormData;
};
export type deleteProductRequest = {
  productId: string;
  id: string;
};
export type newOrderRequest = {
  shippingInfo: ShippingInfoType;
  user: string;
  subTotal: number;
  tax: number;
  shippingCharges: number;
  discount: number;
  Total: number;
  orderItem: orderItemType[];
};
export type getMyOrderType = {
  success: boolean;
  orders: getMyOrderResponseType[];
};
export type allOrderResponseType = {
  success: boolean;
  allOrder: allOrderType[];
};
export type singleOrderResponseType = {
  success: boolean;
  order: singleOrderType;
};
export type updateOrderResponseType = {
  success: boolean;
  message: string;
};
export type allUserResponse = {
  success: boolean;
  user: User[];
};

// export type updateOrderResponseType = {
//   success: boolean;
//   message: string;
// };
// Custom Product Error
export interface CustomError {
  status: number;
  data: {
    message: string;
    success: boolean;
  };
}
