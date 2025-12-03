import { IResponseData } from "../interface";

export interface IFormOTP {
  open: boolean;
  onClose: () => void;
  verifyOTP: (_otp: string) => Promise<boolean>; //hàm để xác thực OTP
  resendOTP: (_otp: string) => Promise<boolean>;
  data: IOTP; // data từ OTP trả ra để tính time có thể resend lại
  onChange?: (_v: number) => void;
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
}

export type ISetTranding1by1 = {
  DateEnd?: string;
  TimeExpire: number;
};
export interface IInputOTP2FA {
  OTP: string;
  BusinessType?: number;
}

export type IResponseOTP = IResponseData<IOTP>;
