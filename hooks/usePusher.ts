import { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  createPusherConnection,
  PusherConnection,
  PusherMessageData,
} from "@/libs/pusher";
import { pusherActions } from "@/store/reducers/pusher.reducers";
import eventBus from "@/utils/event";

/**
 * Hook quản lý Pusher WebSocket connection
 *
 * Features:
 * - Tự động kết nối khi user đăng nhập
 * - Xử lý auto-reconnect khi mất kết nối
 * - Lưu messages vào Redux store
 * - Publish messages qua EventBus cho các module khác
 * - Fallback mechanism: polling REST API nếu WebSocket miss messages
 *
 * Usage:
 * - Gọi trong _app.tsx để khởi tạo global connection
 * - Module khác subscribe qua EventBus: eventBus.on("pusher-message", handler)
 */
export const usePusher = () => {
  const dispatch = useDispatch();
  const connectionRef = useRef<PusherConnection | null>(null);
  const fallbackIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const userInfo = useSelector(
    (state: {
      AuthReducer: {
        userInfo: {
          LoginName?: string;
          ClientCode?: string;
        };
      };
    }) => state.AuthReducer.userInfo
  );

  /**
   * Xử lý message từ Pusher
   * - Lưu vào Redux store
   * - Publish qua EventBus cho các module khác
   */
  const handleMessage = useCallback(
    (data: PusherMessageData) => {
      try {
        const rid = data.d?.RID || data.d?.RId;

        dispatch(
          pusherActions.receiveMessage({
            requestId: rid || "",
            businessType: data.bt || "",
            data: data.d,
            timestamp: Date.now(),
          })
        );

        // Broadcast message cho các module khác qua EventBus
        eventBus.emit("pusher-message", data);
      } catch {
        // Ignore invalid messages
      }
    },
    [dispatch]
  );

  /**
   * Fallback mechanism: Polling REST API để lấy messages bị miss
   * Chạy mỗi 10 giây để check các RID đang pending
   */
  const checkPendingRids = useCallback(async () => {
    if (!connectionRef.current) return;

    const pendingRids = connectionRef.current.getPendingRids();
    if (pendingRids.length === 0) return;

    const pusherUrl =
      process.env.NEXT_PUBLIC_NEXT_DOMAIN_PUSHER ||
      "http://pusheruat.fpts.com.vn/pusher";

    for (const rid of pendingRids) {
      try {
        const response = await fetch(`${pusherUrl}/api/v1/rid/${rid}`, {
          method: "GET",
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.text();
          if (data) {
            try {
              const parsedData: PusherMessageData = JSON.parse(data);
              handleMessage(parsedData);
            } catch {
              // Ignore parse errors
            }
          }
        }
      } catch {
        // Ignore network errors
      }
    }
  }, [handleMessage]);

  useEffect(() => {
    if (!userInfo?.LoginName || !userInfo?.ClientCode) {
      return;
    }

    // Prevent multiple connections
    if (connectionRef.current?.isConnected()) {
      return;
    }

    // Cleanup existing connection if any
    if (connectionRef.current) {
      connectionRef.current.disconnect();
      connectionRef.current = null;
    }

    let conn: PusherConnection | null = null;
    let isMounted = true;

    const initConnection = async () => {
      try {
        conn = await createPusherConnection({
          onConnected: () => {
            if (isMounted) {
              dispatch(pusherActions.setConnectionStatus(true));
            }
          },
          onReconnected: () => {
            if (isMounted) {
              dispatch(pusherActions.setConnectionStatus(true));
            }
          },
          onClosed: (_error) => {
            if (isMounted) {
              dispatch(pusherActions.setConnectionStatus(false));
            }
          },
          onError: (error) => {
            if (isMounted) {
              dispatch(pusherActions.setError(error.message));
            }
          },
          onMessage: handleMessage,
        });

        if (isMounted) {
          connectionRef.current = conn;

          // Start fallback polling (every 10 seconds)
          fallbackIntervalRef.current = setInterval(() => {
            checkPendingRids();
          }, 10000);
        } else {
          conn.disconnect();
        }
      } catch {
        if (isMounted) {
          dispatch(pusherActions.setError("Failed to connect to Pusher"));
        }
      }
    };

    initConnection();

    return () => {
      isMounted = false;
      if (fallbackIntervalRef.current) {
        clearInterval(fallbackIntervalRef.current);
        fallbackIntervalRef.current = null;
      }
      if (conn) {
        conn.disconnect();
      }
      if (connectionRef.current) {
        connectionRef.current.disconnect();
        connectionRef.current = null;
      }
    };
  }, [
    userInfo?.LoginName,
    userInfo?.ClientCode,
    handleMessage,
    dispatch,
    checkPendingRids,
  ]);

  /**
   * Thêm RID vào pending list để fallback polling
   * Call sau khi gửi request cần tracking response
   */
  const addPendingRid = useCallback((rid: string) => {
    if (connectionRef.current) {
      connectionRef.current.addPendingRid(rid);
    }
  }, []);

  /**
   * Xóa RID khỏi pending list
   * Call khi đã nhận được response
   */
  const removePendingRid = useCallback((rid: string) => {
    if (connectionRef.current) {
      connectionRef.current.removePendingRid(rid);
    }
  }, []);

  return {
    isConnected: connectionRef.current?.isConnected() ?? false,
    connectionId: connectionRef.current?.getConnectionId() || null,
    addPendingRid,
    removePendingRid,
  };
};
