import * as Sentry from "@sentry/nextjs";
import { deleteCookie, setCookie } from "cookies-next";
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next";

import { IResponseLogin } from "@/interface/interface";

import { checkSessionServerSide } from ".";

export interface WithSessionProps {
  data: IResponseLogin;
}

export function withSession<P extends WithSessionProps>(
  getServerSidePropsFunc?: GetServerSideProps<P>
): GetServerSideProps<P> {
  return async (
    context: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<P>> => {
    const { req, res } = context;

    // Xoá cookie trùng lặp (chỉ ở production)
    if (process.env.NODE_ENV === "production") {
      res.setHeader("Set-Cookie", [
        `aspfpt_sessiontoken=; Path=/; Domain=${req.headers.host}; Expires=Thu, 01 Jan 1970 00:00:00 GMT;`,
      ]);
    }
    const start = performance.now();

    const token = req.cookies.aspfpt_sessiontoken;
    let data: IResponseLogin;
    if (token) {
      // Gọi checkSessionServerSide để lấy về IResponseLogin
      data = await checkSessionServerSide(token);
      if (data.Code === -56987) {
        deleteCookie("aspfpt_sessiontoken", {
          domain: process.env.NODE_ENV === "production" ? ".fpts.com.vn" : "",
        });
        const client = Sentry.getClient();
        if (client) {
          const replayIntegration = client.getIntegrationByName("Replay") as {
            stop?: () => Promise<void>;
          };
          if (
            replayIntegration &&
            typeof replayIntegration.stop === "function"
          ) {
            await replayIntegration.stop();
          }
        }
      } else {
        Sentry.addBreadcrumb({
          category: "session",
          message: "Check session",
          level: "info",
          data: {
            responseData: data,
          },
        });
        setCookie("aspfpt_sessiontoken", data.Data?.Jwt, {
          domain: process.env.NODE_ENV === "production" ? ".fpts.com.vn" : "",
        });
      }
    } else {
      data = {
        Code: -123456,
        Data: null,
        Message: "",
      };
    }
    const end = performance.now();
    Sentry.addBreadcrumb({
      category: "session",
      message: "Check session",
      level: "info",
      data: {
        host: req.headers.host,
        enviroments: process.env.NODE_ENV,
        token: req.cookies.aspfpt_sessiontoken,
        responseData: data,
        api: `${process.env.NEXT_PUBLIC_NEXT_DOMAIN_GATEWAYS}/sg/api/gateway/v1/account/check_session`,
        time: `Thời gian thực thi: ${(end - start).toFixed(2)}ms`,
        fullCookie: req.cookies,
      },
    });

    // Nếu page không cần thêm props gì, chỉ trả data
    if (!getServerSidePropsFunc) {
      return {
        props: { data } as P,
      };
    }

    // Nếu page có muốn thêm payload khác, gọi getServerSidePropsFunc tiếp
    const result = await getServerSidePropsFunc({
      ...context,
      // bổ sung data vào context nếu cần
    } as GetServerSidePropsContext & { data: IResponseLogin });

    // Nếu getServerSidePropsFunc tự redirect hay trả notFound thì giữ nguyên
    if ("redirect" in result || "notFound" in result) {
      return result;
    }

    // Kết hợp data chung và props riêng của page
    return {
      props: {
        data,
        ...(result.props || {}),
      } as P,
    };
  };
}
