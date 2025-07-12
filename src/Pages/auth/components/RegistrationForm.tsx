import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod/v4";

import { Link } from "react-router-dom";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useAuth } from "@/hooks";

const RegistrationSchema = z.object({
  email: z.string().min(1, { message: "Email is required" }),
  password: z.string().min(1, { message: "Password is required" }),
  username: z.string().min(1, { message: "Username is required" }),
});

type IRegistrationSchema = z.infer<typeof RegistrationSchema>;

const RegistrationForm = () => {
  const { register: handleRegister, loading } = useAuth();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IRegistrationSchema>({
    mode: "onBlur",
    resolver: zodResolver(RegistrationSchema),
    defaultValues: {
      email: "",
      password: "",
      username: "",
    },
  });

  const onSubmit = async (data: IRegistrationSchema) => {
    await handleRegister(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ mb: 4 }}>
        <Controller
          name="username"
          control={control}
          render={() => (
            <TextField
              id="username"
              fullWidth
              autoComplete="username"
              label="Username"
              autoFocus
              placeholder="Username"
              {...register("username")}
              error={Boolean(errors.username)}
              helperText={errors.username?.message}
            />
          )}
        />
      </Box>

      <Box sx={{ mb: 4 }}>
        <Controller
          name="email"
          control={control}
          render={() => (
            <TextField
              id="email"
              fullWidth
              autoComplete="email"
              label="Email"
              placeholder="email"
              {...register("email")}
              error={Boolean(errors.email)}
              helperText={errors.email?.message}
            />
          )}
        />
      </Box>
      <Box sx={{ mb: 4 }}>
        <Controller
          name="password"
          control={control}
          render={() => (
            <TextField
              fullWidth
              autoComplete="password"
              label="Password"
              {...register("password")}
              type="password"
              placeholder="Password"
              id="password"
              error={Boolean(errors.password)}
              helperText={errors.password?.message}
            />
          )}
        />
      </Box>

      <Button
        fullWidth
        type="submit"
        variant="contained"
        loading={loading}
        aria-busy={isSubmitting}
        loadingPosition="end"
        sx={{ mb: 4 }}
      >
        <span>Submit</span>
      </Button>
      <Typography
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          "& svg": { mr: 1 },
        }}
      >
        <Link to="/login">Go back to login</Link>
      </Typography>
    </form>
  );
};

export { RegistrationForm };
