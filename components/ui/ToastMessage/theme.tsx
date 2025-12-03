import { Components, CssVarsTheme, Theme } from "@mui/material";
import Image from "next/image";

/**
 *
 * - `severity: "success | error | warning | info"` -> Kiểu thông báo
 * - Kết hợp Snackbar cùng với Alert
 *
 * `Example: <Snackbar open={open} onClose={handleClose} anchorOrigin={{ horizontal: "center", vertical: "top" }}>
 *       <Alert onClose={handleClose} severity="success">
 *         This is a success Alert inside a Snackbar!
 *       </Alert>
 *    </Snackbar>`
 *
 */

export const MuiAlert: Components<
  Omit<Theme, "palette" | "components"> & CssVarsTheme
>["MuiAlert"] = {
  styleOverrides: {
    root: ({ theme }) => ({
      width: "100%",
      color: theme.palette.customBase?.baseWhite,
      alignItems: "center",
      padding: 12,
      borderRadius: 8,
      ".MuiAlert-icon": {
        padding: 0,
        margin: 0,
        marginRight: 8,
      },
      ".MuiAlert-message": {
        padding: 0,
        margin: 0,
        fontSize: 14,
        fontWeight: 500,
        lineHeight: 1.5,
        fontFamily: "inherit",
        flex: 1,
      },
      ".MuiAlert-action": {
        padding: 0,
        margin: 0,
        ".MuiButtonBase-root": {
          padding: 0,
        },
      },
    }),
  },
  variants: [
    {
      props: { severity: "success" },
      style: ({ theme }) => ({
        background: theme.palette.customGreen?.default,
      }),
    },
    {
      props: { severity: "error" },
      style: ({ theme }) => ({
        background: theme.palette.customRed?.default,
      }),
    },
    {
      props: { severity: "warning" },
      style: ({ theme }) => ({
        background: theme.palette.customOrange?.default,
      }),
    },
    {
      props: { severity: "info" },
      style: ({ theme }) => ({
        background: theme.palette.customBase?.base50,
      }),
    },
  ],
  defaultProps: {
    iconMapping: {
      success: (
        <Image
          alt="success"
          src="/assets/icon/toast_success.svg"
          width={16}
          height={16}
        />
      ),
      error: (
        <Image
          alt="error"
          src="/assets/icon/toast_error.svg"
          width={16}
          height={16}
        />
      ),
      warning: (
        <Image
          alt="warning"
          src="/assets/icon/toast_warning.svg"
          width={16}
          height={16}
        />
      ),
      info: (
        <Image
          alt="info"
          src="/assets/icon/toast_info.svg"
          width={16}
          height={16}
        />
      ),
    },
  },
};

export const MuiSnackbar: Components<
  Omit<Theme, "palette" | "components"> & CssVarsTheme
>["MuiSnackbar"] = {
  styleOverrides: {
    root: ({ theme }) => ({
      maxWidth: 420,
      width: "100%",
      borderRadius: 8,
      zIndex: 999999,
      ".MuiSnackbarContent-root": {
        boxShadow: "none",
        width: "100%",
        background: "inherit",
        padding: 0,
        paddingLeft: 12,
        paddingRight: 12,
        height: 60,
      },
      ".MuiSnackbarContent-message": {
        color: theme.palette.customBase?.baseWhite,
      },
    }),
  },
};
