const sharp = require('sharp');
const productService = require('../services/productService');
const productImageService = require('../services/productImageService');
const validator = require('express-validator');
const encode = require('../utils/encode');
const time = require('../utils/time');

const createProduct = async (req, res) => {
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

  // Check for session cookie or authorization header
  if (!req.cookies.makerSession && !req.headers.authorization) {
    return res.status(403).json({
      success: false,
      error: 'You are not authorized to use this endpoint',
    });
  }

  //TODO: Implement the logic for product creation
}

const featureProduct = async (req, res) => {
  // LOGIC HERE
}

module.exports = {
  createProduct,
  featureProduct,
}