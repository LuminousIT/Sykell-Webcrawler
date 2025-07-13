import { useEffect, useRef, useState } from "react";
import { webSocketUrl } from "./socket";
import useWebSocket, { ReadyState } from "react-use-websocket";
import type { TUseWebSocketHookResponse } from "./types";
import type { ICrawlJobData } from "@/api/url-management/types";

type TConnectionStatus =
  | "Connecting"
  | "Open"
  | "Closing"
  | "Closed"
  | "Uninstantiated";
type TUseWSHook = TUseWebSocketHookResponse<unknown> & {
  wsRef: WebSocket | null;
  connectionStatus: TConnectionStatus;
  socketData: ICrawlJobData | null;
};
export const useReactWebSocket = () => {
  const wsRef = useRef<WebSocket | null>(null);
  const [socketData, setSocketData] = useState<ICrawlJobData | null>(null);
  const {
    sendMessage,
    sendJsonMessage,
    lastMessage,
    lastJsonMessage,
    readyState,
    getWebSocket,
  } = useWebSocket(webSocketUrl, {
    onOpen: () => {
      const socket = getWebSocket();
      if (socket instanceof WebSocket) {
        wsRef.current = socket;
      } else {
        wsRef.current = null;
      }
      console.log("WebSocket connection established");
    },
    onClose: () => console.log("WebSocket connection closed"),
    shouldReconnect: () => true, // Attempt to reconnect on all close events
    reconnectAttempts: 10,
    reconnectInterval: 1000,
    onMessage: (event: WebSocketEventMap["message"]) => {
      console.log("message event ", { liveEvent: event });
      onEvent(event);
    },
  });

  const onEvent = (event: MessageEvent) => {
    console.log({ event });
    const eventData = JSON.parse(event.data);

    if (eventData.type === "job_update") {
      setSocketData(eventData?.data);
      console.log({ eventData });
    }
  };

  useEffect(() => {
    return () => {
      if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
        wsRef.current.close();
      }
    };
  }, []);

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState] as TConnectionStatus;

  const useWebSocketHookValues: TUseWSHook = {
    sendJsonMessage,
    sendMessage,
    lastMessage,
    lastJsonMessage,
    getWebSocket,
    wsRef: wsRef.current,
    connectionStatus,
    socketData,
  };

  return {
    ...useWebSocketHookValues,
  };
};
