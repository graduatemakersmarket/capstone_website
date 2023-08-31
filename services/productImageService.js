const productImageModel = require('../models/productImageModel');
const logger = require('../config/logger');

const getProductImages = async (product_product) => {
  const images = await productImageModel.findAll({
    where: { product_product },
  }).catch((error) => {
    logger.error(error);
  });

  return images;
};

const createProductImage = async (productImage) => {
  await productImageModel.create(productImage).catch((error) => {
    logger.error(error);
  });

  return true;
};

module.exports = {
  getProductImages,
  createProductImage,
};
