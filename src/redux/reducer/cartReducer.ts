import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { cartReducerInitialState } from "../../types/reducer-types";
import { CartItemsType } from "../../types/types";
import { act } from "react";
import { SubTitle } from "chart.js";

const initialState: cartReducerInitialState = {
  loading: false,
  cartItems: [],
  subTotal: 0,
  tax: 0,
  shippingCharges: 0,
  discount: 0,
  Total: 0,
  shippingInfo: {
    address: "",
    state: "",
    city: "",
    country: "",
    pinCode: "",
  },
};

export const cartReducer = createSlice({
  name: "cartReducer",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItemsType>) => {
      state.loading = true;

      const index = state.cartItems.findIndex(
        (i) => i.productId === action.payload.productId
      );
      if (index != -1) {
        state.cartItems[index] = action.payload;
      } else state.cartItems.push(action.payload); // add  cartItems {} to cartItems []
      state.loading = false;
    },
    removeCartItem: (state, action: PayloadAction<string>) => {
      state.loading = true;
      state.cartItems = state.cartItems.filter(
        (i) => i.productId !== action.payload
      );
      state.loading = false;
    },
    calculatePrice: (state) => {
      let subTotal = 0;
      for (let i = 0; i < state.cartItems.length; i++) {
        const item = state.cartItems[i];
        subTotal += item.price * item.quantity;
      }
      state.subTotal = subTotal;
      state.shippingCharges = state.subTotal > 1000 ? 0 : 200;
      state.tax = Math.round(state.subTotal * 0.18);
      state.Total =
        state.subTotal + state.tax + state.shippingCharges - state.discount;
    },
  },
});

export const { addToCart, removeCartItem, calculatePrice } =
  cartReducer.actions;
