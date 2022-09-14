import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  FormControl,
  TextField,
  Button,
} from "@mui/material";
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
const CreateModal = ({ open, handleClose, workers, setData }) => {
  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
  };

  const handleSubmit = async () => {
    //const newWorker = await createWorker(inputs);
    setData([...workers, inputs]);
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <StyledBox>
        <Wrapper>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Naujas darbuotojas
          </Typography>
          <FormControl>
            <TextField
              label="Vardas"
              name="firstname"
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <TextField
              label="Pavarde"
              name="lastname"
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <TextField
              label="Kennitala"
              name="kennitala"
              onChange={handleChange}
            />
          </FormControl>
          <Button variant="contained" onClick={handleSubmit}>
            Prideti
          </Button>
        </Wrapper>
      </StyledBox>
    </Modal>
  );
};

export default CreateModal;
