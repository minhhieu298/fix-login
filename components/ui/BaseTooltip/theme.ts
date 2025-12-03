import { Components, CssVarsTheme, Fade, Theme } from "@mui/material";

export const MuiTooltip: Components<
  Omit<Theme, "components" | "palette"> & CssVarsTheme
>["MuiTooltip"] = {
  styleOverrides: {
    arrow: ({ theme }: { theme: Theme }) => ({
      color: theme.palette.customBase?.base20,
      ...theme.applyStyles("dark", {
        color: theme.palette.customBase?.base50,
      }),
    }),
    tooltip: ({ theme }: { theme: Theme }) => ({
      background: theme.palette.customBase?.base20,
      color: theme.palette.customBase?.base60,
      padding: 12,
      borderRadius: 8,
      fontSize: 12,
      fontWeight: 600,
      boxShadow: "0 4px 16px 0 rgba(0, 0, 0, 0.12)",
      ...theme.applyStyles("dark", {
        background: theme.palette.customBase?.base50,
        color: theme.palette.customBase?.base30,
      }),
      ".heading-tooltip": {
        color: theme.palette.customBase?.base90,
        ...theme.applyStyles("dark", {
          color: theme.palette.customBase?.baseWhite,
        }),
        display: "block",
        marginBottom: 4,
      },
    }),
  },
  defaultProps: {
    slots: {
      transition: Fade,
    },
    slotProps: {
      transition: {
        timeout: 200,
      },
    },
    arrow: true,
    placement: "top",
  },
};
