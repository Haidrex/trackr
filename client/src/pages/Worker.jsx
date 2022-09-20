import { Container } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import RecordsTable from "../components/records/RecordsTable";
import WorkerHeader from "../components/workers/WorkerHeader";
import { getWorker } from "../services/workerService";

const Worker = () => {
  const [worker, setWorker] = useState();
  const { id } = useParams();

  useEffect(() => {
    async function getData() {
      const response = await getWorker(id);
      console.log(response);
      setWorker(response.data);
    }
    getData();
  }, [id]);
  return (
    <Container>
      <WorkerHeader worker={worker} />
      <RecordsTable records={[]} />
    </Container>
  );
};

export default Worker;
