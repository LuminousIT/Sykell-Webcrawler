import axios from "../index";
import type {
  CrawlURLPayload,
  ICrawlURLResponse,
} from "../url-management/types";
import type { TCrawlHistoryResponse, TJobControl } from "./types";

export const getCrawlHistoryRequest = (): Promise<TCrawlHistoryResponse> =>
  axios.get("/api/history").then((res) => res.data);

export const rerunAnalysisRequest = (
  payload: CrawlURLPayload
): Promise<ICrawlURLResponse | null> =>
  axios.post("/api/rerun", payload).then((res) => res.data);

export const deleteAnalysisRequest = (
  payload: CrawlURLPayload
): Promise<ICrawlURLResponse | null> =>
  axios.delete("/api/data", { data: payload }).then((res) => res.data);

export const stopAnalysisRequest = (
  payload: TJobControl
): Promise<ICrawlURLResponse | null> =>
  axios.post("/api/jobs/control", payload).then((res) => res.data);
