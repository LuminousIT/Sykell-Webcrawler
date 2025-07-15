import type { ICrawlJobData } from "@/api/url-management/types";
import {
  Box,
  CircularProgress,
  LinearProgress,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

type Props = {
  crawlJob: ICrawlJobData | null;
};
export const WebcrawlerProgressIndicator = ({ crawlJob }: Props) => {
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");
  const [crawlData, setCrawlData] = useState<ICrawlJobData | null>(null);

  //   console.log({ crawlJob });
  useEffect(() => {
    if (crawlJob !== null) {
      setCrawlData(crawlJob);
      if (crawlJob.status === "completed") {
        setProgress(100);
        toast.info(`Web Crawling of ${crawlJob.status} Websites Completed!`);
        setMessage(`Web Crawling of ${crawlJob.status} Websites Completed!`);
        return;
      }
    }
    if (crawlJob?.progress != null) {
      const rawProgress = crawlJob?.progress; // assume 0-1
      const scaledProgress = rawProgress > 1 ? rawProgress : rawProgress * 100; // support 0-100 or 0-1
      setProgress(scaledProgress);
    }
  }, [crawlJob]);

  return (
    <Box sx={{ width: "100%", textAlign: "center" }}>
      {crawlData?.status === "running" && <CircularProgress />}
      <LinearProgress variant="determinate" value={progress} />
      <Typography variant="body2" sx={{ my: 2 }}>
        {message}
      </Typography>
      <Box>
        <Typography variant="body2" sx={{ my: 2 }}>
          Website Currently Crawling:{" "}
          {crawlJob?.current_url ||
            crawlJob?.result?.title ||
            crawlJob?.result?.url}
        </Typography>
        <Typography variant="body2" sx={{ my: 2 }}>
          Total Websites to be Crawled {crawlJob?.total_urls}
        </Typography>
      </Box>
    </Box>
  );
};
