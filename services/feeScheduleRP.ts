import { callApi } from "@/libs/http/http-common";

export const getFeeScheduleRP = async (from_date: string, to_date: string) => {
  return callApi({
    url: `/sg/api/gateway/v1/report/fee-trade?from_date=${from_date}&to_date=${to_date}`,
    method: "GET",
  });
};

export const getFeeType = async (
  from_date: string,
  to_date: string,
  status: string,
  ptype: string
) => {
  return callApi({
    url: `/sg/api/gateway/v1/report/feecharge?fromdate=${from_date}&todate=${to_date}&status=${status}&ptype=${ptype}`,
    method: "GET",
  });
};

export const getFeeDerivative = async (
  from_date: string,
  to_date: string,
  type: string
) => {
  return callApi({
    url: `/fg/api/gateway/v1/report/fee-tax?status=-1&fromDate=${from_date}&toDate=${to_date}&type=${type}`,
    method: "GET",
  });
};

export const getMoneyTrans = async (type: number) => {
  return callApi({
    url: `/sg/api/gateway/v1/report/cash-inday?type=${type}&status=-1`,
    method: "GET",
  });
};
