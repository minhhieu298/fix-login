import { Components, CssVarsTheme, Theme } from "@mui/material";

import { IntermineIconChecked, SquareIcon, SquareIconChecked } from ".";

export const MuiCheckbox: Components<
  Omit<Theme, "palette" | "components"> & CssVarsTheme
>["MuiCheckbox"] = {
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
    icon: <SquareIcon />,
    checkedIcon: <SquareIconChecked />,
    indeterminateIcon: <IntermineIconChecked />,
    disableFocusRipple: true,
    disableRipple: true,
    disableTouchRipple: true,
  },
};
