import React, { useState } from "react";
import { Modal, Box, Typography, Button } from "@mui/material";
import styled from "@emotion/styled";
import { createWorker } from "../../services/workerService";

const StyledBox = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%,-50%)",
  width: 500,
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
const DeleteModal = ({ open, handleClose, workers, setData }) => {
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
            Ar tikrai norite pašalinti darbuotoją?
          </Typography>
          <Box sx={{ display: "flex", gap: "1rem" }}>
            <Button variant="outlined" onClick={handleClose}>
              Atšaukti
            </Button>
            <Button variant="contained" color="error">
              Šalinti
            </Button>
          </Box>
        </Wrapper>
      </StyledBox>
    </Modal>
  );
};

export default DeleteModal;
