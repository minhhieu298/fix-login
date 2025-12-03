import { Theme } from "@mui/material";

export const TabsTheme = {
  MuiTabs: {
    styleOverrides: {
      root: ({ theme }: { theme: Theme }) => ({
        "&": {
          minHeight: "36px",
          color: "#858B93",
          ".MuiTabs-list": {
            "& .MuiButtonBase-root": {
              minHeight: "36px",
              padding: 0,
              lineHeight: "20px",
              position: "relative",
              color: "#858B93",
              fontFamily: "inherit",
              fontWeight: 700,
              textTransform: "uppercase",
              "&.Mui-selected": {
                color: "#1AAF74",
              },
              "&.Mui-selected::before": {
                content: '""',
                position: "absolute",
                left: "-12px", // Đặt dấu chấm bên trái tab
                top: "50%",
                transform: "translateY(-50%)",
                width: "8px", // Kích thước dấu chấm
                height: "8px",
                backgroundColor: "#ff0000", // Màu đỏ cho dấu chấm
                borderRadius: "50%", // Hình tròn
              },
            },
          },
        },
        "& .BadgeTab": {
          fontWeight: "700",
          fontSize: "14px",
          lineHeight: 1.5,
          cusor: "pointer",
          padding: "7px 0 8px",
          borderRadius: "5px",
          transition: "background 300ms ease-out",
          ...theme.applyStyles("dark", {
            backgroundColor: theme.palette.customBase?.base60,
            color: theme.palette.customBase?.base40,
          }),
          ...theme.applyStyles("light", {
            backgroundColor: theme.palette.customBase?.base20,
            color: theme.palette.customBase?.base60,
          }),

          "&.Mui-selected": {
            backgroundColor: theme.palette.customSupport?.greendefault03,
            color: theme.palette.customPrimary?.primary50,
          },
          "&:first-of-type": {
            clipPath: "polygon(0 0, 100% 0, calc(100% - 20px) 100%, 0 100%)",

            marginRight: "-15px",
          },
          "&:last-child": {
            borderRadius: "5px",
            clipPath: "polygon(20px 0, 100% 0, 100% 100%, 0 100%)",
          },
        },
      }),
    },
  },
};
