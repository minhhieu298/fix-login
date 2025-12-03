import { Box, Typography } from "@mui/material";
import Head from "next/head";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { ILogin, IResponseLogin } from "@/interface/interface";
import { AuthAction } from "@/store/reducers/Login/login.reducer";
import { settingAction } from "@/store/reducers/setting.reducer";

const Custom404 = () => {
  const dispatch = useDispatch();
  const userInfo2FA = useSelector(
    (state: {
      AuthReducer: {
        userInfo2FA: IResponseLogin;
      };
    }) => state.AuthReducer.userInfo2FA
  );

  useEffect(() => {
    if (!userInfo2FA || Object.keys(userInfo2FA).length === 0) {
      dispatch(AuthAction.getUserInfo());
    }
  }, [dispatch, userInfo2FA]);

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (userInfo2FA.Code === -123456) {
      dispatch(settingAction.openSetting(false));
      if (searchParams.get("href") === "forgot-password") {
        router.push(
          router.asPath.split("?")[0] + "?href=forgot-password",
          undefined,
          { shallow: true }
        );
        //dispatch(AuthAction.showForm(true));
      } else {
        router.push(router.asPath.split("?")[0] + "?href=login", undefined, {
          shallow: true,
        });
        //dispatch(AuthAction.showForm(true));
        dispatch(AuthAction.setUserInfo({} as ILogin));
        dispatch(
          AuthAction.setUserInfo2FA({
            Code: -123456,
            Message: "No exit",
            Data: null,
          })
        );
      }
    }
  }, [JSON.stringify(userInfo2FA)]);

  return (
    <>
      <Head>
        <title>404 - Trang không tìm thấy</title>
        <meta
          name="description"
          content="Trang bạn đang tìm kiếm không tồn tại"
        />
      </Head>

      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "20px",
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: "6rem",
            fontWeight: "bold",
            color: "#888",
            marginBottom: "1rem",
          }}
        >
          404
        </Typography>

        <Typography
          variant="h5"
          sx={(theme) => ({
            color: theme.palette.customBase?.base80,
            marginBottom: "2rem",
            ...theme.applyStyles("dark", {
              color: theme.palette.customBase?.base20,
            }),
          })}
        >
          This page could not be found.
        </Typography>

        <Box
          sx={{
            width: "100px",
            height: "2px",
            backgroundColor: "#ddd",
            margin: "0 auto",
          }}
        />
      </Box>
    </>
  );
};

export default Custom404;
