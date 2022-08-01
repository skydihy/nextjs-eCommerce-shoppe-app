import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../..";
import { IProductDetail } from "../../../types/products";
import { IPopupStatus, PopupStatus } from "./type";

const initialState: IPopupStatus = {
  status: PopupStatus.empty,
  message: "",
  link: "",
};

export const popupSlice = createSlice({
  name: "popup",
  initialState,
  reducers: {
    setStatus: (state, action: PayloadAction<IPopupStatus>) => {
      state = {
        ...state,
        ...action.payload,
      };
      return state;
    },

    clearStatus: (state) => {
      return (state = {
        ...state,
        ...initialState,
      });
    },
  },
});

export const { setStatus, clearStatus } = popupSlice.actions;

export const popupStatus = (state: RootState) => state.popup;

export default popupSlice.reducer;
