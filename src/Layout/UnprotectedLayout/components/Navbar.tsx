import { Box, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        width: "100%",
        p: 2,
        backgroundColor: "#0A1F2C",
        cursor: "pointer",
      }}
      onClick={() => navigate("/")}
    >
      <Typography sx={{ color: "#fff" }} variant="h4">
        Sykell
      </Typography>
    </Box>
  );
};

export default Navbar;
