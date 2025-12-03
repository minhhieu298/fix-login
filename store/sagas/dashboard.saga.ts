import { type SagaIterator } from "redux-saga";
import { takeLatest } from "redux-saga/effects";
// import { getVN100 } from "../../services/index";
// import { DASHBOARD_PREFIX } from "../contants";
// import { dashboardAction } from "../reducers/dashboard.reducer";

function* getDataVN100(): SagaIterator {
  // try {
  //   const response: any = yield call(getVN100);
  //   yield put(dashboardAction.getDataVN100SuccessAction(response.data));
  // } catch (error: unknown) {
  //   if (error instanceof Error) {
  //     yield put(dashboardAction.getDataVN100ErrorAction(error));
  //   }
  // }
}

export default function* dashboardSaga() {
  yield takeLatest(`DASHBOARD_PREFIX/getDataVN100Action`, getDataVN100);
}
