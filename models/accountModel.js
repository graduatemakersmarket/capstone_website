const Sequelize = require('sequelize');
const db = require('../config/db');

/*************************************************************************************************/
/* This model contains all of the `accounts` table fields and datatypes
/* Documentation: https://sequelize.org/docs/v6/core-concepts/model-basics/
/*************************************************************************************************/
const Account = db.define('accounts', {
  id: {
    type: Sequelize.DataTypes.INTEGER,
    autoIncrement: true,
    unique: true,
    allowNull: false
  },

  email: {
    type: Sequelize.DataTypes.STRING,
    unique: true,
    allowNull: false,
    primaryKey: true
  },

  password: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false
  },

  first_name: {
    type: Sequelize.DataTypes.STRING
  },

  last_name: {
    type: Sequelize.DataTypes.STRING
  },

  biography: {
    type: Sequelize.DataTypes.TEXT
  },

  video_link: {
    type: Sequelize.DataTypes.STRING
  },

  avatar: {
    type: Sequelize.DataTypes.STRING,
    defaultValue: '/images/avatar_images/default.png'
  },

  featured_background: {
    type: Sequelize.DataTypes.STRING,
    defaultValue: '/images/featured_images/default.png'
  },

  account_featured: {
    type: Sequelize.DataTypes.BOOLEAN,
    defaultValue: 0
  },

  account_verified: {
    type: Sequelize.DataTypes.BOOLEAN,
    defaultValue: 0
  },
  
  creation_date: {
    type: Sequelize.DataTypes.DATE,
    defaultValue: Sequelize.DataTypes.NOW
  },

  updated_date: {
    type: Sequelize.DataTypes.DATE,
    defaultValue: Sequelize.DataTypes.NOW
  },
}, {
  timestamps: false,
  underscored: true,
});

module.exports = Account;
