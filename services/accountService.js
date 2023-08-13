const accountModel = require('../models/accountModel');
const logger = require('../config/logger');

const getAccountInfo = async (email) => {
  const account = await accountModel.findOne({
    where: { email },
  }).catch((error) => {
    logger.error(error);
  });

  return account;
};

const getVerifiedAccountCount = async () => {
  const count = await accountModel.count({where: {account_verified: 1}}).catch((error) => {
    logger.error(error);
  });

  return count;
};

const createAccount = async (account) => {
  await accountModel.create(account).catch((error) => {
    logger.error(error);
  });

  return true;
};

const updateAccountAvatar = async (avatar, email) => {
  await accountModel.update({ avatar }, { where: { email } }).catch((error) => {
    logger.error(error);
  });

  return true;
};

const updateAccount = async (account, email) => {
  await accountModel.update(account, { where: { email } }).catch((error) => {
    logger.error(error);
  });

  return true;
};

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

module.exports = {
  getAccountInfo,
  getVerifiedAccountCount,
  createAccount,
  updateAccountAvatar,
  updateAccount,
  getVerifiedAccounts,
};
