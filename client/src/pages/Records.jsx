import { Container } from "@mui/material";
import React from "react";
import RecordsHeader from "../components/records/RecordsHeader";
import RecordsTable from "../components/records/RecordsTable";

const Records = () => {
  return (
    <Container sx={{ paddingTop: "2rem" }}>
      <RecordsHeader />
      <RecordsTable />
    </Container>
  );
};

export default Records;
