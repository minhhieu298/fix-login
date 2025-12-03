import { deleteCookie } from "cookies-next";

import { ILogin, IResponseLogin } from "@/interface/interface";
import { callApi } from "@/libs/http/http-common";
import { broadcastLogout, markLogout } from "@/utils/hook/useCookieChecker";

export async function Logout(): Promise<IResponseLogin> {
  // Đánh dấu tab này đang logout để không reload
  markLogout();

  const response = await callApi<ILogin>({
    url: "/sg/api/gateway/v1/account/logout",
    method: "POST",
  });
  if (response.Code === 0) {
    deleteCookie("aspfpt_sessiontoken", {
      domain: process.env.NODE_ENV === "production" ? ".fpts.com.vn" : "",
      path: "",
    });
    // Broadcast ngay lập tức cho các tab khác biết đã logout
    broadcastLogout();
    return {
      Code: -123456,
      Message: "SUCCESS",
      Data: null,
    };
  }
  return {
    Code: -123456,
    Message: "SUCCESS",
    Data: null,
  };
}
