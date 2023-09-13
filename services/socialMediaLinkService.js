const socialMediaLinkModel = require('../models/socialMediaLinkModel');
const logger = require('../config/logger');

// Get all social media links associated with a specific account
const getSocialMediaLinkByEmail = async (account_email) => {
  const links = await socialMediaLinkModel.findAll({
    where: { account_email },
  }).catch((error) => {
    logger.error(error);
  });

  return links;
};

// Get a social media link associated with a specific URL
const getSocialMediaLinkByURL = async (url) => {
  const link = await socialMediaLinkModel.findAll({
    where: { url },
  }).catch((error) => {
    logger.error(error);
  });

  return link;
};

// Create a new social media link
const createSocialMediaLink = async (socialMediaLink) => {
  await socialMediaLinkModel.create(socialMediaLink).catch((error) => {
    logger.error(error);
  });

  return true;
};

// Update information for an existing social media link
const updateSocialMediaLink = async (socialMediaLink, account_email) => {
  await socialMediaLinkModel.update(socialMediaLink, { where: { account_email } }).catch((error) => {
    logger.error(error);
  });

  return true;
};

module.exports = {
  getSocialMediaLinkByEmail,
  getSocialMediaLinkByURL,
  createSocialMediaLink,
  updateSocialMediaLink
};
