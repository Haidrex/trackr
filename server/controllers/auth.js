const config = require("../config/auth.config");
const authRouter = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");

authRouter.post("/login", async (req, res) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        username: req.body.username,
      },
    });

    if (!user) {
      return res.status(404).send({ message: "Naudotojas nerastas" });
    }

    let passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Neteisingas slaptažodis",
      });
    }

    let token = jwt.sign({ id: user.id }, config.secret, {});

    res.status(200).send({
      id: user.id,
      username: user.username,
      isadmin: user.isadmin,
      accessToken: token,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

module.exports = authRouter;
