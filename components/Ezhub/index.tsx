import { Box, Button, Tooltip, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { useSelector } from "react-redux";

import { useWidgetContext } from "@/context/WidgetContext";
import { useCustomLanguage } from "@/hooks/useCustomLanguage";
import { useCustomTheme } from "@/hooks/useCustomTheme";
import { ILogin } from "@/interface/interface";
import { DataEzhub } from "@/interface/MyHub/interface";

import styles from "./hub.module.scss";
import TabEzhub from "./TabEzhub";

const EzHub = (props: { openWidgetPopper: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useCustomLanguage();
  const { muiTheme, mode } = useCustomTheme();
  const { openWidgetPopper } = props;
  const { open } = useWidgetContext();
  const router = useRouter();
  const isHomePage = router.pathname === "/";
  const settingInfo = useSelector(
    (state: {
      settingReducer: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setting: any;
      };
    }) => state.settingReducer.setting
  );

  const toggleDrawer = (open: boolean) => () => {
    setIsOpen(open);
  };

  const setUserInfo = useSelector(
    (state: {
      AuthReducer: {
        userInfo: ILogin;
      };
    }) => state.AuthReducer.userInfo
  );

  const listWorkspace = useSelector(
    (state: {
      ezhubReducer: {
        dataEzhub: DataEzhub;
      };
    }) => state.ezhubReducer.dataEzhub
  );

  const renderedHubId = useSelector(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (state: any) => state.ezhubReducer?.renderedHubId
  );

  const hubName =
    listWorkspace?.List && renderedHubId
      ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
        listWorkspace.List.find((hub: any) => hub.WorkSpaceID === renderedHubId)
          ?.Name
      : "EzHub";

  const handleWidgetPopper = () => {
    openWidgetPopper();
  };

  const handleOpenEzhub = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

    if (isHomePage) {
      setIsOpen(true);
    } else {
      router.push("/", undefined, { shallow: true });
    }
  };

  return (
    <>
      {settingInfo?.position === "Top" || settingInfo?.position === "Bottom" ? (
        <Button
          variant="contained"
          sx={{
            transition: "none",
            backgroundColor:
              mode === "dark"
                ? muiTheme.palette?.customBase?.base60
                : muiTheme.palette?.customBase?.baseWhite,
            borderRadius: "16px",
            padding: "0px !important",
            color: "#1AAF74 !important",
            textTransform: "none",
            border: isHomePage ? "1px solid #1AAF74" : "none",
            boxShadow: "0px 0px 20px rgba(16, 83, 42, 0.2)",
            gap: "0px !important",
            height: "36px",
          }}
        >
          <Box
            sx={(theme) => ({
              display: "flex",
              alignItems: "center",
              height: "100%",
              zIndex: isOpen ? 1301 : "auto",
              position: "relative",
              padding: setUserInfo.ATRANSACTION
                ? "8px 12px 8px 16px"
                : "8px 16px 8px 16px",
              backgroundColor: isOpen
                ? theme.palette.customBase?.baseWhite
                : "transparent",
              outline: isOpen ? "1px solid #1AAF74" : "none",
              borderRadius: isOpen ? "16px" : "0px",
              ...theme.applyStyles("dark", {
                outline: isOpen ? "1px solid #1AAF74" : "none",
                borderRadius: isOpen ? "16px" : "0px",
                backgroundColor: isOpen
                  ? "rgba(26, 175, 116, 0.3)"
                  : "transparent",
              }),
            })}
            onClick={handleOpenEzhub}
          >
            <Image
              src="/assets/icon/EzHub.svg"
              alt="EzHub"
              width={18.84}
              height={16.75}
              className={styles.hubIcon}
            />
            <Typography
              variant="h6"
              sx={{
                fontSize: "14px",
                fontWeight: 600,
                lineHeight: 1.5,
              }}
              className={styles.hubName}
            >
              {hubName || "EzHub"}
            </Typography>
          </Box>

          {setUserInfo.ATRANSACTION && (
            <>
              <Box
                sx={{
                  marginLeft: "0px",
                  border: "0.5px solid rgba(133, 139, 147, 0.3)",
                  height: "20px",
                  borderRadius: "20px",
                }}
              />
              {settingInfo?.position === "Top" && (
                <Tooltip
                  title={isHomePage ? t("open_widgets") : ""}
                  placement="bottom"
                  slotProps={{
                    tooltip: {
                      sx: {
                        background: `${mode === "dark" ? muiTheme.palette?.customBase?.base50 : muiTheme.palette?.customBase?.base20} !important`,
                      },
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "10px 16px 10px 8px",
                    }}
                    onClick={handleWidgetPopper}
                  >
                    <Image
                      src={
                        open
                          ? "/assets/icon/arrow-widget-up-green.svg"
                          : "/assets/icon/ezhub-down.svg"
                      }
                      alt="arrow"
                      width={16}
                      height={16}
                      style={{
                        cursor: "pointer",
                      }}
                    />
                  </Box>
                </Tooltip>
              )}
              {settingInfo?.position === "Bottom" && (
                <Tooltip
                  title={isHomePage ? t("open_widgets") : ""}
                  placement="top"
                  slotProps={{
                    tooltip: {
                      sx: {
                        background: `${mode === "dark" ? muiTheme.palette?.customBase?.base50 : muiTheme.palette?.customBase?.base20} !important`,
                      },
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "10px 16px 10px 8px",
                    }}
                    onClick={handleWidgetPopper}
                  >
                    <Image
                      src={
                        open
                          ? "/assets/icon/arrow-widget-down-green.svg"
                          : "/assets/icon/ezhub-down.svg"
                      }
                      style={{
                        cursor: "pointer",
                        transform: open ? "rotate(0deg)" : "rotate(180deg)",
                      }}
                      alt="arrow"
                      width={16}
                      height={16}
                      onClick={handleWidgetPopper}
                    />
                  </Box>
                </Tooltip>
              )}
            </>
          )}
        </Button>
      ) : (
        <Button
          variant="contained"
          sx={{
            transition: "none",
            display: "flex",
            flexDirection: "column",
            margin: "0",
            backgroundColor:
              mode === "dark"
                ? muiTheme.palette?.customBase?.base60
                : muiTheme.palette?.customBase?.baseWhite,
            borderRadius: "16px",
            padding: "0 !important",
            color: "#1AAF74 !important",
            textTransform: "none",
            minWidth: "36px",
            border: isHomePage ? "1px solid #1AAF74" : "none",
            boxShadow:
              "0 0 10px 0 rgba(47, 131, 79, 0.15), 0 0 20px 0 rgba(16, 83, 42, 0.2)",
            gap: "0px !important",
            height: "100%",
          }}
        >
          <Box
            sx={(theme) => ({
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "10px 10px 8px 10px",
              zIndex: isOpen ? 1301 : "auto",
              backgroundColor: isOpen
                ? theme.palette.customBase?.baseWhite
                : "transparent",
              outline: isOpen ? "1px solid #1AAF74" : "none",
              borderRadius: isOpen ? "16px" : "0px",
              position: "relative",
              ...theme.applyStyles("dark", {
                outline: isOpen ? "1px solid #1AAF74" : "none",
                borderRadius: isOpen ? "16px" : "0px",
                backgroundColor: isOpen
                  ? "rgba(26, 175, 116, 0.3)"
                  : "transparent",
              }),
            })}
            onClick={handleOpenEzhub}
          >
            <Image
              src="/assets/icon/EzHub.svg"
              alt="EzHub"
              width={18.84}
              height={16.75}
            />
          </Box>

          {setUserInfo.ATRANSACTION && (
            <>
              <Box
                sx={{
                  borderBottom: "0.5px solid rgba(133, 139, 147, 0.3)",
                  width: "24px",
                  borderRadius: "20px",
                }}
              />
              {settingInfo?.position === "Left" && (
                <Tooltip
                  title={isHomePage ? t("open_widgets") : ""}
                  placement="bottom"
                  slotProps={{
                    tooltip: {
                      sx: {
                        background: `${mode === "dark" ? muiTheme.palette?.customBase?.base50 : muiTheme.palette?.customBase?.base20} !important`,
                      },
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      padding: "2px 10px 4px 10px",
                    }}
                    onClick={handleWidgetPopper}
                  >
                    <Image
                      src={
                        open
                          ? "/assets/icon/arrow-widget-left-green.svg"
                          : "/assets/icon/ezhub-right.png"
                      }
                      alt="arrow"
                      width={16}
                      height={16}
                      style={{
                        cursor: "pointer",
                      }}
                    />
                  </Box>
                </Tooltip>
              )}
              {settingInfo?.position === "Right" && (
                <Tooltip
                  title={isHomePage ? t("open_widgets") : ""}
                  placement="bottom"
                  slotProps={{
                    tooltip: {
                      sx: {
                        background: `${mode === "dark" ? muiTheme.palette?.customBase?.base50 : muiTheme.palette?.customBase?.base20} !important`,
                      },
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      padding: "2px 10px 4px 10px",
                    }}
                    onClick={handleWidgetPopper}
                  >
                    <Image
                      src={
                        open
                          ? "/assets/icon/arrow-widget-right-green.svg"
                          : "/assets/icon/ezhub-right.png"
                      }
                      style={{
                        cursor: "pointer",
                        transform: open ? "rotate(0deg)" : "rotate(180deg)",
                      }}
                      alt="arrow"
                      width={16}
                      height={16}
                    />
                  </Box>
                </Tooltip>
              )}
            </>
          )}
        </Button>
      )}

      <TabEzhub open={isOpen} handleClose={toggleDrawer(false)} />
    </>
  );
};

export default EzHub;
