import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod/v4";

import {
  Button,
  Box,
  TextField,
  InputLabel,
  CircularProgress,
} from "@mui/material";

const URLFormSchema = z.object({
  urls: z.string().min(1, { message: "URL is required" }),
});

type IURLFormSchema = z.infer<typeof URLFormSchema>;

type Props = {
  onSubmitUrls: (data: IURLFormSchema) => void;
  loading: boolean;
};

const URLForm = ({ onSubmitUrls, loading }: Props) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IURLFormSchema>({
    mode: "onBlur",
    resolver: zodResolver(URLFormSchema),
    defaultValues: { urls: "" },
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data: IURLFormSchema) => {
    onSubmitUrls(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ mb: 4 }}>
        <InputLabel sx={{ mb: 2 }} htmlFor="urls">
          Comma separated List of URLs to be Crawled
        </InputLabel>
        <Controller
          name="urls"
          control={control}
          render={() => (
            <TextField
              fullWidth
              multiline
              autoComplete="urls"
              rows={4}
              autoFocus
              label="List of URLs"
              placeholder="Please add here comma separated URLs of website you would like to crawl for information"
              {...register("urls")}
              error={Boolean(errors.urls)}
              helperText={errors.urls?.message}
            />
          )}
        />
      </Box>

      <Button
        fullWidth
        type="submit"
        variant="contained"
        loading={loading}
        disabled={loading}
        sx={{ mb: 4 }}
        aria-busy={loading}
        // style={{ backgroundColor: "#0A1F2C", color: "#fff" }}
      >
        {loading && <CircularProgress size={14} color="warning" />}
        Submit URLs
      </Button>
    </form>
  );
};

export { URLForm };
