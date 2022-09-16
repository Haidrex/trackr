import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import styled from "@emotion/styled";

const StyledBox = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  justifyContent: "center",
  gap: "1rem",
}));

const Clock = () => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    setInterval(() => setDate(new Date()), 30000);
  }, []);

  return (
    <StyledBox>
      <Typography variant="h5">
        {date.toLocaleDateString("en-GB", {
          day: "numeric",
          month: "numeric",
          year: "numeric",
        })}
      </Typography>
      <Typography variant="h5">
        {date.toLocaleString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: false,
        })}
      </Typography>
    </StyledBox>
  );
};

export default Clock;
