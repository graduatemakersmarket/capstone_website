const express = require('express');
const auth = require('../../../middleware/auth');
const controller = require('../../../controllers/productController');
const validator = require('../../../config/validators/productValidator');
const upload = require('../../../config/imageUpload')
const router = express.Router();

/*************************************************************************************************/
/* Post routes
/*************************************************************************************************/
router.post('/create', auth.authenticatedAPI, upload.array('create-product-images'), validator.createProduct, controller.createProduct);

module.exports = router;