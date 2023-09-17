const express = require('express');
const auth = require('../../../middleware/auth');
const controller = require('../../../controllers/applicationController');
const validator = require('../../../config/validators/applicationValidator');
const router = express.Router();

/*************************************************************************************************/
/* Post routes
/*************************************************************************************************/
router.post('/create', validator.createApplication, controller.createApplication);

module.exports = router;