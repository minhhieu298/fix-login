import { Components, CssVarsTheme, Theme } from "@mui/material";

import { CircleCheckedIcon, CircleIcon } from ".";

export const MuiRadio: Components<
  Omit<Theme, "palette" | "components"> & CssVarsTheme
>["MuiRadio"] = {
  styleOverrides: {
    root: ({}) => ({}),
  },
  variants: [
    {
      props: { size: "large" },
      style: {
        padding: 8,
        "&.Mui-disabled": {
          cursor: "not-allowed",
          pointerEvents: "auto",
        },
      },
    },
    {
      props: { size: "medium" },
      style: {
        padding: 4,
        "&.Mui-disabled": {
          cursor: "not-allowed",
          pointerEvents: "auto",
        },
      },
    },
    {
      props: { size: "small" },
      style: {
        padding: 2,
        "&.Mui-disabled": {
          cursor: "not-allowed",
          pointerEvents: "auto",
        },
      },
    },
  ],
  defaultProps: {
    icon: <CircleIcon />,
    checkedIcon: <CircleCheckedIcon />,
    disableFocusRipple: true,
    disableRipple: true,
    disableTouchRipple: true,
  },
};
