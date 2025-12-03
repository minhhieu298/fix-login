import { createSlice } from "@reduxjs/toolkit";

import { CS_REPORT_SLICE } from "../contants";

const initialState = {
  isLoading: false,
  isLoadingBase: false,
  isLoadingStock: false,
  dataReport: null,
  chartStaticData: null,
  error: {
    message: "",
  },
  stockReport: null,
  dataPhiAccount: null,
  showBalance: false,
};

const csReportSlice = createSlice({
  name: CS_REPORT_SLICE,
  initialState,
  reducers: {
    getCsReportAction: (state) => {
      state.isLoadingBase = true;
    },
    getCsReportSuccess: (state, action) => {
      state.isLoadingBase = false;
      state.dataReport = action.payload;
    },
    getCsReportFailure: (state, action) => {
      state.isLoadingBase = false;
      state.error = action.payload;
    },
    getStockReportAction: (state) => {
      state.isLoadingStock = true;
    },
    getStockReportSuccess: (state, action) => {
      state.isLoadingStock = false;
      state.stockReport = action.payload;
    },
    getStockReportFailure: (state, action) => {
      state.isLoadingStock = false;
      state.error = action.payload;
    },

    getChartStaticDataFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    getPhiAccountSuccess: (state, action) => {
      state.isLoading = false;
      state.dataPhiAccount = action.payload;
    },
    getPhiAccountFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    setShowBalanceAction: (state, action) => {
      state.showBalance = action.payload;
    },
    resetData: (state) => {
      state.isLoading = false;
      state.isLoadingBase = false;
      state.isLoadingStock = false;
      state.dataReport = null;
      state.chartStaticData = null;
      state.error = { message: "" };
      state.stockReport = null;
    },
  },
});

export const csReportActions = csReportSlice.actions;

const csReportReducer = csReportSlice.reducer;

export default csReportReducer;
