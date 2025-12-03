import { SagaIterator } from "redux-saga";
import { all, call, put, takeLatest } from "redux-saga/effects";

import { AuthAction } from "@/store/reducers/Login/login.reducer";
import { GetBeneficiaryStatus } from "@/utils/beneficiary";
import { checkSession } from "@/utils/checkSession";
import { getPackFee, getStatusFee } from "@/utils/FeeSMS";

export function* getFeeSMS(): SagaIterator {
  try {
    const [response_1, reponse_2] = yield all([
      call(getPackFee),
      call(getStatusFee),
    ]);

    const data = {
      listFee: response_1.Data.Table,
      statusFee: reponse_2.Data,
    };

    yield put(AuthAction.getFeeSMSSuccesss(data));
  } catch (error) {
    yield put(AuthAction.getFeeSMSError(error));
  }
}

export function* getUserInfo(): SagaIterator {
  try {
    const response = yield call(checkSession);
    yield put(AuthAction.getUserInfoSuccess(response));
  } catch (error) {
    yield put(AuthAction.getUserInfoError(error));
  }
}

export function* getBeneficiary(): SagaIterator {
  try {
    const response = yield call(GetBeneficiaryStatus);
    let status = true;
    if (response.Code === 0) {
      status = response.Data.NoLimit === 0 ? true : false; // 0 là hạn chế, 1 là ko hạn chế
    } else {
      status = true;
    }
    yield put(AuthAction.getBeneficiarySuccess(status));
  } catch (error) {
    yield put(AuthAction.getBeneficiaryError(error));
  }
}

export default function* AuthSaga() {
  yield takeLatest("USER_INFO/getUserInfo", getUserInfo);
  yield takeLatest("USER_INFO/getFeeSMS", getFeeSMS);
  yield takeLatest("USER_INFO/getBeneficiary", getBeneficiary);
}
