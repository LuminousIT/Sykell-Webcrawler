import { getFromStorage } from "@/utils";
import axios, { type AxiosInstance } from "axios";

export const baseURL = import.meta.env.BASE_URL;

const axiosInstance: AxiosInstance = axios.create({
  baseURL,
});

axiosInstance.interceptors.request.use((config) => {
  const token = getFromStorage("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
    config.headers["Content-Type"] = "application/json";
  }
  return config;
});

export default axiosInstance;
