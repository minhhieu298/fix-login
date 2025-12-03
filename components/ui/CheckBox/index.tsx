import { CheckboxProps, styled } from "@mui/material";

export const SquareIcon = styled("span")(({ theme }) => ({
  borderRadius: 3,
  width: 16,
  height: 16,
  border: 1,
  borderStyle: "solid",
  borderColor: theme.palette.customBase?.base40,
  background: theme.palette.customBase?.base20,
  ...theme.applyStyles("dark", {
    background: theme.palette.customBase?.base50,
  }),
  ".Mui-disabled &": {
    backgroundColor: theme.palette.customAdditional?.base2006,
    borderColor: theme.palette.customBase?.base25,
    ...theme.applyStyles("dark", {
      borderColor: theme.palette.customBase?.base55,
      backgroundColor: theme.palette.customAdditional?.base5003,
    }),
  },
}));

export const SquareIconChecked = styled(SquareIcon)(({ theme }) => ({
  backgroundColor: theme.palette.customPrimary?.primary50,
  borderColor: theme.palette.customPrimary?.primary50,
  position: "relative",
  "&::after": {
    content: '""',
    position: "absolute",
    top: "1px",
    left: "6px",
    width: "3px",
    height: "8px",
    border: "solid",
    borderColor: theme.palette.customBase?.baseWhite,
    borderWidth: "0 2px 2px 0",
    transform: "rotate(45deg)",
  },
  ".Mui-disabled &": {
    backgroundColor: theme.palette.customSupport?.primary5003,
    "&::after": {
      borderColor: theme.palette.customAdditional?.baseWhite03,
    },
  },
}));

export const IntermineIconChecked = styled("span")(({ theme }) => ({
  width: 16,
  height: 16,
  borderRadius: "4.27px",
  border: `1px solid ${theme.palette.customBase?.base40}`,
  position: "relative",
  background: theme.palette.customBase?.base20,
  ...theme.applyStyles("dark", {
    background: theme.palette.customBase?.base50,
  }),
  "&::before": {
    backgroundColor: theme.palette.customPrimary?.primary50,
    position: "absolute",
    content: `""`,
    width: "8px",
    height: "1.6px",
    borderRadius: "3.2px",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
}));

export const defaultProps: CheckboxProps = {
  icon: <SquareIcon />,
  checkedIcon: <SquareIconChecked />,
  indeterminateIcon: <IntermineIconChecked />,
  disableFocusRipple: true,
  disableRipple: true,
  disableTouchRipple: true,
};
