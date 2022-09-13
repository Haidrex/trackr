import styled from "@emotion/styled";
import {
  Box,
  Button,
  FormControl,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";

const StyledPaper = styled(Paper)(({ theme }) => ({
  height: "30rem",
  width: "30rem",
}));

const StyledBox = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "2.5rem",
}));

const LoginForm = () => {
  return (
    <StyledPaper>
      <StyledBox>
        <Typography variant="h4">Prisijungimas</Typography>
        <FormControl>
          <TextField label="Prisijungimo vardas" />
        </FormControl>
        <FormControl>
          <TextField type="password" label="Slaptažodis" />
        </FormControl>
        <FormControl>
          <Button variant="contained">Prisijungti</Button>
        </FormControl>
      </StyledBox>
    </StyledPaper>
  );
};

export default LoginForm;
