import { combineReducers } from "@reduxjs/toolkit";

import accountReducer from "./reducers/account.reducers";
import { stockReducer } from "./reducers/allStock.reducers";
import assetReportReducer from "./reducers/assetReportSlice.reducers";
import chartStaticReducer from "./reducers/chartStatic.reducers";
import commentsReducer from "./reducers/comments.reducers";
import csLookupReducer from "./reducers/CsLookup.reducers";
import csReportReducer from "./reducers/CsReport.reducers";
import ErrorReducer from "./reducers/Error/error.reducer";
import { ezhubReducer } from "./reducers/ezHub.reducer";
import AuthReducer from "./reducers/Login/login.reducer";
import marginTReducer from "./reducers/marginT.reducers";
import OTPReducer from "./reducers/Otp/otp.reducer";
import permissionReducer from "./reducers/permission.reducers";
import PopupReducer from "./reducers/Popup/popup.reducer";
import psChartStaticReducer from "./reducers/psChartStatic.reducers";
import psReportReducer from "./reducers/PsReport.reducers";
import { pusherReducer } from "./reducers/pusher.reducers";
import savingReportReducer from "./reducers/savingReport.reducers";
import settingReducer from "./reducers/setting.reducer";
import stockCodeReducer from "./reducers/stockCode.reducers";
import { uiReducer } from "./reducers/ui.reducer";
import { utilityReducer } from "./reducers/utility.reducers";
export const rootReducer = combineReducers({
  AuthReducer,
  settingReducer,
  PopupReducer,
  OTPReducer,
  ErrorReducer,
  ezhubReducer,
  uiReducer,
  permissionReducer,
  psReportReducer,
  csReportReducer,
  csLookupReducer,
  marginTReducer,
  stockCodeReducer,
  assetReportReducer,
  chartStaticReducer,
  psChartStaticReducer,
  savingReportReducer,
  accountReducer,
  commentsReducer,
  utilityReducer,
  stockReducer,
  pusher: pusherReducer,
});
