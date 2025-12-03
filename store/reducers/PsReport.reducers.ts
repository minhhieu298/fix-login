import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { PS_REPORT_SLICE } from "../contants";

const initialState = {
  isLoading: false,
  isLoadingPsReport: false,
  dataReport: [],
  dataReportVt: null,
  dataReportChart: null,
  error: {
    message: "",
  },
};

const psReportSlice = createSlice({
  name: PS_REPORT_SLICE,
  initialState,
  reducers: {
    getPsReportAction: (state) => {
      state.isLoadingPsReport = true;
    },
    getPsReportSuccess: (state, action) => {
      state.isLoadingPsReport = false;
      state.dataReport = action.payload;
    },
    getPsReportFailure: (state, action) => {
      state.isLoadingPsReport = false;
      state.error = action.payload;
    },
    getPsReportPsVtAction: (
      state,
      _action: PayloadAction<{
        fromDate: string;
        toDate: string;
      }>
    ) => {
      state.isLoading = true;
    },
    getPsReportPsVtSuccess: (state, action) => {
      state.isLoading = false;
      state.dataReportVt = action.payload;
    },
    getPsReportPsVtFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    getChartStaticDataPsAction: (state) => {
      state.isLoading = true;
    },
    getChartStaticDataPsSuccess: (state, action) => {
      state.isLoading = false;
      state.dataReportChart = action.payload;
    },
    getChartStaticDataPsFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const psReportActions = psReportSlice.actions;

const psReportReducer = psReportSlice.reducer;

export default psReportReducer;
