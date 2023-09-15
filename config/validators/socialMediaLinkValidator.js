const validator = require('express-validator');

/*************************************************************************************************/
/* Validate social media link
/*************************************************************************************************/
const checkSocialMediaLink = [
  validator.check('social-media-link')
    .escape()
    .trim()
    .notEmpty()
    .withMessage('The link field is required')
    .isLength({ max: 254 })
    .withMessage('The provided link is larger than 254 characters'),
];

/*************************************************************************************************/
/* Validate social media link ID
/*************************************************************************************************/
const checkSocialMediaLinkID = [
  validator.check('id')
    .escape()
    .trim()
    .notEmpty()
    .withMessage('You must provide a link id')
];

module.exports = {
    checkSocialMediaLink,
    checkSocialMediaLinkID
};
