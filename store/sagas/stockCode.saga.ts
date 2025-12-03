import { SagaIterator } from "redux-saga";
import { call, put, takeLatest } from "redux-saga/effects";

import { ILogin, IResponseLogin } from "@/interface/interface";
import { goTo } from "@/services/navigationService";
import {
  getStockCodeHNX,
  getStockCodeHSX,
  getStockCodePsHNX,
  getStockCodePsHSX,
} from "@/services/stockCode";

import { AuthAction } from "../reducers/Login/login.reducer";
import { stockCodeActions } from "../reducers/stockCode.reducers";

export function* handleAuthRedirectSaga() {
  yield put(AuthAction.setUserInfo({} as ILogin));
  yield put(AuthAction.setUserInfo2FA({} as IResponseLogin));
  yield call(goTo, "?href=login");
  yield put(AuthAction.showForm(true));
}
function* fetchListStockCodeHNX(action: { payload: string }): SagaIterator {
  try {
    const response = yield call(getStockCodeHNX, action.payload);
    if (response) {
      if (Array.isArray(response)) {
        const sortedResponse = response.map((item) => ({
          ...item,
          Info: item.Info.sort(
            (
              a: [number | string, string | number],
              b: [number | string, string | number]
            ) => {
              return parseFloat(a[0].toString()) - parseFloat(b[0].toString());
            }
          ),
        }));
        yield put(stockCodeActions.getStockCodeHNXSuccess(sortedResponse));
      }
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      yield put(stockCodeActions.getStockCodeHNXFailure(error));
    }
  }
}
function* fetchListStockCodeHSX(action: { payload: string }): SagaIterator {
  try {
    const response = yield call(getStockCodeHSX, action.payload);
    if (response) {
      yield put(stockCodeActions.getStockCodeHSXSuccess(response));
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      yield put(stockCodeActions.getStockCodeHSXFailure(error));
    }
  }
}
function* fetchListStockCodePsHNX(action: { payload: string }): SagaIterator {
  try {
    const response = yield call(getStockCodePsHNX, action.payload);
    if (response) {
      if (Array.isArray(response)) {
        const sortedResponse = response.map((item) => ({
          ...item,
          Info: item.Info.sort(
            (
              a: [number | string, string | number],
              b: [number | string, string | number]
            ) => {
              return parseFloat(a[0].toString()) - parseFloat(b[0].toString());
            }
          ),
        }));
        yield put(stockCodeActions.getStockCodeHNXPsSuccess(sortedResponse));
      }
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      yield put(stockCodeActions.getStockCodeHNXPsFailure(error));
    }
  }
}
function* fetchListStockCodePsHSX(action: { payload: string }): SagaIterator {
  try {
    const response = yield call(getStockCodePsHSX, action.payload);
    if (response) {
      yield put(stockCodeActions.getStockCodeHSXPsSuccess(response));
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      yield put(stockCodeActions.getStockCodeHSXPsFailure(error));
    }
  }
}
export default function* stockCodeHNXSaga() {
  yield takeLatest(
    stockCodeActions.getStockCodeHNXAction,
    fetchListStockCodeHNX
  );
  yield takeLatest(
    stockCodeActions.getStockCodeHSXAction,
    fetchListStockCodeHSX
  );
  yield takeLatest(
    stockCodeActions.getStockCodeHNXPsAction,
    fetchListStockCodePsHNX
  );
  yield takeLatest(
    stockCodeActions.getStockCodeHSXPsAction,
    fetchListStockCodePsHSX
  );
}
