const { Record } = require("../db/models");

const recordsRouter = require("express").Router();

recordsRouter.get("/", async (request, response) => {
  const records = await Record.findAll();

  response.status(200).json(records);
});

recordsRouter.post("/", async (request, response) => {
  const { time, worker_id, type } = request.body;

  if (!time | !worker_id | !type) {
    return response.status(400).json({
      error: "Missing data",
    });
  }

  const record = await Record.create({
    time,
    worker_id,
    type,
  });

  response.status(200).json(record);
});

module.exports = recordsRouter;
