const socialMediaLinkService = require('../services/socialMediaLinkService');
const roleService = require('../services/roleService');
const validator = require('express-validator');

const getLinksByEmail = async (account_email) => socialMediaLinkService.getSocialMediaLinkByEmail(account_email);
const getLinksByURL = async (url) => socialMediaLinkService.getSocialMediaLinkByURL(url);

const createLink = async (req, res) => {
  // Only allow users with a valid session to access this endpoint
  if (!req.cookies.makerSession && !req.headers.authorization) {
    return res.status(403).json({
      success: false,
      error: 'You are not authorized to use this endpoint',
    });
  }

  // Check if the requesting user has a verified role (TODO: MAKE THIS USE THE CONTROLLER)
  if (!(await roleService.getRoles(req.session.makerEmail)).map((role) => role.role).includes('verified')) {
    return res.status(403).json({
      success: false,
      error: 'Only verified accounts may add new social media links',
    });
  }

  // Halt if there is a problem with validating the user input
  if (!validator.validationResult(req).isEmpty()) {
    return res.status(422).json({
      success: false,
      error: validator.validationResult(req).errors[0].msg,
    });
  }

  // Check if the provided link already exists
  if ((await socialMediaLinkService.getSocialMediaLinkByURL(req.body['social-media-link'])).length > 0 ) {
    return res.status(422).json({
        success: false,
        error: 'The provided link is already being used',
      });
  }

  // Create a new social media link object
  const socialMediaLink = {
    url: req.body['social-media-link'],
    account_email: req.session.makerEmail
  }

  // Create the new social media link
  await socialMediaLinkService.createSocialMediaLink(socialMediaLink);

  return res.status(200).json({
    success: true,
    link: req.body['social-media-link'],
    id: (await socialMediaLinkService.getSocialMediaLinkByURL(req.body['social-media-link']))[0].id
  });
}

const updateLink = async (req, res) => {
    // Only allow users with a valid session to access this endpoint
    if (!req.cookies.makerSession && !req.headers.authorization) {
      return res.status(403).json({
        success: false,
        error: 'You are not authorized to use this endpoint',
      });
    }
  
    // Check if the requesting user has a verified role
    if (!(await roleService.getRoles(req.session.makerEmail)).includes('verified')) {
      return res.status(403).json({
        success: false,
        error: 'Only verified accounts may add new social media links',
      });
    }
  
    // Halt if there is a problem with validating the user input
    if (!validator.validationResult(req).isEmpty()) {
      return res.status(422).json({
        success: false,
        error: validator.validationResult(req).errors[0].msg,
      });
    }

    //TODO: Add logic here
  }

  const deleteLink = async (req, res) => {
    // Only allow users with a valid session to access this endpoint
    if (!req.cookies.makerSession && !req.headers.authorization) {
      return res.status(403).json({
        success: false,
        error: 'You are not authorized to use this endpoint',
      });
    }

    // Verify the requesting user is the link owner
    if ((await socialMediaLinkService.getSocialMediaLinkByID(req.body['linkID']))[0].account_email != req.session.makerEmail) {
      return res.status(403).json({
        success: false,
        error: 'You may not delete links you do not own',
      });
    }


    //TODO: DELETE THE LINK FROM DATABASE

    console.log(req.body['linkID'])

    return res.status(200).json({
      success: true,
      response: 'Deleted link',
    });
  }

module.exports = {
    getLinksByEmail,
    getLinksByURL,
    createLink,
    updateLink,
    deleteLink
}