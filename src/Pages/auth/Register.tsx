import { Box, Typography } from "@mui/material";
import { RegistrationForm } from "./components/RegistrationForm";

const Register = () => {
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
            Please register here for your account
          </Typography>
        </Box>

        <Box>
          <RegistrationForm />
        </Box>
      </Box>
    </Box>
  );
};

export default Register;
