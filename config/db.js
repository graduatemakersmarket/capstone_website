const sequelize = require('sequelize');

const db = new sequelize.Sequelize(
  {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: process.env.DB_TYPE,
    timezone: '-06:00',
    logging: false,
  },
);

module.exports = db;
