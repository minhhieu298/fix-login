import { Popper, styled } from "@mui/material";

export const CustomPoper = styled(Popper)(({ theme }) => ({
  background: theme.palette.customBase?.baseWhite,
  padding: "12px 0px",
  borderRadius: 12,
  gap: 8,
  maxWidth: 320,
  width: "100%",
  position: "relative",
  color: theme.palette.customBase?.base80,
  border: `1px solid ${theme.palette.customBase?.base40}`,
  boxShadow: "0px 0px 40px 0px rgba(0, 0, 0, 0.15)",
  ...theme.applyStyles("dark", {
    background: theme.palette.customBase?.base80,
    color: theme.palette.customBase?.base20,
    border: `1px solid ${theme.palette.customBase?.base50}`,
  }),
  // Style khi có menu cấp 2 mở - bỏ border radius bên phải (cho position mặc định)
  "&.has-submenu-open": {
    borderTopRightRadius: "0 !important",
    borderBottomRightRadius: "0 !important",
    borderRight: "1px solid transparent !important",
    borderTopLeftRadius: "12px !important",
    borderBottomLeftRadius: "12px !important",
  },
  // Style khi có menu cấp 2 mở và position === "Right" - bỏ border radius bên trái
  "&.has-submenu-open-right": {
    borderTopLeftRadius: "0 !important",
    borderBottomLeftRadius: "0 !important",
    borderLeft: "1px solid transparent !important",
    borderTopRightRadius: "12px !important",
    borderBottomRightRadius: "12px !important",
  },
  ".menu-title": {
    padding: "12px 16px",
  },
  ".MuiPaper-root": {
    background: "transparent",
    display: "flex",
    flexDirection: "column",
    gap: 12,
    boxShadow: "none",
  },
  ".MuiMenuItem-root": {
    gap: 8,
    padding: 12,
    zIndex: 1,
    borderRadius: 16,
    alignItems: "center",
    cursor: "pointer",
    flexDirection: "row",
  },
}));

export const CustomListMenu = styled(Popper)(({ theme }) => ({
  gap: 8,
  padding: "16px 0",
  borderRadius: 12,
  position: "absolute",
  cursor: "pointer",
  left: "105%",
  top: -25,
  maxWidth: 320,
  height: 374,
  overflow: "auto",
  width: "100%",
  background: theme.palette.customBase?.base20,
  ...theme.applyStyles("dark", {
    background: theme.palette.customBase?.base60,
  }),
  ".MuiPaper-root": {
    background: "transparent",
    display: "flex",
    flexDirection: "column",
    gap: 8,
    boxShadow: "none",
    ".MuiMenuItem-root": {
      padding: 8,
      borderRadius: 16,
      height: 48,
      alignItems: "center",
      flexDirection: "row",
      borderWidth: 1,
      borderStyle: "solid",
      borderColor: "transparent",
      "&:hover": {
        background: theme.palette.customBase?.base20,
        borderColor: theme.palette.customPrimary?.primary50,
        ...theme.applyStyles("dark", {
          background: theme.palette.customBase?.base60,
        }),
      },
    },
  },
}));
