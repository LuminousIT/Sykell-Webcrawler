import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import { DetailsCountInfo } from "./DetailsCountInfo";
import type { ICrawlJobResult } from "@/api/url-management/types";

type Props = {
  details: ICrawlJobResult;
};
export const DetailsLinksAnalysis = ({ details }: Props) => {
  return (
    <Card title="Link Analysis">
      <CardHeader title="Link Analysis" />
      <CardContent>
        <Box>
          <DetailsCountInfo
            label="Internal Links"
            value={details.link_analysis.internal_links}
          />
          <DetailsCountInfo
            label="External Links"
            value={details.link_analysis.external_links}
          />
          <DetailsCountInfo
            label="Inaccessible Links"
            value={details.link_analysis.inaccessible_links.length}
          />
        </Box>
        <Typography variant="h5">Broken Links </Typography>
        <Box sx={{ mt: 2, ml: 1, maxHeight: 200, overflowY: "scroll" }}>
          {details.link_analysis.inaccessible_links.map((item, index) => (
            <Box key={index} sx={{ my: 1 }}>
              <Stack direction={"row"} justifyContent={"space-between"}>
                <Typography variant="body2">{item.link_url}</Typography>
                <Chip label={item.error_code} color="error" />
              </Stack>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};
