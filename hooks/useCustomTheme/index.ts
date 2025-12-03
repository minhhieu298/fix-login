"use client";
import createCache from "@emotion/cache";
import { useEffect, useMemo, useRef, useState } from "react";

import { createCustomTheme } from "@/libs/theme/theme";

const NAME_SETTING_THEME = "theme_mode";

type Theme = "light" | "dark";

// Lấy theme khởi tạo (ưu tiên localStorage, fallback là hệ thống)
const getInitialTheme = (): Theme => {
  if (typeof window !== "undefined" && typeof document !== "undefined") {
    const saved = localStorage.getItem(NAME_SETTING_THEME);
    // if (saved !== "" && saved !== undefined && (saved === "dark" || saved === "light")) {
    //   document.body.dataset.agThemeMode = saved;
    // } else {
    //   document.body.dataset.agThemeMode = "light";
    // }

    if (saved === "dark" || saved === "light") {
      document.body.dataset.agThemeMode = saved;
      // Add/remove theme class
      document.documentElement.classList.remove("light", "dark");
      document.documentElement.classList.add(saved);
      return saved;
    }

    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const theme = prefersDark ? "dark" : "light";
    document.body.dataset.agThemeMode = theme;
    // Add/remove theme class
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
    return theme;
  }

  return "light"; // fallback khi SSR
};

const getSystemTheme = (): Theme => {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

export const useCustomTheme = () => {
  const [mode, setMode] = useState<Theme>(getInitialTheme());
  const channelRef = useRef<BroadcastChannel | null>(null);

  const muiTheme = useMemo(() => createCustomTheme(mode), [mode]);
  const emotionCache = useMemo(
    () => createCache({ key: "css", prepend: true }),
    [mode]
  );

  // Tạo BroadcastChannel để đồng bộ giữa các tab
  useEffect(() => {
    if (!channelRef.current) {
      channelRef.current = new BroadcastChannel(NAME_SETTING_THEME);
    }

    const channel = channelRef.current;
    channel.onmessage = (event) => {
      const newMode = event.data.theme === "dark" ? "dark" : "light";
      document.body.dataset.agThemeMode =
        event.data.theme === "dark" ? "dark" : "light";
      // Add/remove theme class
      document.documentElement.classList.remove("light", "dark");
      document.documentElement.classList.add(newMode);
      setMode(newMode);
    };

    return () => {
      channel.close();
      channelRef.current = null;
    };
  }, []);

  // Tự động cập nhật theme theo hệ thống nếu localStorage chưa set
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (e: MediaQueryListEvent) => {
      const saved = localStorage.getItem(NAME_SETTING_THEME);
      if (!saved) {
        const newMode = e.matches ? "dark" : "light";
        setMode(newMode);
        document.body.dataset.agThemeMode = newMode;
        // Add/remove theme class
        document.documentElement.classList.remove("light", "dark");
        document.documentElement.classList.add(newMode);
      }
    };
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Khi localStorage bị xóa → fallback về theme hệ thống
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      const systemTheme = getSystemTheme();
      if (e.key === NAME_SETTING_THEME && e.newValue === null) {
        setMode(systemTheme);
        document.body.dataset.agThemeMode = systemTheme;
        // Add/remove theme class
        document.documentElement.classList.remove("light", "dark");
        document.documentElement.classList.add(systemTheme);
      } else if (e.key === null && e.newValue === null) {
        setMode(systemTheme);
        document.body.dataset.agThemeMode = systemTheme;
        // Add/remove theme class
        document.documentElement.classList.remove("light", "dark");
        document.documentElement.classList.add(systemTheme);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Hàm toggle nhanh giữa light/dark
  const toggleTheme = (theme: Theme) => {
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
    document.body.dataset.agThemeMode = theme;
    // Add/remove theme class
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
    setMode(theme);
    localStorage.setItem(NAME_SETTING_THEME, theme);
    channelRef.current?.postMessage({ theme: theme });
  };

  // Boolean tiện kiểm tra trong view
  const isDark = mode === "dark";

  return {
    mode,
    isDark,
    toggleTheme,
    muiTheme,
    emotionCache,
  };
};
