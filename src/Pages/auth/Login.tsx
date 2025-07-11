import { Box, Typography } from "@mui/material";
import { LoginForm } from "./components/LoginForm";
import { useAuth } from "@/hooks";

const Login = () => {
  const { loading, login } = useAuth();
  console.log({ loading, login });
  return (
    <Box
      sx={{
        backgroundColor: "",
        maxWidth: 500,
        margin: "auto",
        border: "1px solid #0A1F2C",
        my: 3,
        p: 4,
        borderRadius: 2,
      }}
    >
      <Box sx={{ width: "100%", position: "relative" }}>
        <Box sx={{ mb: 6 }}>
          <Typography variant="h2" component={"h2"} sx={{ mb: 1.5 }}>
            Hello,
          </Typography>
          <Typography sx={{ color: "text.secondary" }}>
            Please sign-in to your account
          </Typography>
        </Box>

        <Box>
          <LoginForm />
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
