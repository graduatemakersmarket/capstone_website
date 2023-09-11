const accountService = require('../services/accountService');
const productService = require('../services/productService');
const productImageService = require('../services/productImageService');
const validator = require('express-validator');

const createProduct = async (req, res) => {
  // Check for session cookie or authorization header
  if (!req.cookies.makerSession && !req.headers.authorization) {
    return res.status(403).json({
      success: false,
      error: 'You are not authorized to use this endpoint',
    });
  }

  // Check if user is verified
  if (!Number((await accountService.getAccountInfo(req.session.makerEmail)).account_verified)) {
    return res.status(403).json({
      success: false,
      error: 'Only verified accounts may create new product listings',
    });
  }

  // Gracefully fail if form validation fails
  if (!validator.validationResult(req).isEmpty()) {
    return res.status(422).json({
      success: false,
      error: validator.validationResult(req).errors[0].msg,
    });
  }

  // Check if this product name already exists
  if (await productService.getProduct(req.body['create-product-name'])) {
    return res.status(422).json({
      success: false,
      error: 'The provided product name is already being used',
    });
  }

  // Check if user is trying to upload anything other than an image file
  if (req.files.length === 0 && req.isImageValid === 'invalid') {
    return res.status(422).json({
      success: false,
      error: 'One or more of your product images are in an invalid file format',
    });
  }

  // Create a new product object
  const product = {
    product: req.body['create-product-name'],
    summary: req.body['create-product-summary'],
    product_featured: (req.body['create-product-featured'] === "on") ? 1 : 0,
    product_website: req.body['create-product-website'],
    purchase_link: req.body['create-product-purchase'],
    account_email: req.session.makerEmail,
  };

  // Add product to the database
  await productService.createProduct(product);

  // Check if user did not provide any product images
  if (req.files.length === 0 && req.isImageValid === undefined) {
    await productImageService.createProductImage({image: 'default.png', product_product: req.body['create-product-name']});
  }

  // Process the users product images
  if (req.files.length > 0 && req.isImageValid === 'valid') {
    req.files.forEach(async (image) => {
      await productImageService.createProductImage({image: image.filename, product_product: req.body['create-product-name']});
    });
  }

  return res.status(200).json({
    success: true,
    response: 'Successfully created new product listing',
  });
}

module.exports = {
  createProduct,
}