import { deleteCookie, getCookie, setCookie } from "cookies-next";

export interface RecentSearchItem {
  id: string;
  type: "stock" | "function" | "ezhub";
  title: string;
  subtitle?: string;
  data: any;
  timestamp: number;
}

const RECENT_SEARCH_KEY = "recent_searches";
const MAX_RECENT_ITEMS = 5;

// Build cookie options safely for both dev and production
const getCookieOptions = () => {
  // Default options
  const isHttps =
    typeof window !== "undefined" && window.location?.protocol === "https:";
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : undefined;

  const options: {
    sameSite?: "lax" | "strict" | "none" | undefined;
    secure?: boolean;
    path?: string;
    domain?: string;
  } = {
    sameSite: "lax",
    secure: isHttps,
    path: "/",
  };

  // Only set domain explicitly if we are on a subdomain of fpts.com.vn
  if (hostname && /(?:^|\.)fpts\.com\.vn$/i.test(hostname)) {
    options.domain = ".fpts.com.vn";
  }

  return options;
};

export const getRecentSearches = (): RecentSearchItem[] => {
  try {
    const cookie = getCookie(RECENT_SEARCH_KEY);
    const stored = typeof cookie === "string" ? cookie : undefined;

    if (!stored) {
      return [];
    }

    const parsed = JSON.parse(stored);
    const result = Array.isArray(parsed) ? parsed : [];
    return result;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error parsing recent searches from cookies:", error);
    return [];
  }
};

export const addRecentSearch = (
  item: Omit<RecentSearchItem, "id" | "timestamp">
): void => {
  try {
    const recentSearches = getRecentSearches();

    // Tìm item đã tồn tại với cùng type và title
    const existingItemIndex = recentSearches.findIndex(
      (existing) =>
        existing.type === item.type &&
        existing.title === item.title &&
        existing.subtitle === item.subtitle
    );

    let updatedSearches: RecentSearchItem[];

    if (existingItemIndex !== -1) {
      // Nếu item đã tồn tại: xóa item cũ và thêm vào đầu với timestamp mới
      const existingItem = recentSearches[existingItemIndex];
      const updatedItem: RecentSearchItem = {
        ...existingItem,
        ...item,
        timestamp: Date.now(),
      };

      // Xóa item cũ và thêm item mới vào đầu
      updatedSearches = [
        updatedItem,
        ...recentSearches.filter((_, index) => index !== existingItemIndex),
      ];
    } else {
      // Nếu item chưa tồn tại: thêm mới vào đầu
      const newItem: RecentSearchItem = {
        ...item,
        id: `${item.type}_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`,
        timestamp: Date.now(),
      };

      updatedSearches = [newItem, ...recentSearches];
    }

    // Giới hạn số lượng items (xóa item cũ nhất nếu vượt quá giới hạn)
    const finalSearches = updatedSearches.slice(0, MAX_RECENT_ITEMS);

    setCookie(
      RECENT_SEARCH_KEY,
      JSON.stringify(finalSearches),
      getCookieOptions()
    );
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error saving recent search to cookies:", error);
  }
};

export const removeRecentSearch = (id: string): void => {
  try {
    const recentSearches = getRecentSearches();
    const filteredSearches = recentSearches.filter((item) => item.id !== id);

    if (filteredSearches.length === 0) {
      deleteCookie(RECENT_SEARCH_KEY, getCookieOptions());
      deleteCookie(RECENT_SEARCH_KEY, { path: "/" });
      deleteCookie(RECENT_SEARCH_KEY, { path: "/", domain: ".fpts.com.vn" });
    } else {
      setCookie(
        RECENT_SEARCH_KEY,
        JSON.stringify(filteredSearches),
        getCookieOptions()
      );
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error removing recent search from cookies:", error);
  }
};

export const clearRecentSearches = (): void => {
  try {
    deleteCookie(RECENT_SEARCH_KEY, getCookieOptions());
    deleteCookie(RECENT_SEARCH_KEY, { path: "/" });
    deleteCookie(RECENT_SEARCH_KEY, { path: "/", domain: ".fpts.com.vn" });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error clearing recent searches from cookies:", error);
  }
};

export const getRecentSearchesByType = (
  type: "stock" | "function" | "ezhub"
): RecentSearchItem[] => {
  return getRecentSearches().filter((item) => item.type === type);
};
