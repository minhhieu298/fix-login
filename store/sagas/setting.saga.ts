import { PayloadAction } from "@reduxjs/toolkit";
import { SagaIterator } from "redux-saga";
import { call, put, takeLatest } from "redux-saga/effects";

import { ILogin, IResponseData, IResponseLogin } from "@/interface/interface";
import { ISettingResponse } from "@/interface/setting/interface";
import { getSetting, postSetting } from "@/services";
import { goTo } from "@/services/navigationService";

import { SETTING_ACCOUNT_PREFIX } from "../contants";
import { AuthAction } from "../reducers/Login/login.reducer";
import { settingAction } from "../reducers/setting.reducer";

export function* handleAuthRedirectSaga() {
  yield put(AuthAction.setUserInfo({} as ILogin));
  yield put(AuthAction.setUserInfo2FA({} as IResponseLogin));
  yield call(goTo, "?href=login");
  yield put(AuthAction.showForm(true));
}

function* fetchListDataSeting(): SagaIterator {
  try {
    const response = yield call(getSetting);
    if (response.Code === 0) {
      yield put(settingAction.getDataSettingActionSuccessAction(response.Data));
    } else {
      if (response.Code === -123456) {
        yield call(handleAuthRedirectSaga);
        return;
      }
      yield put(settingAction.getDataSettingErrorAction(response.Message));
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      yield put(settingAction.getDataSettingErrorAction(error));
    }
  }
}

function* updateSettingSaga(
  action: PayloadAction<ISettingResponse>
): SagaIterator {
  try {
    const response: IResponseData<ISettingResponse> = yield call(
      postSetting,
      action.payload
    );
    if (response.Code === 0) {
      yield put(settingAction.postSettingActionSuccess(action.payload));
    } else {
      if (response.Code === -123456) {
        yield call(handleAuthRedirectSaga);
        return;
      }
      yield put(settingAction.postSettingActionError(response.Message));
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      yield put(settingAction.postSettingActionError(error));
    }
  }
}

export default function* setingSaga() {
  yield takeLatest(
    `${SETTING_ACCOUNT_PREFIX}/getDataSettingAction`,
    fetchListDataSeting
  );
  yield takeLatest(
    `${SETTING_ACCOUNT_PREFIX}/postSettingAction`,
    updateSettingSaga
  );
}
