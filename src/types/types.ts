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
