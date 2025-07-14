import { Box, Stack, Tooltip, Typography } from "@mui/material";
import { URLForm } from "./components/URLForm";
import { useEffect, useState } from "react";
import {
  crawlAPIRequest,
  getCrawlJobHistoryRequest,
} from "@/api/url-management";
import { toast } from "react-toastify";
import { getErrorMessage } from "@/utils";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useReactWebSocket } from "@/hooks/useReactWebSocket";
import { WebcrawlerProgressIndicator } from "./components/WebcrawlerProgressIndicator";
import { CrawlJobHistory } from "./components/CrawlJobHistory";
import type { TCrawlJobHistory } from "@/api/url-management/types";

const URLManagement = () => {
  const { connectionStatus, socketData } = useReactWebSocket();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [crawlJobHistory, setCrawlJobHistory] = useState<TCrawlJobHistory[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(false);
  // const [jobID, setJobID] = useState<string>("");

  useEffect(() => {
    handleFetchHistory();
  }, []);

  useEffect(() => {
    if (socketData?.status) {
      toast.info(`URL Analysis is ${socketData?.status}. `);
      if (socketData?.status === "completed") {
        handleFetchHistory();
      }
    }
  }, [socketData]);
  const handleSubmitUrls = async (data: { urls: string }) => {
    try {
      setIsSubmitting(true);
      const userUrls = data.urls.trim().split(",");
      const result = await crawlAPIRequest({ urls: userUrls });
      toast.success(result?.message);
      await handleFetchHistory(); //refetch
      // setJobID(result?.job_id || "");
    } catch (error) {
      // @ts-expect-error ignore briefly
      const errorMessage = error?.response?.data?.error;
      toast.error(
        `Crawl API Urls error. ${getErrorMessage(errorMessage || error)}`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFetchHistory = async () => {
    try {
      setIsLoading(true);
      const result = await getCrawlJobHistoryRequest();
      if (result) setCrawlJobHistory(result?.jobs);
    } catch (error) {
      // @ts-expect-error ignore briefly
      const errorMessage = error?.response?.data?.error;
      toast.error(
        `Error getting result history. ${getErrorMessage(
          errorMessage || error
        )}`
      );
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Box>
      <Stack direction={"row"} alignItems={"center"} gap={1}>
        <Box>
          {connectionStatus === "Connecting" || connectionStatus === "Open" ? (
            <Tooltip title="Real Time Updates Possible">
              <Icon
                icon={"tabler:plug-connected"}
                color="#2DB010"
                fontSize={"2rem"}
              />
            </Tooltip>
          ) : (
            <Tooltip title="Real Time Updates NOT Possible">
              <Icon
                icon={"tabler:plug-connected-x"}
                color="#222222"
                fontSize={"2rem"}
              />
            </Tooltip>
          )}
        </Box>
        <Typography variant="h4">URL Management</Typography>
      </Stack>

      <Box sx={{ mt: 4, mb: 2 }}>
        <URLForm onSubmitUrls={handleSubmitUrls} loading={isSubmitting} />
      </Box>
      {socketData && (
        <Box>
          <WebcrawlerProgressIndicator crawlJob={socketData} />
        </Box>
      )}
      <Box>
        <CrawlJobHistory
          history={crawlJobHistory}
          loading={isLoading}
          refetchJobHistory={handleFetchHistory}
        />
      </Box>
    </Box>
  );
};

export default URLManagement;
