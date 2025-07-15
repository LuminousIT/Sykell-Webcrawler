import { Box, Card, CardContent, CardHeader } from "@mui/material";
import { SimpleDetailsInfo } from "./SimpleDetailsInfo";
import type { ICrawlJobResult } from "@/api/url-management/types";
import { formatDate } from "@/utils";

type Props = {
  details: ICrawlJobResult;
};
export const DetailsPageInformation = ({ details }: Props) => {
  return (
    <Box>
      <Card title="Page Information">
        <CardHeader title="Page Information" />
        <CardContent>
          <SimpleDetailsInfo label="URL" value={details.url} />
          <SimpleDetailsInfo label="Page Title" value={details.title} />
          <SimpleDetailsInfo
            label="HTML Version"
            value={details.html_version}
          />
          <SimpleDetailsInfo
            label="Last Crawled At"
            value={formatDate(details.crawled_at)}
          />
        </CardContent>
      </Card>
    </Box>
  );
};
