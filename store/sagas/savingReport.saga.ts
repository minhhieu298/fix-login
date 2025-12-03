import { SagaIterator } from "redux-saga";
import { call, put, takeLatest } from "redux-saga/effects";

import { ILogin, IResponseLogin } from "@/interface/interface";
import { goTo } from "@/services/navigationService";
import { getSavingReport } from "@/services/savingReport";

import { SAVING_REPORT_SLICE } from "../contants";
import { AuthAction } from "../reducers/Login/login.reducer";
import { savingReportActions } from "../reducers/savingReport.reducers";

export function* handleAuthRedirectSaga() {
  yield put(AuthAction.setUserInfo({} as ILogin));
  yield put(AuthAction.setUserInfo2FA({} as IResponseLogin));
  yield call(goTo, "?href=login");
  yield put(AuthAction.showForm(true));
}
function* fetchListSavingReport(): SagaIterator {
  try {
    const response = yield call(getSavingReport);
    if (response.Code === 0) {
      yield put(savingReportActions.getSavingReportSuccess(response.Data));
    } else {
      if (response.Code === -123456) {
        yield call(handleAuthRedirectSaga);
        return;
      }
      yield put(savingReportActions.getSavingReportFailure(response.Message));
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      yield put(savingReportActions.getSavingReportFailure(error));
    }
  }
}

export default function* savingReportSaga() {
  yield takeLatest(
    `${SAVING_REPORT_SLICE}/getSavingReportAction`,
    fetchListSavingReport
  );
}
