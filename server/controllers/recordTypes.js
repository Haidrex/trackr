const authJwt = require('../middleware/authJwt');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const recordTypesRouter = require('express').Router();

recordTypesRouter.get('/', [authJwt.verifyToken], async (request, response) => {
	try {
		const recordTypes = await prisma.recordType.findMany();
		response.status(200).json(recordTypes);
	} catch (error) {
		response.status(500).json({
			error: error.message,
		});
	}
});

recordTypesRouter.post(
	'/',
	[authJwt.verifyToken],
	async (request, response) => {
		try {
			const { name } = request.body;
			if (!name) {
				return response.status(400).json({
					error: 'Missing name',
				});
			}
			const recordType = await prisma.recordType.create({
				data: {
					name,
				},
			});

			response.status(200).json(recordType);
		} catch (error) {
			response.status(500).json({
				error: error.message,
			});
		}
	}
);

module.exports = recordTypesRouter;
