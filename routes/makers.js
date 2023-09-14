const express = require('express');
const auth = require('../middleware/auth');
const convert = require('html-to-text');
const accountController = require('../controllers/accountController');
const productController = require('../controllers/productController');
const socialMediaLinksController = require('../controllers/socialMediaLinkController');
const router = express.Router();
const MAKERS_PER_PAGE = 6;

/*************************************************************************************************/
/* Render a specific maker profile
/*************************************************************************************************/
router.get('/:makerID', auth.guestAccess, async (req, res) => {
  const makerID = req.params.makerID || null;

  // If the profile is invalid, kick them to the makers page
  if (!makerID) {
    return res.redirect('/makers');
  }

  // Grab the maker's account information using the provided makerID
  const account = await accountController.getAccountByID(makerID);

  // If no account is found, kick them to the makers page
  if (!account) {
    return res.redirect('/makers');
  }

  // Grab the maker's social media links
  const socials = await socialMediaLinksController.getLinksByEmail(account.email);

  // Grab the maker's featured products
  const featured = await productController.getFeaturedProductsByEmail(account.email);

  return res.render('account/profile', {
    session: req.session,
    account,
    socials,
    featured,
    clean: convert.convert,
  });
});

/*************************************************************************************************/
/* Render the makers page
/*************************************************************************************************/
router.get('/', auth.guestAccess, async (req, res) => res.render('account/makers', {
  session: req.session,
  makers: await accountController.getVerifiedAccounts(MAKERS_PER_PAGE, 0),
  page: 1,
  offset: 0,
  total: Math.ceil(await accountController.getVerifiedAccountCount() / MAKERS_PER_PAGE),
  clean: convert.convert,
}));

/*************************************************************************************************/
/* Render the makers page and keep track of pagination
/*************************************************************************************************/
router.get('/page/:page', auth.guestAccess, async (req, res) => {
  const page = parseInt(req.params.page, 10) || 1; // The 10 here represents a base 10 number
  const total = Math.ceil(await accountController.getVerifiedAccountCount() / MAKERS_PER_PAGE)

  // If the page is invalid or out-of-bounds, kick them to the first page
  if (!page || page <= 0 || page > total) {
    return res.redirect('/makers');
  }

  // Compute the new offset for pagination
  const offset = (MAKERS_PER_PAGE * page) - MAKERS_PER_PAGE;

  return res.render('account/makers', {
    session: req.session,
    makers: await accountController.getVerifiedAccounts(MAKERS_PER_PAGE, offset),
    page,
    offset,
    total,
    clean: convert.convert,
  });
});

module.exports = router;