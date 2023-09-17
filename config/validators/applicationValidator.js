const validator = require('express-validator');
const { INTEGER } = require('sequelize');

/*************************************************************************************************/
/* Validate application form input
/*************************************************************************************************/
const createApplication = [
  validator.check('application-email')
    .escape()
    .trim()
    .notEmpty()
    .withMessage('The email field is required')
    .normalizeEmail()
    .isEmail()
    .withMessage('You have entered an improperly formatted email address')
    .isLength({ max: 254 })
    .withMessage('Your email address is too long'),

  validator.check('application-firstname')
    .escape()
    .trim()
    .notEmpty()
    .withMessage('The first name field is required')
    .isLength({ max: 254 })
    .withMessage('Your first name is too long'),

  validator.check('application-lastname')
    .escape()
    .trim()
    .notEmpty()
    .withMessage('The last name field is required')
    .isLength({ max: 254 })
    .withMessage('Your last name is too long'),

validator.check('application-UID')
    .escape()
    .trim()
    .notEmpty()
    .withMessage('The University ID field is required')
    .isLength({ max: 254 })
    .withMessage('Your University ID is too long'),

validator.check('application-program')
    .escape()
    .trim()
    .notEmpty()
    .withMessage('The program of study field is required')
    .isLength({ max: 254 })
    .withMessage('Your program of study is too long'),

validator.check('application-business')
    .escape()
    .trim()
    .optional({checkFalsy: true})
    .isLength({ max: 254 })
    .withMessage('Your business name is too long'),

validator.check('application-summary')
    .escape()
    .trim()
    .optional({checkFalsy: true})
    .isLength({ max: 65534 })
    .withMessage('Your performance summary is too long'),

validator.check('application-products')
    .escape()
    .trim()
    .optional({checkFalsy: true})
    .isLength({ max: 65534 })
    .withMessage('Your product listing is too long'),

validator.check('application-signature')
    .escape()
    .trim()
    .notEmpty()
    .withMessage('The signature field is required')
    .isLength({ max: 254 })
    .withMessage('Your signature is too long'),
];

module.exports = {
  createApplication
};
