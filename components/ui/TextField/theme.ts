import { Components, CssVarsTheme, Theme } from "@mui/material";

/**
 *
 * - `size: "xlarge | large | medium | small"` -> Kích cỡ của Input
 * - xlarge: 56px
 * - large: 48px
 * - medium: 40px
 * - small: 32px
 *
 * Kiểu xlarge thường dùng cho các form như login, đổi mật khẩu
 */

export const MuiInputBase: Components<
  Omit<Theme, "palette" | "components"> & CssVarsTheme
>["MuiInputBase"] = {
  styleOverrides: {
    root: ({ theme }: { theme: Theme }) => ({
      background: theme.palette.customBase?.base20,
      ...theme.applyStyles("dark", {
        color: theme.palette.customBase?.base20,
        background: theme.palette.customBase?.base55,
      }),
      "&.MuiFilledInput-root": {
        transition: "none",
        background: theme.palette.customBase?.base20,
        ...theme.applyStyles("dark", {
          background: theme.palette.customBase?.base55,
        }),
        "&.Mui-focused": {
          background: theme.palette.customBase?.base20,
          ...theme.applyStyles("dark", {
            background: theme.palette.customBase?.base55,
          }),
        },
      },
      "&::placeholder": {
        color: theme.palette.customAdditional?.base8003,
        fontFamily: "inherit",
        fontSize: 12,
        fontWeight: 500,
        lineHeight: 1.5,
        ...theme.applyStyles("dark", {
          color: theme.palette.customAdditional?.baseWhite03,
        }),
      },
      "&.Mui-focused:has(.MuiSelect-select)": {
        borderColor: theme.palette.customPrimary?.primary50,
      },
      "&.Mui-readOnly:has(.MuiSelect-select)": {
        borderColor: "transparent",
        cursor: "auto",
        ".MuiSelect-select": {
          cursor: "auto",
        },
      },
      "&.Mui-disabled": {
        cursor: "not-allowed",
        background: theme.palette.customAdditional?.base2006,
        ...theme.applyStyles("dark", {
          background: theme.palette.customBase?.base70,
        }),
        ".MuiSelect-select": {
          cursor: "not-allowed",
          color: theme.palette.customAdditional?.base8003,
          ...theme.applyStyles("dark", {
            color: theme.palette.customAdditional?.baseWhite03,
          }),
        },
      },
      ".MuiSelect-icon": {
        fontSize: 16,
        color: theme.palette.customBase?.base40,
        fill: theme.palette.customBase?.base40,
        right: "7px",
        "&.Mui-disabled": {
          color: theme.palette.customAdditional?.base8003,
          fill: theme.palette.customAdditional?.base8003,
          ...theme.applyStyles("dark", {
            color: theme.palette.customAdditional?.baseWhite03,
            fill: theme.palette.customAdditional?.baseWhite03,
          }),
        },
      },
      "&:has(.MuiSelect-select)": {
        borderRadius: 12,
        "&.MuiInputBase-sizeSmall": {
          borderRadius: 8,
        },
        fieldset: {
          borderColor: "transparent",
        },
        "&:hover": {
          fieldset: {
            borderColor: theme.palette.customPrimary?.primary50,
          },
        },
        "&.Mui-focused": {
          fieldset: {
            borderWidth: 1,
            borderColor: theme.palette.customPrimary?.primary50,
          },
        },
        "&.Mui-disabled": {
          background: theme.palette.customAdditional?.base2006,
          ...theme.applyStyles("dark", {
            background: theme.palette.customBase?.base70,
          }),
          ".MuiSelect-select": {
            background: theme.palette.customAdditional?.base2006,
            ...theme.applyStyles("dark", {
              background: theme.palette.customBase?.base70,
            }),
          },
          fieldset: {
            borderColor: "transparent",
          },
        },
      },
      "&.Mui-error": {
        ".MuiOutlinedInput-notchedOutline": {
          borderWidth: 1,
          borderColor: `${theme.palette.customRed?.default}`,
        },
      },
    }),
  },
  variants: [
    {
      props: { size: "xlarge" },
      style: {},
    },
    {
      props: { size: "large" },
      style: ({ theme }) => ({
        background: theme.palette.customBase?.base20,
        color: theme.palette.customBase?.base80,
        borderRadius: 12,
        cursor: "pointer",
        ...theme.applyStyles("dark", {
          background: theme.palette.customBase?.base55,
          color: theme.palette.customBase?.base20,
        }),
        ".MuiSelect-select": {
          padding: "12px 12px 12px 16px",
          lineHeight: 1.5,
          minHeight: "auto",
          fontSize: 16,
          paddingRight: 28,
        },
      }),
    },
    {
      props: { size: "medium" },
      style: ({ theme }) => ({
        background: theme.palette.customBase?.base20,
        color: theme.palette.customBase?.base80,
        borderRadius: 12,
        cursor: "pointer",
        ...theme.applyStyles("dark", {
          background: theme.palette.customBase?.base55,
          color: theme.palette.customBase?.base20,
        }),
        ".MuiSelect-select": {
          lineHeight: 1.5,
          minHeight: "auto",
          fontSize: 14,
          paddingRight: 28,
          padding: "9.5px 32px 9.5px 16px",
        },
      }),
    },
    {
      props: { size: "small" },
      style: ({ theme }) => ({
        background: theme.palette.customBase?.base20,
        color: theme.palette.customBase?.base80,
        borderRadius: 12,
        cursor: "pointer",
        ...theme.applyStyles("dark", {
          background: theme.palette.customBase?.base55,
          color: theme.palette.customBase?.base20,
        }),
        ".MuiSelect-select": {
          // padding: 0,
          lineHeight: 1.5,
          minHeight: "auto",
          fontSize: 12,
          paddingRight: 24,
          padding: "7px 8px 7px 12px",
        },
      }),
    },
  ],
};

export const MuiInputAdornment: Components<
  Omit<Theme, "palette" | "components"> & CssVarsTheme
>["MuiInputAdornment"] = {
  defaultProps: {
    sx: {
      m: "0 !important",
      cursor: "auto",
    },
  },
};

export const MuiTextField: Components<
  Omit<Theme, "palette" | "components"> & CssVarsTheme
>["MuiTextField"] = {
  styleOverrides: {
    root: ({ theme }) => ({
      "&": {
        fontFamily: "Manrope Variable, sans-serif",
        ".MuiOutlinedInput-root": {
          background: theme.palette.customBase?.base20,
          color: theme.palette.customBase?.base80,
          caretColor: theme.palette.customPrimary?.primary50,
          overflow: "hidden",

          ...theme.applyStyles("dark", {
            background: theme.palette.customBase?.base55,
            color: theme.palette.customBase?.base20,
          }),
          fieldset: {
            borderWidth: 1,
            borderStyle: "solid",
            borderColor: "transparent",
            top: 0,
            height: "100%",
            legend: {
              display: "none",
            },
          },
          "&:hover": {
            fieldset: {
              borderWidth: 1,
              borderColor: theme.palette.customPrimary?.primary50,
            },
            "&:has(.Mui-readOnly)": {
              fieldset: {
                borderWidth: 1,
                borderColor: "transparent",
              },
            },
          },

          "&.Mui-focused": {
            fieldset: {
              borderWidth: 1,
              borderColor: theme.palette.customPrimary?.primary50,
            },
            "&:has(.Mui-readOnly)": {
              fieldset: {
                borderWidth: 1,
                borderColor: "transparent",
              },
            },
          },

          "&.Mui-disabled": {
            color: theme.palette.customAdditional?.base8003,
            background: theme.palette.customAdditional?.base2006,
            ...theme.applyStyles("dark", {
              color: theme.palette.customAdditional?.baseWhite03,
              background: theme.palette.customBase?.base70,
            }),
            fieldset: {
              border: 0,
            },
            "& >*": {
              cursor: "not-allowed",
            },
          },
          "&.Mui-error": {
            fieldset: {
              borderWidth: 1,
              borderColor: theme.palette.customRed?.default,
            },
          },
          "&:has(.Mui-readOnly)": {
            "& >*": {
              cursor: "auto",
            },
          },
        },
        ".MuiInputLabel-root": {
          display: "flex",
          lineHeight: 1.5,
          zIndex: 1,
          fontFamily: "inherit",
          color: theme.palette.customBase?.base50,
          ...theme.applyStyles("dark", {
            color: theme.palette.customBase?.base30,
          }),
          transition:
            "transform 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms,font-size 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms",
          "&.Mui-focused": {
            color: theme.palette.customBase?.base50,
            ...theme.applyStyles("dark", {
              color: theme.palette.customBase?.base30,
            }),
          },
          "&.MuiFormLabel-filled": {
            color: theme.palette.customBase?.base50,
            ...theme.applyStyles("dark", {
              color: theme.palette.customBase?.base30,
            }),
          },
          "&.Mui-error": {
            color: theme.palette.customBase?.base50,
            ...theme.applyStyles("dark", {
              color: theme.palette.customBase?.base30,
            }),
          },
          // cỡ xlarge
          "&.MuiInputLabel-sizeXlarge": {
            transform: "translate(14px, 16px) scale(1)",
            fontSize: 16,
            fontWeight: 500,
            "&:has(+ .MuiInputBase-root .MuiInputAdornment-positionStart)": {
              transform: "translate(56px, 17px)",
              "&.Mui-focused": {
                transform: "translate(56px, 10px)",
              },
              "&.MuiFormLabel-filled": {
                transform: "translate(56px, 10px)",
              },
            },
            "&.Mui-focused": {
              transform: "translate(14px, 10px)",
              fontSize: theme.spacing(3),
            },
            "&.MuiFormLabel-filled": {
              transform: "translate(14px, 10px)",
              fontSize: theme.spacing(3),
            },
          },
          // cỡ large
          "&.MuiInputLabel-sizeLarge": {
            fontSize: 14,
            fontWeight: 500,
            transform: "translate(15px, 14px) scale(1)",
            "&:has(+ .MuiInputBase-root .MuiInputAdornment-positionStart)": {
              transform: "translate(48px, 13px)",
              "&.Mui-focused": {
                transform: "translate(48px, 7px)",
              },
              "&.MuiFormLabel-filled": {
                transform: "translate(48px, 7px)",
              },
            },
            "&.Mui-focused": {
              transform: "translate(15px, 7px)",
              fontSize: theme.spacing(3),
            },
            "&.MuiFormLabel-filled": {
              transform: "translate(15px, 7px)",
              fontSize: theme.spacing(3),
            },
          },
          "&.MuiInputLabel-sizeMedium": {
            fontSize: 12,
            fontWeight: 500,
            transform: "translate(16px, 12px) scale(1)",
            "&:has(+ .MuiInputBase-root .MuiInputAdornment-positionStart)": {
              transform: "translate(48px, 10px)",
              "&.Mui-focused": {
                transform: "translate(48px, 4px)",
              },
              "&.MuiFormLabel-filled": {
                transform: "translate(48px, 4px)",
              },
            },
            "&.Mui-focused": {
              transform: "translate(16px, 4px)",
              fontSize: theme.spacing(2.5),
            },
            "&.MuiFormLabel-filled": {
              transform: "translate(16px, 4px)",
              fontSize: theme.spacing(2.5),
            },
          },
        },
        ".MuiOutlinedInput-input:-webkit-autofill": {
          borderRadius: 0,
          boxShadow: "0 0 0 100px #EFEFEF inset",
          caretColor: theme.palette.customPrimary?.primary50,
          color: `${theme.palette.customBase?.base50} !important`,
          WebkitTextFillColor: `${theme.palette.customBase?.base50} !important`,
          ...theme.applyStyles("dark", {
            color: `${theme.palette.customBase?.base20} !important`,
            WebkitTextFillColor: `${theme.palette.customBase?.base20} !important`,
            boxShadow: "0 0 0 100px #2c3137 inset",
          }),
        },
        ".MuiFormHelperText-root": {
          margin: 0,
          marginTop: 4,
          fontSize: 12,
          fontWeight: 400,
          lineHeight: 1.5,
          fontFamily: "inherit",
          color: theme.palette.customBase?.base40,
          "&.Mui-error": {
            color: theme.palette.customRed?.default,
          },
          "&.Mui-disabled": {
            color: theme.palette.customAdditional?.base8003,
            ...theme.applyStyles("dark", {
              color: theme.palette.customAdditional?.baseWhite03,
            }),
          },
        },
        "label ~ .MuiInputBase-sizeLarge": {
          ".MuiInputBase-input": {
            padding: "19px 16px 5px 16px",
          },
        },
        "label.MuiInputLabel-sizeMedium ~ .MuiInputBase-root": {
          ".MuiInputBase-input": {
            padding: "15px 16px 4px 16px",
          },
        },
      },
    }),
  },
  variants: [
    {
      props: { size: "xlarge" },
      style: {
        ".MuiInputBase-sizeXlarge": {
          padding: 0,
          borderRadius: 12,
          fontSize: 16,
          fontWeight: 500,
          lineHeight: 1.5,
          ".MuiInputBase-input": {
            padding: "28px 16px 4px 16px",
            height: 24,
            animation: "none",
          },
          ".MuiInputAdornment-root": {
            height: "100%",
            maxHeight: "unset",
            "&.MuiInputAdornment-positionStart": {
              padding: "16px 0 16px 16px",
            },
            "&.MuiInputAdornment-positionEnd": {
              padding: "16px 16px 16px 0",
            },
          },
        },
      },
    },
    {
      props: { size: "large" },
      style: () => ({
        ".MuiInputBase-sizeLarge": {
          borderRadius: 12,
          fontSize: 16,
          fontWeight: 500,
          lineHeight: 1.5,
          padding: 0,
          ".MuiInputBase-input": {
            padding: "12px 16px",
            height: 24,
          },

          ".MuiInputAdornment-root": {
            height: "100%",
            maxHeight: "unset",
            "&.MuiInputAdornment-positionStart": {
              padding: "13.5px 0 13.5px 13px",
            },
            "&.MuiInputAdornment-positionEnd": {
              padding: "14px 13px 14px 0",
            },
          },
        },
      }),
    },
    {
      props: { size: "medium" },
      style: () => ({
        ".MuiInputBase-root": {
          borderRadius: 12,
          fontSize: 14,
          fontWeight: 500,
          lineHeight: 1.5,
          padding: 0,
          ".MuiInputBase-input": {
            padding: "9.5px 16px",
            height: 21,
          },
          ".MuiInputAdornment-root": {
            height: "100%",
            maxHeight: "unset",
            "&.MuiInputAdornment-positionStart": {
              padding: "9.5px 0 9.5px 12px",
            },
            "&.MuiInputAdornment-positionEnd": {
              padding: "9.5px 12px 9.5px 0",
            },
          },
        },
      }),
    },
    {
      props: { size: "small" },
      style: () => ({
        ".MuiInputBase-sizeSmall": {
          borderRadius: 8,
          fontSize: 12,
          fontWeight: 500,
          lineHeight: 1.5,
          padding: 0,
          ".MuiInputBase-input": {
            padding: "7px 8px",
            height: 18,
          },
          ".MuiInputAdornment-root": {
            height: "100%",
            maxHeight: "unset",
            "&.MuiInputAdornment-positionStart": {
              padding: "5.5px 0 5.5px 8px",
            },
            "&.MuiInputAdornment-positionEnd": {
              padding: "5.5px 8px 5.5px 0",
            },
          },
        },
      }),
    },
  ],
  defaultProps: {
    slotProps: {
      inputLabel: {
        shrink: false,
      },
    },
    variant: "outlined",
    fullWidth: true,
  },
};

export const MuiFormControlLabel: Components<
  Omit<Theme, "palette" | "components"> & CssVarsTheme
>["MuiFormControlLabel"] = {
  styleOverrides: {
    root: ({ theme }) => ({
      "&.Mui-disabled": {
        cursor: "not-allowed",
        pointerEvents: "auto",
        color: theme.palette.customAdditional?.base8003,
        ...theme.applyStyles("dark", {
          color: theme.palette.customAdditional?.baseWhite03,
        }),
      },
    }),
  },
};
