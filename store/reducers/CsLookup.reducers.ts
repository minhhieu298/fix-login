import { createSlice } from "@reduxjs/toolkit";

import { CS_LOOKUP_SLICE } from "../contants";

const initialState = {
  isLoading: false,
  isLoadingCheckFeeGTCD: false,
  dataLookup: null,
  dataCheckFeeGTCD: null,
  error: {
    message: "",
  },
};

const csLookupSlice = createSlice({
  name: CS_LOOKUP_SLICE,
  initialState,
  reducers: {
    getCsLookupSuccess: (state, action) => {
      state.isLoading = false;
      state.dataLookup = action.payload;
    },
    getCsLookupFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    getCsLookupAction: (state) => {
      state.isLoading = true;
    },
    getCheckFeeGTCDSuccess: (state, action) => {
      state.isLoadingCheckFeeGTCD = false;
      state.dataCheckFeeGTCD = action.payload;
    },
    getCheckFeeGTCDFailure: (state, action) => {
      state.isLoadingCheckFeeGTCD = false;
      state.error = action.payload;
    },
    getCheckFeeGTCDAction: (state) => {
      state.isLoadingCheckFeeGTCD = true;
    },
  },
});

export const csLookupActions = csLookupSlice.actions;

const csLookupReducer = csLookupSlice.reducer;

export default csLookupReducer;
