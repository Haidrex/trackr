import { Box, Button, Container } from "@mui/material";
import React, { useState, useEffect } from "react";
import CreateModal from "../components/workers/CreateModal";
import WorkersTable from "../components/workers/WorkersTable";
import { getAllWorkers } from "../services/workerService";

const Workers = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    async function getData() {
      try {
        const response = await getAllWorkers();
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, []);

  return (
    <Container sx={{ paddingTop: "2rem" }}>
      <Box sx={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          sx={{ marginBottom: "1rem" }}
          onClick={handleOpen}
        >
          Prideti darbuotoja
        </Button>
      </Box>
      <WorkersTable workers={data} setWorkers={setData} />
      <CreateModal  open={open} handleClose={handleClose} setData={setData} />
    </Container>
  );
};

export default Workers;
