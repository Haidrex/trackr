const authJwt = require("../middleware/authJwt");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const recordsRouter = require("express").Router();
const ExcelJS = require("exceljs");

recordsRouter.get("/", [authJwt.verifyToken], async (request, response) => {
  try {
    const records = await prisma.record.findMany({
      include: { worker: true },
    });
    response.status(200).json(records);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
});

recordsRouter.get(
  "/:date",
  [authJwt.verifyToken],
  async (request, response) => {
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
      response.status(500).json({ message: error.message });
    }
  }
);

recordsRouter.get(
  "/:id/:from/:to",
  [authJwt.verifyToken],
  async (request, response) => {
    try {
      const { id, from, to } = request.params;
      const fromDate = new Date(from).setHours(0, 0, 0);
      const toDate = new Date(to).setHours(23, 59, 59);

      const records = await prisma.worker.findFirst({
        where: { id: Number(id) },
        include: {
          records: {
            where: {
              arrival: {
                gte: new Date(fromDate),
                lte: new Date(toDate),
              },
            },
          },
        },
      });

      response.status(200).json(records);
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  }
);

recordsRouter.post(
  "/export",
  [authJwt.verifyToken],
  async (request, response) => {
    try {
      const { id, from, to } = request.body;
      const fromDate = new Date(from).setHours(0, 0, 0);
      const toDate = new Date(to).setHours(23, 59, 59);

      const records = await prisma.worker.findFirst({
        where: { id: Number(id) },
        include: {
          records: {
            where: {
              arrival: {
                gte: new Date(fromDate),
                lte: new Date(toDate),
              },
            },
          },
        },
      });

      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("Darbo valandos");
      worksheet.columns = [
        {
          header: "Data",
          key: "data",
          width: 20,
        },
        {
          header: "Pradzia",
          key: "pradzia",
          width: 20,
        },
        {
          header: "Pabaiga",
          key: "pabaiga",
          width: 20,
        },
        {
          header: "Isdirbta",
          key: "isdirbta",
          width: 20,
        },
      ];

      worksheet.insertRow(1, [
        `Darbuotojas: ${records.firstname} ${records.lastname}`,
      ]);
      worksheet.insertRow(2, [`Kennitala: ${records.kennitala}`]);
      worksheet.insertRow(3, [
        `Periodas: ${new Date(from).toISOString().slice(0, 10)} - ${new Date(to)
          .toISOString()
          .slice(0, 10)}`,
      ]);
      records.records.forEach((record) => {
        let arrivalTime;
        let departureTime;
        if (record.arrival) {
          arrivalTime =
            record.arrival.toLocaleString("en-US", {
              hour: "numeric",
              minute: "numeric",
              hour12: false,
            }) || "Nezymeta";
        }

        if (record.departure) {
          departureTime = record.departure.toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: false,
          });
        } else {
          departureTime = "Nezymeta";
        }
        const timeWorked = record.departure - record.arrival;

        worksheet.addRow({
          data: new Date(record.arrival).toISOString().slice(0, 10),
          pradzia: arrivalTime,
          pabaiga: departureTime,
          isdirbta: new Date(timeWorked).toISOString().slice(11, 16),
        });
      });

      const buffer = await workbook.csv.writeBuffer();
      response.send(buffer);
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  }
);

recordsRouter.post(
  "/exportDay",
  [authJwt.verifyToken],
  async (request, response) => {
    try {
      const { date } = request.body;
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

      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("Darbo valandos");
      const path = "./files";
      worksheet.columns = [
        {
          header: "Darbuotojas",
          key: "darbuotojas",
          width: 20,
        },
        { header: "Atvyko", key: "atvyko", width: 10 },
        ,
        { header: "Isvyko", key: "isvyko", width: 10 },
        { header: "Isdirbta", key: "isdirbta", width: 10 },
      ];

      worksheet.insertRow(1, [`Data: ${year}-${month}-${day}`]);

      records.forEach((record) => {
        const arrivalTime = record.arrival.toLocaleString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: false,
        });

        const departureTime = record.departure.toLocaleString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: false,
        });

        const timeWorked = record.departure - record.arrival;

        worksheet.addRow({
          darbuotojas: `${record.worker.firstname} ${record.worker.lastname}`,
          atvyko: arrivalTime,
          isvyko: departureTime,
          isdirbta: new Date(timeWorked).toISOString().slice(11, 16),
        });
      });

      const buffer = await workbook.csv.writeBuffer();
      response.send(buffer);
    } catch (error) {
      response.status(500).json({ error: error.message });
    }
  }
);

//TODO: add validation if departure is before arrival
recordsRouter.post("/", [authJwt.verifyToken], async (request, response) => {
  try {
    const { time, worker, type } = request.body;
    if (!time | !worker | !type) {
      return response.status(400).json({
        message: "Trūksta duomenų",
      });
    }

    if (type === "arrival") {
      //check if arrival exists for today
      const date = new Date(time);
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
        //update record
        const record = await prisma.record.update({
          where: {
            id: records[0].id,
          },
          data: {
            arrival: time,
          },
          include: { worker: true },
        });
        return response.status(200).json(record);
      } else {
        //create new record
        const record = await prisma.record.create({
          data: {
            arrival: time,
            workerId: worker,
          },
          include: { worker: true },
        });
        return response.status(201).json(record);
      }
    } else {
      //check if arrival exists for user for today
      const date = new Date(time);
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
        //check if departure is after arrival
        if (records[0].arrival < new Date(time)) {
          //update record
          const record = await prisma.record.update({
            where: {
              id: records[0].id,
            },
            data: {
              departure: time,
            },
            include: { worker: true },
          });
          return response.status(200).json(record);
        } else {
          return response.status(400).json({
            message: "Išvykimas negali būti anksčiau nei atvykimas",
          });
        }
      } else {
        return response.status(400).json({
          message: "Nepažymėtas atvykimas",
        });
      }
    }
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
});

module.exports = recordsRouter;
