import { callApi } from "@/libs/http/http-common";
export const getSavingReport = async () => {
  return callApi({
    url: "/sg/api/gateway/v1/transfer/term-deposit-for-asset?FlagTime=0",
    method: "GET",
  });
};
