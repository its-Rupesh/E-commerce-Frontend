import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { cartReducerInitialState } from "../../types/reducer-types";
import { CartItemsType, ShippingInfoType } from "../../types/types";

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
    discountApplied: (state, action: PayloadAction<number>) => {
      state.discount = action.payload;
    },
    shippingInfoData: (state, action: PayloadAction<ShippingInfoType>) => {
      state.shippingInfo.address = action.payload.address;
      state.shippingInfo.city = action.payload.city;
      state.shippingInfo.country = action.payload.country;
      state.shippingInfo.state = action.payload.state;
      state.shippingInfo.pinCode = action.payload.pinCode;
    },
    emptyCartInfoAfterPayement: (state) => {
      state.loading = false;
      state.cartItems = [];
      state.subTotal = 0;
      state.tax = 0;
      state.shippingCharges = 0;
      state.discount = 0;
      state.Total = 0; // ✅ Only keep this once
      state.shippingInfo = {
        address: "",
        state: "",
        city: "",
        country: "",
        pinCode: "",
      };
    },
  },
});

export const {
  addToCart,
  removeCartItem,
  calculatePrice,
  discountApplied,
  shippingInfoData,
  emptyCartInfoAfterPayement,
} = cartReducer.actions;
