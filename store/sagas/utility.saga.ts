import { SagaIterator } from "redux-saga";
import { call, put, takeLatest } from "redux-saga/effects";

import { ILogin, IResponseLogin } from "@/interface/interface";
import { goTo } from "@/services/navigationService";
import { getSmsRateApi } from "@/services/utility";
import { AuthAction } from "@/store/reducers/Login/login.reducer";

import { UTILITY_PREFIX } from "../contants";
import { utilityActions } from "../reducers/utility.reducers";

export function* handleAuthRedirectSaga() {
  yield put(AuthAction.setUserInfo({} as ILogin));
  yield put(AuthAction.setUserInfo2FA({} as IResponseLogin));
  yield call(goTo, "?href=login");
  yield put(AuthAction.showForm(true));
}

function* getSmsRateSaga(): SagaIterator {
  try {
    const response: any = yield call(getSmsRateApi);
    if (response.Code === 0) {
      yield put(utilityActions.getSmsRateSuccess(response.Data));
    } else {
      if (response.Code === -123456) {
        yield call(handleAuthRedirectSaga);
        return;
      }
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      yield put(utilityActions.getSmsRateError(error));
    }
  }
}

export default function* utilitySaga() {
  yield takeLatest(`${UTILITY_PREFIX}/getSmsRateAction`, getSmsRateSaga);
}
