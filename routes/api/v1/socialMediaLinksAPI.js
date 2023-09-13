const express = require('express');
const auth = require('../../../middleware/auth');
const controller = require('../../../controllers/socialMediaLinkController');
const validator = require('../../../config/validators/socialMediaLinkValidator');
const router = express.Router();

router.post('/create', auth.authenticatedAPI, validator.checkSocialMediaLink, controller.createLink);
router.put('/update', auth.authenticatedAPI, validator.checkSocialMediaLink, controller.updateLink);
router.delete('/delete', auth.authenticatedAPI, validator.checkSocialMediaLink, controller.deleteLink);

module.exports = router;