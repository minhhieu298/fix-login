import { PayloadAction } from "@reduxjs/toolkit";
import { SagaIterator } from "redux-saga";
import { call, put, takeLatest } from "redux-saga/effects";

import { ISendCommentInput } from "@/interface/comments/interface";
import {
  getComments,
  getCommentsHistory as fetchCommentsHistory,
  sendComments,
} from "@/services/comments";

import { COMMENTS_SLICE } from "../contants";
import { commentsActions } from "../reducers/comments.reducers";

function* fetchListComments(): SagaIterator {
  try {
    const response = yield call(getComments);
    if (response.Code === 0) {
      yield put(commentsActions.getCommentsSuccess(response.Data));
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      yield put(commentsActions.getCommentsFailure(error));
    }
  }
}
function* sendComment(action: PayloadAction<ISendCommentInput>): SagaIterator {
  try {
    const response = yield call(sendComments, action.payload);
    if (response.Code === 0) {
      yield put(commentsActions.sendCommentSuccess(response.Data));
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      yield put(commentsActions.sendCommentFailure(error));
    }
  }
}
function* getCommentsHistory(
  action: PayloadAction<{
    from_date: string;
    to_date: string;
    type: number;
    stt: number;
  }>
): SagaIterator {
  try {
    const response = yield call(
      fetchCommentsHistory,
      action.payload.from_date,
      action.payload.to_date,
      action.payload.type,
      action.payload.stt
    );
    if (response.Code === 0) {
      yield put(commentsActions.getCommentsHistorySuccess(response.Data));
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      yield put(commentsActions.getCommentsHistoryFailure(error));
    }
  }
}

export default function* commentsSaga() {
  yield takeLatest(`${COMMENTS_SLICE}/getCommentsAction`, fetchListComments);
  yield takeLatest(`${COMMENTS_SLICE}/sendCommentAction`, sendComment);
  yield takeLatest(
    `${COMMENTS_SLICE}/getCommentsHistoryAction`,
    getCommentsHistory
  );
}
