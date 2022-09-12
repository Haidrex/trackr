import { Container } from "@mui/material";
import React from "react";
import LoginForm from "../components/auth/LoginForm";

const Login = () => {
  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "calc(100vh - 64px)",
      }}
    >
      <LoginForm />
    </Container>
  );
};

export default Login;
