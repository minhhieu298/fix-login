import { Components, CssVarsTheme, Theme } from "@mui/material";

/**
 *
 * - `size: "xlarge | large | medium | small | xsmall"` -> Kích cỡ của Button
 * - xlarge: 48px
 * - large: 40px
 * - medium: 36px
 * - small: 32px
 * - xsmall: 28px
 *
 */

export const MuiButton: Components<
  Omit<Theme, "palette" | "components"> & CssVarsTheme
>["MuiButton"] = {
  styleOverrides: {
    root: {
      ".MuiButton-icon": { margin: 0 },
      "&": {
        whiteSpace: "nowrap",
        textTransform: "unset",
      },
      "&.Mui-disabled": {
        cursor: "not-allowed",
        pointerEvents: "auto",
      },
      ".MuiButton-loadingIndicator": {
        color: "#FFFFFF",
      },
    },
  },
  variants: [
    {
      props: { size: "xlarge" },
      style: ({ theme }) => ({
        padding: "12px 24px",
        gap: theme.spacing(2),
        borderRadius: 12,
        whiteSpace: "nowrap",
        "&.MuiButton-sizeXlarge:has(.MuiButton-startIcon)": {
          paddingLeft: 16,
        },
        "&.MuiButton-sizeXlarge:has(.MuiButton-endIcon)": {
          paddingRight: 16,
        },
      }),
    },
    {
      props: { size: "large" },
      style: ({ theme }) => ({
        padding: "9.5px 24px",
        gap: theme.spacing(2),
        borderRadius: 12,
        "&.MuiButton-sizeLarge:has(.MuiButton-startIcon)": {
          paddingLeft: 16,
        },
        "&.MuiButton-sizeLarge:has(.MuiButton-endIcon)": {
          paddingRight: 16,
        },
      }),
    },
    {
      props: { size: "medium" },
      style: ({ theme }) => ({
        padding: "7.5px 16px",
        gap: theme.spacing(1.5),
        borderRadius: 8,
        "&.MuiButton-sizeMedium:has(.MuiButton-startIcon)": {
          paddingLeft: 12,
        },
        "&.MuiButton-sizeMedium:has(.MuiButton-endIcon)": {
          paddingRight: 12,
        },
      }),
    },
    {
      props: { size: "small" },
      style: ({ theme }) => ({
        padding: "7px 16px",
        gap: theme.spacing(1.5),
        borderRadius: 8,
        "&.MuiButton-sizeSmall:has(.MuiButton-startIcon)": {
          paddingLeft: 12,
        },
        "&.MuiButton-sizeSmall:has(.MuiButton-endIcon)": {
          paddingRight: 12,
        },
      }),
    },
    {
      props: { size: "xsmall" },
      style: ({ theme }) => ({
        padding: "5px 12px",
        gap: theme.spacing(1),
        borderRadius: 8,
        "&.MuiButton-sizeXsmall:has(.MuiButton-startIcon)": {
          paddingLeft: 8,
        },
        "&.MuiButton-sizeXsmall:has(.MuiButton-endIcon)": {
          paddingRight: 8,
        },
      }),
    },
    {
      props: { variant: "primary" },
      style: ({ theme }) => ({
        background: theme.palette.customPrimary?.primary50,
        color: theme.palette.customBase?.baseWhite,
        ":hover": {
          background: theme.palette.customPrimary?.primary40,
        },
        ":disabled": {
          background: theme.palette.customSupport?.primary5005,
          color: theme.palette.customBase?.baseWhite,
          ...theme.applyStyles("dark", {
            background: theme.palette.customSupport?.primary5003,
            color: theme.palette.customAdditional?.baseWhite03,
          }),
        },
      }),
    },
    {
      props: { variant: "secondary" },
      style: ({ theme }) => ({
        background: theme.palette.customBase?.base20,
        color: theme.palette.customBase?.base60,
        ...theme.applyStyles("dark", {
          background: theme.palette.customBase?.base50,
          color: theme.palette.customBase?.baseWhite,
        }),
        ":hover": {
          background: theme.palette.customBase?.base30,
          ...theme.applyStyles("dark", {
            background: theme.palette.customBase?.base40,
          }),
        },
        ":disabled": {
          background: theme.palette.customBase?.base20,
          color: theme.palette.customAdditional?.base8003,
          ...theme.applyStyles("dark", {
            color: theme.palette.customAdditional?.baseWhite03,
            background: theme.palette.customAdditional?.base5003,
          }),
        },
      }),
    },
    {
      props: { variant: "danger" },
      style: ({ theme }) => ({
        background: theme.palette.customRed?.default,
        color: theme.palette.customBase?.baseWhite,
        ":hover": {
          background: theme.palette.customRed?.light,
        },
        ":disabled": {
          background: theme.palette.customSupport?.reddefault03,
          color: theme.palette.customBase?.baseWhite,
          ...theme.applyStyles("dark", {
            color: theme.palette.customAdditional?.baseWhite03,
          }),
        },
      }),
    },
    {
      props: {
        variant: "ghostPrimary",
      },
      style: ({ theme }) => ({
        color: theme.palette.customPrimary?.primary50,
        ":hover": {
          color: theme.palette.customPrimary?.primary40,
        },
        ":disabled": {
          ...theme.applyStyles("dark", {
            color: theme.palette.customSupport?.primary5003,
          }),
          ...theme.applyStyles("light", {
            color: theme.palette.customSupport?.primary5005,
          }),
        },
      }),
    },
    {
      props: {
        variant: "ghostSecondary",
      },
      style: ({ theme }) => ({
        ...theme.applyStyles("dark", {
          color: theme.palette.customBase?.base40,
          ":hover": {
            color: theme.palette.customBase?.base30,
          },
          ":disabled": {
            color: theme.palette.customAdditional?.baseWhite03,
          },
        }),
        ...theme.applyStyles("light", {
          color: theme.palette.customBase?.base60,
          ":hover": {
            color: theme.palette.customBase?.base40,
          },
          ":disabled": {
            color: theme.palette.customAdditional?.base8003,
          },
        }),
      }),
    },
    {
      props: {
        loading: true,
      },
      style: {
        color: "transparent !important",
      },
    },
  ],
  defaultProps: {
    disableRipple: true,
    disableTouchRipple: true,
    disableFocusRipple: true,
  },
};

export const MuiIconButton: Components<
  Omit<Theme, "palette" | "components"> & CssVarsTheme
>["MuiIconButton"] = {
  styleOverrides: {
    root: {
      transition: "none",
    },
  },
  variants: [
    {
      props: { size: "xlarge" },
      style: {
        padding: 12,
      },
    },
    {
      props: { size: "large" },
      style: {
        padding: 10,
      },
    },
    {
      props: { size: "medium" },
      style: {
        padding: 10,
      },
    },
    {
      props: { size: "regular" },
      style: {
        padding: 10,
      },
    },
    {
      props: { size: "small" },
      style: {
        padding: 8,
      },
    },
    {
      props: { color: "default" },
      style: {},
    },
    {
      props: { color: "info" },
      style: ({ theme }) => ({
        background: theme.palette.customBase?.base20,
        ...theme.applyStyles("dark", {
          background: theme.palette.customBase?.base55,
        }),
        "&.Mui-disabled": {
          background: theme.palette.customAdditional?.base2006,
          ...theme.applyStyles("dark", {
            background: theme.palette.customAdditional?.base5003,
          }),
        },
        "&:hover": {
          background: theme.palette.customBase?.base25,
          ...theme.applyStyles("dark", {
            background: theme.palette.customBase?.base50,
          }),
        },
      }),
    },
  ],
  defaultProps: {
    tabIndex: -1,
    disableTouchRipple: true,
    disableFocusRipple: true,
    disableRipple: true,
  },
};
