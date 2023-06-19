const accountModel = require('../models/accountModel');
const logger = require('../config/logger');

const queryGetAccount = async (email) => {
  const account = await accountModel.findOne({
    where: { email },
  }).catch((error) => {
    logger.error(error);
  });

  return account;
};

const queryCountAccounts = async () => {
  const count = await accountModel.count().catch((error) => {
    logger.error(error);
  });

  return count;
};

const queryCreateAccount = async (account) => {
  await accountModel.create(account).catch((error) => {
    logger.error(error);
  });

  return true;
};

const queryUpdateVerification = async (email) => {
  await accountModel.update({ account_verified: 1 }, { where: { email } }).catch((error) => {
    logger.error(error);
  });
};

const queryUpdatePassword = async (email, password) => {
  await accountModel.update({ password }, { where: { email } }).catch((error) => {
    logger.error(error);
  });
};

const queryUpdateChangePassword = async (email) => {
  await accountModel.update({ change_password: 0 }, { where: { email } }).catch((error) => {
    logger.error(error);
  });
};

module.exports = {
  queryGetAccount,
  queryCountAccounts,
  queryCreateAccount,
  queryUpdateVerification,
  queryUpdatePassword,
  queryUpdateChangePassword,
};
