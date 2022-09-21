import { Container } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import WorkerHeader from "../components/workers/WorkerHeader";
import WorkerRecords from "../components/workers/WorkerRecords";
import WorkerRecordsHeader from "../components/workers/WorkerRecordsHeader";
import { getWorker } from "../services/workerService";

const Worker = () => {
  const [worker, setWorker] = useState({});
  const [date, setDate] = useState({
    from: new Date(),
    to: new Date(),
  });
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
      <WorkerRecordsHeader date={date} setDate={setDate} />
      <WorkerRecords records={worker.records} />
    </Container>
  );
};

export default Worker;
