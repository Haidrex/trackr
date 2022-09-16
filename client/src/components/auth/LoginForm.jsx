import styled from "@emotion/styled";
import {
  Box,
  Button,
  FormControl,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/authService";

const StyledPaper = styled(Paper)(({ theme }) => ({
  height: "30rem",
  width: "30rem",
  boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
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
  const [inputs, setInputs] = useState({ username: "", password: "" });
  let navigate = useNavigate();

  const handleChange = (event) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await login(inputs.username, inputs.password);
      navigate("/record");
      window.location.reload();
    } catch (error) {
      console.log(`there has been and error: ${error}`);
    }
  };

  return (
    <StyledPaper>
      <StyledBox>
        <Typography variant="h4">Prisijungimas</Typography>
        <FormControl>
          <TextField
            label="Prisijungimo vardas"
            name="username"
            value={inputs.username}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl>
          <TextField
            type="password"
            label="Slaptažodis"
            name="password"
            value={inputs.password}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl>
          <Button variant="contained" onClick={handleSubmit}>
            Prisijungti
          </Button>
        </FormControl>
      </StyledBox>
    </StyledPaper>
  );
};

export default LoginForm;
