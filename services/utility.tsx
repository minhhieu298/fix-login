import { callApi } from "@/libs/http/http-common";

export const getSmsRateApi = async () => {
  return callApi({
    url: `/sg/api/gateway/v1/margin/packfee_sms?feetype=SMS`,
    method: "GET",
  });
};
