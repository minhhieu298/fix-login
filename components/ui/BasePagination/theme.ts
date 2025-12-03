import { Theme } from "@mui/material";

export const MuiPagination = {
  styleOverrides: {
    root: ({ theme }: { theme: Theme }) => ({
      "& .MuiPaginationItem-rounded.Mui-selected": {
        borderRadius: 8,
        background: theme.palette.customSupport?.greendefault01,
        color: theme.palette.customPrimary?.primary50,
        minWidth: 24,
        width: 24,
        height: 24,
        fontSize: 16,
        fontWeight: 700,
        lineHeight: 1.5,
      },
      "& .MuiPaginationItem-rounded": {
        color: theme.palette.customBase?.base40,
        borderRadius: 8,
        minWidth: 24,
        width: 24,
        height: 24,
        fontSize: 16,
        fontWeight: 500,
        lineHeight: 1.5,
        padding: 4,
        ...theme.applyStyles("dark", {
          color: theme.palette.customBase?.base30,
        }),
      },
      "& .MuiPaginationItem-root:not(.MuiPaginationItem-ellipsis):hover": {
        background: theme.palette.customAdditional?.base4003,
        minWidth: 24,
        width: 24,
        height: 24,
      },
    }),
  },
};
