import { all } from "redux-saga/effects";

import accountSaga from "./sagas/account.saga";
import stockSaga from "./sagas/allStock.saga";
import chartStaticSaga from "./sagas/chartStatic.saga";
import commentsSaga from "./sagas/comments.saga";
import csLookupSaga from "./sagas/CsLookup.saga";
import csReportSaga from "./sagas/CsReport.saga";
import ErrorSaga from "./sagas/Error/error.saga";
import ezhubSaga from "./sagas/ezHub.saga";
import AuthSaga from "./sagas/Login/login.saga";
import marginTSaga from "./sagas/marginT.saga";
import permissionSaga from "./sagas/permission.saga";
import psChartStaticSaga from "./sagas/psChartStatic.saga";
import psReportSaga from "./sagas/PsReport.saga";
import pusherSaga from "./sagas/pusher.saga";
import savingReportSaga from "./sagas/savingReport.saga";
import setingSaga from "./sagas/setting.saga";
import stockCodeSaga from "./sagas/stockCode.saga";
import utilitySaga from "./sagas/utility.saga";
export default function* rootSaga() {
  yield all([
    AuthSaga(),
    setingSaga(),
    ErrorSaga(),
    ezhubSaga(),
    psReportSaga(),
    csReportSaga(),
    csLookupSaga(),
    permissionSaga(),
    stockCodeSaga(),
    marginTSaga(),
    savingReportSaga(),
    accountSaga(),
    commentsSaga(),
    psChartStaticSaga(),
    chartStaticSaga(),
    utilitySaga(),
    stockSaga(),
    pusherSaga(),
  ]);
}
