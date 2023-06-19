const Sequelize = require('sequelize');
const db = require('../config/db');

const Product = db.define('products', {
  product: {
    type: Sequelize.DataTypes.STRING,
    unique: true,
    allowNull: false,
    primaryKey: true,
  },

  summary: {
    type: Sequelize.DataTypes.TEXT,
  },

  product_stock: {
    type: Sequelize.DataTypes.INTEGER,
    defaultValue: 0,
  },

  product_featured: {
    type: Sequelize.DataTypes.BOOLEAN,
    defaultValue: 0,
  },

  product_website: {
    type: Sequelize.DataTypes.STRING,
  },

  purchase_link: {
    type: Sequelize.DataTypes.STRING,
  },

  delete_product: {
    type: Sequelize.DataTypes.BOOLEAN,
    defaultValue: 0,
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

module.exports = Product;
