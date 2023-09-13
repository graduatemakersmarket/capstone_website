const express = require('express');
const auth = require('../middleware/auth');
const convert = require('html-to-text');
const accountService = require('../services/accountService');
const socialMediaLinksController = require('../controllers/socialMediaLinkController');

const router = express.Router();

const MAKERS_PER_PAGE = 6;

router.get('/', auth.guestAccess, async (req, res) => res.render('account/makers', {
  session: req.session,
  makers: await accountService.getVerifiedAccounts(MAKERS_PER_PAGE, 0),
  page: 1,
  offset: 0,
  total: Math.ceil(await accountService.getVerifiedAccountCount() / MAKERS_PER_PAGE),
  clean: convert.convert,
}));

router.get('/page/:page', auth.guestAccess, async (req, res) => {
  const page = parseInt(req.params.page, 10) || 1; // The 10 here represents a base 10 number
  const total = Math.ceil(await accountService.getVerifiedAccountCount() / MAKERS_PER_PAGE)

  if (!page || page <= 0 || page > total) {
    return res.redirect('/makers');
  }

  const offset = (MAKERS_PER_PAGE * page) - MAKERS_PER_PAGE;

  return res.render('account/makers', {
    session: req.session,
    makers: await accountService.getVerifiedAccounts(MAKERS_PER_PAGE, offset),
    page,
    offset,
    total,
    clean: convert.convert,
  });
});

router.get('/:makerID', auth.guestAccess, async (req, res) => {
  const makerID = req.params.makerID || null;

  if (!makerID) {
    return res.redirect('/makers');
  }

  const account = await accountService.getAccountInfoByID(makerID);

  if (!account) {
    return res.redirect('/makers');
  }

  return res.render('account/profile', {
    session: req.session,
    account,
    links: await socialMediaLinksController.getLinksByEmail(req.session.makerEmail),
    clean: convert.convert,
  });
});

module.exports = router;