export type CrawlURLPayload = {
  urls: string[];
};

export interface ICrawlURLResponse {
  job_id: string;
  message: string;
  status: string;
  urls?: string[];
}

export type TCrawlJob = {
  type: string;
  data: ICrawlJobData;
};
export interface ICrawlJobData {
  job_id: string;
  status: string;
  progress: number;
  total_urls: number;
  current_url?: string;
  result?: ICrawlJobResult;
  completed_at?: string;
}

export interface ICrawlJobResult {
  url: string;
  html_version: string;
  title: string;
  heading_counts: {
    h1: number;
    h2: number;
    h3: number;
    h4: number;
    h5: number;
    h6: number;
  };
  link_analysis: {
    internal_links: number;
    external_links: number;
    inaccessible_links: TInaccessibleLinks[];
  };
  has_login_form: boolean;
  crawled_at: string;
  id?: string;
  user_id?: string;
  job_id?: string;
}

type TInaccessibleLinks = {
  link_url: string;
  error_code: string;
};

export type TCrawlJobHistory = {
  id: string;
  user_id: number;
  urls: string[];
  status: string;
  progress: number;
  total_urls: number;
  created_at: string;
  started_at: string;
  completed_at: string;
  results: ICrawlJobResult[];
  job_id?: string;
};

export interface ICrawlJobHistoryResponse {
  jobs: TCrawlJobHistory[];
}
