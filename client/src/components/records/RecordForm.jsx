import styled from "@emotion/styled";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Paper,
} from "@mui/material";
import React from "react";

const StyledBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  width: "30rem",
  height: "30rem",
  padding: "1rem",
}));

const RecordForm = () => {
  return (
    <StyledBox component={Paper}>
      <FormControl>
        <InputLabel id="worker-select-label">Darbuotojas</InputLabel>
        <Select labelId="worker-select-label" label="Darbuotojas">
          <MenuItem>Petras Petraitis</MenuItem>
          <MenuItem>Tomas Tomaitis</MenuItem>
          <MenuItem>Jonas Jonaitis</MenuItem>
        </Select>
      </FormControl>
      <FormControl>
        <InputLabel id="record-type-label">Tipas</InputLabel>
        <Select labelId="record-type-label" label="Tipas">
          <MenuItem>Atvykimas</MenuItem>
          <MenuItem>Isvykimas</MenuItem>
        </Select>
      </FormControl>
    </StyledBox>
  );
};

export default RecordForm;
