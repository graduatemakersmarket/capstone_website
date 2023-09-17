const accountModel = require('../models/accountModel');
const logger = require('../config/logger');

/*************************************************************************************************/
/* Get all verified accounts
/*************************************************************************************************/
const getVerifiedAccounts = async (limit, offset) => {
  const accounts = await accountModel.findAll({
    where: { account_verified: 1 },
    limit,
    offset
  }).catch((error) => {
      logger.error(error);
    });

    return accounts;
};

/*************************************************************************************************/
/* Get all accounts
/*************************************************************************************************/
const getAccounts = async (limit, offset) => {
  const accounts = await accountModel.findAll({
    limit,
    offset
  }).catch((error) => {
      logger.error(error);
    });

    return accounts;
};

/*************************************************************************************************/
/* Get an account associated with a specific email
/*************************************************************************************************/
const getAccountByEmail = async (email) => {
  const account = await accountModel.findOne({
    where: { email },
  }).catch((error) => {
    logger.error(error);
  });

  return account;
};

/*************************************************************************************************/
/* Get an account associated with a specific ID
/*************************************************************************************************/
const getAccountByID = async (id) => {
  const account = await accountModel.findOne({
    where: { id },
  }).catch((error) => {
    logger.error(error);
  });

  return account;
};

/*************************************************************************************************/
/* Insert a new account into the database
/*************************************************************************************************/
const createAccount = async (account) => {
  await accountModel.create(account).catch((error) => {
    logger.error(error);
  });

  return true;
};

/*************************************************************************************************/
/* Update an existing account
/*************************************************************************************************/
const updateAccount = async (account, email) => {
  await accountModel.update(account, { where: { email } }).catch((error) => {
    logger.error(error);
  });

  return true;
};


/*************************************************************************************************/
/* Delete an account
/*************************************************************************************************/
const deleteAccount = async (email) => {
  await accountModel.destroy({ where: { email } }).catch((error) => {
    logger.error(error);
  });

  return true;
};

/*************************************************************************************************/
/* Count all verified accounts in the database
/*************************************************************************************************/
const countVerifiedAccounts = async () => {
  const count = await accountModel.count({where: {account_verified: 1}}).catch((error) => {
    logger.error(error);
  });

  return count;
};

/*************************************************************************************************/
/* Count all accounts in the database
/*************************************************************************************************/
const countAccounts = async () => {
  const count = await accountModel.count().catch((error) => {
    logger.error(error);
  });

  return count;
};

module.exports = {
  getVerifiedAccounts,
  getAccountByEmail,
  getAccountByID,
  getAccounts,
  createAccount,
  updateAccount,
  deleteAccount,
  countVerifiedAccounts,
  countAccounts
};
