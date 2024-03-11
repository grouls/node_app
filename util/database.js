const Sequelize = require("sequelize");

const sequelize = new Sequelize("node_complete", "root", "Windy!Day2", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
