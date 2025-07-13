import axios from "../index";
import type { TCrawlHistoryResponse } from "./types";

export const getCrawlHistoryRequest = (): Promise<TCrawlHistoryResponse> =>
  axios.get("/api/history").then((res) => res.data);
