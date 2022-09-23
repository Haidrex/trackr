import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  ListItem,
  ListItemText,
  ListItemButton,
  Divider,
  List,
  IconButton,
  Drawer,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { getCurrentUser, logout } from "../services/authService";
import { useEffect } from "react";

const drawerWidth = 240;

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);
  let navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  useEffect(() => {
    const user = getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowAdmin(user.isadmin);
    }
  }, []);

  const handleLogout = () => {
    logout();
    setCurrentUser(undefined);
    setShowAdmin(false);
    navigate("/");
    window.location.reload();
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Trackr
      </Typography>
      <Divider />
      <List>
        {currentUser && (
          <ListItem key="record" disablePadding>
            <ListItemButton
              sx={{ textAlign: "center" }}
              onClick={() => navigate("/record")}
            >
              <ListItemText primary="Žymėjimas" />
            </ListItemButton>
          </ListItem>
        )}
        {showAdmin && (
          <ListItem key="records" disablePadding>
            <ListItemButton
              sx={{ textAlign: "center" }}
              onClick={() => navigate("/records")}
            >
              <ListItemText primary="Įrašai" />
            </ListItemButton>
          </ListItem>
        )}
        {showAdmin && (
          <ListItem key="workers" disablePadding>
            <ListItemButton
              sx={{ textAlign: "center" }}
              onClick={() => navigate("/workers")}
            >
              <ListItemText primary="Darbuotojai" />
            </ListItemButton>
          </ListItem>
        )}
        {currentUser && (
          <ListItem key="logout" disablePadding>
            <ListItemButton sx={{ textAlign: "center" }} onClick={handleLogout}>
              <ListItemText primary="Atsijungti" />
            </ListItemButton>
          </ListItem>
        )}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar component="nav" position="static">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            Trackr
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {currentUser && (
              <Button
                key="record"
                sx={{ color: "#fff" }}
                onClick={() => navigate("/record")}
              >
                Žymėjimas
              </Button>
            )}
            {showAdmin && (
              <Button
                key="records"
                sx={{ color: "#fff" }}
                onClick={() => navigate("/records")}
              >
                Įrašai
              </Button>
            )}
            {showAdmin && (
              <Button
                key="workers"
                sx={{ color: "#fff" }}
                onClick={() => navigate("/workers")}
              >
                Darbuotojai
              </Button>
            )}
            {currentUser && (
              <Button
                key="logout"
                sx={{ color: "#fff" }}
                onClick={handleLogout}
              >
                Atsijungti
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
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
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
};

export default Navbar;
