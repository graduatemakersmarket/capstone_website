const applicationService = require('../services/applicationService');
const validator = require('express-validator');

/*************************************************************************************************/
/* Public Database Methods
/*************************************************************************************************/
const getApplicationByEmail = async (email) => applicationService.getApplicationByEmail(email);

/*************************************************************************************************/
/* Insert a new application into the database
/*************************************************************************************************/
const createApplication = async (req, res) => {
  // Halt if there is a problem with validating the user input
  if (!validator.validationResult(req).isEmpty()) {
    return res.status(422).json({
      success: false,
      error: validator.validationResult(req).errors[0].msg,
    });
  }

  // Halt if an application already exists
  if (await applicationService.getApplicationByEmail(req.body['application-email'])) {
    return res.status(422).json({
        success: false,
        error: 'You have already submitted a GSMM vendor application',
      });
  }

  // Halt if domain does not contain @uark.edu
  if (!req.body['application-email'].includes('@uark.edu')) {
    return res.status(422).json({
        success: false,
        error: 'You must use an @uark.edu email address',
      });
  }

  // Create a new social media link object
  const application = {
    email: req.body['application-email'],
    firstname: req.body['application-firstname'],
    lastname: req.body['application-lastname'],
    university_id: req.body['application-UID'],
    program: req.body['application-program'],
    business: req.body['application-business'],
    summary: req.body['application-summary'],
    products: req.body['application-products'],
    signature: req.body['application-signature']
  }

  // Create the new social media link
  await applicationService.createApplication(application);

  return res.status(201).json({
    success: true,
    response: 'We have recieved your GSMM vendor application! We will reach out to you as soon as possible',
  });
}

module.exports = {
    createApplication,
    getApplicationByEmail
}