import { createSlice } from "@reduxjs/toolkit";

import { UTILITY_PREFIX } from "../contants";

const initialState = {
  isLoading: false,
  smsRate: null,
  error: {
    message: "",
  },
};

// utilitySlice
const utilitySlice = createSlice({
  name: UTILITY_PREFIX,
  initialState,
  reducers: {
    getSmsRateAction: (state) => {
      state.isLoading = true;
    },
    getSmsRateSuccess: (state, action) => {
      state.isLoading = false;
      state.smsRate = action.payload;
    },
    getSmsRateError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const utilityActions = utilitySlice.actions;

export const utilityReducer = utilitySlice.reducer;
