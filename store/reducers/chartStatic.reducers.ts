import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { CHART_STATIC_SLICE } from "../contants";

const initialState = {
  isLoading: false,
  chartStaticData: null,
  error: {
    message: "",
  },
};

const chartStaticSlice = createSlice({
  name: CHART_STATIC_SLICE,
  initialState,
  reducers: {
    getChartStaticDataAction: (
      state,
      _: PayloadAction<{ from_date: string; to_date: string }>
    ) => {
      state.isLoading = true;
    },
    getChartStaticDataSuccess: (state, action) => {
      state.isLoading = false;
      state.chartStaticData = action.payload;
    },
    getChartStaticDataFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const chartStaticActions = chartStaticSlice.actions;

const chartStaticReducer = chartStaticSlice.reducer;

export default chartStaticReducer;
