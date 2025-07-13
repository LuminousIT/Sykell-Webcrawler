import { Box, Stack, Tooltip, Typography } from "@mui/material";
import { URLForm } from "./components/URLForm";
import { useState } from "react";
import { crawlAPIRequest } from "@/api/url-management";
import { toast } from "react-toastify";
import { getErrorMessage } from "@/utils";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useReactWebSocket } from "@/hooks/useReactWebSocket";
import { WebcrawlerProgressIndicator } from "./components/WebcrawlerProgressIndicator";

const URLManagement = () => {
  // const { websocketInstance, isConnected, socketData } = useWebsocket();
  const { connectionStatus, getWebSocket, lastJsonMessage, socketData } =
    useReactWebSocket();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [jobID, setJobID] = useState<string>("");

  const handleSubmitUrls = async (data: { urls: string }) => {
    try {
      setIsSubmitting(true);
      const userUrls = data.urls.trim().split(",");
      const result = await crawlAPIRequest({ urls: userUrls });
      toast.success(result?.message);
      setJobID(result?.job_id || "");
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

  // console.log({
  //   connectionStatus,
  //   getWebSocket,
  //   lastJsonMessage,
  //   jobID,
  //   socketData,
  // });
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
    </Box>
  );
};

export default URLManagement;
