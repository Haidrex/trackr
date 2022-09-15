import { Container } from "@mui/material";
import React from "react";
import RecordForm from "../components/records/RecordForm";

const Record = () => {
  return (
    <Container sx={{ display: "flex", justifyContent: "center" }}>
      <RecordForm />
    </Container>
  );
};

export default Record;
