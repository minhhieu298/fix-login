import { SagaIterator } from "redux-saga";
import { call, put, takeLatest } from "redux-saga/effects";

import { fetchStockList, StockApiResponse } from "@/services/stockService";

import { STOCK_PREFIX } from "../contants";
import { stockActions } from "../reducers/allStock.reducers";

function* getDataStockSaga(): SagaIterator {
  try {
    const data: StockApiResponse = yield call(fetchStockList);
    if (data.Code === 0) {
      yield put(stockActions.getDataStockSuccess(data.Data));
    } else {
      yield put(stockActions.getDataStockError(data.Message));
    }
  } catch (error) {
    if (error instanceof Error) {
      yield put(stockActions.getDataStockError(error.message));
    }
  }
}

export default function* stockSaga() {
  yield takeLatest(`${STOCK_PREFIX}/getDataStockAction`, getDataStockSaga);
}
