const express = require('express');
const auth = require('../middleware/auth');
const convert = require('html-to-text');
const productService = require('../services/productService');

const router = express.Router();

const PRODUCTS_PER_PAGE = 6;

router.get('/', auth.guestAccess, async (req, res) => res.render('products/products', {
  session: req.session,
  products: await productService.getAllProducts(PRODUCTS_PER_PAGE, 0),
  page: 1,
  offset: 0,
  total: Math.ceil(await productService.countProducts() / PRODUCTS_PER_PAGE),
  clean: convert.convert,
}));

router.get('/manage', auth.memberAccess, async (req, res) => {
  return res.render('products/manage', {
    session: req.session,
    clean: convert.convert,
  });
});

router.get('/page/:page', auth.guestAccess, async (req, res) => {
  const page = parseInt(req.params.page, 10) || 1; // The 10 here represents a base 10 number
  const total = Math.ceil(await productService.countProducts() / PRODUCTS_PER_PAGE)

  if (!page || page <= 0 || page > total) {
    return res.redirect('/products');
  }

  const offset = (PRODUCTS_PER_PAGE * page) - PRODUCTS_PER_PAGE;

  return res.render('products/products', {
    session: req.session,
    products: await productService.getAllProducts(PRODUCTS_PER_PAGE, offset),
    page,
    offset,
    total,
    clean: convert.convert,
  });
});

router.get('/:product', auth.guestAccess, async (req, res) => {
  const product = req.params.product || null;

  if (!product) {
    return res.redirect('/products');
  }

  const productInfo = await productService.getProduct(product);

  if (!productInfo) {
    return res.redirect('/products');
  }

  return res.render('products/profile', {
    session: req.session,
    productInfo,
    clean: convert.convert,
  });
});

module.exports = router;