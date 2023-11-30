const socialMediaLinkService = require('../services/socialMediaLinkService');
const accountController = require('../controllers/accountController');
const validator = require('express-validator');

/*************************************************************************************************/
/* Public Database Methods
/*************************************************************************************************/
const getLinksByEmail = async (account_email) => socialMediaLinkService.getSocialMediaLinksByEmail(account_email);
const getLinksByURL = async (url) => socialMediaLinkService.getSocialMediaLinkByURL(url);

/*************************************************************************************************/
/* Insert a new social media link into the database
/*************************************************************************************************/
const createLink = async (req, res) => {
  // Only allow users with a valid session to access this endpoint
  if (!req.cookies.makerSession && !req.headers.authorization) {
    return res.status(403).json({
      success: false,
      error: 'You are not authorized to use this endpoint',
    });
  }

  // Halt if there is a problem with validating the user input
  if (!validator.validationResult(req).isEmpty()) {
    return res.status(422).json({
      success: false,
      error: validator.validationResult(req).errors[0].msg,
    });
  }

  // Halt if the provided link is already being used
  if (await socialMediaLinkService.getSocialMediaLinkByURL(req.body['social-media-link'])) {
    return res.status(422).json({
        success: false,
        error: 'The provided link is already being used',
      });
  }

  // Create a new social media link object
  const socialMediaLink = {
    url: req.body['social-media-link'],
    account_email: req.session.email
  }

  // Create the new social media link
  await socialMediaLinkService.createSocialMediaLink(socialMediaLink);

  return res.status(201).json({
    success: true,
    link: req.body['social-media-link'],
    id: (await socialMediaLinkService.getSocialMediaLinkByURL(req.body['social-media-link'])).id
  });
}

/*************************************************************************************************/
/* Insert a new social media link into the database
/*************************************************************************************************/
const createUserLink = async (req, res) => {
  // Only allow users with a valid session to access this endpoint
  if (!req.cookies.makerSession && !req.headers.authorization) {
    return res.status(403).json({
      success: false,
      error: 'You are not authorized to use this endpoint',
    });
  }

  // Halt if there is a problem with validating the user input
  if (!validator.validationResult(req).isEmpty()) {
    return res.status(422).json({
      success: false,
      error: validator.validationResult(req).errors[0].msg,
    });
  }

  // Halt if the provided link is already being used
  if (await socialMediaLinkService.getSocialMediaLinkByURL(req.body['social-media-link'])) {
    return res.status(422).json({
        success: false,
        error: 'The provided link is already being used',
      });
  }

  // Get account information by ID
  const accountInfo = await accountController.getAccountByID(req.body['account-id']);

  // Create a new social media link object
  const socialMediaLink = {
    url: req.body['social-media-link'],
    account_email: accountInfo.email,
  }

  // Create the new social media link
  await socialMediaLinkService.createSocialMediaLink(socialMediaLink);

  return res.status(201).json({
    success: true,
    link: req.body['social-media-link'],
    id: (await socialMediaLinkService.getSocialMediaLinkByURL(req.body['social-media-link'])).id
  });
}

/*************************************************************************************************/
/* Delete an existing social media link from the database
/*************************************************************************************************/
const deleteLink = async (req, res) => {
  // Only allow users with a valid session to access this endpoint
  if (!req.cookies.makerSession && !req.headers.authorization) {
    return res.status(403).json({
      success: false,
      error: 'You are not authorized to use this endpoint',
    });
  }

  // Halt if the account does not exist
  if (!(await socialMediaLinkService.getSocialMediaLinkByID(req.body['id']))) {
    return res.status(422).json({
      success: false,
      error: 'The link you tried to delete does not exist',
    });
  }

  // Halt if the person requesting is not the link owner
  if ((await socialMediaLinkService.getSocialMediaLinkByID(req.body['id'])).account_email != req.session.email  && !req.session.roles.includes("admin")) {
    return res.status(403).json({
      success: false,
      error: 'You are not authorized to delete the provided link',
    });
  }

  // Delete social media link
  await socialMediaLinkService.deleteSocialMediaLink(req.body['id']);

  return res.status(200).json({
    success: true,
    response: 'Link was successfully deleted',
  });
}

module.exports = {
    getLinksByEmail,
    getLinksByURL,
    createLink,
    createUserLink,
    deleteLink
}