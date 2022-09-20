const authJwt = require("../middleware/authJwt");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const recordsRouter = require("express").Router();

recordsRouter.get("/", [authJwt.verifyToken], async (request, response) => {
  try {
    const records = await prisma.record.findMany({
      include: { worker: true },
    });
    response.status(200).json(records);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});

recordsRouter.get(
  "/:date",
  [authJwt.verifyToken],
  async (request, response) => {
    //get records by date
    try {
      const { date } = request.params;
      const newDate = new Date(date);

      const year = newDate.getFullYear();
      const month = newDate.getMonth() + 1;
      const day = newDate.getDate();

      const from = new Date(`${year}-${month}-${day} 00:00`);
      const to = new Date(`${year}-${month}-${day} 23:59`);
      const records = await prisma.record.findMany({
        where: {
          arrival: {
            gte: from,
            lte: to,
          },
        },
        include: { worker: true },
      });

      response.status(200).json(records);
    } catch (error) {
      response.status(500).json({ error: error.message });
    }
  }
);

recordsRouter.get(
  "/today",
  [authJwt.verifyToken],
  async (request, response) => {
    try {
      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const from = new Date(`${year}-${month}-${day} 00:00`);
      const to = new Date(`${year}-${month}-${day} 23:59`);
      const records = await prisma.record.findMany({
        where: {
          arrival: {
            gte: from,
            lte: to,
          },
        },
        include: { worker: true },
      });
      response.status(200).json(records);
    } catch (error) {
      response.status(500).json({ error: error.message });
    }
  }
);
recordsRouter.post("/", [authJwt.verifyToken], async (request, response) => {
  try {
    const { arrival, departure, worker, type } = request.body;

    if (type === "arrival") {
      if (!arrival | !worker) {
        return response.status(400).json({
          error: "Missing data",
        });
      }
      //check if arrival exists for today
      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const from = new Date(`${year}-${month}-${day} 00:00`);
      const to = new Date(`${year}-${month}-${day} 23:59`);
      const records = await prisma.record.findMany({
        where: {
          workerId: worker,
          arrival: {
            gte: from,
            lte: to,
          },
        },
        include: { worker: true },
      });
      if (records.length > 0) {
        return response.status(400).json({
          error: "Arrival already exists for today",
        });
      }

      const record = await prisma.record.create({
        data: {
          arrival: arrival,
          workerId: worker,
          departure: null,
        },
        include: { worker: true },
      });

      response.status(200).json(record);
    } else {
      if (!departure | !worker) {
        return response.status(400).json({
          error: "Missing data",
        });
      }

      //check if departure exists for user for today
      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const from = new Date(`${year}-${month}-${day} 00:00`);
      const to = new Date(`${year}-${month}-${day} 23:59`);
      const records = await prisma.record.findMany({
        where: {
          workerId: worker,
          departure: {
            gte: from,
            lte: to,
          },
        },
        include: { worker: true },
      });
      if (records.length > 0) {
        return response.status(400).json({
          error: "Departure already exists for today",
        });
      }

      //get year month day from departure
      const newDate = new Date(departure);
      const newyear = newDate.getFullYear();
      const newmonth = newDate.getMonth() + 1;
      const newday = newDate.getDate();
      //get last record of worker
      const lastRecord = await prisma.record.findFirst({
        where: {
          workerId: worker,
          departure: null,
        },
        orderBy: {
          arrival: "desc",
        },
      });
      //get year month day from last record
      const lastRecordYear = lastRecord.arrival.getFullYear();
      const lastRecordMonth = lastRecord.arrival.getMonth() + 1;
      const lastRecordDay = lastRecord.arrival.getDate();
      //check if last record is from the same day
      if (
        year === lastRecordYear &&
        month === lastRecordMonth &&
        day === lastRecordDay
      ) {
        const record = await prisma.record.update({
          where: {
            id: lastRecord.id,
          },
          data: {
            departure: departure,
          },
          include: { worker: true },
        });

        response.status(200).json(record);
      } else {
        return response.status(400).json({
          error: "Missing data",
        });
      }
    }
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});

recordsRouter.put("/:id", [authJwt.verifyToken], async (request, response) => {
  try {
    const { id } = request.params;
    const { time, worker, type } = request.body;

    if (!time | !worker | !type) {
      return response.status(400).json({
        error: "Missing data",
      });
    }

    const record = await prisma.record.update({
      where: {
        id: Number(id),
      },
      data: {
        time,
        workerId: worker,
        typeId: time,
      },
    });

    response.status(200).json(record);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});

module.exports = recordsRouter;
