const Sequelize = require('sequelize');
const db = require('../config/db');

/*************************************************************************************************/
/* This model contains all of the `roles` table fields and datatypes
/* Documentation: https://sequelize.org/docs/v6/core-concepts/model-basics/
/*************************************************************************************************/
const Role = db.define('roles', {
  id: {
    type: Sequelize.DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
    allowNull: false
  },

  role: {
    type: Sequelize.DataTypes.STRING,
    defaultValue: 'maker'
  },

  issuer: {
    type: Sequelize.DataTypes.STRING,
    defaultValue: 'system'
  },

  creation_date: {
    type: Sequelize.DataTypes.DATE,
    defaultValue: Sequelize.DataTypes.NOW
  },

  account_email: {
    type: Sequelize.DataTypes.STRING
  },
}, {
  timestamps: false,
  underscored: true
});

module.exports = Role;
