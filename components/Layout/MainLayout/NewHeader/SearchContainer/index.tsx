import { Box, Tooltip, useMediaQuery, useTheme } from "@mui/material";
import { t } from "i18next";
import Image from "next/image";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { memo, useState } from "react";

import Search from "../../Search";
import styles from "../index.module.css";

const SearchContainer = () => {
  const router = useRouter();
  const theme = useTheme();
  const islg = useMediaQuery(theme.breakpoints.up(1920));
  const ismd = useMediaQuery(theme.breakpoints.up(1440));
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleSearch = () => {
    setIsSearchOpen((prev) => !prev);
  };

  const handleSearchClose = () => {
    setIsSearchOpen(false);
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const currentPath = router.asPath.split("?")[0];
    const targetPath = "/";

    // Nếu đang ở trang chủ, thêm __refresh để reload
    if (currentPath === targetPath) {
      e.preventDefault();
      const refreshKey = Date.now();
      const refreshUrl = `/?__refresh=${refreshKey}`;
      router.replace(refreshUrl, "/", { scroll: false });
    }
  };

  return (
    <Box
      className={styles.searchContainer}
      sx={{
        gap: islg ? "20px" : ismd ? "16px" : "12px",
      }}
    >
      <Tooltip arrow title={t("text_home")} disableInteractive>
        <Box
          component={NextLink}
          href="/"
          prefetch={false}
          className={styles.logoWrapper}
          onClick={handleLogoClick}
          sx={{ textDecoration: "none", display: "flex" }}
        >
          <Image
            src="/assets/image/logo_doc.png"
            alt="logo"
            fill
            className={styles.logoImage}
            unoptimized
          />
        </Box>
      </Tooltip>

      <Search
        isOpen={isSearchOpen}
        onToggle={toggleSearch}
        onClose={handleSearchClose}
      />

      <Box
        className={styles.promotionWrapper}
        onClick={() =>
          window.open(
            "/promotion/linh-hoat-lua-chon-goi-phi-giao-dich-tai-fpts",
            "_blank"
          )
        }
      >
        <Box className={styles.zeroFeeWrapper}>
          <Box className={styles.zeroFeeContainer}>
            <span className={styles.zeroFeeText}>ZeroFee</span>
          </Box>
        </Box>
        <span className={styles.newTag}>Mới</span>
      </Box>
    </Box>
  );
};

export default memo(SearchContainer);
