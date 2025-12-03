import { ErrorMsgOTP } from "@/constants/Setting/constant";
import { IErrorCache } from "@/interface/cache/interface";

import eventBus from "../event";

export const getErrorMsg = (
  otp: string | number,
  t: (_: string) => string
): { title: string; msg: string; icon: string } => {
  switch (otp) {
    case 181104:
      return {
        title: "",
        msg: t("text_lock_otp"),
        icon: "lock-error",
      };
    case 181105:
      return {
        title: "",
        msg: t("text_wrong_otp"),
        icon: "error",
      };
    case 181106:
      return {
        title: "",
        msg: t("text_lock_otp"),
        icon: "lock-error",
      };
    case 181107:
      return {
        title: "",
        msg: t("text_expire_otp"),
        icon: "error",
      };
    case 181114:
      return {
        title: "",
        msg: t("text_wrong_token"),
        icon: "error",
      };
    case "-1":
      return {
        title: "Thông tin đăng nhập chưa chính xác",
        msg: t("text_try_again"),
        icon: "error",
      };
    case "1010101":
      return {
        title: "Tài khoản không tồn tại",
        msg: t("text_try_again"),
        icon: "error",
      };
    case "NETWORK_ERROR":
      return {
        title: "Vui lòng kiểm tra kết nối internet của bạn",
        msg: t("text_try_again"),
        icon: "disconect",
      };
    case "UNKNOWN_ERROR":
      return {
        title: "Đã có lỗi xảy ra",
        msg: t("text_try_again"),
        icon: "error",
      };
    default:
      return {
        title: "Đã có lỗi xảy ra",
        msg: t("text_try_again"),
        icon: "error",
      };
  }
};

export const getIconImage = (icon: string) => {
  switch (icon) {
    case "success":
      return "/assets/icon/Check Circle.svg";
    case "error":
      return "/assets/icon/Info_Circle_err.svg";
    case "disconect":
      return "/assets/icon/Disconect.svg";
    case "lock-error":
      return "/assets/icon/Lock_Keyhole_err.svg";
    case "lock-warning":
      return "/assets/icon/Lock Keyhole Minimalistic.svg";
    case "success-error":
      return "/assets/icon/Success_Circle_err.svg";
    default:
      return "/assets/icon/Info_Circle_err.svg";
  }
};

export function handleMsgOTP(type: number | string, array: IErrorCache[]) {
  if (Number(type) === 0) {
    setTimeout(() => {
      eventBus.emit("msgOTP", {
        message: "",
      });
    }, 100);
    return;
  }

  let fintMsg;

  if (array && array.length > 0) {
    fintMsg = array.find((item) => Number(item.AERRORCODE) === Number(type));
  } else {
    fintMsg = ErrorMsgOTP.find(
      (item) => Number(item.AERRORCODE) === Number(type)
    );
  }

  if (fintMsg) {
    setTimeout(() => {
      eventBus.emit("msgOTP", {
        message: fintMsg.AMESSAGEVN,
      });
    }, 100);
  }
}
