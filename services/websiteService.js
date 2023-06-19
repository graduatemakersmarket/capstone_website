const websiteModel = require('../models/websiteModel');
const logger = require('../config/logger');

const queryGetWebsites = async (email) => {
  const websites = await websiteModel.findAll({
    where: { account_email: email },
  }).catch((error) => {
    logger.error(error);
  });

  return websites;
};

const queryCreateWebsite = async (website) => {
  await websiteModel.create(website).catch((error) => {
    logger.error(error);
  });

  return true;
};

module.exports = {
  queryGetWebsites,
  queryCreateWebsite,
};