import { Container } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import WorkerHeader from "../components/workers/WorkerHeader";
import WorkerRecords from "../components/workers/WorkerRecords";
import WorkerRecordsHeader from "../components/workers/WorkerRecordsHeader";
import { getRecordsByRange } from "../services/recordService";
import Loading from "../components/Loading";

const Worker = () => {
  const { id } = useParams();
  const [worker, setWorker] = useState({});
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState({
    from: new Date(),
    to: new Date(),
  });

  useEffect(() => {
    setLoading(true);
    async function getData() {
      const response = await getRecordsByRange(id, date.from, date.to);
      setWorker(response.data);
      setLoading(false);
    }
    getData();
  }, [id, date.from, date.to]);

  if (loading) return <Loading />;

  return (
    <Container>
      <WorkerHeader worker={worker} />
      <WorkerRecordsHeader workerId={id} date={date} setDate={setDate} />
      <WorkerRecords records={worker.records} />
    </Container>
  );
};

export default Worker;
