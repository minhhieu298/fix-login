import { FEESms, IPackFeeSMS, IResponseData } from "@/interface/interface";
import { callApi } from "@/libs/http/http-common";

export async function getPackFee(): Promise<
  IResponseData<{ Table: FEESms[] }>
> {
  const response = await callApi<{ Table: FEESms[] }>({
    url: "/sg/api/gateway/v1/margin/packfee_sms?feetype=SMS",
    method: "GET",
  });
  return response;
}

export async function getStatusFee(): Promise<IResponseData<IPackFeeSMS>> {
  const response = await callApi<IPackFeeSMS>({
    url: "/sg/api/gateway/v1/dvkh/check_feesms",
    method: "GET",
  });
  return response;
}
