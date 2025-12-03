import {
  Typography,
  TypographyProps,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { FC } from "react";

type BreakpointValue<T> = {
  xl?: T;
  lg?: T;
  md?: T;
  laptop?: T;
  sm?: T;
  xs?: T;
};

interface ButtonResponsiveProps extends TypographyProps {
  responsive?: boolean;
  responsiveVariant?: BreakpointValue<TypographyProps["variant"]>;
}

const TypographyComponent: FC<ButtonResponsiveProps> = ({
  responsive = true,
  responsiveVariant,
  variant,
  children,
  ...props
}) => {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.up("xs"));
  const isSm = useMediaQuery(theme.breakpoints.up("sm"));
  const isMd = useMediaQuery(theme.breakpoints.up("md"));
  const isLg = useMediaQuery(theme.breakpoints.up("lg"));
  const isXl = useMediaQuery(theme.breakpoints.up("xl"));
  const isLaptop = useMediaQuery(theme.breakpoints.up("laptop"));

  const computedVariant = responsive
    ? (isXl && responsiveVariant?.xl) ||
      (isLg && responsiveVariant?.lg) ||
      (isMd && responsiveVariant?.md) ||
      (isLaptop && responsiveVariant?.laptop) ||
      (isSm && responsiveVariant?.sm) ||
      (isXs && responsiveVariant?.xs) ||
      variant
    : variant;

  return (
    <Typography {...props} variant={computedVariant}>
      {children}
    </Typography>
  );
};

export default TypographyComponent;
