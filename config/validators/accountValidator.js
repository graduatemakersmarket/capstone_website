const validator = require('express-validator');

const createAccount = [
  validator.check('create-email')
    .escape()
    .trim()
    .notEmpty()
    .withMessage('Please provide a valid email address')
    .normalizeEmail()
    .isEmail()
    .withMessage('Please provide a valid email address')
    .isLength({ max: 254 })
    .withMessage('Please provide a valid email address'),

  validator.check('create-password')
    .escape()
    .trim()
    .notEmpty()
    .withMessage('Please provide a password')
    .isLength({ min: 8 })
    .withMessage('Passwords must be at least 8 characters')
    .isLength({ max: 60 })
    .withMessage('Passwords may not exceed 60 characters'),

  validator.check('create-password-confirm')
    .escape()
    .trim()
    .notEmpty()
    .withMessage('Please provide a password')
    .isLength({ min: 8 })
    .withMessage('Passwords must be at least 8 characters')
    .isLength({ max: 60 })
    .withMessage('Passwords may not exceed 60 characters')
    .custom((pass, { req }) => (pass === req.body['create-password']))
    .withMessage('Your password and password confirmation do not match'),
];

const loginAccount = [
  validator.check('login-email')
    .escape()
    .trim()
    .notEmpty()
    .withMessage('Please provide a valid email address')
    .normalizeEmail()
    .isEmail()
    .withMessage('Please provide a valid email address')
    .isLength({ max: 254 })
    .withMessage('Please provide a valid email address'),

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
    .isLength({ max: 40 })
    .withMessage('Your first name exceeds (40) characters'),

  validator.check('update-lastname')
    .escape()
    .trim()
    .optional({checkFalsy: true})
    .isLength({ max: 40 })
    .withMessage('Your last name exceeds (40) characters'),

  validator.check('update-biography')
    .escape()
    .trim()
    .optional({checkFalsy: true})
    .isLength({ max: 500 })
    .withMessage('Your biography exceeds (500) characters'),
];

module.exports = {
  createAccount,
  loginAccount,
  updateAccount,
};
