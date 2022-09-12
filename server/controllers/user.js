const bcrypt = require("bcrypt");
const userRouter = require("express").Router();
const { User } = require("../db/models");

userRouter.get("/", async (request, response) => {
  const users = await User.findAll();

  response.status(200).json(users);
});

userRouter.post("/", async (request, response) => {
  const { username, password, isadmin } = request.body;

  if (!username || !password) {
    return response.status(400).json({
      error: "username or password not provided",
    });
  }

  const saltrounds = 10;
  const passwordHash = await bcrypt.hash(password, saltrounds);

  const user = await User.create({
    username,
    password: passwordHash,
    isadmin,
  });

  response.status(201).json(user);
});

module.exports = userRouter;
