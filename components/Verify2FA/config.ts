import { TFunction } from "i18next";

export const optionExpireOtp = (t: TFunction) => [
  {
    label: t("text_phien_login"),
    value: 0,
  },
  {
    label: t("text_480"),
    value: 480,
  },
  {
    label: t("text_180"),
    value: 180,
  },
  {
    label: t("text_120"),
    value: 120,
  },
  {
    label: t("text_60"),
    value: 60,
  },
];
