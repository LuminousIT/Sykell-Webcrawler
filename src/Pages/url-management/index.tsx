import { Box, Typography } from "@mui/material";
import { URLForm } from "./components/URLForm";
import { useWebsocket } from "@/hooks/useWebsocket";
import { useState } from "react";
import { crawlAPIRequest } from "@/api/url-management";
import { toast } from "react-toastify";
import { getErrorMessage } from "@/utils";
import { Icon } from "@iconify/react/dist/iconify.js";

const URLManagement = () => {
  const { websocketInstance, isConnected, socketData } = useWebsocket();
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

  console.log({ websocketInstance, socketData, isConnected });
  return (
    <Box>
      <Typography variant="h4">URL Management</Typography>
      <Box sx={{ mt: 4, mb: 2 }}>
        <URLForm onSubmitUrls={handleSubmitUrls} loading={isSubmitting} />
      </Box>
      <Box>
        {isConnected ? (
          <Icon
            icon={"tabler:plug-connected"}
            color="#2DB010"
            fontSize={"2rem"}
          />
        ) : (
          <Icon
            icon={"tabler:plug-connected-x"}
            color="#222222"
            fontSize={"2rem"}
          />
        )}
      </Box>
    </Box>
  );
};

export default URLManagement;
