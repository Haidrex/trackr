import { Container } from "@mui/material";
import React from "react";
import RecordsTable from "../components/records/RecordsTable";
import WorkerHeader from "../components/workers/WorkerHeader";

const Worker = () => {
  return (
    <Container>
      <WorkerHeader />
      <RecordsTable />
    </Container>
  );
};

export default Worker;
