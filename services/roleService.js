const roleModel = require('../models/roleModel');
const logger = require('../config/logger');

const queryGetRoles = async (email) => {
  const roles = await roleModel.findAll({
    where: { account_email: email },
  }).catch((error) => {
    logger.error(error);
  });

  return roles;
};

const queryCreateRole = async (role) => {
  await roleModel.create(role).catch((error) => {
    logger.error(error);
  });

  return true;
};

module.exports = {
  queryGetRoles,
  queryCreateRole,
};
