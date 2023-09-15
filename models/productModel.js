const Sequelize = require('sequelize');
const db = require('../config/db');

/*************************************************************************************************/
/* This model contains all of the `products` table fields and datatypes
/* Documentation: https://sequelize.org/docs/v6/core-concepts/model-basics/
/*************************************************************************************************/
const Product = db.define('products', {
  id: {
    type: Sequelize.DataTypes.INTEGER,
    autoIncrement: true,
    unique: true,
    allowNull: false
  },

  product: {
    type: Sequelize.DataTypes.STRING,
    unique: true,
    allowNull: false,
    primaryKey: true
  },

  summary: {
    type: Sequelize.DataTypes.TEXT
  },

  product_featured: {
    type: Sequelize.DataTypes.BOOLEAN,
    defaultValue: 0,
  },

  product_website: {
    type: Sequelize.DataTypes.STRING
  },

  purchase_link: {
    type: Sequelize.DataTypes.STRING
  },

  creation_date: {
    type: Sequelize.DataTypes.DATE,
    defaultValue: Sequelize.DataTypes.NOW
  },

  updated_date: {
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

module.exports = Product;
