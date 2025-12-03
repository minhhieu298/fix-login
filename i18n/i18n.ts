/* eslint-disable @typescript-eslint/no-require-imports */
import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

const initialLanguage =
  typeof window !== "undefined"
    ? localStorage.getItem("i18nextLng") || "vi"
    : "vi";

const resources = {
  vi: { translation: require("@/public/locales/vi/common.json") },
  en: { translation: require("@/public/locales/en/common.json") },
};

i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: initialLanguage,
    fallbackLng: "vi",
    supportedLngs: ["vi", "en"],
    detection: {
      order: ["localStorage"],
      caches: ["localStorage"],
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18next;
