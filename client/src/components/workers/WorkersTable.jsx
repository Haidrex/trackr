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
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import DeleteModal from "./DeleteModal";
import EditModal from "./EditModal";

const WorkersTable = ({ workers, setWorkers }) => {
  let navigate = useNavigate();

  const [selectedId, setSelectedId] = useState(null);

  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const handleOpen = (id) => {
    setSelectedId(id);
    setOpen(true);
  };

  const handleEditOpen = (id) => {
    setSelectedId(id);
    setEditOpen(true);
  };

  const handleClose = () => setOpen(false);
  const handleEditClose = () => setEditOpen(false);

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
                  <Button variant="outlined">
                    <EditIcon
                      color="primary"
                      fontSize="medium"
                      onClick={() => handleEditOpen(worker.id)}
                    />
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
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
      <EditModal
        open={editOpen}
        handleClose={handleEditClose}
        workers={workers}
        setWorkers={setWorkers}
        workerId={selectedId}
      />
      <DeleteModal
        open={open}
        handleClose={handleClose}
        workers={workers}
        setData={setWorkers}
        workerId={selectedId}
      />
    </TableContainer>
  );
};

export default WorkersTable;
