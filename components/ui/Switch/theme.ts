import { Components, CssVarsTheme, Theme } from "@mui/material";

export const MuiSwitch: Components<
  Omit<Theme, "components" | "palette"> & CssVarsTheme
>["MuiSwitch"] = {
  styleOverrides: {
    root: ({ theme }) => ({
      background: theme.palette.customBase?.base40,
      ".MuiSwitch-switchBase": {
        padding: "2px",
        color: theme.palette.customBase?.base20,
        "&:hover": {
          background: "transparent",
        },
        ".MuiSwitch-thumb": {
          "&::before": {
            content: '""',
            position: "absolute",
            borderBottom: `1px solid ${theme.palette.customPrimary?.primary50}`,
            borderRight: `1px solid ${theme.palette.customPrimary?.primary50}`,
            opacity: 0,
            transition: "opacity 0.3s linear",
            transform: "rotate(45deg)",
          },
        },
        "&:not(.Mui-disabled) .MuiSwitch-thumb": {
          boxShadow: "none",
          background: theme.palette.customBase?.base20,
        },
        "&.Mui-checked": {
          ".MuiSwitch-thumb": {
            "&::before": {
              opacity: 1,
            },
          },
          "& + .MuiSwitch-track": {
            backgroundColor: theme.palette.customPrimary?.primary50,
            opacity: 1,
          },
          "&.Mui-disabled": {
            "& + .MuiSwitch-track": {
              backgroundColor: theme.palette.customSupport?.primary5001,
              ...theme.applyStyles("dark", {
                backgroundColor: theme.palette.customSupport?.primary5003,
              }),
              opacity: 1,
            },
          },
        },
        "&.Mui-disabled": {
          cursor: "not-allowed",
          pointerEvents: "auto",
          ".MuiSwitch-thumb": {
            backgroundColor: theme.palette.customBase?.baseWhite,
            ...theme.applyStyles("dark", {
              backgroundColor: theme.palette.customAdditional?.baseWhite03,
            }),
          },
          "& + .MuiSwitch-track": {
            background: theme.palette.customAdditional?.base5003,
          },
        },
        // "&:hover": {
        //   background: "transparent",
        // },
        // "&.Mui-checked.Mui-disabled": {
        //   whiteSpace: "none",
        //   color: theme.palette.customBase?.baseWhite,
        //   ...theme.applyStyles("dark", {
        //     color: theme.palette.customAdditional?.baseWhite03,
        //   }),
        // },
      },
      ".MuiSwitch-track": {
        backgroundColor: theme.palette.customBase?.base40,
        opacity: "unset",
      },
    }),
  },
  variants: [
    {
      props: { size: "medium" },
      style: ({ theme }) => ({
        width: 32,
        height: 20,
        padding: 0,
        borderRadius: 40,

        ".Mui-checked": {
          transform: "translateX(12px) !important",
          color: theme.palette.customBase?.base20,
        },
        ".MuiSwitch-thumb": {
          width: 16,
          height: 16,
          "&::before": {
            top: "5px",
            left: "9px",
            width: 4,
            height: 8,
          },
        },
      }),
    },
    {
      props: { size: "small" },
      style: ({ theme }) => ({
        width: 28,
        height: 16,
        padding: 0,
        borderRadius: 40,
        "&.MuiSwitch-sizeSmall": {
          ".Mui-checked": {
            transform: "translateX(12px)",
            color: theme.palette.customBase?.base20,
          },
        },
        ".MuiSwitch-thumb": {
          width: 12,
          height: 12,
          "&::before": {
            top: "4px",
            left: "7px",
            width: 3,
            height: 6,
          },
        },
      }),
    },
  ],
  defaultProps: {
    disableRipple: true,
    disableFocusRipple: true,
    disableTouchRipple: true,
  },
};
