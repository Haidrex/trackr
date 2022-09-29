import styled from "@emotion/styled";
import { Container } from "@mui/material";
import React, { useState, useEffect } from "react";
import Loading from "../components/Loading";
import RecordForm from "../components/records/RecordForm";
import RecordsTable from "../components/records/RecordsTable";
import { getRecordsByDate } from "../services/recordService";

const StyledContainer = styled(Container)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: "2rem",
  gap: "3rem",
}));

const Record = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function getData() {
      const response = await getRecordsByDate(new Date());
      setRecords(response.data);
      setLoading(false);
    }
    getData();
  }, []);

  if (loading) return <Loading />;

  return (
    <StyledContainer>
      <RecordForm records={records} setRecords={setRecords} />
      <RecordsTable records={records} />
    </StyledContainer>
  );
};

export default Record;
