const authJwt = require('../middleware/authJwt');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const recordsRouter = require('express').Router();

recordsRouter.get('/', [authJwt.verifyToken], async (request, response) => {
	try {
		const records = await prisma.record.findMany();
		response.status(200).json(records);
	} catch (error) {
		response.status(500).json({ error: error.message });
	}
});

recordsRouter.post('/', [authJwt.verifyToken], async (request, response) => {
	try {
		const { time, worker, type } = request.body;

		if (!time | !worker | !type) {
			return response.status(400).json({
				error: 'Missing data',
			});
		}

		const record = await prisma.record.create({
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
