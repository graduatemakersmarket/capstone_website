const express = require('express');
const auth = require('../middleware/auth');

const router = express.Router();

// TODO: Restrict this to admin access later. Guest access is just for development
router.get('/', auth.guestAccess, (req, res) => res.render('admin/admin', {
  session: req.session,
}));

module.exports = router;