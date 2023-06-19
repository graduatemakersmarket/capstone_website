const productService = require('../services/productService');
const productImageService = require('../services/productImageService');

const countProducts = async () => productService.queryCountProducts();
const getProduct = async (product, email) => productService.queryGetProduct(product, email);
const getMakerProducts = async (email) => productService.getMakerProducts(email);
const getAllProducts = async (limit, offset) => productService.getAllProducts(limit, offset);


const createProduct = async (req, res) => {
  // LOGIC HERE
}

const featureProduct = async (req, res) => {
  // LOGIC HERE
}

module.exports = {
  countProducts,
  getProduct,
  getMakerProducts,
  getAllProducts,
  createProduct,
  featureProduct,
}