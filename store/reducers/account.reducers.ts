import { createSlice } from "@reduxjs/toolkit";

import { IInitialStateAccount } from "@/interface/account/interface";

import { ACCOUNT_INFO_PREFIX } from "../contants";

const initialState: IInitialStateAccount = {
  isLoading: false,
  accountInfo: null,
  error: {
    message: "",
  },
  isNameSuccess: false,
  isAvatarSuccess: false,
};

const accountSlide = createSlice({
  name: ACCOUNT_INFO_PREFIX,
  initialState,
  reducers: {
    getAccountInfoAction: (state) => {
      state.isLoading = true;
    },
    getAccountInfoActionSuccess: (state, action) => {
      state.isLoading = false;
      state.accountInfo = action.payload;
    },
    getAccountInfoActionError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.message;
    },
    changeAvatarAction: (state, _action) => {
      state.isLoading = true;
      state.isAvatarSuccess = false;
    },
    changeAvatarActionSuccess: (state, action) => {
      state.isLoading = false;
      state.isAvatarSuccess = true;
      if (state.accountInfo) {
        state.accountInfo.avatar = action.payload;
      }
    },
    changeAvatarActionError: (state, action) => {
      state.isLoading = false;
      state.isAvatarSuccess = false;
      state.error = action.payload.message;
    },
    updateSpecialNameAction: (state, _action) => {
      state.isLoading = true;
      state.isNameSuccess = false;
    },
    updateSpecialNameActionSuccess: (state, action) => {
      state.isLoading = false;
      state.isNameSuccess = true;
      if (state.accountInfo) {
        state.accountInfo.specialName = action.payload.name;
      }
    },
    updateSpecialNameActionError: (state, action) => {
      state.isLoading = false;
      state.isNameSuccess = false;
      state.error = action.payload.message;
    },
    resetAvatarAndNameSuccess: (state) => {
      state.isAvatarSuccess = false;
      state.isNameSuccess = false;
    },
    resetData: () => {
      return initialState;
    },
  },
});

export const accountAction = accountSlide.actions;

const accountReducer = accountSlide.reducer;

export default accountReducer;
