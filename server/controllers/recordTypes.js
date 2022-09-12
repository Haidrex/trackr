const { RecordType } = require("../db/models");

const recordTypesRouter = require("express").Router();

recordTypesRouter.get("/", async (request, response) => {
  const recordTypes = await RecordType.findAll();

  response.status(200).json(recordTypes);
});

recordTypesRouter.post("/", async (request, response) => {
  const { name } = request.body;
  if (!name) {
    return response.status(400).json({
      error: "Missing name",
    });
  }
  const recordType = await RecordType.create({
    name,
  });

  response.status(200).json(recordType);
});
