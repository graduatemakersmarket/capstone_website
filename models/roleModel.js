const Sequelize = require('sequelize');
const db = require('../config/db');

const Role = db.define('roles', {
  id: {
    type: Sequelize.DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  role: {
    type: Sequelize.DataTypes.STRING,
    defaultValue: 'maker',
  },

  issuer: {
    type: Sequelize.DataTypes.STRING,
    defaultValue: 'system',
  },

  creation_date: {
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

module.exports = Role;
