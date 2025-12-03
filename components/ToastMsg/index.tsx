import { Alert, Box, Snackbar, SnackbarCloseReason } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";

import eventBus from "@/utils/event";

import { IEventShowToast } from "./interface";

const CustomToastMsg = () => {
  const [open, setOpen] = useState(false);
  const [option, setOption] = useState<IEventShowToast>();

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    const handler = (data: IEventShowToast & { status: boolean }) => {
      setOption(data);
      setOpen(data.status);
    };

    eventBus.on("showToastMsg", handler);

    return () => {
      eventBus.off("showToastMsg", handler);
    };
  }, []);

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={
        option?.anchorOrigin || { vertical: "top", horizontal: "center" }
      }
      action={
        <Box sx={{ display: "flex" }}>
          <Image
            src="/assets/icon/ic_close_white.svg"
            alt=""
            width={20}
            height={20}
          />
        </Box>
      }
    >
      <Alert onClose={handleClose} severity={option?.severity}>
        {option?.message}
      </Alert>
    </Snackbar>
  );
};

export default CustomToastMsg;
