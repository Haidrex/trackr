const Sequelize = require("sequelize");
const db = require("../db");
const Record = require("./record");

const Worker = db.define(
  "worker",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstname: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    lastname: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    kennitala: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

Worker.hasMany(Record);
Record.belongsTo(Worker);

module.exports = Worker;
