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

/*************************************************************************************************/
/* Put routes
/*************************************************************************************************/
router.put('/update', auth.authenticatedAPI, upload.array('update-product-images'), validator.updateProduct, controller.updateProduct);

/*************************************************************************************************/
/* Delete routes
/*************************************************************************************************/
router.delete('/image/delete', auth.authenticatedAPI, validator.deleteProductImage, controller.deleteProductImage);

module.exports = router;