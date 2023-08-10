const express = require('express');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', auth.guestAccess, (req, res) => res.render('account/makers', {
  session: req.session,
}));

router.get('/p/:page', auth.guestAccess, (req, res) => res.render('account/makers', {
  session: req.session,
}));

router.get('/:maker', auth.guestAccess, (req, res) => res.render('account/profile', {
  session: req.session,
}));

module.exports = router;