import React from "react";
import { useNavigate } from "react-router-dom";
import { AppBar, Box, Toolbar, Typography, Button } from "@mui/material";

const Navbar = () => {
  let navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Trackr
          </Typography>

          <Button color="inherit" onClick={() => navigate("/records")}>
            Pagrindinis
          </Button>
          <Button color="inherit" onClick={() => navigate("/record")}>
            Zymejimas
          </Button>
          <Button color="inherit" onClick={() => navigate("/workers")}>
            Darbuotojai
          </Button>
          <Button color="inherit" onClick={() => navigate("/")}>
            Atsijungti
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
