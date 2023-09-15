const Sequelize = require('sequelize');
const db = require('../config/db');

/*************************************************************************************************/
/* This model contains all of the `product_images` table fields and datatypes
/* Documentation: https://sequelize.org/docs/v6/core-concepts/model-basics/
/*************************************************************************************************/
const ProductImage = db.define('product_images', {
  id: {
    type: Sequelize.DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
    allowNull: false
  },

  image: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false
  },

  creation_date: {
    type: Sequelize.DataTypes.DATE,
    defaultValue: Sequelize.DataTypes.NOW
  },

  updated_date: {
    type: Sequelize.DataTypes.DATE,
    defaultValue: Sequelize.DataTypes.NOW
  },

  product_product: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false
  },
}, {
  timestamps: false,
  underscored: true
});

module.exports = ProductImage;
