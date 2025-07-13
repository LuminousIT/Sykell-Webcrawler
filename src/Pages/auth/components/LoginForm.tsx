import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod/v4";

import { Button, Typography, Box, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks";

const LoginSchema = z.object({
  username: z.string().min(1, { message: "Username is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

type ILoginSchema = z.infer<typeof LoginSchema>;

const LoginForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ILoginSchema>({
    mode: "onBlur",
    resolver: zodResolver(LoginSchema),
    defaultValues: { username: "", password: "" },
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data: any) => {
    login(data, onSuccessCallback);
  };

  const onSuccessCallback = () => {
    navigate("/dashboard");
  };
  const renderErrorMessage = () => (
    <Box sx={{ mb: 4, color: "red" }}>
      <Typography>Invalid Credentials!</Typography>
    </Box>
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {errors.root?.serverError.type === "400" &&
        errors &&
        renderErrorMessage()}
      <Box sx={{ mb: 4 }}>
        <Controller
          name="username"
          control={control}
          render={() => (
            <TextField
              fullWidth
              autoComplete="username"
              autoFocus
              label="Username"
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

      <Box
        sx={{
          mb: 4,
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box />
        <Typography component={Link} to="/register">
          New here? Sign up!
        </Typography>
      </Box>
      <Button
        fullWidth
        type="submit"
        variant="contained"
        loading={isSubmitting}
        sx={{ mb: 4 }}
        aria-busy={isSubmitting}
        style={{ backgroundColor: "#0A1F2C" }}
      >
        <span>Login</span>
      </Button>
    </form>
  );
};

export { LoginForm };
