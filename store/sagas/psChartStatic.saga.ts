import { PayloadAction } from "@reduxjs/toolkit";
import { SagaIterator } from "redux-saga";
import { call, put, takeLatest } from "redux-saga/effects";

import { getChartStaticDataPs } from "@/services/PsReport";

import { PS_CHART_STATIC_SLICE } from "../contants";
import { psChartStaticActions } from "../reducers/psChartStatic.reducers";

function* fetchListPsChartStaticData(
  action: PayloadAction<{
    fromdate: string;
    todate: string;
  }>
): SagaIterator {
  try {
    const response = yield call(
      getChartStaticDataPs,
      action.payload.fromdate,
      action.payload.todate
    );
    if (response.Code === 0) {
      yield put(
        psChartStaticActions.getPsChartStaticDataSuccess(response.Data)
      );
    } else {
      yield put(
        psChartStaticActions.getPsChartStaticDataFailure(response.Data)
      );
    }
  } catch (error: unknown) {
    yield put(psChartStaticActions.getPsChartStaticDataFailure(error));
  }
}

export default function* psChartStaticSaga() {
  yield takeLatest(
    `${PS_CHART_STATIC_SLICE}/getPsChartStaticDataAction`,
    fetchListPsChartStaticData
  );
}
