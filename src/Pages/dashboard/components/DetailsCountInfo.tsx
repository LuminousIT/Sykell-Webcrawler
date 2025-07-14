import { Box, Chip, Stack, Typography } from "@mui/material";

type Props = {
  label: string;
  value: string | number;
};
export const DetailsCountInfo = ({ label, value }: Props) => {
  return (
    <Box>
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        sx={{ my: 1 }}
      >
        <Typography variant="body1">{label}</Typography>
        <Chip label={value} color="info" />
      </Stack>
    </Box>
  );
};
