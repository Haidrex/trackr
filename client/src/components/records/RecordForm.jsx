import React, { useState, useEffect } from "react";
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
  Typography,
  Autocomplete,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/modern/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers";
import { createRecord } from "../../services/recordService";
import { getAllWorkers } from "../../services/workerService";
import Clock from "../Clock";

const StyledBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  width: "30rem",
  padding: "2rem",
  gap: "2rem",
  "@media (max-width: 500px)": {
    width: "100%",
  },
}));

const RecordForm = ({ records, setRecords }) => {
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [workers, setWorkers] = useState([]);
  const [worker, setWorker] = useState(null);
  const [type, setType] = useState("arrival");
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    async function getData() {
      const response = await getAllWorkers();
      //set workers to array of objects with id and firstname and lastname as label
      setWorkers(
        response.data.map((worker) => ({
          label: `${worker.firstname} ${worker.lastname}`,
          id: worker.id,
        }))
      );
    }
    getData();
  }, []);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleSubmit = async () => {
    setError(null);
    try {
      if (type === "arrival") {
        const response = await createRecord({
          worker: worker,
          arrival: time,
          type: type,
        });
        setOpen(true);
        setRecords((prev) => [...prev, response.data]);
      } else {
        await createRecord({
          worker: worker,
          departure: time,
          type: type,
        });
        //get index of the record to update
        const index = records.findIndex((record) => record.workerId === worker);
        //update the record
        const updatedRecord = { ...records[index], departure: time };
        //update the records array
        const updatedRecords = [...records];
        updatedRecords[index] = updatedRecord;
        setOpen(true);
        setRecords(updatedRecords);
      }
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <StyledBox component={Paper}>
      <Clock />
      <FormControl>
        <Autocomplete
          disablePortal
          name="worker"
          options={workers}
          onChange={(e, newValue) => setWorker(newValue.id)}
          renderInput={(params) => (
            <TextField {...params} label="Darbuotojas" />
          )}
        />
      </FormControl>
      <FormControl>
        <InputLabel id="record-type-label">Tipas</InputLabel>
        <Select
          labelId="record-type-label"
          label="Tipas"
          name="type"
          value={type}
          onChange={(e) => setType(e.target.value)}
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
      {error && (
        <Typography color="error" textAlign="center">
          {error}
        </Typography>
      )}
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
