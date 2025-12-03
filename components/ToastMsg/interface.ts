import { AlertColor, SnackbarOrigin } from "@mui/material";

export interface IEventShowToast {
  //trạng thái đóng mở
  severity: AlertColor; // kiểu success/error/info/warning
  anchorOrigin?: SnackbarOrigin; // vị trí hiện thông báo
  message: string; // content
}
