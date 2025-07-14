import { Box, Typography } from "@mui/material";

type Props = {
  label: string;
  value: string | number;
};
export const SimpleDetailsInfo = ({ label, value }: Props) => {
  return (
    <Box sx={{ my: 1 }}>
      <Typography variant="subtitle2" color="#525252">
        {label}
      </Typography>
      <Typography variant="body1">{value}</Typography>
    </Box>
  );
};
