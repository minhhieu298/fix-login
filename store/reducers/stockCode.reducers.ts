import { createSlice } from "@reduxjs/toolkit";

import { STOCK_CODE_HNX_SLICE } from "../contants";

const initialState = {
  isLoading: false,
  isLoadingHNX: false,
  isLoadingHSX: false,
  stockCodeHNX: null,
  stockCodeHSX: null,
  stockCodeHNXPs: null,
  stockCodeHSXPs: null,
  error: {
    message: "",
  },
};

const stockCodeSlice = createSlice({
  name: STOCK_CODE_HNX_SLICE,
  initialState,
  reducers: {
    getStockCodeHNXAction: (state, _action) => {
      state.isLoadingHNX = true;
    },
    getStockCodeHNXSuccess: (state, action) => {
      state.isLoadingHNX = false;
      state.stockCodeHNX = action.payload;
    },
    getStockCodeHNXFailure: (state, action) => {
      state.isLoadingHNX = false;
      state.error = action.payload;
    },
    getStockCodeHSXAction: (state, _action) => {
      state.isLoadingHSX = true;
    },
    getStockCodeHSXSuccess: (state, action) => {
      state.isLoadingHSX = false;
      state.stockCodeHSX = action.payload;
    },
    getStockCodeHSXFailure: (state, action) => {
      state.isLoadingHSX = false;
      state.error = action.payload;
    },
    getStockCodeHNXPsAction: (state, _action) => {
      state.isLoading = true;
    },
    getStockCodeHNXPsSuccess: (state, action) => {
      state.isLoading = false;
      state.stockCodeHNXPs = action.payload;
    },
    getStockCodeHNXPsFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    getStockCodeHSXPsAction: (state, _action) => {
      state.isLoading = true;
    },
    getStockCodeHSXPsSuccess: (state, action) => {
      state.isLoading = false;
      state.stockCodeHSXPs = action.payload;
    },
    getStockCodeHSXPsFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const stockCodeActions = stockCodeSlice.actions;

const stockCodeReducer = stockCodeSlice.reducer;

export default stockCodeReducer;
