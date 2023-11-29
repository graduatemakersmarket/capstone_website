const express = require('express');
const auth = require('../../../middleware/auth');
const controller = require('../../../controllers/accountController');
const validator = require('../../../config/validators/accountValidator');
const upload = require('../../../config/avatarUpload')
const router = express.Router();

/*************************************************************************************************/
/* Post routes
/*************************************************************************************************/
router.post('/register', validator.registerAccount, controller.registerAccount);
router.post('/login', validator.loginAccount, controller.loginAccount);

/*************************************************************************************************/
/* Put routes
/*************************************************************************************************/
router.put('/update', auth.authenticatedAPI, upload.single('avatar'), validator.updateAccount, controller.updateAccount);
router.put('/updateProfile', auth.authenticatedAPI, upload.single('avatar'), validator.updateAccount, controller.updateProfileAdmin);
router.put('/verify', auth.authenticatedAPI, controller.verifyAccount);
router.put('/feature', auth.authenticatedAPI, controller.featureAccount);
router.put('/unfeature', auth.authenticatedAPI, controller.unfeatureAccount);
router.put('/ban', auth.authenticatedAPI, controller.banAccount);
router.put('/unban', auth.authenticatedAPI, controller.unbanAccount);

module.exports = router;