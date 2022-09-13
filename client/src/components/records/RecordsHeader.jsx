import { Box, TextField } from "@mui/material";
import React from "react";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { useState } from "react";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import styled from "@emotion/styled";

const StyledBox = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  justifyContent: "center",
}));

const RecordsHeader = () => {
  const [value, setValue] = useState(new Date());
  const handleChange = (newValue) => {
    setValue(newValue);
  };
  return (
    <StyledBox>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <DesktopDatePicker
          label="Diena"
          inputFormat="MM/DD/YYYY"
          value={value}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
    </StyledBox>
  );
};

export default RecordsHeader;
