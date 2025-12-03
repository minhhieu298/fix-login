/* eslint-disable no-console */
import { getCookie } from "cookies-next";
import { useEffect, useRef } from "react";

interface CookieCheckerOptions {
  cookieName?: string;
  interval?: number; // milliseconds
  enabled?: boolean;
}

const BROADCAST_CHANNEL_NAME = "ezTrade_cookie_sync"; // Tên channel để giao tiếp giữa các tab
const LOGOUT_FLAG_KEY = "ezTrade_logout_tab_flag";

// Biến module-scope, mỗi tab một instance (không share giữa các tab)
let isLogoutTab = false; // Tab hiện tại có phải tab thực hiện logout không
let hasMultipleTabs = false; // Đã phát hiện có nhiều tab hay chưa

// BroadcastChannel ở module scope để có thể broadcast từ bất kỳ đâu
let globalBroadcastChannel: BroadcastChannel | null = null;

// Khởi tạo global broadcast channel nếu chưa có
const getGlobalBroadcastChannel = (): BroadcastChannel | null => {
  if (typeof window === "undefined") {
    return null;
  }

  if (!globalBroadcastChannel) {
    try {
      globalBroadcastChannel = new BroadcastChannel(BROADCAST_CHANNEL_NAME);
    } catch (error) {
      console.warn("Không thể tạo global BroadcastChannel:", error);
      return null;
    }
  }

  return globalBroadcastChannel;
};

// Hàm đánh dấu tab hiện tại là tab logout
export const markLogout = () => {
  try {
    isLogoutTab = true;
    // Lưu flag vào sessionStorage để tham khảo/debug nếu cần
    if (typeof window !== "undefined" && window.sessionStorage) {
      window.sessionStorage.setItem(LOGOUT_FLAG_KEY, "true");
    }
  } catch (err) {
    console.warn("Không thể set logout flag cho tab:", err);
  }
};

// Hàm broadcast logout message ngay lập tức cho các tab khác
// Nên gọi sau khi cookie đã được xóa
export const broadcastLogout = () => {
  const channel = getGlobalBroadcastChannel();
  if (channel) {
    try {
      channel.postMessage({
        type: "COOKIE_UPDATED",
        cookie: "",
      });
      console.log("Đã broadcast logout message ngay lập tức cho các tab khác");
    } catch (error) {
      console.warn("Không thể broadcast logout message:", error);
    }
  }
};

// Hàm check xem hiện tại đã phát hiện có nhiều tab hay chưa
export const isMultiTabDetected = () => hasMultipleTabs;

/**
 * Hook để kiểm tra cookie thay đổi và sync giữa các tab
 * Sử dụng BroadcastChannel API để giao tiếp giữa các tab
 * @param options - Các tùy chọn cấu hình
 */
export const useCookieChecker = (options: CookieCheckerOptions = {}) => {
  const {
    cookieName = "aspfpt_sessiontoken",
    interval = 10000, // 10 giây
    enabled = true,
  } = options;

  const savedCookieRef = useRef<string>(""); // Lưu cookie hiện tại của tab này
  const broadcastChannelRef = useRef<BroadcastChannel | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const workerRef = useRef<Worker | null>(null);
  const useWorkerRef = useRef<boolean>(false); // Flag để xác định có dùng worker hay fallback

  useEffect(() => {
    if (!enabled || typeof window === "undefined") {
      return;
    }

    // Hàm để lấy cookie hiện tại
    const getCurrentCookie = (): string => {
      const cookie = getCookie(cookieName, {
        domain:
          process.env.NODE_ENV === "production" ? ".fpts.com.vn" : undefined,
        path: "/",
      }) as string | undefined;
      return cookie || "";
    };

    // Hàm kiểm tra và reload nếu cookie thay đổi
    const checkAndReloadIfChanged = () => {
      const currentCookie = getCurrentCookie();

      // Trường hợp 1: Cookie từ có giá trị trở thành rỗng (logout)
      if (savedCookieRef.current !== "" && currentCookie === "") {
        // Nếu tab hiện tại là tab thực hiện logout -> không reload tab này,
        // chỉ broadcast cho các tab khác biết để chúng tự reload.
        if (isLogoutTab) {
          console.log(
            "Cookie đã bị xóa (logout) ở tab logout, chỉ thông báo cho các tab khác, KHÔNG reload tab này"
          );
          if (broadcastChannelRef.current) {
            try {
              broadcastChannelRef.current.postMessage({
                type: "COOKIE_UPDATED",
                cookie: "",
              });
            } catch (error) {
              console.warn("Không thể broadcast cookie update:", error);
            }
          }
          savedCookieRef.current = "";
          return;
        }

        // Các tab khác (không phải tab logout) sẽ reload để đồng bộ trạng thái logout
        console.log(
          "Cookie đã bị xóa (logout) ở tab khác, reload trang để đồng bộ logout"
        );
        window.location.reload();
        return;
      }

      // Trường hợp 2: Cookie từ có giá trị này đổi thành giá trị khác
      if (
        savedCookieRef.current !== "" &&
        currentCookie !== "" &&
        savedCookieRef.current !== currentCookie
      ) {
        console.log("Cookie đã thay đổi, reload trang");
        window.location.reload();
        return;
      }

      // Cập nhật savedCookieRef nếu cookie thay đổi từ rỗng sang có giá trị (login)
      if (savedCookieRef.current === "" && currentCookie !== "") {
        savedCookieRef.current = currentCookie;
        // Broadcast cho các tab khác biết cookie đã được cập nhật
        if (broadcastChannelRef.current) {
          try {
            broadcastChannelRef.current.postMessage({
              type: "COOKIE_UPDATED",
              cookie: currentCookie,
            });
          } catch (error) {
            console.warn("Không thể broadcast cookie update:", error);
          }
        }
      }
    };

    // Khởi tạo cookie ban đầu
    const initialCookie = getCurrentCookie();
    savedCookieRef.current = initialCookie;

    // Khởi tạo BroadcastChannel để giao tiếp giữa các tab (hoạt động trên cả HTTP và HTTPS)
    try {
      // Sử dụng global channel nếu có, nếu không thì tạo mới và cập nhật global
      if (globalBroadcastChannel) {
        broadcastChannelRef.current = globalBroadcastChannel;
      } else {
        broadcastChannelRef.current = new BroadcastChannel(
          BROADCAST_CHANNEL_NAME
        );
        globalBroadcastChannel = broadcastChannelRef.current;
      }

      // Khi tab này mở lên, phát tín hiệu để tab khác (nếu có) biết
      broadcastChannelRef.current.postMessage({
        type: "TAB_OPENED",
      });

      // Lắng nghe message từ các tab khác
      broadcastChannelRef.current.addEventListener("message", (event) => {
        const { type } = event.data || {};

        // Phát hiện nhiều tab
        if (type === "TAB_OPENED" || type === "TAB_EXISTING") {
          hasMultipleTabs = true;

          // Nếu nhận TAB_OPENED từ tab khác thì phản hồi lại để nó cũng biết đang có nhiều tab
          if (type === "TAB_OPENED") {
            try {
              broadcastChannelRef.current?.postMessage({
                type: "TAB_EXISTING",
              });
            } catch (error) {
              console.warn("Không thể broadcast TAB_EXISTING:", error);
            }
          }
          return;
        }

        if (type === "COOKIE_UPDATED") {
          const cookieFromOtherTab = event.data?.cookie || "";
          const currentCookie = getCurrentCookie();

          // Nếu tab này đang có cookie và cookie từ tab khác khác với cookie hiện tại
          // thì reload tab này
          if (
            savedCookieRef.current !== "" && // Tab này đã có cookie
            cookieFromOtherTab !== savedCookieRef.current // Cookie từ tab khác khác với cookie của tab này
          ) {
            console.log("Cookie thay đổi từ tab khác, reload trang");
            window.location.reload();
            return;
          }

          // Nếu tab này đang có cookie và tab khác logout (cookie rỗng)
          if (savedCookieRef.current !== "" && cookieFromOtherTab === "") {
            console.log("Tab khác đã logout, reload trang");
            window.location.reload();
            return;
          }

          // Cập nhật savedCookieRef nếu cookie từ tab khác đã được cập nhật trong browser
          if (
            cookieFromOtherTab !== "" &&
            currentCookie === cookieFromOtherTab
          ) {
            savedCookieRef.current = cookieFromOtherTab;
          }
        }
      });
    } catch (error) {
      // BroadcastChannel có thể không được hỗ trợ trong một số trình duyệt cũ
      // Nhưng vẫn tiếp tục chạy check cookie định kỳ
      console.warn("BroadcastChannel không được hỗ trợ:", error);
    }

    // Hàm fallback: kiểm tra cookie trực tiếp bằng setInterval
    // Hoạt động trên cả HTTP và HTTPS
    const initFallback = () => {
      // Cleanup worker nếu có
      if (workerRef.current) {
        workerRef.current.terminate();
        workerRef.current = null;
      }

      // Cleanup interval cũ nếu có
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }

      // Kiểm tra cookie định kỳ bằng setInterval
      intervalRef.current = setInterval(() => {
        checkAndReloadIfChanged();
      }, interval);

      console.log(
        `Cookie checker đang chạy ở fallback mode (setInterval), kiểm tra mỗi ${interval / 1000} giây`
      );
    };

    // Thử khởi tạo web worker trước
    const initWorker = () => {
      try {
        // Kiểm tra hỗ trợ Worker
        if (typeof Worker === "undefined") {
          console.warn("Web Worker không được hỗ trợ, sử dụng fallback mode");
          useWorkerRef.current = false;
          initFallback();
          return;
        }

        // Thử tạo worker
        workerRef.current = new Worker("/cookie-checker.worker.js");

        // Lắng nghe message từ worker
        workerRef.current.addEventListener("message", (event) => {
          const { type } = event.data;

          if (type === "COOKIE_CHANGED") {
            // Worker phát hiện cookie thay đổi, kiểm tra lại và reload nếu cần
            checkAndReloadIfChanged();
          }
        });

        // Xử lý lỗi từ worker
        workerRef.current.addEventListener("error", (error) => {
          console.warn("Web Worker gặp lỗi, chuyển sang fallback mode:", error);
          useWorkerRef.current = false;
          initFallback();
        });

        // Khởi tạo worker với cookie hiện tại
        workerRef.current.postMessage({
          type: "INIT",
          cookie: initialCookie,
        });

        // Cleanup interval cũ nếu có
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }

        // Bắt đầu kiểm tra cookie mỗi interval
        intervalRef.current = setInterval(() => {
          if (workerRef.current) {
            const currentCookie = getCurrentCookie();

            // Gửi cookie hiện tại cho worker để kiểm tra
            workerRef.current.postMessage({
              type: "CHECK_COOKIE",
              cookie: currentCookie,
            });

            // Đồng thời kiểm tra trực tiếp (backup)
            checkAndReloadIfChanged();
          }
        }, interval);

        useWorkerRef.current = true;
        console.log(
          `Cookie checker đang chạy với Web Worker, kiểm tra mỗi ${interval / 1000} giây`
        );
      } catch (error) {
        // Không thể khởi tạo worker, sử dụng fallback
        console.warn(
          "Không thể khởi tạo cookie checker worker, sử dụng fallback mode:",
          error
        );
        useWorkerRef.current = false;
        initFallback();
      }
    };

    // Thử khởi tạo worker, nếu thất bại sẽ tự động chuyển sang fallback
    // Fallback (setInterval) luôn hoạt động trên cả HTTP và HTTPS
    initWorker();

    // Cleanup
    return () => {
      if (broadcastChannelRef.current) {
        broadcastChannelRef.current.close();
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (workerRef.current) {
        workerRef.current.terminate();
        workerRef.current = null;
      }
    };
  }, [enabled, cookieName, interval]);

  // Hàm để cập nhật cookie thủ công (sau khi login)
  const updateCookie = (cookie: string) => {
    savedCookieRef.current = cookie;

    // Nếu đang dùng worker, cập nhật vào worker
    if (useWorkerRef.current && workerRef.current) {
      try {
        workerRef.current.postMessage({
          type: "UPDATE_COOKIE",
          cookie,
        });
      } catch (error) {
        console.warn("Không thể cập nhật cookie trong worker:", error);
      }
    }

    // Broadcast cho các tab khác biết cookie đã được cập nhật
    if (broadcastChannelRef.current) {
      try {
        broadcastChannelRef.current.postMessage({
          type: "COOKIE_UPDATED",
          cookie,
        });
      } catch (error) {
        console.warn("Không thể broadcast cookie update:", error);
      }
    }
  };

  return { updateCookie };
};
