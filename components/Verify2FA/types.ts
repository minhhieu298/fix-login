import { IResponseData } from "@/interface/interface";

export interface IFormOTP {
  open: boolean;
  onClose: () => void;
  //hàm để xác thực OTP
  verifyOTP: (_otp: string) => Promise<boolean>;
  // data từ OTP trả ra để tính time có thể resend lại
  data: IOTP;
  resendOTP: (_otp: string) => Promise<boolean>;
}

export interface IOTP {
  timeExpire?: string;
  timeReSend?: string;
  dateCreate?: string;
  sendTimes?: number;
  retryTimesMax?: number;
  currentTime?: string;
  countOtpFalse?: number;
}

export interface IAuthenMethod {
  Email: string;
  SMS: string;
  ATRANSACTION: number;
  ClientName: string;
}

export interface IInputOTP {
  ATRANSACTION: number;
  SMS: string;
  Email: string;
  templateIndex?: number;
  ClientName: string;
  BusinessType?: number;
}

export type ISetTranding1by1 = {
  DateEnd?: string;
  TimeExpire: number;
};
export interface IInputOTP2FA {
  OTP: string;
  SetTradingPass1By1: ISetTranding1by1;
}

export type IResponseOTP = IResponseData<IOTP>;

export interface FormValue {
  OTP: string;
}
