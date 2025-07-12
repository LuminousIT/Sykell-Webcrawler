import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Icon } from "@iconify/react";
import { navItems } from "../navigation";
import { Tooltip } from "@mui/material";
import { useAuth } from "@/hooks";
import { NavLink } from "react-router-dom";

const drawerWidth = 240;

export default function DrawerNavbar() {
  const { logout } = useAuth();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography sx={{ color: "#fff", py: 2 }} variant="h4">
        Sykell
      </Typography>
      <Divider />
      <List>
        {navItems.map((item, index) => (
          <ListItem key={index} disablePadding>
            <NavLink to={item.path}>
              <ListItemButton sx={{ textAlign: "center", color: "#fff" }}>
                <ListItemText primary={item.title} />
              </ListItemButton>
            </NavLink>
          </ListItem>
        ))}
      </List>

      <Box>
        <Tooltip title="Logout">
          <IconButton sx={{ color: "#fff" }} onClick={logout}>
            <Icon icon={"tabler:logout"} />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav" sx={{ backgroundColor: "#0A1F2C" }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <Icon icon={"tabler:menu-2"} />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            Sykell
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item, index) => (
              <NavLink key={index} to={item.path}>
                <Button key={index} sx={{ color: "#fff" }}>
                  {item.title}
                </Button>
              </NavLink>
            ))}
          </Box>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <Tooltip title="Logout">
              <IconButton sx={{ color: "#fff" }} onClick={logout}>
                <Icon icon={"tabler:logout"} />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "#0A1F2C",
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
}
