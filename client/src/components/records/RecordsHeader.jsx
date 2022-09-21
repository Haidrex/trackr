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

const RecordsHeader = ({ date, setDate }) => {
  const handleChange = (newValue) => {
    setDate(newValue);
  };

  const handleClick = async () => {
    const response = await exportRecords(date);
  };
  return (
    <StyledBox>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <DesktopDatePicker
          label="Diena"
          inputFormat="MM/DD/YYYY"
          value={date}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>

      <Button onClick={handleClick}>
        <ImportExportIcon />
        <Typography>Eksportuoti</Typography>
      </Button>
    </StyledBox>
  );
};

export default RecordsHeader;
