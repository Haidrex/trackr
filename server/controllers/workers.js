const authJwt = require("../middleware/authJwt");
const workerRouter = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

workerRouter.get("/", [authJwt.verifyToken], async (request, response) => {
  try {
    const workers = await prisma.worker.findMany();
    response.status(200).json(workers);
  } catch (error) {
    response.status(500).json({
      message: error.message,
    });
  }
});

workerRouter.get(
  "/:id",
  [authJwt.verifyToken, authJwt.isAdmin],
  async (request, response) => {
    try {
      const id = request.params.id;
      const worker = await prisma.worker.findFirst({
        where: { id: Number(id) },
        include: { records: true },
      });
      response.status(200).json(worker);
    } catch (error) {
      response.status(500).json({
        message: error.message,
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
        error: "Trūksta duomenų",
      });
    }

    const worker = await prisma.worker.findFirst({
      where: { kennitala: kennitala },
    });

    if (worker) {
      return response.status(400).json({
        message: "Darbuotojas su tokiu kennitala jau yra",
      });
    }

    const newWorker = await prisma.worker.create({
      data: {
        firstname,
        lastname,
        kennitala,
      },
    });

    response.status(201).json(newWorker);
  }
);

workerRouter.delete(
  "/:id",
  [authJwt.verifyToken, authJwt.isAdmin],
  async (request, response) => {
    try {
      const id = request.params.id;

      //delete records by worker id
      await prisma.record.deleteMany({
        where: { workerId: Number(id) },
      });

      await prisma.worker.delete({
        where: { id: Number(id) },
      });

      response.status(204).json({ message: "Worker deleted" });
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  }
);

workerRouter.put(
  "/:id",
  [authJwt.verifyToken, authJwt.isAdmin],
  async (request, response) => {
    try {
      const { firstname, lastname, kennitala } = request.body;
      const { id } = request.params;

      if (!firstname | !lastname | !kennitala) {
        return response.status(400).json({
          error: "Trūksta duomenų",
        });
      }

      const updatedWorker = await prisma.worker.update({
        where: { id: Number(id) },
        data: {
          firstname,
          lastname,
          kennitala,
        },
      });

      response.status(200).json(updatedWorker);
    } catch (error) {
      response.status(500).json({
        message: error.message,
      });
    }
  }
);

module.exports = workerRouter;
