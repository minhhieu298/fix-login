import { TFunction } from "i18next";
import * as yup from "yup";

export const loginSchema = (t: TFunction) =>
  yup.object({
    LoginName: yup
      .string()
      .required("Vui lòng nhập tên tài khoản")
      .notOneOf(["058C"], t("text_require_user")),
    Password: yup.string().required(t("text_require_password")),
  });

export const forgotSchema = (t: TFunction) =>
  yup.object({
    ClientCode: yup
      .string()
      .required(t("text_require_user"))
      .notOneOf(["058C"], t("text_require_user")),
    ClientName: yup
      .string()
      .transform((value) => (value ? value.toUpperCase() : value))
      .required(t("text_require_fullname")),
    IDCard: yup.string().required(t("text_require_CCCD")),
    Contact: yup
      .string()
      .required(t("text_require_phone"))
      .test("is-valid-contact", "", (value, ctx) => {
        if (!value)
          return ctx.createError({ message: t("text_require_phone") });
        const phoneRegex = /^\d{10}$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!phoneRegex.test(value) && !emailRegex.test(value)) {
          return ctx.createError({ message: t("text_format") });
        }
        return true;
      }),
  });

export const passwordValidation = (t: TFunction) =>
  yup
    .string()
    .required(t("text_require_password"))
    .test("password-rules", "Mật khẩu chưa đạt yêu cầu", (value) => {
      if (!value) return false;
      const rules = Object.values(passwordRules(t));
      return rules.every((rule) => rule.test(value));
    })
    .test(
      "notForbidden",
      "Mật khẩu không được chứa các ký tự ' và ; và #",
      (value) => (value ? !/[#';]/.test(value) : false)
    );

export const passwordRules = (t: TFunction) => {
  return {
    minLength: {
      label: t("text_8_length"),
      test: (str: string) => str?.length >= 8,
      isTooltip: false,
    },
    number: {
      label: t("text_is_number"),
      test: (str: string) => /[0-9]/.test(str),
      isTooltip: false,
    },
    special: {
      label: t("text_is_character"),
      test: (str: string) => /[`!@$%^&*()_+\-=\[\]{}:"\\|,.<>/?~]/.test(str),
      isTooltip: true,
    },
    uppercase: {
      label: t("text_uppercase"),
      test: (str: string) => /[A-Z]/.test(str),
      isTooltip: false,
    },
    lowercase: {
      label: t("text_lowercase"),
      test: (str: string) => /[a-z]/.test(str),
      isTooltip: false,
    },
  };
};

export const validatePassword = (str: string, t: TFunction) => {
  const checks = Object.values(passwordRules(t)).map((rule) => {
    return {
      label: rule.label,
      isCheck: rule.test(str),
      isTooltip: rule.isTooltip,
    };
  });

  const count = checks.filter((c) => c.isCheck).length;
  return { count: count <= 1 ? 0 : count - 1, checks };
};
