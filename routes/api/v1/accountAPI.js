const express = require('express');
const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
const auth = require('../../../middleware/auth');
const controller = require('../../../controllers/accountController');
const validator = require('../../../config/validators/accountValidator');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {return cb(null, 'views/static/avatar_images');},
    filename: (req, file, cb) => {return cb(null, `${crypto.randomUUID()}${path.extname(file.originalname)}`);},
});

const upload = multer({
    fileFilter: (req, file, cb) => {
        // Only upload image files
        if (file.mimetype.startsWith('image/')) {
            req.isImageValid = 'valid';
            return cb(null, true);
        }else{
            req.isImageValid = 'invalid';
            return cb(null, false);
        }
    },
    storage: storage
});


const router = express.Router();

router.post('/register', validator.registerAccount, controller.registerAccount);
router.post('/login', validator.loginAccount, controller.loginAccount);
router.put('/update', auth.APIAccess, upload.single('avatar'), validator.updateAccount, controller.updateAccount);
router.put('/socials/update', auth.APIAccess, validator.updateSocials, controller.updateSocials);
module.exports = router;