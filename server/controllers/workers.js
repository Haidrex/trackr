const { Worker } = require("../db/models");
const authJwt = require("../middleware/authJwt");
const workerRouter = require("express").Router();

workerRouter.get(
  "/",
  [authJwt.verifyToken, authJwt.isAdmin],
  async (request, response) => {
    try {
      const workers = await Worker.findAll();
      response.status(200).json(workers);
    } catch (error) {
      response.status(500).json({
        error: error.message,
      });
    }
  }
);

workerRouter.get(
  "/:id",
  [authJwt.verifyToken, authJwt.isAdmin],
  async (request, response) => {
    try {
      const id = request.params.id;
      const worker = await Worker.findByPk(id);

      response.status(200).json(worker);
    } catch (error) {
      response.status(500).json({
        error: error.message,
      });
    }
  }
);

workerRouter.post(
  "/",
  [authJwt.verifyToken, authJwt.isAdmin],
  async (request, response) => {
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

    response.status(201).json(worker);
  }
);

workerRouter.delete(
  "/:id",
  [authJwt.verifyToken, authJwt.isAdmin],
  async (request, response) => {
    try {
      const id = request.params.id;
      const response = await Worker.destroy({ where: { id } });
      response.status(204);
    } catch (error) {
      response.status(500).json({ error: error.message });
    }
  }
);

workerRouter.patch(
  "/:id",
  [authJwt.verifyToken, authJwt.isAdmin],
  async (request, response) => {
    try {
      const { firstname, lastname, kennitala } = request.body;
      const { id } = request.params;

      const response = await Worker.update(
        { firstname, lastname, kennitala },
        { where: { id } }
      );
      response.status(200).json(response);
    } catch (error) {
      response.status(500).json({
        error: error.message,
      });
    }
  }
);

module.exports = workerRouter;
