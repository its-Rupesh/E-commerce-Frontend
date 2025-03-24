// Gloabal Types

export interface User {
  name: string;
  email: string;
  photo: string;
  gender: string;
  dob: string;
  _id: string;
  role?: string;
}

export interface Product {
  name: string;
  photo: string;
  price: number;
  stock: number;
  category: string;
  _id: string;
}
export type ShippingInfoType = {
  address: string;
  city: string;
  state: string;
  country: string;
  pinCode: string;
};
export type CartItemsType = {
  name: string;
  photo: string;
  price: number;
  quantity: number;
  productId: string;
  stock: number;
};
export type orderItemType = Omit<CartItemsType, "stock"> & {
  _id: string;
};
export type getMyOrderResponseType = {
  shippingInfo: ShippingInfoType;
  _id: string;
  user: string;
  subTotal: number;
  tax: number;
  shippingCharges: number;
  discount: number;
  Total: number;
  status: string;
  orderItem: orderItemType[];
};

export type singleOrderType = {
  shippingInfo: ShippingInfoType;
  _id: string;
  user: userType;
  subTotal: number;
  tax: number;
  shippingCharges: number;
  discount: number;
  Total: number;
  status: string;
  orderItem: orderItemType[];
};

// export type allOrderType = {
//   shippingInfo: ShippingInfoType;
//   _id: ;
//   user: {
//     _id: "1";
//     name: "Rupesh";
//   };
//   subTotal: 5000;
//   tax: 200;
//   shippingCharges: 10;
//   discount: 200;
//   Total: 500;
//   status: "Processing";
//   orderItem: [
//     {
//       name: "Tank";
//       photo: "upload\\00d08caa-111e-4bbe-839a-12033a738a67.jpg";
//       price: 10000000;
//       quantity: 2;
//       productId: "67bab32fa4bbd62ae2809391";
//       _id: "67d7f422f48f0a3a55bcb79f";
//     }
//   ];
//   createdAt: "2025-03-17T10:06:26.631Z";
//   updatedAt: "2025-03-17T10:06:26.631Z";
//   __v: 0;
// };
type userType = {
  _id: string;
  name: string;
};
export type allOrderType = Omit<getMyOrderResponseType, "user"> & {
  user: userType;
};
