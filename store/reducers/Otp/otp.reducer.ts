import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IAuthenMethod, IOTP } from "@/interface/otp/interface";

const initialState = {
  timer: {} as IOTP,
  authenticationMethod: {} as IAuthenMethod,
  error: {
    message: "",
  },
};

const OTPSlice = createSlice({
  name: "GET_TIME_OTP",
  initialState,
  reducers: {
    getMethodOTP: (state, action: PayloadAction<IAuthenMethod>) => {
      state.authenticationMethod = action.payload;
    },
  },
});

export const OTPAction = OTPSlice.actions;

const OTPReducer = OTPSlice.reducer;

export default OTPReducer;
