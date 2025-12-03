import { Box, Tooltip } from "@mui/material";
import Image from "next/image";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useSelector } from "react-redux";

import { useCustomLanguage } from "@/hooks/useCustomLanguage";
import { IResponseLogin } from "@/interface/interface";

import { MegamenuIcon } from "../icons/MegamenuIcon";
import { NotificationIcon } from "../icons/NotificationIcon";
import { PromotionIcon } from "../icons/PromotionIcon";
import styles from "../index.module.css";
import MegaMenu from "../MegaMenu";
import LoginButton from "./LoginButton";

const HeaderRight = () => {
  const { t } = useCustomLanguage();
  const router = useRouter();
  const [ancholElMega, setAncholElMega] = useState<HTMLElement | null>(null);

  const userInfo2FA = useSelector(
    (state: {
      AuthReducer: {
        userInfo2FA: IResponseLogin;
      };
    }) => state.AuthReducer.userInfo2FA
  );

  const handleMegaMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAncholElMega(ancholElMega ? null : event.currentTarget);
  };

  const handlePromotionClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const currentPath = router.asPath.split("?")[0];
    const targetPath = "/promotion";

    // Nếu đang ở trang promotion, thêm __refresh để reload
    if (currentPath === targetPath) {
      e.preventDefault();
      const refreshKey = Date.now();
      const refreshUrl = `/promotion?__refresh=${refreshKey}`;
      router.replace(refreshUrl, "/promotion", { scroll: false });
    }
  };

  const open = Boolean(ancholElMega);
  const id = open ? "mega-menu" : undefined;
  return (
    <Box
      className={styles.headerRight}
      sx={{
        gap:
          userInfo2FA.Data &&
          Object.keys(userInfo2FA.Data).length > 0 &&
          userInfo2FA.Code === 0
            ? "16px"
            : "8px",
      }}
    >
      <Box className={styles.headerRightIcon}>
        <Tooltip arrow title={t("all_function")} disableInteractive>
          <Box
            className={styles.wrapIcon}
            sx={{
              background: open ? "rgba(26, 175, 116, 0.3)" : "transparent",
            }}
            onClick={handleMegaMenu}
            aria-describedby={id}
          >
            <MegamenuIcon />
          </Box>
        </Tooltip>
        <Tooltip arrow title="EzChat" disableInteractive>
          <Box className={styles.wrapIcon}>
            <Image
              src="/assets/image/chatbot.png"
              alt="chatbot"
              width={36}
              height={36}
            />
          </Box>
        </Tooltip>
        <Tooltip arrow title={t("promotion")} disableInteractive>
          <Box
            component={NextLink}
            href="/promotion"
            prefetch={false}
            className={styles.wrapIcon}
            onClick={handlePromotionClick}
            sx={{ textDecoration: "none", display: "flex" }}
          >
            <PromotionIcon />
          </Box>
        </Tooltip>
        <Tooltip arrow title={t("text_notifi")} disableInteractive>
          <Box className={styles.wrapIcon}>
            <NotificationIcon />
          </Box>
        </Tooltip>
      </Box>
      <Box className={styles.loginMenu}>
        <LoginButton />
      </Box>
      <MegaMenu
        anchorEl={ancholElMega}
        open={open}
        id={id!}
        setAncholElMega={setAncholElMega}
      />
    </Box>
  );
};

export default HeaderRight;
