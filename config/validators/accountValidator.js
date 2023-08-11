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

  validator.check('update-biography')
    .escape()
    .trim()
    .optional({checkFalsy: true})
    .isLength({ max: 1000 })
    .withMessage('Your biography may not exceed (1000) characters'),
];

const updateSocials = [
  validator.check('update-facebook')
    .escape()
    .trim()
    .optional({checkFalsy: true})
    .isLength({ max: 254 })
    .withMessage('Your Facebook link exceeds (254) characters'),

  validator.check('update-twitter')
    .escape()
    .trim()
    .optional({checkFalsy: true})
    .isLength({ max: 254 })
    .withMessage('Your Twitter link exceeds (254) characters'),

  validator.check('update-instagram')
    .escape()
    .trim()
    .optional({checkFalsy: true})
    .isLength({ max: 254 })
    .withMessage('Your Instagram link exceeds (254) characters'),

  validator.check('update-reddit')
    .escape()
    .trim()
    .optional({checkFalsy: true})
    .isLength({ max: 254 })
    .withMessage('Your Reddit link exceeds (254) characters'),
  
  validator.check('update-youtube')
    .escape()
    .trim()
    .optional({checkFalsy: true})
    .isLength({ max: 254 })
    .withMessage('Your YouTube link exceeds (254) characters'),

  validator.check('update-tiktok')
    .escape()
    .trim()
    .optional({checkFalsy: true})
    .isLength({ max: 254 })
    .withMessage('Your TikTok link exceeds (254) characters'),

  validator.check('update-pinterest')
    .escape()
    .trim()
    .optional({checkFalsy: true})
    .isLength({ max: 254 })
    .withMessage('Your Pinterest link exceeds (254) characters'),

  validator.check('update-twitch')
    .escape()
    .trim()
    .optional({checkFalsy: true})
    .isLength({ max: 254 })
    .withMessage('Your Twitch link exceeds (254) characters'),

  validator.check('update-kick')
    .escape()
    .trim()
    .optional({checkFalsy: true})
    .isLength({ max: 254 })
    .withMessage('Your Kick link exceeds (254) characters'),

  validator.check('update-website')
    .escape()
    .trim()
    .optional({checkFalsy: true})
    .isLength({ max: 254 })
    .withMessage('Your website link exceeds (254) characters'),
];

module.exports = {
  registerAccount,
  loginAccount,
  updateAccount,
  updateSocials,
};
