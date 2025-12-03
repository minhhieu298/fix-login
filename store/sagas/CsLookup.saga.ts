import { SagaIterator } from "redux-saga";
import { call, put, takeLatest } from "redux-saga/effects";

import { ILogin, IResponseLogin } from "@/interface/interface";
import { CheckFeeGTCD, getCsLookupCs } from "@/services/CsLookup";
import { goTo } from "@/services/navigationService";

import { CS_LOOKUP_SLICE } from "../contants";
import { csLookupActions } from "../reducers/CsLookup.reducers";
import { AuthAction } from "../reducers/Login/login.reducer";

export function* handleAuthRedirectSaga() {
  yield put(AuthAction.setUserInfo({} as ILogin));
  yield put(AuthAction.setUserInfo2FA({} as IResponseLogin));
  yield call(goTo, "?href=login");
  yield put(AuthAction.showForm(true));
}

function* fetchListCsLookup(): SagaIterator {
  try {
    const response = yield call(getCsLookupCs);
    if (response.Code === 0) {
      yield put(csLookupActions.getCsLookupSuccess(response.Data));
    } else {
      if (response.Code === -123456) {
        yield call(handleAuthRedirectSaga);
        return;
      }
      yield put(csLookupActions.getCsLookupFailure(response.Message));
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      yield put(csLookupActions.getCsLookupFailure(error));
    }
  }
}
function* fetchCheckFeeGTCD(): SagaIterator {
  try {
    const response = yield call(CheckFeeGTCD);
    if (response.Code === 0) {
      yield put(csLookupActions.getCheckFeeGTCDSuccess(response.Data));
    } else {
      if (response.Code === -123456) {
        yield call(handleAuthRedirectSaga);
        return;
      }
      yield put(csLookupActions.getCheckFeeGTCDFailure(response.Message));
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      yield put(csLookupActions.getCheckFeeGTCDFailure(error));
    }
  }
}

export default function* csLookupSaga() {
  yield takeLatest(`${CS_LOOKUP_SLICE}/getCsLookupAction`, fetchListCsLookup);
  yield takeLatest(
    `${CS_LOOKUP_SLICE}/getCheckFeeGTCDAction`,
    fetchCheckFeeGTCD
  );
}
