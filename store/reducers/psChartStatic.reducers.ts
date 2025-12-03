import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { PS_CHART_STATIC_SLICE } from "../contants";

const initialState = {
  isLoading: false,
  chartStaticData: null,
  error: {
    message: "",
  },
};

const psChartStaticSlice = createSlice({
  name: PS_CHART_STATIC_SLICE,
  initialState,
  reducers: {
    getPsChartStaticDataAction: (
      state,
      _: PayloadAction<{ fromdate: string; todate: string }>
    ) => {
      state.isLoading = true;
    },
    getPsChartStaticDataSuccess: (state, action) => {
      state.isLoading = false;
      state.chartStaticData = action.payload;
    },
    getPsChartStaticDataFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const psChartStaticActions = psChartStaticSlice.actions;

const psChartStaticReducer = psChartStaticSlice.reducer;

export default psChartStaticReducer;
