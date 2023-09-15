const Sequelize = require('sequelize');
const db = require('../config/db');

/*************************************************************************************************/
/* This model contains all of the `gsmm_applications` table fields and datatypes
/* Documentation: https://sequelize.org/docs/v6/core-concepts/model-basics/
/*************************************************************************************************/
const Applications = db.define('gsmm_applications', {
  id: {
    type: Sequelize.DataTypes.INTEGER,
    autoIncrement: true,
    unique: true,
    allowNull: false
  },

  email: {
    type: Sequelize.DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
    unique: true
  },

  firstname: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false
  },

  lastname: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false
  },

  university_id: {
    type: Sequelize.DataTypes.INTEGER,
    allowNull: false
  },

  program: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false
  },

  summary: {
    type: Sequelize.DataTypes.TEXT,
    allowNull: false
  },

  products: {
    type: Sequelize.DataTypes.TEXT,
    allowNull: false
  },

  signature: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false
  },

  creation_date: {
    type: Sequelize.DataTypes.DATE,
    defaultValue: Sequelize.DataTypes.NOW,
    allowNull: false
  },

  updated_date: {
    type: Sequelize.DataTypes.DATE,
    defaultValue: Sequelize.DataTypes.NOW,
    allowNull: false
  },

}, {
  timestamps: false,
  underscored: true,
});

module.exports = Applications;
