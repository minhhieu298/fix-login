import { Button, ButtonProps, useMediaQuery, useTheme } from "@mui/material";
import React, { FC } from "react";

type BreakpointValue<T> = {
  xl?: T;
  lg?: T;
  md?: T;
  laptop?: T;
  sm?: T;
  xs?: T;
};

interface ButtonResponsiveProps extends ButtonProps {
  responsive?: boolean;
  responsiveSize?: BreakpointValue<ButtonProps["size"]>;
}

const ButtonComponent: FC<ButtonResponsiveProps> = ({
  responsive = true,
  responsiveSize,
  size,
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

  const computedSize = responsive
    ? (isXl && responsiveSize?.xl) ||
      (isLg && responsiveSize?.lg) ||
      (isMd && responsiveSize?.md) ||
      (isLaptop && responsiveSize?.laptop) ||
      (isSm && responsiveSize?.sm) ||
      (isXs && responsiveSize?.xs) ||
      size
    : size;

  return (
    <Button {...props} size={computedSize}>
      {children}
    </Button>
  );
};

export default ButtonComponent;
