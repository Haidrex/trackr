const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!",
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!",
      });
    }
    req.userId = decoded.id;
    next();
  });
};

isAdmin = (req, res, next) => {
  prisma.user.findFirst({ where: { id: req.userId } }).then((user) => {
    if (user.isadmin === true) {
      next();
      return;
    }

    res.status(403).send({
      message: "Require Admin Role!",
    });
    return;
  });
};

isWorker = (req, res, next) => {
  prisma.user.findFirst({ where: { id: req.userId } }).then((user) => {
    if (user.isAdmin === false) {
      next();
      return;
    }

    res.status(403).send({
      message: "Require Worker Role!",
    });
  });
};

const authJwt = {
  verifyToken,
  isAdmin,
  isWorker,
};
module.exports = authJwt;
