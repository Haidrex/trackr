import styled from "@emotion/styled";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Paper,
  Button,
} from "@mui/material";
// import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
// import { AdapterDayjs } from "@mui/x-date-pickers/modern/AdapterDayjs";
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

const RecordForm = () => {
  const [workers, setWorkers] = useState([]);
  const [inputs, setInputs] = useState({
    worker: 0,
    type: 1,
  });

  // const [time, setTime] = useState(new Date());

  useEffect(() => {
    async function getData() {
      const response = await getAllWorkers();
      setWorkers(response.data);
      setInputs({
        worker: response.data[0].id,
        type: 1,
      });
    }
    getData();
  }, []);

  const handleChange = (event) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
  };
  // const handleTimeChange = (newValue) => {
  //   setTime(newValue);
  // };

  const handleSubmit = () => {
    createRecord({
      time: new Date(),
      worker: inputs.worker,
      type: inputs.type,
    });
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
          <MenuItem value={1} key="1">
            Atvykimas
          </MenuItem>
          <MenuItem value={2} key="2">
            Išvykimas
          </MenuItem>
        </Select>
      </FormControl>
      {/* <FormControl>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker
            label="Laikas"
            ampm={false}
            value={time}
            onChange={handleTimeChange}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </FormControl> */}
      <Button variant="contained" onClick={handleSubmit}>
        Išsaugoti
      </Button>
    </StyledBox>
  );
};

export default RecordForm;
