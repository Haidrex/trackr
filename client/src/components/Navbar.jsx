import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppBar, Box, Toolbar, Typography, Button } from "@mui/material";
import { getCurrentUser, logout } from "../services/authService";
import { useEffect } from "react";

const Navbar = () => {
  const [showAdmin, setShowAdmin] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);
  let navigate = useNavigate();

  useEffect(() => {
    const user = getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowAdmin(user.isadmin);
    }
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
    window.location.reload();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Trackr
          </Typography>
          {currentUser && (
            <Button color="inherit" onClick={() => navigate("/record")}>
              Žymejimas
            </Button>
          )}
          {showAdmin && (
            <Button color="inherit" onClick={() => navigate("/records")}>
              Įrašai
            </Button>
          )}

          {showAdmin && (
            <Button color="inherit" onClick={() => navigate("/workers")}>
              Darbuotojai
            </Button>
          )}
          {currentUser ? (
            <Button color="inherit" onClick={handleLogout}>
              Atsijungti
            </Button>
          ) : (
            <Button color="inherit" onClick={() => navigate("/")}>
              Prisijungti
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
