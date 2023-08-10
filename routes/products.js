const express = require('express');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', auth.guestAccess, (req, res) => res.render('products/products', {
  session: req.session,
}));

router.get('/p/:page', auth.guestAccess, (req, res) => res.render('products/products', {
  session: req.session,
}));

router.get('/:product', auth.guestAccess, (req, res) => res.render('products/profile', {
  session: req.session,
}));

module.exports = router;