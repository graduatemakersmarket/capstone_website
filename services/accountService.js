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

const getAccountCount = async () => {
  const count = await accountModel.count().catch((error) => {
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

module.exports = {
  getAccountInfo,
  getAccountCount,
  createAccount,
  updateAccountAvatar,
  updateAccount,
};
