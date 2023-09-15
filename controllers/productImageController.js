const productImageService = require('../services/productImageService');

/*************************************************************************************************/
/* Public Database Methods
/*************************************************************************************************/
const createProductImage = async (image) => productImageService.createProductImage(image);
const getProductImagesByName = async (product_name, limit, offset) => productImageService.getProductImagesByName(product_name, limit, offset);
const countProductImagesByName = async (product) => productImageService.countProductImageByName(product);

module.exports = {
    createProductImage,
    getProductImagesByName,
    countProductImagesByName
  }