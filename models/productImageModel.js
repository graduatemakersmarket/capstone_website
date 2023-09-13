const Sequelize = require('sequelize');
const db = require('../config/db');

const ProductImage = db.define('product_images', {
  id: {
    type: Sequelize.DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
    allowNull: false,
  },

  image: {
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

  product_product: {
    type: Sequelize.DataTypes.STRING,
  },
}, {
  timestamps: false,
  underscored: true,
});

module.exports = ProductImage;
