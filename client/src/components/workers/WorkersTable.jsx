import React, { useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import DeleteModal from "./DeleteModal";

const StyledRow = styled(TableRow)(({ theme }) => ({
  "&:hover": {
    cursor: "pointer",
    backgroundColor: "lightgray",
    transition: "0.2s all",
  },
}));

const WorkersTable = ({ workers, setWorkers }) => {
  let navigate = useNavigate();
  const [deleteId, setDeleteId] = useState(null);

  const [open, setOpen] = useState(false);
  const handleOpen = (id) => {
    setDeleteId(id);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
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
            <TableCell>Veiksmai</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {workers.map((worker) => {
            return (
              <StyledRow key={worker.id}>
                <TableCell>{worker.firstname}</TableCell>
                <TableCell>{worker.lastname}</TableCell>
                <TableCell>{worker.kennitala}</TableCell>
                <TableCell sx={{ display: "flex", gap: "1rem" }}>
                  <InfoIcon
                    onClick={() => navigate(`/workers/${worker.id}`)}
                    color="primary"
                    fontSize="large"
                  />
                  <DeleteIcon
                    onClick={() => handleOpen(worker.id)}
                    color="error"
                    fontSize="large"
                  />
                </TableCell>
              </StyledRow>
            );
          })}
        </TableBody>
      </Table>
      <DeleteModal
        open={open}
        handleClose={handleClose}
        workers={workers}
        setData={setWorkers}
        workerId={deleteId}
      />
    </TableContainer>
  );
};

export default WorkersTable;
