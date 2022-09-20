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

const WorkerRecords = ({ records }) => {
  return (
    <TableContainer
      component={Paper}
      sx={{ boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px" }}
    >
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell>Data</TableCell>
            <TableCell>Atvykimas</TableCell>
            <TableCell>Išvykimas</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {records &&
            records.map((record) => {
              return (
                <TableRow>
                  <TableCell>
                    {record.arrival
                      ? new Date(record.arrival).toLocaleString("en-US", {
                          year: "numeric",
                          month: "numeric",
                          day: "numeric",
                        })
                      : null}
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

export default WorkerRecords;