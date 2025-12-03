"use client";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { IResponseLogin } from "@/interface/interface";
import { AuthAction } from "@/store/reducers/Login/login.reducer";
import { settingAction } from "@/store/reducers/setting.reducer";

const LayoutSession = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const href = searchParams.get("href");
  const redirect = searchParams.get("redirect");
  const pathname = router.pathname;
  const dispatch = useDispatch();
  const userInfo2FA = useSelector(
    (state: {
      AuthReducer: {
        userInfo2FA: IResponseLogin;
      };
    }) => state.AuthReducer.userInfo2FA
  );

  useEffect(() => {
    if (!router.isReady) return;

    if (userInfo2FA.Code === -123456) {
      dispatch(settingAction.openSetting(false));
      if (href === "forgot-password") {
        dispatch(AuthAction.showForm(true));
        return;
      }
      if (href === "login") {
        dispatch(AuthAction.showForm(true));
        return;
      }
      if (pathname !== "/") {
        router.push({
          pathname: "/",
          query: { href: "login", redirect: pathname || "" },
        });
      }
    } else {
      if (userInfo2FA.Code === 0) {
        dispatch(AuthAction.showForm(false));
        if (href === "login" && redirect) {
          router.push({
            pathname: redirect,
          });
        }
      }
    }
  }, [userInfo2FA.Code, pathname, href, redirect]);

  return <>{children}</>;
};

export default LayoutSession;
