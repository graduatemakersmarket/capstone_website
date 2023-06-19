const productImageModel = require('../models/productImageModel');
const logger = require('../config/logger');

// Note: product_product is just the product name. I wrote it like this for shorthand purposes

const queryGetImages = async (product_product) => {
  const images = await productImageModel.findAll({
    where: { product_product },
  }).catch((error) => {
    logger.error(error);
  });

  return images;
};

const queryAddProductImage = async (product) => {
  await productImageModel.create(product).catch((error) => {
    logger.error(error);
  });

  return true;
};

const queryUpdateDate = async (updated_date, product_product) => {
  await productImageModel.update({ updated_date }, { where: { product_product } }).catch((error) => {
    logger.error(error);
  });
};

module.exports = {
  queryGetImages,
  queryAddProductImage,
  queryUpdateDate,
};
