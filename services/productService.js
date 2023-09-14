const productModel = require('../models/productModel');
const productImageModel = require('../models/productImageModel');
const accountModel = require('../models/accountModel');
const logger = require('../config/logger');

/*************************************************************************************************/
/* Define relationships required to successfully union tables together
/*************************************************************************************************/
accountModel.hasMany(productModel);
productModel.belongsTo(accountModel);
productModel.hasMany(productImageModel);
productImageModel.belongsTo(productModel)

/*************************************************************************************************/
/* Get all products associated with a specific account
/*************************************************************************************************/
const getProductsByEmail = async (account_email) => {
  const products = await productModel.findAll({
    where: { account_email },
  }).catch((error) => {
    logger.error(error);
  });

  return products;
};

/*************************************************************************************************/
/* Get all featured products associated with a specific account
/*************************************************************************************************/
const getFeaturedProductsByEmail = async (account_email) => {
  const products = await productModel.findAll({
    where: { account_email, product_featured: 1 },
  }).catch((error) => {
    logger.error(error);
  });

  return products;
};

/*************************************************************************************************/
/* Get a product associated with a specific name
/*************************************************************************************************/
const getProductByName = async (product) => {
  const item = await productModel.findOne({
    where: { product },
  }).catch((error) => {
    logger.error(error);
  });

  return item;
};

/*************************************************************************************************/
/* Get a product associated with a specific ID
/*************************************************************************************************/
const getProductByID = async (id) => {
  const product = await productModel.findOne({
    where: { id },
  }).catch((error) => {
    logger.error(error);
  });

  return product;
};

/*************************************************************************************************/
/* Get all products from the database along with an image
/*************************************************************************************************/
const getAllProducts = async (limit, offset) => {
  const products = await productModel.findAll({
    include: [{ model: productImageModel, attributes: ['image']}],
    order: [['updated_date', 'DESC']],
    limit,
    offset,
  }).catch((error) => {
    logger.error(error);
  });

  return products;
};

/*************************************************************************************************/
/* Insert a new product into the database
/*************************************************************************************************/
const createProduct = async (product) => {
  await productModel.create(product).catch((error) => {
    logger.error(error);
  });

  return true;
};

/*************************************************************************************************/
/* Update an existing product
/*************************************************************************************************/
const updateProduct = async (product, id) => {
  await productModel.update(product, { where: { id } }).catch((error) => {
    logger.error(error);
  });

  return true;
};

/*************************************************************************************************/
/* Delete a product
/*************************************************************************************************/
const deleteProduct = async (id) => {
  await productModel.destroy({ where: { id } }).catch((error) => {
    logger.error(error);
  });

  return true;
};

/*************************************************************************************************/
/* Count all of the products in the database
/*************************************************************************************************/
const countProducts = async () => {
  const count = await productModel.count().catch((error) => {
    logger.error(error);
  });

  return count;
};

module.exports = {
  getProductsByEmail,
  getFeaturedProductsByEmail,
  getProductByName,
  getProductByID,
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  countProducts
};
