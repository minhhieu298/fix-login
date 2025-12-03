import { Dialog, DialogProps } from "@mui/material";
import React, { ReactNode } from "react";

interface DialogComponentProps extends DialogProps {
  children: ReactNode;
}

const DialogComponent = ({
  open,
  children,
  slotProps,
  ...props
}: DialogComponentProps) => {
  return (
    <Dialog
      open={open}
      slotProps={{
        paper: {
          sx: (theme) => ({
            background: theme.palette.customBase?.baseWhite,
            color: theme.palette.customBase?.base80,
            width: "100%",
            ...theme.applyStyles("dark", {
              background: theme.palette.customBase?.base80,
              color: theme.palette.customBase?.base20,
            }),
          }),
        },
        backdrop: {
          sx: (theme) => ({
            backgroundColor: theme.palette.customAdditional?.base8008,
            backdropFilter: "blur(4px)",
          }),
        },
        ...slotProps,
      }}
      {...props}
    >
      {children}
    </Dialog>
  );
};

export default DialogComponent;
