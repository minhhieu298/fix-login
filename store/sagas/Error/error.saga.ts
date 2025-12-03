import { SagaIterator } from "redux-saga";
import { all, call, put, takeEvery } from "redux-saga/effects";

import { ErrorAction } from "@/store/reducers/Error/error.reducer";
import { getCacheError } from "@/utils/cache";

export function* getErrorInfo(): SagaIterator {
  try {
    const sources = [
      { key: "eztrade", id: "0" },
      { key: "account", id: "1" },
      { key: "ps", id: "2" },
    ];

    const responses: any[] = yield all(
      sources.map((item) => call(getCacheError, item.id))
    );

    const errorBySource: Record<string, any[]> = {};

    for (let i = 0; i < responses.length; i++) {
      const data = responses[i].Data.Table || responses[i].Data;
      const key = sources[i].key;

      // Gắn nguồn vào từng lỗi nếu cần phân biệt
      errorBySource[key] = (data || []).map((err: any) => ({
        ...err,
        _source: key, // optional: dùng để debug
      }));
    }
    yield put(ErrorAction.getErrorSuccess(errorBySource));
  } catch (error: unknown) {
    yield put(ErrorAction.getErrorFail(error));
  }
}
export default function* ErrorSaga() {
  yield takeEvery("GET_ERROR_INFO/getError", getErrorInfo);
}
