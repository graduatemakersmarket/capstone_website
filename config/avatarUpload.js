const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

// Configure the avatar upload destination and filename
const storage = multer.diskStorage({
    destination: (req, file, cb) => {return cb(null, 'views/static/avatar_images');},
    filename: (req, file, cb) => {return cb(null, `${crypto.randomUUID()}${path.extname(file.originalname)}`);},
});

// Reject any files that are not images
const upload = multer({
    fileFilter: async (req, file, cb) => {
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