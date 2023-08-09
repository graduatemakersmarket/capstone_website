const express = require('express');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/logout', auth.guestAccess, (req, res) => {
  return res.clearCookie('makerSession').redirect('/');
});

router.get('/login', auth.guestAccess, (req, res) => {
  return res.render('account/login', {
    session: req.session,
  });
});

router.get('/register', auth.guestAccess, (req, res) => {
  return res.render('account/register', {
    session: req.session,
  });
});

module.exports = router;
