const express = require('express');

const router = express.Router();
const controller = require('../../../controllers/accountController');
const validator = require('../../../config/validators/accountValidator');

router.post('/create', validator.createAccount, controller.createAccount);
router.post('/login', validator.loginAccount, controller.loginAccount);
router.put('/update', validator.loginAccount, controller.loginAccount);

module.exports = router;