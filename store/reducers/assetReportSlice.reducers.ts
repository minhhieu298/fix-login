import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ASSET_REPORT_SLICE } from "@/store/contants";

interface AssetReportState {
  tab: string;
}

const initialState: AssetReportState = {
  tab: "CoSo",
};

const assetReportSlice = createSlice({
  name: ASSET_REPORT_SLICE,
  initialState,
  reducers: {
    setTab(state, action: PayloadAction<string>) {
      state.tab = action.payload;
    },
  },
});

export const { setTab } = assetReportSlice.actions;
export default assetReportSlice.reducer;
