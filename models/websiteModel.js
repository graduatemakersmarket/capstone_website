const Sequelize = require('sequelize');
const db = require('../config/db');

const Website = db.define('websites', {
  id: {
    type: Sequelize.DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  website: {
    type: Sequelize.DataTypes.TEXT,
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

module.exports = Website;
