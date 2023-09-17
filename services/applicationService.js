const applicationModel = require('../models/applicationModel');
const logger = require('../config/logger');

/*************************************************************************************************/
/* Get a GSMM application by email address
/*************************************************************************************************/
const getApplicationByEmail = async (email) => {
  const application = await applicationModel.findOne({
    where: { email },
  }).catch((error) => {
    logger.error(error);
  });

  return application;
};

/*************************************************************************************************/
/* Get GSMM applications by status
/*************************************************************************************************/
const getApplicationByStatus = async (status) => {
  const application = await applicationModel.findOne({
    where: { status },
  }).catch((error) => {
    logger.error(error);
  });

  return application;
};

/*************************************************************************************************/
/* Get GSMM application by ID
/*************************************************************************************************/
const getApplicationByID = async (id) => {
  const application = await applicationModel.findOne({
    where: { id },
  }).catch((error) => {
    logger.error(error);
  });

  return application;
};

/*************************************************************************************************/
/* Insert a new GSMM application into the database
/*************************************************************************************************/
const createApplication = async (application) => {
  await applicationModel.create(application).catch((error) => {
    logger.error(error);
  });

  return true;
};

/*************************************************************************************************/
/* Update an existing GSMM application
/*************************************************************************************************/
const updateApplication = async (application, id) => {
  await applicationModel.update(application, { where: { id }}).catch((error) => {
    logger.error(error);
  });

  return true;
};

/*************************************************************************************************/
/* Delete a GSMM application
/*************************************************************************************************/
const deleteApplication = async (id) => {
  await applicationModel.destroy({ where: { id } }).catch((error) => {
    logger.error(error);
  });

  return true;
};

module.exports = {
  getApplicationByEmail,
  getApplicationByStatus,
  getApplicationByID,
  createApplication,
  updateApplication,
  deleteApplication
};
