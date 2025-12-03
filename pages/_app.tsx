import "@/i18n/i18n";
import "@/styles/globals.css";
import "@fontsource-variable/manrope";

import {
  StyledEngineProvider,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material";
import { AppCacheProvider } from "@mui/material-nextjs/v15-pagesRouter";
import * as Sentry from "@sentry/nextjs";
import { deleteCookie } from "cookies-next";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import {
  ReactElement,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";
import { Provider, useDispatch, useSelector } from "react-redux";

import ConfirmModal from "@/components/common/modal/ConfirmModal";
import MessageModal from "@/components/common/modal/MessageModal";
import { IOTP } from "@/components/FormOTP/types";
import Layout from "@/components/Layout";
import ChangePassFirstLogin from "@/components/Login/view/ChangePassFirstLogin";
import CustomToastMsg from "@/components/ToastMsg";
import Verify2FA from "@/components/Verify2FA";
import { ConfigArrayOTP } from "@/constants/Setting/constant";
import { useAuthentication } from "@/hooks/useAuthentication";
import { useCustomLanguage } from "@/hooks/useCustomLanguage";
import { useCustomTheme } from "@/hooks/useCustomTheme";
import { usePusher } from "@/hooks/usePusher";
import { IErrorCache } from "@/interface/cache/interface";
import { ILogin, IResponseLogin } from "@/interface/interface";
import { IInputOTP2FA, IResponseOTP } from "@/interface/otp/interface";
import { getJwtToken } from "@/libs/http/http-common";
import { store } from "@/libs/redux/store";
import { AuthAction } from "@/store/reducers/Login/login.reducer";
import { OTPAction } from "@/store/reducers/Otp/otp.reducer";
import { permissionActions } from "@/store/reducers/permission.reducers";
import { pusherActions } from "@/store/reducers/pusher.reducers";
import eventBus from "@/utils/event";
import { handleMsgOTP } from "@/utils/getErrorOTP";
import { VerifyOTP2FA } from "@/utils/getOTP";
import { useCookieChecker } from "@/utils/hook/useCookieChecker";
import { Logout } from "@/utils/logout";

const MainLayoutSSR = dynamic(() => import("@/components/Layout/MainLayout"), {
  ssr: false,
});

const LoginPageSSR = dynamic(
  () => import("@/components/Login/layout/LoginPage"),
  {
    ssr: false,
  }
);

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (_page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
  pageProps: {
    data: IResponseLogin;
    // …còn có thể thêm props khác từ từng page
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  };
};

function InnerApp({ Component, pageProps }: AppPropsWithLayout) {
  const dispatch = useDispatch();
  const { muiTheme, emotionCache } = useCustomTheme();
  const router = useRouter();
  const searchParams = useSearchParams();
  const refresh = useAuthentication();

  // Khởi tạo Pusher connection cho realtime updates
  usePusher();

  // Khởi tạo cookie checker worker
  const { updateCookie } = useCookieChecker({
    cookieName: "aspfpt_sessiontoken",
    interval: 10000, // 10 giây
    enabled: true,
  });

  const userInfo2FA = useSelector(
    (state: {
      AuthReducer: {
        userInfo2FA: IResponseLogin;
      };
    }) => state.AuthReducer.userInfo2FA
  );

  const errorCode = useSelector(
    (state: {
      ErrorReducer: {
        errorCache: {
          account: IErrorCache[];
        };
      };
    }) => state.ErrorReducer.errorCache.account
  );

  const [resultOTP, setResultOTP] = useState<IOTP>();
  const { t } = useCustomLanguage();

  const [showOTP, setShowOTP] = useState<boolean>(false);

  //đóng form otp
  const handleClose = useCallback(async () => {
    setShowOTP(false);
    dispatch(AuthAction.showForm(false));
    const response = await Logout();
    if (response.Code === -123456) {
      deleteCookie("aspfpt_sessiontoken", {
        domain: process.env.NODE_ENV === "production" ? ".fpts.com.vn" : "",
        path: "",
      });
      router.replace(
        {
          pathname: window.location.origin,
        },
        undefined,
        { shallow: true }
      );
    } else {
      if (response.Code === 0) {
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
        deleteCookie("aspfpt_sessiontoken", {
          domain: process.env.NODE_ENV === "production" ? ".fpts.com.vn" : "",
          path: "",
        });
      }
    }
    // //dispatch(AuthAction.showForm(true));
    dispatch(AuthAction.setUserInfo2FA(response));
  }, []);

  const handleOTP = (response: IResponseLogin & IResponseOTP) => {
    if (response.Code === 0) {
      // setCookie("aspfpt_sessiontoken", response.Data?.Jwt, {
      //   domain: process.env.NODE_ENV === "production" ? ".fpts.com.vn" : "",
      // });
      setShowOTP(false);
      dispatch(AuthAction.getUserInfo());
      dispatch(AuthAction.showForm(false));
      router.replace(router.asPath.split("?")[0], undefined, { shallow: true });
      return true;
    }

    if (response.Code === 181109) {
      if (response.Data?.countOtpFalse !== -1) {
        setShowOTP(true);
        setResultOTP(response.Data as IOTP);
        handleMsgOTP(0, errorCode);
        return;
      }
    }
    if (ConfigArrayOTP.includes(Number(response.Code))) {
      setShowOTP(true);
      handleMsgOTP(response.Code, errorCode);
      return false;
    }
  };

  const token = getJwtToken();

  useEffect(() => {
    //nhận RID từng nghiệp vụ lưu vào global
    const handler = (id: string) => {
      dispatch(pusherActions.addRIDPusher(id));
    };

    eventBus.on("addRID", handler);
    return () => eventBus.off("addRID", handler);
  }, []);

  useEffect(() => {
    const verifyRefresh = async () => {
      try {
        await refresh();
      } catch {
      } finally {
      }
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    token ? verifyRefresh() : () => {};
    return () => {};
  }, [token]);
  // Xác thực 2fa
  const verifyOTP = useCallback(
    async (otp: string) => {
      if (userInfo2FA?.Data !== null) {
        if (
          userInfo2FA?.Data.ATRANSACTION !== 1 &&
          userInfo2FA?.Data.ATRANSACTION !== 4
        ) {
          const otp2Fa = {
            OTP: otp,
            BusinessType: 50,
          };
          const response = await VerifyOTP2FA(otp2Fa);
          const isSuccess = handleOTP(
            response as IResponseOTP & IResponseLogin
          );
          if (isSuccess) return true;
          return false;
        } else {
          const otp2Fa = {
            OTP: otp,
            BusinessType: 50,
          };
          const response = await VerifyOTP2FA(otp2Fa);
          const isSuccess = handleOTP(
            response as IResponseOTP & IResponseLogin
          );
          if (isSuccess) return true;
          return false;
        }
      }
      return false;
    },
    [JSON.stringify(userInfo2FA.Data)]
  );

  //Lấy ra phương thức của OTP
  const handleMethodOTP = (result: IResponseLogin) => {
    dispatch(
      OTPAction.getMethodOTP({
        ATRANSACTION: result.Data?.ATRANSACTION as number,
        ClientName: result.Data?.ClientName as string,
        Email: result.Data?.Email as string,
        SMS: result.Data?.SMS as string,
      })
    );
  };

  //Xác thực 2FA
  const checkLogin2fa = async (result: IResponseLogin) => {
    const otp2Fa = {
      OTP: "",
      BusinessType: 50,
    };
    const response = await VerifyOTP2FA(otp2Fa as IInputOTP2FA);
    if (response.Code === 0) {
      handleMsgOTP(response.Code, errorCode);
      return true;
    }
    if (response.Code === 181109) {
      if (response.Data?.countOtpFalse !== -1) {
        setShowOTP(true);
        setResultOTP(response.Data as IOTP);
        handleMethodOTP(result);
        handleMsgOTP(0, errorCode);
        return;
      }
    }
    if (response.Code === 181107) {
      setShowOTP(true);
      setResultOTP(response.Data as IOTP);
      handleMethodOTP(result);
      handleMsgOTP(response.Code, errorCode);
      return true;
    }
    if (ConfigArrayOTP.includes(Number(response.Code))) {
      setShowOTP(true);
      handleMethodOTP(result);
      handleMsgOTP(response.Code, errorCode);
      return false;
    }
  };

  useEffect(() => {
    if (userInfo2FA?.Code === -123456) {
      // chỗ này ko xử lí, ép từng màn hình phải xử lí logic này
    } else {
      if (userInfo2FA.Code === -56987) {
        // deleteCookie("aspfpt_sessiontoken", {
        //   domain: process.env.NODE_ENV === "production" ? ".fpts.com.vn" : "",
        // });
        //kiểm tra tk là sms hoặc email thì mới cho send otp
        if (
          userInfo2FA?.Data?.ATRANSACTION !== 1 &&
          userInfo2FA?.Data?.ATRANSACTION !== 4
        ) {
          dispatch(AuthAction.setUserInfo(userInfo2FA?.Data as ILogin));
          checkLogin2fa(userInfo2FA);
        }
        //tk smartOTP hoặc token thì chỉ cẩn show form OTP thôi
        else {
          dispatch(AuthAction.setUserInfo(userInfo2FA?.Data as ILogin));
          setShowOTP(true);
          handleMethodOTP(userInfo2FA);
        }
      } else {
        if (userInfo2FA?.Data !== null) {
          if (userInfo2FA?.Code === 0) {
            if (
              searchParams.get("href") === "login" ||
              searchParams.get("href") === "forgot-password"
            ) {
              router.replace(router.asPath.split("?")[0], undefined, {
                shallow: true,
              });
            } else if (router.pathname !== "/404") {
              // Chỉ redirect nếu không phải trang 404
              router.replace(router.asPath, undefined, {
                shallow: true,
              });
            }
            dispatch(AuthAction.setUserInfo(userInfo2FA?.Data));
            dispatch(AuthAction.setUserInfo2FA(userInfo2FA));
            dispatch(permissionActions.getPermissionAction());
            handleMethodOTP(userInfo2FA);

            // Cập nhật cookie vào biến tạm sau khi login thành công
            const token = getJwtToken();
            if (token) {
              updateCookie(token);
            }

            if (userInfo2FA?.Data?.IsFirstLogin) {
              setTimeout(() => {
                eventBus.emit("showAlert", {
                  message: t("text_first_login"),
                  title: t("text_change_pwd"),
                  icon: "lock-error",
                  textAction: t("text_da_hieu"),
                  status: true,
                  eventAction: () =>
                    dispatch(AuthAction.showFormFirstLogin(true)),
                });
              }, 0);
            }
          }
        }
      }
    }
  }, [JSON.stringify(userInfo2FA.Data), dispatch]);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <AppCacheProvider emotionCache={emotionCache}>
        <StyledEngineProvider injectFirst>
          <MuiThemeProvider theme={muiTheme}>
            <Layout>
              {userInfo2FA?.Data === null && <LoginPageSSR />}
              {/* Hiện thị đổi mật khẩu định kì / đổi mật khẩu lần đầu */}
              <ChangePassFirstLogin />

              {/* HIện thị form nhập OTP */}
              {showOTP ? (
                <Verify2FA
                  open={showOTP}
                  onClose={handleClose}
                  data={resultOTP as IOTP}
                  verifyOTP={verifyOTP}
                  resendOTP={verifyOTP}
                />
              ) : null}
              {/* Modal thông báo */}
              <MessageModal />
              {/* Modal confirm */}
              <ConfirmModal />
              <CustomToastMsg />
              {/* <div className={`${manrope.className}`}> */}
              <MainLayoutSSR>
                <Component {...pageProps} />
              </MainLayoutSSR>
              {/* </div> */}
            </Layout>
          </MuiThemeProvider>
        </StyledEngineProvider>
      </AppCacheProvider>
    </>
  );
}

export default function AppWrapper(props: AppPropsWithLayout) {
  // Ở cấp cao nhất, bọc InnerApp bằng Provider
  return (
    <Provider store={store}>
      <InnerApp {...props} />
    </Provider>
  );
}
