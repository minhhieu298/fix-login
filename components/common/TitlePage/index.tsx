import Head from "next/head";
import { useSearchParams } from "next/navigation";
import React from "react";

const Hermet = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  const searchParams = useSearchParams();
  const href = searchParams.get("href");
  return (
    <>
      <Head key={href}>
        <title>
          {href === "login"
            ? "Đăng nhập"
            : href === "forgot-password"
              ? "Quên mật khẩu"
              : title}
        </title>
      </Head>
      {children}
    </>
  );
};

export default Hermet;
