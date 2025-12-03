import {
  Box,
  Dialog,
  IconButton,
  Link as MuiLink,
  styled,
  Tooltip,
  Typography,
} from "@mui/material";
import * as Sentry from "@sentry/nextjs";
import { deleteCookie } from "cookies-next";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { ConfigSetting } from "@/constants/Setting/constant";
import { useCustomLanguage } from "@/hooks/useCustomLanguage";
import { AuthAction } from "@/store/reducers/Login/login.reducer";
import { settingAction } from "@/store/reducers/setting.reducer";
import { deleteCookiesForCurrentHost } from "@/utils";
import { Logout } from "@/utils/logout";

import { findLabelNested, findParentPath, getPathLabel } from "./constants";
import Display from "./Display/Display";
import style from "./index.module.scss";
import AccountInformation from "./Information/AccountInformation";
import Notifications from "./Notification/Notifications";
import Securities from "./Securities/Securities";

const CustomDialog = styled(Dialog, {
  shouldForwardProp: (prop) => prop !== "fullScreen",
})(({ fullScreen, theme }) => ({
  "& .MuiPaper-root": {
    margin: 0,
    display: "flex",
    flexDirection: "row",
    borderRadius: 12,
    width: "100%",
    height: "100%",
    maxWidth: fullScreen ? "initial" : 1024,
    maxHeight: fullScreen ? "initial" : 640,

    ".dialog-nav": {
      ...theme.applyStyles("dark", {
        background: theme.palette.customBase?.base60,
        color: theme.palette.customBase?.base20,
      }),
      ...theme.applyStyles("light", {
        background: theme.palette.customBase?.base20,
        color: theme.palette.customBase?.base80,
      }),

      ".custom-heading": {
        padding: theme.spacing(2),
        paddingLeft: theme.spacing(4),
        paddingRight: 161,
      },
      ".custom-body": {
        display: "flex",
        flexDirection: "column",
      },
    },
    ".custom-content-setting": {
      ...theme.applyStyles("dark", {
        background: theme.palette.customBase?.base70,
        color: theme.palette.customBase?.base20,
      }),
      ...theme.applyStyles("light", {
        background: theme.palette.customBase?.base10,
        color: theme.palette.customBase?.base80,
      }),
      ".custom-content-heading": {
        ...theme.applyStyles("dark", {
          color: theme.palette.customBase?.base20,
        }),
        ...theme.applyStyles("light", {
          color: theme.palette.customBase?.base80,
        }),
      },
      ".custom-heading-icon": {
        display: "flex",
        alignItems: "center",
        gap: theme.spacing(5),
      },
    },
  },
}));

const ModalPopup = () => {
  const { t } = useCustomLanguage();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();

  const modalSetting = useSelector(
    (state: {
      settingReducer: {
        modalSetting: boolean;
      };
    }) => state.settingReducer.modalSetting
  );

  const [fullScreen, setFullScreen] = useState(false);

  const router = useRouter();

  const handleClose = () => {
    dispatch(settingAction.openSetting(false));
    const { setting: _setting, screen: _screen, ...restQuery } = router.query;
    router.replace(
      {
        pathname: router.asPath.split("?")[0],
        query: restQuery,
      },
      undefined,
      { shallow: true }
    );
  };

  //hiển thị navlink được chọn
  const handleActiveNav = (path: string) => {
    return searchParams.get("setting")?.toLowerCase() === path.toLowerCase();
  };

  //zoom view setting
  const handleZoomView = () => {
    if (fullScreen) {
      setFullScreen(false);
    } else {
      setFullScreen(true);
    }
  };

  //chuyển sang tabs chỉnh sửa menu icon
  const handleIconBack = () => {
    const screen = router.query.screen as string | undefined;
    if (screen === "token-log") {
      router.push(
        {
          pathname: router.asPath.split("?")[0],
          query: {
            ...router.query,
            setting: "security",
            screen: "token-management",
          },
        },
        undefined,
        { shallow: true }
      );
    } else {
      const parentSetting = findParentPath(
        getPathLabel(t),
        router.query.screen as string
      );
      if (parentSetting) {
        const {
          setting: _setting,
          screen: _screen,
          ...restQuery
        } = router.query;
        router.push(
          {
            pathname: router.asPath.split("?")[0],
            query: {
              ...restQuery,
              setting: parentSetting,
            },
          },
          undefined,
          { shallow: true }
        );
      }
    }
  };

  //Đăng xuât tài khoản
  const handleLogout = async () => {
    if (process.env.NODE_ENV === "production") {
      deleteCookiesForCurrentHost();
    }
    const response = await Logout();
    if (response.Code === -123456) {
      deleteCookie("aspfpt_sessiontoken", {
        //domain: ".fpts.com.vn",
        path: "",
      });
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
          //domain: ".fpts.com.vn",
          path: "",
        });
        // //dispatch(AuthAction.showForm(true));
      }
    }
    dispatch(settingAction.openSetting(false));
    // //dispatch(AuthAction.showForm(true));
    dispatch(AuthAction.setUserInfo2FA(response));
    router.replace(
      {
        pathname: window.location.origin,
      },
      undefined,
      { shallow: true }
    );
  };

  const renderContent = () => {
    // tìm url tương ứng để render component
    const component = ConfigSetting(t).find(
      (item) => item.path === searchParams.get("setting")?.toLowerCase()
    );

    if (component) {
      // return <div>Cài đặt không hợp lệ.</div>;
      switch (component.path) {
        case "display":
          return <Display fullScreen={fullScreen} />;
        case "account-information":
          return <AccountInformation />;
        case "security":
          return <Securities />;
        case "notifications":
          return <Notifications />;
        default:
          return <div>Cài đặt không hợp lệ.</div>; // Trả về thông báo nếu không có case nào khớp
      }
    }
  };

  //tabs chi khi click ko cần truyền parentType, chỉ truyền
  // parentType trong các tab con
  const renderLabel = () => {
    const setting = router.query.setting as string | undefined;
    const screen = router.query.screen as string | undefined;
    return findLabelNested(getPathLabel(t), setting, screen);
  };

  // const handleBackView = (path: string) => {
  //   router.push({
  //     pathname: router.pathname,
  //     query: {
  //       setting: path,
  //     },
  //   });
  // };

  return (
    <CustomDialog fullScreen={fullScreen} open={modalSetting}>
      <Box className={style.custom_setting_account}>
        <Box className={`dialog-nav ${style.custom_nav_left}`}>
          <Box className="custom-heading">
            <Typography variant="heading24-B36" component="h2">
              {t("text_header_setting")}
            </Typography>
          </Box>
          <Box className="custom-body">
            {ConfigSetting(t).map((item) => {
              const {
                setting: _setting,
                screen: _screen,
                ...restQuery
              } = router.query;
              const queryString = Object.entries(restQuery)
                .map(([key, value]) => `${key}=${value}`)
                .join("&");
              return (
                <MuiLink
                  component={Link}
                  underline="none"
                  sx={(theme) => ({
                    background: handleActiveNav(item.path)
                      ? theme.palette.customBase?.base10
                      : "inherit",
                    ...theme.applyStyles("dark", {
                      background: handleActiveNav(item.path)
                        ? theme.palette.customBase?.base70
                        : "inherit",
                    }),
                  })}
                  key={item.label}
                  className={style.list_item}
                  href={`${router.asPath.split("?")[0]}?${queryString}&setting=${item.path}`}
                  shallow={true}
                  // onClick={() => handleBackView(item.path)}
                >
                  <IconButton size="regular">
                    <Image
                      alt=""
                      src={
                        handleActiveNav(item.path)
                          ? item.iconActive
                          : item.iconSrc
                      }
                      fill
                    />
                  </IconButton>
                  <Typography
                    variant="body14-S21"
                    sx={(theme) => ({
                      color: handleActiveNav(item.path)
                        ? theme.palette.customPrimary?.primary50
                        : "inherit",
                    })}
                  >
                    {item.label}
                  </Typography>
                </MuiLink>
              );
            })}
            <Box className={style.list_item} onClick={handleLogout}>
              <IconButton size="regular">
                <Image alt="" src="/assets/image/icon_logout.svg" fill />
              </IconButton>
              <Typography variant="body14-S21">{t("text_logout")}</Typography>
            </Box>
          </Box>
        </Box>
        <Box className={`custom-content-setting ${style.custom_nav_right}`}>
          <Box className={style.custom_nav_right_head}>
            <Box
              className={style.custom_nav_heading}
              sx={{
                background: "none !important",
              }}
            >
              <Box className={style.custom_nav_title} onClick={handleIconBack}>
                {router.query.screen && (
                  <Tooltip title="Quay lại">
                    <IconButton size="large">
                      <Image
                        src="/assets/icon/icon_arrow_left.svg"
                        alt=""
                        fill
                      />
                    </IconButton>
                  </Tooltip>
                )}
                <Typography variant="heading18-B27" component="h2">
                  {renderLabel()}
                </Typography>
              </Box>
              {/* Zoom setting */}
              <Box className="custom-heading-icon">
                <Tooltip title={!fullScreen ? t("maximize") : t("restore")}>
                  <IconButton size="regular" onClick={handleZoomView}>
                    <Image
                      src={
                        !fullScreen
                          ? `/assets/image/icon_zoom.svg`
                          : `/assets/icon/minnimize.svg`
                      }
                      alt="icon_zoom"
                      fill
                      priority
                    />
                  </IconButton>
                </Tooltip>
                {/* Close setting */}
                <Tooltip title={t("close")}>
                  <IconButton size="regular" onClick={handleClose}>
                    <Image
                      src="/assets/icon/close_icon.svg"
                      alt="icon_close"
                      fill
                    />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
          </Box>
          <Box className={style.custom_nav_right_body}>{renderContent()}</Box>
        </Box>
      </Box>
    </CustomDialog>
  );
};

export default ModalPopup;
