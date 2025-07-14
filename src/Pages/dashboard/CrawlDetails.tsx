import type { ICrawlJobResult } from "@/api/url-management/types";
import { Box, Card, CardContent, CardHeader, Grid } from "@mui/material";
import { useLocation } from "react-router";
import { CrawlDetailsHeader } from "./components/CrawlDetailsHeader";
import { DetailsPageInformation } from "./components/DetailsPageInformation";
import { DetailsCountInfo } from "./components/DetailsCountInfo";
import { DetailsLinksAnalysis } from "./components/DetailsLinksAnalysis";
import { DonutChart } from "./components/DonutChart";

const CrawlDetails = () => {
  const location = useLocation();
  const details: ICrawlJobResult = location?.state;
  console.log({ details });
  return (
    <Box>
      <CrawlDetailsHeader url={details.url} crawled_at={details.crawled_at} />

      <Grid container spacing={2} sx={{ my: 2 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <DetailsPageInformation details={details} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <DetailsLinksAnalysis details={details} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardHeader title="Heading Structure" />
            <CardContent>
              <DetailsCountInfo label="H1" value={details.heading_counts.h1} />
              <DetailsCountInfo label="H2" value={details.heading_counts.h2} />
              <DetailsCountInfo label="H3" value={details.heading_counts.h3} />
              <DetailsCountInfo label="H4" value={details.heading_counts.h4} />
              <DetailsCountInfo label="H5" value={details.heading_counts.h5} />
              <DetailsCountInfo label="H6" value={details.heading_counts.h6} />
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardHeader title="Internal Vs External Links" />
            <CardContent>
              <DonutChart
                internal={details.link_analysis.internal_links}
                external={details.link_analysis.external_links}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CrawlDetails;
