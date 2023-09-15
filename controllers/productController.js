const accountController = require('../controllers/accountController');
const productImageController = require('../controllers/productImageController');
const productService = require('../services/productService');
const validator = require('express-validator');

/*************************************************************************************************/
/* Public Database Methods
/*************************************************************************************************/
const getAllProducts = async (limit, offset) => productService.getAllProducts(limit, offset);
const getProductCount = async () => productService.countProducts();
const getFeaturedProductCountByEmail = async (account_email) => productService.countFeaturedProductsByEmail(account_email);
const getProductsByEmail = async (account_email) => productService.getProductsByEmail(account_email);
const getFeaturedProductsByEmail = async (account_email, limit, offset) => productService.getFeaturedProductsByEmail(account_email, limit, offset);
const getProductByName = async (product) => productService.getProductsByEmail(product);
const getProductByID = async (id) => productService.getProductByID(id);

/*************************************************************************************************/
/* Add a new product to the database
/*************************************************************************************************/
const createProduct = async (req, res) => {
  // Only allow users with a valid session to access this endpoint
  if (!req.cookies.makerSession && !req.headers.authorization) {
    return res.status(403).json({
      success: false,
      error: 'You are not authorized to use this endpoint',
    });
  }

  // Halt if the user is not verified
  if (!Number((await accountController.getAccountByEmail(req.session.email)).account_verified)) {
    return res.status(403).json({
      success: false,
      error: 'Only verified accounts may create new product listings',
    });
  }

  // Halt if there is a problem with validating the user input
  if (!validator.validationResult(req).isEmpty()) {
    return res.status(422).json({
      success: false,
      error: validator.validationResult(req).errors[0].msg,
    });
  }

  // Halt is the product already exists
  if (await productService.getProductByName(req.body['create-product-name'])) {
    return res.status(422).json({
      success: false,
      error: 'The provided product name is already being used',
    });
  }

  // Halt if the user tries to upload a bad file
  if (req.isBadFiletype) {
    return res.status(422).json({
      success: false,
      error: 'You have tried to upload an invalid image',
    });
  }

  // Create a new product object
  const product = {
    product: req.body['create-product-name'],
    summary: req.body['create-product-summary'],
    product_featured: (req.body['create-product-featured'] === "on") ? 1 : 0,
    product_website: req.body['create-product-website'],
    purchase_link: req.body['create-product-purchase'],
    account_email: req.session.email,
  };

  // Add product to the database
  await productService.createProduct(product);

  // Add a default product image if one is not supplied
  if (req.files.length === 0) {
    await productImageController.createProductImage({image: '/images/product_images/default.png', product_product: req.body['create-product-name']});
  }

  // Add user's product images to the database
  if (req.files.length > 0) {
    req.files.forEach(async (image) => {
      await productImageController.createProductImage({image: `/images/product_images/${image.filename}`, product_product: req.body['create-product-name']});
    });
  }

  return res.status(200).json({
    success: true,
    product: req.body['create-product-name'],
    id: (await productService.getProductByName(req.body['create-product-name'])).id
  });
}

module.exports = {
  getAllProducts,
  getProductCount,
  getFeaturedProductCountByEmail,
  getProductsByEmail,
  getFeaturedProductsByEmail,
  getProductByName,
  getProductByID,
  createProduct
}