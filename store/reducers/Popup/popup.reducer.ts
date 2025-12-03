import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IDataAlert } from "@/interface/interface";

const initialState = {
  modal: false,
  data: {} as IDataAlert,
  isActiveForm: 0,
};

const PopupSlice = createSlice({
  name: "SHOW_MSG",
  initialState,
  reducers: {
    getDataPopup: (state, action: PayloadAction<IDataAlert>) => {
      state.data = action.payload;
    },
    showPopup: (state, action: PayloadAction<boolean>) => {
      state.modal = action.payload;
    },
    switchForm: (state, action: PayloadAction<number>) => {
      state.isActiveForm = action.payload;
    },
  },
});

export const PopupAction = PopupSlice.actions;

const PopupReducer = PopupSlice.reducer;
export default PopupReducer;
