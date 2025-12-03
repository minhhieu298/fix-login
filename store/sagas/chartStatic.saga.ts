import { PayloadAction } from "@reduxjs/toolkit";
import { SagaIterator } from "redux-saga";
import { call, put, takeLatest } from "redux-saga/effects";

import { getChartStaticData } from "@/services/PsReport";

import { CHART_STATIC_SLICE } from "../contants";
import { chartStaticActions } from "../reducers/chartStatic.reducers";

function* fetchListChartStaticData(
  action: PayloadAction<{
    from_date: string;
    to_date: string;
  }>
): SagaIterator {
  try {
    const response = yield call(
      getChartStaticData,
      action.payload.from_date,
      action.payload.to_date
    );
    if (response.Code === 0) {
      yield put(chartStaticActions.getChartStaticDataSuccess(response.Data));
    } else {
      yield put(chartStaticActions.getChartStaticDataFailure(response.Data));
    }
  } catch (error: unknown) {
    yield put(chartStaticActions.getChartStaticDataFailure(error));
  }
}

export default function* chartStaticSaga() {
  yield takeLatest(
    `${CHART_STATIC_SLICE}/getChartStaticDataAction`,
    fetchListChartStaticData
  );
}
