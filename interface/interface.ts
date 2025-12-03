import { HTMLAttributes, ReactNode } from "react";

import { ISetTranding1by1 } from "./otp/interface";

export interface IResponseData<T> {
  Code: number | string;
  Message: string;
  Data: T | null;
  error?: string;
}

export interface ITokenList {
  TokenList: Array<IDataTokenDetail>;
}

export interface IDataTokenDetail {
  tokenCodeInterval: string;
  tokenCodeLength: string;
  dateTokenStart: string;
  dateTokenAssigned: string;
  datePinModified: string;
  dateTokenShutdown: string;
  dateLastLogin: string;
  lastUpdatedOn: string;
  serialNumber: string;
  nextTokenCodeMode: string;
  pinIsSet: string;
  pinType: string;
}

export interface ILogin {
  ATRANSACTION: number;
  Activity: string;
  ActivityDesc: string;
  Adomestic: number;
  Areason: number;
  Arsatokenupddesc: string;
  Arsatokenupdtype: string;
  Asupportpass: number;
  Aupdtbtntype: string;
  Aupduser: string;
  Avatar: string;
  Brkid: string;
  Browser: string;
  BrowserName: string;
  BrowserVers: string;
  CheckPass2: number;
  CheckSession: number;
  CheckTradingPassword: number;
  ClientCode: string;
  ClientName: string;
  CostCenter: number;
  CountOtpFalse: number;
  Device: string;
  Email: string;
  ErrorCode: number;
  IntResult: number;
  IpClient: string;
  IpServer: string;
  IsCheckSessionSuccess: boolean;
  IsFirstLogin: boolean;
  IsMobile: boolean;
  IsRsaTokenTradingPassword: boolean;
  Jwt: string;
  Language: string;
  Login2FA: number;
  LoginName: string;
  LoginStatus: number;
  Message: string;
  NewPass: string;
  NewTradePass: string;
  OTP: string;
  OTPVerifed: number;
  OldPass: string;
  OldTradePass: string;
  Password: string;
  Permit: string;
  Referer: string;
  RsaMessage: string;
  RsaResult: number;
  RsaToken: number;
  SMS: string;
  SessionNo: string;
  SessionToken: string;
  SetTradingPass1By1: ISetTranding1by1;
  ShortName: string;
  Source: string;
  StattusOtp: number;
  TimeExprire1By1: number;
  TimeServer: string;
  TradingPass1By1: number;
  TradingPassword: string;
  TypeAccount: number;
  TypeOtp: string;
  UserAgent: string;
  emailOTP: string;
  fromDate: string;
  smsOTP: string;
  toDate: string;
  ExpireTimePassword: string;
}

export type IResponseLogin = IResponseData<ILogin>;

export interface IForgotPwd {
  ACLIENTCODE: string;
  AEMAIL: string;
  AMOBILE: string;
  ANAME: string;
  ATRANSACTION: number;
}

export interface IPostForgotPwd extends IForgotPwd {
  IDCard: string;
  Contact: string;
}

export type IResponsePwd = IResponseData<IForgotPwd>;

export type IErrorPopup = {
  title: string;
  msg: string;
  actionButton: ReactNode;
  icon: ReactNode;
};

export type TLoginContext = {
  ClientCode: string;
  ClientName: string;
  IDCard: string;
  Contact: string;
  handleValue: (_obj: Partial<TLoginContext>) => void;
  alert: boolean;
  setAlert: (_: boolean) => void;
  ATRANSACTION: number;
  method?: {
    email: string;
    phone: string;
    ATRANSACTION: number;
    ClientName: string;
  };
  err: IErrorPopup;
  setErr: (_: IErrorPopup) => void;
};

export interface ISettings {
  Setting?: string | null;
}

export interface ErrorResponse {
  Code: number;
  Message: string;

  Data: any;
}

export type IDataAlert = {
  icon: ReactNode;
  title: string;
  msg: string;
  btn: ReactNode;
};

export interface IDataTokenLogs {
  out_action2_key: string;
  out_local_log_time: string;
  out_serial: string;
}

export interface IFeeSMSDetail {
  clientCode: string;
  feeValue: number;
  month: string;
  status: number;
  statusText: string;
  refId: string;
  instanceNo: number;
  payDate: string;
}

export interface IFeeLKDetail {
  ACHARGE: number;
  ADATESUM: string;
  ADATESUM1: string;
  ADPID: string;
  ASTATUS: number;
  ASTATUS1: string;
  LOAICK: string;
  LOAICK1: number;
  SL: string;
  amodifieddate: string;
  AFEETYPE?: string;
}

export interface IFeeDetail {
  ACLIENTCODE: string;
  ADESC: string;
  ACHARGE: number;
  ATYPE: string;
  NGAYGD: string;
  AFEETYPE?: string;
}

export interface IFeeTVDTDetail {
  ClientCode: string;
  FeeRate: number;
  Desc: string;
  Type: number;
  TradingDay: string;
}

export interface IFeeDerivativeDetail {
  clientCode: string;
  content: string;
  type: number;
  price: number;
  tradeDate: string;
}

export interface StockInfo {
  RowID: string;
  Info: Array<[number, string | number]>;
}

export type IStockData = StockInfo[];

export type IComponentProps<E = HTMLElement> = HTMLAttributes<E> & {
  width?: number;
  height?: number;
  color?: string;
  viewBox?: string;
};

export interface FEESms {
  SMSTYPE: number;
  FEECODE: string;
  FEERATE: number;
}

export interface IPackFeeSMS {
  acustaccount: string;
  aaccstate: number;
  aorgtype: number;
  atypeacc: number;
  adomestic: number;
  astatuscontract: number;
  aname: string;
  alongname: string;
  aaddresscost: number;
  amobile: string;
  aemail: string;
  aidentifynumber: string;
  aplaceissue: string;
  adateissue: string;
  atypedoc: number;
  aaddress: string;
  atel: string;
  asex: number;
  atradingcode: string;
  atradingcodedateiss: string;
  acostcenter: number;
  atrade_ezfutures: 5;
  aresult_sms: string;
  asms_fee_balance: number;
  asms_fee_fluctuations: number;
  asms_fee_result: number;
  asms_fee_result_2: number;
  asms_fee_rights: number;
  asms_free_margin: number;
  asms_free_fpts: number;
  atrade_advance: number;
  apackage_smsotp: number;
  acustype: number;
  acname: string;
  asaoke_vat_email: string;
  asubcstcen: string;
  abrkid: string;
  asid: string;
  ainvestorcode: string;
  atrade_fsavings: number;
  blockinfo: {
    blockIdentify: number;
    blockMapping: number;
  };
}
