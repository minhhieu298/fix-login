import { ILogin, IResponseLogin } from "@/interface/interface";
import { callApi } from "@/libs/http/http-common";

//hàm dùng để gọi ở getServerSide
export async function checkSessionServerSide(
  jwt: string
): Promise<IResponseLogin> {
  try {
    const reponse = await fetch(
      `${process.env.NEXT_PUBLIC_NEXT_DOMAIN_GATEWAYS}/sg/api/gateway/v1/account/check_session`,
      {
        method: "POST",
        body: JSON.stringify({}),
        headers: {
          Authorization: jwt,
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );

    const data: IResponseLogin = await reponse.json();
    return data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    throw error;
  }
}

//hàm gọi kiểm tra với từng màn hình
// check session
export async function checkSession(): Promise<IResponseLogin> {
  const response = await callApi<ILogin>({
    url: "/sg/api/gateway/v1/account/check_session",
    method: "POST",
  });
  return response;
}
