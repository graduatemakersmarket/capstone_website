const express = require('express');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage });
const router = express.Router();

const auth = require('../../../middleware/auth');
const controller = require('../../../controllers/productController');
const validator = require('../../../config/validators/productValidator');

router.post('/create', auth.APIAccess, upload.array('create-product-images'), validator.createProduct, controller.createProduct);

module.exports = router;