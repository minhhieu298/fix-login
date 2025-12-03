import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";

const BaseSwitch = styled(Switch)(({ theme }) => ({
  width: 32,
  height: 20,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(12px)",
      color: theme.palette.customBase?.base20,
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.customPrimary?.primary50,
        border: 0,
        opacity: 1,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        background: theme.palette.customSupport?.primary5003,
        ...theme.applyStyles("dark", {
          background: theme.palette.customSupport?.primary5001,
        }),
      },
    },
    "&.Mui-disabled": {
      pointerEvents: "auto",
      cursor: "not-allowed",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color: theme.palette.customBase?.baseWhite,
      opacity: 0.3,
      ...theme.applyStyles("dark", {
        color: theme.palette.customAdditional?.baseWhite03,
      }),
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      background: theme.palette.customAdditional?.base5003,
      opacity: 1,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 16,
    height: 16,
    position: "relative",
    "&::before": {
      content: '""',
      position: "absolute",
      top: "3px",
      left: "7px",
      width: 3,
      height: 7,
      borderBottom: `1px solid ${theme.palette.customPrimary?.primary50}`,
      borderRight: `1px solid ${theme.palette.customPrimary?.primary50}`,
      opacity: 0,
      transition: "opacity 0.3s linear",
      transform: "rotate(45deg)",
    },
  },
  "& .Mui-checked .MuiSwitch-thumb::before": {
    opacity: 1,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    opacity: 1,
    backgroundColor: theme.palette.customBase?.base40,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
  "&": {
    ".MuiSwitch-switchBase:hover": {
      background: "transparent !important",
    },
  },
}));

export default BaseSwitch;
