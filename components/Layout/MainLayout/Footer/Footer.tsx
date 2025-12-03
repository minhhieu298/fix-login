import { Box, Stack, Tooltip, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import { memo, useState } from "react";
import { useSelector } from "react-redux";

import TabEzhub from "@/components/Ezhub/TabEzhub";
import { DevideEzHubIcon } from "@/components/Icons/DevideEzHubIcon";
import ClockAPI from "@/hooks/useClock";
import { useCustomLanguage } from "@/hooks/useCustomLanguage";
import { IResponseLogin } from "@/interface/interface";

import styles from "../index.module.css";
import StatusWebSite from "../StatusWebSite";

const Footer = ({ userInfo2FA }: { userInfo2FA: IResponseLogin }) => {
  const { t } = useCustomLanguage();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const settingInfo = useSelector(
    (state: {
      settingReducer: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setting: any;
      };
    }) => state.settingReducer.setting
  );

  const handleOpenEzhub = () => {
    if (router.pathname === "/") {
      setOpen(!open);
    }
  };

  return (
    <Box
      className={styles.footer}
      sx={(theme) => ({
        background: theme.palette.customBase?.baseWhite,
        // display: "flex",
        // alignItems: "center",
        // justifyContent: "space-between",
        ...theme.applyStyles("dark", {
          background: theme.palette.customBase?.base80,
        }),
      })}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          marginLeft: "0px !important",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            margin: 0,
            gap: 3,
          }}
        >
          <Tooltip
            title={t("list_ezhub")}
            disableHoverListener={router.pathname !== "/"}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 3,
                cursor: router.pathname === "/" ? "pointer" : "default",
              }}
              onClick={handleOpenEzhub}
            >
              <Box position="relative" width={68.37} height={18}>
                <Image
                  src="/assets/icon/logo_ngang 3.png"
                  alt="logo-bottom"
                  priority
                  fill
                  sizes="68.37px"
                  style={{ objectFit: "contain" }}
                />
              </Box>
              {userInfo2FA.Data &&
                Object.keys(userInfo2FA.Data).length > 0 &&
                userInfo2FA.Code === 0 &&
                router.pathname === "/" && (
                  <>
                    <Image
                      src="/assets/icon/ezhub-down.svg"
                      alt="arrow"
                      width={16}
                      height={16}
                      style={{
                        transform:
                          settingInfo?.position !== "Bottom"
                            ? open
                              ? "rotate(0deg)"
                              : "rotate(180deg)"
                            : open
                              ? "rotate(180deg)"
                              : "rotate(0deg)",
                      }}
                    />
                    <DevideEzHubIcon />
                  </>
                )}
            </Box>
          </Tooltip>

          <Stack
            sx={(theme) => ({
              gap: 4,
              flexDirection: "row",
              padding: "6px 0",
              overflowX: "auto",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitUserSelect: "none",
              MozUserSelect: "none",
              msUserSelect: "none",
              userSelect: "none",
              color: theme.palette.customBase?.base80,
              ...theme.applyStyles("dark", {
                color: theme.palette.customBase?.base20,
              }),
            })}
          >
            <Typography variant="sub12-M18" sx={{ textWrap: "nowrap" }}>
              VNINDEX
            </Typography>
            <Typography variant="sub12-B18" sx={{ textWrap: "nowrap" }}>
              1275.14
            </Typography>
            <Typography
              variant="sub12-M18"
              color="#1AAF74"
              sx={{ textWrap: "nowrap" }}
            >
              + 2.27
            </Typography>
            <Typography
              variant="sub12-M18"
              color="#1AAF74"
              sx={{ textWrap: "nowrap" }}
            >
              + 0.90%
            </Typography>
          </Stack>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <ClockAPI />
          <StatusWebSite />
          <Image
            src="/assets/icon/icon-wifi.png"
            width={12}
            height={12}
            alt="icon-wifi"
            style={{
              marginLeft: "12px",
            }}
          />
          <Typography
            variant="sub12-M18"
            sx={{
              marginLeft: "12px",
              textWrap: "nowrap",
            }}
            color="#1AAF74"
          >
            Đã kết nối
          </Typography>
        </Box>
      </Box>
      <TabEzhub open={open} handleClose={() => setOpen(false)} />
    </Box>
  );
};

export default memo(Footer);
