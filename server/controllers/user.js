const bcrypt = require('bcrypt');
const userRouter = require('express').Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

userRouter.get('/', async (request, response) => {
	const users = await prisma.user.findMany();

	response.status(200).json(users);
});

userRouter.post('/', async (request, response) => {
	const { username, password, isadmin } = request.body;

	if (!username || !password) {
		return response.status(400).json({
			error: 'username or password not provided',
		});
	}

	const saltrounds = 10;
	const passwordHash = await bcrypt.hash(password, saltrounds);

	const user = await prisma.user.create({
		data: {
			username,
			password: passwordHash,
			isadmin,
		},
	});

	response.status(201).json(user);
});

module.exports = userRouter;
