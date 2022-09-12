const { Worker } = require("../db/models");
const workerRouter = require("express").Router();

workerRouter.get("/", async (request, response) => {
  const workers = await Worker.findAll();
  response.status(200).json(workers);
});

workerRouter.post("/", async (request, response) => {
  const { firstname, lastname, kennitala } = request.body;

  if (!firstname | !lastname | !kennitala) {
    return response.status(400).json({
      error: "Missing worker data",
    });
  }

  const worker = await Worker.create({
    firstname,
    lastname,
    kennitala,
  });

  response.status(200).json(worker);
});

module.exports = workerRouter;
