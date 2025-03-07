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
