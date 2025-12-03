import { createSlice } from "@reduxjs/toolkit";

import {
  IPermissionResponse,
  IPermissionTplusData,
} from "@/interface/permission/permission";

import { PERMISSION_SLICE } from "../contants";

const initialState = {
  isLoading: false,
  permission: [] as IPermissionResponse[],
  permissionTplus: [] as IPermissionTplusData[],
  error: {
    message: "",
  },
};

const permissionSlice = createSlice({
  name: PERMISSION_SLICE,
  initialState,
  reducers: {
    getPermissionAction: (state) => {
      state.isLoading = true;
    },
    getPermissionSuccess: (state, action) => {
      state.isLoading = false;
      state.permission = action.payload;
    },
    getPermissionFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    getPermissionTplusAction: (state) => {
      state.isLoading = true;
    },
    getPermissionTplusSuccess: (state, action) => {
      state.isLoading = false;
      state.permissionTplus = action.payload;
    },
    getPermissionTplusFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    resetPermission: () => {
      return initialState;
    },
  },
});

export const permissionActions = permissionSlice.actions;

const permissionReducer = permissionSlice.reducer;

export default permissionReducer;
