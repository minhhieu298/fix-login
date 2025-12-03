import { Box, Button, Stack, Tooltip } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { useWidgetContext } from "@/context/WidgetContext";
import { useCustomLanguage } from "@/hooks/useCustomLanguage";

import { CloseWidget } from "./Header/icons/CloseWidget";
import NewHeader from "./NewHeader";
import { ITopAppBarLayout } from "./types";

const LayoutContent = ({
  children,
  openWidgetPopper,
  userInfo2FA,
}: ITopAppBarLayout) => {
  const { t } = useCustomLanguage();
  const { open } = useWidgetContext();
  const router = useRouter();
  const [tooltipOpen, setTooltipOpen] = useState(false);

  // Đóng tooltip khi widget được mở
  useEffect(() => {
    if (open) {
      setTooltipOpen(false);
    }
  }, [open]);

  const settingInfo = useSelector(
    (state: {
      settingReducer: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setting: any;
      };
    }) => state.settingReducer.setting
  );

  const refreshKey =
    typeof router.query.__refresh === "string"
      ? router.query.__refresh
      : Array.isArray(router.query.__refresh)
        ? router.query.__refresh.join("_")
        : "";

  return (
    <Box
      className="main_layout"
      height="100vh"
      sx={(theme) => ({
        width: "100%",
        overflowX: "auto",
        display: "flex",
        background: theme.palette.customSupport?.primary11,
        ...theme.applyStyles("dark", {
          background: theme.palette.customBase?.base90,
        }),
      })}
    >
      <Stack
        sx={{
          minWidth: 0,
          width: "100%",
          height: "100%",
          flexDirection:
            settingInfo?.position === "Bottom" ? "column-reverse" : "column",
        }}
      >
        <Stack
          sx={{
            minWidth: "1280px",
            flex: 1,
            width: "100%",
            overflow: "hidden",
            flexShrink: 0,
            flexDirection:
              settingInfo?.position === "Left"
                ? "row"
                : settingInfo?.position === "Right"
                  ? "row-reverse"
                  : settingInfo?.position === "Bottom"
                    ? "column-reverse"
                    : "column",
            gap: 2,
            padding:
              settingInfo?.position === "Bottom"
                ? "12px 12px 0px 12px"
                : "12px",
            position: "relative",
          }}
        >
          {/* <Header /> */}
          <NewHeader />
          <Box
            key={`${router.pathname}-${refreshKey}`}
            sx={() => ({
              height: "100%",
              overflowY: "auto",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: 3,
              maxWidth: "1920px",
              margin: "auto",
            })}
          >
            {children}
          </Box>

          {router.pathname === "/" &&
          userInfo2FA.Data &&
          Object.keys(userInfo2FA.Data).length > 0 &&
          userInfo2FA.Code === 0 ? (
            <Tooltip
              title={t("text_add_widget_screen")}
              placement={settingInfo?.position === "Left" ? "left" : "right"}
              arrow
              open={tooltipOpen && !open}
              onOpen={() => !open && setTooltipOpen(true)}
              onClose={() => setTooltipOpen(false)}
              slotProps={{
                popper: {
                  modifiers: [
                    {
                      name: "offset",
                      options: {
                        offset:
                          settingInfo?.position === "Left" ? [0, -4] : [0, 4],
                      },
                    },
                  ],
                },
              }}
            >
              <Button
                sx={(theme) => ({
                  position: "fixed",
                  top: "50%",
                  left: settingInfo?.position === "Left" ? "auto" : "0px",
                  right: settingInfo?.position === "Left" ? "0px" : "auto",
                  transform: "translateY(-50%)",
                  width: open ? "28px" : "10px",
                  height: "48px",
                  minWidth: open ? "28px" : "10px",
                  borderRadius: open
                    ? "0px"
                    : settingInfo?.position === "Left"
                      ? "12px 0 0 12px"
                      : "0 12px 12px 0",
                  // Áp dụng mask và borderBlock khi open === true
                  ...(open && {
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: "-16px",
                      left: settingInfo?.position === "Left" ? 0 : "auto",
                      right: settingInfo?.position === "Left" ? "auto" : 0,
                      width: "28px",
                      height: "48px",
                      background: theme.palette.customPrimary?.primary50,
                      "--r": "16px",
                      lineHeight: 1.7,
                      paddingInline: ".5em",
                      borderBlock: "var(--r) solid #0000",
                      mask:
                        settingInfo?.position === "Left"
                          ? "radial-gradient(var(--r) at 100% var(--r), #0000 98%, #000 101%) 0% calc(-1 * var(--r)) / var(--r) 100% repeat-y, conic-gradient(#000 0 0) padding-box"
                          : "radial-gradient(var(--r) at 0 var(--r), #0000 98%, #000 101%) 100% calc(-1 * var(--r)) / var(--r) 100% repeat-y, conic-gradient(#000 0 0) padding-box",
                      zIndex: 1,
                    },
                  }),
                  background: open
                    ? theme.palette.customPrimary?.primary50
                    : theme.palette.customSupport?.primary5003,
                  color: "#ffffff",
                  border: "none",
                  padding:
                    settingInfo?.position === "Left"
                      ? "4px 2px 4px 4px"
                      : "4px 4px 4px 2px",
                  gap: "10px",
                  opacity: 1,
                  transition: open ? "none" : "all 0.3s ease",
                  zIndex: 1300,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  "&:hover": {
                    width: open ? "28px" : "20px",
                    minWidth: open ? "28px" : "20px",
                    padding:
                      settingInfo?.position === "Left"
                        ? "4px 4px 4px 8px"
                        : "4px 8px 4px 4px",
                    background: theme.palette.customPrimary?.primary50,
                    transform: "translateY(-50%)",
                  },
                })}
                onClick={openWidgetPopper}
              >
                {open ? (
                  <Box
                    sx={{
                      position: "absolute",
                      top: "16px",
                      left: "5px",
                      zIndex: 2,
                    }}
                  >
                    <CloseWidget />
                  </Box>
                ) : null}
              </Button>
            </Tooltip>
          ) : null}
        </Stack>
        {/* <Footer userInfo2FA={userInfo2FA} /> */}
      </Stack>
    </Box>
  );
};

export default LayoutContent;
