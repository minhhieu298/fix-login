"use client";
import { Box, Button, Tooltip, Typography } from "@mui/material";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { ReactNode, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { WidgetContext } from "@/context/WidgetContext";
import { useCustomLanguage } from "@/hooks/useCustomLanguage";
import { useCustomTheme } from "@/hooks/useCustomTheme";
import { IAccountInfo } from "@/interface/account/interface";
import { ILogin, IResponseLogin } from "@/interface/interface";
import { accountAction } from "@/store/reducers/account.reducers";
import { stockActions } from "@/store/reducers/allStock.reducers";
import { ezhubActions } from "@/store/reducers/ezHub.reducer";
import { settingAction } from "@/store/reducers/setting.reducer";
import { utilityActions } from "@/store/reducers/utility.reducers";
import { getRecentSearches } from "@/utils/recentSearch";

import LoadingPage from "../LoadingPage";
import { allIcon } from "../Settings/EditMenuIcons/constant";
import { IMenuBarIcon } from "../Settings/EditMenuIcons/interface";
import { IFormSetting } from "../Settings/interface";
import ModalPopup from "../Settings/Modal";
import Welcome from "../Welcome";
import LayoutContent from "./LayoutContent";

const MainLayout = ({
  children,
}: {
  children: ReactNode;
  drawerWidth?: number;
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { mode, toggleTheme } = useCustomTheme();
  const modalSetting = useSelector(
    (state: {
      settingReducer: {
        modalSetting: boolean;
      };
    }) => state.settingReducer.modalSetting
  );
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [anchorElTheme, setAnchorElTheme] = useState<HTMLElement | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const defaultMenu = useSelector(
    (state: {
      settingReducer: {
        defaultMenu: string[];
      };
    }) => state.settingReducer.defaultMenu
  );
  const openWidgetPopper = () => {
    if (router.pathname === "/") {
      setOpen(true);
    } else {
      router.push("/", undefined, { shallow: true });
    }
  };
  const { t, changeLanguage } = useCustomLanguage();

  const userInfo = useSelector(
    (state: {
      AuthReducer: {
        userInfo: ILogin;
      };
    }) => state.AuthReducer.userInfo
  );

  const userInfo2FA = useSelector(
    (state: {
      AuthReducer: {
        userInfo2FA: IResponseLogin;
      };
    }) => state.AuthReducer.userInfo2FA
  );

  const settingInfo = useSelector(
    (state: {
      settingReducer: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setting: any;
      };
    }) => state.settingReducer.setting
  );

  const accountInfo = useSelector(
    (state: {
      accountReducer: {
        accountInfo: IAccountInfo;
      };
    }) => state.accountReducer.accountInfo
  );

  const showWelcome = useSelector(
    (state: {
      settingReducer: {
        showWelcome: boolean;
      };
    }) => state.settingReducer.showWelcome
  );

  //xử lí sự kiện scroll ngang khi lăn con chuột
  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      const scrollAmount = event.deltaY;
      const scrollContainer = scrollRef.current;

      if (scrollContainer) {
        scrollContainer.scrollLeft += scrollAmount;
      }
    };

    const scrollContainer = scrollRef.current;

    if (scrollContainer) {
      scrollContainer.addEventListener("wheel", handleWheel, {
        passive: false,
      });
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("wheel", handleWheel);
      }
    };
  }, [settingInfo?.position]);

  const arrayIcon = settingInfo
    ? !Object.keys(settingInfo).includes("isDefaultMenu") ||
      settingInfo.isDefaultMenu
      ? defaultMenu
      : settingInfo?.menuBarIcon
    : defaultMenu;

  const showIcon = arrayIcon.reduce((acc: IMenuBarIcon[], id: string) => {
    const icon = [...Object.values(allIcon).flat()].find(
      (icon) => icon.id === id
    );
    if (icon) acc.push(icon);
    return acc;
  }, []);

  //Lấy ra avatar user
  const avatarInfo = userInfo && userInfo.Avatar;

  //Kiểm tra có session mới cho mở modal setting
  const handleSettingAccount = () => {
    if (Object.keys(userInfo2FA).length > 0) {
      dispatch(settingAction.openSetting(true));
      router.replace({
        pathname: router.asPath.split("?")[0],
        query: {
          setting: "display",
        },
      });
    } else {
      //dispatch(AuthAction.showForm(true));
      router.replace({
        pathname: router.asPath.split("?")[0],
        query: {
          href: "login",
        },
      });
    }
  };

  const [isClient, setIsClient] = useState(false);

  const handlePostSetting = async (data: IFormSetting) => {
    dispatch(
      settingAction.postSettingAction({ Setting: JSON.stringify(data) })
    );
  };

  const handleThemeMode = (event: React.MouseEvent<HTMLImageElement>) => {
    setAnchorElTheme(event.currentTarget);
  };

  //Thay đổi theme trên thanh navbar
  const handleSelectTheme = (value: "light" | "dark") => {
    if (mode === value) {
      setAnchorElTheme(null);
      return;
    }
    toggleTheme(value);
    const data = {
      ...settingInfo,
      theme: value,
    };
    if (userInfo.ATRANSACTION) {
      handlePostSetting(data);
    }
    setAnchorElTheme(null);
  };

  useEffect(() => {
    if (settingInfo && Object.keys(settingInfo).length > 0) {
      if (settingInfo?.Setting || settingInfo) {
        changeLanguage(settingInfo?.language);
        toggleTheme(settingInfo?.theme);
      }
    }
  }, [settingInfo]);

  //Khi logout thì reset data setting
  useEffect(() => {
    if (!userInfo2FA.Data) {
      dispatch(settingAction.resetData());
      dispatch(accountAction.resetData());
    }
  }, [userInfo2FA.Data]);

  useEffect(() => {
    if (userInfo2FA.Data && Object.keys(userInfo2FA.Data).length > 0) {
      if (
        userInfo2FA.Code !== -56987 &&
        userInfo2FA.Data.IsFirstLogin === false
      ) {
        dispatch(settingAction.getDataSettingAction());
        dispatch(utilityActions.getSmsRateAction());
        dispatch(ezhubActions.getWorkspaceAction());
        if (!accountInfo) {
          dispatch(accountAction.getAccountInfoAction());
        }
      }
    }
  }, [JSON.stringify(userInfo2FA.Data)]);

  useEffect(() => {
    setIsClient(true);
    dispatch(stockActions.getDataStockAction());
    const recent = getRecentSearches();
    dispatch(ezhubActions.setRecentSearches(recent));
  }, []);

  //show form login
  const handleLoginForm = () => {
    //dispatch(AuthAction.showForm(true));

    router.push(
      {
        pathname: "/",
        query: {
          href: "login",
        },
      },
      undefined,
      { shallow: true }
    );
  };

  const renderBtnLogin = ({ isSideBar = false }: { isSideBar?: boolean }) => {
    return (
      <>
        {isSideBar ? (
          <Tooltip title={t("text_login")}>
            <Button
              onClick={handleLoginForm}
              sx={(theme) => ({
                background: `${theme.palette.customSupport?.greendefault03} !important`,
                minWidth: "initial !important",
                width: "20px !important",
                height: "20px !important",
                padding: "10px !important",
                gap: `8px`,
                borderRadius: `36px !important`,
                ".MuiButton-icon": {
                  margin: "0 !important",
                },
                "&::after": {
                  content: `""`,
                  position: "absolute",
                  inset: 0,
                  padding: "2px",
                  borderRadius: "inherit",
                  background:
                    "conic-gradient(from 280deg, #F36F21 0deg 160deg, #22B24C 0deg 258deg, #0066B3 0deg 360deg)",
                  WebkitMask:
                    "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  WebkitMaskComposite: "xor",
                  maskComposite: "exclude",
                },
              })}
            ></Button>
          </Tooltip>
        ) : (
          <Button
            onClick={handleLoginForm}
            size="medium"
            sx={(theme) => ({
              background: `${theme.palette.customSupport?.greendefault03} !important`,
              maxWidth: 148,
              width: "100%",
              gap: `8px`,
              borderRadius: `36px !important`,
              paddingLeft: "20px !important",
              paddingRight: "20px !important",
              textTransform: "none",
              ".MuiButton-icon": {
                margin: "0 !important",
              },
              "&::after": {
                content: `""`,
                position: "absolute",
                inset: 0,
                padding: "2px",
                borderRadius: "inherit",
                background:
                  "conic-gradient(from 280deg, #F36F21 0deg 160deg, #22B24C 0deg 258deg, #0066B3 0deg 360deg)",
                WebkitMask:
                  "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude",
              },
            })}
          >
            <Box sx={{ position: "relative", px: "14px", py: "10px" }}>
              <Image src="/assets/image/Group 48521.svg" alt="logo" fill />
            </Box>

            <Typography
              variant="body14-S21"
              sx={(theme) => ({
                color: theme.palette.customPrimary?.primary50,
                minWidth: 72,
              })}
            >
              {t("text_login")}
            </Typography>
          </Button>
        )}
      </>
    );
  };

  useEffect(() => {
    if (userInfo2FA.Data && Object.keys(userInfo2FA.Data).length > 0) {
      if (
        userInfo2FA.Code !== -56987 &&
        userInfo2FA.Data.IsFirstLogin === false
      ) {
        if (
          searchParams.get("setting") &&
          searchParams.get("setting") !== "welcome"
        ) {
          dispatch(settingAction.openSetting(true));
        }
      }
    }
  }, [JSON.stringify(userInfo2FA.Data), searchParams]);

  useEffect(() => {
    if (showWelcome) {
      router.push(
        {
          pathname: router.asPath.split("?")[0],
          query: { setting: "welcome" },
        },
        undefined,
        { shallow: true }
      );
      dispatch(settingAction.openSetting(false));
    }
  }, [showWelcome]);

  // useEffect(() => {
  //   const signalrConnection = hubConnection(
  //     "https://marketstream.fpts.com.vn/hsx"
  //   );
  //   const hub = signalrConnection.createHubProxy("hubhsx2");
  //   hub.on("updateSS", () => {});
  //   hub.connection
  //     .start()
  //     .done(() => {
  //       hub.invoke("updateSS", "S5G_IG_SIGNALR_QUOTE");
  //       eventBus.emit("connectedSocket", true);
  //     })
  //     .fail(() => {
  //       eventBus.emit("connectedSocket", false);
  //     });
  //   hub.connection.reconnecting(() => {});
  //   hub.connection.disconnected(() => {
  //     hub.on("updateSS", () => {});
  //     hub.connection
  //       .start()
  //       .done(() => {
  //         hub.invoke("updateSS", "S5G_IG_SIGNALR_QUOTE");
  //         eventBus.emit("connectedSocket", true);
  //       })
  //       .fail(() => {
  //         eventBus.emit("connectedSocket", false);
  //       });
  //   });
  //   return () => hub.connection.stop();
  // }, []);

  const renderLayout = () => {
    const commonProps = {
      settingInfo,
      mode,
      t,
      showIcon,
      scrollRef,
      handleThemeMode,
      anchorElTheme,
      setAnchorElTheme,
      handleSelectTheme,
      userInfo2FA,
      avatarInfo,
      renderBtnLogin,
      handleSettingAccount,
      openWidgetPopper,
    };
    return <LayoutContent {...commonProps}>{children}</LayoutContent>;
  };

  if (!isClient) {
    return <LoadingPage />;
  }

  if (showWelcome) {
    return <Welcome />;
  }

  return (
    <>
      <WidgetContext.Provider value={{ anchorEl, setAnchorEl, open, setOpen }}>
        {renderLayout()}
      </WidgetContext.Provider>
      {modalSetting ? <ModalPopup /> : null}
    </>
  );
};

export default MainLayout;
