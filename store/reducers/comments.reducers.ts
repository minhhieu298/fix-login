import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { COMMENTS_SLICE } from "../contants";

const initialState = {
  isLoading: false,
  comments: [],
  sendComment: {
    isLoading: false,
    error: {
      ErrorCode: 0,
      ErrorMess: "",
    },
  },
  commentsHistory: [],
  error: {
    message: "",
  },
};

const commentsSlice = createSlice({
  name: COMMENTS_SLICE,
  initialState,
  reducers: {
    getCommentsAction: (state) => {
      state.isLoading = true;
    },
    getCommentsSuccess: (state, action) => {
      state.isLoading = false;
      state.comments = action.payload;
    },
    getCommentsFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    sendCommentAction: (state, _action) => {
      state.sendComment.isLoading = true;
    },
    sendCommentSuccess: (state, action) => {
      state.sendComment.isLoading = false;
      state.sendComment.error = action.payload;
    },
    sendCommentFailure: (state, action) => {
      state.sendComment.isLoading = false;
      state.sendComment.error = action.payload;
    },
    getCommentsHistoryAction: (
      state,
      _action: PayloadAction<{
        from_date: string;
        to_date: string;
        type: number;
        stt: number;
      }>
    ) => {
      state.isLoading = true;
    },
    getCommentsHistorySuccess: (state, action) => {
      state.isLoading = false;
      state.commentsHistory = action.payload;
    },
    getCommentsHistoryFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const commentsActions = commentsSlice.actions;

const commentsReducer = commentsSlice.reducer;

export default commentsReducer;
