import { Outlet } from "react-router";
import { Box } from "@mui/material";
import DrawerNavbar from "./components/DrawerNavbar";

const ProtectedLayout = () => {
  return (
    <div>
      <DrawerNavbar />
      <section id="main-layout">
        <Box sx={{ mt: 10, px: 4 }}>
          <Outlet />
        </Box>
      </section>
    </div>
  );
};

export default ProtectedLayout;
