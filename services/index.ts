import { ISettingResponse } from "@/interface/setting/interface";
import { callApi } from "@/libs/http/http-common";

export const getTokenDetail = async () => {
  return callApi({
    url: "/sg/api/gateway/v1/account/token",
    method: "GET",
  });
};
export const getTokenLogs = async (from: string, to: string) => {
  return callApi({
    url: `/sg/api/gateway/v1/account/token/history?fromdate=${from}&todate=${to}`,
    method: "GET",
  });
};

// function getFirstCookieByName(cookieName: string) {
//   const cookies = document.cookie.split(";");
//   for (const cookie of cookies) {
//     const [name, value] = cookie.trim().split("=");
//     if (name === cookieName) {
//       return value;
//     }
//   }
//   return null;
// }

export const getSetting = async () => {
  return callApi({
    url: "/sg/api/gateway/v1/account/setting",
    method: "GET",
  });
};

export const postSetting = async (data: ISettingResponse) => {
  return callApi({
    url: "/sg/api/gateway/v1/account/setting",
    method: "POST",
    data,
  });
};

export const getAccountInfo = async () => {
  return callApi({
    url: "/sg/api/gateway/v2/open/dvkh/client_info",
    method: "GET",
  });
};

export function updateChangeAvatar(file: File) {
  const formData = new FormData();
  formData.append("avatarImg", file);
  return callApi<File>({
    url: `/sg/api/gateway/v1/open/change_avatar`,
    method: "POST",
    data: formData,
  });
}

export const updateSpecialName = async (name: string) => {
  return callApi({
    url: `/sg/api/gateway/v1/open/change_nickname`,
    method: "POST",
    data: {
      specialName: name,
    },
  });
};
