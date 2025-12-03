import { Components, CssVarsTheme, Theme } from "@mui/material";

/**
 *
 * - `size: "large | medium | small"` -> Kích cỡ của Chip
 * - large: 48px
 * - medium: 32px
 * - small: 28px
 *
 * - `type: "filter | input | suggestion | assist"` -> Kiểu dáng của Chip
 */

export const MuiChip: Components<
  Omit<Theme, "palette" | "components"> & CssVarsTheme
>["MuiChip"] = {
  styleOverrides: {
    root: () => ({
      cursor: "pointer",
      ".MuiChip-deleteIcon": {
        margin: 0,
      },
      ".MuiChip-label": {
        display: "flex",
        padding: 0,
      },
      ".MuiChip-avatar": {
        margin: 0,
      },
    }),
  },
  variants: [
    {
      props: { size: "large" },
      style: () => ({
        padding: "8px 16px",
        height: 40,
        borderRadius: 40,
        gap: 8,
      }),
    },
    {
      props: { size: "medium" },
      style: () => ({
        padding: "5.5px 12px",
        height: 32,
        borderRadius: 16,
        gap: 8,
      }),
    },
    {
      props: { size: "small" },
      style: () => ({
        padding: "5px 12px",
        height: 28,
        borderRadius: 16,
        gap: 4,
      }),
    },
    {
      props: { type: "filter" },
      style: ({ theme }) => ({
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: theme.palette.customSupport?.primary5003,
        color: theme.palette.customPrimary?.primary70,
        background: theme.palette.customBase?.base20,
        ...theme.applyStyles("dark", {
          color: theme.palette.customPrimary?.primary20,
          background: theme.palette.customBase?.base70,
        }),
        "&:hover": {
          background: theme.palette.customBase?.baseWhite,
          ...theme.applyStyles("dark", {
            background: theme.palette.customBase?.base60,
          }),
        },
        "&.selected": {
          background: theme.palette.customSupport?.primary5003,
          "&:hover": {
            background: theme.palette.customSupport?.primary5001,
            ...theme.applyStyles("dark", {
              background: theme.palette.customSupport?.primary5005,
            }),
          },
        },
        "&.MuiChip-sizeLarge:has(.MuiChip-deleteIcon)": {
          paddingRight: 8,
        },
        "&.MuiChip-sizeMedium:has(.MuiChip-deleteIcon)": { paddingRight: 8 },
        "&.MuiChip-sizeSmall:has(.MuiChip-deleteIcon)": { paddingRight: 4 },
      }),
    },
    {
      props: { type: "assist" },
      style: ({ theme }) => ({
        borderWidth: 0,
        color: theme.palette.customBase?.base70,
        ...theme.applyStyles("dark", {
          color: theme.palette.customBase?.base20,
        }),
        "&:hover": {
          color: theme.palette.customPrimary?.primary50,
        },
        "&.MuiChip-sizeLarge:has(.MuiChip-deleteIcon)": {
          paddingRight: 8,
        },
        "&.MuiChip-sizeMedium:has(.MuiChip-deleteIcon)": { paddingRight: 8 },
        "&.MuiChip-sizeSmall:has(.MuiChip-deleteIcon)": { paddingRight: 4 },
      }),
    },
    {
      props: { type: "input" },
      style: ({ theme }) => ({
        borderWidth: 0,
        background: theme.palette.customBase?.base20,
        ...theme.applyStyles("dark", {
          background: theme.palette.customBase?.base70,
        }),
        "&:hover": {
          background: theme.palette.customBase?.base10,
          ...theme.applyStyles("dark", {
            background: theme.palette.customBase?.base60,
          }),
        },
        "&.MuiChip-sizeLarge:has(.MuiChip-deleteIcon)": {
          paddingRight: 8,
        },
        "&.MuiChip-sizeMedium:has(.MuiChip-deleteIcon)": { paddingRight: 8 },
        "&.MuiChip-sizeSmall:has(.MuiChip-deleteIcon)": { paddingRight: 4 },
        "&.MuiChip-sizeLarge:has(.MuiChip-avatar)": {
          paddingLeft: 8,
          ".MuiChip-avatar": {
            width: 24,
            height: 24,
          },
        },
        "&.MuiChip-sizeMedium:has(.MuiChip-avatar)": {
          paddingLeft: 8,
          ".MuiChip-avatar": {
            width: 16,
            height: 16,
          },
        },
        "&.MuiChip-sizeSmall:has(.MuiChip-avatar)": {
          paddingLeft: 4,
          ".MuiChip-avatar": {
            width: 12,
            height: 12,
          },
        },
      }),
    },
    {
      props: { type: "suggestion" },
      style: ({ theme }) => ({
        color: theme.palette.customBase?.base80,
        background: theme.palette.customBase?.base20,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: theme.palette.customBase?.base40,
        ...theme.applyStyles("dark", {
          color: theme.palette.customBase?.base10,
          background: theme.palette.customBase?.base70,
        }),
        "&:hover": {
          background: theme.palette.customBase?.baseWhite,
          ...theme.applyStyles("dark", {
            background: theme.palette.customBase?.base60,
          }),
        },
      }),
    },
  ],
};
