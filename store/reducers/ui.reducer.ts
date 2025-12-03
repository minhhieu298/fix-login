import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showWidgetPopper: false,
  widgetPopperAnchorEl: null as HTMLElement | null,
  requestOpenWidgetPopper: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    openWidgetPopper(state, action) {
      state.showWidgetPopper = true;
      state.widgetPopperAnchorEl = action.payload;
      state.requestOpenWidgetPopper = false;
    },
    closeWidgetPopper(state) {
      state.showWidgetPopper = false;
      state.widgetPopperAnchorEl = null;
    },
    requestOpenWidgetPopper(state) {
      state.requestOpenWidgetPopper = true;
    },
    resetRequestOpenWidgetPopper(state) {
      state.requestOpenWidgetPopper = false;
    },
  },
});

export const uiActions = uiSlice.actions;

export const uiReducer = uiSlice.reducer;
