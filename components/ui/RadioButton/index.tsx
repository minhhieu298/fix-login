import { styled } from "@mui/material";

export const CircleIcon = styled("span")(({ theme }) => ({
  width: 16,
  height: 16,
  borderRadius: "50%",
  borderWidth: 1,
  borderStyle: "solid",
  borderColor: theme.palette.customBase?.base40,
  display: "inline-block",
  backgroundColor: theme.palette.customBase?.base20,
  ...theme.applyStyles("dark", {
    backgroundColor: theme.palette.customBase?.base50,
  }),
  ".Mui-disabled &": {
    backgroundColor: theme.palette.customAdditional?.base5003,
    borderColor: theme.palette.customBase?.base25,
    ...theme.applyStyles("dark", {
      borderColor: theme.palette.customBase?.base60,
    }),
  },
}));

export const CircleCheckedIcon = styled(CircleIcon)(({ theme }) => ({
  backgroundColor: theme.palette.customPrimary?.primary50,
  border: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  "&::after": {
    content: '""',
    width: 8,
    height: 8,
    borderRadius: "50%",
    backgroundColor: theme.palette.customBase?.baseWhite,
  },
  ".Mui-disabled &": {
    backgroundColor: theme.palette.customBase?.base40,
    borderColor: theme.palette.customBase?.base60,
    "&::after": {
      backgroundColor: theme.palette.customBase?.baseWhite,
    },
  },
}));
