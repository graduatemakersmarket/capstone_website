const validator = require('express-validator');

/*************************************************************************************************/
/* Validate product creation form input
/*************************************************************************************************/
const createProduct = [
  validator.check('create-product-name')
    .escape()
    .trim()
    .notEmpty()
    .withMessage('The product name field is required')
    .isLength({ max: 254 })
    .withMessage('Your product name can not be longer than 254 characters'),

  validator.check('create-product-website')
    .escape()
    .trim()
    .notEmpty()
    .withMessage('The website field is required')
    .isLength({ max: 254 })
    .withMessage('Your website link can not be longer than 254 characters'),

    validator.check('create-product-purchase')
    .escape()
    .trim()
    .notEmpty()
    .withMessage('The purchase link field is required')
    .isLength({ max: 254 })
    .withMessage('Your purchase link can not be longer than 254 characters'),

  validator.check('create-product-summary')
    .escape()
    .trim()
    .notEmpty()
    .withMessage('The product description field is required')
    .isLength({ max: 1000 })
    .withMessage('Your product description can not be longer than 1000 characters'),

    validator.check('create-product-featured')
    .escape()
    .trim()
    .optional({checkFalsy: true})
];

module.exports = {
  createProduct,
};
