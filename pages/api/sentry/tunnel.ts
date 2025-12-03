/* eslint-disable no-console */
import * as Sentry from "@sentry/nextjs";
import { HttpsProxyAgent } from "https-proxy-agent";
import { NextApiRequest, NextApiResponse } from "next";
import getRawBody from "raw-body";

import { callApi } from "@/libs/http/http-common";

export const config = { api: { bodyParser: false } };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const rawBody = await getRawBody(req);

    const upstreamUrl = `https://sentry.fpts.com.vn/api/${process.env.NEXT_PUBLIC_SENTRY_ID}/envelope/?sentry_version=7&sentry_key=${process.env.NEXT_PUBLIC_SENTRY_KEY}&sentry_client=sentry.javascript.nextjs%2F10.10.0`;

    Sentry.addBreadcrumb({
      category: "sentry",
      message: "Sentry tunnel",
      level: "info",
      data: {
        id: process.env.NEXT_PUBLIC_SENTRY_ID,
        key: process.env.NEXT_PUBLIC_SENTRY_KEY,
      },
    });
    // Nếu có proxy thì dùng, không thì bỏ
    const agent = new HttpsProxyAgent("http://10.26.2.55:8080");

    const headers: Record<string, string> = {};
    if (req.headers["content-type"]) {
      headers["content-type"] = String(req.headers["content-type"]);
    }
    headers["content-length"] = String(rawBody.length);

    const response = await callApi<string, Buffer>({
      url: upstreamUrl,
      method: "POST",
      data: rawBody,
      headers,
      returnRawResponse: true,
      axiosConfig: {
        httpsAgent: agent,
        responseType: "text",
        transformRequest: [(body: Buffer) => body],
        transformResponse: [(data: string) => data],
        maxBodyLength: Infinity,
        maxContentLength: Infinity,
      },
    });

    const text = response.data;

    // Trả về đúng status mà Sentry gửi về
    res.status(response.status).json({
      ok: response.status >= 200 && response.status < 300,
      status: response.status,
      response: text,
    });
  } catch (err) {
    console.error("sentry tunnel error:", err);
    res.status(500).json({ error: "internal", msg: String(err) });
  }
}
