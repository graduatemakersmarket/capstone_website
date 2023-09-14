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

module.exports = router;