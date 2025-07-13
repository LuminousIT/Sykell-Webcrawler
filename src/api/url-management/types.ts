export type CrawlURLPayload = {
  urls: string[];
};

export interface ICrawlURLResponse {
  job_id: string;
  message: string;
  status: string;
}
