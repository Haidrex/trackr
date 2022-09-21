import { Box, TextField, Typography, Button } from "@mui/material";
import React from "react";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import styled from "@emotion/styled";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import { exportRecords } from "../../services/recordService";
const StyledBox = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  justifyContent: "flex-end",
  marginBottom: "1rem",
  gap: "1rem",
}));

const WorkerRecordsHeader = ({ date, setDate }) => {
  const handleFromChange = (newValue) => {
    setDate({ ...date, from: newValue });
  };
  const handleToChange = (newValue) => {
    setDate({ ...date, to: newValue });
  };

  const handleClick = async () => {
    await exportRecords(date);
  };
  return (
    <StyledBox>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <DesktopDatePicker
          label="Nuo"
          inputFormat="MM/DD/YYYY"
          name="from"
          value={date.from}
          onChange={handleFromChange}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <DesktopDatePicker
          label="Iki"
          inputFormat="MM/DD/YYYY"
          name="to"
          value={date.to}
          onChange={handleToChange}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>

      <Button variant="outlined" onClick={handleClick}>
        <ImportExportIcon />
        <Typography>Eksportuoti</Typography>
      </Button>
    </StyledBox>
  );
};

export default WorkerRecordsHeader;
