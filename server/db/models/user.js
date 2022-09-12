const Sequelize = require("sequelize");
const db = require("../db");

const User = db.define(
  "user",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
      allowNull: false,
    },

    username: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      get() {
        return () => this.getDataValue("password");
      },
    },
    isadmin: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
  },
  { timestamps: false, freezeTableName: true }
);

module.exports = User;
