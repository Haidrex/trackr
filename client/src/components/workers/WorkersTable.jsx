import React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import styled from "@emotion/styled";

const StyledRow = styled(TableRow)(({ theme }) => ({
  "&:hover": {
    cursor: "pointer",
    backgroundColor: "lightgray",
    transition: "0.2s all",
  },
}));

const WorkersTable = ({ workers }) => {
  return (
    <TableContainer
      component={Paper}
      sx={{ boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px" }}
    >
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell>Vardas</TableCell>
            <TableCell>Pavardė</TableCell>
            <TableCell>Kennitala</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {workers.map((worker) => {
            return (
              <StyledRow>
                <TableCell>{worker.firstname}</TableCell>
                <TableCell>{worker.lastname}</TableCell>
                <TableCell>{worker.kennitala}</TableCell>
              </StyledRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default WorkersTable;
