import { IResponseData } from "../interface";

export interface IErrorCache {
  AERRORCODE: string | number;
  AMESSAGEVN: string;
  AMESSAGEEN: string;
  AHOLDER: string;
  AID?: number;
  AMESSAGE_VN: string;
  AMESSAGE_EN: string;
}
export type IResponseErrorCache = IResponseData<IErrorCache>;

export interface ICacheStockCS {
  Code: string;
  Exchange: number;
  ScripName: string;
  Basic_Price: number;
  Ceiling_Price: number;
  Floor_Price: number;
  Stock_Type2: number;
  ScripNameEN: string;
  ID: string;
}

export interface ICacheStockPS {
  astockcode: string;
  aderivativescode: string;
  aderivativescodekrx: string;
  abasiccod: string;
}
