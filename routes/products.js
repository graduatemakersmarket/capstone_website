const express = require('express');
const auth = require('../middleware/auth');
const convert = require('html-to-text');
const productController = require('../controllers/productController');
const productImageController = require('../controllers/productImageController');
const router = express.Router();
const PRODUCTS_PER_PAGE = 6;

/*************************************************************************************************/
/* Render the product management page
/*************************************************************************************************/
router.get('/manage', auth.memberAccess, async (req, res) => {
  return res.render('products/manage', {
    session: req.session,
    products: await productController.getProductsByEmail(req.session.email),
    clean: convert.convert,
  });
});

/*************************************************************************************************/
/* Render an editable product profile (Owner can edit)
/*************************************************************************************************/
router.get('/edit/:id', auth.memberAccess, async (req, res) => {
  const productID = parseInt(req.params.id, 10) || null; // The 10 here represents a base 10 number

  // If no product is specified, kick them to the product mangement page
  if (!productID) {
    return res.redirect('/products/manage');
  }

  // Grab product information using the provided product name
  const productInfo = await productController.getProductByID(productID);

  // If no product is found, kick them to the product management page
  if (!productInfo) {
    return res.redirect('/products/manage');
  }

  // Only the person who owns this product is allowed to edit it
  if (productInfo.account_email !== req.session.email) {
    return res.redirect('/products/manage');
  }

  return res.render('products/edit', {
    session: req.session,
    product: productInfo,
    images: await productImageController.getProductImagesByName(productInfo.product),
    clean: convert.convert
  });
});

/*************************************************************************************************/
/* Render a specific product profile
/*************************************************************************************************/
router.get('/:id', auth.guestAccess, async (req, res) => {
  const productID = parseInt(req.params.id, 10) || null; // The 10 here represents a base 10 number

  // If not product name is given, kick them to the products page
  if (!productID) {
    return res.redirect('/products');
  }

  // Grab the product information using the provided product id
  const product = await productController.getProductByID(productID);

  // If product is not found, kick them to the products page
  if (!product) {
    return res.redirect('/products');
  }

  return res.render('products/profile', {
    session: req.session,
    product,
    images: await productImageController.getProductImagesByName(product.product),
    clean: convert.convert,
  });
});

/*************************************************************************************************/
/* Render the products page
/*************************************************************************************************/
router.get('/', auth.guestAccess, async (req, res) => res.render('products/products', {
  session: req.session,
  products: await productController.getAllProducts(PRODUCTS_PER_PAGE, 0),
  page: 1,
  offset: 0,
  total: Math.ceil(await productController.getProductCount() / PRODUCTS_PER_PAGE),
  clean: convert.convert,
}));

/*************************************************************************************************/
/* Render the products page and keep track of pagination
/*************************************************************************************************/
router.get('/page/:page', auth.guestAccess, async (req, res) => {
  const page = parseInt(req.params.page, 10) || 1; // The 10 here represents a base 10 number
  const total = Math.ceil(await productController.getProductCount() / PRODUCTS_PER_PAGE)

  // If the page is invalid or out-of-bounds, kick them to the first page
  if (!page || page <= 0 || page > total) {
    return res.redirect('/products');
  }

  // Compute the new offset for pagination
  const offset = (PRODUCTS_PER_PAGE * page) - PRODUCTS_PER_PAGE;

  return res.render('products/products', {
    session: req.session,
    products: await productController.getAllProducts(PRODUCTS_PER_PAGE, offset),
    page,
    offset,
    total,
    clean: convert.convert,
  });
});

module.exports = router;