import styled from "@emotion/styled";
import { Container } from "@mui/material";
import React from "react";
import RecordForm from "../components/records/RecordForm";
import RecordsTable from "../components/records/RecordsTable";

const StyledContainer = styled(Container)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: "2rem",
  gap: "3rem",
}));

const Record = () => {
  return (
    <StyledContainer>
      <RecordForm />
      <RecordsTable records={[]} />
    </StyledContainer>
  );
};

export default Record;
