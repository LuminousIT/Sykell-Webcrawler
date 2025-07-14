import { Box, Card, CardContent, Typography } from "@mui/material";
import { SimpleDetailsInfo } from "./SimpleDetailsInfo";
import { formatDate } from "@/utils";

type Props = {
  url: string;
  crawled_at: string;
};
export const CrawlDetailsHeader = ({ url, crawled_at }: Props) => {
  return (
    <Box>
      <Card sx={{ backgroundColor: "#E6FAFC", textAlign: "center" }}>
        <CardContent>
          <Typography variant="h4">Crawl Job Results</Typography>
          <SimpleDetailsInfo label="Web Address" value={url} />
          <SimpleDetailsInfo
            label="Date Crawled"
            value={formatDate(crawled_at)}
          />
        </CardContent>
      </Card>
    </Box>
  );
};
