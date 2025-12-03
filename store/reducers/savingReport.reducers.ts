import { createSlice } from "@reduxjs/toolkit";

import { SAVING_REPORT_SLICE } from "../contants";

const initialState = {
  isLoading: false,
  dataSavingReport: null,
  error: {
    message: "",
  },
};

const savingReportSlice = createSlice({
  name: SAVING_REPORT_SLICE,
  initialState,
  reducers: {
    getSavingReportSuccess: (state, action) => {
      state.isLoading = false;
      state.dataSavingReport = action.payload;
    },
    getSavingReportFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    getSavingReportAction: (state) => {
      state.isLoading = true;
    },
  },
});

export const savingReportActions = savingReportSlice.actions;

const savingReportReducer = savingReportSlice.reducer;

export default savingReportReducer;
