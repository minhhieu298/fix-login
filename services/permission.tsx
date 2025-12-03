import { callApi } from "@/libs/http/http-common";
export const getPermission = async () => {
  return callApi({
    url: "/sg/api/gateway/v1/open/permission",
    method: "GET",
  });
};
export const getPermissionTplus = async () => {
  return callApi({
    url: "/sg/api/gateway/v1/mar/tplus/client_use",
    method: "GET",
  });
};
