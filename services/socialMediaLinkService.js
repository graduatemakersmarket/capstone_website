const socialMediaLinkModel = require('../models/socialMediaLinkModel');
const logger = require('../config/logger');

/*************************************************************************************************/
/* Get all social media links associated with a specific account
/*************************************************************************************************/
const getSocialMediaLinksByEmail = async (account_email) => {
  const links = await socialMediaLinkModel.findAll({
    where: { account_email },
  }).catch((error) => {
    logger.error(error);
  });

  return links;
};

/*************************************************************************************************/
/* Get a social media link associated with a specific URL
/*************************************************************************************************/
const getSocialMediaLinkByURL = async (url) => {
  const link = await socialMediaLinkModel.findOne({
    where: { url },
  }).catch((error) => {
    logger.error(error);
  });

  return link;
};

/*************************************************************************************************/
/* Get a social media link associated with a specific ID
/*************************************************************************************************/
const getSocialMediaLinkByID = async (id) => {
  const link = await socialMediaLinkModel.findOne({
    where: { id },
  }).catch((error) => {
    logger.error(error);
  });

  return link;
};

/*************************************************************************************************/
/* Insert a new social media link into the database
/*************************************************************************************************/
const createSocialMediaLink = async (socialMediaLink) => {
  await socialMediaLinkModel.create(socialMediaLink).catch((error) => {
    logger.error(error);
  });

  return true;
};

/*************************************************************************************************/
/* Update an existing social media link
/*************************************************************************************************/
const updateSocialMediaLink = async (socialMediaLink, id) => {
  await socialMediaLinkModel.update(socialMediaLink, { where: { id }}).catch((error) => {
    logger.error(error);
  });

  return true;
};

/*************************************************************************************************/
/* Delete a social media link
/*************************************************************************************************/
const deleteSocialMediaLink = async (id) => {
  await socialMediaLinkModel.destroy({ where: { id } }).catch((error) => {
    logger.error(error);
  });

  return true;
};

module.exports = {
  getSocialMediaLinksByEmail,
  getSocialMediaLinkByURL,
  getSocialMediaLinkByID,
  createSocialMediaLink,
  updateSocialMediaLink,
  deleteSocialMediaLink
};
