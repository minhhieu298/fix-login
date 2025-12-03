import { Box } from "@mui/material";
import { ForwardedRef, forwardRef } from "react";

import { useCustomTheme } from "@/hooks/useCustomTheme";
import { IContentWelcome } from "@/interface/IContentWelcome";
import styles from "@/styles/Welcome.module.css";

const ContentWelcome = forwardRef(
  (props: IContentWelcome, ref: ForwardedRef<HTMLElement>) => {
    const {
      title,
      subtitle1,
      subtitle2,
      gradientText,
      image,
      layout,
      iconPack,
      step,
    } = props;
    const { mode } = useCustomTheme();

    return (
      <Box ref={ref} className={styles.contentWrapper}>
        <Box className={styles.titleSection}>
          <Box
            className={`${styles.mainTitle} ${
              mode === "dark" ? styles.mainTitleDark : ""
            }`}
          >
            {title}
          </Box>
          <Box className={styles.subtitle}>{subtitle1}</Box>
          <Box className={styles.subtitle}>{subtitle2}</Box>
        </Box>

        <Box className={styles.themeSection}>
          <Box
            className={`${styles.gradientText} ${
              (step === 1 && mode === "dark") ||
              (step === 2 && layout === "professional") ||
              (step === 3 && iconPack === "pink")
                ? styles.gradientTextDark
                : step === 3 && iconPack === "grey"
                  ? styles.gradientTextGrey
                  : ""
            }`}
          >
            {gradientText}
          </Box>
          {image}
        </Box>
      </Box>
    );
  }
);

ContentWelcome.displayName = "ContentWelcome";

export default ContentWelcome;
