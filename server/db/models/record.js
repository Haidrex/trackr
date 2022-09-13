const Sequelize = require("sequelize");
const db = require("../db");

const Record = db.define(
  "record",
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      unique: true,
      autoIncrement: true,
    },
    time: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    worker_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    type: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  { timestamps: false, freezeTableName: true }
);

module.exports = Record;
