import "./App.css";
import { CssBaseline } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Workers from "./pages/Workers";
import Navbar from "./components/Navbar";
import Records from "./pages/Records";
import Worker from "./pages/Worker";
import Record from "./pages/Record";

function App() {
  return (
    <>
      <CssBaseline />
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/record" element={<Record />} />
        <Route path="/records" element={<Records />} />
        <Route path="/workers" element={<Workers />} />
        <Route path="/workers/:id" element={<Worker />} />
      </Routes>
    </>
  );
}

export default App;
