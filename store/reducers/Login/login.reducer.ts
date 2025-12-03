import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
  FEESms,
  ILogin,
  IPackFeeSMS,
  IPostForgotPwd,
  IResponseLogin,
} from "@/interface/interface";

const initialState = {
  modal: false,
  userInfo: {} as ILogin,
  userInfo2FA: {
    Code: -123456,
    Data: null,
    Message: "",
  } as IResponseLogin,
  loading: false,
  forgotInfo: {} as IPostForgotPwd,
  error: {
    msg: "",
  },
  showFormFirstLogin: false,
  packfeeSMS: {
    listFee: [] as FEESms[],
    statusFee: {} as IPackFeeSMS,
  },
  isBeneficiary: null, // trạng thái có phải là người thụ hưởng hay ko
};

const AuthSlice = createSlice({
  name: "USER_INFO",
  initialState,
  reducers: {
    showForm: (state, action: PayloadAction<boolean>) => {
      state.modal = action.payload;
    },
    showFormFirstLogin: (state, action: PayloadAction<boolean>) => {
      state.showFormFirstLogin = action.payload;
    },
    setUserInfo: (state, action: PayloadAction<ILogin>) => {
      state.userInfo = action.payload;
    },
    setUserInfo2FA: (state, action: PayloadAction<IResponseLogin>) => {
      state.userInfo2FA = action.payload;
    },
    setForgotInfo: (state, action: PayloadAction<IPostForgotPwd>) => {
      state.forgotInfo = action.payload;
    },
    getUserInfo: (state) => {
      state.loading = true;
    },
    getUserInfoSuccess: (state, action: PayloadAction<IResponseLogin>) => {
      state.loading = false;
      if (action.payload?.Data) {
        state.userInfo = action.payload.Data;
      }
      state.userInfo2FA = action.payload;
    },
    getUserInfoError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getFeeSMS: (state) => {
      state.loading = true;
    },
    getFeeSMSSuccesss: (
      state,
      action: PayloadAction<{
        listFee: FEESms[];
        statusFee: IPackFeeSMS;
      }>
    ) => {
      state.loading = false;
      state.packfeeSMS.listFee = action.payload.listFee;
      state.packfeeSMS.statusFee = action.payload.statusFee;
    },
    getFeeSMSError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getBeneficiary: (state) => {
      state.loading = true;
    },
    getBeneficiarySuccess: (state, action) => {
      state.loading = false;
      state.isBeneficiary = action.payload;
    },
    getBeneficiaryError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const AuthAction = AuthSlice.actions;

const AuthReducer = AuthSlice.reducer;
export default AuthReducer;
