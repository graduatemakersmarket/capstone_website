const productModel = require('../models/productModel');
const productImageModel = require('../models/productImageModel');
const accountModel = require('../models/accountModel');
const logger = require('../config/logger');

const getProduct = async (product) => {
  const productInfo = await productModel.findOne({
    where: { product },
  }).catch((error) => {
    logger.error(error);
  });

  return productInfo;
};

const getMakerProducts = async (email) => {
  const products = await productModel.findAll({
    where: { email },
  }).catch((error) => {
    logger.error(error);
  });

  return products;
};

const getAllProducts = async (limit, offset) => {
  // Accounts may have many products
  accountModel.hasMany(productModel);

  // Products belong to an account
  productModel.belongsTo(accountModel);

  // Products have many images
  productModel.hasMany(productImageModel);

  // Product images belong to a product
  productImageModel.belongsTo(productModel)

  const products = await productModel.findAll({
    include: [{ model: productImageModel}],
    order: [['product_featured', 'DESC']],
    limit,
    offset,
  }).catch((error) => {
    logger.error(error);
  });

  return products;
};

const countProducts = async () => {
  const count = await productModel.count().catch((error) => {
    logger.error(error);
  });

  return count;
};

const createProduct = async (product) => {
  await productModel.create(product).catch((error) => {
    logger.error(error);
  });

  return true;
};

const featureProduct = async (product) => {
  await productModel.update({ product_featured: 1 }, { where: { product } }).catch((error) => {
    logger.error(error);
  });
};

module.exports = {
  getProduct,
  getMakerProducts,
  getAllProducts,
  countProducts,
  createProduct,
  featureProduct,
};
