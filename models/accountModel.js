const Sequelize = require('sequelize');
const db = require('../config/db');

const Account = db.define('accounts', {
  email: {
    type: Sequelize.DataTypes.STRING,
    unique: true,
    allowNull: false,
    primaryKey: true,
  },

  password: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
  },

  first_name: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
  },

  last_name: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
  },

  biography: {
    type: Sequelize.DataTypes.TEXT,
  },

  avatar: {
    type: Sequelize.DataTypes.BLOB,
  },

  account_balance: {
    type: Sequelize.DataTypes.FLOAT,
    defaultValue: 0,
  },

  account_featured: {
    type: Sequelize.DataTypes.BOOLEAN,
    defaultValue: 0,
  },

  account_verified: {
    type: Sequelize.DataTypes.BOOLEAN,
    defaultValue: 0,
  },

  product_limit: {
    type: Sequelize.DataTypes.INTEGER,
    defaultValue: 50,
  },

  change_password: {
    type: Sequelize.DataTypes.BOOLEAN,
    defaultValue: 0,
  },

  delete_account: {
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
}, {
  timestamps: false,
  underscored: true,
});

module.exports = Account;
