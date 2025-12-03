import { Components, CssVarsTheme, Theme } from "@mui/material";

/**
 *
 * - `size: "xsmall | small | medium | large"` -> Kích cỡ của Bagde
 * - `type: "square | rounded"` -> Kiểu Bagde bo tròn hoặc vuông
 * - `color: "primary | secondary | success | danger | info | warrning"` -> Kiểu màu của Badge
 *
 */

export const MuiBadge: Components<
  Omit<Theme, "palette" | "components"> & CssVarsTheme
>["MuiBadge"] = {
  variants: [
    {
      props: { size: "xsmall" } as const,
      style: () => ({
        fontSize: 12,
        fontWeight: 500,
        lineHeight: 1.5,
        padding: "1px 8px",
        gap: 4,
        alignItems: "center",
      }),
    },
    {
      props: { size: "small" } as const,
      style: () => ({
        fontSize: 12,
        fontWeight: 500,
        lineHeight: 1.5,
        padding: "3px 8px",
        gap: 4,
        alignItems: "center",
      }),
    },
    {
      props: { size: "medium" } as const,
      style: () => ({
        fontSize: 14,
        fontWeight: 500,
        lineHeight: 1.5,
        padding: "3.5px 12px",
        gap: 8,
        alignItems: "center",
      }),
    },
    {
      props: { size: "large" } as const,
      style: () => ({
        fontSize: 16,
        fontWeight: 500,
        lineHeight: 1.5,
        padding: "4px 12px",
        gap: 8,
        alignItems: "center",
      }),
    },
    {
      props: { type: "square" } as const,
      style: {
        borderRadius: 4,
      },
    },
    {
      props: { type: "rounded" } as const,
      style: {
        borderRadius: 100,
      },
    },
  ],
  styleOverrides: {
    root: ({ theme }: { theme: Theme }) => ({
      "&:has(.MuiBadge-colorPrimary)": {
        background: theme.palette.customSupport?.purpledefault03,
        color: theme.palette.customPurple?.default,
      },
      "&:has(.MuiBadge-colorSecondary)": {
        background: theme.palette.customSupport?.bluedefault03,
        color: theme.palette.customBlue?.default,
      },
      "&:has(.MuiBadge-colorSuccess)": {
        background: theme.palette.customSupport?.primary5003,
        color: theme.palette.customPrimary?.primary50,
      },
      "&:has(.MuiBadge-colorWarning)": {
        background: theme.palette.customSupport?.orangedefault03,
        color: theme.palette.customOrange?.default,
      },
      "&:has(.MuiBadge-colorError)": {
        background: theme.palette.customSupport?.reddefault03,
        color: theme.palette.customRed?.default,
      },
      "&:has(.MuiBadge-colorInfo)": {
        background: theme.palette.customAdditional?.base4003,
        color: theme.palette.customBase?.base50,
        ...theme.applyStyles("dark", {
          color: theme.palette.customBase?.base20,
        }),
      },
    }),
  },
};
