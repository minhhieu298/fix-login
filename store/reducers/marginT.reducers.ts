import { createSlice } from "@reduxjs/toolkit";

import { MARGIN_T_SLICE } from "../contants";

const initialState = {
  isLoading: false,
  dataMarginT: null,
  error: {
    message: "",
  },
};

const marginTSlice = createSlice({
  name: MARGIN_T_SLICE,
  initialState,
  reducers: {
    getMarginTSuccess: (state, action) => {
      state.isLoading = false;
      state.dataMarginT = action.payload;
    },
    getMarginTFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    getMarginTAction: (state) => {
      state.isLoading = true;
    },
  },
});

export const marginTActions = marginTSlice.actions;

const marginTReducer = marginTSlice.reducer;

export default marginTReducer;
