// Api Type
import { Product, User } from "./types";

export type MessageResponse = { success: boolean; message: string };

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

export type SearchProductRequest = {
  search: string;
  price: number;
  category: string;
  sort: string;
  page: number;
};

// Custom Product Error
export interface CustomError {
  status: number;
  data: {
    message: string;
    success: boolean;
  };
}
