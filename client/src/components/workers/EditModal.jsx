import React, { useState } from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styled from "@emotion/styled";
import { createWorker } from "../../services/workerService";

const StyledBox = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%,-50%)",
  width: 400,
  backgroundColor: "#fff",
  padding: "2rem",
  borderRadius: "5px",
}));

const Wrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "1rem",
}));

const schema = yup
  .object({
    firstname: yup.string().required("Vardas privalomas"),
    lastname: yup.string().required("Pavardė privaloma"),
    kennitala: yup.string().required("Kennitala privaloma"),
  })
  .required();

const EditModal = ({ open, handleClose, workers, setData, workerId }) => {
  const [error, setError] = useState(null);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstname: "",
      lastname: "",
      kennitala: "",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    setError(null);
    try {
      const response = await createWorker(data);
      setData((values) => [...values, response.data]);
      handleClose();
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <StyledBox>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Wrapper>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Redaguoti darbuotoją
            </Typography>
            <Controller
              name="firstname"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Vardas"
                  error={errors.firstname ? true : false}
                  helperText={errors.firstname?.message}
                />
              )}
            />
            <Controller
              name="lastname"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Pavardė"
                  error={errors.lastname ? true : false}
                  helperText={errors.lastname?.message}
                />
              )}
            />
            <Controller
              name="kennitala"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Kennitala"
                  error={errors.kennitala ? true : false}
                  helperText={errors.kennitala?.message}
                />
              )}
            />
            {error && (
              <Typography color="error" textAlign="center">
                {error}
              </Typography>
            )}
            <Button type="submit" variant="contained">
              Išsaugoti
            </Button>
          </Wrapper>
        </form>
      </StyledBox>
    </Modal>
  );
};

export default EditModal;
