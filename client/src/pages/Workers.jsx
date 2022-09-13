import { Button, Container } from "@mui/material";
import React from "react";
import CreateModal from "../components/workers/CreateModal";
import WorkersTable from "../components/workers/WorkersTable";

const Workers = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Container sx={{ paddingTop: "2rem" }}>
      <Button variant="contained" onClick={handleOpen}>
        Prideti darbuotoja
      </Button>
      <WorkersTable />
      <CreateModal open={open} handleClose={handleClose} />
    </Container>
  );
};

export default Workers;
