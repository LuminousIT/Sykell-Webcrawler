import { useEffect, useState } from "react";
import { webSocketUrl } from "./socket";

export const useWebsocket = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [socketData, setSocketData] = useState(null);
  const [websocketInstance, setWebsocketInstance] = useState<WebSocket | null>(
    null
  );

  useEffect(() => {
    const websocket = new WebSocket(webSocketUrl);
    setWebsocketInstance(websocket);

    websocket.onopen = onConnect;
    websocket.onclose = onDisconnect;
    websocket.onmessage = onEvent;
    return () => {
      websocket.close();
    };
  }, []);

  const onConnect = () => {
    setIsConnected(true);
  };

  const onDisconnect = () => {
    setIsConnected(false);
  };

  console.log({ isConnected, websocketInstance });

  const onEvent = (event: MessageEvent) => {
    console.log({ event });
    const eventData = JSON.parse(event.data);

    if (eventData.type === "job_update") {
      setSocketData(eventData?.data);
      console.log({ eventData });
    } else if (eventData.type === "connected") {
      // setIsConnected(true);
    }
  };
  return {
    isConnected,
    websocketInstance,
    socketData,
  };
};
