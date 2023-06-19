const express = require('express');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', auth.guestAccess, (req, res) => res.render('index', {
  session: req.session,
}));

module.exports = router;
