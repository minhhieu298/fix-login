import { callApi } from "@/libs/http/http-common";

interface BeneficiaryStatus {
  ClientCode: string;
  NoLimit: number;
  Rows: number;
}

// dùng để lấy dùng liệu tk là hạn chế hay không hạn chế
export async function GetBeneficiaryStatus() {
  const response = await callApi<BeneficiaryStatus>({
    url: `/sg/api/gateway/v1/transfer/check_nolimit`,
  });
  return response;
}
