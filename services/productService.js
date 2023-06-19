const productModel = require('../models/productModel');
const productImageModel = require('../models/productImageModel');
const accountModel = require('../models/accountModel');
const logger = require('../config/logger');

const queryGetProduct = async (product, email) => {
  const products = await productModel.findOne({
    where: { product, email },
  }).catch((error) => {
    logger.error(error);
  });

  return products;
};

const queryGetMakerProducts = async (email) => {
  const products = await productModel.findAll({
    where: { email },
  }).catch((error) => {
    logger.error(error);
  });

  return products;
};

const queryGetAllProducts = async (limit, offset) => {
  // Accounts may have many products
  accountModel.hasMany(productModel);

  // Products belong to an account
  productModel.belongsTo(accountModel);

  // Products have many images
  productModel.hasMany(productImageModel);

  // Product images belong to a product
  productImageModel.belongsTo(productModel)

  const products = await productModel.findAll({
    include: [{ model: accountModel, include: [{ model: productImageModel }] }],
    order: [['product_featured', 'DESC']],
    limit,
    offset,
  }).catch((error) => {
    logger.error(error);
  });

  return products;
};

const queryCountProducts = async () => {
  const count = await productModel.count().catch((error) => {
    logger.error(error);
  });

  return count;
};

const queryCreateProduct = async (product) => {
  await productModel.create(product).catch((error) => {
    logger.error(error);
  });

  return true;
};

const queryUpdateFeatured = async (product) => {
  await productModel.update({ product_featured: 1 }, { where: { product } }).catch((error) => {
    logger.error(error);
  });
};

module.exports = {
  queryGetProduct,
  queryGetMakerProducts,
  queryGetAllProducts,
  queryCountProducts,
  queryCreateProduct,
  queryUpdateFeatured,
};
