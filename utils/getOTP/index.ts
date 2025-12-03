import axios from "axios";

import { IInputOTP, IOTP } from "@/components/FormOTP/types";
import { IInputOTP2FA, IResponseOTP } from "@/interface/otp/interface";
import { callApi } from "@/libs/http/http-common";

//dùng để xác thực và send otp 2fa
//chỉ dùng cho 2fa ko dùng để send otp bình thường
export async function VerifyOTP2FA(data: IInputOTP2FA): Promise<IResponseOTP> {
  // const reponse = await axios.post(
  //   `${process.env.NEXT_PUBLIC_NEXT_DOMAIN_GATEWAYS}/sg/api/gateway/v1/Account/smartOTP/verify/tradingpass`,
  //   data,
  //   {
  //     headers: {
  //       Authorization: jwt,
  //     },
  //   }
  // );
  const response = await callApi<IOTP>({
    data: data,
    method: "POST",
    url: `/sg/api/gateway/v1/Account/smartOTP/verify/tradingpass`,
  });
  // const res: IResponseOTP = reponse.data;
  return response;
}

//dùng để lấy OTP khi đã login thành công
// bao gồm đã xác thực 2 lớp
export async function VerifyOTP(
  data: IInputOTP,
  jwt: string
): Promise<IResponseOTP> {
  const reponse = await axios.post(
    `${process.env.NEXT_PUBLIC_NEXT_DOMAIN_GATEWAYS}/sg/api/gateway/v1/Account/smartOTP/send_otp`,
    data,
    {
      headers: {
        Authorization: jwt,
      },
    }
  );
  const res: IResponseOTP = reponse.data;
  return res;
}
