import axios from "../index";
import type {
  CrawlURLPayload,
  ICrawlJobHistoryResponse,
  ICrawlURLResponse,
} from "./types";

export const crawlAPIRequest = (
  payload: CrawlURLPayload
): Promise<ICrawlURLResponse | null> =>
  axios.post("/api/crawl", payload).then((res) => res.data);

export const getCrawlJobHistoryRequest =
  (): Promise<ICrawlJobHistoryResponse> =>
    axios.get("/api/jobs/history").then((res) => res.data);
