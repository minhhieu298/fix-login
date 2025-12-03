import { NextResponse } from "next/server";

export function middleware() {
  const response = NextResponse.next();
  // if (process.env.NODE_ENV === "production") {
  //   response.headers.append(
  //     "Set-Cookie",
  //     `aspfpt_sessiontoken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; `
  //   );
  //   response.cookies.set({
  //     name: "aspfpt_sessiontoken",
  //     expires: new Date(0),
  //     value: "",
  //     path: "/",
  //   });

  //   // Delete a cookie
  //   // response.cookies.delete("aspfpt_sessiontoken");
  // }

  return response;
}
