const express = require('express');
const auth = require('../../../middleware/auth');
const controller = require('../../../controllers/socialMediaLinkController');
const validator = require('../../../config/validators/socialMediaLinkValidator');
const router = express.Router();

/*************************************************************************************************/
/* Post routes
/*************************************************************************************************/
router.post('/create', auth.authenticatedAPI, validator.checkSocialMediaLink, controller.createLink);
router.post('/createUserLink', auth.authenticatedAPI, validator.checkSocialMediaLink, controller.createUserLink);

/*************************************************************************************************/
/* Delete routes
/*************************************************************************************************/
router.delete('/delete', auth.authenticatedAPI, validator.checkSocialMediaLinkID, controller.deleteLink);

module.exports = router;