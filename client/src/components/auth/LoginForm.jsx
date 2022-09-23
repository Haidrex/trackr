import React from "react";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { login } from "../../services/authService";
import styled from "@emotion/styled";

const StyledPaper = styled(Paper)(({ theme }) => ({
  height: "30rem",
  width: "30rem",
  boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
  display: "flex",
  justifyContent: "center",
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

const schema = yup
  .object({
    username: yup.string().required("Prisijungimo vardas yra privalomas"),
    password: yup.string().required("Slaptažodis privalomas"),
  })
  .required();

const LoginForm = () => {
  let navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      await login(data.username, data.password);
      navigate("/record");
      window.location.reload();
    } catch (error) {
      console.log(`there has been and error: ${error}`);
    }
  };

  return (
    <StyledPaper>
      <form onSubmit={handleSubmit(onSubmit)}>
        <StyledBox>
          <Typography variant="h4">Prisijungimas</Typography>
          <Controller
            name="username"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Prisijungimo vardas"
                error={errors.username ? true : false}
                helperText={errors.username?.message}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                type="password"
                label="Slaptažodis"
                error={errors.password ? true : false}
                helperText={errors.password?.message}
              />
            )}
          />

          <Button variant="contained" type="submit">
            Prisijungti
          </Button>
        </StyledBox>
      </form>
    </StyledPaper>
  );
};

export default LoginForm;
