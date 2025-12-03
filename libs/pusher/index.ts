import * as signalR from "@microsoft/signalr";

/**
 * Pusher WebSocket Service
 *
 * SignalR-based real-time messaging service for receiving notifications from server.
 * Messages are received via "p" event and contain business type (bt) and data (d).
 *
 * Message format:
 * {
 *   bt: "Internal|margin",  // Business type
 *   d: {                     // Data payload
 *     RID: "...",            // Request ID
 *     Code: 0,               // Status code
 *     Message_VN: "...",
 *     ...
 *   }
 * }
 */

export interface PusherMessageData {
  bt?: string;
  d: {
    RID?: string;
    RId?: string;
    FormId?: string;
    RowId?: string;
    Code?: number;
    Message_VN?: string;
    Message_EN?: string;
    [key: string]: any;
  };
}

export interface PusherConnectionOptions {
  pusherUrl?: string;
  onConnected?: () => void;
  onReconnected?: () => void;
  onClosed?: (_error?: Error) => void;
  onMessage?: (_message: PusherMessageData) => void;
  onError?: (_error: Error) => void;
}

/**
 * Pusher SignalR Connection Manager
 *
 * Features:
 * - Auto-reconnect with exponential backoff (0ms, 1s, 5s, 2s)
 * - Cookie-based authentication (aspfpt_sessiontoken)
 * - Pending RID tracking for fallback polling
 * - WebSocket-only transport (skipNegotiation: true)
 */
export class PusherConnection {
  private connection: signalR.HubConnection | null = null;
  private options: PusherConnectionOptions | null = null;
  private isManualClose = false;
  private readonly pendingRids: Set<string> = new Set();

  /**
   * Establish connection to Pusher SignalR Hub
   */
  async connect(options: PusherConnectionOptions = {}): Promise<void> {
    this.options = options;
    this.isManualClose = false;

    const pusherUrl =
      options.pusherUrl ||
      process.env.NEXT_PUBLIC_NEXT_DOMAIN_PUSHER ||
      "http://pusheruat.fpts.com.vn/pusher";

    const hubUrl = `${pusherUrl}/pusher?name=aspfpt_sessiontoken`;

    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(hubUrl, {
        withCredentials: true,
        transport: signalR.HttpTransportType.WebSockets,
        skipNegotiation: true,
      })
      .configureLogging(signalR.LogLevel.Information)
      .withAutomaticReconnect([0, 1000, 5000, 2000])
      .build();

    // Listen to "p" event from server
    this.connection.on("p", (noti: string) => {
      try {
        const data: PusherMessageData = JSON.parse(noti);
        this.handleMessage(data);
      } catch (error) {
        this.options?.onError?.(error as Error);
      }
    });

    this.connection.onreconnecting(() => {
      // Connection lost, attempting to reconnect
    });

    this.connection.onreconnected(() => {
      this.options?.onReconnected?.();
    });

    this.connection.onclose((error) => {
      this.options?.onClosed?.(error);
    });

    await this.startConnection();
  }

  /**
   * Start connection with retry logic
   */
  private async startConnection(): Promise<void> {
    try {
      await this.connection!.start();
      this.options?.onConnected?.();
    } catch (error) {
      this.options?.onError?.(error as Error);
      // Retry after 10 seconds
      setTimeout(() => {
        if (!this.isManualClose) {
          this.startConnection();
        }
      }, 10000);
    }
  }

  /**
   * Handle incoming message
   * - Remove RID from pending list
   * - Forward to callback
   */
  private handleMessage(data: PusherMessageData): void {
    if (data.d?.RID) {
      this.pendingRids.delete(data.d.RID);
    } else if (data.d?.RId) {
      this.pendingRids.delete(data.d.RId);
    }

    this.options?.onMessage?.(data);
  }

  addPendingRid(rid: string): void {
    this.pendingRids.add(rid);
  }

  removePendingRid(rid: string): void {
    this.pendingRids.delete(rid);
  }

  getPendingRids(): string[] {
    return Array.from(this.pendingRids);
  }

  disconnect(): void {
    this.isManualClose = true;
    if (this.connection) {
      this.connection.stop();
      this.connection = null;
    }
    this.pendingRids.clear();
  }

  isConnected(): boolean {
    return this.connection?.state === signalR.HubConnectionState.Connected;
  }

  getConnectionId(): string | null {
    return this.connection?.connectionId || null;
  }
}

/**
 * Factory function to create Pusher connection
 */
export async function createPusherConnection(
  options: PusherConnectionOptions = {}
): Promise<PusherConnection> {
  const connection = new PusherConnection();
  await connection.connect(options);
  return connection;
}

export const PUSHER_URL =
  process.env.NEXT_PUBLIC_NEXT_DOMAIN_PUSHER ||
  "http://pusheruat.fpts.com.vn/pusher";
