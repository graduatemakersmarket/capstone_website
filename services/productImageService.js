const productImageModel = require('../models/productImageModel');
const logger = require('../config/logger');

/*************************************************************************************************/
/* Get all product images associated with a specific product
/*************************************************************************************************/
const getProductImagesByName = async (product) => {
  const images = await productImageModel.findAll({
    where: { product_product: product },
  }).catch((error) => {
    logger.error(error);
  });

  return images;
};

/*************************************************************************************************/
/* Get a product image associated with a specific ID
/*************************************************************************************************/
const getProductImageByID = async (id) => {
  const image = await productImageModel.findOne({
    where: { id },
  }).catch((error) => {
    logger.error(error);
  });

  return image;
};

/*************************************************************************************************/
/* Insert a new product image into the database
/*************************************************************************************************/
const createProductImage = async (productImage) => {
  await productImageModel.create(productImage).catch((error) => {
    logger.error(error);
  });

  return true;
};

/*************************************************************************************************/
/* Update an existing product image
/*************************************************************************************************/
const updateProductImage = async (productImage, id) => {
  await productImageModel.update(productImage, { where: { id } }).catch((error) => {
    logger.error(error);
  });

  return true;
};

/*************************************************************************************************/
/* Delete a product image
/*************************************************************************************************/
const deleteProductImage = async (id) => {
  await roleModel.destroy({ where: { id } }).catch((error) => {
    logger.error(error);
  });

  return true;
};

module.exports = {
  getProductImagesByName,
  getProductImageByID,
  createProductImage,
  updateProductImage,
  deleteProductImage
};
