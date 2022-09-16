const { Record } = require("../db/models");
const authJwt = require("../middleware/authJwt");

const recordsRouter = require("express").Router();

recordsRouter.get("/", [authJwt.verifyToken], async (request, response) => {
  try {
    const records = await Record.findAll();
    response.status(200).json(records);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});

recordsRouter.post("/", [authJwt.verifyToken], async (request, response) => {
  try {
    const { time, worker, type } = request.body;

    if (!time | !worker | !type) {
      return response.status(400).json({
        error: "Missing data",
      });
    }

    const record = await Record.create({
      time,
      worker_id: worker,
      type,
    });

    response.status(200).json(record);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});

module.exports = recordsRouter;
