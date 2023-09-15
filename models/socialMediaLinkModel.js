const Sequelize = require('sequelize');
const db = require('../config/db');

/*************************************************************************************************/
/* This model contains all of the `socialmedia_links` table fields and datatypes
/* Documentation: https://sequelize.org/docs/v6/core-concepts/model-basics/
/*************************************************************************************************/
const SocialMediaLink = db.define('socialmedia_links', {
  id: {
    type: Sequelize.DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
    allowNull: false,
  },

  url: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
  },

  creation_date: {
    type: Sequelize.DataTypes.DATE,
    defaultValue: Sequelize.DataTypes.NOW,
    allowNull: false,
  },

  updated_date: {
    type: Sequelize.DataTypes.DATE,
    defaultValue: Sequelize.DataTypes.NOW,
    allowNull: false,
  },

  account_email: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: false,
  underscored: true,
});

module.exports = SocialMediaLink;
