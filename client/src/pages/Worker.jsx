import { Container } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import WorkerHeader from "../components/workers/WorkerHeader";
import WorkerRecords from "../components/workers/WorkerRecords";
import { getWorker } from "../services/workerService";

const Worker = () => {
  const [worker, setWorker] = useState({});
  const { id } = useParams();

  useEffect(() => {
    async function getData() {
      const response = await getWorker(id);
      setWorker(response.data);
    }
    getData();
  }, [id]);

  return (
    <Container>
      <WorkerHeader worker={worker} />
      <WorkerRecords records={worker.records} />
    </Container>
  );
};

export default Worker;
