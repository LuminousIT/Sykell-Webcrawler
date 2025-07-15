import { getFromStorage } from "@/utils";
import axios, { type AxiosInstance } from "axios";
import { authConfig } from "./auth/types";

export const baseURL = import.meta.env.VITE_BASE_URL;

console.log({ baseURL });
const axiosInstance: AxiosInstance = axios.create({
  baseURL,
});

axiosInstance.interceptors.request.use((config) => {
  const token = getFromStorage(authConfig.token);
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
    config.headers["Content-Type"] = "application/json";
  }
  return config;
});

export default axiosInstance;
