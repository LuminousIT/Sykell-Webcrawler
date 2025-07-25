import type { WebSocketLike } from "react-use-websocket/dist/lib/types";

export type TUseWebSocketOptionsType = {
  fromSocketIO?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  queryParams?: { [field: string]: any };
  protocols?: string | string[];
  share?: boolean;
  onOpen?: (event: WebSocketEventMap["open"]) => void;
  onClose?: (event: WebSocketEventMap["close"]) => void;
  onMessage?: (event: WebSocketEventMap["message"]) => void;
  onError?: (event: WebSocketEventMap["error"]) => void;
  onReconnectStop?: (numAttempts: number) => void;
  shouldReconnect?: (event: WebSocketEventMap["close"]) => boolean;
  reconnectInterval?: number | ((lastAttemptNumber: number) => number);
  reconnectAttempts?: number;
  filter?: (message: WebSocketEventMap["message"]) => boolean;
  disableJson?: boolean;
  retryOnError?: boolean;
  eventSourceOptions?: EventSourceInit;
  heartbeat?:
    | boolean
    | {
        message?: "ping" | "pong" | string | (() => string);
        returnMessage?: "ping" | "pong" | string;
        timeout?: number;
        interval?: number;
      };
};

export type TUseWebSocketHookResponse<T> = {
  sendMessage: (message: string) => void;
  //jsonMessage must be JSON-parsable
  sendJsonMessage: (jsonMessage: T) => void;
  //null before first received message
  lastMessage: WebSocketEventMap["message"] | null;
  //null before first received message. If message.data is not JSON parsable, then this will be a static empty object
  lastJsonMessage: T | null;
  // -1 if uninstantiated, otherwise follows WebSocket readyState mapping: 0: 'Connecting', 1 'OPEN', 2: 'CLOSING', 3: 'CLOSED'
  readyState?: number;
  // If using a shared websocket, return value will be a proxy-wrapped websocket, with certain properties/methods protected
  getWebSocket: () => WebSocketLike | null;
};
