import styled from "@emotion/styled";
import { Box, Paper, Typography } from "@mui/material";
import React from "react";

const StyledBox = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  marginTop: "1rem",
  padding: "2rem",
  justifyContent: "space-between",
  alignItems: "center",
}));

const NameBox = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "1rem",
  alignItems: "flex-end",
}));

const HoursBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

const WorkerHeader = ({ worker }) => {
  return (
    <StyledBox
      component={Paper}
      sx={{
        marginBottom: "1rem",
        boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
      }}
    >
      <NameBox>
        <Box sx={{ display: "flex", gap: "1rem" }}>
          <Typography variant="h4">Vardas</Typography>
          <Typography variant="h4">Pavarde</Typography>
        </Box>
        <Box>
          <Typography variant="h5" sx={{ opacity: 0.7 }}>
            Kennitala
          </Typography>
        </Box>
      </NameBox>
      <HoursBox>
        <Typography variant="h4">68 val</Typography>
        <Typography sx={{ opacity: 0.7 }}>Si menesi isdirbta</Typography>
      </HoursBox>
    </StyledBox>
  );
};

export default WorkerHeader;
