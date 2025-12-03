/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  ClickAwayListener,
  MenuItem,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";

import { useCustomLanguage } from "@/hooks/useCustomLanguage";
import { handleFolderMenuIcon } from "@/utils";

import { CustomIconMenuFunction } from "../Layout/MainLayout/custom";
import { dataAllFC } from "./constants";
import { CustomPoper } from "./custom";
import { IRecursiveMenu, MenuFunctionProps } from "./interface";

const RecursiveMenu = ({
  items,
  depth = 0,
  setMenuOpen,
  parentRef,
  setHasSubmenuOpen,
}: IRecursiveMenu) => {
  const router = useRouter();
  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);
  const [isMouseInSubmenu, setIsMouseInSubmenu] = useState(false);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const settingInfo = useSelector(
    (state: {
      settingReducer: {
        setting: any;
      };
    }) => state.settingReducer.setting
  );

  const handleOpen = (index: number) => {
    // Clear any pending close timeout
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setOpenMenuIndex(index);
    setIsMouseInSubmenu(false);

    // Notify parent component about submenu state
    if (depth === 0 && items[index]?.children && setHasSubmenuOpen) {
      setHasSubmenuOpen(true);
    }
  };

  const handleClose = () => {
    // Add delay to allow mouse to move to submenu
    closeTimeoutRef.current = setTimeout(() => {
      if (!isMouseInSubmenu) {
        setOpenMenuIndex(null);
        // Notify parent component about submenu state
        if (depth === 0 && setHasSubmenuOpen) {
          setHasSubmenuOpen(false);
        }
      }
    }, 150);
  };

  const handleSubmenuMouseEnter = () => {
    setIsMouseInSubmenu(true);
    // Clear any pending close timeout
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  };

  const handleSubmenuMouseLeave = () => {
    setIsMouseInSubmenu(false);
    setOpenMenuIndex(null);
    // Notify parent component about submenu state
    if (depth === 0 && setHasSubmenuOpen) {
      setHasSubmenuOpen(false);
    }
  };

  const handleNavigate = (url: string) => {
    if (depth === 1) {
      if (url) {
        router.push(url);
      }

      setTimeout(() => {
        if (setMenuOpen) {
          setMenuOpen(false);
        }
      }, 100);
    }
  };

  return (
    <Paper
      sx={{
        position: "relative",
      }}
    >
      {items.map((item: any, index: number) => (
        <Box
          key={index}
          onMouseEnter={() => handleOpen(index)}
          onMouseLeave={handleClose}
          sx={{
            zIndex: 1,
            position: "relative",
            px: 3,
          }}
        >
          <MenuItem
            onClick={() => handleNavigate(item.url)}
            sx={(theme) => ({
              padding: depth === 1 ? "8px !important" : "12px !important",
              ...(depth === 0 &&
                openMenuIndex === index && {
                  background: `${theme.palette.customBase?.base20} !important`,
                  ...theme.applyStyles("dark", {
                    background: `${theme.palette.customBase?.base60} !important`,
                  }),
                  // Hiển thị ::before khi submenu đang mở
                  ...(item.children && {
                    "&::before": {
                      content: '""',
                      boxSizing: "unset !important",
                      position: "absolute",
                      right:
                        ["Left", "Top", "Bottom"].includes(
                          settingInfo?.position
                        ) || !settingInfo?.position
                          ? -12
                          : "auto",
                      left: settingInfo?.position === "Right" ? -12 : "auto",
                      top: "50%",
                      transform: "translateY(-50%)",
                      width: settingInfo?.position === "Right" ? 8 : 19,
                      height: 48,
                      background: `${theme.palette.customBase?.base20} border-box`,
                      boxShadow: "0px 0px 20px 0px rgba(0, 148, 74, 0.25)",
                      zIndex: 2,
                      "--r": "12px",
                      lineHeight: 1.7,
                      paddingInline: ".5em",
                      borderBlock: "var(--r) solid #0000",
                      mask:
                        ["Left", "Top", "Bottom"].includes(
                          settingInfo?.position
                        ) || !settingInfo?.position
                          ? "radial-gradient(var(--r) at 0 var(--r), #0000 98%, #000 101%) 100% calc(-1 * var(--r)) / var(--r) 100% repeat-y, conic-gradient(#000 0 0) padding-box"
                          : "radial-gradient(var(--r) at 100% var(--r), #0000 98%, #000 101%) 0% calc(-1 * var(--r)) / var(--r) 100% repeat-y, conic-gradient(#000 0 0) padding-box",
                      // Dark theme
                      ...theme.applyStyles("dark", {
                        background: theme.palette.customBase?.base60,
                      }),
                    },
                  }),
                }),
              "&:hover":
                depth === 0
                  ? {
                      background: `${theme.palette.customBase?.base20} !important`,
                      ...theme.applyStyles("dark", {
                        background: `${theme.palette.customBase?.base60} !important`,
                      }),
                      // Hiển thị ::before chỉ khi có submenu và đang hover
                      ...(item.children && {
                        "&::before": {
                          content: '""',
                          position: "absolute",
                          right:
                            ["Left", "Top", "Bottom"].includes(
                              settingInfo?.position
                            ) || !settingInfo?.position
                              ? -12
                              : "auto",
                          left:
                            settingInfo?.position === "Right" ? -12 : "auto",
                          top: "50%",
                          transform: "translateY(-50%)",
                          width: settingInfo?.position === "Right" ? 8 : 19,
                          height: 48,
                          background: `${theme.palette.customBase?.base20} border-box`,
                          boxShadow: "0px 0px 20px 0px rgba(0, 148, 74, 0.25)",
                          zIndex: 2,
                          "--r": "12px",
                          lineHeight: 1.7,
                          paddingInline: ".5em",
                          borderBlock: "var(--r) solid #0000",
                          mask:
                            ["Left", "Top", "Bottom"].includes(
                              settingInfo?.position
                            ) || !settingInfo?.position
                              ? "radial-gradient(var(--r) at 0 var(--r), #0000 98%, #000 101%) 100% calc(-1 * var(--r)) / var(--r) 100% repeat-y, conic-gradient(#000 0 0) padding-box"
                              : "radial-gradient(var(--r) at 100% var(--r), #0000 98%, #000 101%) 0% calc(-1 * var(--r)) / var(--r) 100% repeat-y, conic-gradient(#000 0 0) padding-box",
                          // Dark theme
                          ...theme.applyStyles("dark", {
                            background: theme.palette.customBase?.base60,
                          }),
                        },
                      }),
                    }
                  : {
                      background: `${theme.palette.customBase?.base10} !important`,
                      ...theme.applyStyles("dark", {
                        background: `${theme.palette.customBase?.base70} !important`,
                      }),
                    },
            })}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mr: 2,
              }}
            >
              <Image
                src={`/assets/${
                  depth === 0
                    ? "icon"
                    : handleFolderMenuIcon(
                        settingInfo?.iconPack,
                        settingInfo?.theme
                      )
                }/${item.icon}.svg`}
                alt="icon-function"
                width={depth === 0 ? 24 : 32}
                height={depth === 0 ? 24 : 32}
              />
            </Box>
            <Typography variant="body16-M24" flexGrow={1}>
              {item.label}
            </Typography>

            {depth === 0 ? (
              <Image
                src="/assets/icon/icon_arrow_right.svg"
                alt="arrow-right"
                width={16}
                height={16}
              />
            ) : null}
          </MenuItem>
        </Box>
      ))}

      {/* Menu cấp 2 cố định */}
      {depth === 0 &&
        openMenuIndex !== null &&
        items[openMenuIndex]?.children && (
          <Box
            onMouseEnter={handleSubmenuMouseEnter}
            onMouseLeave={handleSubmenuMouseLeave}
            sx={() => ({
              position: "absolute",
              left: settingInfo?.position === "Right" ? "auto" : "100%",
              right: settingInfo?.position === "Right" ? "100%" : "auto",
              top: "-13px",
              bottom: 0,
              zIndex: 1300,
              height: "100%",
            })}
          >
            <Paper
              sx={(theme) => ({
                background: theme.palette.customBase?.base20 + " !important",
                ...theme.applyStyles("dark", {
                  background: theme.palette.customBase?.base60 + " !important",
                }),
                height: 374,
                width: 320,
                overflow: "auto",
                padding: "12px 0",
                // Bỏ border và radius khi liền với menu cấp 1
                ...(settingInfo?.position === "Right"
                  ? {
                      // Khi position === "Right", menu cấp 2 ở bên trái
                      borderTopRightRadius: 0,
                      borderBottomRightRadius: 0,
                      borderRight: "none",
                      borderTopLeftRadius: "12px",
                      borderBottomLeftRadius: "12px",
                      borderTop: `1px solid ${theme.palette.customBase?.base40}`,
                      borderLeft: `1px solid ${theme.palette.customBase?.base40}`,
                      borderBottom: `1px solid ${theme.palette.customBase?.base40}`,
                      ...theme.applyStyles("dark", {
                        borderRight: "none",
                        borderTop: `1px solid ${theme.palette.customBase?.base50}`,
                        borderLeft: `1px solid ${theme.palette.customBase?.base50}`,
                        borderBottom: `1px solid ${theme.palette.customBase?.base50}`,
                      }),
                    }
                  : {
                      // Mặc định, menu cấp 2 ở bên phải
                      borderTopLeftRadius: 0,
                      borderBottomLeftRadius: 0,
                      borderLeft: "none",
                      borderTopRightRadius: "12px",
                      borderBottomRightRadius: "12px",
                      borderTop: `1px solid ${theme.palette.customBase?.base40}`,
                      borderRight: `1px solid ${theme.palette.customBase?.base40}`,
                      borderBottom: `1px solid ${theme.palette.customBase?.base40}`,
                      ...theme.applyStyles("dark", {
                        borderLeft: "none",
                        borderTop: `1px solid ${theme.palette.customBase?.base50}`,
                        borderRight: `1px solid ${theme.palette.customBase?.base50}`,
                        borderBottom: `1px solid ${theme.palette.customBase?.base50}`,
                      }),
                    }),
              })}
            >
              <RecursiveMenu
                items={items[openMenuIndex].children}
                depth={depth + 1}
                setMenuOpen={setMenuOpen}
                parentRef={parentRef}
                setHasSubmenuOpen={setHasSubmenuOpen}
              />
            </Paper>
          </Box>
        )}
    </Paper>
  );
};

const MenuFunction = ({
  placement,
  typePlacementTooltip,
}: MenuFunctionProps) => {
  const { t } = useCustomLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const [hasSubmenuOpen, setHasSubmenuOpen] = useState(false);
  const buttonRef = useRef<HTMLDivElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const settingInfo = useSelector(
    (state: {
      settingReducer: {
        setting: any;
      };
    }) => state.settingReducer.setting
  );

  const handleEnter = () => {
    setMenuOpen(true);
  };

  const handleLeave = () => {
    setMenuOpen(false);
  };
  return (
    <>
      {/* Backdrop với blur effect */}
      {menuOpen && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1100,
          }}
          onClick={handleLeave}
        />
      )}

      <Box
        onClick={handleEnter}
        sx={{ display: "inline-block", position: "relative", zIndex: 1300 }}
      >
        <Tooltip title={t("all_function")} placement={typePlacementTooltip}>
          <CustomIconMenuFunction
            ref={buttonRef}
            sx={(theme) => ({
              ...(menuOpen && {
                background: theme.palette.customSupport?.primary5003,
                borderRadius: "8px",
              }),
            })}
          >
            <Image
              src="/assets/icon/logo.svg"
              alt="icon-app"
              width={27}
              height={30}
            />
          </CustomIconMenuFunction>
        </Tooltip>

        <CustomPoper
          open={menuOpen}
          anchorEl={buttonRef.current}
          placement={placement}
          style={{ zIndex: 1200 }}
          className={
            hasSubmenuOpen
              ? settingInfo?.position === "Right"
                ? "has-submenu-open-right"
                : "has-submenu-open"
              : ""
          }
          modifiers={[
            {
              name: "offset",
              options: {
                offset: [0, 8],
              },
            },
          ]}
        >
          <ClickAwayListener onClickAway={handleLeave}>
            <Box ref={menuRef}>
              <Stack gap={2}>
                <RecursiveMenu
                  items={dataAllFC}
                  setMenuOpen={setMenuOpen}
                  parentRef={menuRef}
                  setHasSubmenuOpen={setHasSubmenuOpen}
                />
              </Stack>
            </Box>
          </ClickAwayListener>
        </CustomPoper>
      </Box>
    </>
  );
};

export default MenuFunction;
