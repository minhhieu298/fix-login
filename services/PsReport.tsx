import { callApi } from "@/libs/http/http-common";
export const getPsReportPs = async () => {
  return callApi({
    url: "/fg/api/gateway/v1/report/detail",
    method: "GET",
  });
};

export const getCsReportCs = async () => {
  return callApi({
    url: "/sg/api/gateway/v1/report/trans_banlance?type=0",
    method: "GET",
  });
};
export const getStockReportStock = async () => {
  return callApi({
    url: "/sg/api/gateway/v1/report/trans_banlance?type=1",
    method: "GET",
  });
};
export const getPsReportPsVt = async (fromDate: string, toDate: string) => {
  return callApi({
    url: `fg/api/gateway/v1/report/profit-loss/nav?fromDate=${fromDate}&toDate=${toDate}`,
    method: "GET",
  });
};
export const getChartStaticData = async (
  from_date: string,
  to_date: string
) => {
  return callApi({
    url: `/sg/api/gateway/v2/report/nav-chart?fromDate=${from_date}&toDate=${to_date}`,
    method: "GET",
  });
};
export const getChartStaticDataPs = async (
  fromdate: string,
  todate: string
) => {
  return callApi({
    url: `/fg/api/gateway/v1/report/profit-loss/nav?fromdate=${fromdate}&todate=${todate}`,
    method: "GET",
  });
};
