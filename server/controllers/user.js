const bcrypt = require("bcrypt");
const userRouter = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const authJwt = require("../middleware/authJwt");

userRouter.get(
  "/",
  [authJwt.verifyToken, authJwt.isAdmin],
  async (request, response) => {
    try {
      const users = await prisma.user.findMany();
      response.status(200).json(users);
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  }
);

userRouter.post(
  "/",
  [authJwt.verifyToken, authJwt.isAdmin],
  async (request, response) => {
    try {
      const { username, password, isadmin } = request.body;

      if (!username || !password) {
        return response.status(400).json({
          message: "Trūksta duomenų",
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
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  }
);

module.exports = userRouter;
