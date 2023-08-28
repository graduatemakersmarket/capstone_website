const express = require('express');
const auth = require('../middleware/auth');
const convert = require('html-to-text');
const accountService = require('../services/accountService');

const router = express.Router();

router.get('/logout', auth.guestAccess, (req, res) => {
  return res.clearCookie('makerSession').redirect('/');
});

router.get('/login', auth.guestAccess, (req, res) => {
  // Redirect to account page if session exists
  if (req.cookies.makerSession || req.headers.authorization) {
    return res.redirect('/account');
  }

  return res.render('account/login', {
    session: req.session,
  });
});

router.get('/register', auth.guestAccess, (req, res) => {
  // Redirect to account page if session exists
  if (req.cookies.makerSession || req.headers.authorization) {
    return res.redirect('/account');
  }

  return res.render('account/register', {
    session: req.session,
  });
});


router.get('/manage', auth.memberAccess, async (req, res) => {
  return res.render('account/manage', {
    session: req.session,
    account: await accountService.getAccountInfo(req.session.makerEmail),
    clean: convert.convert,
  });
});

module.exports = router;
