const express = require('express');
const auth = require('../middleware/auth');
const convert = require('html-to-text');
const socialMediaLinksController = require('../controllers/socialMediaLinkController');
const accountController = require('../controllers/accountController');
const router = express.Router();

/*************************************************************************************************/
/* Destroy the user's session cookie
/*************************************************************************************************/
router.get('/logout', auth.guestAccess, (req, res) => {
  return res.clearCookie('makerSession').redirect('/');
});

/*************************************************************************************************/
/* Render the account login page
/*************************************************************************************************/
router.get('/login', auth.guestAccess, async (req, res) => {
  // Redirect to account page if session exists
  if (req.cookies.makerSession || req.headers.authorization) {
    return res.redirect('/account/manage');
  }

  return res.render('account/login', {
    session: req.session,
    featured: await accountController.getFeaturedAccounts(),
    clean: convert.convert,
  });
});

/*************************************************************************************************/
/* Render the account registration page
/*************************************************************************************************/
router.get('/register', auth.guestAccess, async (req, res) => {
  // Redirect to account page if session exists
  if (req.cookies.makerSession || req.headers.authorization) {
    return res.redirect('/account/manage');
  }

  return res.render('account/register', {
    session: req.session,
    featured: await accountController.getFeaturedAccounts(),
    clean: convert.convert,
  });
});

/*************************************************************************************************/
/* Render the account management page
/*************************************************************************************************/
router.get('/manage', auth.memberAccess, async (req, res) => {
  return res.render('account/manage', {
    session: req.session,
    featured: await accountController.getFeaturedAccounts(),
    account: await accountController.getAccountByEmail(req.session.email),
    socials: await socialMediaLinksController.getLinksByEmail(req.session.email),
    clean: convert.convert,
  });
});

module.exports = router;
