const roleModel = require('../models/roleModel');
const logger = require('../config/logger');

/*************************************************************************************************/
/* Get all roles associated with a specific account
/*************************************************************************************************/
const getRolesByEmail = async (account_email) => {
  const roles = await roleModel.findAll({
    where: { account_email },
  }).catch((error) => {
    logger.error(error);
  });

  return roles;
};

/*************************************************************************************************/
/* Get a role associated with a specific name
/*************************************************************************************************/
const getRolesByName = async (role) => {
  const roles = await roleModel.findAll({
    where: { role },
  }).catch((error) => {
    logger.error(error);
  });

  return roles;
};

/*************************************************************************************************/
/* Get a role associated with a specific ID
/*************************************************************************************************/
const getRoleByID = async (id) => {
  const role = await roleModel.findOne({
    where: { id },
  }).catch((error) => {
    logger.error(error);
  });

  return role;
};

/*************************************************************************************************/
/* Insert a new role into the database
/*************************************************************************************************/
const createRole = async (role) => {
  await roleModel.create(role).catch((error) => {
    logger.error(error);
  });

  return true;
};

/*************************************************************************************************/
/* Update an existing role
/*************************************************************************************************/
const updateRole = async (role, id) => {
  await roleModel.update(role, { where: { id } }).catch((error) => {
    logger.error(error);
  });

  return true;
};

/*************************************************************************************************/
/* Delete a role
/*************************************************************************************************/
const deleteRole = async (id) => {
  await roleModel.destroy({ where: { id } }).catch((error) => {
    logger.error(error);
  });

  return true;
};

module.exports = {
  getRolesByEmail,
  getRolesByName,
  getRoleByID,
  createRole,
  updateRole,
  deleteRole
};
