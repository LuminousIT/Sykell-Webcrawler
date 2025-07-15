import { authConfig } from "@/api/auth/types";
import { getFromStorage } from "@/utils";

const token = getFromStorage(authConfig.token);
const wsBaseUrl = import.meta.env.VITE_WEB_SOCKET_URL;

export const webSocketUrl = `${wsBaseUrl}/ws?token=${token}`;
