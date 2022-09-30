import React from "react";
import { CircularProgress, Container } from "@mui/material";
import styled from "@emotion/styled";
const StyledContainer = styled(Container)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "90vh",
}));

const Loading = () => {
  return (
    <StyledContainer>
      <CircularProgress size="4rem" />
    </StyledContainer>
  );
};

export default Loading;
