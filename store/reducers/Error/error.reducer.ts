import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  modal: false,
  errorCache: [],
  loading: false,
  error: {
    msg: "",
  },
};

const ErrorSlice = createSlice({
  name: "GET_ERROR_INFO",
  initialState,
  reducers: {
    getError: (state) => {
      state.loading = true;
    },
    getErrorSuccess: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.errorCache = action.payload;
    },
    getErrorFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const ErrorAction = ErrorSlice.actions;

const ErrorReducer = ErrorSlice.reducer;
export default ErrorReducer;
