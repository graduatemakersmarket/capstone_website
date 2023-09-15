const validator = require('express-validator');

/*************************************************************************************************/
/* Validate registration form input
/*************************************************************************************************/
const registerAccount = [
  validator.check('register-email')
    .escape()
    .trim()
    .notEmpty()
    .withMessage('The email field is required')
    .normalizeEmail()
    .isEmail()
    .withMessage('You have entered an improperly formatted email address')
    .isLength({ max: 254 })
    .withMessage('Your email address is too long'),

  validator.check('register-firstname')
    .escape()
    .trim()
    .notEmpty()
    .withMessage('The first name field is required')
    .isLength({ max: 254 })
    .withMessage('Your first name is too long'),

  validator.check('register-lastname')
    .escape()
    .trim()
    .notEmpty()
    .withMessage('The last name field is required')
    .isLength({ max: 254 })
    .withMessage('Your last name is too long'),

  validator.check('register-password')
    .escape()
    .trim()
    .notEmpty()
    .withMessage('The password field is required')
    .isLength({ min: 8 })
    .withMessage('Your password can not be shorter than 8 characters')
    .isLength({ max: 60 })
    .withMessage('Your password can not be longer than 60 characters'),

  validator.check('register-password-confirm')
    .escape()
    .trim()
    .notEmpty()
    .withMessage('The password confirmation field is required')
    .isLength({ min: 8 })
    .withMessage('Your password can not be shorter than 8 characters')
    .isLength({ max: 60 })
    .withMessage('Your password can not be longer than 60 characters')
    .custom((pass, { req }) => (pass === req.body['register-password'])) // Make sure both passwords match
    .withMessage('Your password and password confirmation do not match'),
];

/*************************************************************************************************/
/* Validate login form input
/*************************************************************************************************/
const loginAccount = [
  validator.check('login-email')
    .escape()
    .trim()
    .notEmpty()
    .withMessage('The email field is required')
    .normalizeEmail()
    .isEmail()
    .withMessage('You have entered an improperly formatted email address')
    .isLength({ max: 254 })
    .withMessage('Your email address is too long'),

  validator.check('login-password')
    .escape()
    .trim()
    .notEmpty()
    .withMessage('The password field is required')
    .isLength({ min: 8 })
    .withMessage('Your password can not be shorter than 8 characters')
    .isLength({ max: 60 })
    .withMessage('Your password can not be longer than 60 characters'),
];

/*************************************************************************************************/
/* Validate account update form input
/*************************************************************************************************/
const updateAccount = [
  validator.check('update-firstname')
    .escape()
    .trim()
    .optional({checkFalsy: true})
    .isLength({ max: 254 })
    .withMessage('Your first name is too long'),

  validator.check('update-lastname')
    .escape()
    .trim()
    .optional({checkFalsy: true})
    .isLength({ max: 254 })
    .withMessage('Your last name is too long'),

  validator.check('update-video')
    .escape()
    .trim()
    .optional({checkFalsy: true})
    .isLength({ min: 11, max: 11 })
    .withMessage('You have entered an improperly formatted video code'),
  
  validator.check('update-biography')
    .escape()
    .trim()
    .optional({checkFalsy: true})
    .isLength({ max: 1000 })
    .withMessage('Your about section can not be longer than 1000 characters'),
];

/*************************************************************************************************/
/* Validate social media link creation input
/*************************************************************************************************/
const createSocialMediaLink = [
  validator.check('social-media-link')
    .escape()
    .trim()
    .notEmpty()
    .withMessage('The link field is required')
    .isLength({ max: 254 })
    .withMessage('Links can not be longer than 254 characters'),
];

module.exports = {
  registerAccount,
  loginAccount,
  updateAccount,
  createSocialMediaLink,
};
