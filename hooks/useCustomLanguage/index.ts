import { TFunction } from "i18next";
import { useCallback, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

const NAME_SETTING_LANGUAGE = "i18nextLng";
const NAME_SETTING_CHANEL_LANGUAGE = "language_channel";

type Language = "vi" | "en";

interface LanguageHook {
  language: Language;
  changeLanguage: (_lang: Language) => void;
  t: TFunction<"translation", undefined>;
}

export const useCustomLanguage = (): LanguageHook => {
  const { i18n, t } = useTranslation();

  // Lấy ngôn ngữ hiện tại từ i18n
  const language = i18n.language as Language;

  // Hàm thay đổi ngôn ngữ

  const channelRef = useRef<BroadcastChannel | null>(null);

  useEffect(() => {
    // Tạo channel chỉ khi chưa tồn tại
    if (!channelRef.current) {
      channelRef.current = new BroadcastChannel(NAME_SETTING_CHANEL_LANGUAGE);
    }

    const channel = channelRef.current;

    // Lắng nghe thông điệp từ các tab khác
    channel.onmessage = (event) => {
      i18n.changeLanguage(event.data.lang);
    };

    // Cleanup: Đóng channel khi component unmount
    return () => {
      channel.close();
      channelRef.current = null; // Đặt lại tham chiếu
    };
  }, []);

  // Lắng nghe sự thay đổi của localStorage (từ tab/window khác)
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === NAME_SETTING_LANGUAGE && event.newValue === null) {
        // Nếu theme trong localStorage bị xóa, chuyển về theme hệ thống
        // const systemTheme = getSystemTheme();
        // setMode(systemTheme);
      } else if (event.key === null && event.newValue === null) {
        // Xử lý khi clearAll từ tab khác
        // const systemTheme = getSystemTheme();
        // setMode(systemTheme);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  useEffect(() => {
    const savedLanguage = localStorage.getItem(NAME_SETTING_LANGUAGE);
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage as Language);
    }
  }, []);

  const changeLanguage = useCallback(
    (lang: Language) => {
      i18n.changeLanguage(lang); // Thay đổi ngôn ngữ và tự động lưu vào localStorage
      channelRef.current?.postMessage({ lang });
    },
    [i18n]
  );
  return { language, changeLanguage, t };
};
