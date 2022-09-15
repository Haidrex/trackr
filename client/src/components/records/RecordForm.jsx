import styled from "@emotion/styled";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Paper,
  TextField,
  Button,
} from "@mui/material";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/modern/AdapterDayjs";
import React from "react";

const StyledBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  width: "30rem",
  padding: "2rem",
  gap: "2rem",
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
      <FormControl>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker
            label="Laikas"
            onChange={(event) => {
              console.log(event);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </FormControl>
      <Button variant="contained">Išsaugoti</Button>
    </StyledBox>
  );
};

export default RecordForm;
