const Sequelize = require('sequelize');
const db = require('../config/db');

const Social = db.define('socials', {
  id: {
    type: Sequelize.DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  service: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
  },

  link: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
  },

  creation_date: {
    type: Sequelize.DataTypes.DATE,
    defaultValue: Sequelize.DataTypes.NOW,
  },

  updated_date: {
    type: Sequelize.DataTypes.DATE,
    defaultValue: Sequelize.DataTypes.NOW,
  },

  account_email: {
    type: Sequelize.DataTypes.STRING,
  },
}, {
  timestamps: false,
  underscored: true,
});

module.exports = Social;
