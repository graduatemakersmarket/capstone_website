const express = require('express');
const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
const auth = require('../../../middleware/auth');
const controller = require('../../../controllers/productController');
const validator = require('../../../config/validators/productValidator');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {return cb(null, 'views/static/product_images');},
    filename: (req, file, cb) => {return cb(null, `${crypto.randomUUID()}${path.extname(file.originalname)}`);},
});

const upload = multer({
    fileFilter: (req, file, cb) => {
        req.isImageValid = (file.mimetype.startsWith('image/')) ? true : false;
        return cb(null, req.isImageValid);
    },
    storage: storage
});

const router = express.Router();

router.post('/create', auth.APIAccess, upload.array('create-product-images'), validator.createProduct, controller.createProduct);

module.exports = router;