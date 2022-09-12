const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./db/db");
const userRouter = require("./controllers/user");
const workerRouter = require("./controllers/workers");
const recordsRouter = require("./controllers/records");

app.use(cors());
app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/workers", workerRouter);
app.use("/api/records", recordsRouter);
module.exports = app;
