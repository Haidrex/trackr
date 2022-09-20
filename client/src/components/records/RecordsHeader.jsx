import { Box, TextField } from "@mui/material";
import React from "react";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import styled from "@emotion/styled";

const StyledBox = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  justifyContent: "flex-end",
  marginBottom: "1rem",
}));

const RecordsHeader = ({ date, setDate }) => {
  const handleChange = (newValue) => {
    setDate(newValue);
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
    </StyledBox>
  );
};

export default RecordsHeader;
