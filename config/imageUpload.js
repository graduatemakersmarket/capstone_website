const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

/*************************************************************************************************/
/* Configure storage destination and filenames for image uploads
/*************************************************************************************************/
const storage = multer.diskStorage({
    destination: (req, file, cb) => {return cb(null, 'views/static/product_images');},
    filename: (req, file, cb) => {return cb(null, `${crypto.randomUUID()}${path.extname(file.originalname)}`);},
});

/*************************************************************************************************/
/* Configure a file filter for image uploads
/*************************************************************************************************/
const upload = multer({
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            return cb(null, true);
        }else{
            req.isBadFiletype = true;
            return cb(null, false);
        }
    },
    storage: storage
});

module.exports = upload;