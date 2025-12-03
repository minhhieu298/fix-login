import { TFunction } from "i18next";

export interface ConfigItem {
  label: string;
  path: string;
  isShowLeftContent: boolean;
  iconSrc: string;
  iconActive: string;
}

export const ConfigSetting = (t: TFunction): ConfigItem[] => [
  {
    label: t("text_Display"),
    path: "display",
    iconSrc: "/assets/image/icon_display.svg",
    iconActive: "/assets/image/icon_display_active.svg",
    isShowLeftContent: false,
  },
  {
    label: t("text_securi"),
    path: "security",
    isShowLeftContent: false,
    iconSrc: "/assets/image/icon_security.svg",
    iconActive: "/assets/image/icon_security_active.svg",
  },
  {
    label: t("text_notifi"),
    path: "notifications",
    isShowLeftContent: false,
    iconSrc: "/assets/image/icon_noti.svg",
    iconActive: "/assets/image/icon_noti_active.svg",
  },
  {
    label: t("text_session"),
    path: "activities-session",
    isShowLeftContent: false,
    iconSrc: "/assets/image/icon_session.svg",
    iconActive: "/assets/image/icon_session_active.svg",
  },
];

export const ConfigArrayOTP = [
  181104, 181105, 181109, 181106, 181107, 181111, 181115, 181113, 181112,
  181114,
];

export const ErrorMsgOTP = [
  {
    AID: 33,
    AERRORCODE: "181104",
    AMESSAGEVN:
      "Quý khách đã nhập sai OTP quá 5 lần. Vui lòng thực hiện gửi lại mã OTP",
    AMESSAGEEN:
      "You have entered the wrong OTP more than 5 times. Please resubmit the OTP",
    AREMARKS: null,
  },
  {
    AID: 34,
    AERRORCODE: "181105",
    AMESSAGEVN: "Mã OTP không đúng, Quý khách vui lòng nhập lại mã OTP",
    AMESSAGEEN: "OTP code is not correct, please re-enter OTP code",
    AREMARKS: null,
  },
  {
    AID: 35,
    AERRORCODE: "181109",
    AMESSAGEVN: "Chưa tạo mã OTP trước đó",
    AMESSAGEEN: "Haven not generated OTP code before",
    AREMARKS: null,
  },
  {
    AID: 36,
    AERRORCODE: "181106",
    AMESSAGEVN: "Tài khoản bị khóa OTP",
    AMESSAGEEN: "Account is locked OTP",
    AREMARKS: null,
  },
  {
    AID: 37,
    AERRORCODE: "181107",
    AMESSAGEVN: "Chưa đến thời gian cho lần gửi OTP tiếp theo",
    AMESSAGEEN: "It is not yet time for the next OTP",
    AREMARKS: null,
  },
  {
    AID: 38,
    AERRORCODE: "181111",
    AMESSAGEVN:
      "Gửi OTP không thành công. Quý khách vui lòng liên hệ bộ phận hỗ trợ khách hàng FPTS",
    AMESSAGEEN: "Send OTP Failed",
    AREMARKS: null,
  },
  {
    AID: 39,
    AERRORCODE: "181113",
    AMESSAGEVN:
      "Quý khách đã nhập sai OTP quá 5 lần. Vui lòng thử lại sau 30 giây",
    AMESSAGEEN:
      "You have entered the wrong OTP more than 5 times. Please try again after 30 seconds",
    AREMARKS: null,
  },
  {
    AID: 40,
    AERRORCODE: "181112",
    AMESSAGEVN: "Tài khoản đã đăng kí SmartOTP",
    AMESSAGEEN: "Account has smart otp enabled",
    AREMARKS: null,
  },
  {
    AID: 41,
    AERRORCODE: "181114",
    AMESSAGEVN: "Mã token không đúng, Quý khách vui lòng nhập lại mã token",
    AMESSAGEEN: "The token code is incorrect. Please re-enter the token code",
    AREMARKS: null,
  },
  {
    AID: 42,
    AERRORCODE: "181115",
    AMESSAGEVN:
      "Quý khách chưa đăng ký gói phí SMS. Vui lòng đăng ký để tiếp tục sử dụng dịch vụ.",
    AMESSAGEEN:
      "You have not subscribed to the SMS service package. Please register to continue using the service.",
    AREMARKS: null,
  },
];
