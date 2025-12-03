import { Box, Drawer, Typography } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import { useSelector } from "react-redux";

import { useCustomLanguage } from "@/hooks/useCustomLanguage";
import { useCustomTheme } from "@/hooks/useCustomTheme";

import BaseTooltip from "../ui/BaseTooltip";
import HubTemplates from "./hubTemplates";
import MyHubs from "./myHubs";

const TabEzhub = ({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: () => void;
}) => {
  const { t } = useCustomLanguage();
  const { muiTheme, mode } = useCustomTheme();
  const [showTemplates, setShowTemplates] = useState(true);
  const settingInfo = useSelector(
    (state: {
      settingReducer: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setting: any;
      };
    }) => state.settingReducer.setting
  );

  return (
    <Drawer
      sx={{
        zIndex: "1300 !important",
        "& .MuiBackdrop-root": {
          backgroundColor: "transparent",
        },
      }}
      anchor="left"
      open={open}
      onClose={handleClose}
      slotProps={{
        backdrop: {
          sx: {
            transition: "none !important",
          },
        },
        paper: {
          sx: {
            transition: "none !important",
            boxShadow: "none !important",
          },
        },
      }}
    >
      <Box
        sx={(theme) => ({
          position: "fixed",
          left:
            ["Top", "Bottom"].includes(settingInfo?.position) ||
            !settingInfo?.position
              ? "12px"
              : ["Left"].includes(settingInfo?.position)
                ? "80px"
                : ["Right"].includes(settingInfo?.position)
                  ? "12px"
                  : "auto",
          right: "auto",
          top:
            ["Top"].includes(settingInfo?.position) || !settingInfo?.position
              ? "80px"
              : ["Left", "Right"].includes(settingInfo?.position)
                ? "51px"
                : "auto",
          bottom: settingInfo?.position === "Bottom" ? "72px" : "auto",
          width: "404px",
          bgcolor:
            mode === "dark"
              ? muiTheme.palette?.customBase?.base70
              : muiTheme.palette?.customBase?.base10,
          margin: 0,
          overflow: "hidden",
          height:
            settingInfo?.position === "Left" ||
            settingInfo?.position === "Right"
              ? "calc(100vh - 99px)"
              : settingInfo?.position === "Bottom"
                ? "calc(100vh - 121px)"
                : "calc(100vh - 129px)",
          borderRadius: "20px",
          display: "flex",
          flexDirection: "column",
          zIndex: "1300 !important",
          boxShadow: "0px 0px 30px 0px rgba(0, 0, 0, 0.12)",
          border: `1px solid ${theme.palette.customBase?.base40}`,
          ...theme.applyStyles("dark", {
            border: `1px solid ${theme.palette.customBase?.base50}`,
          }),
        })}
      >
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            minHeight: 0,
            width: "100%",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: "100%",
              padding: "12px 0px 0px 12px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              flex: 1,
              minHeight: 0,
            }}
          >
            <MyHubs onClose={handleClose} />
          </Box>
          <Box sx={{ width: "100%", flexShrink: 0 }}>
            <Box
              onClick={() => setShowTemplates((prev) => !prev)}
              sx={{
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                userSelect: "none",
                padding: "12px",
                background: showTemplates ? "unset" : "transparent",
                width: "100%",
                borderTop: "1px solid #858B934D",
              }}
            >
              <Typography
                variant="body16-B24"
                sx={(theme) => ({
                  color: theme.palette?.customBase?.base80,
                  ...theme.applyStyles("dark", {
                    color: theme.palette?.customBase?.base20,
                  }),
                })}
              >
                {t("text_ezhub_template")}
              </Typography>
              <BaseTooltip title={showTemplates ? t("close") : t("open")}>
                <Box
                  sx={{
                    transform: showTemplates
                      ? "rotate(0deg)"
                      : "rotate(180deg)",
                    transition: "transform 0.3s",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Image
                    src="/assets/icon/Icon_up_hub.png"
                    alt="arrow"
                    width={16}
                    height={16}
                  />
                </Box>
              </BaseTooltip>
            </Box>

            {showTemplates && (
              <Box
                sx={{
                  width: "100%",
                  padding: "0px 12px 12px 12px",
                }}
              >
                <HubTemplates onClose={handleClose} />
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
};

export default TabEzhub;
