import "./App.css";
import { CssBaseline } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Workers from "./pages/Workers";
import Navbar from "./components/Navbar";
import Records from "./pages/Records";

function App() {
  return (
    <>
      <CssBaseline />
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/records" element={<Records />} />
        <Route path="/workers" element={<Workers />} />
      </Routes>
    </>
  );
}

export default App;
