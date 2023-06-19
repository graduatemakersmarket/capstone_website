const socialModel = require('../models/socialModel');
const logger = require('../config/logger');

const queryGetSocials = async (email) => {
  const socials = await socialModel.findAll({
    where: { account_email: email },
  }).catch((error) => {
    logger.error(error);
  });

  return socials;
};

const queryCreateSocial = async (social) => {
  await socialModel.create(social).catch((error) => {
    logger.error(error);
  });

  return true;
};

module.exports = {
  queryGetSocials,
  queryCreateSocial,
};
