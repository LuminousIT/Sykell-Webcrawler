import type { ICrawlJobResult } from "../url-management/types";

export type TCrawlHistoryResponse = {
  history: ICrawlJobResult[];
};

export type TJobControl = {
  job_id?: string;
  action: string;
};
