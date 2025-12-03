import { createSlice } from "@reduxjs/toolkit";

import { STOCK_PREFIX } from "../contants";

const initialState = {
  isLoading: false,
  dataStock: null,
  error: "",
};

// stockSlice
const stockSlice = createSlice({
  name: STOCK_PREFIX,
  initialState,
  reducers: {
    getDataStockAction: (state) => {
      state.isLoading = true;
    },
    getDataStockSuccess: (state, action) => {
      state.isLoading = false;
      state.dataStock = action.payload;
    },
    getDataStockError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const stockActions = stockSlice.actions;

export const stockReducer = stockSlice.reducer;
