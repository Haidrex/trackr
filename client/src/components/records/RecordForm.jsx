import styled from "@emotion/styled";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Paper,
  Button,
  Snackbar,
  Alert,
  TextField,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/modern/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { createRecord } from "../../services/recordService";
import { getAllWorkers } from "../../services/workerService";
import Clock from "../Clock";

const StyledBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  width: "30rem",
  padding: "2rem",
  gap: "2rem",
}));

const RecordForm = ({ records, setRecords }) => {
  const [open, setOpen] = useState(false);
  const [workers, setWorkers] = useState([]);
  const [inputs, setInputs] = useState({
    worker: 0,
    type: "arrival",
  });
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    async function getData() {
      const response = await getAllWorkers();
      setWorkers(response.data);
      setInputs({
        worker: response.data[0].id,
        type: "arrival",
      });
    }
    getData();
  }, []);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const handleChange = (event) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
  };

  const handleSubmit = async () => {
    if (inputs.type === "arrival") {
      const response = await createRecord({
        worker: inputs.worker,
        arrival: time,
        type: inputs.type,
      });
      setOpen(true);
      setRecords((prev) => [...prev, response.data]);
    } else {
      await createRecord({
        worker: inputs.worker,
        departure: time,
        type: inputs.type,
      });
      //get index of the record to update
      const index = records.findIndex(
        (record) => record.workerId === inputs.worker
      );
      //update the record
      const updatedRecord = { ...records[index], departure: time };
      //update the records array
      const updatedRecords = [...records];
      updatedRecords[index] = updatedRecord;
      setOpen(true);
      setRecords(updatedRecords);
    }
  };

  return (
    <StyledBox component={Paper}>
      <Clock />
      <FormControl>
        <InputLabel id="worker-select-label">Darbuotojas</InputLabel>
        <Select
          labelId="worker-select-label"
          label="Darbuotojas"
          name="worker"
          value={inputs.worker}
          onChange={handleChange}
        >
          {workers.map((worker) => {
            return (
              <MenuItem
                value={worker.id}
                key={worker.id}
              >{`${worker.firstname} ${worker.lastname}`}</MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <FormControl>
        <InputLabel id="record-type-label">Tipas</InputLabel>
        <Select
          labelId="record-type-label"
          label="Tipas"
          name="type"
          value={inputs.type}
          onChange={handleChange}
        >
          <MenuItem value="arrival" key="1">
            Atvykimas
          </MenuItem>
          <MenuItem value="departure" key="2">
            Išvykimas
          </MenuItem>
        </Select>
      </FormControl>
      <FormControl>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker
            label="Laikas"
            value={time}
            onChange={(e) => setTime(e.$d)}
            ampm={false}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </FormControl>
      <Button variant="contained" onClick={handleSubmit}>
        Išsaugoti
      </Button>
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        message="Išsaugota"
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Išsaugota
        </Alert>
      </Snackbar>
    </StyledBox>
  );
};

export default RecordForm;
