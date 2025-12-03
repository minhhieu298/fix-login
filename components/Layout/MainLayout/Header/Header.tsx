import {
  Avatar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import * as Sentry from "@sentry/nextjs";
import { deleteCookie } from "cookies-next";
import Image from "next/image";
import { useRouter } from "next/router";
import { memo, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Search from "@/components/Layout/MainLayout/Search";
import MenuFunction from "@/components/MenuFunction/MenuFunction";
import { optionsAccount } from "@/constants/DrawerCustom/constant";
import { useCustomLanguage } from "@/hooks/useCustomLanguage";
import { IAccountInfo } from "@/interface/account/interface";
import { IResponseLogin } from "@/interface/interface";
import { AuthAction } from "@/store/reducers/Login/login.reducer";
import { settingAction } from "@/store/reducers/setting.reducer";
import styles from "@/styles/components/drawerCustom.module.css";
import { deleteCookiesForCurrentHost, handleFolderMenuIcon } from "@/utils";
import { Logout } from "@/utils/logout";

import { NotiIcon } from "../../Icons/NotiIcon";
import { PromotionIcon } from "../../Icons/PromotionIcon";
import { allIcon } from "../../Settings/EditMenuIcons/constant";
import { IMenuBarIcon } from "../../Settings/EditMenuIcons/interface";
import { handleShowTitlePage } from "../constant";
import { CustomAvatar } from "../custom";
import style from "../index.module.css";
import {
  getIconBarResponsiveStyles,
  getIconBarResponsiveStylesVertical,
  getIconSizeResponsiveStyles,
  getIconSizeResponsiveStylesVertical,
  getIconWrapperGapVertical,
  getIconWrapperMaxHeightVertical,
  getIconWrapperMaxWidthHorizontal,
  getTextWidthResponsiveStyles,
  getTextWidthResponsiveStylesVertical,
} from "./constant";

const Header = () => {
  const { t } = useCustomLanguage();
  const dispatch = useDispatch();
  const router = useRouter();
  const themeBreakpoints = useTheme();
  const isMd = useMediaQuery(themeBreakpoints.breakpoints.down(1440));
  const isSm = useMediaQuery(themeBreakpoints.breakpoints.down(1280));
  const scrollRef = useRef<HTMLDivElement>(null);
  const [anchorElAccount, setAnchorElAccount] = useState<HTMLElement | null>(
    null
  );
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const settingInfo = useSelector(
    (state: {
      settingReducer: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setting: any;
      };
    }) => state.settingReducer.setting
  );

  const userInfo2FA = useSelector(
    (state: {
      AuthReducer: {
        userInfo2FA: IResponseLogin;
      };
    }) => state.AuthReducer.userInfo2FA
  );

  const defaultMenu = useSelector(
    (state: {
      settingReducer: {
        defaultMenu: string[];
      };
    }) => state.settingReducer.defaultMenu
  );

  const accountInfo = useSelector(
    (state: {
      accountReducer: {
        accountInfo: IAccountInfo;
      };
    }) => state.accountReducer.accountInfo
  );

  const avatarInfo = accountInfo?.avatar || "";

  const arrayIcon = settingInfo
    ? !Object.keys(settingInfo).includes("isDefaultMenu") ||
      settingInfo.isDefaultMenu
      ? defaultMenu
      : settingInfo?.menuBarIcon
    : defaultMenu;

  // Check if icon bar has text
  const hasIconText =
    settingInfo?.showTextMenuBar ||
    settingInfo?.showTextMenuBar === undefined ||
    !userInfo2FA?.Data;

  // Check if position is horizontal (Top/Bottom/undefined)
  const isHorizontalPosition =
    settingInfo?.position === "Bottom" ||
    settingInfo?.position === "Top" ||
    !settingInfo?.position;

  const showIcon = arrayIcon.reduce((acc: IMenuBarIcon[], id: string) => {
    const icon = [...Object.values(allIcon).flat()].find(
      (icon) => icon.id === id
    );
    if (icon) acc.push(icon);
    return acc;
  }, []);

  const handleNavigate = (url: string) => {
    if (url) {
      router.push(url, undefined, { shallow: true });
    }
  };

  //Mở dialog setting tài khoản
  const handleSettingAccount = () => {
    if (userInfo2FA.Data && Object.keys(userInfo2FA.Data).length > 0) {
      dispatch(settingAction.openSetting(true));
      router.replace(
        {
          pathname: router.asPath.split("?")[0],
          query: {
            setting: "display",
          },
        },
        undefined,
        { shallow: true }
      );
    } else {
      //dispatch(AuthAction.showForm(true));
      router.replace(
        {
          pathname: router.asPath.split("?")[0],
          query: {
            href: "login",
          },
        },
        undefined,
        { shallow: true }
      );
    }
  };

  // Search handlers
  const toggleSearch = () => {
    setIsSearchOpen((prev) => !prev);
  };

  const handleSearchClose = () => {
    setIsSearchOpen(false);
  };

  //xử lí sự kiện scroll khi lăn con chuột và drag
  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      const scrollAmount = event.deltaY;
      const scrollContainer = scrollRef.current;

      if (scrollContainer) {
        // Nếu position là Left hoặc Right thì scroll dọc
        if (
          settingInfo?.position === "Left" ||
          settingInfo?.position === "Right"
        ) {
          scrollContainer.scrollTop += scrollAmount;
        } else {
          // Nếu position là Top hoặc Bottom thì scroll ngang
          scrollContainer.scrollLeft += scrollAmount;
        }
      }
    };

    // Biến để track drag state
    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let scrollLeft = 0;
    let scrollTop = 0;

    const handleMouseDown = (event: MouseEvent) => {
      const scrollContainer = scrollRef.current;
      if (!scrollContainer) return;

      isDragging = true;
      scrollContainer.style.cursor = "grabbing";
      scrollContainer.style.userSelect = "none";

      // Lưu vị trí bắt đầu
      startX = event.pageX - scrollContainer.offsetLeft;
      startY = event.pageY - scrollContainer.offsetTop;
      scrollLeft = scrollContainer.scrollLeft;
      scrollTop = scrollContainer.scrollTop;
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (!isDragging) return;

      event.preventDefault();
      const scrollContainer = scrollRef.current;
      if (!scrollContainer) return;

      const x = event.pageX - scrollContainer.offsetLeft;
      const y = event.pageY - scrollContainer.offsetTop;

      // Tính toán khoảng cách di chuyển
      const walkX = (x - startX) * 2; // Tăng tốc độ scroll
      const walkY = (y - startY) * 2;

      // Nếu position là Left hoặc Right thì scroll dọc
      if (
        settingInfo?.position === "Left" ||
        settingInfo?.position === "Right"
      ) {
        scrollContainer.scrollTop = scrollTop - walkY;
      } else {
        // Nếu position là Top hoặc Bottom thì scroll ngang
        scrollContainer.scrollLeft = scrollLeft - walkX;
      }
    };

    const handleMouseUp = () => {
      isDragging = false;
      const scrollContainer = scrollRef.current;
      if (!scrollContainer) return;

      scrollContainer.style.cursor = "grab";
      scrollContainer.style.userSelect = "";
    };

    const handleMouseLeave = () => {
      isDragging = false;
      const scrollContainer = scrollRef.current;
      if (!scrollContainer) return;

      scrollContainer.style.cursor = "grab";
      scrollContainer.style.userSelect = "";
    };

    const scrollContainer = scrollRef.current;

    if (scrollContainer) {
      // Wheel scroll
      scrollContainer.addEventListener("wheel", handleWheel, {
        passive: false,
      });

      // Drag scroll
      scrollContainer.addEventListener("mousedown", handleMouseDown);
      scrollContainer.addEventListener("mousemove", handleMouseMove);
      scrollContainer.addEventListener("mouseup", handleMouseUp);
      scrollContainer.addEventListener("mouseleave", handleMouseLeave);

      // Set cursor style
      scrollContainer.style.cursor = "grab";
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("wheel", handleWheel);
        scrollContainer.removeEventListener("mousedown", handleMouseDown);
        scrollContainer.removeEventListener("mousemove", handleMouseMove);
        scrollContainer.removeEventListener("mouseup", handleMouseUp);
        scrollContainer.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [settingInfo?.position]);

  //show form login
  const handleLoginForm = () => {
    //dispatch(AuthAction.showForm(true));

    router.push(
      {
        pathname: router.asPath.split("?")[0],
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
    //dispatch(AuthAction.showForm(true));
    dispatch(AuthAction.setUserInfo2FA(response));
    router.replace(
      {
        pathname: window.location.origin,
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
                width: "36px !important",
                height: "36px !important",
                padding: "10px !important",
                gap: `8px`,
                borderRadius: `36px !important`,
                marginTop: "8px !important",
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
              marginLeft: "8px",
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

  // const handleBurgerMenuClick = (event: React.MouseEvent) => {
  //   event.stopPropagation();
  //   setIsMobileMenuOpen((prev) => !prev);
  // };

  // const handleCloseMobileMenu = (event: Event | React.SyntheticEvent) => {
  //   const target = event.target as Element;
  //   const burgerMenu = burgerMenuRef.current;

  //   if (burgerMenu && burgerMenu.contains(target)) {
  //     return;
  //   }

  //   setIsMobileMenuOpen(false);
  // };

  return (
    <Box
      className={styles.noSelect}
      sx={() => ({
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderRadius: 6,
        gap:
          settingInfo?.position === "Left" || settingInfo?.position === "Right"
            ? 4
            : 30,
        ...((settingInfo?.position === "Left" ||
          settingInfo?.position === "Right") && {
          flexDirection: "column",
        }),
      })}
    >
      {/* icon left */}
      <Stack
        sx={() => ({
          position: "relative",
          alignItems: "center",
          gap: 4,
          flexDirection: "row",
          ...((settingInfo?.position === "Left" ||
            settingInfo?.position === "Right") && {
            flexDirection: "column",
          }),
          ...((settingInfo?.position === "Top" ||
            settingInfo?.position === "Bottom") && {
            flexDirection: "row",
          }),
        })}
      >
        <MenuFunction
          placement={
            ["Top", "Left"].includes(settingInfo?.position) ||
            !settingInfo?.position
              ? "bottom-start"
              : settingInfo?.position === "Bottom"
                ? "top-start"
                : "bottom-end"
          }
          typePlacementTooltip="top"
        />
        <Search
          isOpen={isSearchOpen}
          onToggle={toggleSearch}
          onClose={handleSearchClose}
        />
        {settingInfo?.position === "Left" ||
        settingInfo?.position === "Right" ? null : (
          <Typography
            variant={
              isSm ? "body14-B21" : isMd ? "body16-B24" : "heading18-B27"
            }
            sx={(theme) => ({
              position: "absolute",
              top: "5px",
              left: "104px",
              width: "200px",
              whiteSpace: "nowrap",
              color: theme.palette.customBase?.base80,
              ...theme.applyStyles("dark", {
                color: theme.palette.customBase?.base20,
              }),
            })}
          >
            {handleShowTitlePage(t, router.pathname)}
          </Typography>
        )}
      </Stack>
      {/* icon navigation */}
      <Box
        className={styles.iconWrapper}
        sx={() => ({
          ...(!userInfo2FA.Data
            ? {
                ...getIconWrapperMaxWidthHorizontal(),
              }
            : settingInfo?.position === "Left" ||
                settingInfo?.position === "Right"
              ? {
                  // Nav dọc (Left/Right) - hiển thị 8.5 icons
                  ...getIconWrapperMaxHeightVertical(hasIconText),
                }
              : {
                  // Nav có text
                  //Nav ngang (Top/Bottom)
                  ...getIconWrapperMaxWidthHorizontal(),
                }),
          ...((settingInfo?.position === "Left" ||
            settingInfo?.position === "Right") && {
            flexDirection: "column",
            ...getIconWrapperGapVertical(hasIconText),
          }),
          ...((settingInfo?.position === "Top" ||
            settingInfo?.position === "Bottom") && {
            flexDirection: "row",
          }),
        })}
        ref={scrollRef}
      >
        <Box
          key="home"
          className="icon-bar"
          sx={(theme) => ({
            justifyContent: "center",
            cursor: "pointer",
            ...((settingInfo?.position === "Left" ||
              settingInfo?.position === "Right") && {
              flexDirection: "column",
              alignItems: "center",
              flexShrink: 0,
              ...getIconBarResponsiveStylesVertical(hasIconText),
            }),
            ...(isHorizontalPosition && {
              flexDirection: "row",
              alignItems: "center",
              flexShrink: 0,
              ...getIconBarResponsiveStyles(hasIconText),
            }),
            color: theme.palette.customBase?.base50,
            ...theme.applyStyles("dark", {
              color: theme.palette.customBase?.base30,
            }),
          })}
          onClick={() => handleNavigate("/")}
        >
          <Tooltip
            title={t("text_home")}
            placement={settingInfo?.position?.toLowerCase() || "bottom"}
          >
            <Box
              sx={() => ({
                gap: 1,
                flexDirection: "column",
                display: "flex",
                alignItems: "center",
              })}
            >
              <Box
                className={styles.iconCenter}
                sx={{
                  ...((settingInfo?.position === "Left" ||
                    settingInfo?.position === "Right") &&
                    getIconSizeResponsiveStylesVertical(hasIconText)),
                  ...(isHorizontalPosition &&
                    getIconSizeResponsiveStyles(hasIconText)),
                }}
              >
                <Image
                  src={`/assets/${handleFolderMenuIcon(
                    settingInfo?.iconPack,
                    settingInfo?.theme
                  )}/ic_chuyen_tien_nn.svg`}
                  width={28}
                  height={28}
                  alt="icon 1"
                  key="icon1"
                  style={{ width: "auto", height: "auto" }}
                />
              </Box>
              {settingInfo?.showTextMenuBar ||
              settingInfo?.showTextMenuBar === undefined ||
              !userInfo2FA.Data?.ATRANSACTION ? (
                <Typography
                  variant="sub12-M18"
                  sx={{
                    whiteSpace:
                      settingInfo?.position === "Left" ||
                      settingInfo?.position === "Right"
                        ? "normal"
                        : "nowrap",
                    textAlign: "center",
                    overflow: "unset",
                    ...(settingInfo?.position === "Left" ||
                    settingInfo?.position === "Right"
                      ? getTextWidthResponsiveStylesVertical()
                      : getTextWidthResponsiveStyles()),
                  }}
                >
                  {t("text_home")}
                </Typography>
              ) : null}
            </Box>
          </Tooltip>
        </Box>
        {Array.isArray(showIcon)
          ? showIcon?.map((icon) => (
              <Box
                key={icon.id}
                className="icon-bar"
                sx={(theme) => ({
                  cursor: "pointer",
                  justifyContent: "center",
                  ...((settingInfo?.position === "Left" ||
                    settingInfo?.position === "Right") && {
                    flexDirection: "column",
                    alignItems: "center",
                    flexShrink: 0,
                    ...getIconBarResponsiveStylesVertical(hasIconText),
                  }),
                  ...(isHorizontalPosition && {
                    flexDirection: "row",
                    alignItems: "center",
                    // flexShrink: 0,
                    ...getIconBarResponsiveStyles(hasIconText),
                  }),
                  color: theme.palette.customBase?.base50,
                  ...theme.applyStyles("dark", {
                    color: theme.palette.customBase?.base30,
                  }),
                })}
                onClick={() => handleNavigate(icon.url || "")}
              >
                <Tooltip
                  title={t(icon.name)}
                  placement={settingInfo?.position?.toLowerCase() || "bottom"}
                >
                  <Box
                    sx={() => ({
                      gap: 1,
                      flexDirection: "column",
                      display: "flex",
                      alignItems: "center",
                    })}
                  >
                    <Box
                      className={styles.iconCenter}
                      sx={{
                        ...((settingInfo?.position === "Left" ||
                          settingInfo?.position === "Right") &&
                          getIconSizeResponsiveStylesVertical(hasIconText)),
                        ...(isHorizontalPosition &&
                          getIconSizeResponsiveStyles(hasIconText)),
                      }}
                    >
                      <Image
                        src={`/assets/${handleFolderMenuIcon(
                          settingInfo?.iconPack,
                          settingInfo?.theme
                        )}/${icon.path}`}
                        width={28}
                        height={28}
                        alt="icon 1"
                        key="icon1"
                        style={{ width: "auto", height: "auto" }}
                      />
                    </Box>
                    {settingInfo?.showTextMenuBar ||
                    settingInfo?.showTextMenuBar === undefined ||
                    !userInfo2FA.Data?.ATRANSACTION ? (
                      <Typography
                        variant="sub12-M18"
                        sx={{
                          whiteSpace:
                            settingInfo?.position === "Left" ||
                            settingInfo?.position === "Right"
                              ? "normal"
                              : "nowrap",
                          textAlign: "center",
                          overflow: "unset",
                          // color: "red",
                          ...(settingInfo?.position === "Left" ||
                          settingInfo?.position === "Right"
                            ? getTextWidthResponsiveStylesVertical()
                            : getTextWidthResponsiveStyles()),
                        }}
                      >
                        {t(icon.name)}
                      </Typography>
                    ) : null}
                  </Box>
                </Tooltip>
              </Box>
            ))
          : null}
      </Box>
      <Stack>
        <Box
          className={style.wrapIconHorizontal}
          sx={() => ({
            ...((settingInfo?.position === "Left" ||
              settingInfo?.position === "Right") && {
              flexDirection: "column",
            }),
            ...((settingInfo?.position === "Top" ||
              settingInfo?.position === "Bottom") && {
              flexDirection: "row",
            }),
          })}
        >
          <Tooltip
            title={t("promotion")}
            placement={settingInfo?.position?.toLowerCase() || "top"}
          >
            <Box className={style.iconWrapper}>
              <IconButton
                onClick={() =>
                  router.push("/promotion", undefined, { shallow: true })
                }
                sx={(theme) => ({
                  color: theme.palette.customBase?.base40,
                  "&:hover": {
                    color: theme.palette.customBase?.base30,
                  },
                })}
              >
                <PromotionIcon width={16} height={16} />
              </IconButton>
            </Box>
          </Tooltip>
          <Tooltip
            title={t("notification")}
            placement={settingInfo?.position?.toLowerCase() || "top"}
          >
            <Box className={style.iconWrapper}>
              <IconButton
                sx={(theme) => ({
                  color: theme.palette.customBase?.base40,
                  "&:hover": {
                    color: theme.palette.customBase?.base30,
                  },
                })}
              >
                <NotiIcon width={16} height={16} />
              </IconButton>
            </Box>
          </Tooltip>

          {userInfo2FA.Data &&
          Object.keys(userInfo2FA.Data).length > 0 &&
          userInfo2FA.Code === 0 ? (
            <>
              {settingInfo?.position === "Right" ||
              settingInfo?.position === "Left" ? (
                <Avatar
                  src={avatarInfo || "/assets/icon/icon_user.svg"}
                  alt="avatar"
                  variant="circular"
                  sx={{
                    width: 36,
                    height: 36,
                    borderRadius: "50% !important",
                    objectFit: "cover",
                    backgroundColor: "#f5f5f5",
                    marginTop: "8px",
                    cursor: "pointer",
                  }}
                  onClick={(event: React.MouseEvent<HTMLElement>) =>
                    setAnchorElAccount(event.currentTarget)
                  }
                />
              ) : (
                <CustomAvatar
                  avatarInfo={avatarInfo}
                  name={
                    accountInfo?.specialName ||
                    userInfo2FA.Data.ClientName.toLowerCase()
                  }
                  onClick={(event: React.MouseEvent<HTMLElement>) =>
                    setAnchorElAccount(event.currentTarget)
                  }
                />
              )}
              <Menu
                anchorEl={anchorElAccount}
                open={Boolean(anchorElAccount)}
                onClose={() => setAnchorElAccount(null)}
                disableAutoFocus={true}
                disableAutoFocusItem={true}
                anchorOrigin={{
                  vertical: ["Top", "Left", "Right"].includes(
                    settingInfo?.position
                  )
                    ? "bottom"
                    : "top",
                  horizontal: ["Left"].includes(settingInfo?.position)
                    ? "right"
                    : "left",
                }}
                transformOrigin={{
                  vertical: ["Top", "Left", "Right"].includes(
                    settingInfo?.position
                  )
                    ? "top"
                    : "bottom",
                  horizontal:
                    settingInfo?.position === "Right" ? "right" : "left",
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
                      ...(settingInfo?.position === "Top" && {
                        transform: "translateY(22px) !important",
                      }),
                      ...(settingInfo?.position === "Bottom" && {
                        transform: "translateY(-22px) !important",
                      }),
                      ...(settingInfo?.position === "Left" && {
                        transform:
                          "translateX(18px) translateY(-28px) !important",
                      }),
                      ...(settingInfo?.position === "Right" && {
                        transform:
                          "translateX(-18px) translateY(-28px) !important",
                      }),
                    }),
                  },
                  list: {
                    sx: () => ({
                      padding: 0,
                    }),
                  },
                }}
              >
                {optionsAccount.map((option) => (
                  <MenuItem
                    key={option.value}
                    value={option.value}
                    onClick={() => {
                      switch (option.value) {
                        case "logout":
                          handleLogout();
                          setAnchorElAccount(null);
                          break;
                        case "setting":
                          handleSettingAccount();
                          setAnchorElAccount(null);
                          break;
                        default:
                          handleNavigate(option.link || "");
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
                ))}
              </Menu>
            </>
          ) : (
            <>
              {["Left", "Right"].includes(settingInfo?.position)
                ? renderBtnLogin({ isSideBar: true })
                : renderBtnLogin({ isSideBar: false })}
            </>
          )}
        </Box>
      </Stack>

      {/* Burger menu - chỉ hiển thị khi màn hình nhỏ hơn 1280px */}
      {/* <Box
        sx={{
          display: {
            xs: "block",
            sm: "block",
            md: "none",
            lg: "none",
            xl: "none",
          },
        }}
      >
        <Tooltip title="Menu">
          <IconButton
            ref={burgerMenuRef}
            onClick={handleBurgerMenuClick}
            sx={(theme) => ({
              padding: "10px 0px 10px 10px",
              color: theme.palette.customBase?.base40,
              "&:hover": {
                color: theme.palette.customBase?.base30,
              },
            })}
          >
            <Image
              src="/assets/icon/burger-menu.svg"
              alt="burger-menu"
              width={36}
              height={36}
              style={{
                borderRadius: "8px",
                backgroundColor: isMobileMenuOpen
                  ? muiTheme.palette.customBase?.base25
                  : "transparent",
                ...muiTheme.applyStyles("dark", {
                  backgroundColor: isMobileMenuOpen
                    ? muiTheme.palette.customBase?.base50
                    : "transparent",
                }),
              }}
            />
          </IconButton>
        </Tooltip>
      </Box> */}

      {/* Mobile Menu Popper */}
      {/* {isMobileMenuOpen && (
        <Popper
          open={isMobileMenuOpen}
          anchorEl={burgerMenuRef.current}
          placement="bottom-end"
          style={{ zIndex: 1300 }}
          modifiers={[
            {
              name: "offset",
              options: {
                offset: [0, 8],
              },
            },
          ]}
        >
          <ClickAwayListener
            onClickAway={handleCloseMobileMenu}
            mouseEvent="onMouseDown"
            touchEvent="onTouchStart"
          >
            <Box>
              <MenuMobile />
            </Box>
          </ClickAwayListener>
        </Popper>
      )} */}
    </Box>
  );
};

export default memo(Header);
