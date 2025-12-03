import { Box, Typography } from "@mui/material";
import { ForwardedRef, forwardRef } from "react";

import { useCustomTheme } from "@/hooks/useCustomTheme";

import { IContentWelcome } from "../IContentWelcome";
import style from "../Welcome.module.css";

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
      <Box ref={ref} className={style.contentWrapper}>
        <Box className={style.titleSection}>
          <Typography
            variant="heading20-S30"
            className={`${style.mainTitle} ${
              mode === "dark" ? style.mainTitleDark : ""
            }`}
          >
            {title}
          </Typography>
          <Box>
            <Box className={style.subtitle}>{subtitle1}</Box>
            <Box className={style.subtitle}>{subtitle2}</Box>
          </Box>
        </Box>

        <Box className={style.themeSection}>
          <Typography
            variant="heading28-S42"
            className={`${style.gradientText} ${
              (step === 1 && mode === "dark") ||
              (step === 2 && layout === "personal") ||
              (step === 3 && iconPack === "pink")
                ? style.gradientTextDark
                : step === 3 && iconPack === "grey"
                  ? style.gradientTextGrey
                  : step === 2 && layout === "classic"
                    ? style.greenText
                    : ""
            }`}
          >
            {gradientText}
          </Typography>
          {image}
        </Box>
      </Box>
    );
  }
);

ContentWelcome.displayName = "ContentWelcome";

export default ContentWelcome;
