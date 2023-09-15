const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

/*************************************************************************************************/
/* Configure storage destination and filenames for avatar uploads
/*************************************************************************************************/
const storage = multer.diskStorage({
    destination: (req, file, cb) => {return cb(null, 'views/static/images/avatar_images');},
    filename: (req, file, cb) => {return cb(null, `${crypto.randomUUID()}${path.extname(file.originalname)}`);},
});

/*************************************************************************************************/
/* Configure a file filter for avatar uploads
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