import {
  ICacheStockCS,
  IErrorCache,
  IResponseErrorCache,
} from "@/interface/cache/interface";
import { callApi } from "@/libs/http/http-common";

export async function getCacheError(
  code: string
): Promise<IResponseErrorCache> {
  const response = await callApi<IErrorCache>({
    url: `/sg/api/gateway/v1/cache/error_code/eztrade?code=${code}`,
    method: "GET",
  });
  return response;
}

export function getErrorMsgAuthen(
  erroCode: string | number,
  data: IErrorCache[],
  lang: string = "VN"
): string {
  let str: string = "";
  const msg = data.find((item) => item.AERRORCODE === erroCode);
  if (msg) {
    if (lang === "EN") {
      str = msg.AMESSAGEEN;
    } else {
      str = msg.AMESSAGEVN;
    }
  }
  return str;
}

export async function getCacheStockCS() {
  const response = await callApi<ICacheStockCS>({
    url: `/sg/api/gateway/v1/cache/stock_info_cn/eztrade`,
    method: "GET",
  });
  return response;
}

export async function getCacheStockPS() {
  const response = await fetch(
    `https://chart.fpts.com.vn/chart3api/getderivativescode`
  );
  return response.json();
}
