const sharp = require('sharp');
const accountService = require('../services/accountService');
const productService = require('../services/productService');
const productImageService = require('../services/productImageService');
const validator = require('express-validator');
const encode = require('../utils/encode');
const time = require('../utils/time');

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

  // Check if the user submitted any product images
  if (req.files.length === 0) {
    return res.status(422).json({
      success: false,
      error: 'You must provide at least (1) product image',
    });
  }

  // Check if the user submitted too many product images
  if (req.files.length > 6) {
    return res.status(422).json({
      success: false,
      error: 'You may only submit up to (6) product images',
    });
  }

  // Check if this product name already exists
  if (await productService.getProduct(req.body['create-product-name'])) {
    return res.status(422).json({
      success: false,
      error: 'The provided product name is already being used',
    });
  }

  const product = {
    product: req.body['create-product-name'],
    summary: req.body['create-product-summary'],
    product_website: req.body['create-product-website'],
    purchase_link: req.body['create-product-purchase'],
    account_email: req.session.makerEmail,
  };

  // Add product to the database
  await productService.createProduct(product);

  // Add product images to the database
  req.files.forEach(async (image) => {
    const productImage = {
      image: image.buffer.toString('base64'),
      product_product: req.body['create-product-name'],
    };

    await productImageService.createProductImage(productImage);
  });

  return res.status(200).json({
    success: true,
    response: 'Successfully created new product listing',
  });
}

const featureProduct = async (req, res) => {
  // LOGIC HERE
}

module.exports = {
  createProduct,
  featureProduct,
}