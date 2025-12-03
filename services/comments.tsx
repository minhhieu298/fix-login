import { ISendCommentInput } from "@/interface/comments/interface";
import { callApi } from "@/libs/http/http-common";
export const getComments = async () => {
  return callApi({
    url: "/sg/api/gateway/v2/open/comment",
    method: "GET",
  });
};
export const sendComments = async (data: ISendCommentInput) => {
  return callApi({
    url: "/sg/api/gateway/v2/open/comment",
    method: "POST",
    data,
  });
};
export const getCommentsHistory = async (
  from_date: string,
  to_date: string,
  type: number,
  stt: number
) => {
  return callApi({
    url: `/sg/api/gateway/v1/open/hist_comment?fromdate=${from_date}&todate=${to_date}&type=${type}&stt=${stt}`,
    method: "GET",
  });
};
