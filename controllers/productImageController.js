const productImageService = require('../services/productImageService');

/*************************************************************************************************/
/* Public Database Methods
/*************************************************************************************************/
const createProductImage = async (image) => productImageService.createProductImage(image);
const getProductImagesByName = async (product_name) => productImageService.getProductImagesByName(product_name);

module.exports = {
    createProductImage,
    getProductImagesByName
  }