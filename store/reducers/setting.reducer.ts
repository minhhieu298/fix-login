import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { defaultMenuIcon } from "@/components/Layout/Settings/EditMenuIcons/constant";
import { DynamicObject } from "@/interface/ui/DynamicDashboard/interface";

import { SETTING_ACCOUNT_PREFIX } from "../contants";

const initialState = {
  isLoading: false,
  setting: null,
  showWelcome: false,
  defaultMenu: defaultMenuIcon,
  error: {
    message: "",
  },
  changeTabMenuIcon: false, // state lưu trạng thái tabs chỉnh sửa icon
  modalSetting: false, // state lưu trạng thái mở cài đặt
};

const settingSlide = createSlice({
  name: SETTING_ACCOUNT_PREFIX,
  initialState,
  reducers: {
    changeTabMenuIcon: (state, action: PayloadAction<boolean>) => {
      state.changeTabMenuIcon = action.payload;
    },
    openSetting: (state, action: PayloadAction<boolean>) => {
      state.modalSetting = action.payload;
    },
    setDataSetting: (state, action) => {
      state.setting = action.payload;
    },
    getDataSettingAction: (state) => {
      state.isLoading = true;
      state.showWelcome = false;
    },
    getDataSettingActionSuccessAction: (state, action) => {
      state.isLoading = false;
      state.setting = action.payload.Setting
        ? JSON.parse(action.payload.Setting)
        : action.payload;
      if (
        Object.keys(action.payload).length === 0 ||
        !action.payload?.Setting
      ) {
        state.showWelcome = true;
      } else {
        state.showWelcome = false;
      }
      if (action.payload && action.payload.DefaultMenu) {
        state.defaultMenu = Object.entries(
          action.payload.DefaultMenu as DynamicObject
        )

          .map(([_, value]) => value);
      }
    },
    getDataSettingErrorAction: (state, action) => {
      state.isLoading = false;
      state.setting = null;
      state.error = action.payload.message;
    },
    offShowWelcome: (state) => {
      state.showWelcome = false;
    },

    postSettingAction: (state, _action) => {
      state.isLoading = true;
    },
    postSettingActionSuccess: (state, action) => {
      state.isLoading = false;
      state.setting = JSON.parse(action.payload.Setting);
    },
    postSettingActionError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.message;
    },
    resetData: () => {
      return initialState;
    },
  },
});

export const settingAction = settingSlide.actions;

const settingReducer = settingSlide.reducer;

export default settingReducer;
