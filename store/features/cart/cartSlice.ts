import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../..";
import { IProductDetail } from "../../../types/products";
import { IAddCart, ICart } from "./type";

interface CartState {
  cartList: ICart[];
}

const initialState: CartState = {
  cartList: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCart: (state, action: PayloadAction<IAddCart>) => {
      const indexProductWithSameId = state.cartList.findIndex(
        (cart) => cart.product.id === action.payload.product.id
      );

      if (indexProductWithSameId > -1) {
        state.cartList[indexProductWithSameId].amount +=
          action.payload.amount ?? 1;
          return
      }

      state.cartList.push({
        cartId: "shp" + Date.now().toString(),
        product: action.payload.product,
        amount: action.payload.amount ?? 1,
        status: "unconfirmed",
      });
    },

    removeCart: (state, action: PayloadAction<IProductDetail>) => {
      const indexProductWithSameId = state.cartList.findIndex(
        (cart) => cart.product.id === action.payload.id
      );

      if (indexProductWithSameId > -1) {
        if (state.cartList[indexProductWithSameId].amount > 1) {
          state.cartList[indexProductWithSameId].amount -= 1;
        }

        state.cartList = state.cartList.filter(
          (cart) =>
            cart.cartId !== state.cartList[indexProductWithSameId].cartId
        );

        state.cartList[indexProductWithSameId];
        return;
      }
    },
  },
});

export const { addCart, removeCart } = cartSlice.actions;

export const cartList = (state: RootState) => state.cart.cartList;

export default cartSlice.reducer;
