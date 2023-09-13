const validator = require('express-validator');

const registerAccount = [
  validator.check('register-email')
    .escape()
    .trim()
    .notEmpty()
    .withMessage('Please provide a valid email address')
    .normalizeEmail()
    .isEmail()
    .withMessage('Please provide a valid email address')
    .isLength({ max: 254 })
    .withMessage('Please provide a valid email address'),

  validator.check('register-firstname')
    .escape()
    .trim()
    .notEmpty()
    .withMessage('Please provide your first name')
    .isLength({ max: 254 })
    .withMessage('Your first name may not exceed (254) characters'),

  validator.check('register-lastname')
    .escape()
    .trim()
    .notEmpty()
    .withMessage('Please provide your last name')
    .isLength({ max: 254 })
    .withMessage('Your last name may not exceed (254) characters'),

  validator.check('register-password')
    .escape()
    .trim()
    .notEmpty()
    .withMessage('Please provide a password')
    .isLength({ min: 8 })
    .withMessage('Passwords must be at least 8 characters')
    .isLength({ max: 60 })
    .withMessage('Passwords may not exceed 60 characters'),

  validator.check('register-password-confirm')
    .escape()
    .trim()
    .notEmpty()
    .withMessage('Please provide a password')
    .isLength({ min: 8 })
    .withMessage('Passwords must be at least 8 characters')
    .isLength({ max: 60 })
    .withMessage('Passwords may not exceed 60 characters')
    .custom((pass, { req }) => (pass === req.body['register-password']))
    .withMessage('Your password and password confirmation do not match'),
];

const loginAccount = [
  validator.check('login-email')
    .escape()
    .trim()
    .notEmpty()
    .withMessage('Please provide a valid email address!')
    .normalizeEmail()
    .isEmail()
    .withMessage('Please provide a valid email address!!')
    .isLength({ max: 254 })
    .withMessage('Please provide a valid email address!!!'),

  validator.check('login-password')
    .escape()
    .trim()
    .notEmpty()
    .withMessage('Please provide a password')
    .isLength({ min: 8 })
    .withMessage('Passwords must be at least 8 characters')
    .isLength({ max: 60 })
    .withMessage('Passwords may not exceed 60 characters'),
];

const updateAccount = [
  validator.check('update-firstname')
    .escape()
    .trim()
    .optional({checkFalsy: true})
    .isLength({ max: 254 })
    .withMessage('Your first name may not exceed (254) characters'),

  validator.check('update-lastname')
    .escape()
    .trim()
    .optional({checkFalsy: true})
    .isLength({ max: 254 })
    .withMessage('Your last name may not exceed (254) characters'),

  validator.check('update-video')
    .escape()
    .trim()
    .optional({checkFalsy: true})
    .isLength({ min: 11, max: 11 })
    .withMessage('Your introduction code is invalid'),
  
  validator.check('update-biography')
    .escape()
    .trim()
    .optional({checkFalsy: true})
    .isLength({ max: 1000 })
    .withMessage('Your biography may not exceed (1000) characters'),
];

const createSocialMediaLink = [
  validator.check('social-media-link')
    .escape()
    .trim()
    .notEmpty()
    .withMessage('The link field is required')
    .isLength({ max: 254 })
    .withMessage('The provided link is larger than 255 characters'),
];

module.exports = {
  registerAccount,
  loginAccount,
  updateAccount,
  createSocialMediaLink,
};
