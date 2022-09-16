import { Container } from "@mui/material";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import RecordsHeader from "../components/records/RecordsHeader";
import RecordsTable from "../components/records/RecordsTable";
import { getAllRecords } from "../services/recordService";

const Records = () => {
  const [records, setRecords] = useState([]);
  useEffect(() => {
    async function getData() {
      const response = await getAllRecords();
      setRecords(response.data);
    }
    getData();
  }, []);
  return (
    <Container sx={{ paddingTop: "2rem" }}>
      <RecordsHeader />
      <RecordsTable records={records} />
    </Container>
  );
};

export default Records;
