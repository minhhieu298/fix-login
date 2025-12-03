import { SagaIterator } from "redux-saga";
import { call, put, takeLatest } from "redux-saga/effects";

import { ILogin, IResponseLogin } from "@/interface/interface";
import { getCsMarginT } from "@/services/CsLookup";
import { goTo } from "@/services/navigationService";

import { MARGIN_T_SLICE } from "../contants";
import { AuthAction } from "../reducers/Login/login.reducer";
import { marginTActions } from "../reducers/marginT.reducers";

export function* handleAuthRedirectSaga() {
  yield put(AuthAction.setUserInfo({} as ILogin));
  yield put(AuthAction.setUserInfo2FA({} as IResponseLogin));
  yield call(goTo, "?href=login");
  yield put(AuthAction.showForm(true));
}

function* fetchListMarginT(): SagaIterator {
  try {
    const response = yield call(getCsMarginT);
    if (response.Code === 0) {
      yield put(marginTActions.getMarginTSuccess(response.Data));
    } else {
      if (response.Code === -123456) {
        yield call(handleAuthRedirectSaga);
        return;
      }
      yield put(marginTActions.getMarginTFailure(response.Message));
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      yield put(marginTActions.getMarginTFailure(error));
    }
  }
}

export default function* marginTSaga() {
  yield takeLatest(`${MARGIN_T_SLICE}/getMarginTAction`, fetchListMarginT);
}
