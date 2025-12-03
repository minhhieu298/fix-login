import { SagaIterator } from "redux-saga";
import { call, put, takeLatest } from "redux-saga/effects";

import { getPermission, getPermissionTplus } from "@/services/permission";

import { PERMISSION_SLICE } from "../contants";
import { permissionActions } from "../reducers/permission.reducers";

function* fetchListPermission(): SagaIterator {
  try {
    const response = yield call(getPermission);
    if (response.Code === 0) {
      yield put(permissionActions.getPermissionSuccess(response.Data));
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      yield put(permissionActions.getPermissionFailure(error));
    }
  }
}
function* fetchListPermissionTplus(): SagaIterator {
  try {
    const response = yield call(getPermissionTplus);
    if (response.Code === 0) {
      yield put(permissionActions.getPermissionTplusSuccess(response.Data));
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      yield put(permissionActions.getPermissionTplusFailure(error));
    }
  }
}

export default function* permissionSaga() {
  yield takeLatest(
    `${PERMISSION_SLICE}/getPermissionAction`,
    fetchListPermission
  );
  yield takeLatest(
    `${PERMISSION_SLICE}/getPermissionTplusAction`,
    fetchListPermissionTplus
  );
}
