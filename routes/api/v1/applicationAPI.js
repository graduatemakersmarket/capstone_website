const express = require('express');
const auth = require('../../../middleware/auth');
const controller = require('../../../controllers/applicationController');
const validator = require('../../../config/validators/applicationValidator');
const router = express.Router();

/*************************************************************************************************/
/* Post routes
/*************************************************************************************************/
router.post('/create', validator.createApplication, controller.createApplication);

/*************************************************************************************************/
/* PUT routes
/*************************************************************************************************/
router.put('/approve', auth.authenticatedAPI, controller.acceptApplication);
router.put('/reject', auth.authenticatedAPI, controller.rejectApplication);

module.exports = router;