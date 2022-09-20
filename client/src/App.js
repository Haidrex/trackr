import "./App.css";
import { CssBaseline } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Workers from "./pages/Workers";
import Navbar from "./components/Navbar";
import Records from "./pages/Records";
import Worker from "./pages/Worker";
import Record from "./pages/Record";
import PrivateRoute from "./pages/PrivateRoute";

function App() {
  return (
    <>
      <CssBaseline />
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/record" element={<PrivateRoute />}>
          <Route path="/record" element={<Record />} />
        </Route>
        <Route path="/records" element={<PrivateRoute />}>
          <Route path="/records" element={<Records />} />
        </Route>
        <Route path="/workers" element={<PrivateRoute />}>
          <Route path="/workers" element={<Workers />} />
        </Route>
        <Route path="/workers/:id" element={<PrivateRoute />}>
          <Route path="/workers/:id" element={<Worker />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
