import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableBody,
} from "@mui/material";
import React from "react";

const RecordsTable = ({ records }) => {
  return (
    <TableContainer
      component={Paper}
      sx={{ boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px" }}
    >
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell>Darbuotojas</TableCell>
            <TableCell>Atvykimas</TableCell>
            <TableCell>Išvykimas</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {records.map((record) => {
            return (
              <TableRow>
                <TableCell>
                  {record.worker.firstname} {record.worker.lastname}
                </TableCell>
                <TableCell>
                  {new Date(record.arrival).toLocaleString("en-US", {
                    hour: "numeric",
                    minute: "numeric",
                    hour12: false,
                  })}
                </TableCell>
                <TableCell>
                  {record.departure
                    ? new Date(record.departure).toLocaleString("en-US", {
                        hour: "numeric",
                        minute: "numeric",
                        hour12: false,
                      })
                    : "Dar neišvykęs"}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default RecordsTable;
