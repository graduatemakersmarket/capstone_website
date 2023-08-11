const express = require('express');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage });
const router = express.Router();

const auth = require('../../../middleware/auth');
const controller = require('../../../controllers/accountController');
const validator = require('../../../config/validators/accountValidator');

router.post('/register', validator.registerAccount, controller.registerAccount);
router.post('/login', validator.loginAccount, controller.loginAccount);
router.put('/update', auth.APIAccess, upload.single('avatar'), validator.updateAccount, controller.updateAccount);
router.put('/socials/update', auth.APIAccess, validator.updateSocials, controller.updateSocials);
module.exports = router;