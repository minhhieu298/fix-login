import { Components, CssVarsTheme, Theme } from "@mui/material";

export const MuiTable: Components<
  Omit<Theme, "palette" | "components"> & CssVarsTheme
>["MuiTable"] = {
  styleOverrides: {
    root: ({ theme }) => ({
      color: theme.palette.customBase?.base70,
      ...theme.applyStyles("dark", {
        color: theme.palette.customBase?.base20,
      }),
    }),
  },
};

export const MuiTableHead: Components<
  Omit<Theme, "palette" | "components"> & CssVarsTheme
>["MuiTableHead"] = {
  styleOverrides: {
    root: ({ theme }) => ({
      th: {
        background: theme.palette.customBase?.base20,
        ...theme.applyStyles("dark", {
          background: theme.palette.customBase?.base55,
        }),
      },
    }),
  },
};

export const MuiTableBody: Components<
  Omit<Theme, "palette" | "components"> & CssVarsTheme
>["MuiTableBody"] = {
  styleOverrides: {
    root: ({ theme }) => ({
      tr: {
        background: theme.palette.customBase?.base10,
        transition: "background 150ms linear",
        ...theme.applyStyles("dark", {
          background: theme.palette.customBase?.base80,
        }),
        "&:nth-of-type(even)": {
          background: theme.palette.customBase?.baseWhite,
          ...theme.applyStyles("dark", {
            background: theme.palette.customBase?.base70,
          }),
        },
        "&:hover": {
          background: theme.palette.customBase?.base20,
          ...theme.applyStyles("dark", {
            background: theme.palette.customBase?.base45,
          }),
        },
        td: {
          borderBottom: 0,
        },
      },
    }),
  },
};
