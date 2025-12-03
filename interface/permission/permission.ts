export interface IPermissionResponse {
  PRODUCTTYPE: string;
  STATUS: string;
}
export interface IPermissionData {
  Data: IPermissionResponse[];
}
export interface IPermissionTplusData {
  ClientCode: string;
  returncode: number;
  returnstatus: string;
}

export interface IAssetReportOverview {
  PurchasingPowerTotal: number;
  CashAmount: number;
  AdvanceAmount: number;
  RemainingSecurities_leveragedbuyingpower: number;
  PendingBuyCash: number;
  MatchedBuyCash: number;
  TransferringAmount: number;
  RemainingCashAmount: number;
  RemainingDebt: number;
  IntradayDebt: number;
  DebtInterest: number;
  ReceivableCashT0: number;
  ReceivableCashT1: number;
  ReceivableCashT2: number;
  ReceivableMatureCW: number;
  ReceivableCashOther: number;
  ReceivableCashTotal: number;
  ReceivableCashOddlot: number;
  ReceivableCashDevidend: number;
  Fees: number;
  FSaving: number;
  SavingTotal: number;
  NetAssetValue: number;
  DateTime: string;
}
