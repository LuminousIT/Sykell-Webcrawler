import axios from "../index";
import type { CrawlURLPayload, ICrawlURLResponse } from "./types";

export const crawlAPIRequest = (
  payload: CrawlURLPayload
): Promise<ICrawlURLResponse | null> =>
  axios.post("/api/crawl", payload).then((res) => res.data);
