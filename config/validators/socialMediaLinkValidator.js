const validator = require('express-validator');

const checkSocialMediaLink = [
  validator.check('social-media-link')
    .escape()
    .trim()
    .notEmpty()
    .withMessage('The link field is required')
    .isLength({ max: 254 })
    .withMessage('The provided link is larger than 255 characters'),
];

module.exports = {
    checkSocialMediaLink
};
