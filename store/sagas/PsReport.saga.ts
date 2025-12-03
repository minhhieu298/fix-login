import { PayloadAction } from "@reduxjs/toolkit";
import { SagaIterator } from "redux-saga";
import { call, put, takeLatest } from "redux-saga/effects";

import { ILogin, IResponseLogin } from "@/interface/interface";
import { goTo } from "@/services/navigationService";
import { getPsReportPs, getPsReportPsVt } from "@/services/PsReport";

import { PS_REPORT_SLICE } from "../contants";
import { AuthAction } from "../reducers/Login/login.reducer";
import { psReportActions } from "../reducers/PsReport.reducers";

export function* handleAuthRedirectSaga() {
  yield put(AuthAction.setUserInfo({} as ILogin));
  yield put(AuthAction.setUserInfo2FA({} as IResponseLogin));
  yield call(goTo, "?href=login");
  yield put(AuthAction.showForm(true));
}
function* fetchListPsReport(): SagaIterator {
  try {
    const response = yield call(getPsReportPs);
    if (response.Code === 0) {
      yield put(psReportActions.getPsReportSuccess(response.Data));
    } else {
      if (response.Code === -123456) {
        yield call(handleAuthRedirectSaga);
        return;
      }
      yield put(psReportActions.getPsReportFailure(response.Message));
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      yield put(psReportActions.getPsReportFailure(error));
    }
  }
}
function* fetchListPsReportVt(
  action: PayloadAction<{
    fromDate: string;
    toDate: string;
    symbol: string;
  }>
): SagaIterator {
  try {
    const response = yield call(
      getPsReportPsVt,
      action.payload.fromDate,
      action.payload.toDate
    );
    if (response.Code === 0) {
      yield put(psReportActions.getPsReportPsVtSuccess(response.Data));
    } else {
      if (response.Code === -123456) {
        yield call(handleAuthRedirectSaga);
        return;
      }
      yield put(psReportActions.getPsReportPsVtFailure(response.Message));
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      yield put(psReportActions.getPsReportPsVtFailure(error));
    }
  }
}
export default function* psReportSaga() {
  yield takeLatest(`${PS_REPORT_SLICE}/getPsReportAction`, fetchListPsReport);
  yield takeLatest(
    `${PS_REPORT_SLICE}/getPsReportPsVtAction`,
    fetchListPsReportVt
  );
}
