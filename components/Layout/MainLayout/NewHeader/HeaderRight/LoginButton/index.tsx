import { Box, Menu, MenuItem, Typography } from "@mui/material";
import * as Sentry from "@sentry/nextjs";
import { deleteCookie } from "cookies-next";
import Image from "next/image";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { optionsAccount } from "@/constants/DrawerCustom/constant";
import { IAccountInfo } from "@/interface/account/interface";
import { IResponseLogin } from "@/interface/interface";
import { AuthAction } from "@/store/reducers/Login/login.reducer";
import { settingAction } from "@/store/reducers/setting.reducer";
import { deleteCookiesForCurrentHost } from "@/utils";
import { Logout } from "@/utils/logout";

import { CustomAvatar } from "../../../custom";
import styles from "../../index.module.css";

const LoginButton = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [anchorElAccount, setAnchorElAccount] = useState<HTMLElement | null>(
    null
  );

  const userInfo2FA = useSelector(
    (state: {
      AuthReducer: {
        userInfo2FA: IResponseLogin;
      };
    }) => state.AuthReducer.userInfo2FA
  );

  const accountInfo = useSelector(
    (state: {
      accountReducer: {
        accountInfo: IAccountInfo;
      };
    }) => state.accountReducer.accountInfo
  );

  const avatarInfo = accountInfo?.avatar || "";

  const handleLoginForm = () => {
    dispatch(AuthAction.showForm(true));

    router.push(
      {
        pathname: window.location.origin,
        query: {
          href: "login",
        },
      },
      undefined,
      { shallow: true }
    );
  };

  const handleLogout = async () => {
    if (process.env.NODE_ENV === "production") {
      deleteCookiesForCurrentHost();
    }
    const response = await Logout();
    if (response.Code === -123456) {
      deleteCookie("aspfpt_sessiontoken", {
        domain: ".fpts.com.vn",
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
          domain: ".fpts.com.vn",
          path: "",
        });
      }
    }
    // dispatch(AuthAction.showForm(true));
    dispatch(AuthAction.setUserInfo2FA(response));
    router.replace(
      {
        pathname: window.location.origin,
      },
      undefined,
      { shallow: true }
    );
  };

  const handleSettingAccount = () => {
    if (userInfo2FA.Data && Object.keys(userInfo2FA.Data).length > 0) {
      dispatch(settingAction.openSetting(true));
      router.replace(
        {
          pathname: router.asPath.split("?")[0],
          query: {
            ...router.query,
            setting: "display",
          },
        },
        undefined,
        { shallow: true }
      );
    } else {
      // //dispatch(AuthAction.showForm(true));
      router.replace(
        {
          pathname: window.location.origin,
          // query: {
          //   href: "login",
          // },
        },
        undefined,
        { shallow: true }
      );
    }
  };

  return userInfo2FA.Data &&
    Object.keys(userInfo2FA.Data).length > 0 &&
    userInfo2FA.Code === 0 ? (
    <>
      <CustomAvatar
        avatarInfo={avatarInfo}
        name={accountInfo?.specialName || accountInfo?.name.toLowerCase()}
        onClick={(event: React.MouseEvent<HTMLElement>) =>
          setAnchorElAccount(event.currentTarget)
        }
      />
      <Menu
        anchorEl={anchorElAccount}
        open={Boolean(anchorElAccount)}
        onClose={() => setAnchorElAccount(null)}
        disableAutoFocus={true}
        disableAutoFocusItem={true}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        slotProps={{
          paper: {
            sx: (theme) => ({
              borderRadius: "12px",
              width: "200px",
              height: "225px",
              background: theme.palette.customBase?.base20,
              ...theme.applyStyles("dark", {
                background: theme.palette.customBase?.base70,
              }),
              border: `1px solid ${theme.palette.customAdditional?.base4003}`,
              overflow: "hidden",
              boxShadow: "none !important",
              transform: "translateY(12px) translateX(4px) !important",
            }),
          },
          list: {
            sx: () => ({
              padding: 0,
            }),
          },
        }}
      >
        {optionsAccount.map((option) => {
          // Xử lý link: nếu là query string thì dùng router pathname hiện tại + query
          const getHref = () => {
            if (!option.link) return "#";
            if (option.link.startsWith("?")) {
              return `${router.pathname}${option.link}`;
            }
            return option.link;
          };

          // Các option đặc biệt (logout, setting) không dùng NextLink
          if (option.value === "logout" || option.value === "setting") {
            return (
              <MenuItem
                key={option.value}
                value={option.value}
                onClick={() => {
                  if (option.value === "logout") {
                    handleLogout();
                    setAnchorElAccount(null);
                  } else if (option.value === "setting") {
                    handleSettingAccount();
                    setAnchorElAccount(null);
                  }
                }}
                sx={{
                  width: "200px",
                  height: "45px",
                  padding: "12px",
                  gap: "8px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    width: "176px",
                    height: "21px",
                    gap: "8px",
                  }}
                >
                  <Image
                    src={option.icon}
                    alt="icon-app"
                    width={20}
                    height={20}
                  />
                  <Typography
                    variant="body14-M21"
                    sx={(theme) => ({
                      color: theme.palette.customBase?.base80,
                      ...theme.applyStyles("dark", {
                        color: theme.palette.customBase?.base20,
                      }),
                    })}
                  >
                    {option.label}
                  </Typography>
                </Box>
              </MenuItem>
            );
          }

          // Các link thông thường dùng NextLink
          return (
            <Box
              key={option.value}
              component={NextLink}
              href={getHref()}
              prefetch={false}
              onClick={() => setAnchorElAccount(null)}
              sx={{ textDecoration: "none" }}
            >
              <MenuItem
                value={option.value}
                sx={{
                  width: "200px",
                  height: "45px",
                  padding: "12px",
                  gap: "8px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    width: "176px",
                    height: "21px",
                    gap: "8px",
                  }}
                >
                  <Image
                    src={option.icon}
                    alt="icon-app"
                    width={20}
                    height={20}
                  />
                  <Typography
                    variant="body14-M21"
                    sx={(theme) => ({
                      color: theme.palette.customBase?.base80,
                      ...theme.applyStyles("dark", {
                        color: theme.palette.customBase?.base20,
                      }),
                    })}
                  >
                    {option.label}
                  </Typography>
                </Box>
              </MenuItem>
            </Box>
          );
        })}
      </Menu>
    </>
  ) : (
    <Box className={styles.loginButton} onClick={handleLoginForm}>
      Đăng nhập
    </Box>
  );
};

export default LoginButton;
