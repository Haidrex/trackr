import React, { useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import DeleteModal from "./DeleteModal";

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
              <TableRow key={worker.id}>
                <TableCell>{worker.firstname}</TableCell>
                <TableCell>{worker.lastname}</TableCell>
                <TableCell>{worker.kennitala}</TableCell>
                <TableCell sx={{ display: "flex", gap: "1rem" }}>
                  <Button
                    variant="outlined"
                    onClick={() => navigate(`/workers/${worker.id}`)}
                  >
                    <InfoIcon color="primary" fontSize="medium" />
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => handleOpen(worker.id)}
                  >
                    <DeleteIcon color="error" fontSize="medium" />
                  </Button>
                </TableCell>
              </TableRow>
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
