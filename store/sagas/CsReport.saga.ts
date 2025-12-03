import { SagaIterator } from "redux-saga";
import { call, put, takeLatest } from "redux-saga/effects";

import { ILogin, IResponseLogin } from "@/interface/interface";
import { getPhiAccount } from "@/services/CsLookup";
import { goTo } from "@/services/navigationService";
import { getCsReportCs, getStockReportStock } from "@/services/PsReport";

import { CS_REPORT_SLICE } from "../contants";
import { csReportActions } from "../reducers/CsReport.reducers";
import { AuthAction } from "../reducers/Login/login.reducer";

export function* handleAuthRedirectSaga() {
  yield put(AuthAction.setUserInfo({} as ILogin));
  yield put(AuthAction.setUserInfo2FA({} as IResponseLogin));
  yield call(goTo, "?href=login");
  yield put(AuthAction.showForm(true));
}
function* fetchListCsReport(): SagaIterator {
  try {
    const response = yield call(getCsReportCs);
    if (response.Code === 0) {
      yield put(csReportActions.getCsReportSuccess(response.Data));
    } else {
      if (response.Code === -123456) {
        yield call(handleAuthRedirectSaga);
        return;
      }
      yield put(csReportActions.getCsReportFailure(response.Message));
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      yield put(csReportActions.getCsReportFailure(error));
    }
  }
}
function* fetchListStockReport(): SagaIterator {
  try {
    const response = yield call(getStockReportStock);
    if (response.Code === 0) {
      yield put(csReportActions.getStockReportSuccess(response.Data));
    } else {
      if (response.Code === -123456) {
        yield call(handleAuthRedirectSaga);
        return;
      }
      yield put(csReportActions.getStockReportFailure(response.Message));
    }
  } catch (error: unknown) {
    yield put(csReportActions.getStockReportFailure(error));
  }
}

function* fetchListPhiAccount(): SagaIterator {
  try {
    const response = yield call(getPhiAccount);
    if (response.Code === 0) {
      yield put(csReportActions.getPhiAccountSuccess(response));
    } else {
      if (response.Code === -123456) {
        yield call(handleAuthRedirectSaga);
        return;
      }
      yield put(csReportActions.getPhiAccountFailure(response.Message));
    }
  } catch (error: unknown) {
    yield put(csReportActions.getPhiAccountFailure(error));
  }
}
export default function* csReportSaga() {
  yield takeLatest(`${CS_REPORT_SLICE}/getCsReportAction`, fetchListCsReport);
  yield takeLatest(
    `${CS_REPORT_SLICE}/getStockReportAction`,
    fetchListStockReport
  );
  yield takeLatest(
    `${CS_REPORT_SLICE}/getPhiAccountAction`,
    fetchListPhiAccount
  );
}
