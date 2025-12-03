import { AlertColor, SnackbarOrigin } from "@mui/material";

import eventBus from "../event";

export const handleAlert = ({
  message,
  status,
  severity,
  anchorOrigin = { horizontal: "center", vertical: "top" },
}: {
  message: string;
  status: boolean;
  anchorOrigin?: SnackbarOrigin;
  severity: AlertColor;
}) => {
  eventBus.emit("showToastMsg", {
    message,
    anchorOrigin,
    status,
    severity,
  });
};
