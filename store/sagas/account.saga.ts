import { PayloadAction } from "@reduxjs/toolkit";
import { t } from "i18next";
import { SagaIterator } from "redux-saga";
import { call, put, takeLatest } from "redux-saga/effects";

import { IResponseData } from "@/interface/interface";
import {
  getAccountInfo,
  updateChangeAvatar,
  updateSpecialName,
} from "@/services";
import eventBus from "@/utils/event";
import { handleAlert } from "@/utils/eventBus";

import { ACCOUNT_INFO_PREFIX } from "../contants";
import { accountAction } from "../reducers/account.reducers";

function* fetchAccountInfo(): SagaIterator {
  try {
    const response = yield call(getAccountInfo);
    if (response.Code === 0) {
      yield put(accountAction.getAccountInfoActionSuccess(response.Data));
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      yield put(accountAction.getAccountInfoActionError(error));
    }
  }
}

function* changeAvatarSaga(
  action: PayloadAction<{ file: File; base64String: string }>
): SagaIterator {
  try {
    const response: IResponseData<{ file: File }> = yield call(
      updateChangeAvatar,
      action.payload.file
    );
    if (response.Code === 0 || response.Code === 1) {
      yield put(
        accountAction.changeAvatarActionSuccess(action.payload.base64String)
      );
      yield call(handleAlert, {
        message: "Lưu ảnh đại diện thành công",
        severity: "success",
        status: true,
      });
    } else {
      eventBus.emit("showAlert", {
        message: response.Message,
        title: `Thay đổi ảnh đại diện thất bại`,
        icon: "error",
        textAction: t("text_da_hieu"),
        status: true,
      });
      yield put(
        accountAction.changeAvatarActionError(
          new Error(response.Message || "API Error")
        )
      );
    }
  } catch (error: unknown) {
    eventBus.emit("showAlert", {
      message: error,
      title: `Thay đổi ảnh đại diện thất bại`,
      icon: "error",
      textAction: t("text_da_hieu"),
      status: true,
    });
    if (error instanceof Error) {
      yield put(accountAction.changeAvatarActionError(error));
    }
  }
}

function* updateSpecialNameSaga(
  action: PayloadAction<{ name: string }>
): SagaIterator {
  try {
    const response: IResponseData<{ name: string }> = yield call(
      updateSpecialName,
      action.payload.name
    );
    if (response.Code === 0 || response.Code === 1) {
      yield put(accountAction.updateSpecialNameActionSuccess(action.payload));
      yield call(handleAlert, {
        message: "Thay đổi nickname thành công",
        severity: "success",
        status: true,
      });
    } else {
      eventBus.emit("showAlert", {
        message: response.Message,
        title: `Thay đổi nickname thất bại`,
        icon: "error",
        textAction: t("text_da_hieu"),
        status: true,
      });
      yield put(
        accountAction.updateSpecialNameActionError(
          new Error(response.Message || "API Error")
        )
      );
    }
  } catch (error: unknown) {
    eventBus.emit("showAlert", {
      message: error,
      title: `Thay đổi nickname thất bại`,
      icon: "error",
      textAction: t("text_da_hieu"),
      status: true,
    });
    if (error instanceof Error) {
      yield put(accountAction.updateSpecialNameActionError(error));
    }
  }
}

export default function* accountSaga() {
  yield takeLatest(
    `${ACCOUNT_INFO_PREFIX}/getAccountInfoAction`,
    fetchAccountInfo
  );
  yield takeLatest(
    `${ACCOUNT_INFO_PREFIX}/changeAvatarAction`,
    changeAvatarSaga
  );
  yield takeLatest(
    `${ACCOUNT_INFO_PREFIX}/updateSpecialNameAction`,
    updateSpecialNameSaga
  );
}
