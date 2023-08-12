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

  video_link: {
    type: Sequelize.DataTypes.STRING,
  },

  avatar: {
    type: Sequelize.DataTypes.BLOB('long'),
  },

  facebook: {
    type: Sequelize.DataTypes.STRING,
  },

  twitter: {
    type: Sequelize.DataTypes.STRING,
  },

  instagram: {
    type: Sequelize.DataTypes.STRING,
  },

  reddit: {
    type: Sequelize.DataTypes.STRING,
  },

  youtube: {
    type: Sequelize.DataTypes.STRING,
  },

  tiktok: {
    type: Sequelize.DataTypes.STRING,
  },

  pinterest: {
    type: Sequelize.DataTypes.STRING,
  },

  twitch: {
    type: Sequelize.DataTypes.STRING,
  },

  linkedin: {
    type: Sequelize.DataTypes.STRING,
  },

  website: {
    type: Sequelize.DataTypes.STRING,
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
