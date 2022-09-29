import { Container } from "@mui/material";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Loading from "../components/Loading";
import RecordsHeader from "../components/records/RecordsHeader";
import RecordsTable from "../components/records/RecordsTable";
import { getRecordsByDate } from "../services/recordService";

const Records = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState(new Date());
  useEffect(() => {
    async function getData() {
      const response = await getRecordsByDate(date);
      setRecords(response.data);
      setLoading(false);
    }
    getData();
  }, [date]);

  if (loading) return <Loading />;
  return (
    <Container sx={{ paddingTop: "2rem" }}>
      <RecordsHeader date={date} setDate={setDate} />
      <RecordsTable records={records} />
    </Container>
  );
};

export default Records;
