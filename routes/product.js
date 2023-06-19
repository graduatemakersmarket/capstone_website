const express = require('express');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/directory', auth.guestAccess, (req, res) => res.render('products/directory', {
  session: req.session,
}));

router.get('/directory/p/:page', auth.guestAccess, (req, res) => res.render('products/directory', {
  session: req.session,
}));

router.get('/:product', auth.guestAccess, (req, res) => res.render('products/products', {
  session: req.session,
}));

module.exports = router;
