import { Box, Button, IconButton, Tooltip, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import { NotiIcon } from "@/components/Layout/Icons/NotiIcon";
import { PromotionIcon } from "@/components/Layout/Icons/PromotionIcon";
import { allIcon } from "@/components/Layout/Settings/EditMenuIcons/constant";
import { IMenuBarIcon } from "@/components/Layout/Settings/EditMenuIcons/interface";
import { IFormSetting } from "@/components/Layout/Settings/interface";
import { useCustomLanguage } from "@/hooks/useCustomLanguage";
import { useCustomTheme } from "@/hooks/useCustomTheme";
import { IResponseLogin } from "@/interface/interface";
import { settingAction } from "@/store/reducers/setting.reducer";
import { handleFolderMenuIcon } from "@/utils";

import { ArrowCross } from "../icons/ArrowCross";
import { MoonIcon } from "../icons/MoonIcon";
import { SunIcon } from "../icons/SunIcon";
import styles from "./index.module.css";
import MenuMobileItem from "./MenuMobileItem";

const MenuMobile = () => {
  const { t, changeLanguage, language } = useCustomLanguage();
  const dispatch = useDispatch();
  const { mode, toggleTheme } = useCustomTheme();
  const router = useRouter();
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

  const handleThemeMode = () => {
    toggleTheme(mode === "dark" ? "light" : "dark");
    const data = {
      ...settingInfo,
      theme: mode === "dark" ? "light" : "dark",
    };
    if (userInfo2FA.Data?.ATRANSACTION) {
      handlePostSetting(data);
    }
  };

  const handlePostSetting = async (data: IFormSetting) => {
    dispatch(
      settingAction.postSettingAction({ Setting: JSON.stringify(data) })
    );
  };

  const handleChangeLanguage = () => {
    if (language === "vi") {
      changeLanguage("en");
    } else {
      changeLanguage("vi");
    }
  };

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

  const renderBtnLogin = () => {
    return (
      <Button
        onClick={handleLoginForm}
        size="medium"
        sx={(theme) => ({
          background: `${theme.palette.customSupport?.greendefault03} !important`,
          width: "100%",
          gap: `8px`,
          borderRadius: `16px !important`,
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
              "conic-gradient(from 274deg, #F36F21 0deg 173deg, #22B24C 165deg 245deg, #0066B3 270deg 360deg)",
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
    );
  };

  return (
    <Box
      className={styles.menuMobileWrapper}
      sx={(theme) => ({
        background: theme.palette.customBase?.baseWhite,
        ...theme.applyStyles("dark", {
          background: theme.palette.customBase?.base80,
        }),
      })}
    >
      <Box className={styles.titleMenu}>
        <Typography
          variant="heading20-S30"
          sx={(theme) => ({
            color: theme.palette.customBase?.base80,
            ...theme.applyStyles("dark", {
              color: theme.palette.customBase?.base20,
            }),
          })}
        >
          Menu
        </Typography>
        <Box className={styles.wrapIcon}>
          <Tooltip
            title={t("promotion")}
            placement={settingInfo?.position?.toLowerCase() || "top"}
          >
            <IconButton
              onClick={() =>
                router.push("/promotion", undefined, { shallow: true })
              }
              sx={(theme) => ({
                padding: "0px",
                color: theme.palette.customBase?.base40,
                "&:hover": {
                  color: theme.palette.customBase?.base30,
                },
              })}
            >
              <PromotionIcon width={16} height={16} />
            </IconButton>
          </Tooltip>

          <Tooltip
            title={t("notification")}
            placement={settingInfo?.position?.toLowerCase() || "top"}
          >
            <IconButton
              sx={(theme) => ({
                padding: "0px",
                color: theme.palette.customBase?.base40,
                "&:hover": {
                  color: theme.palette.customBase?.base30,
                },
              })}
            >
              <NotiIcon width={16} height={16} />
            </IconButton>
          </Tooltip>

          <Tooltip
            title={t("theme")}
            placement={settingInfo?.position?.toLowerCase() || "top"}
          >
            <IconButton
              sx={(theme) => ({
                padding: "0px",
                color: theme.palette.customBase?.base40,
                "&:hover": {
                  color: theme.palette.customBase?.base30,
                },
              })}
              onClick={handleThemeMode}
            >
              {mode === "dark" ? (
                <SunIcon width={16} height={16} />
              ) : (
                <MoonIcon width={16} height={16} />
              )}
            </IconButton>
          </Tooltip>

          <Tooltip
            title={t("language")}
            placement={settingInfo?.position?.toLowerCase() || "top"}
          >
            <IconButton sx={{ padding: "0px" }} onClick={handleChangeLanguage}>
              {language === "vi" ? (
                <Image
                  src="/assets/icon/en.svg"
                  width={16}
                  height={16}
                  alt="language"
                />
              ) : (
                <Image
                  src="/assets/icon/vi.svg"
                  width={16}
                  height={16}
                  alt="language"
                />
              )}
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      <Box className={styles.wrapMenu}>
        <Box className={styles.menuItem} key="home">
          <Image
            src={`/assets/${handleFolderMenuIcon(
              settingInfo?.iconPack,
              settingInfo?.theme
            )}/ic_chuyen_tien_nn.svg`}
            width={24}
            height={24}
            alt="icon 1"
          />
          <Typography
            variant="sub12-M18"
            sx={(theme) => ({
              flex: 1,
              color: theme.palette.customBase?.base80,
              ...theme.applyStyles("dark", {
                color: theme.palette.customBase?.base20,
              }),
            })}
          >
            {t("text_home")}
          </Typography>
          <IconButton
            sx={(theme) => ({
              padding: "0px",
              color: theme.palette.customBase?.base40,
              "&:hover": {
                color: theme.palette.customBase?.base30,
              },
            })}
            onClick={() => router.push("/", undefined, { shallow: true })}
          >
            <ArrowCross width={16} height={16} />
          </IconButton>
        </Box>
        {Array.isArray(showIcon) &&
          showIcon?.map((icon) => (
            <MenuMobileItem
              key={icon.id}
              icon={icon}
              settingInfo={settingInfo}
            />
          ))}
      </Box>
      {userInfo2FA.Data &&
      Object.keys(userInfo2FA.Data).length > 0 &&
      userInfo2FA.Code === 0 ? (
        <Box></Box>
      ) : (
        <Box className={styles.wrapBtnLogin}>{renderBtnLogin()}</Box>
      )}
    </Box>
  );
};

export default MenuMobile;
