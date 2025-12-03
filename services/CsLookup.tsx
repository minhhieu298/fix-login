import { callApi } from "@/libs/http/http-common";
export const getCsLookupCs = async () => {
  return callApi({
    url: "/sg/api/gateway/v2/report/fee_list",
    method: "GET",
  });
};
export const getCsMarginT = async () => {
  return callApi({
    url: "/sg/api/gateway/v1/report/introduce_fee",
    method: "GET",
  });
};
export const CheckFeeGTCD = async () => {
  return callApi({
    url: "/sg/api/gateway/v1/dvkh/transaction_status",
    method: "GET",
  });
};
export const getPhiAccount = async () => {
  return callApi({
    url: "/sg/api/gateway/v1/report/client_cash_detail",
    method: "GET",
  });
};
