import {
  Alert,
  AlertColor,
  Snackbar,
  SnackbarCloseReason,
  SnackbarOrigin,
} from "@mui/material";
import { SyntheticEvent } from "react";

interface CustomSnackbarProps {
  open: boolean;
  onClose: (_: SyntheticEvent | Event, _reason?: SnackbarCloseReason) => void;
  content: React.ReactNode | string;
  severity?: AlertColor;
  autoHideDuration?: number;
  anchorOrigin?: SnackbarOrigin;
  variant?: "standard" | "outlined" | "filled";
}

const CustomSnackbar = ({
  open,
  onClose,
  content,
  severity = "info",
  autoHideDuration = 3000,
  anchorOrigin = { vertical: "top", horizontal: "center" },
}: CustomSnackbarProps) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      anchorOrigin={anchorOrigin}
    >
      <Alert onClose={onClose} severity={severity}>
        {content}
      </Alert>
    </Snackbar>
  );
};

export default CustomSnackbar;
