const express = require('express');
const convert = require('html-to-text');
const auth = require('../middleware/auth');
const router = express.Router();
const accountController = require('../controllers/accountController');
const productController = require('../controllers/productController');
const applicationController = require('../controllers/applicationController');
const socialMediaLinksController = require('../controllers/socialMediaLinkController');
const USERS_PER_PAGE = 10;

/*************************************************************************************************/
/* Render the page that will allow admins to edit a user's account
/*************************************************************************************************/
router.get('/edit/:makerID', auth.adminAccess, async (req, res) => {
  const makerID = parseInt(req.params.makerID, 10) || null; // The 10 here represents a base 10 number

  // If the profile is invalid, kick them to the admin page
  if (!makerID) {
    return res.redirect('/admin');
  }

  // Grab the maker's account information using the provided makerID
  const account = await accountController.getAccountByID(makerID);

  // If no account is found, kick them to the admin page
  if (!account) {
    return res.redirect('/admin');
  }

  // Grab the maker's products
  const products = await productController.getProductsByEmail(account.email);

  // Grab the maker's social media links
  const socials = await socialMediaLinksController.getLinksByEmail(account.email);

  // Grab the maker's application (if they have one)
  const application = await applicationController.getApplicationByEmail(account.email);

  return res.render('admin/edit', {
    session: req.session,
    account,
    products,
    socials,
    application,
    clean: convert.convert,
  });
});

/*************************************************************************************************/
/* Render the admin panel page
/*************************************************************************************************/
router.get('/', auth.adminAccess, async (req, res) => res.render('admin/admin', {
  session: req.session,
  accounts: await accountController.getAccounts(USERS_PER_PAGE, 0),
  page: 1,
  offset: 0,
  total: Math.ceil(await accountController.getAccountCount() / USERS_PER_PAGE),
  clean: convert.convert,
}));

/*************************************************************************************************/
/* Render the admin panel page and keep track of pagination
/*************************************************************************************************/
router.get('/page/:page', auth.adminAccess, async (req, res) => {
  const page = parseInt(req.params.page, 10) || 1; // The 10 here represents a base 10 number
  const total = Math.ceil(await accountController.getAccountCount() / USERS_PER_PAGE)

  // If the page is invalid or out-of-bounds, kick them to the first page
  if (!page || page <= 0 || page > total) {
    return res.redirect('/admin');
  }

  // Compute the new offset for pagination
  const offset = (USERS_PER_PAGE * page) - USERS_PER_PAGE;

  return res.render('admin/admin', {
    session: req.session,
    accounts: await accountController.getAccounts(USERS_PER_PAGE, offset),
    page,
    offset,
    total,
    clean: convert.convert,
  });
});

module.exports = router;