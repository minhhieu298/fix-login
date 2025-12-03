import {
  Box,
  Fade,
  Link,
  Menu,
  MenuItem,
  Stack,
  styled,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Image from "next/image";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

import { IMenuBarIcon } from "@/components/Layout/Settings/EditMenuIcons/interface";
import { useCustomLanguage } from "@/hooks/useCustomLanguage";
import { handleFolderMenuIcon } from "@/utils";

import { AddIcon } from "../icons/AddIcon";
import { ArrowIcon } from "../icons/ArrowIcon";
import { ISegementTab } from "./types";

const SwitchTabs = styled(Stack, {
  shouldForwardProp: (props) => props !== "size",
})<{ size: "small" | "large" }>(({ theme, size }) => ({
  borderRadius: 100,
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  padding: "4px",
  gap: "10px",
  background: theme.palette.customBase?.baseWhite,
  ...theme.applyStyles("dark", {
    background: theme.palette.customBase?.base80,
  }),
  ".tab-button": {
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    gap: "8px",
    color: "inherit",
    padding: "4px 12px 4px 4px",
    // flex: 1,
    cursor: "pointer",
    justifyContent: "center",
    borderRadius: 26,
    minWidth: 0,
    "&.active": {
      background: "rgba(26, 175, 116, 0.3)",
    },
    "&:hover": {
      background: "rgba(26, 175, 116, 0.3)",
    },
    "& > div:first-of-type": {
      flexShrink: 0,
    },
  },
  ...(size === "small" && {
    ".MuiButtonBase-root": {
      padding: "2px 12px",
      minHeight: "auto",
      width: "100%",
      gap: 2,
      flexDirection: "row",
      flex: 1,
      maxWidth: "unset",
      minWidth: "auto",
      textTransform: "unset",
      whiteSpace: "nowrap",
    },
  }),
  ...(size === "large" && {
    ".MuiButtonBase-root": {
      paddingTop: 2,
      paddingBottom: 2,
      gap: 2,
      minHeight: "auto",
      flexDirection: "row",
      flex: 1,
      maxWidth: "unset",
      minWidth: "auto",
      textTransform: "unset",
    },
  }),
}));

const SegementTab = ({ size = "small", listTabs }: ISegementTab) => {
  const { t } = useCustomLanguage();
  const router = useRouter();
  const theme = useTheme();
  const islg = useMediaQuery(theme.breakpoints.up(1910));
  const ismd = useMediaQuery(theme.breakpoints.up(1440));
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [showAddButton, setShowAddButton] = useState(false);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        userInfo2FA: any;
      };
    }) => state.AuthReducer.userInfo2FA
  );

  const isLoggedIn =
    userInfo2FA?.Data &&
    Object.keys(userInfo2FA.Data).length > 0 &&
    userInfo2FA.Code === 0;

  const handleMenuMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setAnchorEl(null);
    }, 1200);
  };

  const handleMenuMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  };

  const handleButtonMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  const maxTabs = isLoggedIn
    ? islg
      ? 8
      : ismd
        ? 5
        : 4
    : islg
      ? 7
      : ismd
        ? 4
        : 3;
  const displayedTabs = listTabs.slice(0, maxTabs);
  const hasMoreTabs = listTabs.length > maxTabs;
  const hasLessTabs = listTabs.length <= maxTabs;

  // Kiểm tra xem có menu nào hiển thị 2 dòng không
  const hasAnyTwoLineMenu = displayedTabs.some((item: IMenuBarIcon) => {
    const text = t(item.name);
    return text.split("\n").length === 2;
  });
  // Xác định kích thước icon
  // Nếu có menu 2 dòng: tất cả icon đều 28x28
  // Nếu tất cả đều 1 dòng: theo islg (islg true = 28x28, islg false = 20x20)
  const iconSize = hasAnyTwoLineMenu ? 28 : 20;

  const handleSwitchTabMenuIcon = () => {
    router.push(
      {
        pathname: router.asPath.split("?")[0],
        query: {
          ...router.query,
          setting: "display",
          screen: "edit-menu",
        },
      },
      undefined,
      { shallow: true }
    );
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLElement>, url: string) => {
    const currentPath = router.asPath.split("?")[0];
    const targetPath = url.split("?")[0];

    // Nếu đang ở cùng route, thêm __refresh để reload
    if (currentPath === targetPath) {
      e.preventDefault();
      const refreshKey = Date.now();
      const refreshUrl = url.includes("?")
        ? `${url}&__refresh=${refreshKey}`
        : `${url}?__refresh=${refreshKey}`;
      router.replace(refreshUrl, url, { scroll: false });
    }
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <SwitchTabs size={size}>
        <>
          {displayedTabs.map((item: IMenuBarIcon) => {
            const text = t(item.name);
            const lines = text.split("\n");
            const hasTwoLines = lines.length === 2;
            const pathName = router.pathname;
            const isActive = pathName.includes(item.url || "");

            return (
              <NextLink
                key={item.id}
                href={item.url || "#"}
                prefetch={false}
                legacyBehavior
              >
                <Link
                  onClick={(e) => {
                    if (item.url) {
                      handleLinkClick(e, item.url);
                    }
                  }}
                  sx={{ textDecoration: "none", display: "block" }}
                >
                  <Box
                    className={`tab-button ${isActive ? "active" : ""}`}
                    sx={{
                      textDecoration: "none",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      width: hasAnyTwoLineMenu ? "128px" : "116px",
                    }}
                  >
                    <Box
                      sx={{
                        width: iconSize,
                        height: iconSize,
                        borderRadius: "50%",
                        overflow: "hidden",
                      }}
                    >
                      <Image
                        width={iconSize}
                        height={iconSize}
                        src={`/assets/${handleFolderMenuIcon(
                          settingInfo?.iconPack,
                          settingInfo?.theme
                        )}/${item.path}`}
                        alt={item.name}
                      />
                    </Box>
                    {hasTwoLines ? (
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          justifyContent: "center",
                          flex: 1,
                          minWidth: 0,
                          gap: 0,
                        }}
                      >
                        <Typography
                          variant="sub12-M18"
                          sx={(theme) => ({
                            color: theme.palette.customBase?.base80,
                            lineHeight: "14px",
                            height: "14px",
                            width: "100%",
                            textAlign: "left",
                            display: "block",
                            ...theme.applyStyles("dark", {
                              color: theme.palette.customBase?.base20,
                            }),
                          })}
                        >
                          {lines[0]}
                        </Typography>
                        <Typography
                          variant="sub12-M18"
                          sx={(theme) => ({
                            color: theme.palette.customBase?.base80,
                            lineHeight: "14px",
                            height: "14px",
                            width: "100%",
                            textAlign: "left",
                            display: "block",
                            ...theme.applyStyles("dark", {
                              color: theme.palette.customBase?.base20,
                            }),
                          })}
                        >
                          {lines[1]}
                        </Typography>
                      </Box>
                    ) : (
                      <Typography
                        variant="sub12-M18"
                        sx={(theme) => ({
                          color: theme.palette.customBase?.base80,
                          flex: 1,
                          minWidth: 0,
                          textAlign: "left",
                          ...theme.applyStyles("dark", {
                            color: theme.palette.customBase?.base20,
                          }),
                        })}
                      >
                        {text}
                      </Typography>
                    )}
                  </Box>
                </Link>
              </NextLink>
            );
          })}
          {!isLoggedIn && (
            <NextLink
              key="motaikhoan"
              href="https://ezopen.fpts.com.vn/ekyc/Pages/Ekyc/AccountOpenIntrodution.aspx"
              prefetch={false}
              legacyBehavior
              target="_blank"
            >
              <Link
                onClick={(e) => {
                  handleLinkClick(
                    e,
                    "https://ezopen.fpts.com.vn/ekyc/Pages/Ekyc/AccountOpenIntrodution.aspx"
                  );
                }}
                target="_blank"
                sx={{ textDecoration: "none", display: "block" }}
              >
                <Box
                  className="tab-button"
                  sx={{
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    width: hasAnyTwoLineMenu ? "128px" : "116px",
                  }}
                >
                  <Box
                    sx={{
                      width: iconSize,
                      height: iconSize,
                      borderRadius: "50%",
                      overflow: "hidden",
                    }}
                  >
                    <Image
                      width={iconSize}
                      height={iconSize}
                      src={`/assets/${handleFolderMenuIcon(
                        settingInfo?.iconPack,
                        settingInfo?.theme
                      )}/ic_mo_tai_khoan.svg`}
                      alt="motaikhoan"
                    />
                  </Box>
                  <Typography
                    variant="sub12-M18"
                    sx={(theme) => ({
                      color: theme.palette.customBase?.base80,
                      flex: 1,
                      minWidth: 0,
                      textAlign: "left",
                      ...theme.applyStyles("dark", {
                        color: theme.palette.customBase?.base20,
                      }),
                    })}
                  >
                    {t("text_open_account")}
                  </Typography>
                </Box>
              </Link>
            </NextLink>
          )}
        </>
      </SwitchTabs>
      {/* Button container for ">" (more) and "+" (add) */}
      {hasMoreTabs && (
        <Tooltip arrow title={t("text_more")} disableInteractive>
          <Box
            sx={{
              width: hasAnyTwoLineMenu ? 36 : 28,
              height: hasAnyTwoLineMenu ? 36 : 28,
              borderRadius: "50%",
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              marginLeft: "-10px",
              justifyContent: "center",
              cursor: "pointer",
              background: Boolean(anchorEl)
                ? "rgba(26, 175, 116, 0.2)"
                : "transparent",
              "&:hover": {
                background: "rgba(26, 175, 116, 0.2)",
              },
            }}
            onClick={(event: React.MouseEvent<HTMLElement>) => {
              if (closeTimeoutRef.current) {
                clearTimeout(closeTimeoutRef.current);
                closeTimeoutRef.current = null;
              }
              setAnchorEl(event.currentTarget);
            }}
            onMouseEnter={handleButtonMouseEnter}
          >
            <Box
              sx={{
                transform: Boolean(anchorEl) ? "rotate(90deg)" : "rotate(0deg)",
                transition: "transform 0.2s ease-in-out",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ArrowIcon />
            </Box>
          </Box>
        </Tooltip>
      )}
      {/* Invisible hover area at the end of the bar to show "+" button */}
      {isLoggedIn && hasLessTabs && (
        <Box
          sx={{
            position: "relative",
            width: hasAnyTwoLineMenu ? 36 : 28,
            height: hasAnyTwoLineMenu ? 36 : 28,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            marginLeft: "-10px",
          }}
          onMouseEnter={() => setShowAddButton(true)}
          onMouseLeave={() => setShowAddButton(false)}
        >
          {/* "+" button - only show when logged in and hasLessTabs, and only on hover */}
          <Tooltip arrow title={t("text_add")} disableInteractive>
            <Box
              sx={{
                width: hasAnyTwoLineMenu ? 36 : 28,
                height: hasAnyTwoLineMenu ? 36 : 28,
                borderRadius: "50%",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                opacity: 1,
                pointerEvents: showAddButton ? "auto" : "none",
                background: showAddButton
                  ? "rgba(26, 175, 116, 0.2)"
                  : "transparent",
                "&:hover": {
                  background: "rgba(26, 175, 116, 0.2)",
                },
              }}
              onClick={handleSwitchTabMenuIcon}
              onMouseEnter={() => setShowAddButton(true)}
              onMouseLeave={() => setShowAddButton(false)}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <AddIcon />
              </Box>
            </Box>
          </Tooltip>
        </Box>
      )}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => {
          if (closeTimeoutRef.current) {
            clearTimeout(closeTimeoutRef.current);
            closeTimeoutRef.current = null;
          }
          setAnchorEl(null);
        }}
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
        slots={{
          transition: Fade,
        }}
        slotProps={{
          transition: { timeout: 200 },
          paper: {
            sx: {
              width: "237px",
              borderRadius: "8px",
              boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.12)",
              background: theme.palette.customBase?.baseWhite,
              marginTop: hasAnyTwoLineMenu ? "12px" : "16px",
              ...theme.applyStyles("dark", {
                background: theme.palette.customBase?.base70,
              }),
            },
            onMouseLeave: handleMenuMouseLeave,
            onMouseEnter: handleMenuMouseEnter,
          },
          list: {
            disablePadding: true,
          },
        }}
      >
        {listTabs.slice(maxTabs).map((item: IMenuBarIcon) => {
          const pathName = router.pathname;
          const isActive = pathName.includes(item.url || "");
          return (
            <NextLink
              key={item.id}
              href={item.url || "#"}
              prefetch={false}
              legacyBehavior
            >
              <Box
                onClick={(e: React.MouseEvent<HTMLElement>) => {
                  if (closeTimeoutRef.current) {
                    clearTimeout(closeTimeoutRef.current);
                    closeTimeoutRef.current = null;
                  }
                  setAnchorEl(null);
                  if (item.url) {
                    handleLinkClick(e, item.url);
                  }
                }}
                sx={{ textDecoration: "none", display: "block" }}
              >
                <MenuItem
                  sx={(theme) => ({
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    color: theme.palette.customBase?.base50,
                    ...theme.applyStyles("dark", {
                      color: theme.palette.customBase?.base30,
                    }),
                    padding: "8px 12px",
                    background: isActive
                      ? "rgba(26, 175, 116, 0.2)"
                      : theme.palette.customBase?.baseWhite,
                    ...theme.applyStyles("dark", {
                      background: isActive
                        ? "rgba(26, 175, 116, 0.2)"
                        : theme.palette.customBase?.base70,
                    }),
                    "&:hover": {
                      background: "rgba(26, 175, 116, 0.2)",
                    },
                  })}
                  onClick={() => {
                    if (closeTimeoutRef.current) {
                      clearTimeout(closeTimeoutRef.current);
                      closeTimeoutRef.current = null;
                    }
                  }}
                >
                  <Image
                    width={hasAnyTwoLineMenu ? 28 : 20}
                    height={hasAnyTwoLineMenu ? 28 : 20}
                    src={`/assets/${handleFolderMenuIcon(
                      settingInfo?.iconPack,
                      settingInfo?.theme
                    )}/${item.path}`}
                    alt={item.name}
                  />
                  <Typography variant="body14-M21">{t(item.name)}</Typography>
                </MenuItem>
              </Box>
            </NextLink>
          );
        })}
        {isLoggedIn ? (
          <MenuItem
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "11px",
              padding: "12px",
              justifyContent: "center",
            }}
            onClick={handleSwitchTabMenuIcon}
          >
            <AddIcon />
            <Typography
              variant="sub12-M18"
              sx={(theme) => ({
                color: theme.palette.customPrimary?.primary50,
              })}
            >
              {t("text_add")}
            </Typography>
          </MenuItem>
        ) : null}
      </Menu>
    </Box>
  );
};

export default SegementTab;
