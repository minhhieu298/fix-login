import * as signalR from "@microsoft/signalr";

/**
 * Hàm khởi tạo và tự động kết nối tới SignalR hub.
 * @param hubUrl URL của Hub (ví dụ: "https://your-server/hub")
 * @param onConnected Callback khi kết nối thành công
 * @param onReconnected Callback khi reconnect lại thành công
 * @param onClosed Callback khi kết nối bị đóng
 * @returns HubConnection instance
 */
export async function createSignalRConnection(
  hubUrl: string,
  onConnected?: () => void,
  onReconnected?: () => void,
  onClosed?: (_error?: Error) => void
) {
  const connection = new signalR.HubConnectionBuilder()
    .withUrl(hubUrl, {
      withCredentials: true,
      transport: signalR.HttpTransportType.WebSockets,
      skipNegotiation: true,
    })
    .configureLogging(signalR.LogLevel.Information)
    .withAutomaticReconnect([0, 1000, 5000, 10000]) // 0ms, 1s, 5s, 10s
    .build();

  connection.onreconnecting(() => {});

  connection.onreconnected(() => {
    onReconnected?.();
  });

  connection.onclose((error) => {
    onClosed?.(error);
  });

  // Hàm start có retry
  const start = async () => {
    try {
      await connection.start();
      onConnected?.();
    } catch {
      setTimeout(start, 10000);
    }
  };

  await start();

  return connection;
}
